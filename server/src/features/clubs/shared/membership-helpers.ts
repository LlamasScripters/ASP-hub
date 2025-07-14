import { db } from "@/db/index.js";
import { membershipApplications, sectionResponsibilities, users } from "@/db/schema.js";
import { and, eq } from "drizzle-orm";
import type { ExtractTablesWithRelations } from "drizzle-orm";

/**
 * Utilitaires pour la gestion des memberships
 * Ces fonctions sont utilisées pour déterminer le rôle de base d'un utilisateur
 * lors de la révocation de responsabilités
 */
/**
 * Détermine le rôle de base d'un utilisateur selon ses candidatures approuvées
 * @param userId - ID de l'utilisateur
 * @param transaction - Transaction optionnelle pour assurer la cohérence
 * @returns "member" si l'utilisateur a une candidature approuvée, "user" sinon
 */
export async function getUserBaseRole(userId: string, transaction?: typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0]): Promise<"member" | "user"> {
	const dbInstance = transaction || db;
	
	// Vérifier s'il a une candidature approuvée
	const [approvedApplication] = await dbInstance
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
}
/**
 * Fonction helper pour mettre à jour le rôle d'un utilisateur selon ses responsabilités
 * @param userId - ID de l'utilisateur
 * @param transaction - Transaction optionnelle pour assurer la cohérence
 * @returns Le nouveau rôle de l'utilisateur
 */
export async function updateUserRole(userId: string, transaction?: typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0]): Promise<"admin" | "section_manager" | "coach" | "member" | "user"> {
	const dbInstance = transaction || db;
	
	// Vérifier les responsabilités actives
	const responsibilities = await dbInstance
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
	if (responsibilities.some((r: { role: string }) => r.role === "section_manager")) {
		newRole = "section_manager";
	} else if (responsibilities.some((r: { role: string }) => r.role === "coach")) {
		newRole = "coach";
	} else {
		// Pas de responsabilités, déterminer le rôle de base
		newRole = await getUserBaseRole(userId, transaction);
	}

	// Mettre à jour le rôle dans la table users
	await dbInstance.update(users).set({ role: newRole }).where(eq(users.id, userId));

	return newRole;
}

/**
 * Vérifie si un utilisateur est membre (a une candidature approuvée)
 * @param userId - ID de l'utilisateur
 * @returns true si l'utilisateur est membre, false sinon
 */
export async function isUserMember(userId: string): Promise<boolean> {
	const baseRole = await getUserBaseRole(userId);
	return baseRole === "member";
}
