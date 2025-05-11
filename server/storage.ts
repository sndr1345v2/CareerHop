import { users, resources, discussionBowls, discussionTopics, jobListings, mentors, messages } from "@shared/schema";
import type { 
  User, InsertUser, Resource, DiscussionBowl, DiscussionTopic, 
  JobListing, Mentor, Message 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import { eq, and, or } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

const MemoryStore = createMemoryStore(session);
const PgStore = connectPgSimple(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Resource operations
  getResources(): Promise<Resource[]>;
  getResourcesByDiscipline(discipline: string): Promise<Resource[]>;
  getResourcesBySkillLevel(skillLevel: string): Promise<Resource[]>;
  getResourceById(id: number): Promise<Resource | undefined>;
  createResource(resource: Omit<Resource, "id" | "createdAt">): Promise<Resource>;
  
  // Discussion bowl operations
  getDiscussionBowls(): Promise<DiscussionBowl[]>;
  getDiscussionBowlById(id: number): Promise<DiscussionBowl | undefined>;
  createDiscussionBowl(bowl: Omit<DiscussionBowl, "id" | "createdAt" | "memberCount" | "postCount">): Promise<DiscussionBowl>;
  
  // Discussion topic operations
  getTopicsByBowlId(bowlId: number): Promise<DiscussionTopic[]>;
  createDiscussionTopic(topic: Omit<DiscussionTopic, "id" | "createdAt" | "replyCount">): Promise<DiscussionTopic>;
  
  // Job listing operations
  getJobListings(): Promise<JobListing[]>;
  getJobListingById(id: number): Promise<JobListing | undefined>;
  getJobListingsByDiscipline(discipline: string): Promise<JobListing[]>;
  createJobListing(job: Omit<JobListing, "id" | "createdAt">): Promise<JobListing>;
  
  // Mentor operations
  getMentors(): Promise<Mentor[]>;
  getMentorById(id: number): Promise<Mentor | undefined>;
  getMentorsByExpertise(expertise: string): Promise<Mentor[]>;
  createMentor(mentor: Omit<Mentor, "id">): Promise<Mentor>;
  
  // Message operations
  getMessagesBetweenUsers(userId1: number, userId2: number): Promise<Message[]>;
  createMessage(message: Omit<Message, "id" | "createdAt">): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private resourcesMap: Map<number, Resource>;
  private discussionBowlsMap: Map<number, DiscussionBowl>;
  private discussionTopicsMap: Map<number, DiscussionTopic>;
  private jobListingsMap: Map<number, JobListing>;
  private mentorsMap: Map<number, Mentor>;
  private messagesMap: Map<number, Message>;
  
  currentUserId: number;
  currentResourceId: number;
  currentBowlId: number;
  currentTopicId: number;
  currentJobId: number;
  currentMentorId: number;
  currentMessageId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.usersMap = new Map();
    this.resourcesMap = new Map();
    this.discussionBowlsMap = new Map();
    this.discussionTopicsMap = new Map();
    this.jobListingsMap = new Map();
    this.mentorsMap = new Map();
    this.messagesMap = new Map();
    
    this.currentUserId = 1;
    this.currentResourceId = 1;
    this.currentBowlId = 1;
    this.currentTopicId = 1;
    this.currentJobId = 1;
    this.currentMentorId = 1;
    this.currentMessageId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Seed some initial data for demo
    this.seedInitialData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now 
    };
    this.usersMap.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.usersMap.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.usersMap.set(id, updatedUser);
    return updatedUser;
  }

  // Resource operations
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resourcesMap.values());
  }

  async getResourcesByDiscipline(discipline: string): Promise<Resource[]> {
    return Array.from(this.resourcesMap.values()).filter(
      (resource) => resource.discipline.toLowerCase() === discipline.toLowerCase()
    );
  }

  async getResourcesBySkillLevel(skillLevel: string): Promise<Resource[]> {
    return Array.from(this.resourcesMap.values()).filter(
      (resource) => resource.skillLevel.toLowerCase() === skillLevel.toLowerCase()
    );
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resourcesMap.get(id);
  }

  async createResource(resource: Omit<Resource, "id" | "createdAt">): Promise<Resource> {
    const id = this.currentResourceId++;
    const now = new Date();
    const newResource: Resource = {
      ...resource as any,
      id,
      createdAt: now
    };
    this.resourcesMap.set(id, newResource);
    return newResource;
  }

  // Discussion bowl operations
  async getDiscussionBowls(): Promise<DiscussionBowl[]> {
    return Array.from(this.discussionBowlsMap.values());
  }

  async getDiscussionBowlById(id: number): Promise<DiscussionBowl | undefined> {
    return this.discussionBowlsMap.get(id);
  }

  async createDiscussionBowl(bowl: Omit<DiscussionBowl, "id" | "createdAt" | "memberCount" | "postCount">): Promise<DiscussionBowl> {
    const id = this.currentBowlId++;
    const now = new Date();
    const newBowl: DiscussionBowl = {
      ...bowl as any,
      id,
      memberCount: 0,
      postCount: 0,
      createdAt: now
    };
    this.discussionBowlsMap.set(id, newBowl);
    return newBowl;
  }

  // Discussion topic operations
  async getTopicsByBowlId(bowlId: number): Promise<DiscussionTopic[]> {
    return Array.from(this.discussionTopicsMap.values()).filter(
      (topic) => topic.bowlId === bowlId
    );
  }

  async createDiscussionTopic(topic: Omit<DiscussionTopic, "id" | "createdAt" | "replyCount">): Promise<DiscussionTopic> {
    const id = this.currentTopicId++;
    const now = new Date();
    const newTopic: DiscussionTopic = {
      ...topic as any,
      id,
      replyCount: 0,
      createdAt: now
    };
    this.discussionTopicsMap.set(id, newTopic);
    
    // Update bowl post count
    const bowl = this.discussionBowlsMap.get(topic.bowlId);
    if (bowl) {
      bowl.postCount += 1;
      this.discussionBowlsMap.set(bowl.id, bowl);
    }
    
    return newTopic;
  }

  // Job listing operations
  async getJobListings(): Promise<JobListing[]> {
    return Array.from(this.jobListingsMap.values()).filter(
      (job) => job.isActive === true
    );
  }

  async getJobListingById(id: number): Promise<JobListing | undefined> {
    return this.jobListingsMap.get(id);
  }

  async getJobListingsByDiscipline(discipline: string): Promise<JobListing[]> {
    return Array.from(this.jobListingsMap.values()).filter(
      (job) => job.discipline.toLowerCase() === discipline.toLowerCase() && job.isActive === true
    );
  }

  async createJobListing(job: Omit<JobListing, "id" | "createdAt">): Promise<JobListing> {
    const id = this.currentJobId++;
    const now = new Date();
    const newJob: JobListing = {
      ...job as any,
      id,
      createdAt: now
    };
    this.jobListingsMap.set(id, newJob);
    return newJob;
  }

  // Mentor operations
  async getMentors(): Promise<Mentor[]> {
    return Array.from(this.mentorsMap.values());
  }

  async getMentorById(id: number): Promise<Mentor | undefined> {
    return this.mentorsMap.get(id);
  }

  async getMentorsByExpertise(expertise: string): Promise<Mentor[]> {
    return Array.from(this.mentorsMap.values()).filter(
      (mentor) => mentor.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()))
    );
  }

  async createMentor(mentor: Omit<Mentor, "id">): Promise<Mentor> {
    const id = this.currentMentorId++;
    const newMentor: Mentor = {
      ...mentor as any,
      id
    };
    this.mentorsMap.set(id, newMentor);
    return newMentor;
  }

  // Message operations
  async getMessagesBetweenUsers(userId1: number, userId2: number): Promise<Message[]> {
    return Array.from(this.messagesMap.values()).filter(
      (message) => 
        (message.senderId === userId1 && message.receiverId === userId2) ||
        (message.senderId === userId2 && message.receiverId === userId1)
    ).sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  async createMessage(message: Omit<Message, "id" | "createdAt">): Promise<Message> {
    const id = this.currentMessageId++;
    const now = new Date();
    const newMessage: Message = {
      ...message as any,
      id,
      createdAt: now
    };
    this.messagesMap.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messagesMap.get(id);
    if (!message) return undefined;
    
    message.isRead = true;
    this.messagesMap.set(id, message);
    return message;
  }

  // Seed initial data for demo purposes
  private seedInitialData(): void {
    // This would normally be done via migrations but for demo purposes we'll seed some data
    // Will be expanded when implementing the actual features
    
    // Sample discussion bowls
    const sampleBowls: Omit<DiscussionBowl, "id" | "createdAt">[] = [
      {
        name: "Software Engineering",
        description: "Discussions about software development, coding practices, and career paths",
        discipline: "Computer Engineering",
        memberCount: 4827,
        postCount: 128,
        isActive: true
      },
      {
        name: "Mechanical Engineering",
        description: "Discussions about mechanical design, thermal systems, and industry trends",
        discipline: "Mechanical Engineering",
        memberCount: 3214,
        postCount: 76,
        isActive: true
      },
      {
        name: "Electrical Engineering",
        description: "Discussions about circuits, power systems, and electrical design",
        discipline: "Electrical Engineering",
        memberCount: 2543,
        postCount: 92,
        isActive: true
      }
    ];
    
    sampleBowls.forEach(bowl => {
      this.createDiscussionBowl(bowl);
    });
    
    // Sample resources
    const sampleResources: Omit<Resource, "id" | "createdAt">[] = [
      {
        title: "Introduction to Python for Engineers",
        description: "Learn the fundamentals of Python programming with a focus on engineering applications and problem-solving.",
        skillLevel: "beginner",
        discipline: "Computer Engineering",
        authorId: 1,
        duration: "3.5 hours",
        rating: 4,
        ratingCount: 120,
        url: "https://example.com/intro-python"
      },
      {
        title: "Circuit Design for IoT Applications",
        description: "Learn how to design efficient and practical circuits for Internet of Things devices with real-world applications.",
        skillLevel: "intermediate",
        discipline: "Electrical Engineering",
        authorId: 2,
        duration: "5 hours",
        rating: 5,
        ratingCount: 85,
        url: "https://example.com/iot-circuits"
      },
      {
        title: "Machine Learning for Predictive Maintenance",
        description: "Advanced course on implementing ML algorithms to predict equipment failures and optimize maintenance schedules.",
        skillLevel: "advanced",
        discipline: "Data Science",
        authorId: 3,
        duration: "8 hours",
        rating: 5,
        ratingCount: 67,
        url: "https://example.com/ml-maintenance"
      }
    ];
    
    sampleResources.forEach(resource => {
      this.createResource(resource);
    });
    
    // Sample job listings
    const sampleJobs: Omit<JobListing, "id" | "createdAt">[] = [
      {
        title: "Software Engineer Intern",
        company: "TechCorp",
        location: "San Francisco, CA",
        description: "Looking for a software engineering intern to join our team for the summer.",
        requirements: "Currently pursuing a degree in Computer Science or related field. Knowledge of JavaScript and React.",
        discipline: "Computer Engineering",
        experienceLevel: "Entry Level",
        salaryRange: "$20-25/hour",
        contactEmail: "careers@techcorp.com",
        applicationUrl: "https://techcorp.com/careers",
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        isActive: true
      },
      {
        title: "Mechanical Design Engineer",
        company: "Engineering Solutions Inc.",
        location: "Boston, MA",
        description: "Join our team designing the next generation of mechanical systems.",
        requirements: "BS in Mechanical Engineering. Experience with CAD software, preferably SolidWorks.",
        discipline: "Mechanical Engineering",
        experienceLevel: "Mid Level",
        salaryRange: "$80,000-95,000/year",
        contactEmail: "hr@engsolve.com",
        applicationUrl: "https://engsolve.com/jobs",
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isActive: true
      }
    ];
    
    sampleJobs.forEach(job => {
      this.createJobListing(job);
    });
  }
}

// Database storage implementation for Heroku PostgreSQL
export class DatabaseStorage implements IStorage {
  private db: PostgresJsDatabase;
  sessionStore: any; // Using any to avoid TypeScript errors with session.SessionStore

  constructor(db: PostgresJsDatabase) {
    this.db = db;
    
    // Initialize PostgreSQL session store
    this.sessionStore = new PgStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      },
      createTableIfMissing: true
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users)
      .where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users)
      .where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const result = await this.db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  // Resource operations
  async getResources(): Promise<Resource[]> {
    return await this.db.select().from(resources);
  }

  async getResourcesByDiscipline(discipline: string): Promise<Resource[]> {
    return await this.db.select().from(resources)
      .where(eq(resources.discipline, discipline));
  }

  async getResourcesBySkillLevel(skillLevel: string): Promise<Resource[]> {
    return await this.db.select().from(resources)
      .where(eq(resources.skillLevel, skillLevel));
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    const result = await this.db.select().from(resources)
      .where(eq(resources.id, id));
    return result[0];
  }

  async createResource(resource: Omit<Resource, "id" | "createdAt">): Promise<Resource> {
    const result = await this.db.insert(resources).values({
      ...resource,
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  // Discussion bowl operations
  async getDiscussionBowls(): Promise<DiscussionBowl[]> {
    return await this.db.select().from(discussionBowls);
  }

  async getDiscussionBowlById(id: number): Promise<DiscussionBowl | undefined> {
    const result = await this.db.select().from(discussionBowls)
      .where(eq(discussionBowls.id, id));
    return result[0];
  }

  async createDiscussionBowl(bowl: Omit<DiscussionBowl, "id" | "createdAt" | "memberCount" | "postCount">): Promise<DiscussionBowl> {
    const result = await this.db.insert(discussionBowls).values({
      ...bowl,
      memberCount: 0,
      postCount: 0,
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  // Discussion topic operations
  async getTopicsByBowlId(bowlId: number): Promise<DiscussionTopic[]> {
    return await this.db.select().from(discussionTopics)
      .where(eq(discussionTopics.bowlId, bowlId));
  }

  async createDiscussionTopic(topic: Omit<DiscussionTopic, "id" | "createdAt" | "replyCount">): Promise<DiscussionTopic> {
    const result = await this.db.insert(discussionTopics).values({
      ...topic,
      replyCount: 0,
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  // Job listing operations
  async getJobListings(): Promise<JobListing[]> {
    return await this.db.select().from(jobListings);
  }

  async getJobListingById(id: number): Promise<JobListing | undefined> {
    const result = await this.db.select().from(jobListings)
      .where(eq(jobListings.id, id));
    return result[0];
  }

  async getJobListingsByDiscipline(discipline: string): Promise<JobListing[]> {
    return await this.db.select().from(jobListings)
      .where(eq(jobListings.discipline, discipline));
  }

  async createJobListing(job: Omit<JobListing, "id" | "createdAt">): Promise<JobListing> {
    const result = await this.db.insert(jobListings).values({
      ...job,
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  // Mentor operations
  async getMentors(): Promise<Mentor[]> {
    return await this.db.select().from(mentors);
  }

  async getMentorById(id: number): Promise<Mentor | undefined> {
    const result = await this.db.select().from(mentors)
      .where(eq(mentors.id, id));
    return result[0];
  }

  async getMentorsByExpertise(expertise: string): Promise<Mentor[]> {
    // This is a simplified implementation; in a real-world scenario,
    // you would need a more sophisticated query for arrays
    const allMentors = await this.db.select().from(mentors);
    return allMentors.filter(mentor => 
      mentor.expertise && mentor.expertise.includes(expertise)
    );
  }

  async createMentor(mentor: Omit<Mentor, "id">): Promise<Mentor> {
    const result = await this.db.insert(mentors).values(mentor).returning();
    return result[0];
  }

  // Message operations
  async getMessagesBetweenUsers(userId1: number, userId2: number): Promise<Message[]> {
    return await this.db.select().from(messages).where(
      or(
        and(
          eq(messages.senderId, userId1),
          eq(messages.recipientId, userId2)
        ),
        and(
          eq(messages.senderId, userId2),
          eq(messages.recipientId, userId1)
        )
      )
    ).orderBy(messages.createdAt);
  }

  async createMessage(message: Omit<Message, "id" | "createdAt">): Promise<Message> {
    const result = await this.db.insert(messages).values({
      ...message,
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const result = await this.db.update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return result[0];
  }
}

// Choose storage implementation based on environment
// For the time being, use MemStorage as default since we're deploying the initial version
export const storage = new MemStorage();
