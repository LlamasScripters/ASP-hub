import { A as xe } from "./arrow-left-DMyOJown.js";
import { B as q } from "./badge-BAidKpPB.js";
import { B as ne } from "./building-2-C_wvjtu2.js";
import { C as me } from "./calendar-De7tcxsN.js";
import { F as ie } from "./file-text-Dzq0McNO.js";
import { F as ce } from "./folder-open-Bjf3vPky.js";
import {
	r as H,
	L as Q,
	b as V,
	d as W,
	C as X,
	O as ae,
	e as b,
	f as j,
	bX as le,
	B as re,
	j as s,
	c as te,
} from "./index-kb-Ylywn.js";
import { I as he } from "./info-hEQo0LXU.js";
import { M as ue } from "./mail--zklVbGT.js";
import { M as fe } from "./map-pin-DywQhs4x.js";
import { G as ge, P as pe } from "./phone-BY2bep43.js";
import { S as Y } from "./separator-DDNy3jpa.js";
import { S as de } from "./settings-CM_XdmzG.js";
import { S as N } from "./skeleton-C4Qqz043.js";
import { U as oe } from "./users-BMY-28E4.js";
import "./index-Bv1xjdPd.js";
const Me = () => {
	const e = te.c(58),
		{ clubId: r } = le.useParams(),
		[t, Z] = H.useState(null),
		[ee, K] = H.useState(!0);
	let v, y;
	if (
		(e[0] !== r
			? ((v = () => {
					fetch(`/api/clubs/${r}`)
						.then(be)
						.then((l) => {
							Z(l), K(!1);
						})
						.catch(() => K(!1));
				}),
				(y = [r]),
				(e[0] = r),
				(e[1] = v),
				(e[2] = y))
			: ((v = e[1]), (y = e[2])),
		H.useEffect(v, y),
		ee)
	) {
		let l;
		e[3] === Symbol.for("react.memo_cache_sentinel")
			? ((l = s.jsxs(X, {
					children: [
						s.jsx(N, { className: "h-8 w-64" }),
						s.jsx(N, { className: "h-4 w-96" }),
					],
				})),
				(e[3] = l))
			: (l = e[3]);
		let g, T;
		e[4] === Symbol.for("react.memo_cache_sentinel")
			? ((g = s.jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [
						s.jsx(N, { className: "h-6 w-48" }),
						s.jsx(N, { className: "h-6 w-48" }),
					],
				})),
				(T = s.jsx(Y, {})),
				(e[4] = g),
				(e[5] = T))
			: ((g = e[4]), (T = e[5]));
		let U;
		return (
			e[6] === Symbol.for("react.memo_cache_sentinel")
				? ((U = s.jsx("div", {
						className: "container mx-auto p-6 space-y-8 max-w-7xl",
						children: s.jsxs(b, {
							children: [
								l,
								s.jsxs(j, {
									className: "space-y-4",
									children: [
										g,
										T,
										s.jsx("div", {
											className:
												"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
											children: Array.from({ length: 4 }).map(je),
										}),
									],
								}),
							],
						}),
					})),
					(e[6] = U))
				: (U = e[6]),
			U
		);
	}
	if (!t) {
		let l;
		return (
			e[7] === Symbol.for("react.memo_cache_sentinel")
				? ((l = s.jsx("div", {
						className: "container mx-auto p-6 max-w-7xl",
						children: s.jsx(b, {
							className: "border-destructive/50",
							children: s.jsx(j, {
								className: "pt-6",
								children: s.jsxs("div", {
									className: "text-center text-muted-foreground",
									children: [
										s.jsx(ne, {
											className: "mx-auto h-12 w-12 mb-4 opacity-50",
										}),
										s.jsx("p", {
											className: "text-lg font-medium",
											children: "Club introuvable",
										}),
										s.jsx("p", {
											className: "text-sm",
											children:
												"Le club demandé n'existe pas ou n'est plus accessible.",
										}),
									],
								}),
							}),
						}),
					})),
					(e[7] = l))
				: (l = e[7]),
			l
		);
	}
	let _;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((_ = {
				to: "/admin/dashboard/clubs/$clubId/sections",
				icon: ce,
				label: "Gérer les sections",
				description: "Organisez vos sections sportives",
				variant: "default",
			}),
			(e[8] = _))
		: (_ = e[8]);
	let w;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((w = {
				to: "/admin/dashboard/clubs/$clubId/categories",
				icon: oe,
				label: "Gérer les catégories",
				description: "Définissez les catégories d'âge",
				variant: "secondary",
			}),
			(e[9] = w))
		: (w = e[9]);
	let S;
	e[10] === Symbol.for("react.memo_cache_sentinel")
		? ((S = {
				to: "/admin/dashboard/clubs/$clubId/sessions",
				icon: me,
				label: "Gérer les sessions",
				description: "Planifiez vos entraînements, matchs...",
				variant: "secondary",
			}),
			(e[10] = S))
		: (S = e[10]);
	let C;
	e[11] === Symbol.for("react.memo_cache_sentinel")
		? ((C = [
				_,
				w,
				S,
				{
					to: "/admin/dashboard/clubs/$clubId/edit",
					icon: de,
					label: "Modifier le club",
					description: "Paramètres du club",
					variant: "outline",
				},
			]),
			(e[11] = C))
		: (C = e[11]);
	const se = C;
	let a;
	e[12] !== t.name
		? ((a = s.jsx("h1", {
				className:
					"text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3",
				children: t.name,
			})),
			(e[12] = t.name),
			(e[13] = a))
		: (a = e[13]);
	let k;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((k = s.jsx("p", {
				className: "text-lg text-muted-foreground mt-2",
				children: "Tableau de bord de gestion du club",
			})),
			(e[14] = k))
		: (k = e[14]);
	let i;
	e[15] !== a
		? ((i = s.jsxs("div", { children: [a, k] })), (e[15] = a), (e[16] = i))
		: (i = e[16]);
	let I;
	e[17] === Symbol.for("react.memo_cache_sentinel")
		? ((I = s.jsx(re, {
				variant: "outline",
				className: "flex items-center gap-2",
				asChild: !0,
				children: s.jsxs(Q, {
					to: "/admin/dashboard/clubs",
					children: [
						s.jsx(xe, { className: "h-4 w-4" }),
						"Retour à l'association",
					],
				}),
			})),
			(e[17] = I))
		: (I = e[17]);
	let n;
	e[18] !== i
		? ((n = s.jsxs("div", {
				className:
					"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [i, I],
			})),
			(e[18] = i),
			(e[19] = n))
		: (n = e[19]);
	let $;
	e[20] === Symbol.for("react.memo_cache_sentinel")
		? (($ = s.jsxs(X, {
				children: [
					s.jsxs(V, {
						className: "text-xl flex items-center gap-2",
						children: [
							s.jsx(he, { className: "h-5 w-5" }),
							"Informations du club",
						],
					}),
					s.jsx(W, { children: "Coordonnées et détails de contact du club" }),
				],
			})),
			(e[20] = $))
		: ($ = e[20]);
	let c;
	e[21] !== t.description
		? ((c =
				t.description &&
				s.jsx("div", {
					className: "p-4 bg-muted/30 rounded-lg border border-muted",
					children: s.jsxs("div", {
						className: "flex items-start gap-3",
						children: [
							s.jsx("div", {
								className:
									"flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0",
								children: s.jsx(ie, { className: "h-4 w-4 text-primary" }),
							}),
							s.jsxs("div", {
								className: "min-w-0 flex-1",
								children: [
									s.jsx("p", {
										className: "text-sm font-medium text-muted-foreground mb-2",
										children: "Description",
									}),
									s.jsx("p", {
										className: "text-sm leading-relaxed text-foreground",
										children: t.description,
									}),
								],
							}),
						],
					}),
				})),
			(e[21] = t.description),
			(e[22] = c))
		: (c = e[22]);
	let A;
	e[23] === Symbol.for("react.memo_cache_sentinel")
		? ((A = s.jsx(Y, {})), (e[23] = A))
		: (A = e[23]);
	let P;
	e[24] === Symbol.for("react.memo_cache_sentinel")
		? ((P = s.jsx("div", {
				className:
					"flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 shrink-0",
				children: s.jsx(fe, { className: "h-4 w-4 text-red-600" }),
			})),
			(e[24] = P))
		: (P = e[24]);
	let B;
	e[25] === Symbol.for("react.memo_cache_sentinel")
		? ((B = s.jsx("p", {
				className: "text-sm font-medium text-muted-foreground mb-1",
				children: "Adresse",
			})),
			(e[25] = B))
		: (B = e[25]);
	let o;
	e[26] !== t.address
		? ((o = s.jsxs("div", {
				className:
					"flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors",
				children: [
					P,
					s.jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							B,
							t.address
								? s.jsx("p", {
										className:
											"text-sm text-foreground leading-relaxed break-words",
										children: t.address,
									})
								: s.jsx("p", {
										className: "text-sm text-muted-foreground italic",
										children: "Non renseignée",
									}),
						],
					}),
				],
			})),
			(e[26] = t.address),
			(e[27] = o))
		: (o = e[27]);
	let L;
	e[28] === Symbol.for("react.memo_cache_sentinel")
		? ((L = s.jsx("div", {
				className:
					"flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 shrink-0",
				children: s.jsx(ue, { className: "h-4 w-4 text-blue-600" }),
			})),
			(e[28] = L))
		: (L = e[28]);
	let E;
	e[29] === Symbol.for("react.memo_cache_sentinel")
		? ((E = s.jsx("p", {
				className: "text-sm font-medium text-muted-foreground mb-1",
				children: "Email",
			})),
			(e[29] = E))
		: (E = e[29]);
	let m;
	e[30] !== t.email
		? ((m = s.jsxs("div", {
				className:
					"flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors",
				children: [
					L,
					s.jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							E,
							t.email
								? s.jsx("a", {
										href: `mailto:${t.email}`,
										className: "inline-block",
										children: s.jsx(q, {
											variant: "secondary",
											className:
												"text-sm font-normal hover:bg-blue-100 transition-colors cursor-pointer",
											children: t.email,
										}),
									})
								: s.jsx("p", {
										className: "text-sm text-muted-foreground italic",
										children: "Non renseigné",
									}),
						],
					}),
				],
			})),
			(e[30] = t.email),
			(e[31] = m))
		: (m = e[31]);
	let G;
	e[32] === Symbol.for("react.memo_cache_sentinel")
		? ((G = s.jsx("div", {
				className:
					"flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 shrink-0",
				children: s.jsx(pe, { className: "h-4 w-4 text-green-600" }),
			})),
			(e[32] = G))
		: (G = e[32]);
	let M;
	e[33] === Symbol.for("react.memo_cache_sentinel")
		? ((M = s.jsx("p", {
				className: "text-sm font-medium text-muted-foreground mb-1",
				children: "Téléphone",
			})),
			(e[33] = M))
		: (M = e[33]);
	let d;
	e[34] !== t.phone
		? ((d = s.jsxs("div", {
				className:
					"flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors",
				children: [
					G,
					s.jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							M,
							t.phone
								? s.jsx("a", {
										href: `tel:${t.phone}`,
										className: "inline-block",
										children: s.jsx(q, {
											variant: "secondary",
											className:
												"text-sm font-normal hover:bg-green-100 transition-colors cursor-pointer",
											children: t.phone,
										}),
									})
								: s.jsx("p", {
										className: "text-sm text-muted-foreground italic",
										children: "Non renseigné",
									}),
						],
					}),
				],
			})),
			(e[34] = t.phone),
			(e[35] = d))
		: (d = e[35]);
	let O;
	e[36] === Symbol.for("react.memo_cache_sentinel")
		? ((O = s.jsx("div", {
				className:
					"flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 shrink-0",
				children: s.jsx(ge, { className: "h-4 w-4 text-purple-600" }),
			})),
			(e[36] = O))
		: (O = e[36]);
	let z;
	e[37] === Symbol.for("react.memo_cache_sentinel")
		? ((z = s.jsx("p", {
				className: "text-sm font-medium text-muted-foreground mb-1",
				children: "Site web",
			})),
			(e[37] = z))
		: (z = e[37]);
	let x;
	e[38] !== t.website
		? ((x = s.jsxs("div", {
				className:
					"flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors",
				children: [
					O,
					s.jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							z,
							t.website
								? s.jsx("a", {
										href: t.website,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-block",
										children: s.jsx(q, {
											variant: "secondary",
											className:
												"text-sm font-normal hover:bg-purple-100 transition-colors cursor-pointer break-all",
											children: t.website,
										}),
									})
								: s.jsx("p", {
										className: "text-sm text-muted-foreground italic",
										children: "Non renseigné",
									}),
						],
					}),
				],
			})),
			(e[38] = t.website),
			(e[39] = x))
		: (x = e[39]);
	let h;
	e[40] !== o || e[41] !== m || e[42] !== d || e[43] !== x
		? ((h = s.jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [o, m, d, x],
			})),
			(e[40] = o),
			(e[41] = m),
			(e[42] = d),
			(e[43] = x),
			(e[44] = h))
		: (h = e[44]);
	let f;
	e[45] !== c || e[46] !== h
		? ((f = s.jsxs(b, {
				className: "shadow-sm",
				children: [
					$,
					s.jsxs(j, { className: "space-y-6", children: [c, A, h] }),
				],
			})),
			(e[45] = c),
			(e[46] = h),
			(e[47] = f))
		: (f = e[47]);
	let D;
	e[48] === Symbol.for("react.memo_cache_sentinel")
		? ((D = s.jsxs(X, {
				children: [
					s.jsx(V, { className: "text-xl", children: "Actions de gestion" }),
					s.jsx(W, {
						children:
							"Accédez rapidement aux différentes sections de gestion de votre club",
					}),
				],
			})),
			(e[48] = D))
		: (D = e[48]);
	let u;
	e[49] !== r
		? ((u = s.jsxs(b, {
				className: "shadow-sm",
				children: [
					D,
					s.jsx(j, {
						children: s.jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
							children: se.map((l) => {
								const g = l.icon;
								return s.jsx(
									Q,
									{
										to: l.to,
										params: { clubId: r },
										className: "group",
										children: s.jsx(b, {
											className:
												"h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer",
											children: s.jsxs(j, {
												className:
													"p-4 flex flex-col items-center text-center space-y-3",
												children: [
													s.jsx("div", {
														className:
															"flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors",
														children: s.jsx(g, {
															className: "h-6 w-6 text-primary",
														}),
													}),
													s.jsxs("div", {
														className: "space-y-1",
														children: [
															s.jsx("h3", {
																className: "font-medium text-sm",
																children: l.label,
															}),
															s.jsx("p", {
																className:
																	"text-xs text-muted-foreground leading-tight",
																children: l.description,
															}),
														],
													}),
												],
											}),
										}),
									},
									l.to,
								);
							}),
						}),
					}),
				],
			})),
			(e[49] = r),
			(e[50] = u))
		: (u = e[50]);
	let p;
	e[51] !== n || e[52] !== f || e[53] !== u
		? ((p = s.jsxs("div", { className: "space-y-6", children: [n, f, u] })),
			(e[51] = n),
			(e[52] = f),
			(e[53] = u),
			(e[54] = p))
		: (p = e[54]);
	let F;
	e[55] === Symbol.for("react.memo_cache_sentinel")
		? ((F = s.jsx(ae, {})), (e[55] = F))
		: (F = e[55]);
	let R;
	return (
		e[56] !== p
			? ((R = s.jsxs("div", {
					className: "container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl",
					children: [p, F],
				})),
				(e[56] = p),
				(e[57] = R))
			: (R = e[57]),
		R
	);
};
function be(J) {
	return J.json();
}
function je() {
	return s.jsx(N, { className: "h-10 w-full" }, crypto.randomUUID());
}
export { Me as component };
