import { A as N } from "./arrow-right-B27wBNPJ.js";
import { B as j } from "./badge-BAidKpPB.js";
import { B as w } from "./building-2-C_wvjtu2.js";
import { C as F } from "./calendar-De7tcxsN.js";
import { F as L } from "./folder-open-Bjf3vPky.js";
import {
	C as A,
	b as I,
	d as M,
	c as P,
	e as b,
	r as c,
	j as e,
	f,
	L as g,
	t as m,
	B as y,
} from "./index-kb-Ylywn.js";
import { M as T } from "./mail--zklVbGT.js";
import { M as B } from "./map-pin-DywQhs4x.js";
import { P as G, G as O } from "./phone-BY2bep43.js";
import { P as z } from "./plus-czqh0ZLb.js";
import { S as R } from "./settings-CM_XdmzG.js";
import { S as x } from "./skeleton-C4Qqz043.js";
import { S as $ } from "./square-pen-s7PUkmhH.js";
import { U } from "./users-BMY-28E4.js";
function H({ initialData: r = [], autoLoad: u = !0 } = {}) {
	const [v, s] = c.useState(r),
		[h, d] = c.useState(u),
		[p, o] = c.useState(null),
		n = c.useCallback(async () => {
			d(!0), o(null);
			try {
				const i = await fetch("/api/clubs");
				if (!i.ok)
					throw new Error("Erreur lors du chargement des associations");
				const a = await i.json();
				s(a);
			} catch (i) {
				const a = i instanceof Error ? i.message : "Erreur inconnue";
				o(a), m.error(a);
			} finally {
				d(!1);
			}
		}, []);
	c.useEffect(() => {
		u && r.length === 0 && n();
	}, [u, r.length, n]);
	const C = c.useCallback(async (i) => {
			o(null);
			try {
				const a = await fetch("/api/clubs", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(i),
				});
				if (!a.ok)
					throw new Error("Erreur lors de la création de l'association");
				const t = await a.json();
				return (
					s((l) => [...l, t]), m.success("Association créée avec succès"), t
				);
			} catch (a) {
				const t = a instanceof Error ? a.message : "Erreur lors de la création";
				return o(t), m.error(t), null;
			}
		}, []),
		E = c.useCallback(async (i, a) => {
			o(null);
			try {
				const t = await fetch(`/api/clubs/${i}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(a),
				});
				if (!t.ok)
					throw new Error("Erreur lors de la modification de l'association");
				const l = await t.json();
				return (
					s((_) => _.map((k) => (k.id === i ? l : k))),
					m.success("Association modifiée avec succès"),
					l
				);
			} catch (t) {
				const l =
					t instanceof Error ? t.message : "Erreur lors de la modification";
				return o(l), m.error(l), null;
			}
		}, []),
		S = c.useCallback(async (i) => {
			o(null);
			try {
				if (!(await fetch(`/api/clubs/${i}`, { method: "DELETE" })).ok)
					throw new Error("Erreur lors de la suppression de l'association");
				return (
					s((t) => t.filter((l) => l.id !== i)),
					m.success("Association supprimée avec succès"),
					!0
				);
			} catch (a) {
				const t =
					a instanceof Error ? a.message : "Erreur lors de la suppression";
				return o(t), m.error(t), !1;
			}
		}, []);
	return {
		clubs: v,
		loading: h,
		error: p,
		createClub: C,
		updateClub: E,
		deleteClub: S,
		refresh: n,
	};
}
function J() {
	const r = P.c(6),
		{ clubs: u, loading: v } = H(),
		s = u.length > 0 ? u[0] : null;
	if (v) {
		let p;
		r[0] === Symbol.for("react.memo_cache_sentinel")
			? ((p = e.jsxs("div", {
					className: "flex items-center justify-between",
					children: [
						e.jsxs("div", {
							className: "space-y-2",
							children: [
								e.jsx(x, { className: "h-10 w-80" }),
								e.jsx(x, { className: "h-4 w-96" }),
							],
						}),
						e.jsx(x, { className: "h-10 w-40" }),
					],
				})),
				(r[0] = p))
			: (p = r[0]);
		let o;
		r[1] === Symbol.for("react.memo_cache_sentinel")
			? ((o = e.jsx(x, { className: "h-96" })), (r[1] = o))
			: (o = r[1]);
		let n;
		return (
			r[2] === Symbol.for("react.memo_cache_sentinel")
				? ((n = e.jsx("div", {
						className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
						children: e.jsxs("div", {
							className: "space-y-6",
							children: [
								p,
								e.jsxs("div", {
									className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
									children: [
										o,
										e.jsxs("div", {
											className: "space-y-4",
											children: [
												e.jsx(x, { className: "h-32" }),
												e.jsx(x, { className: "h-32" }),
												e.jsx(x, { className: "h-32" }),
											],
										}),
									],
								}),
							],
						}),
					})),
					(r[2] = n))
				: (n = r[2]),
			n
		);
	}
	let h;
	r[3] === Symbol.for("react.memo_cache_sentinel")
		? ((h = e.jsx("div", {
				className:
					"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: e.jsxs("div", {
					className: "space-y-2",
					children: [
						e.jsx("h1", {
							className:
								"text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3",
							children: "Mon Association",
						}),
						e.jsx("p", {
							className: "text-lg text-muted-foreground",
							children: "Gérez l'Association Sportive de Pierrefitte-sur-Seine",
						}),
					],
				}),
			})),
			(r[3] = h))
		: (h = r[3]);
	let d;
	return (
		r[4] !== s
			? ((d = e.jsx("div", {
					className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
					children: e.jsxs("div", {
						className: "space-y-6",
						children: [
							h,
							s
								? e.jsxs("div", {
										className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
										children: [
											e.jsxs(b, {
												className:
													"shadow-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden",
												children: [
													e.jsxs(A, {
														className: "space-y-4 pb-6",
														children: [
															e.jsxs("div", {
																className: "flex items-center justify-between",
																children: [
																	e.jsxs("div", {
																		className: "flex items-center gap-3",
																		children: [
																			e.jsx("div", {
																				className:
																					"p-3 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl shadow-sm",
																				children: e.jsx(w, {
																					className: "h-8 w-8 text-primary",
																				}),
																			}),
																			e.jsx(j, {
																				variant: "secondary",
																				className:
																					"bg-primary/15 text-primary border-primary/30 font-medium px-3 py-1",
																				children: "Association Principale",
																			}),
																		],
																	}),
																	e.jsx(y, {
																		variant: "ghost",
																		size: "sm",
																		className:
																			"text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200",
																		asChild: !0,
																		children: e.jsx(g, {
																			to: "/admin/dashboard/clubs/$clubId/edit",
																			params: { clubId: s.id },
																			children: e.jsx($, {
																				className: "h-4 w-4",
																			}),
																		}),
																	}),
																],
															}),
															e.jsxs("div", {
																className: "space-y-3",
																children: [
																	e.jsx(I, {
																		className:
																			"text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
																		children: s.name,
																	}),
																	s.description &&
																		e.jsx(M, {
																			className:
																				"text-base leading-relaxed text-muted-foreground/90",
																			children: s.description,
																		}),
																],
															}),
														],
													}),
													e.jsxs(f, {
														className: "space-y-6",
														children: [
															e.jsxs("div", {
																className: "space-y-5",
																children: [
																	e.jsxs("div", {
																		className: "space-y-2",
																		children: [
																			e.jsx("div", {
																				className:
																					"h-1 w-8 bg-gradient-to-r from-primary to-primary/60 rounded-full",
																			}),
																			e.jsx("h4", {
																				className:
																					"font-semibold text-foreground uppercase tracking-wide text-sm",
																				children: "Informations de contact",
																			}),
																		],
																	}),
																	e.jsxs("div", {
																		className: "grid gap-4",
																		children: [
																			s.address &&
																				e.jsxs("div", {
																					className:
																						"flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors",
																					children: [
																						e.jsx("div", {
																							className:
																								"p-2 bg-background rounded-lg shadow-sm",
																							children: e.jsx(B, {
																								className:
																									"h-4 w-4 text-primary",
																							}),
																						}),
																						e.jsxs("div", {
																							className: "flex-1 min-w-0",
																							children: [
																								e.jsx("p", {
																									className:
																										"text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1",
																									children: "Adresse",
																								}),
																								e.jsx("p", {
																									className:
																										"text-sm font-medium text-foreground leading-relaxed",
																									children: s.address,
																								}),
																							],
																						}),
																					],
																				}),
																			s.email &&
																				e.jsxs("div", {
																					className:
																						"flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors",
																					children: [
																						e.jsx("div", {
																							className:
																								"p-2 bg-background rounded-lg shadow-sm",
																							children: e.jsx(T, {
																								className:
																									"h-4 w-4 text-primary",
																							}),
																						}),
																						e.jsxs("div", {
																							className: "flex-1 min-w-0",
																							children: [
																								e.jsx("p", {
																									className:
																										"text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1",
																									children: "Email",
																								}),
																								e.jsx(j, {
																									variant: "outline",
																									className:
																										"text-xs bg-background border-primary/20 text-primary",
																									children: s.email,
																								}),
																							],
																						}),
																					],
																				}),
																			s.phone &&
																				e.jsxs("div", {
																					className:
																						"flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors",
																					children: [
																						e.jsx("div", {
																							className:
																								"p-2 bg-background rounded-lg shadow-sm",
																							children: e.jsx(G, {
																								className:
																									"h-4 w-4 text-primary",
																							}),
																						}),
																						e.jsxs("div", {
																							className: "flex-1 min-w-0",
																							children: [
																								e.jsx("p", {
																									className:
																										"text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1",
																									children: "Téléphone",
																								}),
																								e.jsx(j, {
																									variant: "outline",
																									className:
																										"text-xs bg-background border-primary/20 text-primary",
																									children: s.phone,
																								}),
																							],
																						}),
																					],
																				}),
																			s.website &&
																				e.jsxs("div", {
																					className:
																						"flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors",
																					children: [
																						e.jsx("div", {
																							className:
																								"p-2 bg-background rounded-lg shadow-sm",
																							children: e.jsx(O, {
																								className:
																									"h-4 w-4 text-primary",
																							}),
																						}),
																						e.jsxs("div", {
																							className: "flex-1 min-w-0",
																							children: [
																								e.jsx("p", {
																									className:
																										"text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1",
																									children: "Site web",
																								}),
																								e.jsx("a", {
																									href: s.website,
																									target: "_blank",
																									rel: "noopener noreferrer",
																									className: "inline-block",
																									children: e.jsx(j, {
																										variant: "outline",
																										className:
																											"text-xs bg-background border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 cursor-pointer",
																										children: s.website,
																									}),
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
																className: "pt-6 border-t border-primary/20",
																children: e.jsx(y, {
																	size: "lg",
																	className:
																		"w-full text-lg py-6 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
																	asChild: !0,
																	children: e.jsxs(g, {
																		to: "/admin/dashboard/clubs/$clubId",
																		params: { clubId: s.id },
																		className: "block",
																		children: [
																			e.jsx(w, { className: "mr-3 h-6 w-6" }),
																			"Gérer mon association",
																			e.jsx(N, {
																				className:
																					"ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform",
																			}),
																		],
																	}),
																}),
															}),
														],
													}),
												],
											}),
											e.jsxs("div", {
												className: "space-y-6",
												children: [
													e.jsxs("div", {
														children: [
															e.jsxs("h3", {
																className:
																	"text-xl font-semibold mb-4 flex items-center gap-2",
																children: [
																	e.jsx(R, {
																		className: "h-5 w-5 text-primary",
																	}),
																	"Raccourcis - Actions rapides",
																],
															}),
															e.jsx("p", {
																className: "text-muted-foreground text-sm mb-6",
																children:
																	"Accédez directement aux fonctionnalités principales de gestion.",
															}),
														],
													}),
													e.jsxs("div", {
														className: "space-y-4",
														children: [
															e.jsx(g, {
																to: "/admin/dashboard/clubs/$clubId/sections",
																params: { clubId: s.id },
																children: e.jsx(b, {
																	className:
																		"group hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer",
																	children: e.jsx(f, {
																		className: "p-4",
																		children: e.jsxs("div", {
																			className: "flex items-center gap-4",
																			children: [
																				e.jsx("div", {
																					className:
																						"p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors",
																					children: e.jsx(L, {
																						className:
																							"h-5 w-5 text-blue-600 dark:text-blue-400",
																					}),
																				}),
																				e.jsxs("div", {
																					className: "flex-1",
																					children: [
																						e.jsx("h4", {
																							className:
																								"font-medium group-hover:text-primary transition-colors",
																							children: "Gérer les sections",
																						}),
																						e.jsx("p", {
																							className:
																								"text-sm text-muted-foreground",
																							children:
																								"Organisez vos sections sportives",
																						}),
																					],
																				}),
																				e.jsx(N, {
																					className:
																						"h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all",
																				}),
																			],
																		}),
																	}),
																}),
															}),
															e.jsx(g, {
																to: "/admin/dashboard/clubs/$clubId/categories",
																params: { clubId: s.id },
																children: e.jsx(b, {
																	className:
																		"group hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer",
																	children: e.jsx(f, {
																		className: "p-4",
																		children: e.jsxs("div", {
																			className: "flex items-center gap-4",
																			children: [
																				e.jsx("div", {
																					className:
																						"p-2 bg-green-100 dark:bg-green-900 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors",
																					children: e.jsx(U, {
																						className:
																							"h-5 w-5 text-green-600 dark:text-green-400",
																					}),
																				}),
																				e.jsxs("div", {
																					className: "flex-1",
																					children: [
																						e.jsx("h4", {
																							className:
																								"font-medium group-hover:text-primary transition-colors",
																							children:
																								"Voir toutes les catégories",
																						}),
																						e.jsx("p", {
																							className:
																								"text-sm text-muted-foreground",
																							children:
																								"Vue d'ensemble des catégories d'âge",
																						}),
																					],
																				}),
																				e.jsx(N, {
																					className:
																						"h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all",
																				}),
																			],
																		}),
																	}),
																}),
															}),
															e.jsx(g, {
																to: "/admin/dashboard/clubs/$clubId/sessions",
																params: { clubId: s.id },
																children: e.jsx(b, {
																	className:
																		"group hover:shadow-md transition-all duration-200 hover:border-primary/20 cursor-pointer",
																	children: e.jsx(f, {
																		className: "p-4",
																		children: e.jsxs("div", {
																			className: "flex items-center gap-4",
																			children: [
																				e.jsx("div", {
																					className:
																						"p-2 bg-orange-100 dark:bg-orange-900 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors",
																					children: e.jsx(F, {
																						className:
																							"h-5 w-5 text-orange-600 dark:text-orange-400",
																					}),
																				}),
																				e.jsxs("div", {
																					className: "flex-1",
																					children: [
																						e.jsx("h4", {
																							className:
																								"font-medium group-hover:text-primary transition-colors",
																							children: "Gérer les sessions",
																						}),
																						e.jsx("p", {
																							className:
																								"text-sm text-muted-foreground",
																							children:
																								"Planifiez entraînements et matchs",
																						}),
																					],
																				}),
																				e.jsx(N, {
																					className:
																						"h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all",
																				}),
																			],
																		}),
																	}),
																}),
															}),
														],
													}),
												],
											}),
										],
									})
								: e.jsx(b, {
										className:
											"border-dashed border-2 border-muted-foreground/25",
										children: e.jsxs(f, {
											className:
												"flex flex-col items-center justify-center py-16 text-center",
											children: [
												e.jsx("div", {
													className: "p-6 bg-primary/10 rounded-full mb-6",
													children: e.jsx(w, {
														className: "h-16 w-16 text-primary",
													}),
												}),
												e.jsx("h3", {
													className: "text-2xl font-semibold mb-3",
													children: "Bienvenue sur ASP Hub",
												}),
												e.jsx("p", {
													className:
														"text-muted-foreground mb-8 max-w-md text-lg",
													children:
														"Commencez par créer votre association sportive pour accéder à tous les outils de gestion.",
												}),
												e.jsx(y, {
													size: "lg",
													className: "text-lg px-8 py-3",
													asChild: !0,
													children: e.jsxs(g, {
														to: "/admin/dashboard/clubs/create",
														children: [
															e.jsx(z, { className: "mr-3 h-6 w-6" }),
															"Créer mon association",
														],
													}),
												}),
											],
										}),
									}),
						],
					}),
				})),
				(r[4] = s),
				(r[5] = d))
			: (d = r[5]),
		d
	);
}
const oe = J;
export { oe as component };
