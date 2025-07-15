import {
	T as ce,
	g as de,
	A as ge,
	b as he,
	a as je,
	f as me,
	e as pe,
	c as ue,
	d as xe,
} from "./alert-dialog-BJAnlKbe.js";
import { A as ve } from "./arrow-left-DMyOJown.js";
import { B as D } from "./badge-BAidKpPB.js";
import { C as T } from "./calendar-De7tcxsN.js";
import { C as ke } from "./chevron-down-CMzABl4R.js";
import { C as De } from "./chevron-up-DyH28r2x.js";
import { C as ye } from "./clock-Kg0fBwSd.js";
import {
	B as C,
	t as F,
	L as I,
	C as U,
	j as e,
	cd as ie,
	d as le,
	b as ne,
	r as o,
	c as oe,
	f as p,
	e as x,
} from "./index-kb-Ylywn.js";
import { I as $ } from "./input-CdkcPZS3.js";
import { M as we } from "./map-pin-DywQhs4x.js";
import { S as Se } from "./search-CT8NOJQT.js";
import { c as H, a as P, S as V, d as k, b as z } from "./select-D8GIfri3.js";
import { S as y } from "./skeleton-C4Qqz043.js";
import { S as Ce } from "./square-pen-s7PUkmhH.js";
import {
	a as M,
	T as Ne,
	d as be,
	c as fe,
	b as g,
	e as m,
} from "./table-De-kdsVW.js";
import { U as O } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
import "./index-3Axhna2x.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-mnH6Jux_.js";
import "./index-C6LbJ2-_.js";
function Te() {
	const { clubId: c } = ie({
			from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sessions/",
		}),
		[n, u] = o.useState([]),
		[, G] = o.useState([]),
		[J, K] = o.useState(!0),
		[w, Q] = o.useState("startDate"),
		[b, R] = o.useState("desc"),
		[i, q] = o.useState({
			title: "",
			sectionName: "",
			categoryName: "",
			type: "all",
			status: "all",
		}),
		[h, L] = o.useState(null),
		[A, B] = o.useState(!1);
	o.useEffect(() => {
		(async () => {
			try {
				const t = await fetch(`/api/clubs/${c}/sections`).then((a) => {
					if (!a.ok) throw new Error("Erreur lors du chargement des sections");
					return a.json();
				});
				G(t);
				const r = [];
				for (const a of t) {
					const l = await fetch(
						`/api/clubs/${c}/sections/${a.id}/categories`,
					).then((d) => {
						if (!d.ok)
							throw new Error("Erreur lors du chargement des catégories");
						return d.json();
					});
					for (const d of l) {
						const E = await fetch(
							`/api/clubs/${c}/sections/${a.id}/categories/${d.id}/sessions`,
						).then((S) => {
							if (!S.ok)
								throw new Error("Erreur lors du chargement des sessions");
							return S.json();
						});
						r.push(
							...E.map((S) => ({
								...S,
								categoryName: d.name,
								sectionName: a.name,
								categoryId: d.id,
								sectionId: a.id,
							})),
						);
					}
				}
				u(r);
			} catch (t) {
				console.error("Erreur:", t),
					F.error("Erreur lors du chargement des sessions");
			} finally {
				K(!1);
			}
		})();
	}, [c]);
	const j = (s) => {
			w === s ? R(b === "asc" ? "desc" : "asc") : (Q(s), R("asc"));
		},
		v = (s, t) => {
			q((r) => ({ ...r, [s]: t }));
		},
		f = (s) =>
			w !== s
				? null
				: b === "asc"
					? e.jsx(De, { className: "ml-1 h-4 w-4" })
					: e.jsx(ke, { className: "ml-1 h-4 w-4" }),
		W = (s) => {
			const t = {
					planifie: "default",
					en_cours: "secondary",
					termine: "outline",
					annule: "destructive",
				},
				r = {
					planifie: "Planifié",
					en_cours: "En cours",
					termine: "Terminé",
					annule: "Annulé",
				};
			return e.jsx(D, { variant: t[s] || "default", children: r[s] || s });
		},
		X = (s) => {
			const t = {
					entrainement: "default",
					match: "secondary",
					stage: "outline",
					competition: "destructive",
					autre: "outline",
				},
				r = {
					entrainement: "Entraînement",
					match: "Match",
					stage: "Stage",
					competition: "Compétition",
					autre: "Autre",
				};
			return e.jsx(D, { variant: t[s] || "default", children: r[s] || s });
		},
		N = o.useMemo(() => {
			const s = n.filter((t) => {
				const r = t.title.toLowerCase().includes(i.title.toLowerCase()),
					a =
						i.sectionName === "" ||
						t.sectionName.toLowerCase().includes(i.sectionName.toLowerCase()),
					l =
						i.categoryName === "" ||
						t.categoryName.toLowerCase().includes(i.categoryName.toLowerCase()),
					d = i.type === "" || i.type === "all" || t.type === i.type,
					E = i.status === "" || i.status === "all" || t.status === i.status;
				return r && a && l && d && E;
			});
			return (
				s.sort((t, r) => {
					let a, l;
					switch (w) {
						case "title":
							(a = t.title.toLowerCase()), (l = r.title.toLowerCase());
							break;
						case "sectionName":
							(a = (t.sectionName || "").toLowerCase()),
								(l = (r.sectionName || "").toLowerCase());
							break;
						case "categoryName":
							(a = (t.categoryName || "").toLowerCase()),
								(l = (r.categoryName || "").toLowerCase());
							break;
						case "type":
							(a = t.type), (l = r.type);
							break;
						case "status":
							(a = t.status), (l = r.status);
							break;
						case "startDate":
							(a = new Date(t.startDate)), (l = new Date(r.startDate));
							break;
						default:
							return 0;
					}
					return a < l
						? b === "asc"
							? -1
							: 1
						: a > l
							? b === "asc"
								? 1
								: -1
							: 0;
				}),
				s
			);
		}, [n, i, w, b]),
		Y = () => {
			q({
				title: "",
				sectionName: "",
				categoryName: "",
				type: "all",
				status: "all",
			});
		},
		Z = async () => {
			if (h) {
				B(!0);
				try {
					if (
						!(await fetch(`/api/clubs/sessions/${h.id}`, { method: "DELETE" }))
							.ok
					)
						throw new Error("Erreur lors de la suppression");
					u((t) => t.filter((r) => r.id !== h.id)),
						L(null),
						F.success("Session supprimée avec succès");
				} catch (s) {
					console.error("Erreur lors de la suppression:", s),
						F.error("Erreur lors de la suppression de la session");
				} finally {
					B(!1);
				}
			}
		},
		_ = [...new Set(n.map((s) => s.type))],
		ee = [...new Set(n.map((s) => s.status))],
		se = n.length,
		te = n.filter(
			(s) => new Date(s.startDate) > new Date() && s.status === "planifie",
		).length,
		re = n.filter((s) => s.status === "en_cours").length,
		ae = n.filter((s) => s.status === "termine").length;
	return J
		? e.jsx("div", {
				className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
				children: e.jsxs("div", {
					className: "space-y-6",
					children: [
						e.jsx("div", {
							className: "flex items-center justify-between",
							children: e.jsxs("div", {
								className: "space-y-2",
								children: [
									e.jsx(y, { className: "h-10 w-80" }),
									e.jsx(y, { className: "h-4 w-96" }),
								],
							}),
						}),
						e.jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-4 gap-4",
							children: Array.from({ length: 4 }).map(() =>
								e.jsx(y, { className: "h-20" }, crypto.randomUUID()),
							),
						}),
						e.jsxs(x, {
							children: [
								e.jsx(U, { children: e.jsx(y, { className: "h-6 w-48" }) }),
								e.jsx(p, {
									children: e.jsx("div", {
										className: "space-y-3",
										children: Array.from({ length: 8 }).map(() =>
											e.jsx(
												y,
												{ className: "h-12 w-full" },
												crypto.randomUUID(),
											),
										),
									}),
								}),
							],
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
							e.jsx("div", {
								className:
									"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
								children: e.jsxs("div", {
									className: "space-y-2",
									children: [
										e.jsxs("div", {
											className: "flex items-center gap-3",
											children: [
												e.jsx(I, {
													to: "/admin/dashboard/clubs/$clubId",
													params: { clubId: c },
													className:
														"text-muted-foreground hover:text-foreground transition-colors",
													children: e.jsx(ve, { className: "h-6 w-6" }),
												}),
												e.jsxs("h1", {
													className:
														"text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3",
													children: [
														e.jsx(T, { className: "h-8 w-8 text-primary" }),
														"Toutes les sessions",
													],
												}),
											],
										}),
										e.jsx("p", {
											className: "text-lg text-muted-foreground",
											children: "Vue d'ensemble de toutes les sessions du club",
										}),
									],
								}),
							}),
							e.jsxs("div", {
								className:
									"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
								children: [
									e.jsx(x, {
										className: "bg-primary/5 border-primary/20",
										children: e.jsx(p, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className: "p-2 bg-primary/10 rounded-lg",
														children: e.jsx(T, {
															className: "h-5 w-5 text-primary",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "Total sessions",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: se,
															}),
														],
													}),
												],
											}),
										}),
									}),
									e.jsx(x, {
										className:
											"bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
										children: e.jsx(p, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className:
															"p-2 bg-blue-100 dark:bg-blue-900 rounded-lg",
														children: e.jsx(ye, {
															className:
																"h-5 w-5 text-blue-600 dark:text-blue-400",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "À venir",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: te,
															}),
														],
													}),
												],
											}),
										}),
									}),
									e.jsx(x, {
										className:
											"bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
										children: e.jsx(p, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className:
															"p-2 bg-green-100 dark:bg-green-900 rounded-lg",
														children: e.jsx(O, {
															className:
																"h-5 w-5 text-green-600 dark:text-green-400",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "En cours",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: re,
															}),
														],
													}),
												],
											}),
										}),
									}),
									e.jsx(x, {
										className:
											"bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
										children: e.jsx(p, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className:
															"p-2 bg-orange-100 dark:bg-orange-900 rounded-lg",
														children: e.jsx(we, {
															className:
																"h-5 w-5 text-orange-600 dark:text-orange-400",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "Terminées",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: ae,
															}),
														],
													}),
												],
											}),
										}),
									}),
								],
							}),
							n.length === 0
								? e.jsx(x, {
										className:
											"border-dashed border-2 border-muted-foreground/25",
										children: e.jsxs(p, {
											className:
												"flex flex-col items-center justify-center py-16 text-center",
											children: [
												e.jsx("div", {
													className: "p-4 bg-muted/30 rounded-full mb-4",
													children: e.jsx(T, {
														className: "h-12 w-12 text-muted-foreground",
													}),
												}),
												e.jsx("h3", {
													className: "text-xl font-semibold mb-2",
													children: "Aucune session trouvée",
												}),
												e.jsx("p", {
													className: "text-muted-foreground mb-6 max-w-md",
													children:
														"Les sessions apparaîtront ici une fois qu'elles seront créées dans les catégories.",
												}),
												e.jsx(C, {
													size: "lg",
													asChild: !0,
													children: e.jsxs(I, {
														to: "/admin/dashboard/clubs/$clubId/sections",
														params: { clubId: c },
														children: [
															e.jsx(O, { className: "mr-2 h-5 w-5" }),
															"Voir les sections",
														],
													}),
												}),
											],
										}),
									})
								: e.jsxs(x, {
										children: [
											e.jsxs(U, {
												children: [
													e.jsxs(ne, {
														className: "flex items-center gap-2",
														children: [
															e.jsx(T, { className: "h-5 w-5" }),
															"Liste des sessions (",
															N.length,
															")",
														],
													}),
													e.jsxs(le, {
														children: [
															N.length,
															" session",
															N.length > 1 ? "s" : "",
															" affichée",
															N.length > 1 ? "s" : "",
															" sur",
															" ",
															n.length,
															" au total",
														],
													}),
												],
											}),
											e.jsxs(p, {
												children: [
													e.jsxs("div", {
														className: "mb-6 space-y-4",
														children: [
															e.jsxs("div", {
																className: "flex items-center justify-between",
																children: [
																	e.jsxs("h3", {
																		className:
																			"text-sm font-medium flex items-center gap-2",
																		children: [
																			e.jsx(Se, { className: "h-4 w-4" }),
																			"Filtres de recherche",
																		],
																	}),
																	e.jsx(C, {
																		variant: "outline",
																		className: "hover:cursor-pointer",
																		size: "sm",
																		onClick: Y,
																		children: "Effacer les filtres",
																	}),
																],
															}),
															e.jsxs("div", {
																className:
																	"grid grid-cols-1 md:grid-cols-5 gap-4",
																children: [
																	e.jsxs("div", {
																		className: "space-y-2",
																		children: [
																			e.jsx("label", {
																				htmlFor: "title",
																				className:
																					"text-xs font-medium text-muted-foreground",
																				children: "Titre",
																			}),
																			e.jsx($, {
																				id: "title",
																				placeholder: "Rechercher par titre...",
																				value: i.title,
																				onChange: (s) =>
																					v("title", s.target.value),
																				className: "h-8",
																			}),
																		],
																	}),
																	e.jsxs("div", {
																		className: "space-y-2",
																		children: [
																			e.jsx("label", {
																				htmlFor: "sectionName",
																				className:
																					"text-xs font-medium text-muted-foreground",
																				children: "Section",
																			}),
																			e.jsx($, {
																				id: "sectionName",
																				placeholder: "Filtrer par section...",
																				value: i.sectionName,
																				onChange: (s) =>
																					v("sectionName", s.target.value),
																				className: "h-8",
																			}),
																		],
																	}),
																	e.jsxs("div", {
																		className: "space-y-2",
																		children: [
																			e.jsx("label", {
																				htmlFor: "categoryName",
																				className:
																					"text-xs font-medium text-muted-foreground",
																				children: "Catégorie",
																			}),
																			e.jsx($, {
																				id: "categoryName",
																				placeholder: "Filtrer par catégorie...",
																				value: i.categoryName,
																				onChange: (s) =>
																					v("categoryName", s.target.value),
																				className: "h-8",
																			}),
																		],
																	}),
																	e.jsxs("div", {
																		className: "space-y-2",
																		children: [
																			e.jsx("label", {
																				htmlFor: "type",
																				className:
																					"text-xs font-medium text-muted-foreground",
																				children: "Type",
																			}),
																			e.jsxs(V, {
																				value: i.type,
																				onValueChange: (s) => v("type", s),
																				children: [
																					e.jsx(P, {
																						className: "h-8",
																						id: "type",
																						children: e.jsx(z, {
																							placeholder: "Tous les types",
																						}),
																					}),
																					e.jsxs(H, {
																						children: [
																							e.jsx(k, {
																								value: "all",
																								children: "Tous les types",
																							}),
																							_.map((s) =>
																								e.jsx(
																									k,
																									{
																										value: s,
																										children:
																											s === "entrainement"
																												? "Entraînement"
																												: s === "match"
																													? "Match"
																													: s === "stage"
																														? "Stage"
																														: s ===
																																"competition"
																															? "Compétition"
																															: "Autre",
																									},
																									s,
																								),
																							),
																						],
																					}),
																				],
																			}),
																		],
																	}),
																	e.jsxs("div", {
																		className: "space-y-2",
																		children: [
																			e.jsx("label", {
																				htmlFor: "status",
																				className:
																					"text-xs font-medium text-muted-foreground",
																				children: "Statut",
																			}),
																			e.jsxs(V, {
																				value: i.status,
																				onValueChange: (s) => v("status", s),
																				children: [
																					e.jsx(P, {
																						className: "h-8",
																						id: "status",
																						children: e.jsx(z, {
																							placeholder: "Tous les statuts",
																						}),
																					}),
																					e.jsxs(H, {
																						children: [
																							e.jsx(k, {
																								value: "all",
																								children: "Tous les statuts",
																							}),
																							ee.map((s) =>
																								e.jsx(
																									k,
																									{
																										value: s,
																										children:
																											s === "planifie"
																												? "Planifié"
																												: s === "en_cours"
																													? "En cours"
																													: s === "termine"
																														? "Terminé"
																														: "Annulé",
																									},
																									s,
																								),
																							),
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
													e.jsx("div", {
														className: "rounded-md border",
														children: e.jsxs(fe, {
															children: [
																e.jsx(Ne, {
																	children: e.jsxs(M, {
																		className: "hover:bg-transparent",
																		children: [
																			e.jsx(g, {
																				className:
																					"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
																				onClick: () => j("title"),
																				children: e.jsxs("div", {
																					className: "flex items-center",
																					children: ["Titre", f("title")],
																				}),
																			}),
																			e.jsx(g, {
																				className:
																					"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
																				onClick: () => j("sectionName"),
																				children: e.jsxs("div", {
																					className: "flex items-center",
																					children: [
																						"Section",
																						f("sectionName"),
																					],
																				}),
																			}),
																			e.jsx(g, {
																				className:
																					"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
																				onClick: () => j("categoryName"),
																				children: e.jsxs("div", {
																					className: "flex items-center",
																					children: [
																						"Catégorie",
																						f("categoryName"),
																					],
																				}),
																			}),
																			e.jsx(g, {
																				className:
																					"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
																				onClick: () => j("type"),
																				children: e.jsxs("div", {
																					className: "flex items-center",
																					children: ["Type", f("type")],
																				}),
																			}),
																			e.jsx(g, {
																				className:
																					"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
																				onClick: () => j("status"),
																				children: e.jsxs("div", {
																					className: "flex items-center",
																					children: ["Statut", f("status")],
																				}),
																			}),
																			e.jsx(g, {
																				className:
																					"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
																				onClick: () => j("startDate"),
																				children: e.jsxs("div", {
																					className: "flex items-center",
																					children: ["Date", f("startDate")],
																				}),
																			}),
																			e.jsx(g, {
																				className: "font-semibold text-right",
																				children: "Actions",
																			}),
																		],
																	}),
																}),
																e.jsx(be, {
																	children:
																		N.length === 0
																			? e.jsx(M, {
																					children: e.jsx(m, {
																						colSpan: 7,
																						className:
																							"h-24 text-center text-muted-foreground",
																						children:
																							n.length === 0
																								? "Aucune session trouvée. Créez votre première session !"
																								: "Aucune session ne correspond aux filtres appliqués.",
																					}),
																				})
																			: N.map((s) =>
																					e.jsxs(
																						M,
																						{
																							className:
																								"hover:bg-muted/50 transition-colors",
																							children: [
																								e.jsx(m, {
																									className: "font-medium",
																									children: s.title,
																								}),
																								e.jsx(m, {
																									children: e.jsx(D, {
																										variant: "secondary",
																										className: "text-xs",
																										children: s.sectionName,
																									}),
																								}),
																								e.jsx(m, {
																									children: e.jsx(D, {
																										variant: "outline",
																										className: "text-xs",
																										children: s.categoryName,
																									}),
																								}),
																								e.jsx(m, {
																									children: X(s.type),
																								}),
																								e.jsx(m, {
																									children: W(s.status),
																								}),
																								e.jsx(m, {
																									className:
																										"font-mono text-sm",
																									children: e.jsxs("div", {
																										className: "space-y-1",
																										children: [
																											e.jsxs("div", {
																												children: [
																													new Date(
																														s.startDate,
																													).toLocaleDateString(
																														"fr-FR",
																														{
																															day: "2-digit",
																															month: "2-digit",
																															year: "numeric",
																														},
																													),
																													" ",
																													"à",
																													" ",
																													new Date(
																														s.startDate,
																													).toLocaleTimeString(
																														"fr-FR",
																														{
																															hour: "2-digit",
																															minute: "2-digit",
																														},
																													),
																												],
																											}),
																											e.jsxs("div", {
																												className:
																													"text-xs text-muted-foreground",
																												children: [
																													"→",
																													" ",
																													new Date(
																														s.endDate,
																													).toLocaleDateString(
																														"fr-FR",
																														{
																															day: "2-digit",
																															month: "2-digit",
																															year: "numeric",
																														},
																													),
																													" ",
																													"à",
																													" ",
																													new Date(
																														s.endDate,
																													).toLocaleTimeString(
																														"fr-FR",
																														{
																															hour: "2-digit",
																															minute: "2-digit",
																														},
																													),
																												],
																											}),
																										],
																									}),
																								}),
																								e.jsx(m, {
																									className: "text-right",
																									children: e.jsxs("div", {
																										className:
																											"flex items-center justify-end gap-2",
																										children: [
																											e.jsx(C, {
																												variant: "ghost",
																												size: "sm",
																												className:
																													"h-8 px-3 hover:bg-primary/10 hover:text-primary",
																												asChild: !0,
																												children: e.jsxs(I, {
																													to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit",
																													params: {
																														clubId: c,
																														sectionId:
																															s.sectionId,
																														categoryId:
																															s.categoryId,
																														sessionId: s.id,
																													},
																													children: [
																														e.jsx(Ce, {
																															className:
																																"h-4 w-4 mr-1",
																														}),
																														"Modifier",
																													],
																												}),
																											}),
																											e.jsxs(C, {
																												variant: "ghost",
																												size: "sm",
																												className:
																													"h-8 px-3 hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive",
																												onClick: () => L(s),
																												children: [
																													e.jsx(ce, {
																														className:
																															"mr-1 h-3 w-3",
																													}),
																													"Supprimer",
																												],
																											}),
																										],
																									}),
																								}),
																							],
																						},
																						s.id,
																					),
																				),
																}),
															],
														}),
													}),
												],
											}),
										],
									}),
						],
					}),
					e.jsx(de, {
						open: !!h,
						onOpenChange: () => L(null),
						children: e.jsxs(me, {
							children: [
								e.jsxs(ue, {
									children: [
										e.jsx(he, { children: "Supprimer la session" }),
										e.jsxs(xe, {
											children: [
												"Êtes-vous sûr de vouloir supprimer la session",
												" ",
												e.jsxs("strong", {
													children: ['"', h == null ? void 0 : h.title, '"'],
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
												"La suppression de cette session entraînera également :",
												e.jsxs("ul", {
													className: "list-disc list-inside mt-2 space-y-1",
													children: [
														e.jsx("li", {
															children:
																"La perte de tous les participants inscrits à cette session",
														}),
														e.jsx("li", {
															children:
																"La suppression de l'historique des présences",
														}),
														e.jsx("li", {
															children:
																"La perte de toutes les données statistiques liées à cette session",
														}),
														e.jsx("li", {
															children:
																"La suppression des évaluations et commentaires associés",
														}),
														e.jsx("li", {
															children:
																"La perte de tous les documents et fichiers attachés",
														}),
													],
												}),
												e.jsx("br", {}),
												"Toutes ces données seront définitivement perdues et ne pourront pas être récupérées.",
											],
										}),
									],
								}),
								e.jsxs(pe, {
									children: [
										e.jsx(ge, { disabled: A, children: "Annuler" }),
										e.jsx(je, {
											onClick: Z,
											disabled: A,
											className:
												"bg-destructive text-destructive-foreground hover:bg-destructive/90",
											children: A
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
const as = () => {
	const n = oe.c(1);
	let u;
	return (
		n[0] === Symbol.for("react.memo_cache_sentinel")
			? ((u = e.jsx(Te, {})), (n[0] = u))
			: (u = n[0]),
		u
	);
};
export { as as component };
