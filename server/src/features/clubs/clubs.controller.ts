import type { InsertSessionSport } from "@/db/schema.js";
import { type Request, type Response, Router } from "express";
import { clubsService } from "./clubs.service.js";

const clubsRouter = Router();

// ========== ROUTES GLOBALES ==========
// toutes les sections du club
clubsRouter.get("/all/sections", async (req: Request, res: Response) => {
	try {
		const allSections = await clubsService.getSections();
		const formatted = allSections.map((section) => ({
			id: section.id,
			name: section.name,
			description: section.description,
			color: section.color,
			clubId: section.clubId,
			isActive: section.isActive,
			createdAt: section.createdAt,
			categoriesCount: section.categoriesCount,
			club: section.clubId_join
				? {
						id: section.clubId_join,
						name: section.clubName,
					}
				: null,
		}));
		res.json(formatted);
	} catch (error) {
		console.error("Erreur getSections:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des sections" });
	}
});

// toutes les catégories (de toutes sections confondues)
clubsRouter.get("/all/categories", async (req: Request, res: Response) => {
	try {
		const allCategories = await clubsService.getCategories();
		const formatted = allCategories.map((category) => ({
			id: category.id,
			name: category.name,
			description: category.description,
			ageMin: category.ageMin,
			ageMax: category.ageMax,
			sectionId: category.sectionId,
			isActive: category.isActive,
			createdAt: category.createdAt,
			sessionsCount: category.sessionsCount,
			section: category.sectionId_join
				? {
						id: category.sectionId_join,
						name: category.sectionName,
						color: category.sectionColor,
						club: category.clubId_join
							? {
									id: category.clubId_join,
									name: category.clubName,
								}
							: null,
					}
				: null,
		}));
		res.json(formatted);
	} catch (error) {
		console.error("Erreur getCategories:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des catégories" });
	}
});

// toutes les sessions (de toutes catégories confondues)
clubsRouter.get("/all/sessions", async (req: Request, res: Response) => {
	try {
		const limit = Number.parseInt(req.query.limit as string) || 100;
		const allSessions = await clubsService.getSessions(limit);
		const formatted = allSessions.map((session) => ({
			id: session.id,
			title: session.title,
			description: session.description,
			type: session.type,
			status: session.status,
			startDate: session.startDate,
			endDate: session.endDate,
			location: session.location,
			maxParticipants: session.maxParticipants,
			currentParticipants: session.currentParticipants,
			categoryId: session.categoryId,
			createdAt: session.createdAt,
			coach: session.coachId
				? {
						id: session.coachId,
						firstName: session.coachFirstName,
						lastName: session.coachLastName,
						name: session.coachName,
					}
				: null,
			category: session.categoryId_join
				? {
						id: session.categoryId_join,
						name: session.categoryName,
						section: session.sectionId
							? {
									id: session.sectionId,
									name: session.sectionName,
									color: session.sectionColor,
									club: session.clubId
										? {
												id: session.clubId,
												name: session.clubName,
											}
										: null,
								}
							: null,
					}
				: null,
		}));
		res.json(formatted);
	} catch (error) {
		console.error("Erreur getSessions:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des sessions" });
	}
});

// ========== ROUTES SESSIONS DIRECTES ==========
// session individuelle
clubsRouter.get("/sessions/:sessionId", async (req: Request, res: Response) => {
	try {
		const session = await clubsService.getSessionById(req.params.sessionId);
		if (!session) {
			res.status(404).json({ error: "Session non trouvée" });
			return;
		}
		const formatted = {
			id: session.id,
			title: session.title,
			description: session.description,
			type: session.type,
			status: session.status,
			startDate: session.startDate,
			endDate: session.endDate,
			location: session.location,
			maxParticipants: session.maxParticipants,
			currentParticipants: session.currentParticipants,
			notes: session.notes,
			categoryId: session.categoryId,
			coach: session.coachId
				? {
						id: session.coachId,
						firstName: session.coachFirstName,
						lastName: session.coachLastName,
						name: session.coachName,
					}
				: null,
			category: session.categoryId_join
				? {
						id: session.categoryId_join,
						name: session.categoryName,
						section: session.sectionId
							? {
									id: session.sectionId,
									name: session.sectionName,
									clubId: session.sectionClubId,
								}
							: null,
					}
				: null,
		};
		res.json(formatted);
	} catch (error) {
		console.error("Erreur getSessionById:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération de la session" });
	}
});

clubsRouter.put("/sessions/:sessionId", async (req: Request, res: Response) => {
	try {
		const {
			title,
			description,
			startDate,
			endDate,
			location,
			type,
			status,
			maxParticipants,
			notes,
			categoryId,
		} = req.body;

		const updateData: Partial<InsertSessionSport> = {};

		if (title !== undefined) updateData.title = title;
		if (description !== undefined) updateData.description = description;
		if (startDate !== undefined) updateData.startDate = new Date(startDate);
		if (endDate !== undefined) updateData.endDate = new Date(endDate);
		if (location !== undefined) updateData.location = location;
		if (type !== undefined) updateData.type = type;
		if (status !== undefined) updateData.status = status;
		if (maxParticipants !== undefined)
			updateData.maxParticipants = maxParticipants
				? Number(maxParticipants)
				: null;
		if (notes !== undefined) updateData.notes = notes;
		if (categoryId !== undefined) updateData.categoryId = categoryId;

		const updated = await clubsService.updateSession(
			req.params.sessionId,
			updateData,
		);
		res.json(updated);
	} catch (error) {
		console.error("Erreur updateSession:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la mise à jour de la session" });
	}
});

clubsRouter.delete(
	"/sessions/:sessionId",
	async (req: Request, res: Response) => {
		try {
			await clubsService.deleteSession(req.params.sessionId);
			res.sendStatus(204);
		} catch (error) {
			console.error("Erreur deleteSession:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la suppression de la session" });
		}
	},
);

// ========== ROUTES PARTICIPANTS ==========
clubsRouter.get(
	"/sessions/:sessionId/participants",
	async (req: Request, res: Response) => {
		try {
			const list = await clubsService.getSessionParticipants(
				req.params.sessionId,
			);
			const formatted = list.map((p) => ({
				id: p.id,
				status: p.status,
				registeredAt: p.registeredAt,
				user: {
					id: p.userId,
					firstName: p.userFirstName,
					lastName: p.userLastName,
					name: p.userName,
					email: p.userEmail,
				},
			}));
			res.json(formatted);
		} catch (error) {
			console.error("Erreur getSessionParticipants:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des participants" });
		}
	},
);

clubsRouter.post(
	"/sessions/:sessionId/participants",
	async (req: Request, res: Response) => {
		try {
			const { userId } = req.body;
			const added = await clubsService.addParticipantToSession(
				req.params.sessionId,
				userId,
			);
			res.status(201).json(added);
		} catch (error) {
			console.error("Erreur addParticipantToSession:", error);
			res.status(500).json({ error: "Erreur lors de l'ajout du participant" });
		}
	},
);

clubsRouter.delete(
	"/sessions/:sessionId/participants/:userId",
	async (req: Request, res: Response) => {
		try {
			await clubsService.removeParticipantFromSession(
				req.params.sessionId,
				req.params.userId,
			);
			res.sendStatus(204);
		} catch (error) {
			console.error("Erreur removeParticipantFromSession:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la suppression du participant" });
		}
	},
);

// ========== ROUTES RESPONSABILITÉS ==========
clubsRouter.get(
	"/users/:userId/responsibilities",
	async (req: Request, res: Response) => {
		try {
			const list = await clubsService.getUserResponsibilities(
				req.params.userId,
			);
			const formatted = list.map((r) => ({
				id: r.id,
				role: r.role,
				assignedAt: r.assignedAt,
				section: r.sectionId
					? {
							id: r.sectionId,
							name: r.sectionName,
							clubId: r.sectionClubId,
						}
					: null,
				category: r.categoryId
					? {
							id: r.categoryId,
							name: r.categoryName,
						}
					: null,
			}));
			res.json(formatted);
		} catch (error) {
			console.error("Erreur getUserResponsibilities:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des responsabilités" });
		}
	},
);

clubsRouter.post("/responsibilities", async (req: Request, res: Response) => {
	try {
		const created = await clubsService.assignResponsibility(req.body);
		res.status(201).json(created);
	} catch (error) {
		console.error("Erreur assignResponsibility:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de l'attribution de la responsabilité" });
	}
});

// ========== ROUTES CLUBS ==========
clubsRouter.get("/", async (req: Request, res: Response) => {
	try {
		const allClubs = await clubsService.getClubs();
		res.json(allClubs);
	} catch (error) {
		console.error("Erreur getClubs:", error);
		res.status(500).json({ error: "Erreur lors de la récupération des clubs" });
	}
});

clubsRouter.post("/", async (req: Request, res: Response) => {
	try {
		const newClub = await clubsService.createClub(req.body);
		res.status(201).json(newClub);
	} catch (error) {
		console.error("Erreur createClub:", error);
		res.status(500).json({ error: "Erreur lors de la création du club" });
	}
});

// ========== ROUTES AVEC PARAMÈTRES ==========
clubsRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const club = await clubsService.getClubById(req.params.id);
		if (!club) {
			res.status(404).json({ error: "Club non trouvé" });
			return;
		}
		res.json(club);
	} catch (error) {
		console.error("Erreur getClubById:", error);
		res.status(500).json({ error: "Erreur lors de la récupération du club" });
	}
});

clubsRouter.put("/:id", async (req: Request, res: Response) => {
	try {
		const updatedClub = await clubsService.updateClub(req.params.id, req.body);
		res.json(updatedClub);
	} catch (error) {
		console.error("Erreur updateClub:", error);
		res.status(500).json({ error: "Erreur lors de la mise à jour du club" });
	}
});

clubsRouter.delete("/:id", async (req: Request, res: Response) => {
	try {
		await clubsService.deleteClub(req.params.id);
		res.sendStatus(204);
	} catch (error) {
		console.error("Erreur deleteClub:", error);
		res.status(500).json({ error: "Erreur lors de la suppression du club" });
	}
});

// ========== ROUTES SECTIONS ==========
// sections d'un club spécifique
clubsRouter.get("/:clubId/sections", async (req: Request, res: Response) => {
	try {
		const sections = await clubsService.getSectionsByClub(req.params.clubId);
		res.json(sections);
	} catch (error) {
		console.error("Erreur getSectionsByClub:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des sections" });
	}
});

clubsRouter.get(
	"/:clubId/sections/:sectionId",
	async (req: Request, res: Response) => {
		try {
			const { clubId, sectionId } = req.params;
			const section = await clubsService.getSectionById(clubId, sectionId);

			res.json(section);
		} catch (error) {
			console.error("Erreur getSectionById:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

clubsRouter.post("/:clubId/sections", async (req: Request, res: Response) => {
	try {
		const sectionData = { ...req.body, clubId: req.params.clubId };
		const section = await clubsService.createSection(sectionData);
		res.status(201).json(section);
	} catch (error) {
		console.error("Erreur createSection:", error);
		res.status(500).json({ error: "Erreur lors de la création de la section" });
	}
});

clubsRouter.put(
	"/:clubId/sections/:sectionId",
	async (req: Request, res: Response) => {
		try {
			const section = await clubsService.updateSection(
				req.params.sectionId,
				req.body,
			);
			res.json(section);
		} catch (error) {
			console.error("Erreur updateSection:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la mise à jour de la section" });
		}
	},
);

clubsRouter.delete(
	"/:clubId/sections/:sectionId",
	async (req: Request, res: Response) => {
		try {
			await clubsService.deleteSection(req.params.sectionId);
			res.sendStatus(204);
		} catch (error) {
			console.error("Erreur deleteSection:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la suppression de la section" });
		}
	},
);

// ========== ROUTES CATÉGORIES ==========
// catégories d'une section spécifique
clubsRouter.get(
	"/:clubId/sections/:sectionId/categories",
	async (req: Request, res: Response) => {
		try {
			const categories = await clubsService.getCategoriesBySection(
				req.params.sectionId,
			);
			res.json(categories);
		} catch (error) {
			console.error("Erreur getCategoriesBySection:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des catégories" });
		}
	},
);

clubsRouter.post(
	"/:clubId/sections/:sectionId/categories",
	async (req: Request, res: Response) => {
		try {
			const categoryData = { ...req.body, sectionId: req.params.sectionId };
			const category = await clubsService.createCategory(categoryData);
			res.status(201).json(category);
		} catch (error) {
			console.error("Erreur createCategory:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la création de la catégorie" });
		}
	},
);

clubsRouter.get(
	"/:clubId/sections/:sectionId/categories/:categoryId",
	async (req: Request, res: Response) => {
		try {
			const category = await clubsService.getCategoryById(
				req.params.categoryId,
			);
			if (!category) {
				res.status(404).json({ error: "Catégorie non trouvée" });
				return;
			}
			res.json(category);
		} catch (error) {
			console.error("Erreur getCategoryById:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération de la catégorie" });
		}
	},
);

clubsRouter.put(
	"/:clubId/sections/:sectionId/categories/:categoryId",
	async (req: Request, res: Response) => {
		try {
			const category = await clubsService.updateCategory(
				req.params.categoryId,
				req.body,
			);
			res.json(category);
		} catch (error) {
			console.error("Erreur updateCategory:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la mise à jour de la catégorie" });
		}
	},
);

clubsRouter.delete(
	"/:clubId/sections/:sectionId/categories/:categoryId",
	async (req: Request, res: Response) => {
		try {
			await clubsService.deleteCategory(req.params.categoryId);
			res.sendStatus(204);
		} catch (error) {
			console.error("Erreur deleteCategory:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la suppression de la catégorie" });
		}
	},
);

// ========== ROUTES SESSIONS ==========
// sessions d'une catégorie spécifique
clubsRouter.get(
	"/:clubId/sections/:sectionId/categories/:categoryId/sessions",
	async (req: Request, res: Response) => {
		try {
			const limit = Number.parseInt(req.query.limit as string) || 50;
			const sessions = await clubsService.getSessionsByCategory(
				req.params.categoryId,
				limit,
			);
			const formatted = sessions.map((s) => ({
				id: s.id,
				title: s.title,
				description: s.description,
				type: s.type,
				status: s.status,
				startDate: s.startDate,
				endDate: s.endDate,
				location: s.location,
				maxParticipants: s.maxParticipants,
				currentParticipants: s.currentParticipants,
				coach: s.coachId
					? {
							id: s.coachId,
							firstName: s.coachFirstName,
							lastName: s.coachLastName,
							name: s.coachName,
						}
					: null,
			}));
			res.json(formatted);
		} catch (error) {
			console.error("Erreur getSessionsByCategory:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des sessions" });
		}
	},
);

clubsRouter.post(
	"/:clubId/sections/:sectionId/categories/:categoryId/sessions",
	async (req, res) => {
		try {
			const {
				title,
				description,
				startDate,
				endDate,
				location,
				type,
				status,
				maxParticipants,
			} = req.body;

			const categoryId = req.params.categoryId;

			const created = await clubsService.createSession({
				categoryId,
				title,
				description,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				location,
				type,
				status,
				maxParticipants: maxParticipants ? Number(maxParticipants) : null,
			});

			res.status(201).json(created);
		} catch (error) {
			console.error("Erreur createSession:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la création de la session" });
		}
	},
);

export default clubsRouter;
