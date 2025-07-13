import {
	d as Ne,
	f as be,
	A as fe,
	c as ge,
	b as je,
	a as pe,
	T as ue,
	e as ve,
	g as we,
} from "./alert-dialog-BJAnlKbe.js";
import { B as $ } from "./badge-BAidKpPB.js";
import { C as Ae } from "./calendar-De7tcxsN.js";
import { E as De } from "./eye-D8N8bRfa.js";
import { F as te } from "./file-text-Dzq0McNO.js";
import {
	B as E,
	L as U,
	c as ae,
	f as d,
	J as he,
	r as le,
	e as o,
	j as t,
} from "./index-kb-Ylywn.js";
import { I as ye } from "./input-CdkcPZS3.js";
import { P as re } from "./plus-czqh0ZLb.js";
import { S as Be } from "./search-CT8NOJQT.js";
import { S as Pe } from "./square-pen-s7PUkmhH.js";
import { u as Ce, a as Se } from "./useBlogQueries-VhutstJQ.js";
import "./index-DauBq6FI.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
import "./useQuery-DObI4S3_.js";
function Te(l) {
	const e = ae.c(74),
		{ blogs: m } = l,
		[a, V] = le.useState(null),
		[i, ne] = le.useState(""),
		{ data: W, isLoading: ie, error: ce } = Ce(),
		n = Se();
	let z;
	e[0] !== m || e[1] !== W
		? ((z = W || m || []), (e[0] = m), (e[1] = W), (e[2] = z))
		: (z = e[2]);
	const r = z;
	let X;
	e: {
		if (!i.trim()) {
			X = r;
			break e;
		}
		let s;
		if (e[3] !== r || e[4] !== i) {
			const x = i.toLowerCase();
			(s = r.filter((_) => {
				var se;
				return (
					_.title.toLowerCase().includes(x) ||
					_.content.toLowerCase().includes(x) ||
					((se = _.tags) == null
						? void 0
						: se.some((xe) => xe.name.toLowerCase().includes(x)))
				);
			})),
				(e[3] = r),
				(e[4] = i),
				(e[5] = s);
		} else s = e[5];
		X = s;
	}
	const c = X;
	let I;
	e[6] !== a || e[7] !== n
		? ((I = async () => {
				if (a)
					try {
						await n.mutateAsync(a.id), V(null);
					} catch (s) {
						console.error(s);
					}
			}),
			(e[6] = a),
			(e[7] = n),
			(e[8] = I))
		: (I = e[8]);
	const Y = I,
		me = ke,
		oe = Re,
		de = Ie;
	if (ce) {
		let s;
		return (
			e[9] === Symbol.for("react.memo_cache_sentinel")
				? ((s = t.jsx("div", {
						className: "container mx-auto p-4 space-y-6",
						children: t.jsx(o, {
							children: t.jsxs(d, {
								className: "p-12 text-center",
								children: [
									t.jsx("div", {
										className: "text-red-500 text-5xl mb-4",
										children: "⚠️",
									}),
									t.jsx("h3", {
										className: "text-xl font-semibold mb-2",
										children: "Erreur de chargement",
									}),
									t.jsx("p", {
										className: "text-muted-foreground mb-4",
										children: "Impossible de charger les articles de blog.",
									}),
									t.jsx(E, { onClick: ze, children: "Réessayer" }),
								],
							}),
						}),
					})),
					(e[9] = s))
				: (s = e[9]),
			s
		);
	}
	if (ie && !m) {
		let s;
		return (
			e[10] === Symbol.for("react.memo_cache_sentinel")
				? ((s = t.jsx("div", {
						className: "flex items-center justify-center min-h-[400px]",
						children: t.jsxs("div", {
							className: "text-center",
							children: [
								t.jsx("div", {
									className:
										"animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4",
								}),
								t.jsx("p", {
									className: "text-muted-foreground",
									children: "Chargement des articles...",
								}),
							],
						}),
					})),
					(e[10] = s))
				: (s = e[10]),
			s
		);
	}
	let R;
	e[11] === Symbol.for("react.memo_cache_sentinel")
		? ((R = t.jsxs("div", {
				children: [
					t.jsxs("h1", {
						className: "text-3xl font-bold flex items-center gap-2",
						children: [
							t.jsx(te, { className: "h-8 w-8 text-primary" }),
							"Articles de blog",
						],
					}),
					t.jsx("p", {
						className: "text-muted-foreground mt-1",
						children: "Gérez tous vos articles de blog depuis cette interface",
					}),
				],
			})),
			(e[11] = R))
		: (R = e[11]);
	let k;
	e[12] === Symbol.for("react.memo_cache_sentinel")
		? ((k = t.jsxs("div", {
				className:
					"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [
					R,
					t.jsx(U, {
						to: "/admin/blog/create",
						children: t.jsxs(E, {
							size: "lg",
							className: "gap-2",
							children: [
								t.jsx(re, { className: "h-5 w-5" }),
								"Créer un article",
							],
						}),
					}),
				],
			})),
			(e[12] = k))
		: (k = e[12]);
	let F;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((F = t.jsx(Be, {
				className:
					"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4",
			})),
			(e[13] = F))
		: (F = e[13]);
	let H;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((H = (s) => ne(s.target.value)), (e[14] = H))
		: (H = e[14]);
	let h;
	e[15] !== i
		? ((h = t.jsxs("div", {
				className: "relative w-full",
				children: [
					F,
					t.jsx(ye, {
						type: "text",
						placeholder: "Rechercher un article...",
						value: i,
						onChange: H,
						className: "pl-10 w-full",
					}),
				],
			})),
			(e[15] = i),
			(e[16] = h))
		: (h = e[16]);
	let u;
	e[17] !== c.length || e[18] !== i
		? ((u =
				i &&
				t.jsxs("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: [
						c.length,
						" article",
						c.length > 1 ? "s" : "",
						" trouvé",
						c.length > 1 ? "s" : "",
						' pour "',
						i,
						'"',
					],
				})),
			(e[17] = c.length),
			(e[18] = i),
			(e[19] = u))
		: (u = e[19]);
	let f;
	e[20] !== h || e[21] !== u
		? ((f = t.jsx(o, {
				children: t.jsxs(d, { className: "p-6", children: [h, u] }),
			})),
			(e[20] = h),
			(e[21] = u),
			(e[22] = f))
		: (f = e[22]);
	let q;
	e[23] === Symbol.for("react.memo_cache_sentinel")
		? ((q = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					t.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
					t.jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "Publiés",
					}),
				],
			})),
			(e[23] = q))
		: (q = e[23]);
	let p;
	e[24] !== r ? ((p = r.filter($e)), (e[24] = r), (e[25] = p)) : (p = e[25]);
	let j;
	e[26] !== p.length
		? ((j = t.jsx(o, {
				children: t.jsxs(d, {
					className: "p-4",
					children: [
						q,
						t.jsx("p", {
							className: "text-2xl font-bold mt-1",
							children: p.length,
						}),
					],
				}),
			})),
			(e[26] = p.length),
			(e[27] = j))
		: (j = e[27]);
	let M;
	e[28] === Symbol.for("react.memo_cache_sentinel")
		? ((M = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					t.jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }),
					t.jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "Brouillons",
					}),
				],
			})),
			(e[28] = M))
		: (M = e[28]);
	let g;
	e[29] !== r ? ((g = r.filter(Ee)), (e[29] = r), (e[30] = g)) : (g = e[30]);
	let N;
	e[31] !== g.length
		? ((N = t.jsx(o, {
				children: t.jsxs(d, {
					className: "p-4",
					children: [
						M,
						t.jsx("p", {
							className: "text-2xl font-bold mt-1",
							children: g.length,
						}),
					],
				}),
			})),
			(e[31] = g.length),
			(e[32] = N))
		: (N = e[32]);
	let G;
	e[33] === Symbol.for("react.memo_cache_sentinel")
		? ((G = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					t.jsx("div", { className: "w-2 h-2 rounded-full bg-yellow-500" }),
					t.jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "Archivés",
					}),
				],
			})),
			(e[33] = G))
		: (G = e[33]);
	let v;
	e[34] !== r ? ((v = r.filter(_e)), (e[34] = r), (e[35] = v)) : (v = e[35]);
	let b;
	e[36] !== v.length
		? ((b = t.jsx(o, {
				children: t.jsxs(d, {
					className: "p-4",
					children: [
						G,
						t.jsx("p", {
							className: "text-2xl font-bold mt-1",
							children: v.length,
						}),
					],
				}),
			})),
			(e[36] = v.length),
			(e[37] = b))
		: (b = e[37]);
	let J;
	e[38] === Symbol.for("react.memo_cache_sentinel")
		? ((J = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					t.jsx(te, { className: "w-4 h-4 text-muted-foreground" }),
					t.jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "Total",
					}),
				],
			})),
			(e[38] = J))
		: (J = e[38]);
	let w;
	e[39] !== r.length
		? ((w = t.jsx(o, {
				children: t.jsxs(d, {
					className: "p-4",
					children: [
						J,
						t.jsx("p", {
							className: "text-2xl font-bold mt-1",
							children: r.length,
						}),
					],
				}),
			})),
			(e[39] = r.length),
			(e[40] = w))
		: (w = e[40]);
	let y;
	e[41] !== j || e[42] !== N || e[43] !== b || e[44] !== w
		? ((y = t.jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-4",
				children: [j, N, b, w],
			})),
			(e[41] = j),
			(e[42] = N),
			(e[43] = b),
			(e[44] = w),
			(e[45] = y))
		: (y = e[45]);
	let C;
	e[46] !== c
		? ((C =
				c.length === 0
					? t.jsx(o, {
							children: t.jsxs(d, {
								className: "p-12 text-center",
								children: [
									t.jsx(te, {
										className: "h-16 w-16 text-muted-foreground mx-auto mb-4",
									}),
									t.jsx("h3", {
										className: "text-xl font-semibold mb-2",
										children: "Aucun article",
									}),
									t.jsx("p", {
										className: "text-muted-foreground mb-6 max-w-md mx-auto",
										children:
											"Commencez par créer votre premier article de blog pour partager vos actualités avec votre communauté.",
									}),
									t.jsx(U, {
										to: "/admin/blog/create",
										children: t.jsxs(E, {
											size: "lg",
											className: "gap-2",
											children: [
												t.jsx(re, { className: "h-5 w-5" }),
												"Créer un article",
											],
										}),
									}),
								],
							}),
						})
					: t.jsx(o, {
							children: t.jsx(d, {
								className: "p-0",
								children: t.jsx("div", {
									className: "overflow-x-auto",
									children: t.jsxs("table", {
										className: "w-full",
										children: [
											t.jsx("thead", {
												children: t.jsxs("tr", {
													className: "border-b bg-muted/50",
													children: [
														t.jsx("th", {
															className: "text-left p-4 font-medium",
															children: "Titre",
														}),
														t.jsx("th", {
															className: "text-left p-4 font-medium",
															children: "Auteur",
														}),
														t.jsx("th", {
															className: "text-left p-4 font-medium",
															children: "État",
														}),
														t.jsx("th", {
															className: "text-left p-4 font-medium",
															children: "Date",
														}),
														t.jsx("th", {
															className: "text-left p-4 font-medium",
															children: "Tags",
														}),
														t.jsx("th", {
															className: "text-left p-4 font-medium",
															children: "Commentaires",
														}),
														t.jsx("th", {
															className: "text-right p-4 font-medium",
															children: "Actions",
														}),
													],
												}),
											}),
											t.jsx("tbody", {
												children: c.map((s) => {
													var x, _;
													return t.jsxs(
														"tr",
														{
															className:
																"border-b hover:bg-muted/20 transition-colors",
															children: [
																t.jsx("td", {
																	className: "p-4",
																	children: t.jsxs("div", {
																		children: [
																			t.jsx("p", {
																				className: "font-medium line-clamp-1",
																				children: s.title,
																			}),
																			t.jsxs("p", {
																				className:
																					"text-sm text-muted-foreground line-clamp-1",
																				children: [
																					de(s.content).substring(0, 80),
																					"...",
																				],
																			}),
																		],
																	}),
																}),
																t.jsx("td", {
																	className: "p-4",
																	children: t.jsxs("div", {
																		className: "flex items-center gap-2",
																		children: [
																			((x = s.author) == null
																				? void 0
																				: x.image) &&
																				t.jsx("img", {
																					src: s.author.image,
																					alt: `${s.author.firstName} ${s.author.lastName}`,
																					className:
																						"w-8 h-8 rounded-full object-cover",
																				}),
																			t.jsxs("div", {
																				children: [
																					t.jsx("p", {
																						className: "text-sm font-medium",
																						children: s.author
																							? `${s.author.firstName} ${s.author.lastName}`
																							: "Auteur inconnu",
																					}),
																					t.jsx("p", {
																						className:
																							"text-xs text-muted-foreground",
																						children:
																							((_ = s.author) == null
																								? void 0
																								: _.name) || "",
																					}),
																				],
																			}),
																		],
																	}),
																}),
																t.jsx("td", {
																	className: "p-4",
																	children: me(s.state),
																}),
																t.jsx("td", {
																	className: "p-4",
																	children: t.jsxs("div", {
																		className:
																			"flex items-center gap-1 text-sm text-muted-foreground",
																		children: [
																			t.jsx(Ae, { className: "h-3 w-3" }),
																			oe(s.createdAt),
																		],
																	}),
																}),
																t.jsx("td", {
																	className: "p-4",
																	children: t.jsxs("div", {
																		className: "flex flex-wrap gap-1",
																		children: [
																			s.tags && s.tags.length > 0
																				? s.tags.slice(0, 2).map(Le)
																				: t.jsx("span", {
																						className:
																							"text-xs text-muted-foreground",
																						children: "Aucun",
																					}),
																			s.tags &&
																				s.tags.length > 2 &&
																				t.jsxs($, {
																					variant: "outline",
																					className: "text-xs",
																					children: ["+", s.tags.length - 2],
																				}),
																		],
																	}),
																}),
																t.jsx("td", {
																	className: "p-4",
																	children: t.jsxs("div", {
																		className:
																			"flex items-center gap-1 text-sm",
																		children: [
																			s.commentsEnabled ? "💬" : "🚫",
																			t.jsx("span", {
																				className: "text-muted-foreground",
																				children: s.commentsEnabled
																					? "Activés"
																					: "Désactivés",
																			}),
																		],
																	}),
																}),
																t.jsx("td", {
																	className: "p-4",
																	children: t.jsxs("div", {
																		className:
																			"flex items-center gap-1 justify-end",
																		children: [
																			t.jsx(U, {
																				to: "/admin/blog/$blogId",
																				params: { blogId: s.id },
																				children: t.jsx(E, {
																					variant: "ghost",
																					size: "sm",
																					className: "h-8 w-8 p-0",
																					children: t.jsx(De, {
																						className: "h-4 w-4",
																					}),
																				}),
																			}),
																			t.jsx(U, {
																				to: "/admin/blog/$blogId/edit",
																				params: { blogId: s.id },
																				children: t.jsx(E, {
																					variant: "ghost",
																					size: "sm",
																					className: "h-8 w-8 p-0",
																					children: t.jsx(Pe, {
																						className: "h-4 w-4",
																					}),
																				}),
																			}),
																			t.jsx(E, {
																				variant: "ghost",
																				size: "sm",
																				className:
																					"h-8 w-8 p-0 text-destructive hover:text-destructive",
																				onClick: () => V(s),
																				children: t.jsx(ue, {
																					className: "h-4 w-4",
																				}),
																			}),
																		],
																	}),
																}),
															],
														},
														s.id,
													);
												}),
											}),
										],
									}),
								}),
							}),
						})),
			(e[46] = c),
			(e[47] = C))
		: (C = e[47]);
	const Z = !!a;
	let O;
	e[48] === Symbol.for("react.memo_cache_sentinel")
		? ((O = () => V(null)), (e[48] = O))
		: (O = e[48]);
	let K;
	e[49] === Symbol.for("react.memo_cache_sentinel")
		? ((K = t.jsx(je, { children: "Supprimer l'article" })), (e[49] = K))
		: (K = e[49]);
	const ee = a == null ? void 0 : a.title;
	let S;
	e[50] !== ee
		? ((S = t.jsxs(ge, {
				children: [
					K,
					t.jsxs(Ne, {
						children: [
							"Êtes-vous sûr de vouloir supprimer l'article",
							" ",
							t.jsxs("strong", { children: ['"', ee, '"'] }),
							" ? Cette action est irréversible et supprimera également tous les commentaires associés.",
						],
					}),
				],
			})),
			(e[50] = ee),
			(e[51] = S))
		: (S = e[51]);
	let A;
	e[52] !== n.isPending
		? ((A = t.jsx(fe, { disabled: n.isPending, children: "Annuler" })),
			(e[52] = n.isPending),
			(e[53] = A))
		: (A = e[53]);
	let D;
	e[54] !== n.isPending
		? ((D = n.isPending
				? t.jsxs(t.Fragment, {
						children: [
							t.jsx("div", {
								className:
									"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
							}),
							"Suppression...",
						],
					})
				: "Supprimer définitivement"),
			(e[54] = n.isPending),
			(e[55] = D))
		: (D = e[55]);
	let P;
	e[56] !== n.isPending || e[57] !== Y || e[58] !== D
		? ((P = t.jsx(pe, {
				onClick: Y,
				disabled: n.isPending,
				className:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				children: D,
			})),
			(e[56] = n.isPending),
			(e[57] = Y),
			(e[58] = D),
			(e[59] = P))
		: (P = e[59]);
	let B;
	e[60] !== A || e[61] !== P
		? ((B = t.jsxs(ve, { children: [A, P] })),
			(e[60] = A),
			(e[61] = P),
			(e[62] = B))
		: (B = e[62]);
	let T;
	e[63] !== S || e[64] !== B
		? ((T = t.jsxs(be, { children: [S, B] })),
			(e[63] = S),
			(e[64] = B),
			(e[65] = T))
		: (T = e[65]);
	let L;
	e[66] !== Z || e[67] !== T
		? ((L = t.jsx(we, { open: Z, onOpenChange: O, children: T })),
			(e[66] = Z),
			(e[67] = T),
			(e[68] = L))
		: (L = e[68]);
	let Q;
	return (
		e[69] !== f || e[70] !== y || e[71] !== C || e[72] !== L
			? ((Q = t.jsxs("div", {
					className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
					children: [k, f, y, C, L],
				})),
				(e[69] = f),
				(e[70] = y),
				(e[71] = C),
				(e[72] = L),
				(e[73] = Q))
			: (Q = e[73]),
		Q
	);
}
function Le(l) {
	return t.jsxs(
		$,
		{ variant: "outline", className: "text-xs", children: ["#", l.name] },
		l.id,
	);
}
function _e(l) {
	return l.state === "archived";
}
function Ee(l) {
	return l.state === "draft";
}
function $e(l) {
	return l.state === "published";
}
function ze() {
	return window.location.reload();
}
function Ie(l) {
	const e = document.createElement("div");
	return (e.innerHTML = l), e.textContent || e.innerText || "";
}
function Re(l) {
	return new Date(l).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
function ke(l) {
	switch (l) {
		case "published":
			return t.jsx($, {
				className: "bg-green-500 hover:bg-green-600",
				children: "Publié",
			});
		case "draft":
			return t.jsx($, { variant: "outline", children: "Brouillon" });
		case "archived":
			return t.jsx($, { variant: "secondary", children: "Archivé" });
		default:
			return null;
	}
}
const at = () => {
	const e = ae.c(2),
		{ blogs: m } = he.useLoaderData();
	let a;
	return (
		e[0] !== m
			? ((a = t.jsx(Te, { blogs: m })), (e[0] = m), (e[1] = a))
			: (a = e[1]),
		a
	);
};
export { at as component };
