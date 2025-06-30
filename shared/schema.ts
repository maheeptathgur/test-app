import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const copilots = pgTable("copilots", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  status: text("status").notNull().default("online"),
  userId: integer("user_id").references(() => users.id),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // 'user' or 'bot'
  copilotId: integer("copilot_id").references(() => copilots.id),
  timestamp: text("timestamp").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCopilotSchema = createInsertSchema(copilots).pick({
  name: true,
  description: true,
  type: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  sender: true,
  copilotId: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCopilot = z.infer<typeof insertCopilotSchema>;
export type Copilot = typeof copilots.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
