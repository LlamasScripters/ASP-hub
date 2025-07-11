import type { 
	SessionFilters, 
	SessionWithRelations, 
	CreateSessionData, 
	UpdateSessionData,
	SessionStats,
	SessionConflict,
	ParticipantAction 
} from "./sessions.types.js";
import { db } from "@/db/index.js";
import { sessionsSport, categories, sections, clubs, users } from "@/db/schema.js";
import { eq, and, like, count, sql, or, between } from "drizzle-orm";
import type { SQL } from "drizzle-orm";

export class SessionsService {
	/**
	 * Récupère une session par son ID avec ses relations
	 */
	async getSessionById(sessionId: string): Promise<SessionWithRelations | null> {
		const result = await db
			.select()
			.from(sessionsSport)
			.leftJoin(categories, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(users, eq(sessionsSport.coachId, users.id))
			.where(eq(sessionsSport.id, sessionId))
			.limit(1);

		if (!result.length) return null;

		const row = result[0];
		
		// Compter les participants
		const participantsCount = await db
			.select({ count: count() })
			.from(sql`session_members`)
			.where(sql`session_id = ${sessionId}`);

		return {
			...row.sessions_sport,
			category: row.categories ? {
				...row.categories,
				section: row.sections ? {
					...row.sections,
					club: row.clubs ? row.clubs : undefined,
				} : undefined,
			} : undefined,
			coach: row.users ? {
				id: row.users.id,
				firstName: row.users.firstName,
				lastName: row.users.lastName,
				email: row.users.email,
			} : undefined,
			participantsCount: participantsCount[0]?.count || 0,
		};
	}

	/**
	 * Récupère toutes les sessions avec pagination et filtres
	 */
	async getSessions(filters: SessionFilters = {}): Promise<{
		data: SessionWithRelations[];
		total: number;
		page: number;
		limit: number;
	}> {
		const { 
			page = 1, 
			limit = 10, 
			categoryId, 
			clubId, 
			sectionId, 
			type, 
			status, 
			coachId,
			responsibleId,
			startDate,
			endDate,
			search 
		} = filters;
		const offset = (page - 1) * limit;

		// Construction des conditions WHERE
		const whereConditions: SQL[] = [];

		if (categoryId) {
			whereConditions.push(eq(sessionsSport.categoryId, categoryId));
		}

		if (clubId) {
			whereConditions.push(eq(clubs.id, clubId));
		}

		if (sectionId) {
			whereConditions.push(eq(sections.id, sectionId));
		}

		if (type) {
			whereConditions.push(eq(sessionsSport.type, type));
		}

		if (status) {
			whereConditions.push(eq(sessionsSport.status, status));
		}

		if (coachId) {
			whereConditions.push(eq(sessionsSport.coachId, coachId));
		}

		if (responsibleId) {
			whereConditions.push(eq(sessionsSport.responsibleId, responsibleId));
		}

		if (startDate && endDate) {
			whereConditions.push(
				between(sessionsSport.startDate, startDate, endDate)
			);
		} else if (startDate) {
			whereConditions.push(sql`${sessionsSport.startDate} >= ${startDate}`);
		} else if (endDate) {
			whereConditions.push(sql`${sessionsSport.startDate} <= ${endDate}`);
		}

		if (search) {
			whereConditions.push(
				like(sessionsSport.title, `%${search}%`)
			);
		}

		// Requête pour les données
		const data = await db
			.select()
			.from(sessionsSport)
			.leftJoin(categories, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(users, eq(sessionsSport.coachId, users.id))
			.where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
			.orderBy(sessionsSport.startDate)
			.offset(offset)
			.limit(limit);

		// Requête pour le total
		const totalResult = await db
			.select({ count: count() })
			.from(sessionsSport)
			.leftJoin(categories, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

		// Transformation des données
		const transformedData: SessionWithRelations[] = [];
		for (const row of data) {
			const participantsCount = await db
				.select({ count: count() })
				.from(sql`session_members`)
				.where(sql`session_id = ${row.sessions_sport.id}`);

			transformedData.push({
				...row.sessions_sport,
				category: row.categories ? {
					...row.categories,
					section: row.sections ? {
						...row.sections,
						club: row.clubs ? row.clubs : undefined,
					} : undefined,
				} : undefined,
				coach: row.users ? {
					id: row.users.id,
					firstName: row.users.firstName,
					lastName: row.users.lastName,
					email: row.users.email,
				} : undefined,
				participantsCount: participantsCount[0]?.count || 0,
			});
		}

		return {
			data: transformedData,
			total: totalResult[0]?.count || 0,
			page,
			limit,
		};
	}

	/**
	 * Récupère les sessions d'une catégorie
	 */
	async getSessionsByCategory(categoryId: string): Promise<SessionWithRelations[]> {
		return (await this.getSessions({ categoryId })).data;
	}

	/**
	 * Récupère les sessions d'un coach
	 */
	async getSessionsByCoach(coachId: string): Promise<SessionWithRelations[]> {
		return (await this.getSessions({ coachId })).data;
	}

	/**
	 * Récupère les sessions à venir
	 */
	async getUpcomingSessions(limit = 10): Promise<SessionWithRelations[]> {
		const now = new Date();
		return (await this.getSessions({ 
			startDate: now,
			status: "planifie",
			limit 
		})).data;
	}

	/**
	 * Créer une nouvelle session
	 */
	async createSession(data: CreateSessionData): Promise<SessionWithRelations> {
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
	async updateSession(id: string, data: UpdateSessionData): Promise<SessionWithRelations> {
		const [updatedSession] = await db
			.update(sessionsSport)
			.set({
				...data,
				updatedAt: new Date(),
			})
			.where(eq(sessionsSport.id, id))
			.returning();

		if (!updatedSession) {
			throw new Error("Session non trouvée");
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

		await db.delete(sessionsSport).where(eq(sessionsSport.id, id));
	}

	/**
	 * Changer le statut d'une session
	 */
	async updateSessionStatus(
		id: string, 
		status: "planifie" | "en_cours" | "termine" | "annule", 
		notes?: string
	): Promise<SessionWithRelations> {
		const updateData: UpdateSessionData = { status };
		if (notes) {
			updateData.notes = notes;
		}

		return await this.updateSession(id, updateData);
	}

	/**
	 * Vérifier les conflits d'une session
	 */
	async checkSessionConflicts(sessionData: CreateSessionData | UpdateSessionData): Promise<SessionConflict[]> {
		const conflicts: SessionConflict[] = [];

		// Vérifier les conflits temporels et de lieu
		if (sessionData.startDate && sessionData.endDate) {
			const overlappingSessions = await db
				.select()
				.from(sessionsSport)
				.where(
					and(
						sql`${sessionsSport.startDate} < ${sessionData.endDate}`,
						sql`${sessionsSport.endDate} > ${sessionData.startDate}`,
						sql`${sessionsSport.status} != 'annule'`
					)
				);

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
					whereCondition,
					sql`${sessionsSport.startDate} > ${now}`,
					sql`${sessionsSport.status} = 'planifie'`
				)
			);

		const completedSessions = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(
				and(
					whereCondition,
					sql`${sessionsSport.status} = 'termine'`
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
			averageParticipants: averageParticipants[0]?.avg || 0,
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

		// Vérifier la capacité maximale pour les ajouts
		if (action.action === "add" && session.maxParticipants) {
			const currentCount = session.participantsCount || 0;
			if (currentCount + action.memberIds.length > session.maxParticipants) {
				throw new Error("Capacité maximale atteinte");
			}
		}

		// Ici on devrait gérer la table session_members
		// Pour l'instant, on met juste à jour le compteur
		if (action.action === "add") {
			await db
				.update(sessionsSport)
				.set({
					currentParticipants: (session.currentParticipants || 0) + action.memberIds.length,
					updatedAt: new Date(),
				})
				.where(eq(sessionsSport.id, sessionId));
		} else {
			await db
				.update(sessionsSport)
				.set({
					currentParticipants: Math.max(0, (session.currentParticipants || 0) - action.memberIds.length),
					updatedAt: new Date(),
				})
				.where(eq(sessionsSport.id, sessionId));
		}
	}
}
