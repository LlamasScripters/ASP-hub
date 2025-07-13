import {
	b as J,
	d as K,
	f as M,
	T as O,
	e as Q,
	g as R,
	c as V,
	A as W,
	a as X,
} from "./alert-dialog-BJAnlKbe.js";
import { A as Y } from "./arrow-left-DMyOJown.js";
import { B as D } from "./badge-BAidKpPB.js";
import { C as A } from "./calendar-De7tcxsN.js";
import { E as _ } from "./eye-D8N8bRfa.js";
import { F as f } from "./folder-open-Bjf3vPky.js";
import {
	b as G,
	d as H,
	t as S,
	cd as U,
	e as c,
	f as d,
	j as e,
	C as k,
	B as m,
	r as n,
	i as q,
	L as x,
} from "./index-kb-Ylywn.js";
import { P as $ } from "./plus-czqh0ZLb.js";
import { S as o } from "./skeleton-C4Qqz043.js";
import { S as ee } from "./square-pen-s7PUkmhH.js";
import { U as Z } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
function se() {
	const { clubId: t } = U({
			from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/",
		}),
		I = q(),
		[u, v] = n.useState([]),
		[E, N] = n.useState([]),
		[L, y] = n.useState({}),
		[z, B] = n.useState(!0),
		[a, g] = n.useState(null),
		[j, w] = n.useState(!1),
		T = () => {
			I({ to: ".." });
		};
	n.useEffect(() => {
		(async () => {
			try {
				const r = await fetch(`/api/clubs/${t}/sections`);
				if (!r.ok) throw new Error("Erreur lors du chargement des sections");
				const i = await r.json();
				v(i);
				const C = [],
					h = {};
				for (const l of i)
					try {
						const p = await fetch(
							`/api/clubs/${t}/sections/${l.id}/categories`,
						);
						if (p.ok) {
							const b = await p.json();
							console.log(`Section ${l.name} (${l.id}):`, b),
								C.push(...b),
								(h[l.id] = b.length);
						} else h[l.id] = 0;
					} catch (p) {
						console.error(
							`Erreur lors du chargement des catégories pour la section ${l.id}:`,
							p,
						),
							(h[l.id] = 0);
					}
				N(C), y(h);
			} catch (r) {
				console.error("Erreur:", r);
			} finally {
				B(!1);
			}
		})();
	}, [t]);
	const P = (s) => L[s] || 0,
		F = async () => {
			if (a) {
				w(!0);
				try {
					if (
						!(
							await fetch(`/api/clubs/${t}/sections/${a.id}`, {
								method: "DELETE",
							})
						).ok
					)
						throw new Error("Erreur lors de la suppression");
					v((r) => r.filter((i) => i.id !== a.id)),
						y((r) => {
							const i = { ...r };
							return delete i[a.id], i;
						}),
						N((r) => r.filter((i) => i.sectionId !== a.id)),
						g(null),
						S.success("Section supprimée avec succès");
				} catch (s) {
					console.error("Erreur lors de la suppression:", s),
						S.error("Erreur lors de la suppression de la section");
				} finally {
					w(!1);
				}
			}
		};
	return z
		? e.jsx("div", {
				className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
				children: e.jsxs("div", {
					className: "space-y-6",
					children: [
						e.jsxs("div", {
							className: "flex items-center justify-between",
							children: [
								e.jsxs("div", {
									className: "space-y-2",
									children: [
										e.jsx(o, { className: "h-10 w-64" }),
										e.jsx(o, { className: "h-4 w-96" }),
									],
								}),
								e.jsx(o, { className: "h-10 w-40" }),
							],
						}),
						e.jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
							children: Array.from({ length: 6 }).map(() =>
								e.jsxs(
									c,
									{
										children: [
											e.jsxs(k, {
												children: [
													e.jsx(o, { className: "h-6 w-32" }),
													e.jsx(o, { className: "h-4 w-48" }),
												],
											}),
											e.jsxs(d, {
												className: "space-y-3",
												children: [
													e.jsx(o, { className: "h-10 w-full" }),
													e.jsx(o, { className: "h-10 w-full" }),
													e.jsx(o, { className: "h-10 w-full" }),
												],
											}),
										],
									},
									crypto.randomUUID(),
								),
							),
						}),
					],
				}),
			})
		: e.jsxs("div", {
				className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
				children: [
					e.jsxs("div", {
						className: "space-y-6",
						children: [
							e.jsxs("div", {
								className:
									"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
								children: [
									e.jsxs("div", {
										className: "space-y-2",
										children: [
											e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("button", {
														type: "button",
														onClick: T,
														className:
															"text-muted-foreground hover:text-foreground transition-colors",
														children: e.jsx(Y, { className: "h-6 w-6" }),
													}),
													e.jsxs("h1", {
														className:
															"text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3",
														children: [
															e.jsx(f, { className: "h-8 w-8 text-primary" }),
															"Sections du club",
														],
													}),
												],
											}),
											e.jsx("p", {
												className: "text-lg text-muted-foreground",
												children:
													"Gérez et organisez les sections sportives de votre club",
											}),
										],
									}),
									e.jsx(m, {
										size: "lg",
										className: "flex items-center gap-2",
										asChild: !0,
										children: e.jsxs(x, {
											to: "/admin/dashboard/clubs/$clubId/sections/create",
											params: { clubId: t },
											children: [
												e.jsx($, { className: "h-5 w-5" }),
												"Créer une section",
											],
										}),
									}),
								],
							}),
							u.length > 0 &&
								e.jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										e.jsx(c, {
											className: "bg-primary/5 border-primary/20",
											children: e.jsx(d, {
												className: "p-4",
												children: e.jsxs("div", {
													className: "flex items-center gap-3",
													children: [
														e.jsx("div", {
															className: "p-2 bg-primary/10 rounded-lg",
															children: e.jsx(f, {
																className: "h-5 w-5 text-primary",
															}),
														}),
														e.jsxs("div", {
															children: [
																e.jsx("p", {
																	className:
																		"text-sm font-medium text-muted-foreground",
																	children: "Total sections",
																}),
																e.jsx("p", {
																	className: "text-2xl font-bold",
																	children: u.length,
																}),
															],
														}),
													],
												}),
											}),
										}),
										e.jsx(c, {
											className:
												"bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
											children: e.jsx(d, {
												className: "p-4",
												children: e.jsxs("div", {
													className: "flex items-center gap-3",
													children: [
														e.jsx("div", {
															className:
																"p-2 bg-blue-100 dark:bg-blue-900 rounded-lg",
															children: e.jsx(Z, {
																className:
																	"h-5 w-5 text-blue-600 dark:text-blue-400",
															}),
														}),
														e.jsxs("div", {
															children: [
																e.jsx("p", {
																	className:
																		"text-sm font-medium text-muted-foreground",
																	children: "Total catégories",
																}),
																e.jsx("p", {
																	className: "text-2xl font-bold",
																	children: E.length,
																}),
															],
														}),
													],
												}),
											}),
										}),
										e.jsx(c, {
											className:
												"bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
											children: e.jsx(d, {
												className: "p-4",
												children: e.jsxs("div", {
													className: "flex items-center gap-3",
													children: [
														e.jsx("div", {
															className:
																"p-2 bg-green-100 dark:bg-green-900 rounded-lg",
															children: e.jsx(A, {
																className:
																	"h-5 w-5 text-green-600 dark:text-green-400",
															}),
														}),
														e.jsxs("div", {
															children: [
																e.jsx("p", {
																	className:
																		"text-sm font-medium text-muted-foreground",
																	children: "Sections actives",
																}),
																e.jsx("p", {
																	className: "text-2xl font-bold",
																	children: u.length,
																}),
															],
														}),
													],
												}),
											}),
										}),
									],
								}),
							u.length === 0
								? e.jsx(c, {
										className:
											"border-dashed border-2 border-muted-foreground/25",
										children: e.jsxs(d, {
											className:
												"flex flex-col items-center justify-center py-16 text-center",
											children: [
												e.jsx("div", {
													className: "p-4 bg-muted/30 rounded-full mb-4",
													children: e.jsx(f, {
														className: "h-12 w-12 text-muted-foreground",
													}),
												}),
												e.jsx("h3", {
													className: "text-xl font-semibold mb-2",
													children: "Aucune section créée",
												}),
												e.jsx("p", {
													className: "text-muted-foreground mb-6 max-w-md",
													children:
														"Commencez par créer votre première section pour organiser les activités sportives de votre club.",
												}),
												e.jsx(m, {
													size: "lg",
													asChild: !0,
													children: e.jsxs(x, {
														to: "/admin/dashboard/clubs/$clubId/sections/create",
														params: { clubId: t },
														children: [
															e.jsx($, { className: "mr-2 h-5 w-5" }),
															"Créer votre première section",
														],
													}),
												}),
											],
										}),
									})
								: e.jsx("div", {
										className:
											"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
										children: u.map((s) =>
											e.jsxs(
												c,
												{
													className:
														"group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20",
													children: [
														e.jsxs(k, {
															className: "space-y-4 pb-4",
															children: [
																e.jsxs("div", {
																	className:
																		"flex items-center justify-between",
																	children: [
																		e.jsxs("div", {
																			className: "flex items-center gap-3",
																			children: [
																				e.jsxs("div", {
																					className: "relative",
																					children: [
																						e.jsx("div", {
																							className:
																								"w-5 h-5 rounded-full border-2 border-primary/30 shadow-sm ring-2 ring-background",
																							style: {
																								backgroundColor:
																									s.color || "#3b82f6",
																							},
																						}),
																						e.jsx("div", {
																							className:
																								"absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full opacity-60 animate-pulse",
																							style: {
																								backgroundColor:
																									s.color || "#3b82f6",
																							},
																						}),
																					],
																				}),
																				e.jsx(D, {
																					variant: "secondary",
																					className:
																						"text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary border-primary/20",
																					children: "Section",
																				}),
																			],
																		}),
																		(() => {
																			const r = P(s.id);
																			return e.jsxs(D, {
																				variant: "outline",
																				className: `text-xs font-medium px-2.5 py-1 transition-colors ${r > 0 ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400" : "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20 dark:border-orange-800 dark:text-orange-400"}`,
																				children: [
																					r,
																					" catégorie",
																					r !== 1 ? "s" : "",
																				],
																			});
																		})(),
																	],
																}),
																e.jsxs("div", {
																	className: "space-y-2",
																	children: [
																		e.jsx(G, {
																			className:
																				"text-xl font-bold group-hover:text-primary transition-colors duration-200 leading-tight",
																			children: s.name,
																		}),
																		e.jsx(H, {
																			className:
																				"text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed",
																			children:
																				s.description ||
																				"Aucune description disponible",
																		}),
																	],
																}),
															],
														}),
														e.jsxs(d, {
															className: "space-y-2 pt-0",
															children: [
																e.jsx(m, {
																	variant: "outline",
																	size: "sm",
																	className:
																		"w-full justify-start h-10 hover:bg-primary/10 hover:border-primary/30 hover:text-primary group transition-all duration-200 font-medium",
																	asChild: !0,
																	children: e.jsxs(x, {
																		to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
																		params: { clubId: t, sectionId: s.id },
																		className: "block",
																		children: [
																			e.jsx(_, {
																				className:
																					"mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200",
																			}),
																			"Voir les catégories",
																		],
																	}),
																}),
																e.jsx(m, {
																	variant: "outline",
																	size: "sm",
																	className:
																		"w-full justify-start h-10 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-950/20 dark:hover:border-blue-700 group transition-all duration-200 font-medium",
																	asChild: !0,
																	children: e.jsxs(x, {
																		to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/sessions",
																		params: { clubId: t, sectionId: s.id },
																		className: "block",
																		children: [
																			e.jsx(A, {
																				className:
																					"mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200",
																			}),
																			"Gérer les sessions",
																		],
																	}),
																}),
																e.jsxs("div", {
																	className: "flex gap-2 pt-1",
																	children: [
																		e.jsx(m, {
																			variant: "ghost",
																			size: "sm",
																			className:
																				"flex-1 justify-start h-9 hover:bg-destructive/10 text-muted-foreground hover:text-destructive group transition-all duration-200",
																			asChild: !0,
																			children: e.jsxs(x, {
																				to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/edit",
																				params: { clubId: t, sectionId: s.id },
																				className: "block",
																				children: [
																					e.jsx(ee, {
																						className:
																							"mr-2 h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200",
																					}),
																					"Modifier",
																				],
																			}),
																		}),
																		e.jsxs(m, {
																			variant: "ghost",
																			size: "sm",
																			className:
																				"flex-1 justify-start h-9 hover:bg-destructive/10 hover:cursor-pointer text-muted-foreground hover:text-destructive group transition-all duration-200",
																			onClick: () => g(s),
																			children: [
																				e.jsx(O, {
																					className:
																						"mr-2 h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200",
																				}),
																				"Supprimer",
																			],
																		}),
																	],
																}),
															],
														}),
														e.jsx("div", {
															className:
																"absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
														}),
													],
												},
												s.id,
											),
										),
									}),
						],
					}),
					e.jsx(R, {
						open: !!a,
						onOpenChange: () => g(null),
						children: e.jsxs(M, {
							children: [
								e.jsxs(V, {
									children: [
										e.jsx(J, { children: "Supprimer la section" }),
										e.jsxs(K, {
											children: [
												"Êtes-vous sûr de vouloir supprimer la section",
												" ",
												e.jsxs("strong", {
													children: ['"', a == null ? void 0 : a.name, '"'],
												}),
												" ?",
												e.jsx("br", {}),
												e.jsx("br", {}),
												e.jsx("span", {
													className: "text-destructive font-medium",
													children: "⚠️ Cette action est irréversible",
												}),
												e.jsx("br", {}),
												e.jsx("br", {}),
												"La suppression de cette section entraînera également :",
												e.jsxs("ul", {
													className: "list-disc list-inside mt-2 space-y-1",
													children: [
														e.jsx("li", {
															children:
																"La suppression de toutes les catégories de cette section",
														}),
														e.jsx("li", {
															children:
																"La suppression de toutes les sessions associées",
														}),
														e.jsx("li", {
															children:
																"La perte de tous les participants inscrits",
														}),
														e.jsx("li", {
															children:
																"La suppression de l'historique complet des activités",
														}),
														e.jsx("li", {
															children:
																"La perte de toutes les données statistiques",
														}),
													],
												}),
												e.jsx("br", {}),
												"Toutes ces données seront définitivement perdues et ne pourront pas être récupérées.",
											],
										}),
									],
								}),
								e.jsxs(Q, {
									children: [
										e.jsx(W, { disabled: j, children: "Annuler" }),
										e.jsx(X, {
											onClick: F,
											disabled: j,
											className:
												"bg-destructive text-destructive-foreground hover:bg-destructive/90",
											children: j
												? "Suppression..."
												: "Supprimer définitivement",
										}),
									],
								}),
							],
						}),
					}),
				],
			});
}
const Ne = se;
export { Ne as component };
