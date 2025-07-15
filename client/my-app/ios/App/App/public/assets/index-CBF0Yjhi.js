import {
	g as J,
	f as K,
	T as O,
	c as Q,
	b as W,
	d as X,
	e as Y,
	A as Z,
	a as ee,
} from "./alert-dialog-BJAnlKbe.js";
import { A as re } from "./arrow-left-DMyOJown.js";
import { B as x } from "./badge-BAidKpPB.js";
import { C as le } from "./chevron-down-CMzABl4R.js";
import { C as oe } from "./chevron-up-DyH28r2x.js";
import {
	L as D,
	t as E,
	f as G,
	e as P,
	C as U,
	b as V,
	d as _,
	j as e,
	r as l,
	B as p,
	cd as q,
} from "./index-kb-Ylywn.js";
import { I as M } from "./input-CdkcPZS3.js";
import { S as ne } from "./search-CT8NOJQT.js";
import { S as ie } from "./square-pen-s7PUkmhH.js";
import {
	a as A,
	T as ae,
	e as g,
	b as j,
	c as se,
	d as te,
} from "./table-De-kdsVW.js";
import { U as k } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
const t = (i) => i != null && i >= 0;
function ce() {
	const { clubId: i, sectionId: m } = q({
			from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/",
		}),
		[f, R] = l.useState([]),
		[L, y] = l.useState(""),
		[N, F] = l.useState("name"),
		[h, $] = l.useState("asc"),
		[r, I] = l.useState({ name: "", ageMin: "", ageMax: "", ageRange: "" }),
		[d, b] = l.useState(null),
		[C, T] = l.useState(!1);
	l.useEffect(() => {
		(async () => {
			const n = await (
				await fetch(`/api/clubs/${i}/sections/${m}/categories`)
			).json();
			R(n);
			const o = await (await fetch(`/api/clubs/${i}/sections/${m}`)).json();
			y(o.name);
		})();
	}, [i, m]);
	const w = (s) => {
			N === s ? $(h === "asc" ? "desc" : "asc") : (F(s), $("asc"));
		},
		v = (s, a) => {
			I((n) => ({ ...n, [s]: a }));
		},
		S = (s) =>
			N !== s
				? null
				: h === "asc"
					? e.jsx(oe, { className: "ml-1 h-4 w-4" })
					: e.jsx(le, { className: "ml-1 h-4 w-4" }),
		u = l.useMemo(() => {
			const s = f.filter((a) => {
				const n = a.name.toLowerCase().includes(r.name.toLowerCase()),
					c =
						r.ageMin === "" ||
						(t(a.ageMin) && a.ageMin.toString().includes(r.ageMin)) ||
						(!t(a.ageMin) && r.ageMin.toLowerCase().includes("non")),
					o =
						r.ageMax === "" ||
						(t(a.ageMax) && a.ageMax.toString().includes(r.ageMax)) ||
						(!t(a.ageMax) && r.ageMax.toLowerCase().includes("non")),
					H =
						r.ageRange === "" ||
						(t(a.ageMin) &&
							t(a.ageMax) &&
							`${a.ageMin} - ${a.ageMax}`.includes(r.ageRange)) ||
						((!t(a.ageMin) || !t(a.ageMax)) &&
							r.ageRange.toLowerCase().includes("non"));
				return n && c && o && H;
			});
			return (
				s.sort((a, n) => {
					let c, o;
					switch (N) {
						case "name":
							(c = a.name.toLowerCase()), (o = n.name.toLowerCase());
							break;
						case "ageMin":
							(c = t(a.ageMin) ? a.ageMin : -1),
								(o = t(n.ageMin) ? n.ageMin : -1);
							break;
						case "ageMax":
							(c = t(a.ageMax) ? a.ageMax : -1),
								(o = t(n.ageMax) ? n.ageMax : -1);
							break;
						default:
							return 0;
					}
					return c < o
						? h === "asc"
							? -1
							: 1
						: c > o
							? h === "asc"
								? 1
								: -1
							: 0;
				}),
				s
			);
		}, [f, r, N, h]),
		z = () => {
			I({ name: "", ageMin: "", ageMax: "", ageRange: "" });
		},
		B = async () => {
			if (d) {
				T(!0);
				try {
					if (
						!(
							await fetch(`/api/clubs/${i}/sections/${m}/categories/${d.id}`, {
								method: "DELETE",
							})
						).ok
					)
						throw new Error("Erreur lors de la suppression");
					R((a) => a.filter((n) => n.id !== d.id)),
						b(null),
						E.success("Catégorie supprimée avec succès");
				} catch (s) {
					console.error("Erreur lors de la suppression:", s),
						E.error("Erreur lors de la suppression de la catégorie");
				} finally {
					T(!1);
				}
			}
		};
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
									children: ["Catégories de la section ", L],
								}),
								e.jsxs("p", {
									className: "text-muted-foreground",
									children: [
										"Gérez les catégories de la section",
										" ",
										e.jsx("span", { className: "font-medium", children: L }),
									],
								}),
							],
						}),
						e.jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								e.jsx(p, {
									variant: "outline",
									size: "sm",
									asChild: !0,
									children: e.jsxs(D, {
										to: "/admin/dashboard/clubs/$clubId/sections",
										params: { clubId: i },
										children: [
											e.jsx(re, { className: "w-4 h-4 mr-2" }),
											"Retour aux sections",
										],
									}),
								}),
								e.jsx(p, {
									asChild: !0,
									children: e.jsxs(D, {
										to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
										params: { clubId: i, sectionId: m },
										children: [
											e.jsx(k, { className: "mr-2 h-4 w-4" }),
											"Créer une catégorie",
										],
									}),
								}),
							],
						}),
					],
				}),
			}),
			e.jsxs(P, {
				children: [
					e.jsxs(U, {
						children: [
							e.jsxs(V, {
								className: "flex items-center gap-2",
								children: [
									e.jsx(k, { className: "h-5 w-5" }),
									"Liste des catégories",
								],
							}),
							e.jsxs(_, {
								children: [
									u.length,
									" catégorie",
									u.length > 1 ? "s" : "",
									" affichée",
									u.length > 1 ? "s" : "",
									" sur",
									" ",
									f.length,
									" au total",
								],
							}),
						],
					}),
					e.jsxs(G, {
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
													e.jsx(ne, { className: "h-4 w-4" }),
													"Filtres de recherche",
												],
											}),
											e.jsx(p, {
												variant: "outline",
												className: "hover:cursor-pointer",
												size: "sm",
												onClick: z,
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
														htmlFor: "name",
														className:
															"text-xs font-medium text-muted-foreground",
														children: "Nom de la catégorie",
													}),
													e.jsx(M, {
														id: "name",
														placeholder: "Rechercher par nom...",
														value: r.name,
														onChange: (s) => v("name", s.target.value),
														className: "h-8",
													}),
												],
											}),
											e.jsxs("div", {
												className: "space-y-2",
												children: [
													e.jsx("label", {
														htmlFor: "ageMin",
														className:
															"text-xs font-medium text-muted-foreground",
														children: "Âge minimum",
													}),
													e.jsx(M, {
														id: "ageMin",
														placeholder: "Ex: 12",
														value: r.ageMin,
														onChange: (s) => v("ageMin", s.target.value),
														className: "h-8",
													}),
												],
											}),
											e.jsxs("div", {
												className: "space-y-2",
												children: [
													e.jsx("label", {
														htmlFor: "ageMax",
														className:
															"text-xs font-medium text-muted-foreground",
														children: "Âge maximum",
													}),
													e.jsx(M, {
														id: "ageMax",
														placeholder: "Ex: 18",
														value: r.ageMax,
														onChange: (s) => v("ageMax", s.target.value),
														className: "h-8",
													}),
												],
											}),
											e.jsxs("div", {
												className: "space-y-2",
												children: [
													e.jsx("label", {
														htmlFor: "ageRange",
														className:
															"text-xs font-medium text-muted-foreground",
														children: "Tranche d'âge",
													}),
													e.jsx(M, {
														id: "ageRange",
														placeholder: "Ex: 12 - 18",
														value: r.ageRange,
														onChange: (s) => v("ageRange", s.target.value),
														className: "h-8",
													}),
												],
											}),
										],
									}),
								],
							}),
							e.jsx("div", {
								className: "rounded-md border",
								children: e.jsxs(se, {
									children: [
										e.jsx(ae, {
											children: e.jsxs(A, {
												className: "hover:bg-transparent",
												children: [
													e.jsx(j, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => w("name"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Nom de la catégorie", S("name")],
														}),
													}),
													e.jsx(j, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => w("ageMin"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Âge minimum", S("ageMin")],
														}),
													}),
													e.jsx(j, {
														className:
															"font-semibold cursor-pointer hover:bg-muted/50 transition-colors",
														onClick: () => w("ageMax"),
														children: e.jsxs("div", {
															className: "flex items-center",
															children: ["Âge maximum", S("ageMax")],
														}),
													}),
													e.jsx(j, {
														className: "font-semibold",
														children: "Tranche d'âge",
													}),
													e.jsx(j, {
														className: "font-semibold text-right",
														children: "Actions",
													}),
												],
											}),
										}),
										e.jsx(te, {
											children:
												u.length === 0
													? e.jsx(A, {
															children: e.jsx(g, {
																colSpan: 5,
																className:
																	"h-24 text-center text-muted-foreground",
																children:
																	f.length === 0
																		? "Aucune catégorie trouvée. Créez votre première catégorie !"
																		: "Aucune catégorie ne correspond aux filtres appliqués.",
															}),
														})
													: u.map((s) =>
															e.jsxs(
																A,
																{
																	className:
																		"hover:bg-muted/50 transition-colors",
																	children: [
																		e.jsx(g, {
																			className: "font-medium text-foreground",
																			children: s.name,
																		}),
																		e.jsx(g, {
																			children:
																				s.ageMin !== void 0
																					? e.jsxs(x, {
																							variant: "secondary",
																							className: "font-mono",
																							children: [s.ageMin, " ans"],
																						})
																					: e.jsx("span", {
																							className:
																								"text-muted-foreground text-sm",
																							children: "Non défini",
																						}),
																		}),
																		e.jsx(g, {
																			children: t(s.ageMax)
																				? e.jsxs(x, {
																						variant: "secondary",
																						className: "font-mono",
																						children: [s.ageMax, " ans"],
																					})
																				: e.jsx(x, {
																						variant: "outline",
																						className: "font-mono",
																						children: "Non défini",
																					}),
																		}),
																		e.jsx(g, {
																			children:
																				t(s.ageMin) && t(s.ageMax)
																					? e.jsxs(x, {
																							variant: "outline",
																							className: "font-mono",
																							children: [
																								s.ageMin,
																								" → ",
																								s.ageMax,
																								" ans",
																							],
																						})
																					: t(s.ageMin) && !t(s.ageMax)
																						? e.jsxs(x, {
																								variant: "outline",
																								className: "font-mono",
																								children: [
																									s.ageMin,
																									" ans et +",
																								],
																							})
																						: e.jsx(x, {
																								variant: "outline",
																								className: "font-mono",
																								children: "Non défini",
																							}),
																		}),
																		e.jsx(g, {
																			className: "text-right",
																			children: e.jsxs("div", {
																				className:
																					"flex items-center justify-end gap-2",
																				children: [
																					e.jsx(p, {
																						variant: "ghost",
																						size: "sm",
																						className:
																							"h-8 px-3 hover:bg-primary/10 hover:text-primary",
																						asChild: !0,
																						children: e.jsxs(D, {
																							to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
																							params: {
																								clubId: i,
																								sectionId: m,
																								categoryId: s.id,
																							},
																							children: [
																								e.jsx(ie, {
																									className: "h-4 w-4 mr-1",
																								}),
																								"Modifier",
																							],
																						}),
																					}),
																					e.jsxs(p, {
																						variant: "ghost",
																						size: "sm",
																						className:
																							"h-8 px-3 hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive",
																						onClick: () => b(s),
																						children: [
																							e.jsx(O, {
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
			e.jsx(J, {
				open: !!d,
				onOpenChange: () => b(null),
				children: e.jsxs(K, {
					children: [
						e.jsxs(Q, {
							children: [
								e.jsx(W, { children: "Supprimer la catégorie" }),
								e.jsxs(X, {
									children: [
										"Êtes-vous sûr de vouloir supprimer la catégorie",
										" ",
										e.jsxs("strong", {
											children: ['"', d == null ? void 0 : d.name, '"'],
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
										"La suppression de cette catégorie entraînera également :",
										e.jsxs("ul", {
											className: "list-disc list-inside mt-2 space-y-1",
											children: [
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
														"La suppression de l'historique des activités",
												}),
											],
										}),
										e.jsx("br", {}),
										"Toutes ces données seront définitivement perdues et ne pourront pas être récupérées.",
									],
								}),
							],
						}),
						e.jsxs(Y, {
							children: [
								e.jsx(Z, { disabled: C, children: "Annuler" }),
								e.jsx(ee, {
									onClick: B,
									disabled: C,
									className:
										"bg-destructive text-destructive-foreground hover:bg-destructive/90",
									children: C ? "Suppression..." : "Supprimer définitivement",
								}),
							],
						}),
					],
				}),
			}),
		],
	});
}
const Le = ce;
export { Le as component };
