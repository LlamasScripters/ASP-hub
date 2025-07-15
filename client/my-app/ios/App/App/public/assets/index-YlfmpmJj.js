import { A as be, b as ve, a as ye } from "./avatar-DIRgKWh1.js";
import { B as oe } from "./badge-BAidKpPB.js";
import { C as je } from "./calendar-De7tcxsN.js";
import { C as De } from "./chart-column-FJxLrytM.js";
import { C as Ce } from "./clock-Kg0fBwSd.js";
import { D as he } from "./download-CuCkG045.js";
import {
	K as Ne,
	C as a,
	j as e,
	B as h,
	b as i,
	f as l,
	d as o,
	c as pe,
	e as t,
} from "./index-kb-Ylywn.js";
import { P as we } from "./plus-czqh0ZLb.js";
import { P as d } from "./progress-DJazw1mq.js";
import { R as Se } from "./refresh-cw-D6CAsBlf.js";
import { T as _e, a as de, c as ge, b as xe } from "./tabs-BDMFlPtb.js";
import { T as ue } from "./trending-up-B4fnbcLX.js";
import { U as fe } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-Dl_6cIao.js";
import "./index-Bv1xjdPd.js";
import "./index-Dqr9Wf5M.js";
import "./index-BP52hRXm.js";
import "./index-3Axhna2x.js";
import "./index-CvBT1pZ2.js";
import "./index-BRam3N1Z.js";
const Pe = [
	{
		id: crypto.randomUUID(),
		name: "Sophie Martin",
		email: "s.martin@example.com",
		date: "12 mai 2025",
	},
	{
		id: crypto.randomUUID(),
		name: "Thomas Dubois",
		email: "t.dubois@example.com",
		date: "10 mai 2025",
	},
	{
		id: crypto.randomUUID(),
		name: "Emma Petit",
		email: "e.petit@example.com",
		date: "8 mai 2025",
	},
	{
		id: crypto.randomUUID(),
		name: "Lucas Bernard",
		email: "l.bernard@example.com",
		date: "5 mai 2025",
	},
	{
		id: crypto.randomUUID(),
		name: "Chloé Moreau",
		email: "c.moreau@example.com",
		date: "2 mai 2025",
	},
];
function Te(c) {
	const s = pe.c(56),
		{ user: n } = c;
	let m;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((m = e.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Tableau de bord",
			})),
			(s[0] = m))
		: (m = s[0]);
	let r;
	s[1] !== n.firstName
		? ((r = e.jsxs("div", {
				children: [
					m,
					e.jsxs("p", {
						className: "text-muted-foreground",
						children: [
							"Bienvenue, ",
							n.firstName,
							". Voici un aperçu de l'association.",
						],
					}),
				],
			})),
			(s[1] = n.firstName),
			(s[2] = r))
		: (r = s[2]);
	let f;
	s[3] === Symbol.for("react.memo_cache_sentinel")
		? ((f = e.jsxs(h, {
				variant: "outline",
				size: "sm",
				className: "h-9",
				children: [e.jsx(Se, { className: "w-4 h-4 mr-2" }), "Actualiser"],
			})),
			(s[3] = f))
		: (f = s[3]);
	let j;
	s[4] === Symbol.for("react.memo_cache_sentinel")
		? ((j = e.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					f,
					e.jsxs(h, {
						size: "sm",
						className: "h-9",
						children: [
							e.jsx(we, { className: "w-4 h-4 mr-2" }),
							"Ajouter un adhérent",
						],
					}),
				],
			})),
			(s[4] = j))
		: (j = s[4]);
	let x;
	s[5] !== r
		? ((x = e.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [r, j],
			})),
			(s[5] = r),
			(s[6] = x))
		: (x = s[6]);
	let u;
	s[7] === Symbol.for("react.memo_cache_sentinel")
		? ((u = e.jsxs(a, {
				className: "flex flex-row items-center justify-between pb-2 space-y-0",
				children: [
					e.jsx(i, { className: "text-sm font-medium", children: "Adhérents" }),
					e.jsx(fe, { className: "w-4 h-4 text-muted-foreground" }),
				],
			})),
			(s[7] = u))
		: (u = s[7]);
	let p, N;
	s[8] === Symbol.for("react.memo_cache_sentinel")
		? ((p = e.jsx("div", {
				className: "text-2xl font-bold",
				children: "1,547",
			})),
			(N = e.jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "+12% par rapport au mois dernier",
			})),
			(s[8] = p),
			(s[9] = N))
		: ((p = s[8]), (N = s[9]));
	let v;
	s[10] === Symbol.for("react.memo_cache_sentinel")
		? ((v = e.jsxs(t, {
				children: [
					u,
					e.jsxs(l, {
						children: [
							p,
							N,
							e.jsx("div", {
								className: "mt-4",
								children: e.jsx(d, { value: 75, className: "h-2" }),
							}),
						],
					}),
				],
			})),
			(s[10] = v))
		: (v = s[10]);
	let b;
	s[11] === Symbol.for("react.memo_cache_sentinel")
		? ((b = e.jsxs(a, {
				className: "flex flex-row items-center justify-between pb-2 space-y-0",
				children: [
					e.jsx(i, { className: "text-sm font-medium", children: "Activités" }),
					e.jsx(je, { className: "w-4 h-4 text-muted-foreground" }),
				],
			})),
			(s[11] = b))
		: (b = s[11]);
	let y, _;
	s[12] === Symbol.for("react.memo_cache_sentinel")
		? ((y = e.jsx("div", { className: "text-2xl font-bold", children: "24" })),
			(_ = e.jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "+2 nouvelles activités ce mois-ci",
			})),
			(s[12] = y),
			(s[13] = _))
		: ((y = s[12]), (_ = s[13]));
	let g;
	s[14] === Symbol.for("react.memo_cache_sentinel")
		? ((g = e.jsxs(t, {
				children: [
					b,
					e.jsxs(l, {
						children: [
							y,
							_,
							e.jsx("div", {
								className: "mt-4",
								children: e.jsx(d, { value: 60, className: "h-2" }),
							}),
						],
					}),
				],
			})),
			(s[14] = g))
		: (g = s[14]);
	let S;
	s[15] === Symbol.for("react.memo_cache_sentinel")
		? ((S = e.jsxs(a, {
				className: "flex flex-row items-center justify-between pb-2 space-y-0",
				children: [
					e.jsx(i, {
						className: "text-sm font-medium",
						children: "Projets sociaux",
					}),
					e.jsx(ue, { className: "w-4 h-4 text-muted-foreground" }),
				],
			})),
			(s[15] = S))
		: (S = s[15]);
	let w, C;
	s[16] === Symbol.for("react.memo_cache_sentinel")
		? ((w = e.jsx("div", { className: "text-2xl font-bold", children: "8" })),
			(C = e.jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "3 projets en cours, 5 terminés",
			})),
			(s[16] = w),
			(s[17] = C))
		: ((w = s[16]), (C = s[17]));
	let D;
	s[18] === Symbol.for("react.memo_cache_sentinel")
		? ((D = e.jsxs(t, {
				children: [
					S,
					e.jsxs(l, {
						children: [
							w,
							C,
							e.jsx("div", {
								className: "mt-4",
								children: e.jsx(d, { value: 40, className: "h-2" }),
							}),
						],
					}),
				],
			})),
			(s[18] = D))
		: (D = s[18]);
	let P;
	s[19] === Symbol.for("react.memo_cache_sentinel")
		? ((P = e.jsxs(a, {
				className: "flex flex-row items-center justify-between pb-2 space-y-0",
				children: [
					e.jsx(i, {
						className: "text-sm font-medium",
						children: "Événements à venir",
					}),
					e.jsx(Ce, { className: "w-4 h-4 text-muted-foreground" }),
				],
			})),
			(s[19] = P))
		: (P = s[19]);
	let T, A;
	s[20] === Symbol.for("react.memo_cache_sentinel")
		? ((T = e.jsx("div", { className: "text-2xl font-bold", children: "12" })),
			(A = e.jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Prochain événement dans 3 jours",
			})),
			(s[20] = T),
			(s[21] = A))
		: ((T = s[20]), (A = s[21]));
	let U;
	s[22] === Symbol.for("react.memo_cache_sentinel")
		? ((U = e.jsxs("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					v,
					g,
					D,
					e.jsxs(t, {
						children: [
							P,
							e.jsxs(l, {
								children: [
									T,
									A,
									e.jsx("div", {
										className: "mt-4",
										children: e.jsx(d, { value: 85, className: "h-2" }),
									}),
								],
							}),
						],
					}),
				],
			})),
			(s[22] = U))
		: (U = s[22]);
	let B;
	s[23] === Symbol.for("react.memo_cache_sentinel")
		? ((B = e.jsxs(_e, {
				children: [
					e.jsx(de, { value: "overview", children: "Vue d'ensemble" }),
					e.jsx(de, { value: "activities", children: "Activités" }),
					e.jsx(de, { value: "members", children: "Adhérents" }),
					e.jsx(de, { value: "projects", children: "Projets sociaux" }),
				],
			})),
			(s[23] = B))
		: (B = s[23]);
	let z;
	s[24] === Symbol.for("react.memo_cache_sentinel")
		? ((z = e.jsx(a, {
				children: e.jsx(i, { children: "Statistiques des adhésions" }),
			})),
			(s[24] = z))
		: (z = s[24]);
	let I;
	s[25] === Symbol.for("react.memo_cache_sentinel")
		? ((I = e.jsxs(t, {
				className: "lg:col-span-4",
				children: [
					z,
					e.jsx(l, {
						className: "pl-2",
						children: e.jsxs("div", {
							className:
								"h-[300px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
							children: [
								e.jsx(De, { className: "w-12 h-12" }),
								e.jsx("span", {
									className: "ml-2",
									children: "Graphique des adhésions",
								}),
							],
						}),
					}),
				],
			})),
			(s[25] = I))
		: (I = s[25]);
	let R;
	s[26] === Symbol.for("react.memo_cache_sentinel")
		? ((R = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Événements à venir" }),
					e.jsx(o, { children: "Les prochains événements de l'association" }),
				],
			})),
			(s[26] = R))
		: (R = s[26]);
	let L;
	s[27] === Symbol.for("react.memo_cache_sentinel")
		? ((L = e.jsx("div", {
				className: "w-2 h-2 mr-2 rounded-full bg-emerald-500",
			})),
			(s[27] = L))
		: (L = s[27]);
	let M;
	s[28] === Symbol.for("react.memo_cache_sentinel")
		? ((M = e.jsxs("div", {
				className: "flex items-center",
				children: [
					L,
					e.jsxs("div", {
						className: "flex-1 space-y-1",
						children: [
							e.jsx("p", {
								className: "text-sm font-medium leading-none",
								children: "Tournoi de football",
							}),
							e.jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "15 mai 2025 - Stade municipal",
							}),
						],
					}),
					e.jsx(oe, { children: "Sport" }),
				],
			})),
			(s[28] = M))
		: (M = s[28]);
	let F;
	s[29] === Symbol.for("react.memo_cache_sentinel")
		? ((F = e.jsx("div", {
				className: "w-2 h-2 mr-2 rounded-full bg-blue-500",
			})),
			(s[29] = F))
		: (F = s[29]);
	let k;
	s[30] === Symbol.for("react.memo_cache_sentinel")
		? ((k = e.jsxs("div", {
				className: "flex items-center",
				children: [
					F,
					e.jsxs("div", {
						className: "flex-1 space-y-1",
						children: [
							e.jsx("p", {
								className: "text-sm font-medium leading-none",
								children: "Atelier d'insertion professionnelle",
							}),
							e.jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "20 mai 2025 - Salle polyvalente",
							}),
						],
					}),
					e.jsx(oe, { variant: "outline", children: "Social" }),
				],
			})),
			(s[30] = k))
		: (k = s[30]);
	let E;
	s[31] === Symbol.for("react.memo_cache_sentinel")
		? ((E = e.jsx("div", {
				className: "w-2 h-2 mr-2 rounded-full bg-orange-500",
			})),
			(s[31] = E))
		: (E = s[31]);
	let G;
	s[32] === Symbol.for("react.memo_cache_sentinel")
		? ((G = e.jsxs("div", {
				className: "flex items-center",
				children: [
					E,
					e.jsxs("div", {
						className: "flex-1 space-y-1",
						children: [
							e.jsx("p", {
								className: "text-sm font-medium leading-none",
								children: "Compétition de natation",
							}),
							e.jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "28 mai 2025 - Piscine municipale",
							}),
						],
					}),
					e.jsx(oe, { children: "Sport" }),
				],
			})),
			(s[32] = G))
		: (G = s[32]);
	let H;
	s[33] === Symbol.for("react.memo_cache_sentinel")
		? ((H = e.jsx("div", {
				className: "w-2 h-2 mr-2 rounded-full bg-purple-500",
			})),
			(s[33] = H))
		: (H = s[33]);
	let V;
	s[34] === Symbol.for("react.memo_cache_sentinel")
		? ((V = e.jsxs("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7",
				children: [
					I,
					e.jsxs(t, {
						className: "lg:col-span-3",
						children: [
							R,
							e.jsx(l, {
								children: e.jsxs("div", {
									className: "space-y-4",
									children: [
										M,
										k,
										G,
										e.jsxs("div", {
											className: "flex items-center",
											children: [
												H,
												e.jsxs("div", {
													className: "flex-1 space-y-1",
													children: [
														e.jsx("p", {
															className: "text-sm font-medium leading-none",
															children: "Session de soutien scolaire",
														}),
														e.jsx("p", {
															className: "text-sm text-muted-foreground",
															children: "2 juin 2025 - Centre culturel",
														}),
													],
												}),
												e.jsx(oe, { variant: "outline", children: "Social" }),
											],
										}),
									],
								}),
							}),
						],
					}),
				],
			})),
			(s[34] = V))
		: (V = s[34]);
	let q;
	s[35] === Symbol.for("react.memo_cache_sentinel")
		? ((q = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Nouveaux adhérents" }),
					e.jsx(o, { children: "Les 5 derniers adhérents inscrits" }),
				],
			})),
			(s[35] = q))
		: (q = s[35]);
	let $;
	s[36] === Symbol.for("react.memo_cache_sentinel")
		? (($ = e.jsxs(t, {
				children: [
					q,
					e.jsx(l, {
						children: e.jsx("div", {
							className: "space-y-4",
							children: Pe.map(Ae),
						}),
					}),
				],
			})),
			(s[36] = $))
		: ($ = s[36]);
	let K;
	s[37] === Symbol.for("react.memo_cache_sentinel")
		? ((K = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Projets sociaux en cours" }),
					e.jsx(o, { children: "État d'avancement des projets" }),
				],
			})),
			(s[37] = K))
		: (K = s[37]);
	let J;
	s[38] === Symbol.for("react.memo_cache_sentinel")
		? ((J = e.jsxs("div", {
				className: "space-y-2",
				children: [
					e.jsxs("div", {
						className: "flex items-center justify-between",
						children: [
							e.jsx("div", {
								className: "text-sm font-medium",
								children: "Aide au permis de conduire",
							}),
							e.jsx("div", {
								className: "text-sm text-muted-foreground",
								children: "75%",
							}),
						],
					}),
					e.jsx(d, { value: 75, className: "h-2" }),
				],
			})),
			(s[38] = J))
		: (J = s[38]);
	let O;
	s[39] === Symbol.for("react.memo_cache_sentinel")
		? ((O = e.jsxs("div", {
				className: "space-y-2",
				children: [
					e.jsxs("div", {
						className: "flex items-center justify-between",
						children: [
							e.jsx("div", {
								className: "text-sm font-medium",
								children: "Soutien scolaire",
							}),
							e.jsx("div", {
								className: "text-sm text-muted-foreground",
								children: "60%",
							}),
						],
					}),
					e.jsx(d, { value: 60, className: "h-2" }),
				],
			})),
			(s[39] = O))
		: (O = s[39]);
	let Q;
	s[40] === Symbol.for("react.memo_cache_sentinel")
		? ((Q = e.jsxs(t, {
				children: [
					K,
					e.jsx(l, {
						children: e.jsxs("div", {
							className: "space-y-4",
							children: [
								J,
								O,
								e.jsxs("div", {
									className: "space-y-2",
									children: [
										e.jsxs("div", {
											className: "flex items-center justify-between",
											children: [
												e.jsx("div", {
													className: "text-sm font-medium",
													children: "Insertion professionnelle",
												}),
												e.jsx("div", {
													className: "text-sm text-muted-foreground",
													children: "45%",
												}),
											],
										}),
										e.jsx(d, { value: 45, className: "h-2" }),
									],
								}),
							],
						}),
					}),
				],
			})),
			(s[40] = Q))
		: (Q = s[40]);
	let W;
	s[41] === Symbol.for("react.memo_cache_sentinel")
		? ((W = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Rapports récents" }),
					e.jsx(o, { children: "Téléchargez les derniers rapports" }),
				],
			})),
			(s[41] = W))
		: (W = s[41]);
	let X;
	s[42] === Symbol.for("react.memo_cache_sentinel")
		? ((X = e.jsxs("div", {
				className: "space-y-1",
				children: [
					e.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Rapport financier - Avril 2025",
					}),
					e.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "PDF • 2.4 MB",
					}),
				],
			})),
			(s[42] = X))
		: (X = s[42]);
	let Y;
	s[43] === Symbol.for("react.memo_cache_sentinel")
		? ((Y = e.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					X,
					e.jsx(h, {
						variant: "ghost",
						size: "icon",
						children: e.jsx(he, { className: "w-4 h-4" }),
					}),
				],
			})),
			(s[43] = Y))
		: (Y = s[43]);
	let Z;
	s[44] === Symbol.for("react.memo_cache_sentinel")
		? ((Z = e.jsxs("div", {
				className: "space-y-1",
				children: [
					e.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Bilan des activités - T1 2025",
					}),
					e.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "PDF • 3.8 MB",
					}),
				],
			})),
			(s[44] = Z))
		: (Z = s[44]);
	let ee;
	s[45] === Symbol.for("react.memo_cache_sentinel")
		? ((ee = e.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					Z,
					e.jsx(h, {
						variant: "ghost",
						size: "icon",
						children: e.jsx(he, { className: "w-4 h-4" }),
					}),
				],
			})),
			(s[45] = ee))
		: (ee = s[45]);
	let se;
	s[46] === Symbol.for("react.memo_cache_sentinel")
		? ((se = e.jsxs("div", {
				className: "space-y-1",
				children: [
					e.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Impact des projets sociaux",
					}),
					e.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "PDF • 1.6 MB",
					}),
				],
			})),
			(s[46] = se))
		: (se = s[46]);
	let te;
	s[47] === Symbol.for("react.memo_cache_sentinel")
		? ((te = e.jsxs(xe, {
				value: "overview",
				className: "space-y-4",
				children: [
					V,
					e.jsxs("div", {
						className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
						children: [
							$,
							Q,
							e.jsxs(t, {
								children: [
									W,
									e.jsx(l, {
										children: e.jsxs("div", {
											className: "space-y-4",
											children: [
												Y,
												ee,
												e.jsxs("div", {
													className: "flex items-center justify-between",
													children: [
														se,
														e.jsx(h, {
															variant: "ghost",
															size: "icon",
															children: e.jsx(he, { className: "w-4 h-4" }),
														}),
													],
												}),
											],
										}),
									}),
								],
							}),
						],
					}),
				],
			})),
			(s[47] = te))
		: (te = s[47]);
	let le;
	s[48] === Symbol.for("react.memo_cache_sentinel")
		? ((le = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Activités sportives" }),
					e.jsx(o, {
						children: "Gérez les activités et les plannings d'entraînement",
					}),
				],
			})),
			(s[48] = le))
		: (le = s[48]);
	let ae;
	s[49] === Symbol.for("react.memo_cache_sentinel")
		? ((ae = e.jsx(xe, {
				value: "activities",
				className: "space-y-4",
				children: e.jsxs(t, {
					children: [
						le,
						e.jsx(l, {
							children: e.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									e.jsx(je, { className: "w-12 h-12" }),
									e.jsx("span", {
										className: "ml-2",
										children: "Contenu des activités à venir",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(s[49] = ae))
		: (ae = s[49]);
	let ie;
	s[50] === Symbol.for("react.memo_cache_sentinel")
		? ((ie = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Liste des adhérents" }),
					e.jsx(o, {
						children: "Gérez les profils et les cotisations des adhérents",
					}),
				],
			})),
			(s[50] = ie))
		: (ie = s[50]);
	let ce;
	s[51] === Symbol.for("react.memo_cache_sentinel")
		? ((ce = e.jsx(xe, {
				value: "members",
				className: "space-y-4",
				children: e.jsxs(t, {
					children: [
						ie,
						e.jsx(l, {
							children: e.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									e.jsx(fe, { className: "w-12 h-12" }),
									e.jsx("span", {
										className: "ml-2",
										children: "Tableau des adhérents à venir",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(s[51] = ce))
		: (ce = s[51]);
	let re;
	s[52] === Symbol.for("react.memo_cache_sentinel")
		? ((re = e.jsxs(a, {
				children: [
					e.jsx(i, { children: "Projets sociaux" }),
					e.jsx(o, {
						children: "Suivez l'avancement des initiatives sociales",
					}),
				],
			})),
			(s[52] = re))
		: (re = s[52]);
	let ne;
	s[53] === Symbol.for("react.memo_cache_sentinel")
		? ((ne = e.jsxs(ge, {
				defaultValue: "overview",
				className: "space-y-4",
				children: [
					B,
					te,
					ae,
					ce,
					e.jsx(xe, {
						value: "projects",
						className: "space-y-4",
						children: e.jsxs(t, {
							children: [
								re,
								e.jsx(l, {
									children: e.jsxs("div", {
										className:
											"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
										children: [
											e.jsx(ue, { className: "w-12 h-12" }),
											e.jsx("span", {
												className: "ml-2",
												children: "Suivi des projets à venir",
											}),
										],
									}),
								}),
							],
						}),
					}),
				],
			})),
			(s[53] = ne))
		: (ne = s[53]);
	let me;
	return (
		s[54] !== x
			? ((me = e.jsxs("div", { className: "space-y-6", children: [x, U, ne] })),
				(s[54] = x),
				(s[55] = me))
			: (me = s[55]),
		me
	);
}
function Ae(c) {
	return e.jsxs(
		"div",
		{
			className: "flex items-center",
			children: [
				e.jsxs(ve, {
					className: "h-9 w-9",
					children: [
						e.jsx(be, {
							src: "/placeholder.svg?height=36&width=36",
							alt: c.name,
						}),
						e.jsx(ye, { children: c.name.split(" ").map(Ue).join("") }),
					],
				}),
				e.jsxs("div", {
					className: "ml-4 space-y-1",
					children: [
						e.jsx("p", {
							className: "text-sm font-medium leading-none",
							children: c.name,
						}),
						e.jsx("p", {
							className: "text-sm text-muted-foreground",
							children: c.email,
						}),
					],
				}),
				e.jsx("div", {
					className: "ml-auto text-sm text-muted-foreground",
					children: c.date,
				}),
			],
		},
		c.id,
	);
}
function Ue(c) {
	return c[0];
}
const Ze = () => {
	const s = pe.c(3);
	let n;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((n = { from: "/_authenticated" }), (s[0] = n))
		: (n = s[0]);
	const { user: m } = Ne(n);
	let r;
	return (
		s[1] !== m
			? ((r = e.jsx(Te, { user: m })), (s[1] = m), (s[2] = r))
			: (r = s[2]),
		r
	);
};
export { Ze as component };
