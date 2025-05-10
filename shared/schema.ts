import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - for registration and authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  university: text("university"),
  discipline: text("discipline"),
  graduationYear: integer("graduation_year"),
  bio: text("bio"),
  isAnonymous: boolean("is_anonymous").default(false),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Resources table - for educational content
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  skillLevel: text("skill_level").notNull(), // beginner, intermediate, advanced
  discipline: text("discipline").notNull(),
  authorId: integer("author_id").notNull(),
  duration: text("duration"),
  rating: integer("rating"),
  ratingCount: integer("rating_count"),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Discussions (Bowls) table - for forums
export const discussionBowls = pgTable("discussion_bowls", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  discipline: text("discipline").notNull(),
  memberCount: integer("member_count").default(0),
  postCount: integer("post_count").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Discussion Topics table - for threads within bowls
export const discussionTopics = pgTable("discussion_topics", {
  id: serial("id").primaryKey(),
  bowlId: integer("bowl_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  replyCount: integer("reply_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Job Listings table - for career opportunities
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  discipline: text("discipline").notNull(),
  experienceLevel: text("experience_level").notNull(),
  salaryRange: text("salary_range"),
  contactEmail: text("contact_email"),
  applicationUrl: text("application_url"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
});

// Mentors table - for professional connections
export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  expertise: text("expertise").notNull().array(),
  availability: text("availability"),
  isVerified: boolean("is_verified").default(false),
  rating: integer("rating"),
  ratingCount: integer("rating_count"),
});

// Messages table - for user communications
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema validation for user insertion
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
  university: true,
  discipline: true,
  graduationYear: true,
  bio: true,
  isAnonymous: true,
  avatarUrl: true,
});

// Extended schema for university email validation
export const registerUserSchema = insertUserSchema.extend({
  email: z.string().email().refine(
    (email) => email.endsWith('.edu') || email.includes('university') || email.includes('edu.'), 
    { message: "Must use a valid university email address" }
  ),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type User = typeof users.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type DiscussionBowl = typeof discussionBowls.$inferSelect;
export type DiscussionTopic = typeof discussionTopics.$inferSelect;
export type JobListing = typeof jobListings.$inferSelect;
export type Mentor = typeof mentors.$inferSelect;
export type Message = typeof messages.$inferSelect;

// Login type for authentication
export type LoginData = Pick<InsertUser, "username" | "password">;
