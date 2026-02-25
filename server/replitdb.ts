import ReplitClient from '@replit/database';
import { User, InsertUser, WaitlistEntry, InsertWaitlistEntry } from "@shared/schema";

// Initialize the Replit Database client
const db = new ReplitClient();

// Prefix keys to avoid collisions
const USER_PREFIX = 'user:';
const WAITLIST_PREFIX = 'waitlist:';
const USER_ID_KEY = 'userIdCounter';
const WAITLIST_ID_KEY = 'waitlistIdCounter';

// Initialize ID counters if they don't exist
async function initCounters() {
  try {
    const userIdExists = await db.get(USER_ID_KEY);
    const waitlistIdExists = await db.get(WAITLIST_ID_KEY);
    
    if (!userIdExists) {
      await db.set(USER_ID_KEY, 1);
    }
    
    if (!waitlistIdExists) {
      await db.set(WAITLIST_ID_KEY, 1);
    }
    
    console.log('Replit DB counters initialized');
  } catch (err) {
    console.error('Failed to initialize counters:', err);
  }
}

// Initialize on import
initCounters();

/**
 * ReplitDB Storage Service
 */
export class ReplitDBStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const key = `${USER_PREFIX}${id}`;
      const data = await db.get(key) as any;
      return data ? data as User : undefined;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      // Get all keys with user prefix
      const keysResult = await db.list(`${USER_PREFIX}`);
      
      if (!keysResult || typeof keysResult !== 'object') {
        return undefined;
      }
      
      // For Replit DB API compatibility
      let userKeys: string[] = [];
      if ('result' in keysResult && Array.isArray(keysResult.result)) {
        userKeys = keysResult.result;
      } else if (Array.isArray(keysResult)) {
        userKeys = keysResult;
      } else {
        // Get all keys as an object
        const keysObj = keysResult as Record<string, any>;
        userKeys = Object.keys(keysObj).filter(k => k.startsWith(USER_PREFIX));
      }
      
      if (userKeys.length === 0) {
        return undefined;
      }
      
      // Fetch all users
      const usersPromises = userKeys.map((key: string) => db.get(key));
      const users = await Promise.all(usersPromises) as any[];
      
      // Find user with matching username
      return users.find((user: any) => user?.username === username) as User | undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Get and increment user ID counter
      const idResult = await db.get(USER_ID_KEY) as any;
      const id = typeof idResult === 'number' ? idResult : 1;
      await db.set(USER_ID_KEY, id + 1);
      
      // Create user with ID
      const user: User = { ...insertUser, id };
      
      // Store user
      await db.set(`${USER_PREFIX}${id}`, user);
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Waitlist entry methods
  async getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined> {
    try {
      const key = `${WAITLIST_PREFIX}${id}`;
      const data = await db.get(key) as any;
      return data ? data as WaitlistEntry : undefined;
    } catch (error) {
      console.error('Error getting waitlist entry by ID:', error);
      return undefined;
    }
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    try {
      // Get all keys with waitlist prefix
      const keysResult = await db.list(`${WAITLIST_PREFIX}`);
      
      if (!keysResult || typeof keysResult !== 'object') {
        return undefined;
      }
      
      // For Replit DB API compatibility
      let waitlistKeys: string[] = [];
      if ('result' in keysResult && Array.isArray(keysResult.result)) {
        waitlistKeys = keysResult.result;
      } else if (Array.isArray(keysResult)) {
        waitlistKeys = keysResult;
      } else {
        // Get all keys as an object
        const keysObj = keysResult as Record<string, any>;
        waitlistKeys = Object.keys(keysObj).filter(k => k.startsWith(WAITLIST_PREFIX));
      }
      
      if (waitlistKeys.length === 0) {
        return undefined;
      }
      
      // Fetch all entries
      const entriesPromises = waitlistKeys.map((key: string) => db.get(key));
      const entries = await Promise.all(entriesPromises) as any[];
      
      // Find entry with matching email
      return entries.find((entry: any) => entry?.workEmail === email) as WaitlistEntry | undefined;
    } catch (error) {
      console.error('Error getting waitlist entry by email:', error);
      return undefined;
    }
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    try {
      // Get and increment waitlist ID counter
      const idResult = await db.get(WAITLIST_ID_KEY) as any;
      const id = typeof idResult === 'number' ? idResult : 1;
      await db.set(WAITLIST_ID_KEY, id + 1);
      
      // Create entry with ID and timestamp
      const createdAt = new Date();
      const entry: WaitlistEntry = { ...insertEntry, id, createdAt };
      
      // Store entry
      await db.set(`${WAITLIST_PREFIX}${id}`, entry);
      console.log(`Created waitlist entry with ID: ${id}`);
      
      return entry;
    } catch (error) {
      console.error('Error creating waitlist entry:', error);
      throw error;
    }
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    try {
      // Get all keys with waitlist prefix
      const keysResult = await db.list(`${WAITLIST_PREFIX}`);
      
      if (!keysResult || typeof keysResult !== 'object') {
        return [];
      }
      
      // For Replit DB API compatibility
      let allKeys: string[] = [];
      if ('result' in keysResult && Array.isArray(keysResult.result)) {
        allKeys = keysResult.result;
      } else if (Array.isArray(keysResult)) {
        allKeys = keysResult;
      } else {
        // Get all keys as an object
        const keysObj = keysResult as Record<string, any>;
        allKeys = Object.keys(keysObj).filter(k => k.startsWith(WAITLIST_PREFIX));
      }
      
      if (allKeys.length === 0) {
        return [];
      }
      
      // Exclude the counter key
      const entryKeys = allKeys.filter((key: string) => key !== WAITLIST_ID_KEY && key.startsWith(WAITLIST_PREFIX));
      
      if (entryKeys.length === 0) {
        return [];
      }
      
      // Fetch all entries
      const entriesPromises = entryKeys.map((key: string) => db.get(key));
      const entries = await Promise.all(entriesPromises) as any[];
      
      return entries.filter(entry => entry && typeof entry === 'object') as WaitlistEntry[];
    } catch (error) {
      console.error('Error getting all waitlist entries:', error);
      return [];
    }
  }
}

// Export a singleton instance
export const replitDBStorage = new ReplitDBStorage();