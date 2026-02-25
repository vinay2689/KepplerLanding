import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist entry endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.workEmail);
      if (existingEntry) {
        return res.status(409).json({ 
          message: "This email is already on our waitlist." 
        });
      }
      
      // Save the waitlist entry
      const waitlistEntry = await storage.createWaitlistEntry(validatedData);
      
      return res.status(201).json({
        message: "Successfully added to waitlist",
        id: waitlistEntry.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Admin endpoint to view all waitlist entries
  app.get("/api/admin/waitlist", async (req, res) => {
    try {
      // Get all waitlist entries
      const entries = await storage.getAllWaitlistEntries();
      
      return res.status(200).json({
        count: entries.length,
        entries
      });
    } catch (error) {
      console.error("Error getting waitlist entries:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
