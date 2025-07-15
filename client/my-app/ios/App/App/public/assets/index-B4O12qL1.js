import { A as Os } from "./activity-BQimCp6k.js";
import { B as J } from "./badge-BAidKpPB.js";
import { B as fs } from "./bus-KD7vR1-x.js";
import { C as js } from "./calendar-De7tcxsN.js";
import { C as Ws } from "./chart-column-FJxLrytM.js";
import { C as Gs } from "./chevron-left-BhVEjMY-.js";
import { C as Hs } from "./chevron-right-QFzs-bqo.js";
import { C as Qs } from "./circle-alert-CvO-74L-.js";
import { C as ps } from "./circle-check-big-DWIiKDvL.js";
import { C as Xs } from "./clock-Kg0fBwSd.js";
import {
	b as Bs,
	c as Es,
	d as Fs,
	a as Ls,
	e as gs,
	D as hs,
} from "./dropdown-menu-B4Bx1zOg.js";
import { E as Us } from "./ellipsis-CnaDov9f.js";
import { F as Ks } from "./funnel-DNedUVhi.js";
import {
	f as $,
	N as As,
	d as Ce,
	i as Ds,
	b as G,
	C as H,
	bD as Is,
	bC as Ps,
	B as Se,
	e as U,
	r as _e,
	c as bs,
	L as ms,
	j as s,
} from "./index-kb-Ylywn.js";
import { I as Vs } from "./input-CdkcPZS3.js";
import { P as _s } from "./plus-czqh0ZLb.js";
import { P as Ge } from "./progress-DJazw1mq.js";
import { R as Ms } from "./refresh-cw-D6CAsBlf.js";
import { S as Js } from "./search-CT8NOJQT.js";
import {
	b as Ns,
	d as ve,
	a as vs,
	S as ws,
	c as ys,
} from "./select-D8GIfri3.js";
import {
	T as $s,
	b as He,
	d as qs,
	a as us,
	e as we,
	c as zs,
} from "./table-De-kdsVW.js";
import { c as Rs, a as ds, T as ks, b as xs } from "./tabs-BDMFlPtb.js";
import { U as Ss } from "./user-check-TNP4cs-F.js";
import { U as Cs } from "./users-BMY-28E4.js";
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
function Ys(u) {
	const e = bs.c(87),
		{ initialMinibuses: K } = u,
		[a, f] = _e.useState(""),
		[n, Me] = _e.useState(1),
		[r, ne] = _e.useState("all"),
		[i, Je] = _e.useState("all"),
		{ minibuses: Ne, deleteMinibus: re } = Ps(),
		O = Ne.length > 0 ? Ne : K;
	let ee,
		c = O;
	if (a) {
		let t;
		if (e[0] !== c || e[1] !== a) {
			const l = a.toLowerCase();
			(t = c.filter(
				(m) =>
					m.name.toLowerCase().includes(l) ||
					m.licensePlate.toLowerCase().includes(l),
			)),
				(e[0] = c),
				(e[1] = a),
				(e[2] = t);
		} else t = e[2];
		c = t;
	}
	if (r !== "all") {
		let t;
		if (e[3] !== r || e[4] !== c) {
			let l;
			e[6] !== r
				? ((l = (m) =>
						r === "available"
							? m.isAvailable
							: r === "unavailable"
								? !m.isAvailable
								: !0),
					(e[6] = r),
					(e[7] = l))
				: (l = e[7]),
				(t = c.filter(l)),
				(e[3] = r),
				(e[4] = c),
				(e[5] = t);
		} else t = e[5];
		c = t;
	}
	if (i !== "all") {
		let t;
		if (e[8] !== i || e[9] !== c) {
			let l;
			e[11] !== i
				? ((l = (m) =>
						i === "small"
							? m.capacity <= 15
							: i === "medium"
								? m.capacity > 15 && m.capacity <= 30
								: i === "large"
									? m.capacity > 30
									: i === "pmr"
										? m.disabledPersonCapacity > 0
										: !0),
					(e[11] = i),
					(e[12] = l))
				: (l = e[12]),
				(t = c.filter(l)),
				(e[8] = i),
				(e[9] = c),
				(e[10] = t);
		} else t = e[10];
		c = t;
	}
	ee = c;
	const d = ee,
		o = Math.ceil(d.length / 10),
		S = (n - 1) * 10,
		p = S + 10,
		se = d.slice(S, p);
	let b, M;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((b = () => {
				Me(1);
			}),
			(M = []),
			(e[13] = b),
			(e[14] = M))
		: ((b = e[13]), (M = e[14])),
		_e.useEffect(b, M);
	let g;
	e[15] === Symbol.for("react.memo_cache_sentinel")
		? ((g = (t) => {
				f(t);
			}),
			(e[15] = g))
		: (g = e[15]);
	const ce = g;
	let v;
	e[16] !== re
		? ((v = async (t) => {
				window.confirm(
					`Êtes-vous sûr de vouloir supprimer le minibus "${t.name}" ?`,
				) && (await re(t.id));
			}),
			(e[16] = re),
			(e[17] = v))
		: (v = e[17]);
	const Q = v,
		oe = Zs;
	let T;
	e[18] === Symbol.for("react.memo_cache_sentinel")
		? ((T = (t) => {
				Me(t);
			}),
			(e[18] = T))
		: (T = e[18]);
	const _ = T;
	let P;
	e[19] !== n || e[20] !== o
		? ((P = () => {
				n < o && Me(n + 1);
			}),
			(e[19] = n),
			(e[20] = o),
			(e[21] = P))
		: (P = e[21]);
	const h = P;
	let x;
	e[22] !== n
		? ((x = () => {
				n > 1 && Me(n - 1);
			}),
			(e[22] = n),
			(e[23] = x))
		: (x = e[23]);
	const A = x;
	let D;
	e[24] !== n || e[25] !== o
		? ((D = () => {
				const t = [];
				if (o <= 5) for (let l = 1; l <= o; l++) t.push(l);
				else {
					const l = Math.max(1, n - 2),
						m = Math.min(o, l + 5 - 1);
					for (let ge = l; ge <= m; ge++) t.push(ge);
				}
				return t;
			}),
			(e[24] = n),
			(e[25] = o),
			(e[26] = D))
		: (D = e[26]);
	const W = D,
		me = "space-y-6",
		de = U;
	let te;
	e[27] === Symbol.for("react.memo_cache_sentinel")
		? ((te = s.jsx(G, { children: "Liste des minibus" })), (e[27] = te))
		: (te = e[27]);
	const X = d.length > 1 ? "s" : "",
		ye = d.length !== O.length && ` sur ${O.length} au total`;
	let N;
	e[28] !== d.length || e[29] !== X || e[30] !== ye
		? ((N = s.jsxs("div", {
				children: [
					te,
					s.jsxs(Ce, { children: [d.length, " minibus trouvé", X, ye] }),
				],
			})),
			(e[28] = d.length),
			(e[29] = X),
			(e[30] = ye),
			(e[31] = N))
		: (N = e[31]);
	let I;
	e[32] === Symbol.for("react.memo_cache_sentinel")
		? ((I = s.jsx(Se, {
				asChild: !0,
				children: s.jsxs(ms, {
					to: "/admin/assets/minibuses/create",
					children: [
						s.jsx(_s, { className: "w-4 h-4 mr-2" }),
						"Nouveau minibus",
					],
				}),
			})),
			(e[32] = I))
		: (I = e[32]);
	let R;
	e[33] !== N
		? ((R = s.jsx(H, {
				children: s.jsxs("div", {
					className:
						"flex flex-col justify-between gap-4 md:flex-row md:items-center",
					children: [N, I],
				}),
			})),
			(e[33] = N),
			(e[34] = R))
		: (R = e[34]);
	const Y = $;
	let xe;
	e[35] === Symbol.for("react.memo_cache_sentinel")
		? ((xe = s.jsx(Js, {
				className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
			})),
			(e[35] = xe))
		: (xe = e[35]);
	let k;
	e[36] === Symbol.for("react.memo_cache_sentinel")
		? ((k = (t) => ce(t.target.value)), (e[36] = k))
		: (k = e[36]);
	let y;
	e[37] !== a
		? ((y = s.jsxs("div", {
				className: "relative flex-1",
				children: [
					xe,
					s.jsx(Vs, {
						placeholder:
							"Rechercher un minibus par nom ou plaque d'immatriculation...",
						className: "pl-8",
						value: a,
						onChange: k,
					}),
				],
			})),
			(e[37] = a),
			(e[38] = y))
		: (y = e[38]);
	let B;
	e[39] === Symbol.for("react.memo_cache_sentinel")
		? ((B = s.jsx(vs, {
				className: "w-[180px]",
				children: s.jsx(Ns, { placeholder: "Disponibilité" }),
			})),
			(e[39] = B))
		: (B = e[39]);
	let le;
	e[40] === Symbol.for("react.memo_cache_sentinel")
		? ((le = s.jsxs(ys, {
				children: [
					s.jsx(ve, { value: "all", children: "Tous" }),
					s.jsx(ve, { value: "available", children: "Disponibles" }),
					s.jsx(ve, { value: "unavailable", children: "Indisponibles" }),
				],
			})),
			(e[40] = le))
		: (le = e[40]);
	let L;
	e[41] !== r
		? ((L = s.jsxs(ws, { value: r, onValueChange: ne, children: [B, le] })),
			(e[41] = r),
			(e[42] = L))
		: (L = e[42]);
	let ie;
	e[43] === Symbol.for("react.memo_cache_sentinel")
		? ((ie = s.jsx(vs, {
				className: "w-[180px]",
				children: s.jsx(Ns, { placeholder: "Capacité" }),
			})),
			(e[43] = ie))
		: (ie = e[43]);
	let ae;
	e[44] === Symbol.for("react.memo_cache_sentinel")
		? ((ae = s.jsxs(ys, {
				children: [
					s.jsx(ve, { value: "all", children: "Toutes" }),
					s.jsx(ve, { value: "small", children: "Petit (≤15)" }),
					s.jsx(ve, { value: "medium", children: "Moyen (16-30)" }),
					s.jsx(ve, { value: "large", children: "Grand (>30)" }),
					s.jsx(ve, { value: "pmr", children: "Avec PMR" }),
				],
			})),
			(e[44] = ae))
		: (ae = e[44]);
	let E;
	e[45] !== i
		? ((E = s.jsxs(ws, { value: i, onValueChange: Je, children: [ie, ae] })),
			(e[45] = i),
			(e[46] = E))
		: (E = e[46]);
	let F;
	e[47] !== L || e[48] !== E
		? ((F = s.jsxs("div", { className: "flex gap-2", children: [L, E] })),
			(e[47] = L),
			(e[48] = E),
			(e[49] = F))
		: (F = e[49]);
	let V;
	e[50] !== y || e[51] !== F
		? ((V = s.jsxs("div", {
				className: "flex flex-col gap-4 md:flex-row",
				children: [y, F],
			})),
			(e[50] = y),
			(e[51] = F),
			(e[52] = V))
		: (V = e[52]);
	let w;
	e[53] !== r || e[54] !== i || e[55] !== a
		? ((w =
				(a || r !== "all" || i !== "all") &&
				s.jsxs("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						s.jsx(Ks, { className: "w-4 h-4" }),
						s.jsx("span", { children: "Filtres actifs:" }),
						a &&
							s.jsxs(J, { variant: "secondary", children: ["Recherche: ", a] }),
						r !== "all" &&
							s.jsxs(J, {
								variant: "secondary",
								children: [
									"Disponibilité:",
									" ",
									r === "available" ? "Disponibles" : "Indisponibles",
								],
							}),
						i !== "all" &&
							s.jsxs(J, {
								variant: "secondary",
								children: [
									"Capacité:",
									" ",
									i === "small"
										? "Petit"
										: i === "medium"
											? "Moyen"
											: i === "large"
												? "Grand"
												: "Avec PMR",
								],
							}),
						s.jsx(Se, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								f(""), ne("all"), Je("all");
							},
							children: "Effacer",
						}),
					],
				})),
			(e[53] = r),
			(e[54] = i),
			(e[55] = a),
			(e[56] = w))
		: (w = e[56]);
	let C;
	e[57] !== V || e[58] !== w
		? ((C = s.jsxs("div", {
				className: "flex flex-col gap-4 mb-6",
				children: [V, w],
			})),
			(e[57] = V),
			(e[58] = w),
			(e[59] = C))
		: (C = e[59]);
	const he = "border rounded-md",
		ue = zs;
	let q;
	e[60] === Symbol.for("react.memo_cache_sentinel")
		? ((q = s.jsx($s, {
				children: s.jsxs(us, {
					children: [
						s.jsx(He, { children: "Minibus" }),
						s.jsx(He, { children: "Plaque" }),
						s.jsx(He, { children: "Capacité" }),
						s.jsx(He, { children: "Disponibilité" }),
						s.jsx(He, { children: "Créé le" }),
						s.jsx(He, { className: "w-[80px]", children: "Actions" }),
					],
				}),
			})),
			(e[60] = q))
		: (q = e[60]);
	const Z = qs,
		fe =
			se.length > 0
				? se.map((t) =>
						s.jsxs(
							us,
							{
								children: [
									s.jsx(we, {
										children: s.jsxs("div", {
											className: "flex items-center",
											children: [
												s.jsx(fs, {
													className: "w-4 h-4 mr-3 text-muted-foreground",
												}),
												s.jsxs("div", {
													children: [
														s.jsx("div", {
															className: "font-medium",
															children: t.name,
														}),
														t.description &&
															s.jsx("div", {
																className:
																	"text-sm text-muted-foreground line-clamp-1",
																children: t.description,
															}),
													],
												}),
											],
										}),
									}),
									s.jsx(we, {
										children: s.jsx("div", {
											className: "font-mono text-sm",
											children: t.licensePlate,
										}),
									}),
									s.jsx(we, {
										children: s.jsxs("div", {
											className: "space-y-1",
											children: [
												s.jsxs("div", {
													className: "flex items-center text-sm",
													children: [
														s.jsx(Cs, {
															className: "w-3 h-3 mr-1 text-muted-foreground",
														}),
														s.jsxs("span", {
															className: "font-medium",
															children: [t.capacity, " places"],
														}),
													],
												}),
												t.disabledPersonCapacity > 0 &&
													s.jsxs("div", {
														className:
															"flex items-center text-xs text-muted-foreground",
														children: [
															s.jsx(Ss, { className: "w-3 h-3 mr-1" }),
															s.jsxs("span", {
																children: [t.disabledPersonCapacity, " PMR"],
															}),
														],
													}),
											],
										}),
									}),
									s.jsx(we, {
										children: s.jsx(J, {
											variant: t.isAvailable ? "default" : "secondary",
											className: t.isAvailable
												? "bg-green-100 text-green-800 border-green-200"
												: "bg-red-100 text-red-800 border-red-200",
											children: t.isAvailable ? "Disponible" : "Indisponible",
										}),
									}),
									s.jsx(we, {
										children: s.jsxs("div", {
											className:
												"flex items-center text-sm text-muted-foreground",
											children: [
												s.jsx(js, { className: "w-3 h-3 mr-1" }),
												oe(t.createdAt),
											],
										}),
									}),
									s.jsx(we, {
										children: s.jsxs(Bs, {
											children: [
												s.jsx(Ls, {
													asChild: !0,
													children: s.jsxs(Se, {
														variant: "ghost",
														size: "icon",
														children: [
															s.jsx(Us, { className: "h-4 w-4" }),
															s.jsx("span", {
																className: "sr-only",
																children: "Menu",
															}),
														],
													}),
												}),
												s.jsxs(Es, {
													align: "end",
													children: [
														s.jsx(Fs, { children: "Actions" }),
														s.jsx(gs, {}),
														s.jsx(hs, {
															asChild: !0,
															children: s.jsx(ms, {
																to: "/admin/assets/minibuses/$minibusId",
																params: { minibusId: t.id },
																className: "w-full cursor-pointer",
																children: "Voir les détails",
															}),
														}),
														s.jsx(hs, {
															asChild: !0,
															children: s.jsx(ms, {
																to: "/admin/assets/minibuses/$minibusId/edit",
																params: { minibusId: t.id },
																className: "w-full cursor-pointer",
																children: "Modifier",
															}),
														}),
														s.jsx(gs, {}),
														s.jsx(hs, {
															className: "text-red-600",
															onClick: () => Q(t),
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
				: s.jsx(us, {
						children: s.jsx(we, {
							colSpan: 6,
							className: "h-24 text-center",
							children: s.jsxs("div", {
								className: "text-center",
								children: [
									s.jsx(fs, {
										className: "w-12 h-12 mx-auto text-gray-400 mb-4",
									}),
									s.jsx("h3", {
										className: "text-lg font-medium text-gray-900 mb-2",
										children: "Aucun minibus trouvé",
									}),
									s.jsx("p", {
										className: "text-gray-500 mb-4",
										children:
											a || r !== "all" || i !== "all"
												? "Aucun minibus ne correspond à vos critères de recherche."
												: "Commencez par créer votre premier minibus.",
									}),
								],
							}),
						}),
					});
	let je;
	e[61] !== Z || e[62] !== fe
		? ((je = s.jsx(Z, { children: fe })),
			(e[61] = Z),
			(e[62] = fe),
			(e[63] = je))
		: (je = e[63]);
	let z;
	e[64] !== ue || e[65] !== q || e[66] !== je
		? ((z = s.jsx("div", {
				className: he,
				children: s.jsxs(ue, { children: [q, je] }),
			})),
			(e[64] = ue),
			(e[65] = q),
			(e[66] = je),
			(e[67] = z))
		: (z = e[67]);
	let pe;
	e[68] !== n ||
	e[69] !== p ||
	e[70] !== d.length ||
	e[71] !== W ||
	e[72] !== _ ||
	e[73] !== h ||
	e[74] !== A ||
	e[75] !== S ||
	e[76] !== o
		? ((pe =
				o > 1 &&
				s.jsxs("div", {
					className: "flex items-center justify-between mt-4",
					children: [
						s.jsxs("div", {
							className: "text-sm text-muted-foreground",
							children: [
								"Affichage de ",
								S + 1,
								" à",
								" ",
								Math.min(p, d.length),
								" sur",
								" ",
								d.length,
								" minibus",
							],
						}),
						s.jsxs("div", {
							className: "flex items-center space-x-2",
							children: [
								s.jsxs(Se, {
									variant: "outline",
									size: "icon",
									onClick: A,
									disabled: n === 1,
									children: [
										s.jsx(Gs, { className: "h-4 w-4" }),
										s.jsx("span", {
											className: "sr-only",
											children: "Page précédente",
										}),
									],
								}),
								s.jsx("div", {
									className: "flex items-center space-x-1",
									children: W().map((t) =>
										s.jsx(
											Se,
											{
												variant: n === t ? "default" : "outline",
												size: "sm",
												onClick: () => _(t),
												children: t,
											},
											t,
										),
									),
								}),
								s.jsxs(Se, {
									variant: "outline",
									size: "icon",
									onClick: h,
									disabled: n === o,
									children: [
										s.jsx(Hs, { className: "h-4 w-4" }),
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
			(e[68] = n),
			(e[69] = p),
			(e[70] = d.length),
			(e[71] = W),
			(e[72] = _),
			(e[73] = h),
			(e[74] = A),
			(e[75] = S),
			(e[76] = o),
			(e[77] = pe))
		: (pe = e[77]);
	let be;
	e[78] !== Y || e[79] !== C || e[80] !== z || e[81] !== pe
		? ((be = s.jsxs(Y, { children: [C, z, pe] })),
			(e[78] = Y),
			(e[79] = C),
			(e[80] = z),
			(e[81] = pe),
			(e[82] = be))
		: (be = e[82]);
	let Te;
	return (
		e[83] !== de || e[84] !== R || e[85] !== be
			? ((Te = s.jsx("div", {
					className: me,
					children: s.jsxs(de, { children: [R, be] }),
				})),
				(e[83] = de),
				(e[84] = R),
				(e[85] = be),
				(e[86] = Te))
			: (Te = e[86]),
		Te
	);
}
function Zs(u) {
	return new Date(u).toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}
function et(u) {
	const e = bs.c(155),
		{ initialMinibuses: K } = u;
	let a;
	e[0] !== K
		? ((a = K === void 0 ? [] : K), (e[0] = K), (e[1] = a))
		: (a = e[1]);
	const f = a;
	let n;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((n = { strict: !1 }), (e[2] = n))
		: (n = e[2]);
	const Me = As(n),
		r = Ds(),
		ne = Me.view ?? "overview",
		[i, Je] = _e.useState(ne);
	let Ne, re;
	e[3] !== ne
		? ((Ne = () => {
				Je(ne);
			}),
			(re = [ne]),
			(e[3] = ne),
			(e[4] = Ne),
			(e[5] = re))
		: ((Ne = e[4]), (re = e[5])),
		_e.useEffect(Ne, re);
	let O, ee, c, d, o, S, p, se, b, M, g, ce, v, Q, oe, T, _, P, h, x, A;
	if (e[6] !== i || e[7] !== f || e[8] !== r) {
		const je = [
				{
					id: "1",
					action: "Nouveau minibus ajouté",
					minibus: "Minibus Sportif A",
					date: "Il y a 1 heure",
					type: "create",
				},
				{
					id: "2",
					action: "Maintenance programmée",
					minibus: "Bus Équipe Pro",
					date: "Il y a 3 heures",
					type: "maintenance",
				},
				{
					id: "3",
					action: "Réservation confirmée",
					minibus: "Minibus Jeunes",
					date: "Il y a 5 heures",
					type: "booking",
				},
				{
					id: "4",
					action: "Contrôle technique effectué",
					minibus: "Bus Transport",
					date: "Hier",
					type: "update",
				},
			],
			z = [
				{
					id: "1",
					title: "Révision générale",
					minibus: "Minibus Sportif A",
					date: "28 juin 2025",
					type: "maintenance",
				},
				{
					id: "2",
					title: "Déplacement championnat",
					minibus: "Bus Équipe Pro",
					date: "2 juillet 2025",
					type: "event",
				},
				{
					id: "3",
					title: "Contrôle technique",
					minibus: "Minibus Jeunes",
					date: "8 juillet 2025",
					type: "inspection",
				},
			],
			pe = nt,
			be = at,
			Te = it;
		x = f.length;
		let t;
		e[30] !== f ? ((t = f.filter(lt)), (e[30] = f), (e[31] = t)) : (t = e[31]),
			(h = t.length),
			(A = x - h);
		const l = f.reduce(tt, 0),
			m = f.reduce(st, 0);
		(ce = "space-y-6"),
			e[32] === Symbol.for("react.memo_cache_sentinel")
				? ((v = s.jsxs("div", {
						className:
							"flex flex-col justify-between gap-4 md:flex-row md:items-center",
						children: [
							s.jsxs("div", {
								children: [
									s.jsx("h1", {
										className: "text-3xl font-bold tracking-tight",
										children: "Flotte de minibus",
									}),
									s.jsx("p", {
										className: "text-muted-foreground",
										children: "Gérez les minibus de l'association",
									}),
								],
							}),
							s.jsx("div", {
								className: "flex items-center gap-2",
								children: s.jsxs(Se, {
									variant: "outline",
									size: "sm",
									className: "h-9",
									onClick: pe,
									children: [
										s.jsx(Ms, { className: "w-4 h-4 mr-2" }),
										"Actualiser",
									],
								}),
							}),
						],
					})),
					(e[32] = v))
				: (v = e[32]);
		let ge;
		e[33] === Symbol.for("react.memo_cache_sentinel")
			? ((ge = s.jsxs(H, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(G, {
							className: "text-sm font-medium",
							children: "Total Minibus",
						}),
						s.jsx(fs, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[33] = ge))
			: (ge = e[33]);
		let Pe;
		e[34] !== x
			? ((Pe = s.jsx("div", { className: "text-2xl font-bold", children: x })),
				(e[34] = x),
				(e[35] = Pe))
			: (Pe = e[35]);
		let Ae;
		e[36] !== h
			? ((Ae = s.jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [h, " disponibles"],
				})),
				(e[36] = h),
				(e[37] = Ae))
			: (Ae = e[37]);
		const ss = x > 0 ? (h / x) * 100 : 0;
		let De;
		e[38] !== ss
			? ((De = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ge, { value: ss, className: "h-2" }),
				})),
				(e[38] = ss),
				(e[39] = De))
			: (De = e[39]);
		let Ie;
		e[40] !== Pe || e[41] !== Ae || e[42] !== De
			? ((Ie = s.jsxs(U, {
					children: [ge, s.jsxs($, { children: [Pe, Ae, De] })],
				})),
				(e[40] = Pe),
				(e[41] = Ae),
				(e[42] = De),
				(e[43] = Ie))
			: (Ie = e[43]);
		let Ke;
		e[44] === Symbol.for("react.memo_cache_sentinel")
			? ((Ke = s.jsxs(H, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(G, {
							className: "text-sm font-medium",
							children: "Capacité Totale",
						}),
						s.jsx(Cs, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[44] = Ke))
			: (Ke = e[44]);
		let Re;
		e[45] !== l
			? ((Re = s.jsx("div", { className: "text-2xl font-bold", children: l })),
				(e[45] = l),
				(e[46] = Re))
			: (Re = e[46]);
		let Oe;
		e[47] === Symbol.for("react.memo_cache_sentinel")
			? ((Oe = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "places passagers",
				})),
				(e[47] = Oe))
			: (Oe = e[47]);
		const ts = l > 0 ? (h / l) * 100 : 0;
		let ke;
		e[48] !== ts
			? ((ke = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ge, { value: ts, className: "h-2" }),
				})),
				(e[48] = ts),
				(e[49] = ke))
			: (ke = e[49]);
		let Be;
		e[50] !== Re || e[51] !== ke
			? ((Be = s.jsxs(U, {
					children: [Ke, s.jsxs($, { children: [Re, Oe, ke] })],
				})),
				(e[50] = Re),
				(e[51] = ke),
				(e[52] = Be))
			: (Be = e[52]);
		let Qe;
		e[53] === Symbol.for("react.memo_cache_sentinel")
			? ((Qe = s.jsxs(H, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(G, {
							className: "text-sm font-medium",
							children: "Places PMR",
						}),
						s.jsx(Ss, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[53] = Qe))
			: (Qe = e[53]);
		let Le;
		e[54] !== m
			? ((Le = s.jsx("div", { className: "text-2xl font-bold", children: m })),
				(e[54] = m),
				(e[55] = Le))
			: (Le = e[55]);
		let We;
		e[56] === Symbol.for("react.memo_cache_sentinel")
			? ((We = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "personnes à mobilité réduite",
				})),
				(e[56] = We))
			: (We = e[56]);
		const ls = m > 0 ? (m / l) * 100 : 0;
		let Ee;
		e[57] !== ls
			? ((Ee = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ge, { value: ls, className: "h-2" }),
				})),
				(e[57] = ls),
				(e[58] = Ee))
			: (Ee = e[58]);
		let Fe;
		e[59] !== Le || e[60] !== Ee
			? ((Fe = s.jsxs(U, {
					children: [Qe, s.jsxs($, { children: [Le, We, Ee] })],
				})),
				(e[59] = Le),
				(e[60] = Ee),
				(e[61] = Fe))
			: (Fe = e[61]);
		let Xe;
		e[62] === Symbol.for("react.memo_cache_sentinel")
			? ((Xe = s.jsxs(H, {
					className:
						"flex flex-row items-center justify-between pb-2 space-y-0",
					children: [
						s.jsx(G, {
							className: "text-sm font-medium",
							children: "Événements à venir",
						}),
						s.jsx(js, { className: "w-4 h-4 text-muted-foreground" }),
					],
				})),
				(e[62] = Xe))
			: (Xe = e[62]);
		let Ye;
		e[63] === Symbol.for("react.memo_cache_sentinel")
			? ((Ye = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Prochain événement dans 4 jours",
				})),
				(e[63] = Ye))
			: (Ye = e[63]);
		let Ze;
		e[64] === Symbol.for("react.memo_cache_sentinel")
			? ((Ze = s.jsx("div", {
					className: "mt-4",
					children: s.jsx(Ge, {
						value: z.length > 0 ? (z.length / 10) * 100 : 0,
						className: "h-2",
					}),
				})),
				(e[64] = Ze))
			: (Ze = e[64]);
		let es;
		e[65] === Symbol.for("react.memo_cache_sentinel")
			? ((es = s.jsxs(U, {
					children: [
						Xe,
						s.jsxs($, {
							children: [
								s.jsx("div", {
									className: "text-2xl font-bold",
									children: z.length,
								}),
								Ye,
								Ze,
							],
						}),
					],
				})),
				(e[65] = es))
			: (es = e[65]),
			e[66] !== Ie || e[67] !== Be || e[68] !== Fe
				? ((Q = s.jsxs("div", {
						className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
						children: [Ie, Be, Fe, es],
					})),
					(e[66] = Ie),
					(e[67] = Be),
					(e[68] = Fe),
					(e[69] = Q))
				: (Q = e[69]),
			(d = Rs),
			(se = i),
			e[70] !== r
				? ((b = (j) => {
						Je(j), r({ search: (Ts) => ({ ...Ts, view: j }) });
					}),
					(e[70] = r),
					(e[71] = b))
				: (b = e[71]),
			(M = "space-y-4"),
			e[72] === Symbol.for("react.memo_cache_sentinel")
				? ((g = s.jsxs(ks, {
						children: [
							s.jsx(ds, { value: "overview", children: "Vue d'ensemble" }),
							s.jsx(ds, { value: "minibuses", children: "Tous les minibus" }),
							s.jsx(ds, { value: "planning", children: "Planning" }),
						],
					})),
					(e[72] = g))
				: (g = e[72]),
			(c = xs),
			(o = "overview"),
			(S = "space-y-4");
		const is = "grid gap-4 md:grid-cols-2 lg:grid-cols-7";
		let Ve;
		e[73] === Symbol.for("react.memo_cache_sentinel")
			? ((Ve = s.jsxs(U, {
					className: "lg:col-span-4",
					children: [
						s.jsxs(H, {
							children: [
								s.jsx(G, { children: "Utilisation des minibus" }),
								s.jsx(Ce, { children: "Taux d'occupation par mois" }),
							],
						}),
						s.jsx($, {
							className: "pl-2",
							children: s.jsxs("div", {
								className:
									"h-[300px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(Ws, { className: "w-12 h-12" }),
									s.jsx("span", {
										className: "ml-2",
										children: "Graphique d'utilisation",
									}),
								],
							}),
						}),
					],
				})),
				(e[73] = Ve))
			: (Ve = e[73]);
		const as = U,
			ns = "lg:col-span-3";
		let qe;
		e[74] === Symbol.for("react.memo_cache_sentinel")
			? ((qe = s.jsxs(H, {
					children: [
						s.jsx(G, { children: "Événements à venir" }),
						s.jsx(Ce, { children: "Prochains événements pour les minibus" }),
					],
				})),
				(e[74] = qe))
			: (qe = e[74]);
		const rs = $,
			cs = "space-y-4",
			os = z.map((j) =>
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
										children: j.title,
									}),
									s.jsxs("p", {
										className: "text-sm text-muted-foreground",
										children: [j.date, " - ", j.minibus],
									}),
								],
							}),
							Te(j.type),
						],
					},
					j.id,
				),
			);
		let ze;
		e[75] !== cs || e[76] !== os
			? ((ze = s.jsx("div", { className: cs, children: os })),
				(e[75] = cs),
				(e[76] = os),
				(e[77] = ze))
			: (ze = e[77]);
		let $e;
		e[78] !== rs || e[79] !== ze
			? (($e = s.jsx(rs, { children: ze })),
				(e[78] = rs),
				(e[79] = ze),
				(e[80] = $e))
			: ($e = e[80]);
		let Ue;
		e[81] !== as || e[82] !== ns || e[83] !== qe || e[84] !== $e
			? ((Ue = s.jsxs(as, { className: ns, children: [qe, $e] })),
				(e[81] = as),
				(e[82] = ns),
				(e[83] = qe),
				(e[84] = $e),
				(e[85] = Ue))
			: (Ue = e[85]),
			e[86] !== is || e[87] !== Ve || e[88] !== Ue
				? ((p = s.jsxs("div", { className: is, children: [Ve, Ue] })),
					(e[86] = is),
					(e[87] = Ve),
					(e[88] = Ue),
					(e[89] = p))
				: (p = e[89]),
			(P = "grid gap-4 md:grid-cols-2 lg:grid-cols-3"),
			(ee = U),
			e[90] === Symbol.for("react.memo_cache_sentinel")
				? ((_ = s.jsxs(H, {
						children: [
							s.jsx(G, { children: "Activité récente" }),
							s.jsx(Ce, { children: "Dernières actions sur les minibus" }),
						],
					})),
					(e[90] = _))
				: (_ = e[90]),
			(O = $),
			(oe = "space-y-4"),
			(T = je.map((j) =>
				s.jsxs(
					"div",
					{
						className: "flex items-center",
						children: [
							s.jsx("div", { className: "mr-3", children: be(j.type) }),
							s.jsxs("div", {
								className: "flex-1 space-y-1",
								children: [
									s.jsx("p", {
										className: "text-sm font-medium leading-none",
										children: j.action,
									}),
									s.jsx("p", {
										className: "text-sm text-muted-foreground",
										children: j.minibus,
									}),
								],
							}),
							s.jsx("div", {
								className: "text-sm text-muted-foreground",
								children: j.date,
							}),
						],
					},
					j.id,
				),
			)),
			(e[6] = i),
			(e[7] = f),
			(e[8] = r),
			(e[9] = O),
			(e[10] = ee),
			(e[11] = c),
			(e[12] = d),
			(e[13] = o),
			(e[14] = S),
			(e[15] = p),
			(e[16] = se),
			(e[17] = b),
			(e[18] = M),
			(e[19] = g),
			(e[20] = ce),
			(e[21] = v),
			(e[22] = Q),
			(e[23] = oe),
			(e[24] = T),
			(e[25] = _),
			(e[26] = P),
			(e[27] = h),
			(e[28] = x),
			(e[29] = A);
	} else
		(O = e[9]),
			(ee = e[10]),
			(c = e[11]),
			(d = e[12]),
			(o = e[13]),
			(S = e[14]),
			(p = e[15]),
			(se = e[16]),
			(b = e[17]),
			(M = e[18]),
			(g = e[19]),
			(ce = e[20]),
			(v = e[21]),
			(Q = e[22]),
			(oe = e[23]),
			(T = e[24]),
			(_ = e[25]),
			(P = e[26]),
			(h = e[27]),
			(x = e[28]),
			(A = e[29]);
	let D;
	e[91] !== oe || e[92] !== T
		? ((D = s.jsx("div", { className: oe, children: T })),
			(e[91] = oe),
			(e[92] = T),
			(e[93] = D))
		: (D = e[93]);
	let W;
	e[94] !== O || e[95] !== D
		? ((W = s.jsx(O, { children: D })), (e[94] = O), (e[95] = D), (e[96] = W))
		: (W = e[96]);
	let me;
	e[97] !== ee || e[98] !== W || e[99] !== _
		? ((me = s.jsxs(ee, { children: [_, W] })),
			(e[97] = ee),
			(e[98] = W),
			(e[99] = _),
			(e[100] = me))
		: (me = e[100]);
	let de;
	e[101] === Symbol.for("react.memo_cache_sentinel")
		? ((de = s.jsxs(H, {
				children: [
					s.jsx(G, { children: "État de la flotte" }),
					s.jsx(Ce, { children: "Statut opérationnel des véhicules" }),
				],
			})),
			(e[101] = de))
		: (de = e[101]);
	let te;
	e[102] === Symbol.for("react.memo_cache_sentinel")
		? ((te = s.jsx("div", {
				className: "text-sm font-medium",
				children: "Disponibles",
			})),
			(e[102] = te))
		: (te = e[102]);
	let X;
	e[103] !== h
		? ((X = s.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					te,
					s.jsx("div", {
						className: "text-sm text-muted-foreground",
						children: h,
					}),
				],
			})),
			(e[103] = h),
			(e[104] = X))
		: (X = e[104]);
	const ye = x > 0 ? (h / x) * 100 : 0;
	let N;
	e[105] !== ye
		? ((N = s.jsx(Ge, { value: ye, className: "h-2" })),
			(e[105] = ye),
			(e[106] = N))
		: (N = e[106]);
	let I;
	e[107] !== X || e[108] !== N
		? ((I = s.jsxs("div", { className: "space-y-2", children: [X, N] })),
			(e[107] = X),
			(e[108] = N),
			(e[109] = I))
		: (I = e[109]);
	let R;
	e[110] === Symbol.for("react.memo_cache_sentinel")
		? ((R = s.jsx("div", {
				className: "text-sm font-medium",
				children: "Indisponibles",
			})),
			(e[110] = R))
		: (R = e[110]);
	let Y;
	e[111] !== A
		? ((Y = s.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					R,
					s.jsx("div", {
						className: "text-sm text-muted-foreground",
						children: A,
					}),
				],
			})),
			(e[111] = A),
			(e[112] = Y))
		: (Y = e[112]);
	const xe = x > 0 ? (A / x) * 100 : 0;
	let k;
	e[113] !== xe
		? ((k = s.jsx(Ge, { value: xe, className: "h-2" })),
			(e[113] = xe),
			(e[114] = k))
		: (k = e[114]);
	let y;
	e[115] !== Y || e[116] !== k
		? ((y = s.jsxs("div", { className: "space-y-2", children: [Y, k] })),
			(e[115] = Y),
			(e[116] = k),
			(e[117] = y))
		: (y = e[117]);
	let B;
	e[118] !== I || e[119] !== y
		? ((B = s.jsxs(U, {
				children: [
					de,
					s.jsx($, {
						children: s.jsxs("div", {
							className: "space-y-4",
							children: [I, y],
						}),
					}),
				],
			})),
			(e[118] = I),
			(e[119] = y),
			(e[120] = B))
		: (B = e[120]);
	let le;
	e[121] === Symbol.for("react.memo_cache_sentinel")
		? ((le = s.jsxs(H, {
				children: [
					s.jsx(G, { children: "Maintenance et alertes" }),
					s.jsx(Ce, { children: "État de maintenance des minibus" }),
				],
			})),
			(e[121] = le))
		: (le = e[121]);
	let L;
	e[122] === Symbol.for("react.memo_cache_sentinel")
		? ((L = s.jsxs("div", {
				className: "space-y-1",
				children: [
					s.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Maintenance préventive",
					}),
					s.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "2 minibus programmés",
					}),
				],
			})),
			(e[122] = L))
		: (L = e[122]);
	let ie;
	e[123] === Symbol.for("react.memo_cache_sentinel")
		? ((ie = s.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					L,
					s.jsxs(J, {
						variant: "outline",
						className: "text-orange-600 border-orange-600",
						children: [s.jsx(Xs, { className: "w-3 h-3 mr-1" }), "En attente"],
					}),
				],
			})),
			(e[123] = ie))
		: (ie = e[123]);
	let ae;
	e[124] === Symbol.for("react.memo_cache_sentinel")
		? ((ae = s.jsxs("div", {
				className: "space-y-1",
				children: [
					s.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Contrôles techniques",
					}),
					s.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Tous à jour",
					}),
				],
			})),
			(e[124] = ae))
		: (ae = e[124]);
	let E;
	e[125] === Symbol.for("react.memo_cache_sentinel")
		? ((E = s.jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					ae,
					s.jsxs(J, {
						className: "bg-green-600",
						children: [s.jsx(ps, { className: "w-3 h-3 mr-1" }), "OK"],
					}),
				],
			})),
			(e[125] = E))
		: (E = e[125]);
	let F;
	e[126] === Symbol.for("react.memo_cache_sentinel")
		? ((F = s.jsxs("div", {
				className: "space-y-1",
				children: [
					s.jsx("p", {
						className: "text-sm font-medium leading-none",
						children: "Réparations urgentes",
					}),
					s.jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Aucune",
					}),
				],
			})),
			(e[126] = F))
		: (F = e[126]);
	let V;
	e[127] === Symbol.for("react.memo_cache_sentinel")
		? ((V = s.jsxs(U, {
				children: [
					le,
					s.jsx($, {
						children: s.jsxs("div", {
							className: "space-y-4",
							children: [
								ie,
								E,
								s.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										F,
										s.jsxs(J, {
											className: "bg-green-600",
											children: [
												s.jsx(ps, { className: "w-3 h-3 mr-1" }),
												"OK",
											],
										}),
									],
								}),
							],
						}),
					}),
				],
			})),
			(e[127] = V))
		: (V = e[127]);
	let w;
	e[128] !== me || e[129] !== B || e[130] !== P
		? ((w = s.jsxs("div", { className: P, children: [me, B, V] })),
			(e[128] = me),
			(e[129] = B),
			(e[130] = P),
			(e[131] = w))
		: (w = e[131]);
	let C;
	e[132] !== c || e[133] !== o || e[134] !== S || e[135] !== p || e[136] !== w
		? ((C = s.jsxs(c, { value: o, className: S, children: [p, w] })),
			(e[132] = c),
			(e[133] = o),
			(e[134] = S),
			(e[135] = p),
			(e[136] = w),
			(e[137] = C))
		: (C = e[137]);
	let he;
	e[138] !== f
		? ((he = s.jsx(xs, {
				value: "minibuses",
				className: "space-y-4",
				children: s.jsx(Ys, { initialMinibuses: f }),
			})),
			(e[138] = f),
			(e[139] = he))
		: (he = e[139]);
	let ue;
	e[140] === Symbol.for("react.memo_cache_sentinel")
		? ((ue = s.jsxs(H, {
				children: [
					s.jsx(G, { children: "Planning des minibus" }),
					s.jsx(Ce, { children: "Calendrier de réservation et maintenance" }),
				],
			})),
			(e[140] = ue))
		: (ue = e[140]);
	let q;
	e[141] === Symbol.for("react.memo_cache_sentinel")
		? ((q = s.jsx(xs, {
				value: "planning",
				className: "space-y-4",
				children: s.jsxs(U, {
					children: [
						ue,
						s.jsx($, {
							children: s.jsxs("div", {
								className:
									"h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-md",
								children: [
									s.jsx(js, { className: "w-12 h-12 text-muted-foreground" }),
									s.jsx("span", {
										className: "ml-2 text-muted-foreground",
										children: "Calendrier de planning",
									}),
								],
							}),
						}),
					],
				}),
			})),
			(e[141] = q))
		: (q = e[141]);
	let Z;
	e[142] !== d ||
	e[143] !== se ||
	e[144] !== b ||
	e[145] !== M ||
	e[146] !== g ||
	e[147] !== C ||
	e[148] !== he
		? ((Z = s.jsxs(d, {
				value: se,
				onValueChange: b,
				className: M,
				children: [g, C, he, q],
			})),
			(e[142] = d),
			(e[143] = se),
			(e[144] = b),
			(e[145] = M),
			(e[146] = g),
			(e[147] = C),
			(e[148] = he),
			(e[149] = Z))
		: (Z = e[149]);
	let fe;
	return (
		e[150] !== ce || e[151] !== v || e[152] !== Q || e[153] !== Z
			? ((fe = s.jsxs("div", { className: ce, children: [v, Q, Z] })),
				(e[150] = ce),
				(e[151] = v),
				(e[152] = Q),
				(e[153] = Z),
				(e[154] = fe))
			: (fe = e[154]),
		fe
	);
}
function st(u, e) {
	return u + e.disabledPersonCapacity;
}
function tt(u, e) {
	return u + e.capacity;
}
function lt(u) {
	return u.isAvailable;
}
function it(u) {
	switch (u) {
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
function at(u) {
	switch (u) {
		case "create":
			return s.jsx(_s, { className: "w-4 h-4 text-green-600" });
		case "maintenance":
			return s.jsx(Qs, { className: "w-4 h-4 text-orange-600" });
		case "booking":
			return s.jsx(ps, { className: "w-4 h-4 text-blue-600" });
		case "update":
			return s.jsx(Ms, { className: "w-4 h-4 text-purple-600" });
		default:
			return s.jsx(Os, { className: "w-4 h-4 text-gray-600" });
	}
}
async function nt() {
	window.location.reload();
}
const Jt = () => {
	const e = bs.c(2),
		{ minibuses: K } = Is.useLoaderData();
	let a;
	return (
		e[0] !== K
			? ((a = s.jsx(et, { initialMinibuses: K })), (e[0] = K), (e[1] = a))
			: (a = e[1]),
		a
	);
};
export { Jt as component };
