import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, DatabaseStorage } from "./storage";
import { setupAuth } from "./auth";
import { setupDatabase } from "./database";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // API routes
  // =========================================
  
  // Resources routes
  app.get("/api/resources", async (req, res) => {
    try {
      const { discipline, skillLevel } = req.query;
      
      let resources;
      if (discipline) {
        resources = await storage.getResourcesByDiscipline(discipline as string);
      } else if (skillLevel) {
        resources = await storage.getResourcesBySkillLevel(skillLevel as string);
      } else {
        resources = await storage.getResources();
      }
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  
  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resourceId = parseInt(req.params.id);
      const resource = await storage.getResourceById(resourceId);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });
  
  // Discussion bowl routes
  app.get("/api/discussion-bowls", async (req, res) => {
    try {
      const bowls = await storage.getDiscussionBowls();
      res.json(bowls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch discussion bowls" });
    }
  });
  
  app.get("/api/discussion-bowls/:id", async (req, res) => {
    try {
      const bowlId = parseInt(req.params.id);
      const bowl = await storage.getDiscussionBowlById(bowlId);
      
      if (!bowl) {
        return res.status(404).json({ message: "Discussion bowl not found" });
      }
      
      res.json(bowl);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch discussion bowl" });
    }
  });
  
  app.get("/api/discussion-bowls/:id/topics", async (req, res) => {
    try {
      const bowlId = parseInt(req.params.id);
      const topics = await storage.getTopicsByBowlId(bowlId);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });
  
  // Job listing routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const { discipline } = req.query;
      
      let jobs;
      if (discipline) {
        jobs = await storage.getJobListingsByDiscipline(discipline as string);
      } else {
        jobs = await storage.getJobListings();
      }
      
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job listings" });
    }
  });
  
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getJobListingById(jobId);
      
      if (!job) {
        return res.status(404).json({ message: "Job listing not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job listing" });
    }
  });
  
  // Mentor routes
  app.get("/api/mentors", async (req, res) => {
    try {
      const { expertise } = req.query;
      
      let mentors;
      if (expertise) {
        mentors = await storage.getMentorsByExpertise(expertise as string);
      } else {
        mentors = await storage.getMentors();
      }
      
      // Join with user data to get display names and other info
      const mentorsWithUserData = await Promise.all(mentors.map(async (mentor) => {
        const user = await storage.getUser(mentor.userId);
        return { ...mentor, user };
      }));
      
      res.json(mentorsWithUserData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mentors" });
    }
  });
  
  // Message routes
  app.get("/api/messages/:userId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const currentUserId = req.user!.id;
      const otherUserId = parseInt(req.params.userId);
      
      const messages = await storage.getMessagesBetweenUsers(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  
  app.post("/api/messages", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const { receiverId, content } = req.body;
      
      if (!receiverId || !content) {
        return res.status(400).json({ message: "Receiver ID and content are required" });
      }
      
      const message = await storage.createMessage({
        senderId: req.user!.id,
        receiverId,
        content,
        isRead: false
      });
      
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  
  app.patch("/api/messages/:id/read", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const messageId = parseInt(req.params.id);
      const updatedMessage = await storage.markMessageAsRead(messageId);
      
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
