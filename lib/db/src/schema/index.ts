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

export const orders = pgTable("orders", {
  id:            serial("id").primaryKey(),
  orderId:       text("order_id").notNull().unique(), // The Cashfree order_id
  product:       text("product").notNull(),           // "consultation" or "course"
  amount:        text("amount").notNull(),            // E.g., "8999"
  customerName:  text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status:        text("status").default("INITIATED").notNull(), // INITIATED, SUCCESS, FAILED
  createdAt:     timestamp("created_at").defaultNow().notNull(),
});

export const consultationIntake = pgTable("consultation_intake", {
  id:        serial("id").primaryKey(),
  orderId:   text("order_id").notNull().unique(), // Link to the order
  formData:  text("form_data").notNull(),         // Store the entire questionnaire as a JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertLead                = typeof leads.$inferInsert;
export type Lead                      = typeof leads.$inferSelect;

export type InsertWebinarRegistration = typeof webinarRegistrations.$inferInsert;
export type WebinarRegistration       = typeof webinarRegistrations.$inferSelect;

export type InsertOrder               = typeof orders.$inferInsert;
export type Order                     = typeof orders.$inferSelect;

export type InsertConsultationIntake  = typeof consultationIntake.$inferInsert;
export type ConsultationIntake        = typeof consultationIntake.$inferSelect;