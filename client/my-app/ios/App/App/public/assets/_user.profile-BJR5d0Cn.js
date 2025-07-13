import { G as F } from "./GoogleIcon-D1uQH_Nc.js";
import { b as H, a as K, A as Q } from "./alert-DcqybFAu.js";
import {
	h as J,
	g as V,
	T as W,
	f as X,
	c as Y,
	b as Z,
	d as ee,
	a as re,
	e as se,
	A as te,
} from "./alert-dialog-BJAnlKbe.js";
import { a as I, b as L, A as R } from "./avatar-DIRgKWh1.js";
import { C as ie } from "./calendar-De7tcxsN.js";
import { C as le } from "./circle-alert-CvO-74L-.js";
import { f as _ } from "./format-V-_nIj5y.js";
import {
	u as $,
	C as A,
	w as B,
	c as C,
	d as D,
	t as E,
	L as G,
	B as M,
	r as O,
	S,
	R as T,
	b,
	q as k,
	h as q,
	j as s,
	f as w,
	e as y,
	bP as z,
} from "./index-kb-Ylywn.js";
import { M as U } from "./mail--zklVbGT.js";
import { S as x } from "./skeleton-C4Qqz043.js";
import { S as ce } from "./square-pen-s7PUkmhH.js";
import { u as ae } from "./useQuery-DObI4S3_.js";
import { U as P } from "./user-B8jYVTBx.js";
import "./index-DauBq6FI.js";
import "./index-Dl_6cIao.js";
import "./index-Bv1xjdPd.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-BRam3N1Z.js";
import "./buildMatchPatternFn-DF4FdbSS.js";
const ne = { google: { id: "google", name: "Google", icon: F } };
function oe() {
	const e = C.c(6),
		t = O.useId();
	let a;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((a = s.jsxs(A, {
				children: [
					s.jsxs(b, {
						className: "flex items-center gap-2",
						children: [s.jsx(S, { className: "h-5 w-5" }), "Comptes connectés"],
					}),
					s.jsx(D, {
						children: "Gérez les comptes sociaux liés à votre profil",
					}),
				],
			})),
			(e[0] = a))
		: (a = e[0]);
	let n;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((n = s.jsx(x, { className: "h-10 w-10 rounded-full" })), (e[1] = n))
		: (n = e[1]);
	let c, o;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((c = s.jsxs("div", {
				className: "flex items-center justify-between p-4 border rounded-lg",
				children: [
					s.jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							n,
							s.jsxs("div", {
								className: "space-y-2",
								children: [
									s.jsx(x, { className: "h-4 w-32" }),
									s.jsx(x, { className: "h-3 w-48" }),
								],
							}),
						],
					}),
					s.jsx(x, { className: "h-4 w-24" }),
				],
			})),
			(o = [1, 2]),
			(e[2] = c),
			(e[3] = o))
		: ((c = e[2]), (o = e[3]));
	let i;
	return (
		e[4] !== t
			? ((i = s.jsxs(y, {
					children: [
						a,
						s.jsx(w, {
							children: s.jsxs("div", {
								className: "space-y-4",
								children: [
									c,
									o.map((m) =>
										s.jsxs(
											"div",
											{
												className:
													"flex items-center justify-between p-4 border rounded-lg",
												children: [
													s.jsxs("div", {
														className: "flex items-center gap-3",
														children: [
															s.jsx(x, { className: "h-10 w-10 rounded-full" }),
															s.jsxs("div", {
																className: "space-y-2",
																children: [
																	s.jsx(x, { className: "h-4 w-32" }),
																	s.jsx(x, { className: "h-3 w-48" }),
																],
															}),
														],
													}),
													s.jsx(x, { className: "h-8 w-24" }),
												],
											},
											`${t}-${m}`,
										),
									),
								],
							}),
						}),
					],
				})),
				(e[4] = t),
				(e[5] = i))
			: (i = e[5]),
		i
	);
}
function me() {
	const e = C.c(2);
	let t;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((t = s.jsx(A, {
				children: s.jsxs(b, {
					className: "flex items-center gap-2",
					children: [s.jsx(S, { className: "h-5 w-5" }), "Comptes connectés"],
				}),
			})),
			(e[0] = t))
		: (t = e[0]);
	let a;
	return (
		e[1] === Symbol.for("react.memo_cache_sentinel")
			? ((a = s.jsxs(y, {
					children: [
						t,
						s.jsx(w, {
							children: s.jsx("div", {
								className: "text-center text-sm text-muted-foreground",
								children:
									"Une erreur est survenue lors de la récupération des comptes connectés.",
							}),
						}),
					],
				})),
				(e[1] = a))
			: (a = e[1]),
		a
	);
}
function de({ user: e }) {
	const { data: t, isPending: a, isError: n } = ae(z(e.id));
	if (a) return s.jsx(oe, {});
	if (n || !t) return s.jsx(me, {});
	const c = t.some((r) => r.provider === "credential"),
		o = t.filter((r) => r.provider !== "credential"),
		i = $({
			mutationFn: async (r) => {
				const { error: l } = await q.unlinkAccount({ providerId: r });
				if (l != null && l.code) throw new Error(B(l.code));
			},
			onSuccess: () => {
				const r = z(e.id);
				k.invalidateQueries({ queryKey: r.queryKey }),
					E.success("Compte déconnecté avec succès");
			},
			onError: (r) => {
				E.error(
					(r == null ? void 0 : r.message) ||
						"Erreur lors de la déconnexion du compte",
				);
			},
		}),
		m = (r) => {
			i.mutate(r);
		};
	return s.jsxs(y, {
		children: [
			s.jsxs(A, {
				children: [
					s.jsxs(b, {
						className: "flex items-center gap-2",
						children: [s.jsx(S, { className: "h-5 w-5" }), "Comptes connectés"],
					}),
					s.jsx(D, {
						children: "Gérez les comptes sociaux liés à votre profil",
					}),
				],
			}),
			s.jsxs(w, {
				className: "space-y-4",
				children: [
					!c &&
						o.length > 0 &&
						s.jsxs(Q, {
							variant: "default",
							children: [
								s.jsx(le, { className: "size-4" }),
								s.jsx(H, { children: "Attention" }),
								s.jsx(K, {
									children:
										"Vous ne pouvez pas déconnecter vos comptes sociaux car vous n'avez pas de compte email configuré. Pour plus de sécurité, configurez d'abord un mot de passe depuis la page des paramètres.",
								}),
							],
						}),
					s.jsxs("div", {
						className: "space-y-4",
						children: [
							c &&
								s.jsx("div", {
									className:
										"flex items-center justify-between p-4 border rounded-lg",
									children: s.jsxs("div", {
										className: "flex items-center gap-3",
										children: [
											s.jsx("div", {
												className:
													"h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center",
												children: s.jsx(U, {
													className: "h-5 w-5 text-primary",
												}),
											}),
											s.jsxs("div", {
												children: [
													s.jsx("p", {
														className: "font-medium",
														children: "Compte Email",
													}),
													s.jsx("p", {
														className: "text-sm text-muted-foreground",
														children: "Connexion avec email et mot de passe",
													}),
												],
											}),
										],
									}),
								}),
							o.map((r) => {
								const l = ne[r.provider],
									d = (l == null ? void 0 : l.icon) || P;
								return s.jsxs(
									"div",
									{
										className:
											"flex items-center justify-between p-4 border rounded-lg",
										children: [
											s.jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													s.jsx("div", {
														className:
															"h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center",
														children: s.jsx(d, { className: "h-5 w-5" }),
													}),
													s.jsxs("div", {
														children: [
															s.jsx("p", {
																className: "font-medium",
																children:
																	(l == null ? void 0 : l.name) || r.provider,
															}),
															s.jsxs("p", {
																className: "text-sm text-muted-foreground",
																children: [
																	"Connecté le ",
																	_(r.createdAt, "dd/MM/yyyy"),
																],
															}),
														],
													}),
												],
											}),
											c &&
												s.jsxs(V, {
													children: [
														s.jsx(J, {
															asChild: !0,
															children: s.jsxs(M, {
																variant: "outline",
																size: "sm",
																className:
																	"text-destructive hover:text-destructive",
																disabled: i.isPending,
																children: [
																	s.jsx(W, { className: "h-4 w-4 mr-1" }),
																	"Déconnecter",
																],
															}),
														}),
														s.jsxs(X, {
															children: [
																s.jsxs(Y, {
																	children: [
																		s.jsxs(Z, {
																			children: [
																				"Déconnecter le compte",
																				" ",
																				(l == null ? void 0 : l.name) ||
																					r.provider,
																			],
																		}),
																		s.jsxs(ee, {
																			children: [
																				"Êtes-vous sûr de vouloir déconnecter ce compte ? Vous ne pourrez plus vous connecter avec",
																				" ",
																				(l == null ? void 0 : l.name) ||
																					r.provider,
																				" sauf si vous le reconnectez manuellement.",
																			],
																		}),
																	],
																}),
																s.jsxs(se, {
																	children: [
																		s.jsx(te, { children: "Annuler" }),
																		s.jsx(re, {
																			onClick: () => m(r.provider),
																			className:
																				"bg-destructive text-destructive-foreground hover:bg-destructive/90",
																			children: "Déconnecter",
																		}),
																	],
																}),
															],
														}),
													],
												}),
										],
									},
									r.id,
								);
							}),
						],
					}),
				],
			}),
		],
	});
}
function xe() {
	const e = C.c(31),
		{ user: t } = T.useLoaderData();
	let a;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((a = s.jsxs("div", {
				children: [
					s.jsxs(b, {
						className: "flex items-center gap-2",
						children: [
							s.jsx(P, { className: "h-5 w-5" }),
							"Profil utilisateur",
						],
					}),
					s.jsx(D, {
						children: "Informations de votre profil et comptes connectés",
					}),
				],
			})),
			(e[0] = a))
		: (a = e[0]);
	let n;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((n = s.jsx(A, {
				children: s.jsxs("div", {
					className: "flex items-start justify-between",
					children: [
						a,
						s.jsx(G, {
							to: "/user/settings",
							children: s.jsxs(M, {
								variant: "outline",
								size: "sm",
								className: "gap-2",
								children: [
									s.jsx(ce, { className: "h-4 w-4" }),
									"Modifier le profil",
								],
							}),
						}),
					],
				}),
			})),
			(e[1] = n))
		: (n = e[1]);
	const c = t.image || void 0,
		o = t.firstName || "User";
	let i;
	e[2] !== c || e[3] !== o
		? ((i = s.jsx(R, { src: c, alt: o })), (e[2] = c), (e[3] = o), (e[4] = i))
		: (i = e[4]);
	let m;
	e[5] !== t.firstName[0]
		? ((m = s.jsx(I, { className: "text-lg", children: t.firstName[0] })),
			(e[5] = t.firstName[0]),
			(e[6] = m))
		: (m = e[6]);
	let r;
	e[7] !== i || e[8] !== m
		? ((r = s.jsxs(L, { className: "h-20 w-20", children: [i, m] })),
			(e[7] = i),
			(e[8] = m),
			(e[9] = r))
		: (r = e[9]);
	const l =
		t.firstName && t.lastName
			? `${t.firstName} ${t.lastName}`
			: t.firstName || t.lastName || "Utilisateur";
	let d;
	e[10] !== l
		? ((d = s.jsx("h3", { className: "text-xl font-semibold", children: l })),
			(e[10] = l),
			(e[11] = d))
		: (d = e[11]);
	let g;
	e[12] === Symbol.for("react.memo_cache_sentinel")
		? ((g = s.jsx(U, { className: "h-4 w-4" })), (e[12] = g))
		: (g = e[12]);
	let u;
	e[13] !== t.email
		? ((u = s.jsxs("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [g, s.jsx("span", { children: t.email })],
			})),
			(e[13] = t.email),
			(e[14] = u))
		: (u = e[14]);
	let f;
	e[15] !== u || e[16] !== d
		? ((f = s.jsxs("div", { children: [d, u] })),
			(e[15] = u),
			(e[16] = d),
			(e[17] = f))
		: (f = e[17]);
	let h;
	e[18] !== t.dateOfBirth
		? ((h =
				t.dateOfBirth &&
				s.jsxs("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						s.jsx(ie, { className: "h-4 w-4" }),
						s.jsxs("span", {
							children: ["Né(e) le ", _(t.dateOfBirth, "dd/MM/yyyy")],
						}),
					],
				})),
			(e[18] = t.dateOfBirth),
			(e[19] = h))
		: (h = e[19]);
	let j;
	e[20] !== f || e[21] !== h
		? ((j = s.jsxs("div", { className: "flex-1 space-y-3", children: [f, h] })),
			(e[20] = f),
			(e[21] = h),
			(e[22] = j))
		: (j = e[22]);
	let p;
	e[23] !== j || e[24] !== r
		? ((p = s.jsxs(y, {
				children: [
					n,
					s.jsx(w, {
						children: s.jsxs("div", {
							className: "flex items-start gap-6",
							children: [r, j],
						}),
					}),
				],
			})),
			(e[23] = j),
			(e[24] = r),
			(e[25] = p))
		: (p = e[25]);
	let N;
	e[26] !== t
		? ((N = s.jsx(de, { user: t })), (e[26] = t), (e[27] = N))
		: (N = e[27]);
	let v;
	return (
		e[28] !== p || e[29] !== N
			? ((v = s.jsxs("div", {
					className: "container max-w-4xl py-6 space-y-6",
					children: [p, N],
				})),
				(e[28] = p),
				(e[29] = N),
				(e[30] = v))
			: (v = e[30]),
		v
	);
}
const ke = () => {
	const t = C.c(1);
	let a;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((a = s.jsx(xe, {})), (t[0] = a))
			: (a = t[0]),
		a
	);
};
export { ke as component };
