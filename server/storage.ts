import { users, type User, type InsertUser } from "../shared/schema";
import { waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { log } from "./vite";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist entry methods
  getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined> {
    try {
      const [entry] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.id, id));
      return entry;
    } catch (error) {
      console.error('Error getting waitlist entry:', error);
      return undefined;
    }
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    try {
      const [entry] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.workEmail, email));
      return entry;
    } catch (error) {
      console.error('Error getting waitlist entry by email:', error);
      return undefined;
    }
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    try {
      const [entry] = await db.insert(waitlistEntries).values(insertEntry).returning();
      log(`Created waitlist entry with ID: ${entry.id}`);
      return entry;
    } catch (error) {
      console.error('Error creating waitlist entry:', error);
      throw error;
    }
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    try {
      const entries = await db.select().from(waitlistEntries).orderBy(waitlistEntries.createdAt);
      return entries;
    } catch (error) {
      console.error('Error getting all waitlist entries:', error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();
console.log("Using PostgreSQL database storage");