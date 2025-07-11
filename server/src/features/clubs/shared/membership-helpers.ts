import { db } from "@/db/index.js";
import { membershipApplications } from "@/db/schema.js";
import { and, eq } from "drizzle-orm";

/**
 * Utilitaires pour la gestion des memberships
 * Ces fonctions sont utilisées pour déterminer le rôle de base d'un utilisateur
 * lors de la révocation de responsabilités
 */

/**
 * Détermine le rôle de base d'un utilisateur selon ses candidatures approuvées
 * @param userId - ID de l'utilisateur
 * @returns "member" si l'utilisateur a une candidature approuvée, "user" sinon
 */
export async function getUserBaseRole(userId: string): Promise<"member" | "user"> {
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
