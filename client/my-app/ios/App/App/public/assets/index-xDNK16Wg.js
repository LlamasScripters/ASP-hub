import {
	T as G,
	g as J,
	f as K,
	c as Q,
	b as W,
	d as X,
	e as Y,
	A as Z,
	a as _,
} from "./alert-dialog-BJAnlKbe.js";
import { A as oe } from "./arrow-left-DMyOJown.js";
import { B as L } from "./badge-BAidKpPB.js";
import { C as ce } from "./calendar-De7tcxsN.js";
import {
	e as ae,
	a as ie,
	d as le,
	c as ne,
	D as te,
} from "./dialog-CMg-ysIO.js";
import { F as T } from "./folder-open-Bjf3vPky.js";
import {
	c as B,
	L as E,
	b as F,
	C as M,
	a as P,
	i as R,
	d as V,
	r as c,
	j as e,
	e as h,
	cd as q,
	f as u,
	B as w,
	t as z,
} from "./index-kb-Ylywn.js";
import { P as U } from "./plus-czqh0ZLb.js";
import { S as k } from "./skeleton-C4Qqz043.js";
import { S as de } from "./square-pen-s7PUkmhH.js";
import {
	b as A,
	e as D,
	a as H,
	c as ee,
	d as re,
	T as se,
} from "./table-De-kdsVW.js";
import { U as $ } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
import "./x-BwQkFnmd.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const me = [
		[
			"path",
			{
				d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
				key: "vktsd0",
			},
		],
		[
			"circle",
			{ cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" },
		],
	],
	xe = P("tag", me);
function he(l) {
	const s = B.c(21),
		{ isOpen: t, onClose: o, clubId: i } = l,
		m = R();
	let p;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((p = []), (s[0] = p))
		: (p = s[0]);
	const [j, C] = c.useState(p),
		[n, f] = c.useState(!1);
	let x, g;
	s[1] !== i || s[2] !== t
		? ((x = () => {
				t &&
					(f(!0),
					fetch(`/api/clubs/${i}/sections`)
						.then(ue)
						.then(C)
						.catch(console.error)
						.finally(() => f(!1)));
			}),
			(g = [t, i]),
			(s[1] = i),
			(s[2] = t),
			(s[3] = x),
			(s[4] = g))
		: ((x = s[3]), (g = s[4])),
		c.useEffect(x, g);
	let b;
	s[5] !== i || s[6] !== m || s[7] !== o
		? ((b = (a) => {
				m({
					to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
					params: { clubId: i, sectionId: a },
				}),
					o();
			}),
			(s[5] = i),
			(s[6] = m),
			(s[7] = o),
			(s[8] = b))
		: (b = s[8]);
	const S = b;
	let N;
	s[9] === Symbol.for("react.memo_cache_sentinel")
		? ((N = e.jsxs(te, {
				children: [
					e.jsxs(le, {
						className: "flex items-center gap-2",
						children: [
							e.jsx(T, { className: "h-5 w-5" }),
							"Sélectionner une section",
						],
					}),
					e.jsx(ie, {
						children:
							"Choisissez la section dans laquelle vous souhaitez créer la nouvelle catégorie.",
					}),
				],
			})),
			(s[9] = N))
		: (N = s[9]);
	let d;
	s[10] !== i ||
	s[11] !== S ||
	s[12] !== n ||
	s[13] !== m ||
	s[14] !== o ||
	s[15] !== j
		? ((d = e.jsxs(ae, {
				className: "max-w-2xl",
				children: [
					N,
					e.jsx("div", {
						className: "space-y-4",
						children: n
							? e.jsx("div", {
									className: "text-center py-8",
									children: e.jsx("p", {
										className: "text-muted-foreground",
										children: "Chargement des sections...",
									}),
								})
							: j.length === 0
								? e.jsxs("div", {
										className: "text-center py-8",
										children: [
											e.jsx("div", {
												className:
													"p-4 bg-muted/30 rounded-full mb-4 w-fit mx-auto",
												children: e.jsx(T, {
													className: "h-8 w-8 text-muted-foreground",
												}),
											}),
											e.jsx("p", {
												className: "text-muted-foreground mb-4",
												children:
													"Aucune section disponible. Vous devez d'abord créer une section.",
											}),
											e.jsx(w, {
												onClick: () => {
													m({
														to: "/admin/dashboard/clubs/$clubId/sections/create",
														params: { clubId: i },
													}),
														o();
												},
												children: "Créer une section",
											}),
										],
									})
								: e.jsx("div", {
										className:
											"grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto",
										children: j.map((a) =>
											e.jsx(
												h,
												{
													className:
														"cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/20",
													onClick: () => S(a.id),
													children: e.jsxs(u, {
														className: "p-4",
														children: [
															e.jsxs("div", {
																className: "flex items-center gap-3 mb-2",
																children: [
																	e.jsx("div", {
																		className:
																			"w-3 h-3 rounded-full border border-primary/20",
																		style: {
																			backgroundColor: a.color || "#3b82f6",
																		},
																	}),
																	e.jsx(L, {
																		variant: "secondary",
																		className: "text-xs",
																		children: "Section",
																	}),
																],
															}),
															e.jsx("h3", {
																className: "font-semibold text-lg mb-1",
																children: a.name,
															}),
															e.jsx("p", {
																className:
																	"text-sm text-muted-foreground line-clamp-2",
																children: a.description || "Aucune description",
															}),
														],
													}),
												},
												a.id,
											),
										),
									}),
					}),
				],
			})),
			(s[10] = i),
			(s[11] = S),
			(s[12] = n),
			(s[13] = m),
			(s[14] = o),
			(s[15] = j),
			(s[16] = d))
		: (d = s[16]);
	let r;
	return (
		s[17] !== t || s[18] !== o || s[19] !== d
			? ((r = e.jsx(ne, { open: t, onOpenChange: o, children: d })),
				(s[17] = t),
				(s[18] = o),
				(s[19] = d),
				(s[20] = r))
			: (r = s[20]),
		r
	);
}
function ue(l) {
	return l.json();
}
function ge() {
	const { clubId: l } = q({
			from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/categories/",
		}),
		[s, t] = c.useState([]),
		[o, i] = c.useState([]),
		[m, p] = c.useState(!0),
		[j, C] = c.useState(!1),
		[n, f] = c.useState(null),
		[x, g] = c.useState(!1);
	c.useEffect(() => {
		(async () => {
			try {
				const a = await fetch(`/api/clubs/${l}/sections`).then((y) => {
					if (!y.ok) throw new Error("Erreur lors du chargement des sections");
					return y.json();
				});
				i(a);
				const v = [];
				for (const y of a) {
					const O = await fetch(
						`/api/clubs/${l}/sections/${y.id}/categories`,
					).then((I) => {
						if (!I.ok)
							throw new Error("Erreur lors du chargement des catégories");
						return I.json();
					});
					v.push(
						...O.map((I) => ({
							...I,
							sectionName: y.name,
							sectionColor: y.color,
						})),
					);
				}
				t(v);
			} catch (a) {
				console.error("Erreur:", a);
			} finally {
				p(!1);
			}
		})();
	}, [l]);
	const b = async () => {
			if (n) {
				g(!0);
				try {
					if (
						!(
							await fetch(
								`/api/clubs/${l}/sections/${n.sectionId}/categories/${n.id}`,
								{ method: "DELETE" },
							)
						).ok
					)
						throw new Error("Erreur lors de la suppression");
					t((a) => a.filter((v) => v.id !== n.id)),
						f(null),
						z.success("Catégorie supprimée avec succès");
				} catch (r) {
					console.error("Erreur lors de la suppression:", r),
						z.error("Erreur lors de la suppression de la catégorie");
				} finally {
					g(!1);
				}
			}
		},
		S = (r, a) =>
			r && a
				? `${r}-${a} ans`
				: r
					? `${r}+ ans`
					: a
						? `≤ ${a} ans`
						: "Non défini",
		N = o.length,
		d =
			s.length > 0
				? Math.round(
						s.reduce((r, a) => {
							const v = a.ageMin && a.ageMax ? (a.ageMin + a.ageMax) / 2 : 0;
							return r + v;
						}, 0) / s.filter((r) => r.ageMin && r.ageMax).length,
					)
				: 0;
	return m
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
									e.jsx(k, { className: "h-10 w-80" }),
									e.jsx(k, { className: "h-4 w-96" }),
								],
							}),
						}),
						e.jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-4 gap-4",
							children: Array.from({ length: 4 }).map(() =>
								e.jsx(k, { className: "h-20" }, crypto.randomUUID()),
							),
						}),
						e.jsxs(h, {
							children: [
								e.jsx(M, { children: e.jsx(k, { className: "h-6 w-48" }) }),
								e.jsx(u, {
									children: e.jsx("div", {
										className: "space-y-3",
										children: Array.from({ length: 8 }).map(() =>
											e.jsx(
												k,
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
													e.jsx(E, {
														to: "/admin/dashboard/clubs/$clubId",
														params: { clubId: l },
														className:
															"text-muted-foreground hover:text-foreground transition-colors",
														children: e.jsx(oe, { className: "h-6 w-6" }),
													}),
													e.jsxs("h1", {
														className:
															"text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3",
														children: [
															e.jsx($, { className: "h-8 w-8 text-primary" }),
															"Toutes les catégories",
														],
													}),
												],
											}),
											e.jsx("p", {
												className: "text-lg text-muted-foreground",
												children:
													"Vue d'ensemble de toutes les catégories d'âge du club",
											}),
										],
									}),
									e.jsxs(w, {
										onClick: () => C(!0),
										size: "lg",
										className:
											"w-full sm:w-auto cursor-pointer hover:cursor-pointer",
										children: [
											e.jsx(U, { className: "mr-2 h-5 w-5" }),
											"Ajouter une catégorie",
										],
									}),
								],
							}),
							e.jsxs("div", {
								className:
									"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
								children: [
									e.jsx(h, {
										className: "bg-primary/5 border-primary/20",
										children: e.jsx(u, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className: "p-2 bg-primary/10 rounded-lg",
														children: e.jsx($, {
															className: "h-5 w-5 text-primary",
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
																children: s.length,
															}),
														],
													}),
												],
											}),
										}),
									}),
									e.jsx(h, {
										className:
											"bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
										children: e.jsx(u, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className:
															"p-2 bg-blue-100 dark:bg-blue-900 rounded-lg",
														children: e.jsx(T, {
															className:
																"h-5 w-5 text-blue-600 dark:text-blue-400",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "Sections",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: N,
															}),
														],
													}),
												],
											}),
										}),
									}),
									e.jsx(h, {
										className:
											"bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
										children: e.jsx(u, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className:
															"p-2 bg-green-100 dark:bg-green-900 rounded-lg",
														children: e.jsx(ce, {
															className:
																"h-5 w-5 text-green-600 dark:text-green-400",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "Âge moyen",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: d > 0 ? `${d} ans` : "N/A",
															}),
														],
													}),
												],
											}),
										}),
									}),
									e.jsx(h, {
										className:
											"bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
										children: e.jsx(u, {
											className: "p-4",
											children: e.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													e.jsx("div", {
														className:
															"p-2 bg-orange-100 dark:bg-orange-900 rounded-lg",
														children: e.jsx(xe, {
															className:
																"h-5 w-5 text-orange-600 dark:text-orange-400",
														}),
													}),
													e.jsxs("div", {
														children: [
															e.jsx("p", {
																className:
																	"text-sm font-medium text-muted-foreground",
																children: "Avec âge défini",
															}),
															e.jsx("p", {
																className: "text-2xl font-bold",
																children: s.filter((r) => r.ageMin || r.ageMax)
																	.length,
															}),
														],
													}),
												],
											}),
										}),
									}),
								],
							}),
							s.length === 0
								? e.jsx(h, {
										className:
											"border-dashed border-2 border-muted-foreground/25",
										children: e.jsxs(u, {
											className:
												"flex flex-col items-center justify-center py-16 text-center",
											children: [
												e.jsx("div", {
													className: "p-4 bg-muted/30 rounded-full mb-4",
													children: e.jsx($, {
														className: "h-12 w-12 text-muted-foreground",
													}),
												}),
												e.jsx("h3", {
													className: "text-xl font-semibold mb-2",
													children: "Aucune catégorie créée",
												}),
												e.jsx("p", {
													className: "text-muted-foreground mb-6 max-w-md",
													children:
														"Les catégories apparaîtront ici une fois qu'elles seront créées dans les sections.",
												}),
												e.jsxs("div", {
													className: "flex flex-col sm:flex-row gap-3",
													children: [
														e.jsxs(w, {
															onClick: () => C(!0),
															className: "cursor-pointer hover:cursor-pointer",
															size: "lg",
															children: [
																e.jsx(U, { className: "mr-2 h-5 w-5" }),
																"Créer une catégorie",
															],
														}),
														e.jsx(w, {
															variant: "outline",
															size: "lg",
															asChild: !0,
															children: e.jsxs(E, {
																to: "/admin/dashboard/clubs/$clubId/sections",
																params: { clubId: l },
																children: [
																	e.jsx(T, { className: "mr-2 h-5 w-5" }),
																	"Voir les sections",
																],
															}),
														}),
													],
												}),
											],
										}),
									})
								: e.jsxs(h, {
										children: [
											e.jsxs(M, {
												children: [
													e.jsxs(F, {
														className: "flex items-center gap-2",
														children: [
															e.jsx($, { className: "h-5 w-5" }),
															"Liste des catégories (",
															s.length,
															")",
														],
													}),
													e.jsx(V, {
														children:
															"Toutes les catégories d'âge organisées par section",
													}),
												],
											}),
											e.jsx(u, {
												children: e.jsx("div", {
													className: "rounded-md border",
													children: e.jsxs(ee, {
														children: [
															e.jsx(se, {
																children: e.jsxs(H, {
																	children: [
																		e.jsx(A, {
																			className: "font-semibold",
																			children: "Nom",
																		}),
																		e.jsx(A, {
																			className: "font-semibold",
																			children: "Section",
																		}),
																		e.jsx(A, {
																			className: "font-semibold",
																			children: "Tranche d'âge",
																		}),
																		e.jsx(A, {
																			className: "font-semibold",
																			children: "Description",
																		}),
																		e.jsx(A, {
																			className: "font-semibold text-right",
																			children: "Actions",
																		}),
																	],
																}),
															}),
															e.jsx(re, {
																children: s.map((r) =>
																	e.jsxs(
																		H,
																		{
																			className:
																				"hover:bg-muted/30 transition-colors",
																			children: [
																				e.jsx(D, {
																					className: "font-medium",
																					children: e.jsxs("div", {
																						className:
																							"flex items-center gap-2",
																						children: [
																							e.jsx($, {
																								className:
																									"h-4 w-4 text-muted-foreground",
																							}),
																							r.name,
																						],
																					}),
																				}),
																				e.jsx(D, {
																					children: e.jsxs("div", {
																						className:
																							"flex items-center gap-2",
																						children: [
																							e.jsx("div", {
																								className:
																									"w-3 h-3 rounded-full border border-primary/20",
																								style: {
																									backgroundColor:
																										r.sectionColor || "#3b82f6",
																								},
																							}),
																							e.jsx(L, {
																								variant: "secondary",
																								className: "text-xs",
																								children: r.sectionName,
																							}),
																						],
																					}),
																				}),
																				e.jsx(D, {
																					children: e.jsx(L, {
																						variant: "outline",
																						className: "text-xs",
																						children: S(r.ageMin, r.ageMax),
																					}),
																				}),
																				e.jsx(D, {
																					className: "max-w-xs",
																					children: e.jsx("p", {
																						className:
																							"text-sm text-muted-foreground line-clamp-2",
																						children:
																							r.description ||
																							"Aucune description",
																					}),
																				}),
																				e.jsx(D, {
																					className: "text-right",
																					children: e.jsxs("div", {
																						className:
																							"flex items-center justify-end gap-2",
																						children: [
																							e.jsx(w, {
																								variant: "ghost",
																								size: "sm",
																								className:
																									"h-8 px-3 hover:bg-primary/10 hover:text-primary",
																								asChild: !0,
																								children: e.jsxs(E, {
																									to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
																									params: {
																										clubId: l,
																										sectionId: r.sectionId,
																										categoryId: r.id,
																									},
																									children: [
																										e.jsx(de, {
																											className: "h-4 w-4 mr-1",
																										}),
																										"Modifier",
																									],
																								}),
																							}),
																							e.jsxs(w, {
																								variant: "ghost",
																								size: "sm",
																								className:
																									"h-8 px-3 hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive",
																								onClick: () => f(r),
																								children: [
																									e.jsx(G, {
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
																		r.id,
																	),
																),
															}),
														],
													}),
												}),
											}),
										],
									}),
						],
					}),
					e.jsx(he, { isOpen: j, onClose: () => C(!1), clubId: l }),
					e.jsx(J, {
						open: !!n,
						onOpenChange: () => f(null),
						children: e.jsxs(K, {
							children: [
								e.jsxs(Q, {
									children: [
										e.jsx(W, { children: "Supprimer la catégorie" }),
										e.jsxs(X, {
											children: [
												'Êtes-vous sûr de vouloir supprimer la catégorie "',
												n == null ? void 0 : n.name,
												'" ? Cette action est irréversible et supprimera également toutes les sessions associées.',
											],
										}),
									],
								}),
								e.jsxs(Y, {
									children: [
										e.jsx(Z, { disabled: x, children: "Annuler" }),
										e.jsx(_, {
											onClick: b,
											disabled: x,
											className:
												"bg-destructive text-destructive-foreground hover:bg-destructive/90",
											children: x ? "Suppression..." : "Supprimer",
										}),
									],
								}),
							],
						}),
					}),
				],
			});
}
const Ue = () => {
	const s = B.c(1);
	let t;
	return (
		s[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = e.jsx(ge, {})), (s[0] = t))
			: (t = s[0]),
		t
	);
};
export { Ue as component };
