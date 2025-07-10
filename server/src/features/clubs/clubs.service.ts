import { db } from "@/db/index.js";
import {
	type InsertCategory,
	type InsertClub,
	type InsertSection,
	type InsertSessionSport,
	categories,
	clubs,
	membershipApplications,
	sectionResponsibilities,
	sections,
	sessionParticipants,
	sessionsSport,
	users,
} from "@/db/schema.js";
import { and, asc, desc, eq, isNull, ne, sql } from "drizzle-orm";

export const clubsService = {
	// Fonction helper pour déterminer le rôle de base d'un utilisateur
	async getUserBaseRole(userId: string): Promise<"member" | "user"> {
		// Vérifier s'il a une candidature approuvée
		const [approvedApplication] = await db
			.select()
			.from(membershipApplications)
			.where(
				and(
					eq(membershipApplications.userId, userId),
					eq(membershipApplications.status, "approved"),
				),
			)
			.limit(1);

		return approvedApplication ? "member" : "user";
	},

	// Fonction helper pour mettre à jour le rôle d'un utilisateur selon ses responsabilités
	async updateUserRole(userId: string) {
		// Vérifier les responsabilités actives
		const responsibilities = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.userId, userId),
					eq(sectionResponsibilities.isActive, true),
				),
			);

		let newRole: "admin" | "section_manager" | "coach" | "member" | "user" =
			"user";

		// Déterminer le rôle en fonction des responsabilités (ordre de priorité)
		if (responsibilities.some((r) => r.role === "section_manager")) {
			newRole = "section_manager";
		} else if (responsibilities.some((r) => r.role === "coach")) {
			newRole = "coach";
		} else {
			// Pas de responsabilités, déterminer le rôle de base
			newRole = await this.getUserBaseRole(userId);
		}

		// Mettre à jour le rôle dans la table users
		await db.update(users).set({ role: newRole }).where(eq(users.id, userId));

		return newRole;
	},

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
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as(
					"categoriesCount",
				),
				// Responsable de section
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(clubs, eq(clubs.id, sections.clubId))
			.leftJoin(categories, eq(categories.sectionId, sections.id))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(users.id, sectionResponsibilities.userId))
			.where(eq(sections.isActive, true))
			.groupBy(
				sections.id,
				clubs.id,
				clubs.name,
				users.id,
				users.firstName,
				users.lastName,
				users.email,
			)
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
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as(
					"categoriesCount",
				),
				// Responsable de section
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(categories, eq(categories.sectionId, sections.id))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(users.id, sectionResponsibilities.userId))
			.where(and(eq(sections.clubId, clubId), eq(sections.isActive, true)))
			.groupBy(
				sections.id,
				users.id,
				users.firstName,
				users.lastName,
				users.email,
			)
			.orderBy(asc(sections.name));
	},

	async getSectionById(clubId: string, sectionId: string) {
		const [section] = await db
			.select({
				id: sections.id,
				name: sections.name,
				description: sections.description,
				color: sections.color,
				clubId: sections.clubId,
				isActive: sections.isActive,
				createdAt: sections.createdAt,
				updatedAt: sections.updatedAt,
				// Responsable de section
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(users.id, sectionResponsibilities.userId))
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
				sessionsCount: sql<number>`count(distinct ${sessionsSport.id})`.as(
					"sessionsCount",
				),
				// Coach de catégorie
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(categories)
			.leftJoin(sections, eq(sections.id, categories.sectionId))
			.leftJoin(clubs, eq(clubs.id, sections.clubId))
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.categoryId, categories.id),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(users.id, sectionResponsibilities.userId))
			.where(eq(categories.isActive, true))
			.groupBy(
				categories.id,
				sections.id,
				sections.name,
				sections.color,
				clubs.id,
				clubs.name,
				users.id,
				users.firstName,
				users.lastName,
				users.email,
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
				sessionsCount: sql<number>`count(distinct ${sessionsSport.id})`.as(
					"sessionsCount",
				),
				// Coach de catégorie
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(categories)
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.categoryId, categories.id),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(users.id, sectionResponsibilities.userId))
			.where(
				and(eq(categories.sectionId, sectionId), eq(categories.isActive, true)),
			)
			.groupBy(
				categories.id,
				users.id,
				users.firstName,
				users.lastName,
				users.email,
			)
			.orderBy(asc(categories.name));
	},

	async getCategoryById(id: string) {
		const [category] = await db
			.select({
				id: categories.id,
				name: categories.name,
				description: categories.description,
				ageMin: categories.ageMin,
				ageMax: categories.ageMax,
				sectionId: categories.sectionId,
				isActive: categories.isActive,
				createdAt: categories.createdAt,
				updatedAt: categories.updatedAt,
				// Coach de catégorie
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(categories)
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.categoryId, categories.id),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(users.id, sectionResponsibilities.userId))
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
				categoryId: sessionsSport.categoryId,
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

	// Gestion des responsables de section
	async assignSectionManager(sectionId: string, userId: string) {
		// Validation des paramètres d'entrée
		if (!sectionId || !userId) {
			throw new Error("Section ID and User ID are required");
		}

		// Vérifier que la section existe
		const [section] = await db
			.select({ id: sections.id })
			.from(sections)
			.where(eq(sections.id, sectionId));

		if (!section) {
			throw new Error("Section non trouvée");
		}

		// Vérifier que l'utilisateur existe
		const [user] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.id, userId));

		if (!user) {
			throw new Error("Utilisateur non trouvé");
		}

		// D'abord, récupérer l'ancien responsable s'il existe
		const [currentManager] = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.sectionId, sectionId),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			);

		// Désactiver le responsable actuel s'il y en a un
		if (currentManager) {
			await db
				.update(sectionResponsibilities)
				.set({ isActive: false })
				.where(eq(sectionResponsibilities.id, currentManager.id));

			// Mettre à jour le rôle de l'ancien responsable
			await this.updateUserRole(currentManager.userId);
		}

		// Assigner le nouveau responsable
		const [responsibility] = await db
			.insert(sectionResponsibilities)
			.values({
				userId,
				sectionId,
				role: "section_manager",
				isActive: true,
			})
			.returning();

		// Mettre à jour le rôle du nouveau responsable
		await this.updateUserRole(userId);

		return responsibility;
	},

	async removeSectionManager(sectionId: string) {
		// Récupérer le responsable actuel
		const [currentManager] = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.sectionId, sectionId),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			);

		if (currentManager) {
			// Désactiver la responsabilité
			await db
				.update(sectionResponsibilities)
				.set({ isActive: false })
				.where(eq(sectionResponsibilities.id, currentManager.id));

			// Mettre à jour le rôle de l'utilisateur
			await this.updateUserRole(currentManager.userId);
		}
	},

	// Méthode pour obtenir les utilisateurs éligibles (non-admins) pour être assignés
	async getEligibleUsers() {
		try {
			// Version basique pour récupérer tous les utilisateurs éligibles
			const eligibleUsers = await db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
				})
				.from(users)
				.where(
					and(
						ne(users.role, "admin"), // Exclure les admins
						isNull(users.deletedAt), // Exclure les utilisateurs supprimés
					),
				)
				.orderBy(asc(users.firstName), asc(users.lastName));

			return eligibleUsers;
		} catch (error) {
			console.error("Erreur dans getEligibleUsers:", error);
			throw error;
		}
	},

	// Méthode pour obtenir les utilisateurs éligibles pour une section spécifique
	// Inclut le responsable actuel de cette section dans la liste
	async getEligibleUsersForSection(sectionId?: string) {
		try {
			const eligibleUsers = await db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
					role: users.role,
				})
				.from(users)
				.where(
					and(
						ne(users.role, "admin"), // Exclure les admins
						isNull(users.deletedAt), // Exclure les utilisateurs supprimés
					),
				)
				.orderBy(asc(users.firstName), asc(users.lastName));

			// Si aucune section spécifiée, exclure tous les responsables
			if (!sectionId) {
				return eligibleUsers
					.filter((user) => !["section_manager", "coach"].includes(user.role))
					.map((user) => ({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					}));
			}

			// Pour l'édition d'une section, inclure le responsable actuel de cette section
			const [currentManager] = await db
				.select({ userId: sectionResponsibilities.userId })
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.sectionId, sectionId),
						eq(sectionResponsibilities.role, "section_manager"),
						eq(sectionResponsibilities.isActive, true),
					),
				);

			return eligibleUsers
				.filter((user) => {
					// Inclure le responsable actuel de cette section
					if (currentManager && user.id === currentManager.userId) {
						return true;
					}
					// Exclure les autres responsables et coaches
					return !["section_manager", "coach"].includes(user.role);
				})
				.map((user) => ({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				}));
		} catch (error) {
			console.error("Erreur dans getEligibleUsersForSection:", error);
			throw error;
		}
	},

	// Méthode pour obtenir les utilisateurs éligibles pour une catégorie spécifique
	// Inclut le coach actuel de cette catégorie dans la liste
	async getEligibleUsersForCategory(categoryId?: string) {
		try {
			const eligibleUsers = await db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
					role: users.role,
				})
				.from(users)
				.where(
					and(
						ne(users.role, "admin"), // Exclure les admins
						isNull(users.deletedAt), // Exclure les utilisateurs supprimés
					),
				)
				.orderBy(asc(users.firstName), asc(users.lastName));

			// Si aucune catégorie spécifiée, exclure tous les responsables
			if (!categoryId) {
				return eligibleUsers
					.filter((user) => !["section_manager", "coach"].includes(user.role))
					.map((user) => ({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					}));
			}

			// Pour l'édition d'une catégorie, inclure le coach actuel de cette catégorie
			const [currentCoach] = await db
				.select({ userId: sectionResponsibilities.userId })
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.categoryId, categoryId),
						eq(sectionResponsibilities.role, "coach"),
						eq(sectionResponsibilities.isActive, true),
					),
				);

			return eligibleUsers
				.filter((user) => {
					// Inclure le coach actuel de cette catégorie
					if (currentCoach && user.id === currentCoach.userId) {
						return true;
					}
					// Exclure les autres responsables et coaches
					return !["section_manager", "coach"].includes(user.role);
				})
				.map((user) => ({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				}));
		} catch (error) {
			console.error("Erreur dans getEligibleUsersForCategory:", error);
			throw error;
		}
	},

	// Gestion des coaches de catégorie
	async assignCategoryCoach(categoryId: string, userId: string) {
		// Validation des paramètres d'entrée
		if (!categoryId || !userId) {
			throw new Error("Category ID and User ID are required");
		}

		// Récupérer la catégorie pour obtenir la sectionId
		const [category] = await db
			.select({ sectionId: categories.sectionId })
			.from(categories)
			.where(eq(categories.id, categoryId));

		if (!category) {
			throw new Error("Catégorie non trouvée");
		}

		// Vérifier que l'utilisateur existe
		const [user] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.id, userId));

		if (!user) {
			throw new Error("Utilisateur non trouvé");
		}

		// D'abord, récupérer l'ancien coach s'il existe
		const [currentCoach] = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.categoryId, categoryId),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true),
				),
			);

		// Désactiver le coach actuel s'il y en a un
		if (currentCoach) {
			await db
				.update(sectionResponsibilities)
				.set({ isActive: false })
				.where(eq(sectionResponsibilities.id, currentCoach.id));

			// Mettre à jour le rôle de l'ancien coach
			await this.updateUserRole(currentCoach.userId);
		}

		// Assigner le nouveau coach
		const [responsibility] = await db
			.insert(sectionResponsibilities)
			.values({
				userId,
				sectionId: category.sectionId, // Ajouter le sectionId
				categoryId,
				role: "coach",
				isActive: true,
			})
			.returning();

		// Mettre à jour le rôle du nouveau coach
		await this.updateUserRole(userId);

		return responsibility;
	},

	async removeCategoryCoach(categoryId: string) {
		// Récupérer le coach actuel
		const [currentCoach] = await db
			.select()
			.from(sectionResponsibilities)
			.where(
				and(
					eq(sectionResponsibilities.categoryId, categoryId),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true),
				),
			);

		if (currentCoach) {
			// Désactiver la responsabilité
			await db
				.update(sectionResponsibilities)
				.set({ isActive: false })
				.where(eq(sectionResponsibilities.id, currentCoach.id));

			// Mettre à jour le rôle de l'utilisateur
			await this.updateUserRole(currentCoach.userId);
		}
	},
};
