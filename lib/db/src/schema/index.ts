import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id:         serial("id").primaryKey(),
  name:       text("name"),                                          // nullable — some forms (download, newsletter) don't collect name
  email:      text("email").notNull(),
  phone:      text("phone"),
  profession: text("profession"),
  subject:    text("subject"),                                       // for Contact Us forms
  message:    text("message"),                                       // general message/questions
  source:     text("source").notNull().default("Contact Form"),      // "Contact Us", "Course Page", "Blog Newsletter Sidebar", etc.
  createdAt:  timestamp("created_at").defaultNow().notNull(),
});

export const webinarRegistrations = pgTable("webinar_registrations", {
  id:          serial("id").primaryKey(),
  name:        text("name").notNull(),
  email:       text("email").notNull(),
  phone:       text("phone").notNull(),
  profession:  text("profession").notNull(),
  question:    text("question"),                                     // optional question for Dr. Sangeeta
  webinarDate: text("webinar_date").default("Sunday 12-2 PM"),      // which webinar they registered for
  createdAt:   timestamp("created_at").defaultNow().notNull(),
});

export type InsertLead                = typeof leads.$inferInsert;
export type Lead                      = typeof leads.$inferSelect;

export type InsertWebinarRegistration = typeof webinarRegistrations.$inferInsert;
export type WebinarRegistration       = typeof webinarRegistrations.$inferSelect;