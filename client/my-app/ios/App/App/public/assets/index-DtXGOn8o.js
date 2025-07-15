import { A as fe } from "./arrow-left-DMyOJown.js";
import { a as Ae, b as we, A as ye } from "./avatar-DIRgKWh1.js";
import { B as j } from "./badge-BAidKpPB.js";
import { C as be } from "./calendar-De7tcxsN.js";
import { C as Se } from "./clock-Kg0fBwSd.js";
import { E as le } from "./eye-D8N8bRfa.js";
import { E as he } from "./eye-off-zA7XEEL7.js";
import {
	r as H,
	B as O,
	b as ce,
	f as de,
	c as ge,
	e as ie,
	C as ne,
	L as re,
	j as s,
	S as ue,
	bB as ve,
	t as xe,
} from "./index-kb-Ylywn.js";
import { M as Ne } from "./message-circle-B7OulW_p.js";
import { S as je } from "./separator-DDNy3jpa.js";
import { S as pe } from "./square-pen-s7PUkmhH.js";
import { T as Ce } from "./triangle-alert-CLALGpH0.js";
import { U as $e } from "./user-B8jYVTBx.js";
import "./index-Bv1xjdPd.js";
import "./index-DauBq6FI.js";
import "./index-Dl_6cIao.js";
function Ee({ blogId: n }) {
	const [e, t] = H.useState([]),
		[i, W] = H.useState(!0),
		[J, g] = H.useState(new Set()),
		o = H.useCallback(async () => {
			try {
				W(!0);
				const a = await fetch(`/api/comments/admin/article/${n}`);
				if (!a.ok)
					throw new Error("Erreur lors du chargement des commentaires");
				const l = await a.json();
				t(l);
			} catch (a) {
				console.error("Erreur:", a),
					xe.error("Impossible de charger les commentaires");
			} finally {
				W(!1);
			}
		}, [n]),
		N = async (a, l) => {
			try {
				g((p) => new Set(p).add(a));
				const c = l === "published" ? "hide" : "show";
				if (
					!(
						await fetch(`/api/comments/admin/${a}/${c}`, {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
						})
					).ok
				)
					throw new Error(
						`Erreur lors du ${c === "hide" ? "masquage" : "affichage"} du commentaire`,
					);
				t((p) =>
					p.map((m) =>
						m.id === a
							? { ...m, state: c === "hide" ? "archived" : "published" }
							: m,
					),
				),
					console.log(
						`Commentaire ${c === "hide" ? "masqué" : "affiché"} avec succès`,
					);
			} catch (c) {
				console.error("Erreur:", c),
					xe.error("Impossible de modifier le commentaire");
			} finally {
				g((c) => {
					const d = new Set(c);
					return d.delete(a), d;
				});
			}
		};
	H.useEffect(() => {
		o();
	}, [o]);
	const x = (a) =>
			new Date(a).toLocaleDateString("fr-FR", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			}),
		u = (a) =>
			a.firstName && a.lastName
				? `${a.firstName} ${a.lastName}`
				: a.name || "Utilisateur anonyme",
		f = (a) => {
			if (a.firstName && a.lastName)
				return `${a.firstName[0]}${a.lastName[0]}`.toUpperCase();
			if (a.name) {
				const l = a.name.split(" ");
				return l.length > 1
					? `${l[0][0]}${l[l.length - 1][0]}`.toUpperCase()
					: a.name.substring(0, 2).toUpperCase();
			}
			return "U";
		};
	if (i)
		return s.jsxs(ie, {
			children: [
				s.jsx(ne, {
					children: s.jsxs(ce, {
						className: "flex items-center gap-2",
						children: [
							s.jsx(ue, { className: "h-5 w-5" }),
							"Gestion des commentaires",
						],
					}),
				}),
				s.jsx(de, {
					children: s.jsxs("div", {
						className: "flex items-center justify-center py-8",
						children: [
							s.jsx("div", {
								className:
									"animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent",
							}),
							s.jsx("span", {
								className: "ml-3 text-muted-foreground",
								children: "Chargement des commentaires...",
							}),
						],
					}),
				}),
			],
		});
	const h = e.filter((a) => a.state === "published"),
		r = e.filter((a) => a.state === "archived");
	return s.jsxs(ie, {
		children: [
			s.jsxs(ne, {
				children: [
					s.jsxs(ce, {
						className: "flex items-center gap-2",
						children: [
							s.jsx(ue, { className: "h-5 w-5" }),
							"Gestion des commentaires (",
							e.length,
							")",
						],
					}),
					s.jsxs("div", {
						className: "flex gap-2",
						children: [
							s.jsxs(j, {
								variant: "outline",
								className: "gap-1",
								children: [
									s.jsx(le, { className: "h-3 w-3" }),
									h.length,
									" visible",
									h.length > 1 ? "s" : "",
								],
							}),
							r.length > 0 &&
								s.jsxs(j, {
									variant: "secondary",
									className: "gap-1",
									children: [
										s.jsx(he, { className: "h-3 w-3" }),
										r.length,
										" masqué",
										r.length > 1 ? "s" : "",
									],
								}),
						],
					}),
				],
			}),
			s.jsxs(de, {
				children: [
					e.length === 0
						? s.jsxs("div", {
								className: "text-center py-8 text-muted-foreground",
								children: [
									s.jsx(Ne, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
									s.jsx("p", { children: "Aucun commentaire sur cet article" }),
								],
							})
						: s.jsx("div", {
								className: "space-y-4",
								children: e.map((a, l) =>
									s.jsxs(
										"div",
										{
											children: [
												s.jsxs("div", {
													className: "flex gap-3",
													children: [
														s.jsxs(we, {
															className: "h-8 w-8",
															children: [
																s.jsx(ye, { src: a.author.image || void 0 }),
																s.jsx(Ae, {
																	className: "text-xs",
																	children: f(a.author),
																}),
															],
														}),
														s.jsxs("div", {
															className: "flex-1 space-y-2",
															children: [
																s.jsxs("div", {
																	className:
																		"flex items-center gap-2 flex-wrap",
																	children: [
																		s.jsx("span", {
																			className: "font-medium text-sm",
																			children: u(a.author),
																		}),
																		s.jsx(j, {
																			variant:
																				a.state === "published"
																					? "default"
																					: "secondary",
																			className: "text-xs",
																			children:
																				a.state === "published"
																					? s.jsxs(s.Fragment, {
																							children: [
																								s.jsx(le, {
																									className: "h-3 w-3 mr-1",
																								}),
																								"Visible",
																							],
																						})
																					: s.jsxs(s.Fragment, {
																							children: [
																								s.jsx(he, {
																									className: "h-3 w-3 mr-1",
																								}),
																								"Masqué",
																							],
																						}),
																		}),
																		s.jsxs("span", {
																			className:
																				"text-xs text-muted-foreground flex items-center gap-1",
																			children: [
																				s.jsx(be, { className: "h-3 w-3" }),
																				x(a.createdAt),
																			],
																		}),
																	],
																}),
																s.jsx("div", {
																	className: `text-sm p-3 rounded-md border ${a.state === "archived" ? "bg-muted text-muted-foreground border-dashed" : "bg-background"}`,
																	children: a.content,
																}),
																s.jsx("div", {
																	className: "flex gap-2",
																	children: s.jsxs(O, {
																		variant:
																			a.state === "published"
																				? "destructive"
																				: "default",
																		size: "sm",
																		onClick: () => N(a.id, a.state),
																		disabled: J.has(a.id),
																		className: "text-xs",
																		children: [
																			J.has(a.id)
																				? s.jsx("div", {
																						className:
																							"animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent mr-1",
																					})
																				: a.state === "published"
																					? s.jsx(he, {
																							className: "h-3 w-3 mr-1",
																						})
																					: s.jsx(le, {
																							className: "h-3 w-3 mr-1",
																						}),
																			a.state === "published"
																				? "Masquer"
																				: "Afficher",
																		],
																	}),
																}),
															],
														}),
													],
												}),
												l < e.length - 1 && s.jsx(je, { className: "mt-4" }),
											],
										},
										a.id,
									),
								),
							}),
					r.length > 0 &&
						s.jsxs("div", {
							className:
								"mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg",
							children: [
								s.jsxs("div", {
									className: "flex items-center gap-2 text-amber-800 mb-2",
									children: [
										s.jsx(Ce, { className: "h-4 w-4" }),
										s.jsx("span", {
											className: "text-sm font-medium",
											children: "Commentaires masqués",
										}),
									],
								}),
								s.jsxs("p", {
									className: "text-xs text-amber-700",
									children: [
										r.length,
										" commentaire",
										r.length > 1 ? "s sont masqués" : " est masqué",
										" et ne ",
										r.length > 1 ? "sont" : "est",
										" pas visible",
										r.length > 1 ? "s" : "",
										"par les utilisateurs. Vous pouvez les réafficher à tout moment.",
									],
								}),
							],
						}),
				],
			}),
		],
	});
}
function qe(n) {
	const e = ge.c(100),
		{ blog: t } = n,
		i = Ie,
		W = De,
		J = Be;
	let g;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((g = s.jsx(re, {
				to: "/admin/blog",
				children: s.jsxs(O, {
					variant: "outline",
					className: "gap-2",
					children: [s.jsx(fe, { className: "h-4 w-4" }), "Retour à la liste"],
				}),
			})),
			(e[0] = g))
		: (g = e[0]);
	let o;
	e[1] !== t.id
		? ((o = { blogId: t.id }), (e[1] = t.id), (e[2] = o))
		: (o = e[2]);
	let N;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((N = s.jsxs(O, {
				className: "gap-2",
				children: [s.jsx(pe, { className: "h-4 w-4" }), "Modifier"],
			})),
			(e[3] = N))
		: (N = e[3]);
	let x;
	e[4] !== o
		? ((x = s.jsxs("div", {
				className:
					"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
				children: [
					g,
					s.jsx("div", {
						className: "flex gap-2",
						children: s.jsx(re, {
							to: "/admin/blog/$blogId/edit",
							params: o,
							children: N,
						}),
					}),
				],
			})),
			(e[4] = o),
			(e[5] = x))
		: (x = e[5]);
	let u;
	e[6] !== t.headerImage || e[7] !== t.title
		? ((u =
				t.headerImage &&
				s.jsx("div", {
					className: "aspect-video overflow-hidden rounded-t-lg",
					children: s.jsx("img", {
						src: t.headerImage,
						alt: t.title,
						className: "w-full h-full object-cover",
					}),
				})),
			(e[6] = t.headerImage),
			(e[7] = t.title),
			(e[8] = u))
		: (u = e[8]);
	let f;
	e[9] !== t.state
		? ((f = W(t.state)), (e[9] = t.state), (e[10] = f))
		: (f = e[10]);
	let h;
	e[11] !== t.commentsEnabled
		? ((h =
				t.commentsEnabled &&
				s.jsxs(j, {
					variant: "outline",
					className: "gap-1",
					children: [
						s.jsx(Ne, { className: "h-3 w-3" }),
						"Commentaires activés",
					],
				})),
			(e[11] = t.commentsEnabled),
			(e[12] = h))
		: (h = e[12]);
	let r;
	e[13] !== f || e[14] !== h
		? ((r = s.jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [f, h],
			})),
			(e[13] = f),
			(e[14] = h),
			(e[15] = r))
		: (r = e[15]);
	let a;
	e[16] !== t.title
		? ((a = s.jsx(ce, {
				className: "text-2xl sm:text-3xl leading-tight",
				children: t.title,
			})),
			(e[16] = t.title),
			(e[17] = a))
		: (a = e[17]);
	let l;
	e[18] === Symbol.for("react.memo_cache_sentinel")
		? ((l = s.jsx($e, { className: "h-4 w-4" })), (e[18] = l))
		: (l = e[18]);
	const c = t.author
		? `${t.author.firstName} ${t.author.lastName}`
		: "Auteur inconnu";
	let d;
	e[19] !== c
		? ((d = s.jsxs("div", {
				className: "flex items-center gap-1",
				children: [l, s.jsx("span", { children: c })],
			})),
			(e[19] = c),
			(e[20] = d))
		: (d = e[20]);
	let p;
	e[21] === Symbol.for("react.memo_cache_sentinel")
		? ((p = s.jsx(be, { className: "h-4 w-4" })), (e[21] = p))
		: (p = e[21]);
	let m;
	e[22] !== t.createdAt
		? ((m = i(t.createdAt)), (e[22] = t.createdAt), (e[23] = m))
		: (m = e[23]);
	let b;
	e[24] !== m
		? ((b = s.jsxs("div", {
				className: "flex items-center gap-1",
				children: [p, s.jsxs("span", { children: ["Créé le ", m] })],
			})),
			(e[24] = m),
			(e[25] = b))
		: (b = e[25]);
	let v;
	e[26] !== t.publishedAt
		? ((v =
				t.publishedAt &&
				s.jsxs("div", {
					className: "flex items-center gap-1",
					children: [
						s.jsx(Se, { className: "h-4 w-4" }),
						s.jsxs("span", { children: ["Publié le ", i(t.publishedAt)] }),
					],
				})),
			(e[26] = t.publishedAt),
			(e[27] = v))
		: (v = e[27]);
	let w;
	e[28] !== d || e[29] !== b || e[30] !== v
		? ((w = s.jsxs("div", {
				className:
					"flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
				children: [d, b, v],
			})),
			(e[28] = d),
			(e[29] = b),
			(e[30] = v),
			(e[31] = w))
		: (w = e[31]);
	let y;
	e[32] !== w || e[33] !== r || e[34] !== a
		? ((y = s.jsxs(ne, { className: "space-y-4", children: [r, a, w] })),
			(e[32] = w),
			(e[33] = r),
			(e[34] = a),
			(e[35] = y))
		: (y = e[35]);
	let A;
	e[36] !== t.content
		? ((A = s.jsx(de, {
				children: s.jsx("div", {
					className: `prose prose-gray dark:prose-invert max-w-none
                         prose-headings:text-foreground 
                         prose-p:text-foreground 
                         prose-strong:text-foreground
                         prose-a:text-primary hover:prose-a:text-primary/80
                         prose-blockquote:border-primary
                         prose-code:text-foreground prose-code:bg-muted
                         prose-pre:bg-muted prose-pre:text-foreground`,
					dangerouslySetInnerHTML: { __html: t.content },
				}),
			})),
			(e[36] = t.content),
			(e[37] = A))
		: (A = e[37]);
	let C;
	e[38] !== y || e[39] !== A || e[40] !== u
		? ((C = s.jsxs(ie, { children: [u, y, A] })),
			(e[38] = y),
			(e[39] = A),
			(e[40] = u),
			(e[41] = C))
		: (C = e[41]);
	let K;
	e[42] === Symbol.for("react.memo_cache_sentinel")
		? ((K = s.jsx(ne, {
				children: s.jsxs(ce, {
					className: "text-lg flex items-center gap-2",
					children: [
						s.jsx(le, { className: "h-5 w-5" }),
						"Informations techniques",
					],
				}),
			})),
			(e[42] = K))
		: (K = e[42]);
	let Q;
	e[43] === Symbol.for("react.memo_cache_sentinel")
		? ((Q = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Auteur",
			})),
			(e[43] = Q))
		: (Q = e[43]);
	const me = t.author
		? `${t.author.firstName} ${t.author.lastName}`
		: "Auteur inconnu";
	let S;
	e[44] !== me
		? ((S = s.jsxs("div", {
				children: [Q, s.jsx("p", { className: "text-sm", children: me })],
			})),
			(e[44] = me),
			(e[45] = S))
		: (S = e[45]);
	let X;
	e[46] === Symbol.for("react.memo_cache_sentinel")
		? ((X = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "État",
			})),
			(e[46] = X))
		: (X = e[46]);
	let $;
	e[47] !== t.state
		? (($ = J(t.state)), (e[47] = t.state), (e[48] = $))
		: ($ = e[48]);
	let E;
	e[49] !== $
		? ((E = s.jsxs("div", {
				children: [X, s.jsx("p", { className: "text-sm", children: $ })],
			})),
			(e[49] = $),
			(e[50] = E))
		: (E = e[50]);
	let Y;
	e[51] === Symbol.for("react.memo_cache_sentinel")
		? ((Y = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Commentaires",
			})),
			(e[51] = Y))
		: (Y = e[51]);
	const oe = t.commentsEnabled ? "Activés" : "Désactivés";
	let q;
	e[52] !== oe
		? ((q = s.jsxs("div", {
				children: [Y, s.jsx("p", { className: "text-sm", children: oe })],
			})),
			(e[52] = oe),
			(e[53] = q))
		: (q = e[53]);
	let B;
	e[54] !== S || e[55] !== E || e[56] !== q
		? ((B = s.jsxs("div", { className: "space-y-3", children: [S, E, q] })),
			(e[54] = S),
			(e[55] = E),
			(e[56] = q),
			(e[57] = B))
		: (B = e[57]);
	let Z;
	e[58] === Symbol.for("react.memo_cache_sentinel")
		? ((Z = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Créé le",
			})),
			(e[58] = Z))
		: (Z = e[58]);
	let D;
	e[59] !== t.createdAt
		? ((D = i(t.createdAt)), (e[59] = t.createdAt), (e[60] = D))
		: (D = e[60]);
	let I;
	e[61] !== D
		? ((I = s.jsxs("div", {
				children: [Z, s.jsx("p", { className: "text-sm", children: D })],
			})),
			(e[61] = D),
			(e[62] = I))
		: (I = e[62]);
	let ee;
	e[63] === Symbol.for("react.memo_cache_sentinel")
		? ((ee = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Dernière modification",
			})),
			(e[63] = ee))
		: (ee = e[63]);
	let k;
	e[64] !== t.updatedAt
		? ((k = i(t.updatedAt)), (e[64] = t.updatedAt), (e[65] = k))
		: (k = e[65]);
	let _;
	e[66] !== k
		? ((_ = s.jsxs("div", {
				children: [ee, s.jsx("p", { className: "text-sm", children: k })],
			})),
			(e[66] = k),
			(e[67] = _))
		: (_ = e[67]);
	let U;
	e[68] !== t.publishedAt
		? ((U =
				t.publishedAt &&
				s.jsxs("div", {
					children: [
						s.jsx("h4", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Date de publication",
						}),
						s.jsx("p", { className: "text-sm", children: i(t.publishedAt) }),
					],
				})),
			(e[68] = t.publishedAt),
			(e[69] = U))
		: (U = e[69]);
	let L;
	e[70] !== I || e[71] !== _ || e[72] !== U
		? ((L = s.jsxs("div", { className: "space-y-3", children: [I, _, U] })),
			(e[70] = I),
			(e[71] = _),
			(e[72] = U),
			(e[73] = L))
		: (L = e[73]);
	let M;
	e[74] !== B || e[75] !== L
		? ((M = s.jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [B, L],
			})),
			(e[74] = B),
			(e[75] = L),
			(e[76] = M))
		: (M = e[76]);
	let P;
	e[77] !== t.deletedAt
		? ((P =
				t.deletedAt &&
				s.jsxs(s.Fragment, {
					children: [
						s.jsx(je, {}),
						s.jsxs("div", {
							className:
								"p-3 bg-destructive/10 border border-destructive/20 rounded",
							children: [
								s.jsx("h4", {
									className: "text-sm font-medium text-destructive mb-1",
									children: "Article supprimé",
								}),
								s.jsxs("p", {
									className: "text-sm text-destructive/80",
									children: ["Supprimé le ", i(t.deletedAt)],
								}),
							],
						}),
					],
				})),
			(e[77] = t.deletedAt),
			(e[78] = P))
		: (P = e[78]);
	let R;
	e[79] !== M || e[80] !== P
		? ((R = s.jsxs(ie, {
				children: [K, s.jsxs(de, { className: "space-y-4", children: [M, P] })],
			})),
			(e[79] = M),
			(e[80] = P),
			(e[81] = R))
		: (R = e[81]);
	let T;
	e[82] !== t.id
		? ((T = s.jsx(Ee, { blogId: t.id })), (e[82] = t.id), (e[83] = T))
		: (T = e[83]);
	let F;
	e[84] !== t.id
		? ((F = { blogId: t.id }), (e[84] = t.id), (e[85] = F))
		: (F = e[85]);
	let se;
	e[86] === Symbol.for("react.memo_cache_sentinel")
		? ((se = s.jsxs(O, {
				className: "w-full gap-2",
				children: [s.jsx(pe, { className: "h-4 w-4" }), "Modifier cet article"],
			})),
			(e[86] = se))
		: (se = e[86]);
	let V;
	e[87] !== F
		? ((V = s.jsx(re, {
				to: "/admin/blog/$blogId/edit",
				params: F,
				className: "flex-1",
				children: se,
			})),
			(e[87] = F),
			(e[88] = V))
		: (V = e[88]);
	let te;
	e[89] === Symbol.for("react.memo_cache_sentinel")
		? ((te = s.jsx(re, {
				to: "/admin/blog",
				className: "flex-1",
				children: s.jsxs(O, {
					variant: "outline",
					className: "w-full gap-2",
					children: [s.jsx(fe, { className: "h-4 w-4" }), "Retour à la liste"],
				}),
			})),
			(e[89] = te))
		: (te = e[89]);
	let z;
	e[90] !== V
		? ((z = s.jsxs("div", {
				className: "flex flex-col sm:flex-row gap-4",
				children: [V, te],
			})),
			(e[90] = V),
			(e[91] = z))
		: (z = e[91]);
	let G;
	e[92] !== C || e[93] !== R || e[94] !== T || e[95] !== z
		? ((G = s.jsxs("article", {
				className: "space-y-6",
				children: [C, R, T, z],
			})),
			(e[92] = C),
			(e[93] = R),
			(e[94] = T),
			(e[95] = z),
			(e[96] = G))
		: (G = e[96]);
	let ae;
	return (
		e[97] !== x || e[98] !== G
			? ((ae = s.jsxs("div", {
					className: "container mx-auto p-4 sm:p-6 max-w-4xl",
					children: [x, G],
				})),
				(e[97] = x),
				(e[98] = G),
				(e[99] = ae))
			: (ae = e[99]),
		ae
	);
}
function Be(n) {
	switch (n) {
		case "published":
			return "Publié";
		case "draft":
			return "Brouillon";
		case "archived":
			return "Archivé";
		default:
			return n;
	}
}
function De(n) {
	switch (n) {
		case "published":
			return s.jsx(j, {
				className: "bg-green-500 hover:bg-green-600",
				children: "Publié",
			});
		case "draft":
			return s.jsx(j, { variant: "outline", children: "Brouillon" });
		case "archived":
			return s.jsx(j, { variant: "secondary", children: "Archivé" });
		default:
			return null;
	}
}
function Ie(n) {
	return new Date(n).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
const Ke = () => {
	const e = ge.c(2),
		{ blog: t } = ve.useLoaderData();
	let i;
	return (
		e[0] !== t
			? ((i = s.jsx(qe, { blog: t })), (e[0] = t), (e[1] = i))
			: (i = e[1]),
		i
	);
};
export { Ke as component };
