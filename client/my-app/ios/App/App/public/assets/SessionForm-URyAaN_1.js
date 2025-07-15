import { A as K, a as W } from "./alert-DcqybFAu.js";
import { A as ge } from "./arrow-left-DMyOJown.js";
import { C as Q } from "./circle-alert-CvO-74L-.js";
import { C as xe } from "./clock-Kg0fBwSd.js";
import { F as ue } from "./file-text-Dzq0McNO.js";
import {
	e as G,
	f as H,
	B as J,
	t as P,
	s as S,
	i as ce,
	b as de,
	j as e,
	C as le,
	d as me,
	o as ne,
	p as oe,
	G as q,
	r as x,
} from "./index-kb-Ylywn.js";
import { I as w } from "./input-CdkcPZS3.js";
import { L as g } from "./label-B9JbzJbC.js";
import { L as I } from "./loader-circle-Bxgg9gFD.js";
import { M as pe } from "./map-pin-DywQhs4x.js";
import { S as he } from "./save-TX27fQkL.js";
import { S as A, a as M, c as R, d as f, b as z } from "./select-D8GIfri3.js";
import { S as k } from "./separator-DDNy3jpa.js";
import { T as Y } from "./textarea-CTVCAbGX.js";
const fe = ne({
		categoryId: S().uuid("Veuillez sélectionner une catégorie"),
		title: S().min(1, "Le titre est obligatoire"),
		description: S().optional(),
		type: q(["entrainement", "match", "stage", "competition", "autre"]),
		status: q(["planifie", "en_cours", "termine", "annule"]),
		startDate: S().min(1, "La date de début est obligatoire"),
		endDate: S().min(1, "La date de fin est obligatoire"),
		location: S().optional(),
		maxParticipants: oe().int().positive().optional(),
		notes: S().optional(),
	}).refine(
		(r) =>
			r.startDate && r.endDate
				? new Date(r.startDate) <= new Date(r.endDate)
				: !0,
		{
			message: "La date de fin doit être postérieure à la date de début",
			path: ["endDate"],
		},
	),
	X = (r) => {
		if (!r) return "";
		try {
			return new Date(r).toISOString();
		} catch (n) {
			return console.error("Error converting date to ISO:", n), r;
		}
	},
	Z = (r) => {
		if (!r) return "";
		try {
			const n = new Date(r);
			if (Number.isNaN(n.getTime())) return "";
			const p = n.getFullYear(),
				C = String(n.getMonth() + 1).padStart(2, "0"),
				y = String(n.getDate()).padStart(2, "0"),
				E = String(n.getHours()).padStart(2, "0"),
				$ = String(n.getMinutes()).padStart(2, "0");
			return `${p}-${C}-${y}T${E}:${$}`;
		} catch (n) {
			return console.error("Error formatting date:", n), "";
		}
	};
function Ve({ mode: r, clubId: n, sectionId: p, categoryId: C, sessionId: y }) {
	const E = ce(),
		[$, _] = x.useState([]),
		[F, ee] = x.useState([]),
		[L, O] = x.useState(!0),
		[d, j] = x.useState({}),
		[V, v] = x.useState(!1),
		[se, te] = x.useState(""),
		[D, b] = x.useState({ isValid: !0, message: "", type: null }),
		[t, h] = x.useState({
			type: "entrainement",
			status: "planifie",
			categoryId: C,
		}),
		U = x.useCallback((s, a) => {
			if (!s && !a) {
				b({ isValid: !0, message: "", type: null });
				return;
			}
			if (!s && a) {
				b({
					isValid: !1,
					message: "Veuillez renseigner la date de début",
					type: "warning",
				});
				return;
			}
			if (s && !a) {
				b({
					isValid: !1,
					message: "Veuillez renseigner la date de fin",
					type: "warning",
				});
				return;
			}
			if (s && a) {
				const m = new Date(s),
					c = new Date(a);
				if (m > c) {
					b({
						isValid: !1,
						message:
							"⚠️ La date de début ne peut pas être postérieure à la date de fin !",
						type: "error",
					});
					return;
				}
				if (m.getTime() === c.getTime()) {
					b({
						isValid: !1,
						message:
							"⚠️ Les dates de début et fin ne peuvent pas être identiques ! Une session doit avoir une durée minimale.",
						type: "error",
					});
					return;
				}
				const i = c.getTime() - m.getTime(),
					o = Math.floor(i / (1e3 * 60)),
					l = Math.floor(o / 60),
					u = o % 60;
				let N = "";
				l > 0 ? ((N += `${l}h`), u > 0 && (N += ` ${u}min`)) : (N = `${u}min`),
					b({
						isValid: !0,
						message: `Durée de la session : ${N}`,
						type: "info",
					});
			}
		}, []);
	x.useEffect(() => {
		(async () => {
			try {
				O(!0);
				const m = await (
						await fetch(`/api/clubs/${n}/sections/${p}/categories`)
					).json(),
					c = [];
				for (const i of m)
					try {
						const o = await fetch(
							`/api/clubs/${n}/sections/${p}/categories/${i.id}/sessions`,
						);
						if (o.ok) {
							const l = await o.json();
							console.log(
								`Sessions from API for category ${i.name}:`,
								JSON.stringify(l, null, 2),
							);
							const u = l.map((N) => ({ ...N, categoryId: i.id }));
							c.push(...u);
						}
					} catch (o) {
						console.error(
							`Erreur lors du chargement des sessions pour la catégorie ${i.id}:`,
							o,
						);
					}
				ee(c);
			} catch (a) {
				console.error("Erreur lors du chargement des sessions:", a),
					P.error("Erreur lors du chargement des sessions existantes");
			} finally {
				O(!1);
			}
		})();
	}, [n, p]),
		x.useEffect(() => {
			(async () => {
				if (!L) {
					v(!0);
					try {
						const m = await (
							await fetch(`/api/clubs/${n}/sections/${p}/categories`)
						).json();
						_(m);
						const i = await (
							await fetch(`/api/clubs/${n}/sections/${p}`)
						).json();
						if ((te(i.name), r === "edit" && y)) {
							const l = await (await fetch(`/api/clubs/sessions/${y}`)).json(),
								u = {
									...l,
									startDate: l.startDate ? Z(l.startDate) : "",
									endDate: l.endDate ? Z(l.endDate) : "",
									notes: l.notes || "",
								};
							h(u);
						}
					} catch {
						j({ general: "Erreur lors du chargement des données" });
					} finally {
						v(!1);
					}
				}
			})();
		}, [r, y, n, p, L]);
	const B = (s, a) => {
			if (!s.trim() || !a) return null;
			console.log("Validation - Title:", s, "CategoryId:", a),
				console.log("Existing sessions:", F);
			const m = s.trim().toLowerCase();
			console.log("Normalized title:", m),
				F.forEach((i, o) => {
					console.log(`Session ${o}:`, {
						title: i.title,
						normalizedTitle: i.title.trim().toLowerCase(),
						categoryId: i.categoryId,
						id: i.id,
						titleMatch: i.title.trim().toLowerCase() === m,
						categoryMatch: i.categoryId === a,
					});
				});
			const c = F.find(
				(i) =>
					i.title.trim().toLowerCase() === m &&
					i.categoryId === a &&
					i.id !== y,
			);
			return (
				console.log("Duplicate found:", c),
				c ? "Une session avec ce titre existe déjà pour cette catégorie" : null
			);
		},
		T = B(t.title || "", t.categoryId || ""),
		ae = (s) => {
			h((a) => ({ ...a, title: s })),
				d.title ===
					"Une session avec ce titre existe déjà pour cette catégorie" &&
					j((a) => {
						const { title: m, ...c } = a;
						return c;
					});
		};
	x.useEffect(() => {
		U(t.startDate || "", t.endDate || "");
	}, [t.startDate, t.endDate, U]);
	const re = async (s) => {
			var i;
			s.preventDefault(),
				j({}),
				v(!0),
				console.log("Form submission started:", { mode: r, form: t });
			const a = B(t.title || "", t.categoryId || "");
			if (a) {
				j({ title: a }), v(!1);
				return;
			}
			if (!D.isValid) {
				j({
					general: "Veuillez corriger les erreurs de dates avant de continuer",
				}),
					v(!1);
				return;
			}
			const m = {
					...t,
					startDate: t.startDate ? X(t.startDate) : void 0,
					endDate: t.endDate ? X(t.endDate) : void 0,
					maxParticipants: t.maxParticipants
						? Number(t.maxParticipants)
						: void 0,
				},
				c = fe.safeParse(m);
			if (!c.success) {
				const o = {};
				for (const l of c.error.errors) {
					const u = l.path[0];
					o[u] = l.message;
				}
				j(o), v(!1);
				return;
			}
			try {
				const o =
						r === "create"
							? `/api/clubs/${n}/sections/${p}/categories/${C}/sessions`
							: `/api/clubs/sessions/${y}`,
					u = await fetch(o, {
						method: r === "create" ? "POST" : "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(c.data),
					});
				if (!u.ok) {
					const N = await u.json().catch(() => ({}));
					if (
						u.status === 409 ||
						((i = N.message) != null && i.includes("existe déjà"))
					) {
						j({
							title:
								"Une session avec ce titre existe déjà pour cette catégorie",
						}),
							v(!1);
						return;
					}
					throw new Error(`Erreur lors de la sauvegarde: ${u.status}`);
				}
				P.success(
					r === "create"
						? "Session créée avec succès !"
						: "Session modifiée avec succès !",
				),
					setTimeout(() => {
						E({
							to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions",
							params: { clubId: n, sectionId: p },
						});
					}, 500);
			} catch (o) {
				console.error("Erreur complète:", o),
					P.error("Erreur lors de la sauvegarde de la session"),
					j({ general: "Erreur lors de la sauvegarde de la session" });
			} finally {
				v(!1);
			}
		},
		ie = () => {
			E({
				to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions",
				params: { clubId: n, sectionId: p },
			});
		};
	return L
		? e.jsx("div", {
				className: "p-6 max-w-4xl mx-auto",
				children: e.jsx(G, {
					children: e.jsx(H, {
						className: "pt-6",
						children: e.jsxs("div", {
							className: "flex items-center justify-center space-x-2",
							children: [
								e.jsx(I, { className: "h-6 w-6 animate-spin" }),
								e.jsx("span", { children: "Chargement des données..." }),
							],
						}),
					}),
				}),
			})
		: e.jsx("div", {
				className: "p-6 max-w-4xl mx-auto",
				children: e.jsxs("div", {
					className: "space-y-6",
					children: [
						d.general &&
							e.jsxs(K, {
								variant: "destructive",
								children: [
									e.jsx(Q, { className: "h-4 w-4" }),
									e.jsx(W, { children: d.general }),
								],
							}),
						e.jsxs(G, {
							children: [
								e.jsxs(le, {
									children: [
										e.jsxs(de, {
											className: "flex items-center gap-2",
											children: [
												"Formulaire d'",
												"",
												r === "create" ? "création" : "'édition",
												" d'une session sportive",
											],
										}),
										e.jsx(me, {
											children:
												r === "edit"
													? e.jsx("p", {
															className: "text-sm text-muted-foreground",
															children:
																"Modifiez les informations de cette session pour mettre à jour ses paramètres.",
														})
													: e.jsxs("p", {
															className: "text-sm text-muted-foreground",
															children: [
																"Remplissez les informations ci-dessous pour créer une nouvelle session dans la catégorie",
																" ",
																e.jsx("span", {
																	className: "font-medium",
																	children: se,
																}),
															],
														}),
										}),
									],
								}),
								e.jsx(H, {
									children: e.jsxs("form", {
										onSubmit: re,
										className: "space-y-8",
										children: [
											e.jsxs("div", {
												className: "space-y-6",
												children: [
													e.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															e.jsx(ue, { className: "h-4 w-4" }),
															e.jsx("h3", {
																className: "text-lg font-semibold",
																children: "Informations générales",
															}),
														],
													}),
													e.jsxs("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-6",
														children: [
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsxs(g, {
																		htmlFor: "categoryId",
																		className: "text-sm font-medium",
																		children: [
																			"Catégorie ",
																			e.jsx("span", {
																				className: "text-destructive",
																				children: "*",
																			}),
																		],
																	}),
																	$.length > 0
																		? e.jsxs(A, {
																				value: t.categoryId || "",
																				onValueChange: (s) => {
																					h((a) => ({ ...a, categoryId: s }));
																				},
																				children: [
																					e.jsx(M, {
																						className: d.categoryId
																							? "border-destructive"
																							: "",
																						children: e.jsx(z, {
																							placeholder:
																								"Choisir une catégorie",
																						}),
																					}),
																					e.jsx(R, {
																						children: $.map((s) =>
																							e.jsx(
																								f,
																								{
																									value: s.id,
																									children: s.name,
																								},
																								s.id,
																							),
																						),
																					}),
																				],
																			})
																		: e.jsxs("div", {
																				className:
																					"flex items-center space-x-2",
																				children: [
																					e.jsx(I, {
																						className: "h-4 w-4 animate-spin",
																					}),
																					e.jsx("span", {
																						className:
																							"text-sm text-muted-foreground",
																						children:
																							"Chargement des catégories...",
																					}),
																				],
																			}),
																	d.categoryId &&
																		e.jsx("p", {
																			className: "text-sm text-destructive",
																			children: d.categoryId,
																		}),
																],
															}),
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsxs(g, {
																		htmlFor: "title",
																		className: "text-sm font-medium",
																		children: [
																			"Titre de la session",
																			" ",
																			e.jsx("span", {
																				className: "text-destructive",
																				children: "*",
																			}),
																		],
																	}),
																	e.jsx(w, {
																		id: "title",
																		placeholder:
																			"Ex: Entraînement technique, Match amical...",
																		value: t.title ?? "",
																		onChange: (s) => ae(s.target.value),
																		className:
																			d.title || T ? "border-destructive" : "",
																	}),
																	(d.title || T) &&
																		e.jsx("p", {
																			className: "text-sm text-destructive",
																			children: d.title || T,
																		}),
																],
															}),
														],
													}),
													e.jsxs("div", {
														className: "space-y-2",
														children: [
															e.jsx(g, {
																htmlFor: "description",
																className: "text-sm font-medium",
																children: "Description",
															}),
															e.jsx(Y, {
																id: "description",
																placeholder:
																	"Description détaillée de la session...",
																value: t.description ?? "",
																onChange: (s) =>
																	h({ ...t, description: s.target.value }),
																rows: 3,
																className: "resize-none",
															}),
															e.jsx("p", {
																className: "text-xs text-muted-foreground",
																children:
																	"Ajoutez des détails sur les objectifs, le contenu ou les consignes",
															}),
														],
													}),
												],
											}),
											e.jsx(k, {}),
											e.jsxs("div", {
												className: "space-y-6",
												children: [
													e.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															e.jsx(xe, { className: "h-4 w-4" }),
															e.jsx("h3", {
																className: "text-lg font-semibold",
																children: "Planification",
															}),
														],
													}),
													e.jsxs("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-6",
														children: [
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsxs(g, {
																		htmlFor: "startDate",
																		className: "text-sm font-medium",
																		children: [
																			"Date et heure de début",
																			" ",
																			e.jsx("span", {
																				className: "text-destructive",
																				children: "*",
																			}),
																		],
																	}),
																	e.jsx(w, {
																		id: "startDate",
																		type: "datetime-local",
																		value: t.startDate ?? "",
																		onChange: (s) =>
																			h({ ...t, startDate: s.target.value }),
																		className: d.startDate
																			? "border-destructive"
																			: "",
																	}),
																	d.startDate &&
																		e.jsx("p", {
																			className: "text-sm text-destructive",
																			children: d.startDate,
																		}),
																],
															}),
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsxs(g, {
																		htmlFor: "endDate",
																		className: "text-sm font-medium",
																		children: [
																			"Date et heure de fin",
																			" ",
																			e.jsx("span", {
																				className: "text-destructive",
																				children: "*",
																			}),
																		],
																	}),
																	e.jsx(w, {
																		id: "endDate",
																		type: "datetime-local",
																		value: t.endDate ?? "",
																		onChange: (s) =>
																			h({ ...t, endDate: s.target.value }),
																		className: d.endDate
																			? "border-destructive"
																			: "",
																	}),
																	d.endDate &&
																		e.jsx("p", {
																			className: "text-sm text-destructive",
																			children: d.endDate,
																		}),
																],
															}),
														],
													}),
													D.message &&
														e.jsxs(K, {
															variant:
																D.type === "error" ? "destructive" : "default",
															className:
																D.type === "error"
																	? "border-destructive bg-destructive/10"
																	: D.type === "warning"
																		? "border-orange-500 bg-orange-50 text-orange-800"
																		: "border-blue-500 bg-blue-50 text-blue-800",
															children: [
																e.jsx(Q, { className: "h-4 w-4" }),
																e.jsx(W, {
																	className: "font-medium",
																	children: D.message,
																}),
															],
														}),
													e.jsxs("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-6",
														children: [
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsx(g, {
																		htmlFor: "type",
																		className: "text-sm font-medium",
																		children: "Type de session",
																	}),
																	e.jsxs(A, {
																		value: t.type || "entrainement",
																		onValueChange: (s) => h({ ...t, type: s }),
																		children: [
																			e.jsx(M, { children: e.jsx(z, {}) }),
																			e.jsxs(R, {
																				children: [
																					e.jsx(f, {
																						value: "entrainement",
																						children: "Entraînement",
																					}),
																					e.jsx(f, {
																						value: "match",
																						children: "Match",
																					}),
																					e.jsx(f, {
																						value: "stage",
																						children: "Stage",
																					}),
																					e.jsx(f, {
																						value: "competition",
																						children: "Compétition",
																					}),
																					e.jsx(f, {
																						value: "autre",
																						children: "Autre",
																					}),
																				],
																			}),
																		],
																	}),
																],
															}),
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsx(g, {
																		htmlFor: "status",
																		className: "text-sm font-medium",
																		children: "Statut",
																	}),
																	e.jsxs(A, {
																		value: t.status || "planifie",
																		onValueChange: (s) =>
																			h({ ...t, status: s }),
																		children: [
																			e.jsx(M, { children: e.jsx(z, {}) }),
																			e.jsxs(R, {
																				children: [
																					e.jsx(f, {
																						value: "planifie",
																						children: "Planifié",
																					}),
																					e.jsx(f, {
																						value: "en_cours",
																						children: "En cours",
																					}),
																					e.jsx(f, {
																						value: "termine",
																						children: "Terminé",
																					}),
																					e.jsx(f, {
																						value: "annule",
																						children: "Annulé",
																					}),
																				],
																			}),
																		],
																	}),
																],
															}),
														],
													}),
												],
											}),
											e.jsx(k, {}),
											e.jsxs("div", {
												className: "space-y-6",
												children: [
													e.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															e.jsx(pe, { className: "h-4 w-4" }),
															e.jsx("h3", {
																className: "text-lg font-semibold",
																children: "Détails supplémentaires",
															}),
														],
													}),
													e.jsxs("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-6",
														children: [
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsx(g, {
																		htmlFor: "location",
																		className: "text-sm font-medium",
																		children: "Lieu",
																	}),
																	e.jsx(w, {
																		id: "location",
																		placeholder:
																			"Ex: Gymnase principal, Terrain A...",
																		value: t.location ?? "",
																		onChange: (s) =>
																			h({ ...t, location: s.target.value }),
																	}),
																],
															}),
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsx(g, {
																		htmlFor: "maxParticipants",
																		className: "text-sm font-medium",
																		children: "Nombre maximum de participants",
																	}),
																	e.jsx(w, {
																		id: "maxParticipants",
																		type: "number",
																		placeholder: "Ex: 20",
																		min: "1",
																		max: "9999",
																		value: t.maxParticipants ?? "",
																		onChange: (s) => {
																			const a = s.target.value;
																			(a === "" || /^\d+$/.test(a)) &&
																				h({
																					...t,
																					maxParticipants: a
																						? Number(a)
																						: void 0,
																				});
																		},
																		onKeyDown: (s) => {
																			![
																				"Backspace",
																				"Delete",
																				"Tab",
																				"Escape",
																				"Enter",
																				"ArrowLeft",
																				"ArrowRight",
																			].includes(s.key) &&
																				!/^\d$/.test(s.key) &&
																				s.preventDefault();
																		},
																	}),
																],
															}),
														],
													}),
													e.jsxs("div", {
														className: "space-y-2",
														children: [
															e.jsx(g, {
																htmlFor: "notes",
																className: "text-sm font-medium",
																children: "Notes additionnelles",
															}),
															e.jsx(Y, {
																id: "notes",
																placeholder:
																	"Notes, consignes particulières, matériel requis...",
																value: t.notes ?? "",
																onChange: (s) => {
																	h({ ...t, notes: s.target.value });
																},
																rows: 3,
																className: "resize-none",
															}),
														],
													}),
												],
											}),
											e.jsx(k, {}),
											e.jsxs("div", {
												className: "flex flex-col sm:flex-row gap-3 pt-6",
												children: [
													e.jsx(J, {
														type: "submit",
														disabled: V || !D.isValid || !!T,
														className:
															"flex items-center gap-2 flex-1 sm:flex-none hover:cursor-pointer hover:opacity-90 transition-opacity",
														children: V
															? e.jsxs(e.Fragment, {
																	children: [
																		e.jsx(I, {
																			className: "h-4 w-4 animate-spin",
																		}),
																		r === "create"
																			? "Création..."
																			: "Modification...",
																	],
																})
															: e.jsxs(e.Fragment, {
																	children: [
																		e.jsx(he, { className: "h-4 w-4" }),
																		r === "create"
																			? "Créer la session"
																			: "Sauvegarder",
																	],
																}),
													}),
													e.jsxs(J, {
														type: "button",
														variant: "outline",
														onClick: ie,
														disabled: V,
														className:
															"flex items-center gap-2 hover:cursor-pointer hover:opacity-90 transition-opacity",
														children: [
															e.jsx(ge, { className: "h-4 w-4" }),
															"Annuler",
														],
													}),
												],
											}),
										],
									}),
								}),
							],
						}),
					],
				}),
			});
}
export { Ve as S };
