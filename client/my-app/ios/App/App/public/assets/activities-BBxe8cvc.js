import { A as $e, b as Je, a as Ke } from "./avatar-DIRgKWh1.js";
import { B as Oe } from "./badge-BAidKpPB.js";
import { C as os } from "./calendar-days-jtWlYB0j.js";
import { C as Ze } from "./clock-Kg0fBwSd.js";
import {
	b as Qe,
	e as Te,
	a as We,
	c as Xe,
	d as Ye,
	D as x,
} from "./dropdown-menu-B4Bx1zOg.js";
import { E as ss } from "./ellipsis-CnaDov9f.js";
import { C as is, f as rs } from "./fr-CxjLSI5r.js";
import { F as qe } from "./funnel-DNedUVhi.js";
import {
	c as He,
	d as Pe,
	r as Ue,
	B as _e,
	b as be,
	f as fe,
	j as s,
	e as ue,
	C as ye,
} from "./index-kb-Ylywn.js";
import { L as ze } from "./label-B9JbzJbC.js";
import { M as es } from "./map-pin-DywQhs4x.js";
import { P as Re } from "./plus-czqh0ZLb.js";
import {
	c as Ne,
	S as Se,
	b as ge,
	d as p,
	a as ve,
} from "./select-D8GIfri3.js";
import {
	c as Be,
	d as Ge,
	b as i,
	T as ke,
	a as q,
	e as t,
} from "./table-De-kdsVW.js";
import { b as Ae, a as Ie, T as cs, c as ns } from "./tabs-BDMFlPtb.js";
import { U as ds } from "./users-BMY-28E4.js";
import "./index-DauBq6FI.js";
import "./index-Dl_6cIao.js";
import "./index-Bv1xjdPd.js";
import "./chevron-left-BhVEjMY-.js";
import "./chevron-right-QFzs-bqo.js";
import "./chevron-down-CMzABl4R.js";
import "./buildMatchPatternFn-DF4FdbSS.js";
import "./index-Dqr9Wf5M.js";
import "./index-3Axhna2x.js";
import "./index-CnLXGm6V.js";
import "./index-CvBT1pZ2.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
import "./index-BP52hRXm.js";
import "./index-mnH6Jux_.js";
import "./index-C6LbJ2-_.js";
import "./chevron-up-DyH28r2x.js";
const Ce = [
		{
			id: crypto.randomUUID(),
			name: "Entraînement de football",
			type: "Entraînement",
			category: "Football",
			date: "15/05/2025",
			time: "18:00 - 20:00",
			location: "Stade municipal",
			coach: "Alexandre Dupont",
			participants: 18,
			maxParticipants: 22,
		},
		{
			id: crypto.randomUUID(),
			name: "Match de basketball",
			type: "Compétition",
			category: "Basketball",
			date: "17/05/2025",
			time: "14:00 - 16:00",
			location: "Gymnase central",
			coach: "Marie Leroy",
			participants: 12,
			maxParticipants: 12,
		},
		{
			id: crypto.randomUUID(),
			name: "Cours de natation débutants",
			type: "Cours",
			category: "Natation",
			date: "18/05/2025",
			time: "10:00 - 11:30",
			location: "Piscine municipale",
			coach: "Thomas Martin",
			participants: 8,
			maxParticipants: 10,
		},
		{
			id: crypto.randomUUID(),
			name: "Tournoi de tennis",
			type: "Compétition",
			category: "Tennis",
			date: "20/05/2025",
			time: "09:00 - 18:00",
			location: "Courts de tennis",
			coach: "Sophie Dubois",
			participants: 16,
			maxParticipants: 16,
		},
		{
			id: crypto.randomUUID(),
			name: "Cours de danse moderne",
			type: "Cours",
			category: "Danse",
			date: "21/05/2025",
			time: "17:30 - 19:00",
			location: "Salle polyvalente",
			coach: "Julie Moreau",
			participants: 12,
			maxParticipants: 15,
		},
		{
			id: crypto.randomUUID(),
			name: "Entraînement de judo",
			type: "Entraînement",
			category: "Judo",
			date: "22/05/2025",
			time: "18:30 - 20:30",
			location: "Dojo municipal",
			coach: "David Bernard",
			participants: 14,
			maxParticipants: 20,
		},
		{
			id: crypto.randomUUID(),
			name: "Compétition de gymnastique",
			type: "Compétition",
			category: "Gymnastique",
			date: "25/05/2025",
			time: "13:00 - 17:00",
			location: "Gymnase central",
			coach: "Nathalie Petit",
			participants: 20,
			maxParticipants: 25,
		},
		{
			id: crypto.randomUUID(),
			name: "Entraînement d'athlétisme",
			type: "Entraînement",
			category: "Athlétisme",
			date: "26/05/2025",
			time: "17:00 - 19:00",
			location: "Piste d'athlétisme",
			coach: "Pierre Lefebvre",
			participants: 15,
			maxParticipants: 25,
		},
	],
	ms = [
		{
			id: crypto.randomUUID(),
			name: "Stade municipal",
			type: "Terrain extérieur",
			capacity: 500,
			address: "12 rue du Sport, 93380 Pierrefitte-sur-Seine",
			availability: "Lundi-Dimanche, 8h-22h",
		},
		{
			id: crypto.randomUUID(),
			name: "Gymnase central",
			type: "Salle intérieure",
			capacity: 200,
			address: "5 avenue des Jeux, 93380 Pierrefitte-sur-Seine",
			availability: "Lundi-Samedi, 9h-21h",
		},
		{
			id: crypto.randomUUID(),
			name: "Piscine municipale",
			type: "Piscine",
			capacity: 100,
			address: "8 rue de la Natation, 93380 Pierrefitte-sur-Seine",
			availability: "Mardi-Dimanche, 10h-20h",
		},
		{
			id: crypto.randomUUID(),
			name: "Courts de tennis",
			type: "Terrain extérieur",
			capacity: 50,
			address: "15 allée du Tennis, 93380 Pierrefitte-sur-Seine",
			availability: "Lundi-Dimanche, 8h-21h",
		},
		{
			id: crypto.randomUUID(),
			name: "Salle polyvalente",
			type: "Salle intérieure",
			capacity: 150,
			address: "3 boulevard des Arts, 93380 Pierrefitte-sur-Seine",
			availability: "Lundi-Vendredi, 9h-22h",
		},
	];
function hs() {
	const e = He.c(109);
	let n;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((n = new Date()), (e[0] = n))
		: (n = e[0]);
	const [r, ts] = Ue.useState(n),
		[a, Me] = Ue.useState("all"),
		[l, Le] = Ue.useState("all");
	let j, u, f, y, b, N, v, c, g, o, d, S, m, C, _, T, w, h;
	if (e[1] !== a || e[2] !== r || e[3] !== l) {
		let Q;
		e[22] !== a || e[23] !== l
			? ((Q = (Fe) => {
					const as = a === "all" || Fe.category === a,
						ls = l === "all" || Fe.type === l;
					return as && ls;
				}),
				(e[22] = a),
				(e[23] = l),
				(e[24] = Q))
			: (Q = e[24]);
		const W = Ce.filter(Q);
		let X;
		e[25] === Symbol.for("react.memo_cache_sentinel")
			? ((X = Array.from(new Set(Ce.map(Cs)))), (e[25] = X))
			: (X = e[25]);
		const Ee = X;
		let Y;
		e[26] === Symbol.for("react.memo_cache_sentinel")
			? ((Y = Array.from(new Set(Ce.map(Ss)))), (e[26] = Y))
			: (Y = e[26]);
		const Ve = Y;
		g = "space-y-6";
		let Z;
		e[27] === Symbol.for("react.memo_cache_sentinel")
			? ((Z = s.jsxs("div", {
					children: [
						s.jsx("h1", {
							className: "text-3xl font-bold tracking-tight",
							children: "Gestion des activités",
						}),
						s.jsx("p", {
							className: "text-muted-foreground",
							children:
								"Planifiez et gérez les activités sportives et les installations.",
						}),
					],
				})),
				(e[27] = Z))
			: (Z = e[27]),
			e[28] === Symbol.for("react.memo_cache_sentinel")
				? ((o = s.jsxs("div", {
						className:
							"flex flex-col justify-between gap-4 md:flex-row md:items-center",
						children: [
							Z,
							s.jsx("div", {
								className: "flex items-center gap-2",
								children: s.jsxs(_e, {
									size: "sm",
									className: "h-9",
									children: [
										s.jsx(Re, { className: "w-4 h-4 mr-2" }),
										"Nouvelle activité",
									],
								}),
							}),
						],
					})),
					(e[28] = o))
				: (o = e[28]),
			(N = ns),
			(T = "calendar"),
			(w = "space-y-4"),
			e[29] === Symbol.for("react.memo_cache_sentinel")
				? ((h = s.jsxs(cs, {
						children: [
							s.jsx(Ie, { value: "calendar", children: "Calendrier" }),
							s.jsx(Ie, { value: "list", children: "Liste des activités" }),
							s.jsx(Ie, { value: "facilities", children: "Installations" }),
						],
					})),
					(e[29] = h))
				: (h = e[29]);
		let ee;
		e[30] === Symbol.for("react.memo_cache_sentinel")
			? ((ee = s.jsxs(ye, {
					children: [
						s.jsx(be, { children: "Calendrier des activités" }),
						s.jsx(Pe, { children: "Vue d'ensemble des activités planifiées" }),
					],
				})),
				(e[30] = ee))
			: (ee = e[30]);
		let E;
		e[31] !== r
			? ((E = s.jsx("div", {
					className: "p-3",
					children: s.jsx(is, {
						mode: "single",
						selected: r,
						onSelect: ts,
						className: "rounded-md border",
						locale: rs,
					}),
				})),
				(e[31] = r),
				(e[32] = E))
			: (E = e[32]);
		let se;
		e[33] === Symbol.for("react.memo_cache_sentinel")
			? ((se = s.jsx("h3", {
					className: "font-medium",
					children: "Activités du jour",
				})),
				(e[33] = se))
			: (se = e[33]);
		const we = s.jsxs("div", {
			className: "mt-6 space-y-4",
			children: [se, W.filter(gs).map(vs)],
		});
		let V;
		e[34] !== E || e[35] !== we
			? ((V = s.jsxs(ue, {
					className: "md:col-span-5",
					children: [ee, s.jsxs(fe, { children: [E, we] })],
				})),
				(e[34] = E),
				(e[35] = we),
				(e[36] = V))
			: (V = e[36]);
		let te;
		e[37] === Symbol.for("react.memo_cache_sentinel")
			? ((te = s.jsx(ye, { children: s.jsx(be, { children: "Filtres" }) })),
				(e[37] = te))
			: (te = e[37]);
		let ae;
		e[38] === Symbol.for("react.memo_cache_sentinel")
			? ((ae = s.jsx(ze, { children: "Catégorie" })), (e[38] = ae))
			: (ae = e[38]);
		let le;
		e[39] === Symbol.for("react.memo_cache_sentinel")
			? ((le = s.jsx(ve, {
					children: s.jsx(ge, { placeholder: "Toutes les catégories" }),
				})),
				(e[39] = le))
			: (le = e[39]);
		let ie;
		e[40] === Symbol.for("react.memo_cache_sentinel")
			? ((ie = s.jsxs(Ne, {
					children: [
						s.jsx(p, { value: "all", children: "Toutes les catégories" }),
						Ee.map(Ns),
					],
				})),
				(e[40] = ie))
			: (ie = e[40]);
		let F;
		e[41] !== a
			? ((F = s.jsxs("div", {
					className: "space-y-2",
					children: [
						ae,
						s.jsxs(Se, { value: a, onValueChange: Me, children: [le, ie] }),
					],
				})),
				(e[41] = a),
				(e[42] = F))
			: (F = e[42]);
		let re;
		e[43] === Symbol.for("react.memo_cache_sentinel")
			? ((re = s.jsx(ze, { children: "Type" })), (e[43] = re))
			: (re = e[43]);
		let ne;
		e[44] === Symbol.for("react.memo_cache_sentinel")
			? ((ne = s.jsx(ve, {
					children: s.jsx(ge, { placeholder: "Tous les types" }),
				})),
				(e[44] = ne))
			: (ne = e[44]);
		let ce;
		e[45] === Symbol.for("react.memo_cache_sentinel")
			? ((ce = s.jsxs(Ne, {
					children: [
						s.jsx(p, { value: "all", children: "Tous les types" }),
						Ve.map(bs),
					],
				})),
				(e[45] = ce))
			: (ce = e[45]);
		let z;
		e[46] !== l
			? ((z = s.jsxs("div", {
					className: "space-y-2",
					children: [
						re,
						s.jsxs(Se, { value: l, onValueChange: Le, children: [ne, ce] }),
					],
				})),
				(e[46] = l),
				(e[47] = z))
			: (z = e[47]);
		let oe;
		e[48] === Symbol.for("react.memo_cache_sentinel")
			? ((oe = s.jsx("h3", {
					className: "mb-2 text-sm font-medium",
					children: "Coachs disponibles",
				})),
				(e[48] = oe))
			: (oe = e[48]);
		let de;
		e[49] === Symbol.for("react.memo_cache_sentinel")
			? ((de = s.jsxs("div", {
					className: "pt-4",
					children: [
						oe,
						s.jsx("div", {
							className: "space-y-3",
							children: Ce.slice(0, 4).map(ys),
						}),
					],
				})),
				(e[49] = de))
			: (de = e[49]);
		let B;
		e[50] !== F || e[51] !== z
			? ((B = s.jsxs(ue, {
					className: "md:col-span-2",
					children: [
						te,
						s.jsxs(fe, { className: "space-y-4", children: [F, z, de] }),
					],
				})),
				(e[50] = F),
				(e[51] = z),
				(e[52] = B))
			: (B = e[52]),
			e[53] !== V || e[54] !== B
				? ((c = s.jsx(Ae, {
						value: "calendar",
						className: "space-y-4",
						children: s.jsxs("div", {
							className: "grid gap-4 md:grid-cols-7",
							children: [V, B],
						}),
					})),
					(e[53] = V),
					(e[54] = B),
					(e[55] = c))
				: (c = e[55]),
			(b = Ae),
			(C = "list"),
			(_ = "space-y-4"),
			(y = ue);
		let me;
		e[56] === Symbol.for("react.memo_cache_sentinel")
			? ((me = s.jsx(be, { children: "Liste des activités" })), (e[56] = me))
			: (me = e[56]);
		const De = s.jsxs("div", {
			className: "flex-1",
			children: [
				me,
				s.jsxs(Pe, { children: [W.length, " activités trouvées"] }),
			],
		});
		let he;
		e[57] === Symbol.for("react.memo_cache_sentinel")
			? ((he = s.jsxs(ve, {
					className: "w-[180px]",
					children: [
						s.jsx(qe, { className: "w-4 h-4 mr-2" }),
						s.jsx(ge, { placeholder: "Catégorie" }),
					],
				})),
				(e[57] = he))
			: (he = e[57]);
		let xe;
		e[58] === Symbol.for("react.memo_cache_sentinel")
			? ((xe = s.jsxs(Ne, {
					children: [
						s.jsx(p, { value: "all", children: "Toutes les catégories" }),
						Ee.map(fs),
					],
				})),
				(e[58] = xe))
			: (xe = e[58]);
		let G;
		e[59] !== a
			? ((G = s.jsxs(Se, { value: a, onValueChange: Me, children: [he, xe] })),
				(e[59] = a),
				(e[60] = G))
			: (G = e[60]);
		let pe;
		e[61] === Symbol.for("react.memo_cache_sentinel")
			? ((pe = s.jsxs(ve, {
					className: "w-[180px]",
					children: [
						s.jsx(qe, { className: "w-4 h-4 mr-2" }),
						s.jsx(ge, { placeholder: "Type" }),
					],
				})),
				(e[61] = pe))
			: (pe = e[61]);
		let je;
		e[62] === Symbol.for("react.memo_cache_sentinel")
			? ((je = s.jsxs(Ne, {
					children: [
						s.jsx(p, { value: "all", children: "Tous les types" }),
						Ve.map(us),
					],
				})),
				(e[62] = je))
			: (je = e[62]);
		let k;
		e[63] !== l
			? ((k = s.jsxs(Se, { value: l, onValueChange: Le, children: [pe, je] })),
				(e[63] = l),
				(e[64] = k))
			: (k = e[64]);
		let R;
		e[65] !== G || e[66] !== k
			? ((R = s.jsxs("div", {
					className: "flex items-center gap-2",
					children: [G, k],
				})),
				(e[65] = G),
				(e[66] = k),
				(e[67] = R))
			: (R = e[67]),
			e[68] !== De || e[69] !== R
				? ((m = s.jsxs(ye, {
						className: "flex flex-row items-center",
						children: [De, R],
					})),
					(e[68] = De),
					(e[69] = R),
					(e[70] = m))
				: (m = e[70]),
			(f = fe),
			(S = "border rounded-md"),
			(u = Be),
			e[71] === Symbol.for("react.memo_cache_sentinel")
				? ((d = s.jsx(ke, {
						children: s.jsxs(q, {
							children: [
								s.jsx(i, { children: "Activité" }),
								s.jsx(i, { children: "Date et heure" }),
								s.jsx(i, { children: "Lieu" }),
								s.jsx(i, { children: "Coach" }),
								s.jsx(i, { children: "Participants" }),
								s.jsx(i, { className: "w-[80px]", children: "Actions" }),
							],
						}),
					})),
					(e[71] = d))
				: (d = e[71]),
			(j = Ge),
			(v =
				W.length > 0
					? W.map(ps)
					: s.jsx(q, {
							children: s.jsx(t, {
								colSpan: 6,
								className: "h-24 text-center",
								children: "Aucune activité trouvée.",
							}),
						})),
			(e[1] = a),
			(e[2] = r),
			(e[3] = l),
			(e[4] = j),
			(e[5] = u),
			(e[6] = f),
			(e[7] = y),
			(e[8] = b),
			(e[9] = N),
			(e[10] = v),
			(e[11] = c),
			(e[12] = g),
			(e[13] = o),
			(e[14] = d),
			(e[15] = S),
			(e[16] = m),
			(e[17] = C),
			(e[18] = _),
			(e[19] = T),
			(e[20] = w),
			(e[21] = h);
	} else
		(j = e[4]),
			(u = e[5]),
			(f = e[6]),
			(y = e[7]),
			(b = e[8]),
			(N = e[9]),
			(v = e[10]),
			(c = e[11]),
			(g = e[12]),
			(o = e[13]),
			(d = e[14]),
			(S = e[15]),
			(m = e[16]),
			(C = e[17]),
			(_ = e[18]),
			(T = e[19]),
			(w = e[20]),
			(h = e[21]);
	let D;
	e[72] !== j || e[73] !== v
		? ((D = s.jsx(j, { children: v })), (e[72] = j), (e[73] = v), (e[74] = D))
		: (D = e[74]);
	let U;
	e[75] !== u || e[76] !== D || e[77] !== d
		? ((U = s.jsxs(u, { children: [d, D] })),
			(e[75] = u),
			(e[76] = D),
			(e[77] = d),
			(e[78] = U))
		: (U = e[78]);
	let P;
	e[79] !== U || e[80] !== S
		? ((P = s.jsx("div", { className: S, children: U })),
			(e[79] = U),
			(e[80] = S),
			(e[81] = P))
		: (P = e[81]);
	let A;
	e[82] !== f || e[83] !== P
		? ((A = s.jsx(f, { children: P })), (e[82] = f), (e[83] = P), (e[84] = A))
		: (A = e[84]);
	let I;
	e[85] !== y || e[86] !== A || e[87] !== m
		? ((I = s.jsxs(y, { children: [m, A] })),
			(e[85] = y),
			(e[86] = A),
			(e[87] = m),
			(e[88] = I))
		: (I = e[88]);
	let M;
	e[89] !== b || e[90] !== I || e[91] !== C || e[92] !== _
		? ((M = s.jsx(b, { value: C, className: _, children: I })),
			(e[89] = b),
			(e[90] = I),
			(e[91] = C),
			(e[92] = _),
			(e[93] = M))
		: (M = e[93]);
	let H;
	e[94] === Symbol.for("react.memo_cache_sentinel")
		? ((H = s.jsxs("div", {
				children: [
					s.jsx(be, { children: "Installations sportives" }),
					s.jsx(Pe, {
						children: "Gérez les installations disponibles pour les activités",
					}),
				],
			})),
			(e[94] = H))
		: (H = e[94]);
	let J;
	e[95] === Symbol.for("react.memo_cache_sentinel")
		? ((J = s.jsx(ye, {
				children: s.jsxs("div", {
					className: "flex items-center justify-between",
					children: [
						H,
						s.jsxs(_e, {
							size: "sm",
							children: [
								s.jsx(Re, { className: "w-4 h-4 mr-2" }),
								"Ajouter une installation",
							],
						}),
					],
				}),
			})),
			(e[95] = J))
		: (J = e[95]);
	let $;
	e[96] === Symbol.for("react.memo_cache_sentinel")
		? (($ = s.jsx(ke, {
				children: s.jsxs(q, {
					children: [
						s.jsx(i, { children: "Nom" }),
						s.jsx(i, { children: "Type" }),
						s.jsx(i, { children: "Capacité" }),
						s.jsx(i, { children: "Adresse" }),
						s.jsx(i, { children: "Disponibilité" }),
						s.jsx(i, { className: "w-[80px]", children: "Actions" }),
					],
				}),
			})),
			(e[96] = $))
		: ($ = e[96]);
	let K;
	e[97] === Symbol.for("react.memo_cache_sentinel")
		? ((K = s.jsx(Ae, {
				value: "facilities",
				className: "space-y-4",
				children: s.jsxs(ue, {
					children: [
						J,
						s.jsx(fe, {
							children: s.jsx("div", {
								className: "border rounded-md",
								children: s.jsxs(Be, {
									children: [$, s.jsx(Ge, { children: ms.map(xs) })],
								}),
							}),
						}),
					],
				}),
			})),
			(e[97] = K))
		: (K = e[97]);
	let L;
	e[98] !== N ||
	e[99] !== c ||
	e[100] !== M ||
	e[101] !== T ||
	e[102] !== w ||
	e[103] !== h
		? ((L = s.jsxs(N, {
				defaultValue: T,
				className: w,
				children: [h, c, M, K],
			})),
			(e[98] = N),
			(e[99] = c),
			(e[100] = M),
			(e[101] = T),
			(e[102] = w),
			(e[103] = h),
			(e[104] = L))
		: (L = e[104]);
	let O;
	return (
		e[105] !== g || e[106] !== o || e[107] !== L
			? ((O = s.jsxs("div", { className: g, children: [o, L] })),
				(e[105] = g),
				(e[106] = o),
				(e[107] = L),
				(e[108] = O))
			: (O = e[108]),
		O
	);
}
function xs(e) {
	return s.jsxs(
		q,
		{
			children: [
				s.jsx(t, {
					children: s.jsx("div", {
						className: "font-medium",
						children: e.name,
					}),
				}),
				s.jsx(t, { children: e.type }),
				s.jsxs(t, { children: [e.capacity, " personnes"] }),
				s.jsx(t, { children: e.address }),
				s.jsx(t, { children: e.availability }),
				s.jsx(t, {
					children: s.jsxs(Qe, {
						children: [
							s.jsx(We, {
								asChild: !0,
								children: s.jsxs(_e, {
									variant: "ghost",
									size: "icon",
									children: [
										s.jsx(ss, { className: "h-4 w-4" }),
										s.jsx("span", { className: "sr-only", children: "Menu" }),
									],
								}),
							}),
							s.jsxs(Xe, {
								align: "end",
								children: [
									s.jsx(Ye, { children: "Actions" }),
									s.jsx(Te, {}),
									s.jsx(x, { children: "Voir les détails" }),
									s.jsx(x, { children: "Modifier" }),
									s.jsx(x, { children: "Voir le planning" }),
									s.jsx(Te, {}),
									s.jsx(x, { children: "Réserver" }),
								],
							}),
						],
					}),
				}),
			],
		},
		e.id,
	);
}
function ps(e) {
	return s.jsxs(
		q,
		{
			children: [
				s.jsx(t, {
					children: s.jsxs("div", {
						children: [
							s.jsx("div", { className: "font-medium", children: e.name }),
							s.jsxs("div", {
								className: "flex items-center mt-1",
								children: [
									s.jsx(Oe, {
										variant: e.type === "Compétition" ? "default" : "outline",
										className: "text-xs",
										children: e.type,
									}),
									s.jsx("span", {
										className: "ml-2 text-xs text-muted-foreground",
										children: e.category,
									}),
								],
							}),
						],
					}),
				}),
				s.jsxs(t, {
					children: [
						s.jsxs("div", {
							className: "flex items-center",
							children: [
								s.jsx(os, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
								s.jsx("span", { children: e.date }),
							],
						}),
						s.jsxs("div", {
							className: "flex items-center mt-1 text-sm text-muted-foreground",
							children: [
								s.jsx(Ze, { className: "w-4 h-4 mr-1" }),
								s.jsx("span", { children: e.time }),
							],
						}),
					],
				}),
				s.jsx(t, {
					children: s.jsxs("div", {
						className: "flex items-center",
						children: [
							s.jsx(es, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
							s.jsx("span", { children: e.location }),
						],
					}),
				}),
				s.jsx(t, {
					children: s.jsxs("div", {
						className: "flex items-center",
						children: [
							s.jsxs(Je, {
								className: "h-6 w-6 mr-2",
								children: [
									s.jsx($e, {
										src: "/placeholder.svg?height=24&width=24",
										alt: e.coach,
									}),
									s.jsx(Ke, { children: e.coach.split(" ").map(js).join("") }),
								],
							}),
							s.jsx("span", { children: e.coach }),
						],
					}),
				}),
				s.jsxs(t, {
					children: [
						s.jsxs("div", {
							className: "flex items-center",
							children: [
								s.jsx(ds, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
								s.jsxs("span", {
									children: [e.participants, "/", e.maxParticipants],
								}),
							],
						}),
						s.jsx("div", {
							className:
								"w-full h-2 mt-1 bg-gray-100 rounded-full dark:bg-gray-700",
							children: s.jsx("div", {
								className: "h-2 rounded-full bg-emerald-500",
								style: {
									width: `${(e.participants / e.maxParticipants) * 100}%`,
								},
							}),
						}),
					],
				}),
				s.jsx(t, {
					children: s.jsxs(Qe, {
						children: [
							s.jsx(We, {
								asChild: !0,
								children: s.jsxs(_e, {
									variant: "ghost",
									size: "icon",
									children: [
										s.jsx(ss, { className: "h-4 w-4" }),
										s.jsx("span", { className: "sr-only", children: "Menu" }),
									],
								}),
							}),
							s.jsxs(Xe, {
								align: "end",
								children: [
									s.jsx(Ye, { children: "Actions" }),
									s.jsx(Te, {}),
									s.jsx(x, { children: "Voir les détails" }),
									s.jsx(x, { children: "Modifier" }),
									s.jsx(x, { children: "Gérer les participants" }),
									s.jsx(Te, {}),
									s.jsx(x, { className: "text-red-600", children: "Annuler" }),
								],
							}),
						],
					}),
				}),
			],
		},
		e.id,
	);
}
function js(e) {
	return e[0];
}
function us(e) {
	return s.jsx(p, { value: e, children: e }, e);
}
function fs(e) {
	return s.jsx(p, { value: e, children: e }, e);
}
function ys(e) {
	return s.jsxs(
		"div",
		{
			className: "flex items-center gap-2",
			children: [
				s.jsxs(Je, {
					className: "h-8 w-8",
					children: [
						s.jsx($e, {
							src: "/placeholder.svg?height=32&width=32",
							alt: e.coach,
						}),
						s.jsx(Ke, { children: e.coach[0] }),
					],
				}),
				s.jsx("div", { className: "text-sm", children: e.coach }),
			],
		},
		e.id,
	);
}
function bs(e) {
	return s.jsx(p, { value: e, children: e }, e);
}
function Ns(e) {
	return s.jsx(p, { value: e, children: e }, e);
}
function vs(e) {
	return s.jsxs(
		"div",
		{
			className: "flex items-center p-3 border rounded-md",
			children: [
				s.jsxs("div", {
					className: "flex-1",
					children: [
						s.jsx("div", { className: "font-medium", children: e.name }),
						s.jsxs("div", {
							className: "flex items-center mt-1 text-sm text-muted-foreground",
							children: [
								s.jsx(Ze, { className: "w-4 h-4 mr-1" }),
								e.time,
								s.jsx(es, { className: "w-4 h-4 ml-3 mr-1" }),
								e.location,
							],
						}),
					],
				}),
				s.jsx(Oe, {
					variant: e.type === "Compétition" ? "default" : "outline",
					children: e.type,
				}),
			],
		},
		e.id,
	);
}
function gs(e) {
	return e.date === "15/05/2025";
}
function Ss(e) {
	return e.type;
}
function Cs(e) {
	return e.category;
}
const it = () => {
	const n = He.c(1);
	let r;
	return (
		n[0] === Symbol.for("react.memo_cache_sentinel")
			? ((r = s.jsx(hs, {})), (n[0] = r))
			: (r = n[0]),
		r
	);
};
export { it as component };
