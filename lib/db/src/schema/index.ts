import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  profession: text("profession"),
  subject: text("subject"), // For Contact Us forms
  message: text("message"), // General message/questions
  source: text("source").notNull().default("Contact Form"), // "Contact Us", "Course Page", etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const webinarRegistrations = pgTable("webinar_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  profession: text("profession").notNull(),
  question: text("question"), // Optional question for Dr. Sangeeta
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertLead = typeof leads.$inferInsert;
export type Lead = typeof leads.$inferSelect;

export type InsertWebinarRegistration = typeof webinarRegistrations.$inferInsert;
export type WebinarRegistration = typeof webinarRegistrations.$inferSelect;