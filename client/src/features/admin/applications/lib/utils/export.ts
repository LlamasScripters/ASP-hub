import type { Application } from "../types";

/**
 * Convert applications data to CSV format
 */
export function exportApplicationsToCSV(
	applications: Application[],
	filename?: string,
) {
	// Define CSV headers
	const headers = [
		"Date de soumission",
		"Prénom",
		"Nom",
		"Email",
		"Téléphone",
		"Date de naissance",
		"Section",
		"Catégorie",
		"Statut",
		"Motivation",
		"Commentaires de révision",
		"Date de révision",
		"Révisé par",
		"Contact d'urgence",
		"Téléphone d'urgence",
		"Certificat médical",
	];

	// Convert applications to CSV rows
	const rows = applications.map((app) => [
		formatDate(app.createdAt),
		app.user.firstName,
		app.user.lastName,
		app.user.email,
		app.user.phone || "N/A",
		app.user.dateOfBirth ? formatDate(app.user.dateOfBirth) : "N/A",
		app.sectionName || "N/A",
		app.categoryName || "N/A",
		getStatusText(app.status),
		`"${app.motivation.replace(/"/g, '""')}"`, // Escape quotes in motivation
		app.reviewComments ? `"${app.reviewComments.replace(/"/g, '""')}"` : "N/A",
		app.reviewedAt ? formatDate(app.reviewedAt) : "N/A",
		app.reviewerName || "N/A",
		app.emergencyContactName,
		app.emergencyContactPhone,
		app.medicalCertificateUrl ? "Oui" : "Non",
	]);

	// Combine headers and rows
	const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

	// Create and download the CSV file
	const blob = new Blob([`\uFEFF${csvContent}`], {
		type: "text/csv;charset=utf-8;",
	}); // \uFEFF is BOM for UTF-8
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);

	link.setAttribute("href", url);
	link.setAttribute(
		"download",
		filename || `candidatures_${formatDateForFilename(new Date())}.csv`,
	);
	link.style.visibility = "hidden";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

/**
 * Format date for filename (no special characters)
 */
function formatDateForFilename(date: Date): string {
	return date.toISOString().split("T")[0].replace(/-/g, "");
}

/**
 * Get translated status text
 */
function getStatusText(status: string): string {
	const translations = {
		pending: "En attente",
		approved: "Approuvée",
		rejected: "Refusée",
	};
	return translations[status as keyof typeof translations] || status;
}

/**
 * Convert applications data to Excel-compatible format (same as CSV but with .xlsx extension)
 */
export function exportApplicationsToExcel(
	applications: Application[],
	filename?: string,
) {
	exportApplicationsToCSV(
		applications,
		filename?.replace(".csv", ".xlsx") ||
			`candidatures_${formatDateForFilename(new Date())}.xlsx`,
	);
}
