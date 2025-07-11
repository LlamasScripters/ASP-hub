import { db } from "@/db/index.js";
import { sectionResponsibilities, users } from "@/db/schema.js";
import { and, eq } from "drizzle-orm";
import { getUserBaseRole } from "./membership-helpers.js";

/**
 * Utilitaires pour la gestion des rôles et responsabilités
 */

/**
 * Met à jour le rôle d'un utilisateur selon ses responsabilités actives
 * @param userId - ID de l'utilisateur
 * @returns Le nouveau rôle assigné
 */
export async function updateUserRole(userId: string): Promise<"admin" | "section_manager" | "coach" | "member" | "user"> {
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

	let newRole: "admin" | "section_manager" | "coach" | "member" | "user" = "user";

	// Déterminer le rôle en fonction des responsabilités (ordre de priorité)
	if (responsibilities.some((r) => r.role === "section_manager")) {
		newRole = "section_manager";
	} else if (responsibilities.some((r) => r.role === "coach")) {
		newRole = "coach";
	} else {
		// Pas de responsabilités, déterminer le rôle de base via membership
		newRole = await getUserBaseRole(userId);
	}

	// Mettre à jour le rôle dans la table users
	await db.update(users).set({ role: newRole }).where(eq(users.id, userId));

	return newRole;
}

/**
 * Vérifie si un utilisateur a une responsabilité spécifique
 * @param userId - ID de l'utilisateur
 * @param role - Le rôle à vérifier
 * @param sectionId - ID de la section (optionnel)
 * @param categoryId - ID de la catégorie (optionnel)
 * @returns true si l'utilisateur a la responsabilité, false sinon
 */
export async function hasResponsibility(
	userId: string,
	role: string,
	sectionId?: string,
	categoryId?: string
): Promise<boolean> {
	const conditions = [
		eq(sectionResponsibilities.userId, userId),
		eq(sectionResponsibilities.role, role),
		eq(sectionResponsibilities.isActive, true),
	];

	if (sectionId) {
		conditions.push(eq(sectionResponsibilities.sectionId, sectionId));
	}

	if (categoryId) {
		conditions.push(eq(sectionResponsibilities.categoryId, categoryId));
	}

	const [responsibility] = await db
		.select()
		.from(sectionResponsibilities)
		.where(and(...conditions))
		.limit(1);

	return !!responsibility;
}
