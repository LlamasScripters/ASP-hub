import { A as Xs } from "./activity-BQimCp6k.js";
import { B as J } from "./badge-BAidKpPB.js";
import { B as ys } from "./building-Dpa0VlEa.js";
import { C as hs } from "./calendar-De7tcxsN.js";
import { C as Os, A as Us } from "./car-DIHhrsj8.js";
import { C as vs } from "./chart-column-FJxLrytM.js";
import { C as Ks } from "./chevron-left-BhVEjMY-.js";
import { C as Js } from "./chevron-right-QFzs-bqo.js";
import { C as _s } from "./circle-alert-CvO-74L-.js";
import { C as Ss } from "./circle-check-big-DWIiKDvL.js";
import { C as Hs } from "./circle-off-Dnl33VGr.js";
import { C as et } from "./clock-Kg0fBwSd.js";
import {
	a as Es,
	c as Fs,
	b as Is,
	d as Ls,
	D as ds,
	e as us,
} from "./dropdown-menu-B4Bx1zOg.js";
import { E as Gs } from "./ellipsis-CnaDov9f.js";
import { F as Ws } from "./funnel-DNedUVhi.js";
import {
	c as fs,
	K as As,
	r as Me,
	i as Ms,
	B as Pe,
	N as Ps,
	e as S,
	C as T,
	b as _,
	M as bs,
	P as ks,
	L as ms,
	j as s,
	f as w,
	d as we,
} from "./index-kb-Ylywn.js";
import { I as $s } from "./input-CdkcPZS3.js";
import { M as qs } from "./map-pin-DywQhs4x.js";
import { P as Cs } from "./plus-czqh0ZLb.js";
import { P as Ue } from "./progress-DJazw1mq.js";
import { R as ws } from "./refresh-cw-D6CAsBlf.js";
import { S as Qs } from "./search-CT8NOJQT.js";
import {
	S as Ns,
	c as gs,
	a as js,
	b as ps,
	d as ze,
} from "./select-D8GIfri3.js";
import {
	d as Bs,
	e as Te,
	c as Vs,
	b as qe,
	a as xs,
	T as zs,
} from "./table-De-kdsVW.js";
import { T as Ds, c as Rs, a as ss, b as ts } from "./tabs-BDMFlPtb.js";
import { T as Zs } from "./trending-up-B4fnbcLX.js";
import { U as Ys } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-Bv1xjdPd.js";
import "./index-Dqr9Wf5M.js";
import "./index-BP52hRXm.js";
import "./index-3Axhna2x.js";
import "./index-CvBT1pZ2.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
import "./index-CnLXGm6V.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-mnH6Jux_.js";
import "./index-C6LbJ2-_.js";
import "./chevron-down-CMzABl4R.js";
import "./chevron-up-DyH28r2x.js";
function st(r) {
	const e = fs.c(92),
		{ initialComplexes: u } = r;
	let g;
	e[0] !== u
		? ((g = u === void 0 ? [] : u), (e[0] = u), (e[1] = g))
		: (g = e[1]);
	const l = g,
		[h, Ge] = Me.useState(""),
		[a, Q] = Me.useState(1),
		[o, Oe] = Me.useState("all"),
		[n, Se] = Me.useState("all");
	let ne;
	e[2] !== l
		? ((ne = { initialData: l }), (e[2] = l), (e[3] = ne))
		: (ne = e[3]);
	const { complexes: ue, deleteComplex: ce } = bs(ne),
		W = ue.length > 0 ? ue : l;
	let re,
		m = W;
	if (h) {
		let t;
		if (e[4] !== m || e[5] !== h) {
			const i = h.toLowerCase();
			(t = m.filter(
				(f) =>
					f.name.toLowerCase().includes(i) ||
					f.city.toLowerCase().includes(i) ||
					f.street.toLowerCase().includes(i),
			)),
				(e[4] = m),
				(e[5] = h),
				(e[6] = t);
		} else t = e[6];
		m = t;
	}
	if (o !== "all") {
		let t;
		if (e[7] !== o || e[8] !== m) {
			let i;
			e[10] !== o
				? ((i = (f) =>
						o === "accessible"
							? f.accessibleForReducedMobility
							: o === "not-accessible"
								? !f.accessibleForReducedMobility
								: !0),
					(e[10] = o),
					(e[11] = i))
				: (i = e[11]),
				(t = m.filter(i)),
				(e[7] = o),
				(e[8] = m),
				(e[9] = t);
		} else t = e[9];
		m = t;
	}
	if (n !== "all") {
		let t;
		if (e[12] !== m || e[13] !== n) {
			let i;
			e[15] !== n
				? ((i = (f) =>
						n === "with-parking"
							? f.parkingCapacity > 0
							: n === "no-parking"
								? f.parkingCapacity === 0
								: !0),
					(e[15] = n),
					(e[16] = i))
				: (i = e[16]),
				(t = m.filter(i)),
				(e[12] = m),
				(e[13] = n),
				(e[14] = t);
		} else t = e[14];
		m = t;
	}
	re = m;
	const d = re,
		x = Math.ceil(d.length / 10),
		C = (a - 1) * 10,
		P = C + 10,
		M = d.slice(C, P);
	let k, N;
	e[17] === Symbol.for("react.memo_cache_sentinel")
		? ((k = () => {
				Q(1);
			}),
			(N = []),
			(e[17] = k),
			(e[18] = N))
		: ((k = e[17]), (N = e[18])),
		Me.useEffect(k, N);
	let A;
	e[19] === Symbol.for("react.memo_cache_sentinel")
		? ((A = (t) => {
				Ge(t);
			}),
			(e[19] = A))
		: (A = e[19]);
	const X = A;
	let R;
	e[20] !== ce
		? ((R = async (t, i) => {
				window.confirm(
					`Êtes-vous sûr de vouloir supprimer le complexe "${i}" ?`,
				) && (await ce(t));
			}),
			(e[20] = ce),
			(e[21] = R))
		: (R = e[21]);
	const Y = R,
		Z = tt;
	let D;
	e[22] === Symbol.for("react.memo_cache_sentinel")
		? ((D = (t) => {
				Q(t);
			}),
			(e[22] = D))
		: (D = e[22]);
	const ee = D;
	let v;
	e[23] !== a || e[24] !== x
		? ((v = () => {
				a < x && Q(a + 1);
			}),
			(e[23] = a),
			(e[24] = x),
			(e[25] = v))
		: (v = e[25]);
	const c = v;
	let I;
	e[26] !== a
		? ((I = () => {
				a > 1 && Q(a - 1);
			}),
			(e[26] = a),
			(e[27] = I))
		: (I = e[27]);
	const se = I;
	let E;
	e[28] !== a || e[29] !== x
		? ((E = () => {
				const t = [];
				if (x <= 5) for (let i = 1; i <= x; i++) t.push(i);
				else {
					const i = Math.max(1, a - 2),
						f = Math.min(x, i + 5 - 1);
					for (let ae = i; ae <= f; ae++) t.push(ae);
				}
				return t;
			}),
			(e[28] = a),
			(e[29] = x),
			(e[30] = E))
		: (E = e[30]);
	const je = E,
		pe = "space-y-6",
		te = S;
	let oe;
	e[31] === Symbol.for("react.memo_cache_sentinel")
		? ((oe = s.jsx(_, { children: "Liste des complexes" })), (e[31] = oe))
		: (oe = e[31]);
	const ge = d.length > 1 ? "s" : "",
		Ne = d.length > 1 ? "s" : "",
		ve = d.length !== W.length && ` sur ${W.length} au total`;
	let F;
	e[32] !== d.length || e[33] !== ge || e[34] !== Ne || e[35] !== ve
		? ((F = s.jsxs("div", {
				children: [
					oe,
					s.jsxs(we, {
						children: [d.length, " complexe", ge, " trouvé", Ne, ve],
					}),
				],
			})),
			(e[32] = d.length),
			(e[33] = ge),
			(e[34] = Ne),
			(e[35] = ve),
			(e[36] = F))
		: (F = e[36]);
	let me;
	e[37] === Symbol.for("react.memo_cache_sentinel")
		? ((me = s.jsx(Pe, {
				asChild: !0,
				children: s.jsxs(ms, {
					to: "/admin/facilities/complexes/create",
					children: [
						s.jsx(Cs, { className: "w-4 h-4 mr-2" }),
						"Nouveau complexe",
					],
				}),
			})),
			(e[37] = me))
		: (me = e[37]);
	let L;
	e[38] !== F
		? ((L = s.jsx(T, {
				children: s.jsxs("div", {
					className:
						"flex flex-col justify-between gap-4 md:flex-row md:items-center",
					children: [F, me],
				}),
			})),
			(e[38] = F),
			(e[39] = L))
		: (L = e[39]);
	const le = w;
	let $;
	e[40] === Symbol.for("react.memo_cache_sentinel")
		? (($ = s.jsx(Qs, {
				className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
			})),
			(e[40] = $))
		: ($ = e[40]);
	let B;
	e[41] === Symbol.for("react.memo_cache_sentinel")
		? ((B = (t) => X(t.target.value)), (e[41] = B))
		: (B = e[41]);
	let V;
	e[42] !== h
		? ((V = s.jsxs("div", {
				className: "relative flex-1",
				children: [
					$,
					s.jsx($s, {
						placeholder: "Rechercher un complexe par nom, ville ou adresse...",
						className: "pl-8",
						value: h,
						onChange: B,
					}),
				],
			})),
			(e[42] = h),
			(e[43] = V))
		: (V = e[43]);
	let de;
	e[44] === Symbol.for("react.memo_cache_sentinel")
		? ((de = s.jsx(js, {
				className: "w-[180px]",
				children: s.jsx(ps, { placeholder: "Accessibilité" }),
			})),
			(e[44] = de))
		: (de = e[44]);
	let xe;
	e[45] === Symbol.for("react.memo_cache_sentinel")
		? ((xe = s.jsxs(gs, {
				children: [
					s.jsx(ze, { value: "all", children: "Toutes" }),
					s.jsx(ze, { value: "accessible", children: "PMR Accessible" }),
					s.jsx(ze, { value: "not-accessible", children: "Standard" }),
				],
			})),
			(e[45] = xe))
		: (xe = e[45]);
	let z;
	e[46] !== o
		? ((z = s.jsxs(Ns, { value: o, onValueChange: Oe, children: [de, xe] })),
			(e[46] = o),
			(e[47] = z))
		: (z = e[47]);
	let q;
	e[48] === Symbol.for("react.memo_cache_sentinel")
		? ((q = s.jsx(js, {
				className: "w-[180px]",
				children: s.jsx(ps, { placeholder: "Parking" }),
			})),
			(e[48] = q))
		: (q = e[48]);
	let he;
	e[49] === Symbol.for("react.memo_cache_sentinel")
		? ((he = s.jsxs(gs, {
				children: [
					s.jsx(ze, { value: "all", children: "Tous" }),
					s.jsx(ze, { value: "with-parking", children: "Avec parking" }),
					s.jsx(ze, { value: "no-parking", children: "Sans parking" }),
				],
			})),
			(e[49] = he))
		: (he = e[49]);
	let b;
	e[50] !== n
		? ((b = s.jsxs(Ns, { value: n, onValueChange: Se, children: [q, he] })),
			(e[50] = n),
			(e[51] = b))
		: (b = e[51]);
	let O;
	e[52] !== z || e[53] !== b
		? ((O = s.jsxs("div", { className: "flex gap-2", children: [z, b] })),
			(e[52] = z),
			(e[53] = b),
			(e[54] = O))
		: (O = e[54]);
	let j;
	e[55] !== V || e[56] !== O
		? ((j = s.jsxs("div", {
				className: "flex flex-col gap-4 md:flex-row",
				children: [V, O],
			})),
			(e[55] = V),
			(e[56] = O),
			(e[57] = j))
		: (j = e[57]);
	let y;
	e[58] !== o || e[59] !== n || e[60] !== h
		? ((y =
				(h || o !== "all" || n !== "all") &&
				s.jsxs("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						s.jsx(Ws, { className: "w-4 h-4" }),
						s.jsx("span", { children: "Filtres actifs:" }),
						h &&
							s.jsxs(J, { variant: "secondary", children: ["Recherche: ", h] }),
						o !== "all" &&
							s.jsxs(J, {
								variant: "secondary",
								children: [
									"Accessibilité:",
									" ",
									o === "accessible" ? "PMR" : "Standard",
								],
							}),
						n !== "all" &&
							s.jsxs(J, {
								variant: "secondary",
								children: [
									"Parking:",
									" ",
									n === "with-parking" ? "Avec" : "Sans",
								],
							}),
						s.jsx(Pe, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								Ge(""), Oe("all"), Se("all");
							},
							children: "Effacer",
						}),
					],
				})),
			(e[58] = o),
			(e[59] = n),
			(e[60] = h),
			(e[61] = y))
		: (y = e[61]);
	let be;
	e[62] !== j || e[63] !== y
		? ((be = s.jsxs("div", {
				className: "flex flex-col gap-4 mb-6",
				children: [j, y],
			})),
			(e[62] = j),
			(e[63] = y),
			(e[64] = be))
		: (be = e[64]);
	const ls = "border rounded-md",
		ye = Vs;
	let U;
	e[65] === Symbol.for("react.memo_cache_sentinel")
		? ((U = s.jsx(zs, {
				children: s.jsxs(xs, {
					children: [
						s.jsx(qe, { children: "Complexe" }),
						s.jsx(qe, { children: "Localisation" }),
						s.jsx(qe, { children: "Services" }),
						s.jsx(qe, { children: "Accessibilité" }),
						s.jsx(qe, { children: "Créé le" }),
						s.jsx(qe, { className: "w-[80px]", children: "Actions" }),
					],
				}),
			})),
			(e[65] = U))
		: (U = e[65]);
	const Ce = Bs,
		_e =
			M.length > 0
				? M.map((t) =>
						s.jsxs(
							xs,
							{
								children: [
									s.jsx(Te, {
										children: s.jsxs("div", {
											className: "flex items-center",
											children: [
												s.jsx(ys, {
													className: "w-4 h-4 mr-3 text-muted-foreground",
												}),
												s.jsxs("div", {
													children: [
														s.jsx("div", {
															className: "font-medium",
															children: t.name,
														}),
														s.jsxs("div", {
															className: "text-sm text-muted-foreground",
															children: ["ID: ", t.id.slice(0, 8), "..."],
														}),
													],
												}),
											],
										}),
									}),
									s.jsx(Te, {
										children: s.jsxs("div", {
											className: "flex items-center",
											children: [
												s.jsx(qs, {
													className: "w-4 h-4 mr-2 text-muted-foreground",
												}),
												s.jsxs("div", {
													children: [
														s.jsx("div", {
															className: "text-sm font-medium",
															children: t.street,
														}),
														s.jsxs("div", {
															className: "text-xs text-muted-foreground",
															children: [t.city, " ", t.postalCode],
														}),
													],
												}),
											],
										}),
									}),
									s.jsx(Te, {
										children: s.jsxs("div", {
											className: "space-y-1",
											children: [
												s.jsxs("div", {
													className: "flex items-center text-sm",
													children: [
														s.jsx(Os, {
															className: "w-3 h-3 mr-1 text-muted-foreground",
														}),
														s.jsx("span", {
															className: "text-muted-foreground",
															children:
																t.parkingCapacity > 0
																	? `${t.parkingCapacity} places`
																	: "Pas de parking",
														}),
													],
												}),
												s.jsxs("div", {
													className:
														"flex items-center text-xs text-muted-foreground",
													children: [
														s.jsx(Us, { className: "w-3 h-3 mr-1" }),
														s.jsx("span", {
															children:
																t.numberOfElevators > 0
																	? `${t.numberOfElevators} ascenseur${t.numberOfElevators > 1 ? "s" : ""}`
																	: "Pas d'ascenseur",
														}),
													],
												}),
											],
										}),
									}),
									s.jsx(Te, {
										children: s.jsx(J, {
											variant: t.accessibleForReducedMobility
												? "default"
												: "secondary",
											className: t.accessibleForReducedMobility
												? "bg-green-100 text-green-800 border-green-200"
												: "",
											children: t.accessibleForReducedMobility
												? "PMR ✓"
												: "Standard",
										}),
									}),
									s.jsx(Te, {
										children: s.jsxs("div", {
											className:
												"flex items-center text-sm text-muted-foreground",
											children: [
												s.jsx(hs, { className: "w-3 h-3 mr-1" }),
												Z(t.createdAt),
											],
										}),
									}),
									s.jsx(Te, {
										children: s.jsxs(Is, {
											children: [
												s.jsx(Es, {
													asChild: !0,
													children: s.jsxs(Pe, {
														variant: "ghost",
														size: "icon",
														children: [
															s.jsx(Gs, { className: "h-4 w-4" }),
															s.jsx("span", {
																className: "sr-only",
																children: "Menu",
															}),
														],
													}),
												}),
												s.jsxs(Fs, {
													align: "end",
													children: [
														s.jsx(Ls, { children: "Actions" }),
														s.jsx(us, {}),
														s.jsx(ds, {
															asChild: !0,
															children: s.jsx(ms, {
																to: "/admin/facilities/complexes/$complexId",
																params: { complexId: t.id },
																className: "w-full cursor-pointer",
																children: "Voir les détails",
															}),
														}),
														s.jsx(ds, {
															asChild: !0,
															children: s.jsx(ms, {
																to: "/admin/facilities/complexes/$complexId/edit",
																params: { complexId: t.id },
																className: "w-full cursor-pointer",
																children: "Modifier",
															}),
														}),
														s.jsx(us, {}),
														s.jsx(ds, {
															className: "text-red-600",
															onClick: () => Y(t.id, t.name),
															children: "Supprimer",
														}),
													],
												}),
											],
										}),
									}),
								],
							},
							t.id,
						),
					)
				: s.jsx(xs, {
						children: s.jsx(Te, {
							colSpan: 6,
							className: "h-24 text-center",
							children: s.jsxs("div", {
								className: "text-center",
								children: [
									s.jsx(Hs, {
										className: "w-12 h-12 mx-auto text-gray-400 mb-4",
									}),
									s.jsx("h3", {
										className: "text-lg font-medium text-gray-900 mb-2",
										children: "Aucun complexe trouvé",
									}),
									s.jsx("p", {
										className: "text-gray-500 mb-4",
										children:
											h || o !== "all" || n !== "all"
												? "Aucun complexe ne correspond à vos critères de recherche."
												: "Commencez par créer votre premier complexe sportif.",
									}),
								],
							}),
						}),
					});
	let G;
	e[66] !== Ce || e[67] !== _e
		? ((G = s.jsx(Ce, { children: _e })),
			(e[66] = Ce),
			(e[67] = _e),
			(e[68] = G))
		: (G = e[68]);
	let ie;
	e[69] !== ye || e[70] !== U || e[71] !== G
		? ((ie = s.jsx("div", {
				className: ls,
				children: s.jsxs(ye, { children: [U, G] }),
			})),
			(e[69] = ye),
			(e[70] = U),
			(e[71] = G),
			(e[72] = ie))
		: (ie = e[72]);
	let H;
	e[73] !== a ||
	e[74] !== P ||
	e[75] !== d.length ||
	e[76] !== je ||
	e[77] !== ee ||
	e[78] !== c ||
	e[79] !== se ||
	e[80] !== C ||
	e[81] !== x
		? ((H =
				x > 1 &&
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
								Math.min(P, d.length),
								" sur",
								" ",
								d.length,
								" complexes",
							],
						}),
						s.jsxs("div", {
							className: "flex items-center space-x-2",
							children: [
								s.jsxs(Pe, {
									variant: "outline",
									size: "icon",
									onClick: se,
									disabled: a === 1,
									children: [
										s.jsx(Ks, { className: "h-4 w-4" }),
										s.jsx("span", {
											className: "sr-only",
											children: "Page précédente",
										}),
									],
								}),
								s.jsx("div", {
									className: "flex items-center space-x-1",
									children: je().map((t) =>
										s.jsx(
											Pe,
											{
												variant: a === t ? "default" : "outline",
												size: "sm",
												onClick: () => ee(t),
												children: t,
											},
											t,
										),
									),
								}),
								s.jsxs(Pe, {
									variant: "outline",
									size: "icon",
									onClick: c,
									disabled: a === x,
									children: [
										s.jsx(Js, { className: "h-4 w-4" }),
										s.jsx("span", {
											className: "sr-only",
											children: "Page suivante",
										}),
									],
								}),
							],
						}),
					],
				})),
			(e[73] = a),
			(e[74] = P),
			(e[75] = d.length),
			(e[76] = je),
			(e[77] = ee),
			(e[78] = c),
			(e[79] = se),
			(e[80] = C),
			(e[81] = x),
			(e[82] = H))
		: (H = e[82]);
	let K;
	e[83] !== le || e[84] !== be || e[85] !== ie || e[86] !== H
		? ((K = s.jsxs(le, { children: [be, ie, H] })),
			(e[83] = le),
			(e[84] = be),
			(e[85] = ie),
			(e[86] = H),
			(e[87] = K))
		: (K = e[87]);
	let fe;
	return (
		e[88] !== te || e[89] !== L || e[90] !== K
			? ((fe = s.jsx("div", {
					className: pe,
					children: s.jsxs(te, { children: [L, K] }),
				})),
				(e[88] = te),
				(e[89] = L),
				(e[90] = K),
				(e[91] = fe))
			: (fe = e[91]),
		fe
	);
}
function tt(r) {
	return new Date(r).toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}
function lt(r) {
	const e = fs.c(155),
		{ initialComplexes: u } = r;
	let g;
	e[0] !== u
		? ((g = u === void 0 ? [] : u), (e[0] = u), (e[1] = g))
		: (g = e[1]);
	const l = g;
	let h;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((h = { strict: !1 }), (e[2] = h))
		: (h = e[2]);
	const Ge = Ps(h),
		a = Ms(),
		Q = Ge.view ?? "overview",
		[o, Oe] = Me.useState(Q);
	let n, Se;
	e[3] !== Q
		? ((n = () => {
				Oe(Q);
			}),
			(Se = [Q]),
			(e[3] = Q),
			(e[4] = n),
			(e[5] = Se))
		: ((n = e[4]), (Se = e[5])),
		Me.useEffect(n, Se);
	let ne;
	e[6] !== l
		? ((ne = { initialData: l }), (e[6] = l), (e[7] = ne))
		: (ne = e[7]);
	const { refresh: ue } = bs(ne),
		{ refresh: ce } = ks();
	let W, re, m, d, x, C, P, M, k, N, A, X, R, Y, Z, D, ee, v, c;
	if (e[8] !== o || e[9] !== l || e[10] !== a || e[11] !== ue || e[12] !== ce) {
		const b = [
				{
					id: "1",
					action: "Nouveau complexe créé",
					complex: "Stade Pierre Dupont",
					date: "Il y a 2 heures",
					type: "create",
				},
				{
					id: "2",
					action: "Maintenance programmée",
					complex: "Gymnase Central",
					date: "Il y a 4 heures",
					type: "maintenance",
				},
				{
					id: "3",
					action: "Réservation confirmée",
					complex: "Courts de Tennis",
					date: "Il y a 6 heures",
					type: "booking",
				},
				{
					id: "4",
					action: "Équipement mis à jour",
					complex: "Piscine Municipale",
					date: "Hier",
					type: "update",
				},
			],
			O = [
				{
					id: "1",
					title: "Maintenance annuelle",
					complex: "Stade Municipal",
					date: "15 juin 2025",
					type: "maintenance",
				},
				{
					id: "2",
					title: "Tournoi de basketball",
					complex: "Gymnase Central",
					date: "20 juin 2025",
					type: "event",
				},
				{
					id: "3",
					title: "Inspection sécurité",
					complex: "Piscine Municipale",
					date: "25 juin 2025",
					type: "inspection",
				},
			];
		let j;
		e[32] !== ue || e[33] !== ce
			? ((j = async () => {
					await Promise.all([ue(), ce()]);
				}),
				(e[32] = ue),
				(e[33] = ce),
				(e[34] = j))
			: (j = e[34]);
		const y = j,
			be = ot,
			ls = rt;
		c = l.length;
		let ye;
		e[35] !== l
			? ((ye = l.filter(ct)), (e[35] = l), (e[36] = ye))
			: (ye = e[36]);
		const U = ye.length;
		let Ce;
		e[37] !== l
			? ((Ce = l.reduce(nt, 0)), (e[37] = l), (e[38] = Ce))
			: (Ce = e[38]);
		const _e = Ce;
		let G;
		e[39] !== l
			? ((G = l.reduce(at, 0)), (e[39] = l), (e[40] = G))
			: (G = e[40]);
		const ie = G;
		R = "space-y-6";
		let H;
		e[41] === Symbol.for("react.memo_cache_sentinel")
			? ((H = s.jsxs("div", {
					children: [
						s.jsx("h1", {
							className: "text-3xl font-bold tracking-tight",
							children: "Installations sportives",
						}),
						s.jsx("p", {
							className: "text-muted-foreground",
							children:
								"Gérez les complexes et installations sportives de l'association",
						}),
					],
				})),
				(e[41] = H))
			: (H = e[41]);
		let K;
		e[42] === Symbol.for("react.memo_cache_sentinel")
			? ((K = s.jsx(ws, { className: "w-4 h-4 mr-2" })), (e[42] = K))
			: (K = e[42]),
			e[43] !== y
				? ((Y = s.jsxs("div", {
						className:
							"flex flex-col justify-between gap-4 md:flex-row md:items-center",
						children: [
							H,
							s.jsx("div", {
								className: "flex items-center gap-2",
								children: s.jsxs(Pe, {
									variant: "outline",
									size: "sm",
									className: "h-9",
									onClick: y,
									children: [K, "Actualiser"],
								}),
							}),
						],
					})),
					(e[43] = y),
					(e[44] = Y))
				: (Y = e[44]);
		let fe;
		e[45] === Symbol.for("react.memo_cache_sentinel")
			? ((fe = s.jsxs(T, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(_, {
							className: "text-sm font-medium",
							children: "Total Complexes",
						}),
						s.jsx(ys, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[45] = fe))
			: (fe = e[45]);
		let t;
		e[46] !== c
			? ((t = s.jsx("div", { className: "text-2xl font-bold", children: c })),
				(e[46] = c),
				(e[47] = t))
			: (t = e[47]);
		let i;
		e[48] !== U
			? ((i = s.jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [U, " accessibles PMR"],
				})),
				(e[48] = U),
				(e[49] = i))
			: (i = e[49]);
		const f = c > 0 ? (U / c) * 100 : 0;
		let ae;
		e[50] !== f
			? ((ae = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ue, { value: f, className: "h-2" }),
				})),
				(e[50] = f),
				(e[51] = ae))
			: (ae = e[51]);
		let ke;
		e[52] !== t || e[53] !== i || e[54] !== ae
			? ((ke = s.jsxs(S, {
					children: [fe, s.jsxs(w, { children: [t, i, ae] })],
				})),
				(e[52] = t),
				(e[53] = i),
				(e[54] = ae),
				(e[55] = ke))
			: (ke = e[55]);
		let He;
		e[56] === Symbol.for("react.memo_cache_sentinel")
			? ((He = s.jsxs(T, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(_, {
							className: "text-sm font-medium",
							children: "Places de Parking",
						}),
						s.jsx(Ys, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[56] = He))
			: (He = e[56]);
		let Ae;
		e[57] !== _e
			? ((Ae = s.jsx("div", { className: "text-2xl font-bold", children: _e })),
				(e[57] = _e),
				(e[58] = Ae))
			: (Ae = e[58]);
		let Re;
		e[59] !== c
			? ((Re = s.jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: ["Réparties sur ", c, " complexes"],
				})),
				(e[59] = c),
				(e[60] = Re))
			: (Re = e[60]);
		let Ke;
		e[61] === Symbol.for("react.memo_cache_sentinel")
			? ((Ke = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ue, { value: 85, className: "h-2" }),
				})),
				(e[61] = Ke))
			: (Ke = e[61]);
		let De;
		e[62] !== Ae || e[63] !== Re
			? ((De = s.jsxs(S, {
					children: [He, s.jsxs(w, { children: [Ae, Re, Ke] })],
				})),
				(e[62] = Ae),
				(e[63] = Re),
				(e[64] = De))
			: (De = e[64]);
		let Je;
		e[65] === Symbol.for("react.memo_cache_sentinel")
			? ((Je = s.jsxs(T, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(_, {
							className: "text-sm font-medium",
							children: "Ascenseurs",
						}),
						s.jsx(Zs, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[65] = Je))
			: (Je = e[65]);
		let Ie;
		e[66] !== ie
			? ((Ie = s.jsx("div", { className: "text-2xl font-bold", children: ie })),
				(e[66] = ie),
				(e[67] = Ie))
			: (Ie = e[67]);
		let Qe, We;
		e[68] === Symbol.for("react.memo_cache_sentinel")
			? ((Qe = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Total dans tous les complexes",
				})),
				(We = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ue, { value: 78, className: "h-2" }),
				})),
				(e[68] = Qe),
				(e[69] = We))
			: ((Qe = e[68]), (We = e[69]));
		let Ee;
		e[70] !== Ie
			? ((Ee = s.jsxs(S, {
					children: [Je, s.jsxs(w, { children: [Ie, Qe, We] })],
				})),
				(e[70] = Ie),
				(e[71] = Ee))
			: (Ee = e[71]);
		let Xe;
		e[72] === Symbol.for("react.memo_cache_sentinel")
			? ((Xe = s.jsxs(T, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(_, {
							className: "text-sm font-medium",
							children: "Événements à venir",
						}),
						s.jsx(hs, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[72] = Xe))
			: (Xe = e[72]);
		let Ye, Ze;
		e[73] === Symbol.for("react.memo_cache_sentinel")
			? ((Ye = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Prochain événement dans 3 jours",
				})),
				(Ze = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ue, { value: 60, className: "h-2" }),
				})),
				(e[73] = Ye),
				(e[74] = Ze))
			: ((Ye = e[73]), (Ze = e[74]));
		let es;
		e[75] === Symbol.for("react.memo_cache_sentinel")
			? ((es = s.jsxs(S, {
					children: [
						Xe,
						s.jsxs(w, {
							children: [
								s.jsx("div", {
									className: "text-2xl font-bold",
									children: O.length,
								}),
								Ye,
								Ze,
							],
						}),
					],
				})),
				(e[75] = es))
			: (es = e[75]),
			e[76] !== ke || e[77] !== De || e[78] !== Ee
				? ((Z = s.jsxs("div", {
						className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
						children: [ke, De, Ee, es],
					})),
					(e[76] = ke),
					(e[77] = De),
					(e[78] = Ee),
					(e[79] = Z))
				: (Z = e[79]),
			(d = Rs),
			(k = o),
			e[80] !== a
				? ((N = (p) => {
						Oe(p), a({ search: (Ts) => ({ ...Ts, view: p }) });
					}),
					(e[80] = a),
					(e[81] = N))
				: (N = e[81]),
			(A = "space-y-4"),
			e[82] === Symbol.for("react.memo_cache_sentinel")
				? ((X = s.jsxs(Ds, {
						children: [
							s.jsx(ss, { value: "overview", children: "Vue d'ensemble" }),
							s.jsx(ss, { value: "complexes", children: "Tous les complexes" }),
							s.jsx(ss, { value: "statistics", children: "Statistiques" }),
							s.jsx(ss, { value: "planning", children: "Planning" }),
						],
					})),
					(e[82] = X))
				: (X = e[82]),
			(m = ts),
			(C = "overview"),
			(P = "space-y-4");
		const is = "grid gap-4 md:grid-cols-2 lg:grid-cols-7";
		let Fe;
		e[83] === Symbol.for("react.memo_cache_sentinel")
			? ((Fe = s.jsxs(S, {
					className: "lg:col-span-4",
					children: [
						s.jsxs(T, {
							children: [
								s.jsx(_, { children: "Utilisation des complexes" }),
								s.jsx(we, { children: "Taux d'occupation par mois" }),
							],
						}),
						s.jsx(w, {
							className: "pl-2",
							children: s.jsxs("div", {
								className:
									"h-[300px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(vs, { className: "w-12 h-12" }),
									s.jsx("span", {
										className: "ml-2",
										children: "Graphique d'utilisation",
									}),
								],
							}),
						}),
					],
				})),
				(e[83] = Fe))
			: (Fe = e[83]);
		const as = S,
			ns = "lg:col-span-3";
		let Le;
		e[84] === Symbol.for("react.memo_cache_sentinel")
			? ((Le = s.jsxs(T, {
					children: [
						s.jsx(_, { children: "Événements à venir" }),
						s.jsx(we, { children: "Prochains événements dans les complexes" }),
					],
				})),
				(e[84] = Le))
			: (Le = e[84]);
		const cs = w,
			rs = "space-y-4",
			os = O.map((p) =>
				s.jsxs(
					"div",
					{
						className: "flex items-center",
						children: [
							s.jsx("div", {
								className: "w-2 h-2 mr-2 rounded-full bg-emerald-500",
							}),
							s.jsxs("div", {
								className: "flex-1 space-y-1",
								children: [
									s.jsx("p", {
										className: "text-sm font-medium leading-none",
										children: p.title,
									}),
									s.jsxs("p", {
										className: "text-sm text-muted-foreground",
										children: [p.date, " - ", p.complex],
									}),
								],
							}),
							ls(p.type),
						],
					},
					p.id,
				),
			);
		let $e;
		e[85] !== rs || e[86] !== os
			? (($e = s.jsx("div", { className: rs, children: os })),
				(e[85] = rs),
				(e[86] = os),
				(e[87] = $e))
			: ($e = e[87]);
		let Be;
		e[88] !== cs || e[89] !== $e
			? ((Be = s.jsx(cs, { children: $e })),
				(e[88] = cs),
				(e[89] = $e),
				(e[90] = Be))
			: (Be = e[90]);
		let Ve;
		e[91] !== as || e[92] !== ns || e[93] !== Le || e[94] !== Be
			? ((Ve = s.jsxs(as, { className: ns, children: [Le, Be] })),
				(e[91] = as),
				(e[92] = ns),
				(e[93] = Le),
				(e[94] = Be),
				(e[95] = Ve))
			: (Ve = e[95]),
			e[96] !== is || e[97] !== Fe || e[98] !== Ve
				? ((M = s.jsxs("div", { className: is, children: [Fe, Ve] })),
					(e[96] = is),
					(e[97] = Fe),
					(e[98] = Ve),
					(e[99] = M))
				: (M = e[99]),
			(x = "grid gap-4 md:grid-cols-2 lg:grid-cols-3"),
			(re = S),
			e[100] === Symbol.for("react.memo_cache_sentinel")
				? ((v = s.jsxs(T, {
						children: [
							s.jsx(_, { children: "Activité récente" }),
							s.jsx(we, { children: "Dernières actions sur les complexes" }),
						],
					})),
					(e[100] = v))
				: (v = e[100]),
			(W = w),
			(D = "space-y-4"),
			(ee = b.map((p) =>
				s.jsxs(
					"div",
					{
						className: "flex items-center",
						children: [
							s.jsx("div", { className: "mr-3", children: be(p.type) }),
							s.jsxs("div", {
								className: "flex-1 space-y-1",
								children: [
									s.jsx("p", {
										className: "text-sm font-medium leading-none",
										children: p.action,
									}),
									s.jsx("p", {
										className: "text-sm text-muted-foreground",
										children: p.complex,
									}),
								],
							}),
							s.jsx("div", {
								className: "text-sm text-muted-foreground",
								children: p.date,
							}),
						],
					},
					p.id,
				),
			)),
			(e[8] = o),
			(e[9] = l),
			(e[10] = a),
			(e[11] = ue),
			(e[12] = ce),
			(e[13] = W),
			(e[14] = re),
			(e[15] = m),
			(e[16] = d),
			(e[17] = x),
			(e[18] = C),
			(e[19] = P),
			(e[20] = M),
			(e[21] = k),
			(e[22] = N),
			(e[23] = A),
			(e[24] = X),
			(e[25] = R),
			(e[26] = Y),
			(e[27] = Z),
			(e[28] = D),
			(e[29] = ee),
			(e[30] = v),
			(e[31] = c);
	} else
		(W = e[13]),
			(re = e[14]),
			(m = e[15]),
			(d = e[16]),
			(x = e[17]),
			(C = e[18]),
			(P = e[19]),
			(M = e[20]),
			(k = e[21]),
			(N = e[22]),
			(A = e[23]),
			(X = e[24]),
			(R = e[25]),
			(Y = e[26]),
			(Z = e[27]),
			(D = e[28]),
			(ee = e[29]),
			(v = e[30]),
			(c = e[31]);
	let I;
	e[101] !== D || e[102] !== ee
		? ((I = s.jsx("div", { className: D, children: ee })),
			(e[101] = D),
			(e[102] = ee),
			(e[103] = I))
		: (I = e[103]);
	let se;
	e[104] !== W || e[105] !== I
		? ((se = s.jsx(W, { children: I })),
			(e[104] = W),
			(e[105] = I),
			(e[106] = se))
		: (se = e[106]);
	let E;
	e[107] !== re || e[108] !== se || e[109] !== v
		? ((E = s.jsxs(re, { children: [v, se] })),
			(e[107] = re),
			(e[108] = se),
			(e[109] = v),
			(e[110] = E))
		: (E = e[110]);
	let je;
	e[111] === Symbol.for("react.memo_cache_sentinel")
		? ((je = s.jsxs(T, {
				children: [
					s.jsx(_, { children: "Répartition par ville" }),
					s.jsx(we, { children: "Distribution des complexes par ville" }),
				],
			})),
			(e[111] = je))
		: (je = e[111]);
	let pe;
	if (e[112] !== l || e[113] !== c) {
		let b;
		e[115] !== c
			? ((b = (O) => {
					const [j, y] = O;
					return s.jsxs(
						"div",
						{
							className: "space-y-2",
							children: [
								s.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										s.jsx("div", {
											className: "text-sm font-medium",
											children: j,
										}),
										s.jsx("div", {
											className: "text-sm text-muted-foreground",
											children: y,
										}),
									],
								}),
								s.jsx(Ue, {
									value: c > 0 ? (y / c) * 100 : 0,
									className: "h-2",
								}),
							],
						},
						j,
					);
				}),
				(e[115] = c),
				(e[116] = b))
			: (b = e[116]),
			(pe = Object.entries(l.reduce(it, {})).map(b)),
			(e[112] = l),
			(e[113] = c),
			(e[114] = pe);
	} else pe = e[114];
	let te;
	e[117] !== pe
		? ((te = s.jsxs(S, {
				children: [
					je,
					s.jsx(w, {
						children: s.jsx("div", { className: "space-y-4", children: pe }),
					}),
				],
			})),
			(e[117] = pe),
			(e[118] = te))
		: (te = e[118]);
	let oe;
	e[119] === Symbol.for("react.memo_cache_sentinel")
		? ((oe = s.jsxs(T, {
				children: [
					s.jsx(_, { children: "Maintenance et alertes" }),
					s.jsx(we, { children: "État de maintenance des installations" }),
				],
			})),
			(e[119] = oe))
		: (oe = e[119]);
	let ge;
	e[120] === Symbol.for("react.memo_cache_sentinel")
		? ((ge = s.jsxs("div", {
				className: "space-y-1",
				children: [
					s.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Maintenance préventive",
					}),
					s.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "3 complexes programmés",
					}),
				],
			})),
			(e[120] = ge))
		: (ge = e[120]);
	let Ne;
	e[121] === Symbol.for("react.memo_cache_sentinel")
		? ((Ne = s.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					ge,
					s.jsxs(J, {
						variant: "outline",
						className: "text-orange-600 border-orange-600",
						children: [s.jsx(et, { className: "w-3 h-3 mr-1" }), "En attente"],
					}),
				],
			})),
			(e[121] = Ne))
		: (Ne = e[121]);
	let ve;
	e[122] === Symbol.for("react.memo_cache_sentinel")
		? ((ve = s.jsxs("div", {
				className: "space-y-1",
				children: [
					s.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Inspections sécurité",
					}),
					s.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Toutes à jour",
					}),
				],
			})),
			(e[122] = ve))
		: (ve = e[122]);
	let F;
	e[123] === Symbol.for("react.memo_cache_sentinel")
		? ((F = s.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					ve,
					s.jsxs(J, {
						className: "bg-green-600",
						children: [s.jsx(Ss, { className: "w-3 h-3 mr-1" }), "OK"],
					}),
				],
			})),
			(e[123] = F))
		: (F = e[123]);
	let me;
	e[124] === Symbol.for("react.memo_cache_sentinel")
		? ((me = s.jsxs("div", {
				className: "space-y-1",
				children: [
					s.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Équipements défaillants",
					}),
					s.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "1 signalement",
					}),
				],
			})),
			(e[124] = me))
		: (me = e[124]);
	let L;
	e[125] === Symbol.for("react.memo_cache_sentinel")
		? ((L = s.jsxs(S, {
				children: [
					oe,
					s.jsx(w, {
						children: s.jsxs("div", {
							className: "space-y-4",
							children: [
								Ne,
								F,
								s.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										me,
										s.jsxs(J, {
											variant: "destructive",
											children: [
												s.jsx(_s, { className: "w-3 h-3 mr-1" }),
												"Urgent",
											],
										}),
									],
								}),
							],
						}),
					}),
				],
			})),
			(e[125] = L))
		: (L = e[125]);
	let le;
	e[126] !== x || e[127] !== E || e[128] !== te
		? ((le = s.jsxs("div", { className: x, children: [E, te, L] })),
			(e[126] = x),
			(e[127] = E),
			(e[128] = te),
			(e[129] = le))
		: (le = e[129]);
	let $;
	e[130] !== m || e[131] !== C || e[132] !== P || e[133] !== M || e[134] !== le
		? (($ = s.jsxs(m, { value: C, className: P, children: [M, le] })),
			(e[130] = m),
			(e[131] = C),
			(e[132] = P),
			(e[133] = M),
			(e[134] = le),
			(e[135] = $))
		: ($ = e[135]);
	let B;
	e[136] !== l
		? ((B = s.jsx(ts, {
				value: "complexes",
				className: "space-y-4",
				children: s.jsx(st, { initialComplexes: l }),
			})),
			(e[136] = l),
			(e[137] = B))
		: (B = e[137]);
	let V;
	e[138] === Symbol.for("react.memo_cache_sentinel")
		? ((V = s.jsxs(T, {
				children: [
					s.jsx(_, { children: "Statistiques détaillées" }),
					s.jsx(we, {
						children: "Analyses approfondies de l'utilisation des complexes",
					}),
				],
			})),
			(e[138] = V))
		: (V = e[138]);
	let de;
	e[139] === Symbol.for("react.memo_cache_sentinel")
		? ((de = s.jsx(ts, {
				value: "statistics",
				className: "space-y-4",
				children: s.jsxs(S, {
					children: [
						V,
						s.jsx(w, {
							children: s.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(vs, { className: "w-12 h-12" }),
									s.jsx("span", {
										className: "ml-2",
										children: "Graphiques statistiques détaillés",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(e[139] = de))
		: (de = e[139]);
	let xe;
	e[140] === Symbol.for("react.memo_cache_sentinel")
		? ((xe = s.jsxs(T, {
				children: [
					s.jsx(_, { children: "Planning des installations" }),
					s.jsx(we, { children: "Calendrier d'occupation et de réservation" }),
				],
			})),
			(e[140] = xe))
		: (xe = e[140]);
	let z;
	e[141] === Symbol.for("react.memo_cache_sentinel")
		? ((z = s.jsx(ts, {
				value: "planning",
				className: "space-y-4",
				children: s.jsxs(S, {
					children: [
						xe,
						s.jsx(w, {
							children: s.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(hs, { className: "w-12 h-12" }),
									s.jsx("span", {
										className: "ml-2",
										children: "Calendrier de planning",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(e[141] = z))
		: (z = e[141]);
	let q;
	e[142] !== d ||
	e[143] !== k ||
	e[144] !== N ||
	e[145] !== A ||
	e[146] !== X ||
	e[147] !== $ ||
	e[148] !== B
		? ((q = s.jsxs(d, {
				value: k,
				onValueChange: N,
				className: A,
				children: [X, $, B, de, z],
			})),
			(e[142] = d),
			(e[143] = k),
			(e[144] = N),
			(e[145] = A),
			(e[146] = X),
			(e[147] = $),
			(e[148] = B),
			(e[149] = q))
		: (q = e[149]);
	let he;
	return (
		e[150] !== R || e[151] !== Y || e[152] !== Z || e[153] !== q
			? ((he = s.jsxs("div", { className: R, children: [Y, Z, q] })),
				(e[150] = R),
				(e[151] = Y),
				(e[152] = Z),
				(e[153] = q),
				(e[154] = he))
			: (he = e[154]),
		he
	);
}
function it(r, e) {
	return (r[e.city] = (r[e.city] || 0) + 1), r;
}
function at(r, e) {
	return r + e.numberOfElevators;
}
function nt(r, e) {
	return r + e.parkingCapacity;
}
function ct(r) {
	return r.accessibleForReducedMobility;
}
function rt(r) {
	switch (r) {
		case "maintenance":
			return s.jsx(J, {
				variant: "outline",
				className: "text-orange-600 border-orange-600",
				children: "Maintenance",
			});
		case "event":
			return s.jsx(J, { className: "bg-blue-600", children: "Événement" });
		case "inspection":
			return s.jsx(J, {
				variant: "outline",
				className: "text-purple-600 border-purple-600",
				children: "Inspection",
			});
		default:
			return s.jsx(J, { variant: "outline", children: "Autre" });
	}
}
function ot(r) {
	switch (r) {
		case "create":
			return s.jsx(Cs, { className: "w-4 h-4 text-green-600" });
		case "maintenance":
			return s.jsx(_s, { className: "w-4 h-4 text-orange-600" });
		case "booking":
			return s.jsx(Ss, { className: "w-4 h-4 text-blue-600" });
		case "update":
			return s.jsx(ws, { className: "w-4 h-4 text-purple-600" });
		default:
			return s.jsx(Xs, { className: "w-4 h-4 text-gray-600" });
	}
}
const Yt = () => {
	const e = fs.c(3);
	let u;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((u = { from: "/_authenticated/admin/_admin/facilities/complexes/" }),
			(e[0] = u))
		: (u = e[0]);
	const { complexes: g } = As(u);
	let l;
	return (
		e[1] !== g
			? ((l = s.jsx(lt, { initialComplexes: g })), (e[1] = g), (e[2] = l))
			: (l = e[2]),
		l
	);
};
export { Yt as component };
