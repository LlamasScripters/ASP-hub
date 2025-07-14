import type { 
	SessionResponse, 
	CreateSessionData, 
	UpdateSessionData,
	SessionStats,
	SessionConflict,
	ParticipantAction, 
	SessionsPaginatedResponse
} from "./sessions.types.js";
import type { ParticipantActionData } from "./sessions.schema.js";
import { db } from "@/db/index.js";
import { sessionsSport, categories, sections, clubs, users, sectionResponsibilities, sessionParticipants } from "@/db/schema.js";
import { eq, and, like, count, sql, or, between, gte, lte, desc } from "drizzle-orm";

export class SessionsService {
	/**
	 * Récupère une session par son ID avec ses relations
	 */
	async getSessionById(sessionId: string): Promise<SessionResponse | null> {
		const [result] = await db
			.select({
				id: sessionsSport.id,
				categoryId: sessionsSport.categoryId,
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
				coachId: sessionsSport.coachId,
				responsibleId: sessionsSport.responsibleId,
				createdAt: sessionsSport.createdAt,
				updatedAt: sessionsSport.updatedAt,
				// Category relation
				categoryName: categories.name,
				categoryAgeMin: categories.ageMin,
				categoryAgeMax: categories.ageMax,
				// Section relation
				sectionId: sections.id,
				sectionName: sections.name,
				sectionColor: sections.color,
				// Club relation
				clubId: clubs.id,
				clubName: clubs.name,
				// Coach relation
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(sessionsSport)
			.leftJoin(categories, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(users, eq(sessionsSport.coachId, users.id))
			.where(eq(sessionsSport.id, sessionId));

		if (!result) return null;

		// Count participants
		const [participantsCount] = await db
			.select({ count: count() })
			.from(sessionParticipants)
			.where(eq(sessionParticipants.sessionId, sessionId));

		return {
			id: result.id,
			categoryId: result.categoryId,
			title: result.title,
			description: result.description,
			type: result.type,
			status: result.status,
			startDate: result.startDate,
			endDate: result.endDate,
			location: result.location,
			maxParticipants: result.maxParticipants,
			currentParticipants: result.currentParticipants || 0,
			notes: result.notes,
			coachId: result.coachId,
			responsibleId: result.responsibleId,
			createdAt: result.createdAt,
			updatedAt: result.updatedAt,
			category: {
				id: result.categoryId,
				name: result.categoryName || '',
				ageMin: result.categoryAgeMin,
				ageMax: result.categoryAgeMax,
				section: result.sectionId ? {
					id: result.sectionId,
					name: result.sectionName || '',
					color: result.sectionColor,
					club: result.clubId ? {
						id: result.clubId,
						name: result.clubName || '',
					} : undefined,
				} : undefined,
			},
			coach: result.coachId ? {
				id: result.coachId,
				firstName: result.coachFirstName || '',
				lastName: result.coachLastName || '',
				email: result.coachEmail || '',
			} : undefined,
			participantsCount: participantsCount?.count || 0,
		};
	}

	/**
	 * Récupère toutes les sessions
	 */
	async getSessions(): Promise<SessionsPaginatedResponse> {
		// Requête pour les données
		const data = await db
			.select({
				id: sessionsSport.id,
				categoryId: sessionsSport.categoryId,
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
				coachId: sessionsSport.coachId,
				responsibleId: sessionsSport.responsibleId,
				createdAt: sessionsSport.createdAt,
				updatedAt: sessionsSport.updatedAt,
				// Category relation
				categoryName: categories.name,
				categoryAgeMin: categories.ageMin,
				categoryAgeMax: categories.ageMax,
				// Section relation
				sectionId: sections.id,
				sectionName: sections.name,
				sectionColor: sections.color,
				// Club relation
				clubId: clubs.id,
				clubName: clubs.name,
				// Coach relation
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(sessionsSport)
			.leftJoin(categories, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(users, eq(sessionsSport.coachId, users.id))
			.orderBy(desc(sessionsSport.startDate));

		// Transformation des données
		const transformedData: SessionResponse[] = [];
		for (const row of data) {
			// Count participants for each session
			const [participantsCount] = await db
				.select({ count: count() })
				.from(sessionParticipants)
				.where(eq(sessionParticipants.sessionId, row.id));

			transformedData.push({
				id: row.id,
				categoryId: row.categoryId,
				title: row.title,
				description: row.description,
				type: row.type,
				status: row.status,
				startDate: row.startDate,
				endDate: row.endDate,
				location: row.location,
				maxParticipants: row.maxParticipants,
				currentParticipants: row.currentParticipants || 0,
				notes: row.notes,
				coachId: row.coachId,
				responsibleId: row.responsibleId,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt,
				category: {
					id: row.categoryId,
					name: row.categoryName || '',
					ageMin: row.categoryAgeMin,
					ageMax: row.categoryAgeMax,
					section: row.sectionId ? {
						id: row.sectionId,
						name: row.sectionName || '',
						color: row.sectionColor,
						club: row.clubId ? {
							id: row.clubId,
							name: row.clubName || '',
						} : undefined,
					} : undefined,
				},
				coach: row.coachId ? {
					id: row.coachId,
					firstName: row.coachFirstName || '',
					lastName: row.coachLastName || '',
					email: row.coachEmail || '',
				} : undefined,
				participantsCount: participantsCount?.count || 0,
			});
		}

		return {
			data: transformedData,
			total: transformedData.length,
		};
	}

	/**
	 * Récupère les sessions d'une catégorie
	 */
	async getSessionsByCategory(categoryId: string): Promise<SessionResponse[]> {
		const result = await this.getSessions();
		return result.data.filter(session => session.categoryId === categoryId);
	}

	/**
	 * Récupère les sessions d'un coach
	 */
	async getSessionsByCoach(coachId: string): Promise<SessionResponse[]> {
		const result = await this.getSessions();
		return result.data.filter(session => session.coachId === coachId);
	}

	/**
	 * Récupère les sessions à venir
	 */
	async getUpcomingSessions(limit = 10): Promise<SessionResponse[]> {
		const now = new Date();
		const result = await this.getSessions();
		return result.data
			.filter(session => 
				new Date(session.startDate) > now && 
				session.status === "planifie"
			)
			.slice(0, limit);
	}

	/**
	 * Créer une nouvelle session
	 */
	async createSession(data: CreateSessionData): Promise<SessionResponse> {
		// Vérifier les conflits potentiels
		const conflicts = await this.checkSessionConflicts(data);
		if (conflicts.length > 0) {
			throw new Error(`Conflits détectés: ${conflicts.map(c => c.conflictType).join(", ")}`);
		}

		const [createdSession] = await db
			.insert(sessionsSport)
			.values({
				...data,
				id: crypto.randomUUID(),
				currentParticipants: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		// Récupérer la session créée avec ses relations
		const session = await this.getSessionById(createdSession.id);
		if (!session) {
			throw new Error("Erreur lors de la création de la session");
		}

		return session;
	}

	/**
	 * Mettre à jour une session
	 */
	async updateSession(id: string, data: UpdateSessionData): Promise<SessionResponse> {
		// Vérifier que la session existe
		const existingSession = await this.getSessionById(id);
		if (!existingSession) {
			throw new Error("Session non trouvée");
		}

		// Vérifier les conflits potentiels si les dates changent
		if (data.startDate || data.endDate) {
			const conflictData = {
				...existingSession,
				...data,
			};
			const conflicts = await this.checkSessionConflicts(conflictData, id);
			if (conflicts.length > 0) {
				throw new Error(`Conflits détectés: ${conflicts.map(c => c.conflictType).join(", ")}`);
			}
		}

		const [updatedSession] = await db
			.update(sessionsSport)
			.set({
				...data,
				updatedAt: new Date(),
			})
			.where(eq(sessionsSport.id, id))
			.returning();

		if (!updatedSession) {
			throw new Error("Erreur lors de la mise à jour");
		}

		// Récupérer la session mise à jour avec ses relations
		const session = await this.getSessionById(updatedSession.id);
		if (!session) {
			throw new Error("Erreur lors de la mise à jour de la session");
		}

		return session;
	}

	/**
	 * Supprimer une session
	 */
	async deleteSession(id: string): Promise<void> {
		const session = await this.getSessionById(id);
		if (!session) {
			throw new Error("Session non trouvée");
		}

		// Empêcher la suppression de sessions en cours ou terminées
		if (session.status === "en_cours" || session.status === "termine") {
			throw new Error("Impossible de supprimer une session en cours ou terminée");
		}

		// Supprimer d'abord les participants
		await db.delete(sessionParticipants).where(eq(sessionParticipants.sessionId, id));
		
		// Puis supprimer la session
		await db.delete(sessionsSport).where(eq(sessionsSport.id, id));
	}

	/**
	 * Changer le statut d'une session
	 */
	async updateSessionStatus(
		id: string, 
		status: "planifie" | "en_cours" | "termine" | "annule", 
		notes?: string
	): Promise<SessionResponse> {
		const updateData: UpdateSessionData = { status };
		if (notes) {
			updateData.notes = notes;
		}

		return await this.updateSession(id, updateData);
	}

	/**
	 * Vérifier les conflits d'une session
	 */
	async checkSessionConflicts(sessionData: CreateSessionData | UpdateSessionData, excludeSessionId?: string): Promise<SessionConflict[]> {
		const conflicts: SessionConflict[] = [];

		// Vérifier les conflits temporels et de lieu
		if (sessionData.startDate && sessionData.endDate) {
			const whereConditions = [
				sql`${sessionsSport.startDate} < ${sessionData.endDate}`,
				sql`${sessionsSport.endDate} > ${sessionData.startDate}`,
				sql`${sessionsSport.status} != 'annule'`
			];

			// Exclure la session en cours de modification
			if (excludeSessionId) {
				whereConditions.push(sql`${sessionsSport.id} != ${excludeSessionId}`);
			}

			const overlappingSessions = await db
				.select({
					id: sessionsSport.id,
					title: sessionsSport.title,
					startDate: sessionsSport.startDate,
					endDate: sessionsSport.endDate,
					location: sessionsSport.location,
					coachId: sessionsSport.coachId,
				})
				.from(sessionsSport)
				.where(and(...whereConditions));

			for (const session of overlappingSessions) {
				// Conflit de lieu
				if (sessionData.location && session.location === sessionData.location) {
					conflicts.push({
						sessionId: session.id,
						title: session.title,
						startDate: session.startDate,
						endDate: session.endDate,
						location: session.location,
						conflictType: "location",
						conflictWith: session.location,
					});
				}

				// Conflit de coach
				if (sessionData.coachId && session.coachId === sessionData.coachId) {
					conflicts.push({
						sessionId: session.id,
						title: session.title,
						startDate: session.startDate,
						endDate: session.endDate,
						location: session.location,
						conflictType: "coach",
						conflictWith: session.coachId,
					});
				}
			}
		}

		return conflicts;
	}

	/**
	 * Récupérer les statistiques des sessions
	 */
	async getSessionStats(categoryId?: string): Promise<SessionStats> {
		const whereCondition = categoryId 
			? eq(sessionsSport.categoryId, categoryId)
			: undefined;

		const totalSessions = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(whereCondition);

		const sessionsByType = await db
			.select({ 
				type: sessionsSport.type,
				count: count() 
			})
			.from(sessionsSport)
			.where(whereCondition)
			.groupBy(sessionsSport.type);

		const sessionsByStatus = await db
			.select({ 
				status: sessionsSport.status,
				count: count() 
			})
			.from(sessionsSport)
			.where(whereCondition)
			.groupBy(sessionsSport.status);

		const averageParticipants = await db
			.select({ 
				avg: sql<number>`AVG(${sessionsSport.currentParticipants})` 
			})
			.from(sessionsSport)
			.where(whereCondition);

		const now = new Date();
		const upcomingSessions = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(
				and(
					whereCondition || sql`1=1`,
					gte(sessionsSport.startDate, now),
					eq(sessionsSport.status, "planifie")
				)
			);

		const completedSessions = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(
				and(
					whereCondition || sql`1=1`,
					eq(sessionsSport.status, "termine")
				)
			);

		return {
			totalSessions: totalSessions[0]?.count || 0,
			sessionsByType: sessionsByType.reduce((acc, curr) => {
				acc[curr.type] = curr.count;
				return acc;
			}, {} as Record<string, number>),
			sessionsByStatus: sessionsByStatus.reduce((acc, curr) => {
				acc[curr.status] = curr.count;
				return acc;
			}, {} as Record<string, number>),
			averageParticipants: Number(averageParticipants[0]?.avg) || 0,
			upcomingSessions: upcomingSessions[0]?.count || 0,
			completedSessions: completedSessions[0]?.count || 0,
		};
	}

	/**
	 * Gérer les participants d'une session
	 */
	async manageParticipants(sessionId: string, action: ParticipantAction): Promise<void> {
		const session = await this.getSessionById(sessionId);
		if (!session) {
			throw new Error("Session non trouvée");
		}

		if (action.action === "add") {
			// Vérifier la capacité maximale pour les ajouts
			if (session.maxParticipants) {
				const currentCount = session.participantsCount || 0;
				if (currentCount + action.memberIds.length > session.maxParticipants) {
					throw new Error("Capacité maximale atteinte");
				}
			}

			// Ajouter les participants
			for (const memberId of action.memberIds) {
				// Vérifier si déjà inscrit
				const [existing] = await db
					.select()
					.from(sessionParticipants)
					.where(
						and(
							eq(sessionParticipants.sessionId, sessionId),
							eq(sessionParticipants.userId, memberId)
						)
					);

				if (!existing) {
					await db.insert(sessionParticipants).values({
						id: crypto.randomUUID(),
						sessionId,
						userId: memberId,
						registeredAt: new Date(),
					});
				}
			}
		} else if (action.action === "remove") {
			// Retirer les participants
			for (const memberId of action.memberIds) {
				await db
					.delete(sessionParticipants)
					.where(
						and(
							eq(sessionParticipants.sessionId, sessionId),
							eq(sessionParticipants.userId, memberId)
						)
					);
			}
		}

		// Mettre à jour le compteur
		const [newCount] = await db
			.select({ count: count() })
			.from(sessionParticipants)
			.where(eq(sessionParticipants.sessionId, sessionId));

		await db
			.update(sessionsSport)
			.set({
				currentParticipants: newCount?.count || 0,
				updatedAt: new Date(),
			})
			.where(eq(sessionsSport.id, sessionId));
	}
}
