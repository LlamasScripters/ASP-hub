import { A as xt } from "./arrow-left-DMyOJown.js";
import { B as W } from "./badge-BAidKpPB.js";
import { B as ft } from "./building-Dpa0VlEa.js";
import { C as Es } from "./calendar-De7tcxsN.js";
import { C as Hs, A as Vs } from "./car-DIHhrsj8.js";
import { C as gt } from "./chart-column-FJxLrytM.js";
import { C as dt } from "./chevron-left-BhVEjMY-.js";
import { C as mt } from "./chevron-right-QFzs-bqo.js";
import { C as ot } from "./circle-off-Dnl33VGr.js";
import {
	e as Ds,
	d as Ks,
	D as Ps,
	b as Qs,
	a as Xs,
	c as Ys,
} from "./dropdown-menu-B4Bx1zOg.js";
import { E as nt } from "./ellipsis-CnaDov9f.js";
import { F as at } from "./funnel-DNedUVhi.js";
import {
	d as $e,
	c as $s,
	B,
	a as Bs,
	K as Gs,
	r as M,
	f as N,
	i as Us,
	bI as Ws,
	b as g,
	C as j,
	e as p,
	L as qe,
	bW as qs,
	j as s,
	N as zs,
} from "./index-kb-Ylywn.js";
import { I as et } from "./input-CdkcPZS3.js";
import { L as ct } from "./loader-circle-Bxgg9gFD.js";
import { M as jt } from "./map-pin-DywQhs4x.js";
import { P as rt } from "./plus-czqh0ZLb.js";
import { S as it } from "./search-CT8NOJQT.js";
import {
	c as Fs,
	a as Is,
	S as Ms,
	d as O,
	b as ks,
} from "./select-D8GIfri3.js";
import { S as ht } from "./square-pen-s7PUkmhH.js";
import {
	a as Be,
	b as Ve,
	e as k,
	d as lt,
	c as st,
	T as tt,
} from "./table-De-kdsVW.js";
import { c as Js, T as Zs, b as vs, a as ys } from "./tabs-BDMFlPtb.js";
import { T as pt } from "./timer-l0uyiV2G.js";
import { U as ut } from "./users-BMY-28E4.js";
import { W as Ls } from "./warehouse-BXw1dHMx.js";
import "./index-Dqr9Wf5M.js";
import "./index-DauBq6FI.js";
import "./index-BP52hRXm.js";
import "./index-3Axhna2x.js";
import "./index-CvBT1pZ2.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
import "./index-CnLXGm6V.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-mnH6Jux_.js";
import "./index-C6LbJ2-_.js";
import "./chevron-down-CMzABl4R.js";
import "./chevron-up-DyH28r2x.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nt = [
		[
			"path",
			{
				d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
				key: "cpyugq",
			},
		],
		["path", { d: "M12 22v-3", key: "kmzjlo" }],
	],
	Os = Bs("tree-pine", Nt);
function bt({ complexId: i, initialRooms: e }) {
	const [t, a] = M.useState(""),
		[n, b] = M.useState(1),
		[m, F] = M.useState("all"),
		[h, Oe] = M.useState("all"),
		[x, q] = M.useState("all"),
		z = 10,
		{
			rooms: o,
			loading: G,
			error: u,
			deleteRoom: S,
		} = qs({ complexId: i, initialData: e }),
		v = o.length > 0 ? o : e,
		U = M.useMemo(
			() => Array.from(new Set(v.map((r) => r.sportType))).sort(),
			[v],
		),
		d = M.useMemo(() => {
			let l = v;
			if (t) {
				const r = t.toLowerCase();
				l = l.filter((c) => {
					var y;
					return (
						c.name.toLowerCase().includes(r) ||
						c.sportType.toLowerCase().includes(r) ||
						((y = c.accreditation) == null
							? void 0
							: y.toLowerCase().includes(r))
					);
				});
			}
			return (
				m !== "all" && (l = l.filter((r) => r.sportType === m)),
				h !== "all" &&
					(l = l.filter((r) =>
						h === "indoor" ? r.isIndoor : h === "outdoor" ? !r.isIndoor : !0,
					)),
				x !== "all" &&
					(l = l.filter((r) =>
						x === "with-accreditation"
							? r.accreditation && r.accreditation.trim() !== ""
							: x === "without-accreditation"
								? !r.accreditation || r.accreditation.trim() === ""
								: !0,
					)),
				l
			);
		}, [v, t, m, h, x]),
		f = Math.ceil(d.length / z),
		C = (n - 1) * z,
		I = C + z,
		T = d.slice(C, I);
	M.useEffect(() => {
		b(1);
	}, []);
	const _ = (l) => {
			a(l);
		},
		L = async (l) => {
			window.confirm(
				`Êtes-vous sûr de vouloir supprimer la salle "${l.name}" ?`,
			) && (await S(l.id));
		},
		E = (l) =>
			new Date(l).toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
		D = (l) =>
			({
				Football: "bg-green-100 text-green-800",
				Basketball: "bg-orange-100 text-orange-800",
				Tennis: "bg-yellow-100 text-yellow-800",
				Volleyball: "bg-blue-100 text-blue-800",
				Handball: "bg-red-100 text-red-800",
				Natation: "bg-cyan-100 text-cyan-800",
				Gymnastique: "bg-purple-100 text-purple-800",
				Judo: "bg-indigo-100 text-indigo-800",
				Danse: "bg-pink-100 text-pink-800",
				Fitness: "bg-emerald-100 text-emerald-800",
			})[l] || "bg-muted/50 text-muted-foreground border-muted",
		A = (l) => {
			b(l);
		},
		H = () => {
			n < f && b(n + 1);
		},
		R = () => {
			n > 1 && b(n - 1);
		},
		V = () => {
			const l = [];
			if (f <= 5) for (let c = 1; c <= f; c++) l.push(c);
			else {
				const c = Math.max(1, n - 2),
					y = Math.min(f, c + 5 - 1);
				for (let P = c; P <= y; P++) l.push(P);
			}
			return l;
		};
	return s.jsxs(p, {
		children: [
			s.jsx(j, {
				children: s.jsxs("div", {
					className:
						"flex flex-col justify-between gap-4 md:flex-row md:items-center",
					children: [
						s.jsxs("div", {
							children: [
								s.jsx(g, { children: "Salles du complexe" }),
								s.jsxs($e, {
									children: [
										d.length,
										" salle",
										d.length > 1 ? "s" : "",
										" ",
										"trouvée",
										d.length > 1 ? "s" : "",
										d.length !== v.length && ` sur ${v.length} au total`,
									],
								}),
							],
						}),
						s.jsx(B, {
							asChild: !0,
							children: s.jsxs(qe, {
								to: "/admin/facilities/complexes/$complexId/create-room",
								params: { complexId: i },
								children: [
									s.jsx(rt, { className: "w-4 h-4 mr-2" }),
									"Nouvelle salle",
								],
							}),
						}),
					],
				}),
			}),
			s.jsxs(N, {
				children: [
					s.jsxs("div", {
						className: "flex flex-col gap-4 mb-6",
						children: [
							s.jsxs("div", {
								className: "flex flex-col gap-4 md:flex-row",
								children: [
									s.jsxs("div", {
										className: "relative flex-1",
										children: [
											s.jsx(it, {
												className:
													"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
											}),
											s.jsx(et, {
												placeholder:
													"Rechercher une salle par nom, sport ou accréditation...",
												className: "pl-8",
												value: t,
												onChange: (l) => _(l.target.value),
											}),
										],
									}),
									s.jsxs("div", {
										className: "flex gap-2",
										children: [
											s.jsxs(Ms, {
												value: m,
												onValueChange: F,
												children: [
													s.jsx(Is, {
														className: "w-[150px]",
														children: s.jsx(ks, {
															placeholder: "Type de sport",
														}),
													}),
													s.jsxs(Fs, {
														children: [
															s.jsx(O, {
																value: "all",
																children: "Tous les sports",
															}),
															U.map((l) =>
																s.jsx(O, { value: l, children: l }, l),
															),
														],
													}),
												],
											}),
											s.jsxs(Ms, {
												value: h,
												onValueChange: Oe,
												children: [
													s.jsx(Is, {
														className: "w-[140px]",
														children: s.jsx(ks, {
															placeholder: "Type de salle",
														}),
													}),
													s.jsxs(Fs, {
														children: [
															s.jsx(O, { value: "all", children: "Toutes" }),
															s.jsx(O, {
																value: "indoor",
																children: "Intérieure",
															}),
															s.jsx(O, {
																value: "outdoor",
																children: "Extérieure",
															}),
														],
													}),
												],
											}),
											s.jsxs(Ms, {
												value: x,
												onValueChange: q,
												children: [
													s.jsx(Is, {
														className: "w-[140px]",
														children: s.jsx(ks, {
															placeholder: "Accréditation",
														}),
													}),
													s.jsxs(Fs, {
														children: [
															s.jsx(O, { value: "all", children: "Toutes" }),
															s.jsx(O, {
																value: "with-accreditation",
																children: "Avec",
															}),
															s.jsx(O, {
																value: "without-accreditation",
																children: "Sans",
															}),
														],
													}),
												],
											}),
										],
									}),
								],
							}),
							(t || m !== "all" || h !== "all" || x !== "all") &&
								s.jsxs("div", {
									className:
										"flex items-center gap-2 text-sm text-muted-foreground",
									children: [
										s.jsx(at, { className: "w-4 h-4" }),
										s.jsx("span", { children: "Filtres actifs:" }),
										t &&
											s.jsxs(W, {
												variant: "secondary",
												children: ["Recherche: ", t],
											}),
										m !== "all" &&
											s.jsxs(W, {
												variant: "secondary",
												children: ["Sport: ", m],
											}),
										h !== "all" &&
											s.jsxs(W, {
												variant: "secondary",
												children: [
													"Type:",
													" ",
													h === "indoor" ? "Intérieure" : "Extérieure",
												],
											}),
										x !== "all" &&
											s.jsxs(W, {
												variant: "secondary",
												children: [
													"Accréditation:",
													" ",
													x === "with-accreditation" ? "Avec" : "Sans",
												],
											}),
										s.jsx(B, {
											variant: "ghost",
											size: "sm",
											onClick: () => {
												a(""), F("all"), Oe("all"), q("all");
											},
											children: "Effacer",
										}),
									],
								}),
						],
					}),
					s.jsx("div", {
						className: "border rounded-md",
						children: s.jsxs(st, {
							children: [
								s.jsx(tt, {
									children: s.jsxs(Be, {
										children: [
											s.jsx(Ve, { children: "Salle" }),
											s.jsx(Ve, { children: "Sport" }),
											s.jsx(Ve, { children: "Type" }),
											s.jsx(Ve, { children: "Accréditation" }),
											s.jsx(Ve, { children: "Créée le" }),
											s.jsx(Ve, { className: "w-[80px]", children: "Actions" }),
										],
									}),
								}),
								s.jsx(lt, {
									children: G
										? s.jsx(Be, {
												children: s.jsx(k, {
													colSpan: 6,
													className: "h-24 text-center",
													children: s.jsxs("div", {
														className: "flex items-center justify-center",
														children: [
															s.jsx(ct, {
																className: "w-6 h-6 animate-spin mr-2",
															}),
															"Chargement...",
														],
													}),
												}),
											})
										: u
											? s.jsx(Be, {
													children: s.jsx(k, {
														colSpan: 6,
														className: "h-24 text-center text-red-500",
														children: u,
													}),
												})
											: T.length > 0
												? T.map((l) =>
														s.jsxs(
															Be,
															{
																children: [
																	s.jsx(k, {
																		children: s.jsxs("div", {
																			className: "flex items-center",
																			children: [
																				s.jsx(Ls, {
																					className:
																						"w-4 h-4 mr-3 text-muted-foreground",
																				}),
																				s.jsxs("div", {
																					children: [
																						s.jsx("div", {
																							className: "font-medium",
																							children: l.name,
																						}),
																						s.jsxs("div", {
																							className:
																								"text-sm text-muted-foreground",
																							children: [
																								"ID: ",
																								l.id.slice(0, 8),
																								"...",
																							],
																						}),
																					],
																				}),
																			],
																		}),
																	}),
																	s.jsx(k, {
																		children: s.jsx(W, {
																			variant: "outline",
																			className: D(l.sportType),
																			children: l.sportType,
																		}),
																	}),
																	s.jsx(k, {
																		children: s.jsx("div", {
																			className: "flex items-center gap-2",
																			children: l.isIndoor
																				? s.jsxs(s.Fragment, {
																						children: [
																							s.jsx(Ls, {
																								className:
																									"w-4 h-4 text-blue-600",
																							}),
																							s.jsx("span", {
																								className: "text-sm",
																								children: "Intérieure",
																							}),
																						],
																					})
																				: s.jsxs(s.Fragment, {
																						children: [
																							s.jsx(Os, {
																								className:
																									"w-4 h-4 text-green-600",
																							}),
																							s.jsx("span", {
																								className: "text-sm",
																								children: "Extérieure",
																							}),
																						],
																					}),
																		}),
																	}),
																	s.jsx(k, {
																		children: l.accreditation
																			? s.jsx("div", {
																					className: "text-sm",
																					children: l.accreditation,
																				})
																			: s.jsx("span", {
																					className:
																						"text-muted-foreground text-sm",
																					children: "Aucune",
																				}),
																	}),
																	s.jsx(k, {
																		children: s.jsxs("div", {
																			className:
																				"flex items-center text-sm text-muted-foreground",
																			children: [
																				s.jsx(Es, {
																					className: "w-3 h-3 mr-1",
																				}),
																				E(l.createdAt),
																			],
																		}),
																	}),
																	s.jsx(k, {
																		children: s.jsxs(Qs, {
																			children: [
																				s.jsx(Xs, {
																					asChild: !0,
																					children: s.jsxs(B, {
																						variant: "ghost",
																						size: "icon",
																						children: [
																							s.jsx(nt, {
																								className: "h-4 w-4",
																							}),
																							s.jsx("span", {
																								className: "sr-only",
																								children: "Menu",
																							}),
																						],
																					}),
																				}),
																				s.jsxs(Ys, {
																					align: "end",
																					children: [
																						s.jsx(Ks, { children: "Actions" }),
																						s.jsx(Ds, {}),
																						s.jsx(Ps, {
																							asChild: !0,
																							children: s.jsx(qe, {
																								to: "/admin/facilities/rooms/$roomId",
																								params: { roomId: l.id },
																								className:
																									"w-full cursor-pointer",
																								children: "Voir les détails",
																							}),
																						}),
																						s.jsx(Ps, {
																							asChild: !0,
																							children: s.jsx(qe, {
																								to: "/admin/facilities/rooms/$roomId/edit",
																								params: { roomId: l.id },
																								className:
																									"w-full cursor-pointer",
																								children: "Modifier",
																							}),
																						}),
																						s.jsx(Ds, {}),
																						s.jsx(Ps, {
																							className: "text-red-600",
																							onClick: () => L(l),
																							children: "Supprimer",
																						}),
																					],
																				}),
																			],
																		}),
																	}),
																],
															},
															l.id,
														),
													)
												: s.jsx(Be, {
														children: s.jsx(k, {
															colSpan: 6,
															className: "h-24 text-center",
															children: s.jsxs("div", {
																className: "text-center",
																children: [
																	s.jsx(ot, {
																		className:
																			"w-12 h-12 mx-auto text-gray-400 mb-4",
																	}),
																	s.jsx("h3", {
																		className:
																			"text-lg font-medium text-gray-900 mb-2",
																		children: "Aucune salle trouvée",
																	}),
																	s.jsx("p", {
																		className: "text-gray-500 mb-4",
																		children:
																			t ||
																			m !== "all" ||
																			h !== "all" ||
																			x !== "all"
																				? "Aucune salle ne correspond à vos critères de recherche."
																				: "Commencez par créer votre première salle.",
																	}),
																],
															}),
														}),
													}),
								}),
							],
						}),
					}),
					f > 1 &&
						s.jsxs("div", {
							className: "flex items-center justify-between mt-4",
							children: [
								s.jsxs("div", {
									className: "text-sm text-muted-foreground",
									children: [
										"Affichage de ",
										C + 1,
										" à",
										" ",
										Math.min(I, d.length),
										" sur",
										" ",
										d.length,
										" salles",
									],
								}),
								s.jsxs("div", {
									className: "flex items-center space-x-2",
									children: [
										s.jsxs(B, {
											variant: "outline",
											size: "icon",
											onClick: R,
											disabled: n === 1,
											children: [
												s.jsx(dt, { className: "h-4 w-4" }),
												s.jsx("span", {
													className: "sr-only",
													children: "Page précédente",
												}),
											],
										}),
										s.jsx("div", {
											className: "flex items-center space-x-1",
											children: V().map((l) =>
												s.jsx(
													B,
													{
														variant: n === l ? "default" : "outline",
														size: "sm",
														onClick: () => A(l),
														children: l,
													},
													l,
												),
											),
										}),
										s.jsxs(B, {
											variant: "outline",
											size: "icon",
											onClick: H,
											disabled: n === f,
											children: [
												s.jsx(mt, { className: "h-4 w-4" }),
												s.jsx("span", {
													className: "sr-only",
													children: "Page suivante",
												}),
											],
										}),
									],
								}),
							],
						}),
				],
			}),
		],
	});
}
function vt(i) {
	const e = $s.c(221),
		{ complex: t, initialRooms: a } = i;
	let n;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((n = { strict: !1 }), (e[0] = n))
		: (n = e[0]);
	const b = zs(n),
		m = Us(),
		F = b.view ?? "overview",
		[h, Oe] = M.useState(F);
	let x, q;
	e[1] !== F
		? ((x = () => {
				Oe(F);
			}),
			(q = [F]),
			(e[1] = F),
			(e[2] = x),
			(e[3] = q))
		: ((x = e[2]), (q = e[3])),
		M.useEffect(x, q);
	const z = _t,
		o = a.length;
	let G;
	e[4] !== a ? ((G = a.filter(Tt)), (e[4] = a), (e[5] = G)) : (G = e[5]);
	const u = G.length,
		S = o - u;
	let v;
	e[6] !== a ? ((v = a.filter(Ct)), (e[6] = a), (e[7] = v)) : (v = e[7]);
	const U = v.length;
	let d, f, C, I, T, _, L, E, D, A, H, R, V, l, r, c, y, P, $, J;
	if (
		e[8] !== U ||
		e[9] !== t.accessibleForReducedMobility ||
		e[10] !== t.city ||
		e[11] !== t.createdAt ||
		e[12] !== t.description ||
		e[13] !== t.id ||
		e[14] !== t.name ||
		e[15] !== t.numberOfElevators ||
		e[16] !== t.openingHours ||
		e[17] !== t.parkingCapacity ||
		e[18] !== t.postalCode ||
		e[19] !== t.street ||
		e[20] !== h ||
		e[21] !== u ||
		e[22] !== a ||
		e[23] !== m ||
		e[24] !== S ||
		e[25] !== o
	) {
		(T = a.reduce(St, {})), (V = "space-y-6");
		let me;
		e[46] !== t.name
			? ((me = s.jsx("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: t.name,
				})),
				(e[46] = t.name),
				(e[47] = me))
			: (me = e[47]);
		let xe;
		e[48] !== t.description
			? ((xe = s.jsx("p", {
					className: "text-muted-foreground",
					children: t.description,
				})),
				(e[48] = t.description),
				(e[49] = xe))
			: (xe = e[49]);
		let he;
		e[50] !== me || e[51] !== xe
			? ((he = s.jsxs("div", { children: [me, xe] })),
				(e[50] = me),
				(e[51] = xe),
				(e[52] = he))
			: (he = e[52]);
		let ls;
		e[53] === Symbol.for("react.memo_cache_sentinel")
			? ((ls = s.jsx(B, {
					asChild: !0,
					variant: "outline",
					size: "sm",
					children: s.jsxs(qe, {
						to: "/admin/facilities/complexes",
						search: { view: "complexes" },
						children: [
							s.jsx(xt, { className: "w-4 h-4 mr-2" }),
							"Retour à la liste",
						],
					}),
				})),
				(e[53] = ls))
			: (ls = e[53]);
		let fe;
		e[54] !== t.id
			? ((fe = { complexId: t.id }), (e[54] = t.id), (e[55] = fe))
			: (fe = e[55]);
		let rs;
		e[56] === Symbol.for("react.memo_cache_sentinel")
			? ((rs = s.jsx(ht, { className: "w-4 h-4 mr-2" })), (e[56] = rs))
			: (rs = e[56]);
		let ue;
		e[57] !== fe
			? ((ue = s.jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						ls,
						s.jsx(B, {
							asChild: !0,
							children: s.jsxs(qe, {
								to: "/admin/facilities/complexes/$complexId/edit",
								params: fe,
								children: [rs, "Modifier"],
							}),
						}),
					],
				})),
				(e[57] = fe),
				(e[58] = ue))
			: (ue = e[58]),
			e[59] !== he || e[60] !== ue
				? ((l = s.jsxs("div", {
						className:
							"flex flex-col justify-between gap-4 md:flex-row md:items-center",
						children: [he, ue],
					})),
					(e[59] = he),
					(e[60] = ue),
					(e[61] = l))
				: (l = e[61]);
		let is;
		e[62] === Symbol.for("react.memo_cache_sentinel")
			? ((is = s.jsxs(j, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(g, { className: "text-sm font-medium", children: "Salles" }),
						s.jsx(ft, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[62] = is))
			: (is = e[62]);
		let pe;
		e[63] !== o
			? ((pe = s.jsx("div", { className: "text-2xl font-bold", children: o })),
				(e[63] = o),
				(e[64] = pe))
			: (pe = e[64]);
		let je;
		e[65] !== u || e[66] !== S
			? ((je = s.jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [u, " intérieures • ", S, " extérieures"],
				})),
				(e[65] = u),
				(e[66] = S),
				(e[67] = je))
			: (je = e[67]);
		let ge;
		e[68] !== pe || e[69] !== je
			? ((ge = s.jsxs(p, {
					children: [is, s.jsxs(N, { children: [pe, je] })],
				})),
				(e[68] = pe),
				(e[69] = je),
				(e[70] = ge))
			: (ge = e[70]);
		let as;
		e[71] === Symbol.for("react.memo_cache_sentinel")
			? ((as = s.jsxs(j, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(g, {
							className: "text-sm font-medium",
							children: "Accréditations",
						}),
						s.jsx(ut, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[71] = as))
			: (as = e[71]);
		let Ne;
		e[72] !== U
			? ((Ne = s.jsx("div", { className: "text-2xl font-bold", children: U })),
				(e[72] = U),
				(e[73] = Ne))
			: (Ne = e[73]);
		let cs;
		e[74] === Symbol.for("react.memo_cache_sentinel")
			? ((cs = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Salles certifiées",
				})),
				(e[74] = cs))
			: (cs = e[74]);
		let be;
		e[75] !== Ne
			? ((be = s.jsxs(p, {
					children: [as, s.jsxs(N, { children: [Ne, cs] })],
				})),
				(e[75] = Ne),
				(e[76] = be))
			: (be = e[76]);
		let ns;
		e[77] === Symbol.for("react.memo_cache_sentinel")
			? ((ns = s.jsxs(j, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(g, { className: "text-sm font-medium", children: "Parking" }),
						s.jsx(Hs, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[77] = ns))
			: (ns = e[77]);
		let ve;
		e[78] !== t.parkingCapacity
			? ((ve = s.jsx("div", {
					className: "text-2xl font-bold",
					children: t.parkingCapacity,
				})),
				(e[78] = t.parkingCapacity),
				(e[79] = ve))
			: (ve = e[79]);
		let os;
		e[80] === Symbol.for("react.memo_cache_sentinel")
			? ((os = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Places disponibles",
				})),
				(e[80] = os))
			: (os = e[80]);
		let ye;
		e[81] !== ve
			? ((ye = s.jsxs(p, {
					children: [ns, s.jsxs(N, { children: [ve, os] })],
				})),
				(e[81] = ve),
				(e[82] = ye))
			: (ye = e[82]);
		let ds;
		e[83] === Symbol.for("react.memo_cache_sentinel")
			? ((ds = s.jsxs(j, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(g, {
							className: "text-sm font-medium",
							children: "Accessibilité",
						}),
						s.jsx(Vs, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[83] = ds))
			: (ds = e[83]);
		let we;
		e[84] !== t.numberOfElevators
			? ((we = s.jsx("div", {
					className: "text-2xl font-bold",
					children: t.numberOfElevators,
				})),
				(e[84] = t.numberOfElevators),
				(e[85] = we))
			: (we = e[85]);
		const ws = t.accessibleForReducedMobility ? "PMR ✓" : "Standard";
		let Se;
		e[86] !== ws
			? ((Se = s.jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: ["Ascenseurs •", " ", ws],
				})),
				(e[86] = ws),
				(e[87] = Se))
			: (Se = e[87]);
		let Ce;
		e[88] !== we || e[89] !== Se
			? ((Ce = s.jsxs(p, {
					children: [ds, s.jsxs(N, { children: [we, Se] })],
				})),
				(e[88] = we),
				(e[89] = Se),
				(e[90] = Ce))
			: (Ce = e[90]),
			e[91] !== ge || e[92] !== be || e[93] !== ye || e[94] !== Ce
				? ((r = s.jsxs("div", {
						className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
						children: [ge, be, ye, Ce],
					})),
					(e[91] = ge),
					(e[92] = be),
					(e[93] = ye),
					(e[94] = Ce),
					(e[95] = r))
				: (r = e[95]);
		let ms;
		e[96] === Symbol.for("react.memo_cache_sentinel")
			? ((ms = s.jsx(j, {
					children: s.jsxs(g, {
						className: "flex items-center gap-2",
						children: [
							s.jsx(pt, { className: "w-4 h-4" }),
							"Horaires d'ouverture",
						],
					}),
				})),
				(e[96] = ms))
			: (ms = e[96]);
		let xs;
		e[97] === Symbol.for("react.memo_cache_sentinel")
			? ((xs = [
					"monday",
					"tuesday",
					"wednesday",
					"thursday",
					"friday",
					"saturday",
					"sunday",
				]),
				(e[97] = xs))
			: (xs = e[97]);
		let Te;
		e[98] !== t.openingHours
			? ((Te = s.jsx("div", {
					className: "grid gap-2 md:grid-cols-2 lg:grid-cols-7",
					children: xs.map((He) => {
						const w = t.openingHours[He];
						return s.jsxs(
							"div",
							{
								className: "flex flex-col items-center p-3 border rounded-lg",
								children: [
									s.jsx("span", {
										className: "text-sm font-medium mb-1",
										children: Ws[He],
									}),
									s.jsx("span", {
										className: "text-sm text-muted-foreground text-center",
										children:
											w != null && w.closed
												? "Fermé"
												: `${w == null ? void 0 : w.open} - ${w == null ? void 0 : w.close}`,
									}),
								],
							},
							He,
						);
					}),
				})),
				(e[98] = t.openingHours),
				(e[99] = Te))
			: (Te = e[99]);
		const Ss = Object.values(t.openingHours).some(wt)
			? "Le complexe est fermé certains jours"
			: "Ouvert tous les jours";
		let _e;
		e[100] !== Ss
			? ((_e = s.jsx("p", {
					className: "text-xs text-muted-foreground mt-4 text-center",
					children: Ss,
				})),
				(e[100] = Ss),
				(e[101] = _e))
			: (_e = e[101]),
			e[102] !== Te || e[103] !== _e
				? ((c = s.jsxs(p, {
						children: [ms, s.jsxs(N, { children: [Te, _e] })],
					})),
					(e[102] = Te),
					(e[103] = _e),
					(e[104] = c))
				: (c = e[104]),
			(I = Js),
			(D = h),
			e[105] !== m
				? ((A = (He) => {
						Oe(He), m({ search: (w) => ({ ...w, view: He }) });
					}),
					(e[105] = m),
					(e[106] = A))
				: (A = e[106]),
			(H = "space-y-4");
		let hs;
		e[107] === Symbol.for("react.memo_cache_sentinel")
			? ((hs = s.jsx(ys, { value: "overview", children: "Vue d'ensemble" })),
				(e[107] = hs))
			: (hs = e[107]);
		let Ae;
		e[108] !== o
			? ((Ae = s.jsxs(ys, { value: "rooms", children: ["Salles (", o, ")"] })),
				(e[108] = o),
				(e[109] = Ae))
			: (Ae = e[109]);
		let fs, us;
		e[110] === Symbol.for("react.memo_cache_sentinel")
			? ((fs = s.jsx(ys, { value: "planning", children: "Planning" })),
				(us = s.jsx(ys, { value: "stats", children: "Statistiques" })),
				(e[110] = fs),
				(e[111] = us))
			: ((fs = e[110]), (us = e[111])),
			e[112] !== Ae
				? ((R = s.jsxs(Zs, { children: [hs, Ae, fs, us] })),
					(e[112] = Ae),
					(e[113] = R))
				: (R = e[113]),
			(C = vs),
			(L = "overview"),
			(E = "space-y-4"),
			(J = "grid gap-4 md:grid-cols-2");
		let ps;
		e[114] === Symbol.for("react.memo_cache_sentinel")
			? ((ps = s.jsx(j, {
					children: s.jsx(g, {
						className: "flex items-center gap-2",
						children: "Informations du complexe",
					}),
				})),
				(e[114] = ps))
			: (ps = e[114]);
		let js;
		e[115] === Symbol.for("react.memo_cache_sentinel")
			? ((js = s.jsx(jt, { className: "w-4 h-4 mt-1 text-muted-foreground" })),
				(e[115] = js))
			: (js = e[115]);
		let Re;
		e[116] !== t.street
			? ((Re = s.jsx("p", { className: "font-medium", children: t.street })),
				(e[116] = t.street),
				(e[117] = Re))
			: (Re = e[117]);
		let Pe;
		e[118] !== t.city || e[119] !== t.postalCode
			? ((Pe = s.jsxs("p", {
					className: "text-sm text-muted-foreground",
					children: [t.city, " ", t.postalCode],
				})),
				(e[118] = t.city),
				(e[119] = t.postalCode),
				(e[120] = Pe))
			: (Pe = e[120]);
		let Me;
		e[121] !== Re || e[122] !== Pe
			? ((Me = s.jsxs("div", {
					className: "flex items-start gap-3",
					children: [js, s.jsxs("div", { children: [Re, Pe] })],
				})),
				(e[121] = Re),
				(e[122] = Pe),
				(e[123] = Me))
			: (Me = e[123]);
		let gs;
		e[124] === Symbol.for("react.memo_cache_sentinel")
			? ((gs = s.jsx(Hs, { className: "w-4 h-4 text-muted-foreground" })),
				(e[124] = gs))
			: (gs = e[124]);
		const Cs =
			t.parkingCapacity > 0
				? `${t.parkingCapacity} places de parking`
				: "Pas de parking";
		let Ie;
		e[125] !== Cs
			? ((Ie = s.jsxs("div", {
					className: "flex items-center gap-3",
					children: [gs, s.jsx("span", { className: "text-sm", children: Cs })],
				})),
				(e[125] = Cs),
				(e[126] = Ie))
			: (Ie = e[126]);
		let Ns;
		e[127] === Symbol.for("react.memo_cache_sentinel")
			? ((Ns = s.jsx(Vs, { className: "w-4 h-4 text-muted-foreground" })),
				(e[127] = Ns))
			: (Ns = e[127]);
		const Ts =
			t.numberOfElevators > 0
				? `${t.numberOfElevators} ascenseur${t.numberOfElevators > 1 ? "s" : ""}`
				: "Pas d'ascenseur";
		let ke;
		e[128] !== Ts
			? ((ke = s.jsx("span", { className: "text-sm", children: Ts })),
				(e[128] = Ts),
				(e[129] = ke))
			: (ke = e[129]);
		const _s = t.accessibleForReducedMobility ? "default" : "secondary",
			As = t.accessibleForReducedMobility ? "bg-green-100 text-green-800" : "",
			Rs = t.accessibleForReducedMobility ? "PMR" : "Standard";
		let Fe;
		e[130] !== _s || e[131] !== As || e[132] !== Rs
			? ((Fe = s.jsx(W, { variant: _s, className: As, children: Rs })),
				(e[130] = _s),
				(e[131] = As),
				(e[132] = Rs),
				(e[133] = Fe))
			: (Fe = e[133]);
		let Le;
		e[134] !== ke || e[135] !== Fe
			? ((Le = s.jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						Ns,
						s.jsxs("div", {
							className: "flex items-center gap-2",
							children: [ke, Fe],
						}),
					],
				})),
				(e[134] = ke),
				(e[135] = Fe),
				(e[136] = Le))
			: (Le = e[136]);
		let bs;
		e[137] === Symbol.for("react.memo_cache_sentinel")
			? ((bs = s.jsx(Es, { className: "w-4 h-4 text-muted-foreground" })),
				(e[137] = bs))
			: (bs = e[137]);
		let Ee;
		e[138] !== t.createdAt
			? ((Ee = z(t.createdAt)), (e[138] = t.createdAt), (e[139] = Ee))
			: (Ee = e[139]);
		let De;
		e[140] !== Ee
			? ((De = s.jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						bs,
						s.jsxs("span", {
							className: "text-sm",
							children: ["Créé le ", Ee],
						}),
					],
				})),
				(e[140] = Ee),
				(e[141] = De))
			: (De = e[141]),
			e[142] !== Me || e[143] !== Ie || e[144] !== Le || e[145] !== De
				? ((_ = s.jsxs(p, {
						children: [
							ps,
							s.jsxs(N, { className: "space-y-4", children: [Me, Ie, Le, De] }),
						],
					})),
					(e[142] = Me),
					(e[143] = Ie),
					(e[144] = Le),
					(e[145] = De),
					(e[146] = _))
				: (_ = e[146]),
			(f = p),
			e[147] === Symbol.for("react.memo_cache_sentinel")
				? (($ = s.jsxs(j, {
						children: [
							s.jsx(g, { children: "Répartition des salles" }),
							s.jsx($e, { children: "Sports pratiqués dans ce complexe" }),
						],
					})),
					(e[147] = $))
				: ($ = e[147]),
			(d = N),
			(y = "space-y-3"),
			(P = Object.entries(T).map(yt)),
			(e[8] = U),
			(e[9] = t.accessibleForReducedMobility),
			(e[10] = t.city),
			(e[11] = t.createdAt),
			(e[12] = t.description),
			(e[13] = t.id),
			(e[14] = t.name),
			(e[15] = t.numberOfElevators),
			(e[16] = t.openingHours),
			(e[17] = t.parkingCapacity),
			(e[18] = t.postalCode),
			(e[19] = t.street),
			(e[20] = h),
			(e[21] = u),
			(e[22] = a),
			(e[23] = m),
			(e[24] = S),
			(e[25] = o),
			(e[26] = d),
			(e[27] = f),
			(e[28] = C),
			(e[29] = I),
			(e[30] = T),
			(e[31] = _),
			(e[32] = L),
			(e[33] = E),
			(e[34] = D),
			(e[35] = A),
			(e[36] = H),
			(e[37] = R),
			(e[38] = V),
			(e[39] = l),
			(e[40] = r),
			(e[41] = c),
			(e[42] = y),
			(e[43] = P),
			(e[44] = $),
			(e[45] = J);
	} else
		(d = e[26]),
			(f = e[27]),
			(C = e[28]),
			(I = e[29]),
			(T = e[30]),
			(_ = e[31]),
			(L = e[32]),
			(E = e[33]),
			(D = e[34]),
			(A = e[35]),
			(H = e[36]),
			(R = e[37]),
			(V = e[38]),
			(l = e[39]),
			(r = e[40]),
			(c = e[41]),
			(y = e[42]),
			(P = e[43]),
			($ = e[44]),
			(J = e[45]);
	let Z;
	e[148] !== T
		? ((Z =
				Object.keys(T).length === 0 &&
				s.jsx("p", {
					className: "text-sm text-muted-foreground text-center py-4",
					children: "Aucune salle configurée",
				})),
			(e[148] = T),
			(e[149] = Z))
		: (Z = e[149]);
	let Q;
	e[150] !== Z || e[151] !== y || e[152] !== P
		? ((Q = s.jsxs("div", { className: y, children: [P, Z] })),
			(e[150] = Z),
			(e[151] = y),
			(e[152] = P),
			(e[153] = Q))
		: (Q = e[153]);
	let X;
	e[154] !== d || e[155] !== Q
		? ((X = s.jsx(d, { children: Q })),
			(e[154] = d),
			(e[155] = Q),
			(e[156] = X))
		: (X = e[156]);
	let Y;
	e[157] !== f || e[158] !== X || e[159] !== $
		? ((Y = s.jsxs(f, { children: [$, X] })),
			(e[157] = f),
			(e[158] = X),
			(e[159] = $),
			(e[160] = Y))
		: (Y = e[160]);
	let K;
	e[161] !== _ || e[162] !== Y || e[163] !== J
		? ((K = s.jsxs("div", { className: J, children: [_, Y] })),
			(e[161] = _),
			(e[162] = Y),
			(e[163] = J),
			(e[164] = K))
		: (K = e[164]);
	let ze;
	e[165] === Symbol.for("react.memo_cache_sentinel")
		? ((ze = s.jsxs(j, {
				children: [
					s.jsx(g, {
						className: "flex items-center gap-2",
						children: "Types de salles",
					}),
					s.jsx($e, { children: "Répartition intérieur/extérieur" }),
				],
			})),
			(e[165] = ze))
		: (ze = e[165]);
	let Ue, We;
	e[166] === Symbol.for("react.memo_cache_sentinel")
		? ((Ue = s.jsx(Ls, { className: "w-8 h-8 text-blue-600" })),
			(We = s.jsx("p", {
				className: "font-medium",
				children: "Salles intérieures",
			})),
			(e[166] = Ue),
			(e[167] = We))
		: ((Ue = e[166]), (We = e[167]));
	let ee;
	e[168] !== u
		? ((ee = s.jsxs("div", {
				className: "flex items-center gap-3 p-4 border rounded-lg",
				children: [
					Ue,
					s.jsxs("div", {
						children: [
							We,
							s.jsx("p", { className: "text-2xl font-bold", children: u }),
						],
					}),
				],
			})),
			(e[168] = u),
			(e[169] = ee))
		: (ee = e[169]);
	let Ge, Je;
	e[170] === Symbol.for("react.memo_cache_sentinel")
		? ((Ge = s.jsx(Os, { className: "w-8 h-8 text-green-600" })),
			(Je = s.jsx("p", {
				className: "font-medium",
				children: "Terrains extérieurs",
			})),
			(e[170] = Ge),
			(e[171] = Je))
		: ((Ge = e[170]), (Je = e[171]));
	let se;
	e[172] !== S
		? ((se = s.jsxs("div", {
				className: "flex items-center gap-3 p-4 border rounded-lg",
				children: [
					Ge,
					s.jsxs("div", {
						children: [
							Je,
							s.jsx("p", { className: "text-2xl font-bold", children: S }),
						],
					}),
				],
			})),
			(e[172] = S),
			(e[173] = se))
		: (se = e[173]);
	let te;
	e[174] !== ee || e[175] !== se
		? ((te = s.jsxs(p, {
				children: [
					ze,
					s.jsx(N, {
						children: s.jsxs("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [ee, se],
						}),
					}),
				],
			})),
			(e[174] = ee),
			(e[175] = se),
			(e[176] = te))
		: (te = e[176]);
	let Ze;
	e[177] === Symbol.for("react.memo_cache_sentinel")
		? ((Ze = s.jsxs(j, {
				children: [
					s.jsx(g, {
						className: "flex items-center gap-2",
						children: "Activité récente",
					}),
					s.jsx($e, { children: "Dernières actions sur ce complexe" }),
				],
			})),
			(e[177] = Ze))
		: (Ze = e[177]);
	let Qe;
	e[178] === Symbol.for("react.memo_cache_sentinel")
		? ((Qe = s.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" })),
			(e[178] = Qe))
		: (Qe = e[178]);
	let Xe;
	e[179] === Symbol.for("react.memo_cache_sentinel")
		? ((Xe = s.jsx("p", {
				className: "text-sm font-medium",
				children: "Complexe créé",
			})),
			(e[179] = Xe))
		: (Xe = e[179]);
	let le;
	e[180] !== t.createdAt
		? ((le = z(t.createdAt)), (e[180] = t.createdAt), (e[181] = le))
		: (le = e[181]);
	let re;
	e[182] !== le
		? ((re = s.jsxs("div", {
				className: "flex items-center gap-3",
				children: [
					Qe,
					s.jsxs("div", {
						className: "flex-1",
						children: [
							Xe,
							s.jsx("p", {
								className: "text-xs text-muted-foreground",
								children: le,
							}),
						],
					}),
				],
			})),
			(e[182] = le),
			(e[183] = re))
		: (re = e[183]);
	let ie;
	e[184] !== t.createdAt || e[185] !== t.updatedAt
		? ((ie =
				t.updatedAt !== t.createdAt &&
				s.jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						s.jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500" }),
						s.jsxs("div", {
							className: "flex-1",
							children: [
								s.jsx("p", {
									className: "text-sm font-medium",
									children: "Dernière modification",
								}),
								s.jsx("p", {
									className: "text-xs text-muted-foreground",
									children: z(t.updatedAt),
								}),
							],
						}),
					],
				})),
			(e[184] = t.createdAt),
			(e[185] = t.updatedAt),
			(e[186] = ie))
		: (ie = e[186]);
	let ae;
	e[187] !== o
		? ((ae =
				o > 0 &&
				s.jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						s.jsx("div", { className: "w-2 h-2 rounded-full bg-purple-500" }),
						s.jsxs("div", {
							className: "flex-1",
							children: [
								s.jsxs("p", {
									className: "text-sm font-medium",
									children: [
										o,
										" salle",
										o > 1 ? "s" : "",
										" configurée",
										o > 1 ? "s" : "",
									],
								}),
								s.jsx("p", {
									className: "text-xs text-muted-foreground",
									children: "Prêt pour les réservations",
								}),
							],
						}),
					],
				})),
			(e[187] = o),
			(e[188] = ae))
		: (ae = e[188]);
	let ce;
	e[189] !== re || e[190] !== ie || e[191] !== ae
		? ((ce = s.jsxs(p, {
				children: [
					Ze,
					s.jsx(N, {
						children: s.jsxs("div", {
							className: "space-y-4",
							children: [re, ie, ae],
						}),
					}),
				],
			})),
			(e[189] = re),
			(e[190] = ie),
			(e[191] = ae),
			(e[192] = ce))
		: (ce = e[192]);
	let ne;
	e[193] !== C ||
	e[194] !== L ||
	e[195] !== E ||
	e[196] !== K ||
	e[197] !== te ||
	e[198] !== ce
		? ((ne = s.jsxs(C, { value: L, className: E, children: [K, te, ce] })),
			(e[193] = C),
			(e[194] = L),
			(e[195] = E),
			(e[196] = K),
			(e[197] = te),
			(e[198] = ce),
			(e[199] = ne))
		: (ne = e[199]);
	let oe;
	e[200] !== t.id || e[201] !== a
		? ((oe = s.jsx(vs, {
				value: "rooms",
				className: "space-y-4",
				children: s.jsx(bt, { complexId: t.id, initialRooms: a }),
			})),
			(e[200] = t.id),
			(e[201] = a),
			(e[202] = oe))
		: (oe = e[202]);
	let Ye;
	e[203] === Symbol.for("react.memo_cache_sentinel")
		? ((Ye = s.jsxs(j, {
				children: [
					s.jsx(g, { children: "Planning du complexe" }),
					s.jsx($e, { children: "Calendrier des réservations et événements" }),
				],
			})),
			(e[203] = Ye))
		: (Ye = e[203]);
	let Ke;
	e[204] === Symbol.for("react.memo_cache_sentinel")
		? ((Ke = s.jsx(vs, {
				value: "planning",
				className: "space-y-4",
				children: s.jsxs(p, {
					children: [
						Ye,
						s.jsx(N, {
							children: s.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(Es, { className: "w-12 h-12" }),
									s.jsx("span", {
										className: "ml-2",
										children: "Planning à implémenter",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(e[204] = Ke))
		: (Ke = e[204]);
	let es;
	e[205] === Symbol.for("react.memo_cache_sentinel")
		? ((es = s.jsxs(j, {
				children: [
					s.jsx(g, { children: "Statistiques d'utilisation" }),
					s.jsx($e, { children: "Analyses et métriques du complexe" }),
				],
			})),
			(e[205] = es))
		: (es = e[205]);
	let ss;
	e[206] === Symbol.for("react.memo_cache_sentinel")
		? ((ss = s.jsx(vs, {
				value: "stats",
				className: "space-y-4",
				children: s.jsxs(p, {
					children: [
						es,
						s.jsx(N, {
							children: s.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(gt, { className: "w-12 h-12" }),
									s.jsx("span", {
										className: "ml-2",
										children: "Statistiques à implémenter",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(e[206] = ss))
		: (ss = e[206]);
	let de;
	e[207] !== I ||
	e[208] !== D ||
	e[209] !== A ||
	e[210] !== H ||
	e[211] !== R ||
	e[212] !== ne ||
	e[213] !== oe
		? ((de = s.jsxs(I, {
				value: D,
				onValueChange: A,
				className: H,
				children: [R, ne, oe, Ke, ss],
			})),
			(e[207] = I),
			(e[208] = D),
			(e[209] = A),
			(e[210] = H),
			(e[211] = R),
			(e[212] = ne),
			(e[213] = oe),
			(e[214] = de))
		: (de = e[214]);
	let ts;
	return (
		e[215] !== V ||
		e[216] !== l ||
		e[217] !== r ||
		e[218] !== c ||
		e[219] !== de
			? ((ts = s.jsxs("div", { className: V, children: [l, r, c, de] })),
				(e[215] = V),
				(e[216] = l),
				(e[217] = r),
				(e[218] = c),
				(e[219] = de),
				(e[220] = ts))
			: (ts = e[220]),
		ts
	);
}
function yt(i) {
	const [e, t] = i;
	return s.jsxs(
		"div",
		{
			className: "flex items-center justify-between",
			children: [
				s.jsx("span", { className: "text-sm font-medium", children: e }),
				s.jsx(W, { variant: "outline", children: t }),
			],
		},
		e,
	);
}
function wt(i) {
	return i == null ? void 0 : i.closed;
}
function St(i, e) {
	return (i[e.sportType] = (i[e.sportType] || 0) + 1), i;
}
function Ct(i) {
	return i.accreditation && i.accreditation.trim() !== "";
}
function Tt(i) {
	return i.isIndoor;
}
function _t(i) {
	return new Date(i).toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
const fl = () => {
	const e = $s.c(4);
	let t;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((t = {
				from: "/_authenticated/admin/_admin/facilities/complexes/$complexId/",
			}),
			(e[0] = t))
		: (t = e[0]);
	const { complex: a, rooms: n } = Gs(t);
	let b;
	return (
		e[1] !== a || e[2] !== n
			? ((b = s.jsx(vt, { complex: a, initialRooms: n })),
				(e[1] = a),
				(e[2] = n),
				(e[3] = b))
			: (b = e[3]),
		b
	);
};
export { fl as component };
