import {
	T as ae,
	e as ce,
	A as de,
	f as ie,
	d as le,
	a as me,
	c as ne,
	b as oe,
	g as re,
} from "./alert-dialog-BJAnlKbe.js";
import { A as pe } from "./arrow-left-DMyOJown.js";
import { B as T } from "./badge-BAidKpPB.js";
import { C as ge } from "./calendar-De7tcxsN.js";
import { C as ve } from "./chevron-down-CMzABl4R.js";
import { C as Ne } from "./chevron-up-DyH28r2x.js";
import {
	t as M,
	cd as Y,
	e as Z,
	C as _,
	L as b,
	j as e,
	b as ee,
	B as h,
	r as o,
	d as se,
	f as te,
} from "./index-kb-Ylywn.js";
import { I as R } from "./input-CdkcPZS3.js";
import { P as V } from "./plus-czqh0ZLb.js";
import { S as je } from "./search-CT8NOJQT.js";
import { S as B, a as P, b as q, d as y, c as z } from "./select-D8GIfri3.js";
import { S as fe } from "./square-pen-s7PUkmhH.js";
import {
	a as I,
	T as he,
	e as m,
	c as ue,
	b as x,
	d as xe,
} from "./table-De-kdsVW.js";
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
function be() {
	const { clubId: l, sectionId: c } = Y({
			from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/sessions/",
		}),
		[u, L] = o.useState([]),
		[A, H] = o.useState([]),
		[$, G] = o.useState(""),
		[N, O] = o.useState("startDate"),
		[p, k] = o.useState("desc"),
		[i, F] = o.useState({
			title: "",
			categoryName: "",
			type: "all",
			status: "all",
		}),
		[d, C] = o.useState(null),
		[S, E] = o.useState(!1);
	o.useEffect(() => {
		(async () => {
			const t = await fetch(`/api/clubs/${l}/sections/${c}/categories`).then(
				(r) => r.json(),
			);
			H(t);
			const a = [];
			for (const r of t) {
				const D = await fetch(
					`/api/clubs/${l}/sections/${c}/categories/${r.id}/sessions`,
				).then((w) => w.json());
				a.push(
					...D.map((w) => ({ ...w, categoryName: r.name, categoryId: r.id })),
				);
			}
			L(a);
			const n = await fetch(`/api/clubs/${l}/sections/${c}`).then((r) =>
				r.json(),
			);
			G(n.name);
		})();
	}, [l, c]);
	const g = (s) => {
			N === s ? k(p === "asc" ? "desc" : "asc") : (O(s), k("asc"));
		},
		v = (s, t) => {
			F((a) => ({ ...a, [s]: t }));
		},
		j = (s) =>
			N !== s
				? null
				: p === "asc"
					? e.jsx(Ne, { className: "ml-1 h-4 w-4" })
					: e.jsx(ve, { className: "ml-1 h-4 w-4" }),
		U = (s) => {
			const t = {
					planifie: "default",
					en_cours: "secondary",
					termine: "outline",
					annule: "destructive",
				},
				a = {
					planifie: "Planifié",
					en_cours: "En cours",
					termine: "Terminé",
					annule: "Annulé",
				};
			return e.jsx(T, { variant: t[s] || "default", children: a[s] || s });
		},
		J = (s) => {
			const t = {
					entrainement: "default",
					match: "secondary",
					stage: "outline",
					competition: "destructive",
					autre: "outline",
				},
				a = {
					entrainement: "Entraînement",
					match: "Match",
					stage: "Stage",
					competition: "Compétition",
					autre: "Autre",
				};
			return e.jsx(T, { variant: t[s] || "default", children: a[s] || s });
		},
		f = o.useMemo(() => {
			const s = u.filter((t) => {
				const a = t.title.toLowerCase().includes(i.title.toLowerCase()),
					n =
						i.categoryName === "" ||
						t.categoryName.toLowerCase().includes(i.categoryName.toLowerCase()),
					r = i.type === "" || i.type === "all" || t.type === i.type,
					D = i.status === "" || i.status === "all" || t.status === i.status;
				return a && n && r && D;
			});
			return (
				s.sort((t, a) => {
					let n, r;
					switch (N) {
						case "title":
							(n = t.title.toLowerCase()), (r = a.title.toLowerCase());
							break;
						case "categoryName":
							(n = (t.categoryName || "").toLowerCase()),
								(r = (a.categoryName || "").toLowerCase());
							break;
						case "type":
							(n = t.type), (r = a.type);
							break;
						case "status":
							(n = t.status), (r = a.status);
							break;
						case "startDate":
							(n = new Date(t.startDate)), (r = new Date(a.startDate));
							break;
						default:
							return 0;
					}
					return n < r
						? p === "asc"
							? -1
							: 1
						: n > r
							? p === "asc"
								? 1
								: -1
							: 0;
				}),
				s
			);
		}, [u, i, N, p]),
		K = () => {
			F({ title: "", categoryName: "", type: "all", status: "all" });
		},
		Q = async () => {
			if (d) {
				E(!0);
				try {
					if (
						!(await fetch(`/api/clubs/sessions/${d.id}`, { method: "DELETE" }))
							.ok
					)
						throw new Error("Erreur lors de la suppression");
					L((t) => t.filter((a) => a.id !== d.id)),
						C(null),
						M.success("Session supprimée avec succès");
				} catch (s) {
					console.error("Erreur lors de la suppression:", s),
						M.error("Erreur lors de la suppression");
				} finally {
					E(!1);
				}
			}
		},
		W = [...new Set(u.map((s) => s.type))],
		X = [...new Set(u.map((s) => s.status))];
	return e.jsxs("div", {
		className: "container mx-auto p-6 space-y-8",
		children: [
			e.jsx("div", {
				className: "flex flex-col gap-4",
				children: e.jsxs("div", {
					className:
						"flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
					children: [
						e.jsxs("div", {
							className: "space-y-1",
							children: [
								e.jsxs("h1", {
									className: "text-3xl font-bold tracking-tight",
									children: ["Sessions de la section ", $],
								}),
								e.jsxs("p", {
									className: "text-muted-foreground",
									children: [
										"Gérez les sessions de la section",
										" ",
										e.jsx("span", { className: "font-medium", children: $ }),
									],
								}),
							],
						}),
						e.jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								e.jsx(h, {
									variant: "outline",
									size: "sm",
									asChild: !0,
									children: e.jsxs(b, {
										to: "/admin/dashboard/clubs/$clubId/sections",
										params: { clubId: l },
										children: [
											e.jsx(pe, { className: "w-4 h-4 mr-2" }),
											"Retour aux sections",
										],
									}),
								}),
								A.length > 0
									? e.jsx(h, {
											asChild: !0,
											children: e.jsxs(b, {
												to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create",
												params: {
													clubId: l,
													sectionId: c,
													categoryId: A[0].id,
												},
												children: [
													e.jsx(V, { className: "mr-2 h-4 w-4" }),
													"Créer une session",
												],
											}),
										})
									: e.jsx(h, {
											variant: "outline",
											asChild: !0,
											children: e.jsxs(b, {
												to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
												params: { clubId: l, sectionId: c },
												children: [
													e.jsx(V, { className: "mr-2 h-4 w-4" }),
													"Créer une catégorie",
												],
											}),
										}),
							],
						}),
					],
				}),
			}),
			e.jsxs(Z, {
				children: [
					e.jsxs(_, {
						children: [
							e.jsxs(ee, {
								className: "flex items-center gap-2",
								children: [
									e.jsx(ge, { className: "h-5 w-5" }),
									"Liste des sessions",
								],
							}),
							e.jsxs(se, {
								children: [
									f.length,
									" session",
									f.length > 1 ? "s" : "",
									" affichée",
									f.length > 1 ? "s" : "",
									" sur",
									" ",
									u.length,
									" au total",
								],
							}),
						],
					}),
					e.jsxs(te, {
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
													e.jsx(je, { className: "h-4 w-4" }),
													"Filtres de recherche",
												],
											}),
											e.jsx(h, {
												variant: "outline",
												className: "hover:cursor-pointer",
												size: "sm",
												onClick: K,
												children: "Effacer les filtres",
											}),
										],
									}),
									e.jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-4 gap-4",
										children: [
											e.jsxs("div", {
												className: "space-y-2",
												children: [
													e.jsx("label", {
														htmlFor: "title",
														className:
															"text-xs font-medium text-muted-foreground",
														children: "Titre de la session",
													}),
													e.jsx(R, {
														id: "title",
														placeholder: "Rechercher par titre...",
														value: i.title,
														onChange: (s) => v("title", s.target.value),
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
													e.jsx(R, {
														id: "categoryName",
														placeholder: "Filtrer par catégorie...",
														value: i.categoryName,
														onChange: (s) => v("categoryName", s.target.value),
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
													e.jsxs(B, {
														value: i.type,
														onValueChange: (s) => v("type", s),
														children: [
															e.jsx(P, {
																className: "h-8",
																id: "type",
																children: e.jsx(q, {
																	placeholder: "Tous les types",
																}),
															}),
															e.jsxs(z, {
																children: [
																	e.jsx(y, {
																		value: "all",
																		children: "Tous les types",
																	}),
																	W.map((s) =>
																		e.jsx(
																			y,
																			{
																				value: s,
																				children:
																					s === "entrainement"
																						? "Entraînement"
																						: s === "match"
																							? "Match"
																							: s === "stage"
																								? "Stage"
																								: s === "competition"
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
													e.jsxs(B, {
														value: i.status,
														onValueChange: (s) => v("status", s),
														children: [
															e.jsx(P, {
																className: "h-8",
																id: "status",
																children: e.jsx(q, {
																	placeholder: "Tous les statuts",
																}),
															}),
															e.jsxs(z, {
																children: [
																	e.jsx(y, {
																		value: "all",
																		children: "Tous les statuts",
																	}),
																	X.map((s) =>
																		e.jsx(
																			y,
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
								children: e.jsxs(ue, {
									children: [
										e.jsx(he, {
											children: e.jsxs(I, {
												className: "hover:bg-transparent",
												children: [
													e.jsx(x, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => g("title"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Titre", j("title")],
														}),
													}),
													e.jsx(x, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => g("categoryName"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Catégorie", j("categoryName")],
														}),
													}),
													e.jsx(x, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => g("type"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Type", j("type")],
														}),
													}),
													e.jsx(x, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => g("status"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Statut", j("status")],
														}),
													}),
													e.jsx(x, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => g("startDate"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Date", j("startDate")],
														}),
													}),
													e.jsx(x, {
														className: "font-semibold text-right",
														children: "Actions",
													}),
												],
											}),
										}),
										e.jsx(xe, {
											children:
												f.length === 0
													? e.jsx(I, {
															children: e.jsx(m, {
																colSpan: 6,
																className:
																	"h-24 text-center text-muted-foreground",
																children:
																	u.length === 0
																		? "Aucune session trouvée. Créez votre première session !"
																		: "Aucune session ne correspond aux filtres appliqués.",
															}),
														})
													: f.map((s) =>
															e.jsxs(
																I,
																{
																	className:
																		"hover:bg-muted/50 transition-colors",
																	children: [
																		e.jsx(m, {
																			className: "font-medium text-foreground",
																			children: s.title,
																		}),
																		e.jsx(m, {
																			children: e.jsx(T, {
																				variant: "outline",
																				className: "font-medium",
																				children: s.categoryName,
																			}),
																		}),
																		e.jsx(m, { children: J(s.type) }),
																		e.jsx(m, { children: U(s.status) }),
																		e.jsx(m, {
																			className: "font-mono text-sm",
																			children: e.jsxs("div", {
																				className: "space-y-1",
																				children: [
																					e.jsxs("div", {
																						children: [
																							new Date(
																								s.startDate,
																							).toLocaleDateString("fr-FR", {
																								day: "2-digit",
																								month: "2-digit",
																								year: "numeric",
																							}),
																							" ",
																							"à",
																							" ",
																							new Date(
																								s.startDate,
																							).toLocaleTimeString("fr-FR", {
																								hour: "2-digit",
																								minute: "2-digit",
																							}),
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
																							).toLocaleDateString("fr-FR", {
																								day: "2-digit",
																								month: "2-digit",
																								year: "numeric",
																							}),
																							" ",
																							"à",
																							" ",
																							new Date(
																								s.endDate,
																							).toLocaleTimeString("fr-FR", {
																								hour: "2-digit",
																								minute: "2-digit",
																							}),
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
																					e.jsx(h, {
																						variant: "ghost",
																						size: "sm",
																						className:
																							"h-8 px-3 hover:bg-primary/10 hover:text-primary",
																						asChild: !0,
																						children: e.jsxs(b, {
																							to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit",
																							params: {
																								clubId: l,
																								sectionId: c,
																								categoryId: s.categoryId,
																								sessionId: s.id,
																							},
																							children: [
																								e.jsx(fe, {
																									className: "h-4 w-4 mr-1",
																								}),
																								"Modifier",
																							],
																						}),
																					}),
																					e.jsxs(h, {
																						variant: "ghost",
																						size: "sm",
																						className:
																							"h-8 px-3 hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive",
																						onClick: () => C(s),
																						children: [
																							e.jsx(ae, {
																								className: "mr-1 h-3 w-3",
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
			e.jsx(re, {
				open: !!d,
				onOpenChange: () => C(null),
				children: e.jsxs(ie, {
					children: [
						e.jsxs(ne, {
							children: [
								e.jsx(oe, { children: "Supprimer la session" }),
								e.jsxs(le, {
									children: [
										"Êtes-vous sûr de vouloir supprimer la session",
										" ",
										e.jsxs("strong", {
											children: ['"', d == null ? void 0 : d.title, '"'],
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
						e.jsxs(ce, {
							children: [
								e.jsx(de, { disabled: S, children: "Annuler" }),
								e.jsx(me, {
									onClick: Q,
									disabled: S,
									className:
										"bg-destructive text-destructive-foreground hover:bg-destructive/90",
									children: S ? "Suppression..." : "Supprimer définitivement",
								}),
							],
						}),
					],
				}),
			}),
		],
	});
}
const Qe = be;
export { Qe as component };
