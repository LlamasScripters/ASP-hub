import {
	boolean,
	date,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
	integer,
	pgEnum,
} from "drizzle-orm/pg-core";

// énumérations pour les types
export const sessionTypeEnum = pgEnum("session_type", [
	"entrainement",
	"match",
	"stage",
	"competition",
	"autre"
]);

export const sessionStatusEnum = pgEnum("session_status", [
	"planifie",
	"en_cours", 
	"termine",
	"annule"
]);

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	name: text("name"),
	dateOfBirth: date("date_of_birth"),
	acceptTerms: boolean("accept_terms").notNull(),
	emailVerified: boolean("email_verified").notNull().default(false),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	twoFactorEnabled: boolean("two_factor_enabled"),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow(),
	deletedAt: timestamp("deleted_at"),
});

export const sessions = pgTable("sessions", {
	id: uuid("id").primaryKey().defaultRandom(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
	id: uuid("id").primaryKey().defaultRandom(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
	id: uuid("id").primaryKey().defaultRandom(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const twoFactors = pgTable("two_factors", {
	id: uuid("id").primaryKey().defaultRandom(),
	secret: text("secret").notNull(),
	backupCodes: text("backup_codes").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

// table des clubs (ASP)
export const clubs = pgTable("clubs", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	address: text("address"),
	phone: varchar("phone", { length: 20 }),
	email: varchar("email", { length: 255 }),
	website: varchar("website", { length: 255 }),
	logo: text("logo"),
	isActive: boolean("is_active").notNull().default(true),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow(),
});

// table des sections (sports du club)
export const sections = pgTable("sections", {
	id: uuid("id").primaryKey().defaultRandom(),
	clubId: uuid("club_id")
		.notNull()
		.references(() => clubs.id, { onDelete: "cascade" }),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	color: varchar("color", { length: 7 }).default("#3B82F6"),
	isActive: boolean("is_active").notNull().default(true),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow(),
});

// table des catégories de sessions (entraînements, matchs, stages)
export const categories = pgTable("categories", {
	id: uuid("id").primaryKey().defaultRandom(),
	sectionId: uuid("section_id")
		.notNull()
		.references(() => sections.id, { onDelete: "cascade" }),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	ageMin: integer("age_min"),
	ageMax: integer("age_max"),
	isActive: boolean("is_active").notNull().default(true),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow(),
});

// table des sessions (entraînements/matchs/stages)
export const sessionsSport = pgTable("sessions_sport", {
	id: uuid("id").primaryKey().defaultRandom(),
	categoryId: uuid("category_id")
		.notNull()
		.references(() => categories.id, { onDelete: "cascade" }),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description"),
	type: sessionTypeEnum("type").notNull().default("entrainement"),
	status: sessionStatusEnum("status").notNull().default("planifie"),
	startDate: timestamp("start_date").notNull(),
	endDate: timestamp("end_date").notNull(),
	location: varchar("location", { length: 255 }),
	maxParticipants: integer("max_participants"),
	currentParticipants: integer("current_participants").default(0),
	notes: text("notes"),
	coachId: uuid("coach_id")
		.references(() => users.id, { onDelete: "set null" }),
	responsibleId: uuid("responsible_id")
		.references(() => users.id, { onDelete: "set null" }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow(),
});

// table de liaison pour les participants aux sessions
export const sessionParticipants = pgTable("session_participants", {
	id: uuid("id").primaryKey().defaultRandom(),
	sessionId: uuid("session_id")
		.notNull()
		.references(() => sessions.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	registeredAt: timestamp("registered_at").defaultNow().notNull(),
	status: varchar("status", { length: 50 }).default("inscrit"),
});

// table des responsabilités dans les sections/catégories
export const sectionResponsibilities = pgTable("section_responsibilities", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	sectionId: uuid("section_id")
		.references(() => sections.id, { onDelete: "cascade" }),
	categoryId: uuid("category_id")
		.references(() => categories.id, { onDelete: "cascade" }),
	role: varchar("role", { length: 100 }).notNull(),
	assignedAt: timestamp("assigned_at").defaultNow().notNull(),
	isActive: boolean("is_active").notNull().default(true),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;
export type InsertVerification = typeof verifications.$inferInsert;
export type SelectVerification = typeof verifications.$inferSelect;
export type InsertTwoFactor = typeof twoFactors.$inferInsert;
export type SelectTwoFactor = typeof twoFactors.$inferSelect;
export type InsertClub = typeof clubs.$inferInsert;
export type SelectClub = typeof clubs.$inferSelect;
export type InsertSection = typeof sections.$inferInsert;
export type SelectSection = typeof sections.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type InsertSessionSport = typeof sessionsSport.$inferInsert;
export type SelectSessionSport = typeof sessionsSport.$inferSelect;
export type InsertSessionParticipant = typeof sessionParticipants.$inferInsert;
export type SelectSessionParticipant = typeof sessionParticipants.$inferSelect;
export type InsertSectionResponsibility = typeof sectionResponsibilities.$inferInsert;
export type SelectSectionResponsibility = typeof sectionResponsibilities.$inferSelect;
