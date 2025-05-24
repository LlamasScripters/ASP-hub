import {
	boolean,
	date,
	pgTable,
	pgEnum,
	text,
	timestamp,
	uuid,
	varchar,
	integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	// lastName defaults to empty string because social login may not provide it
	lastName: varchar("last_name", { length: 255 }).notNull().default(""),
	email: varchar("email", { length: 255 }).notNull().unique(),
	name: text("name").notNull(),
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

export const reservationStatusEnum = pgEnum("reservation_status", [
	"pending",
	"confirmed",
	"cancelled",
	"completed",
	"no_show",
	"rescheduled",
]);

export const complexs = pgTable("complexs", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	street: varchar("street", { length: 255 }).notNull(),
	city: varchar("city", { length: 100 }).notNull(),
	postalCode: varchar("postal_code", { length: 20 }).notNull(),
	numberOfElevators: integer("number_of_elevators").notNull().default(0),
	accessibleForReducedMobility: boolean("accessible_for_reduced_mobility").notNull().default(false),
	parkingCapacity: integer("parking_capacity").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
});

export const rooms = pgTable("rooms", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	sportType: varchar("sport_type", { length: 100 }).notNull(),
	isIndoor: boolean("is_indoor").notNull().default(true),
	accreditation: varchar("accreditation", { length: 255 }),
	complexId: uuid("complex_id")
		.references(() => complexs.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
});

export const reservations = pgTable("reservations", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: varchar("title", { length: 255 }).notNull(),
	startAt: timestamp("start_at").notNull(),
	endAt: timestamp("end_at").notNull(),
	roomId: uuid("room_id")
		.references(() => rooms.id, { onDelete: "cascade" })
		.notNull(),
	bookerId: uuid("booker_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	status: reservationStatusEnum("status").notNull().default("pending"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type InsertVerification = typeof verifications.$inferInsert;
export type Verification = typeof verifications.$inferSelect;
export type InsertTwoFactor = typeof twoFactors.$inferInsert;
export type SelectTwoFactor = typeof twoFactors.$inferSelect;
// Complexes
export type InsertComplex = typeof complexs.$inferInsert;
export type SelectComplex = typeof complexs.$inferSelect;
// Rooms
export type InsertRoom = typeof rooms.$inferInsert;
export type SelectRoom = typeof rooms.$inferSelect;
// Reservations
export type InsertReservation = typeof reservations.$inferInsert;
export type SelectReservation = typeof reservations.$inferSelect;

export const reservationStatusEnumValues = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
  "rescheduled",
] as const;
export type ReservationStatus = typeof reservationStatusEnumValues[number];

