import { db } from "@/db/index.js";
import {
	type InsertCategory,
	type InsertClub,
	type InsertSection,
	type InsertSessionSport,
	categories,
	clubs,
	sectionResponsibilities,
	sections,
	sessionParticipants,
	sessionsSport,
	users,
} from "@/db/schema.js";
import { and, asc, desc, eq, sql } from "drizzle-orm";

export const clubsService = {
	// clubs (asp)
	async getClubs() {
		return await db
			.select()
			.from(clubs)
			.where(eq(clubs.isActive, true))
			.orderBy(asc(clubs.name));
	},

	async getClubById(id: string) {
		const [club] = await db
			.select()
			.from(clubs)
			.where(and(eq(clubs.id, id), eq(clubs.isActive, true)));
		return club;
	},

	async createClub(data: InsertClub) {
		const [club] = await db.insert(clubs).values(data).returning();
		return club;
	},

	async updateClub(id: string, data: Partial<InsertClub>) {
		const [club] = await db
			.update(clubs)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(clubs.id, id))
			.returning();
		return club;
	},

	async deleteClub(id: string) {
		await db
			.update(clubs)
			.set({ isActive: false, updatedAt: new Date() })
			.where(eq(clubs.id, id));
	},

	// sections
	async getSections() {
		return await db
			.select({
				id: sections.id,
				name: sections.name,
				description: sections.description,
				color: sections.color,
				clubId: sections.clubId,
				isActive: sections.isActive,
				createdAt: sections.createdAt,
				clubName: clubs.name,
				clubId_join: clubs.id,
				categoriesCount: sql<number>`count(${categories.id})`.as(
					"categoriesCount",
				),
			})
			.from(sections)
			.leftJoin(clubs, eq(clubs.id, sections.clubId))
			.leftJoin(categories, eq(categories.sectionId, sections.id))
			.where(eq(sections.isActive, true))
			.groupBy(sections.id, clubs.id, clubs.name)
			.orderBy(asc(sections.name));
	},

	async getSectionsByClub(clubId: string) {
		return await db
			.select({
				id: sections.id,
				name: sections.name,
				description: sections.description,
				color: sections.color,
				isActive: sections.isActive,
				createdAt: sections.createdAt,
				categoriesCount: sql<number>`count(${categories.id})`.as(
					"categoriesCount",
				),
			})
			.from(sections)
			.leftJoin(categories, eq(categories.sectionId, sections.id))
			.where(and(eq(sections.clubId, clubId), eq(sections.isActive, true)))
			.groupBy(sections.id)
			.orderBy(asc(sections.name));
	},

	async getSectionById(clubId: string, sectionId: string) {
		const [section] = await db
			.select()
			.from(sections)
			.where(and(eq(sections.id, sectionId), eq(sections.clubId, clubId)));
		return section;
	},

	async createSection(data: InsertSection) {
		const [section] = await db.insert(sections).values(data).returning();
		return section;
	},

	async updateSection(id: string, data: Partial<InsertSection>) {
		const [section] = await db
			.update(sections)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(sections.id, id))
			.returning();
		return section;
	},

	async deleteSection(id: string) {
		await db
			.update(sections)
			.set({ isActive: false, updatedAt: new Date() })
			.where(eq(sections.id, id));
	},

	// catégories
	async getCategories() {
		return await db
			.select({
				id: categories.id,
				name: categories.name,
				description: categories.description,
				ageMin: categories.ageMin,
				ageMax: categories.ageMax,
				sectionId: categories.sectionId,
				isActive: categories.isActive,
				createdAt: categories.createdAt,
				sectionName: sections.name,
				sectionColor: sections.color,
				sectionId_join: sections.id,
				clubName: clubs.name,
				clubId_join: clubs.id,
				sessionsCount: sql<number>`count(${sessionsSport.id})`.as(
					"sessionsCount",
				),
			})
			.from(categories)
			.leftJoin(sections, eq(sections.id, categories.sectionId))
			.leftJoin(clubs, eq(clubs.id, sections.clubId))
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.where(eq(categories.isActive, true))
			.groupBy(
				categories.id,
				sections.id,
				sections.name,
				sections.color,
				clubs.id,
				clubs.name,
			)
			.orderBy(asc(sections.name), asc(categories.name));
	},

	async getCategoriesBySection(sectionId: string) {
		return await db
			.select({
				id: categories.id,
				name: categories.name,
				description: categories.description,
				ageMin: categories.ageMin,
				ageMax: categories.ageMax,
				isActive: categories.isActive,
				createdAt: categories.createdAt,
				sessionsCount: sql<number>`count(${sessionsSport.id})`.as(
					"sessionsCount",
				),
			})
			.from(categories)
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.where(
				and(eq(categories.sectionId, sectionId), eq(categories.isActive, true)),
			)
			.groupBy(categories.id)
			.orderBy(asc(categories.name));
	},

	async getCategoryById(id: string) {
		const [category] = await db
			.select()
			.from(categories)
			.where(and(eq(categories.id, id), eq(categories.isActive, true)));
		return category;
	},

	async createCategory(data: InsertCategory) {
		const [category] = await db.insert(categories).values(data).returning();
		return category;
	},

	async updateCategory(id: string, data: Partial<InsertCategory>) {
		const [category] = await db
			.update(categories)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(categories.id, id))
			.returning();
		return category;
	},

	async deleteCategory(id: string) {
		await db
			.update(categories)
			.set({ isActive: false, updatedAt: new Date() })
			.where(eq(categories.id, id));
	},

	// sessions de sport
	async getSessions(limit = 100) {
		return await db
			.select({
				id: sessionsSport.id,
				title: sessionsSport.title,
				description: sessionsSport.description,
				type: sessionsSport.type,
				status: sessionsSport.status,
				startDate: sessionsSport.startDate,
				endDate: sessionsSport.endDate,
				location: sessionsSport.location,
				maxParticipants: sessionsSport.maxParticipants,
				currentParticipants: sessionsSport.currentParticipants,
				categoryId: sessionsSport.categoryId,
				createdAt: sessionsSport.createdAt,
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachName: users.name,
				categoryName: categories.name,
				categoryId_join: categories.id,
				sectionId: sections.id,
				sectionName: sections.name,
				sectionColor: sections.color,
				clubId: clubs.id,
				clubName: clubs.name,
			})
			.from(sessionsSport)
			.leftJoin(users, eq(users.id, sessionsSport.coachId))
			.leftJoin(categories, eq(categories.id, sessionsSport.categoryId))
			.leftJoin(sections, eq(sections.id, categories.sectionId))
			.leftJoin(clubs, eq(clubs.id, sections.clubId))
			.orderBy(desc(sessionsSport.startDate))
			.limit(limit);
	},

	async getSessionsByCategory(categoryId: string, limit = 50) {
		return await db
			.select({
				id: sessionsSport.id,
				title: sessionsSport.title,
				description: sessionsSport.description,
				type: sessionsSport.type,
				status: sessionsSport.status,
				startDate: sessionsSport.startDate,
				endDate: sessionsSport.endDate,
				location: sessionsSport.location,
				maxParticipants: sessionsSport.maxParticipants,
				currentParticipants: sessionsSport.currentParticipants,
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachName: users.name,
			})
			.from(sessionsSport)
			.leftJoin(users, eq(users.id, sessionsSport.coachId))
			.where(eq(sessionsSport.categoryId, categoryId))
			.orderBy(desc(sessionsSport.startDate))
			.limit(limit);
	},

	async getSessionById(id: string) {
		const [session] = await db
			.select({
				id: sessionsSport.id,
				title: sessionsSport.title,
				description: sessionsSport.description,
				type: sessionsSport.type,
				status: sessionsSport.status,
				startDate: sessionsSport.startDate,
				endDate: sessionsSport.endDate,
				location: sessionsSport.location,
				maxParticipants: sessionsSport.maxParticipants,
				currentParticipants: sessionsSport.currentParticipants,
				notes: sessionsSport.notes,
				categoryId: sessionsSport.categoryId,
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachName: users.name,
				categoryName: categories.name,
				categoryId_join: categories.id,
				sectionId: sections.id,
				sectionName: sections.name,
				sectionClubId: sections.clubId,
			})
			.from(sessionsSport)
			.leftJoin(users, eq(users.id, sessionsSport.coachId))
			.leftJoin(categories, eq(categories.id, sessionsSport.categoryId))
			.leftJoin(sections, eq(sections.id, categories.sectionId))
			.where(eq(sessionsSport.id, id));

		return session;
	},

	async createSession(data: InsertSessionSport) {
		const [session] = await db.insert(sessionsSport).values(data).returning();
		return session;
	},

	async updateSession(id: string, data: Partial<InsertSessionSport>) {
		const [session] = await db
			.update(sessionsSport)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(sessionsSport.id, id))
			.returning();
		return session;
	},

	async deleteSession(id: string) {
		await db.delete(sessionsSport).where(eq(sessionsSport.id, id));
	},

	// Participants aux sessions
	async getSessionParticipants(sessionId: string) {
		return await db
			.select({
				id: sessionParticipants.id,
				status: sessionParticipants.status,
				registeredAt: sessionParticipants.registeredAt,
				userId: users.id,
				userFirstName: users.firstName,
				userLastName: users.lastName,
				userName: users.name,
				userEmail: users.email,
			})
			.from(sessionParticipants)
			.innerJoin(users, eq(users.id, sessionParticipants.userId))
			.where(eq(sessionParticipants.sessionId, sessionId))
			.orderBy(asc(users.lastName));
	},

	async addParticipantToSession(sessionId: string, userId: string) {
		const [participant] = await db
			.insert(sessionParticipants)
			.values({ sessionId, userId })
			.returning();

		await db
			.update(sessionsSport)
			.set({
				currentParticipants: sql`${sessionsSport.currentParticipants} + 1`,
			})
			.where(eq(sessionsSport.id, sessionId));

		return participant;
	},

	async removeParticipantFromSession(sessionId: string, userId: string) {
		await db
			.delete(sessionParticipants)
			.where(
				and(
					eq(sessionParticipants.sessionId, sessionId),
					eq(sessionParticipants.userId, userId),
				),
			);

		// met à jour le compteur de participants
		await db
			.update(sessionsSport)
			.set({
				currentParticipants: sql`${sessionsSport.currentParticipants} - 1`,
			})
			.where(eq(sessionsSport.id, sessionId));
	},

	// responsabilités
	async getUserResponsibilities(userId: string) {
		return await db
			.select({
				id: sectionResponsibilities.id,
				role: sectionResponsibilities.role,
				assignedAt: sectionResponsibilities.assignedAt,
				sectionId: sections.id,
				sectionName: sections.name,
				sectionClubId: sections.clubId,
				categoryId: categories.id,
				categoryName: categories.name,
			})
			.from(sectionResponsibilities)
			.leftJoin(sections, eq(sections.id, sectionResponsibilities.sectionId))
			.leftJoin(
				categories,
				eq(categories.id, sectionResponsibilities.categoryId),
			)
			.where(
				and(
					eq(sectionResponsibilities.userId, userId),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.orderBy(asc(sections.name));
	},

	async assignResponsibility(data: {
		userId: string;
		sectionId?: string;
		categoryId?: string;
		role: string;
	}) {
		const [responsibility] = await db
			.insert(sectionResponsibilities)
			.values(data)
			.returning();
		return responsibility;
	},
};
