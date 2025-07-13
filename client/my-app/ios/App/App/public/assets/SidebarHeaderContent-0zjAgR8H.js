import { L as $e } from "./Logo-BEbQ983O.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import { a as ie, b as oe, A as re } from "./avatar-DIRgKWh1.js";
import {
	g as Ce,
	i as De,
	h as Me,
	D as U,
	b as fe,
	a as he,
	f as ke,
	e as le,
	c as ue,
	d as we,
} from "./dropdown-menu-B4Bx1zOg.js";
import {
	c as B,
	q as Ne,
	a as W,
	k as _e,
	R as be,
	h as ce,
	t as ge,
	B as je,
	u as pe,
	g as se,
	j as t,
	L as te,
	z as xe,
	i as ye,
} from "./index-kb-Ylywn.js";
import { P as Te } from "./palette-D-QMsnM0.js";
import { u as Se, j as ae, e as de, k as me } from "./sidebar-D2Jh6HtQ.js";
import { S as Z, M as ee, L as ne } from "./sun-BHPvtmae.js";
import { u as ve } from "./useLocation-Boh3DZN6.js";
import { u as Le } from "./useQuery-DObI4S3_.js";
import { U as Ae } from "./user-B8jYVTBx.js";
const Ie = [
		["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
		["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }],
	],
	Ue = W("chevrons-up-down", Ie); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = [
		[
			"path",
			{ d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
		],
		[
			"path",
			{
				d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
				key: "1d0kgt",
			},
		],
	],
	tt = W("house", Oe); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qe = [
		["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
		["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
		["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
	],
	ze = W("log-out", qe); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = [
		["path", { d: "M4 11a9 9 0 0 1 9 9", key: "pv89mb" }],
		["path", { d: "M4 4a16 16 0 0 1 16 16", key: "k0647b" }],
		["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }],
	],
	st = W("rss", He);
function Pe(c) {
	const e = B.c(11),
		{ IconComponent: s, title: o, url: r, isActive: i } = c,
		m = i === void 0 ? !1 : i;
	let h;
	e[0] !== s ? ((h = t.jsx(s, {})), (e[0] = s), (e[1] = h)) : (h = e[1]);
	let f;
	e[2] !== o
		? ((f = t.jsx("span", { children: o })), (e[2] = o), (e[3] = f))
		: (f = e[3]);
	let n;
	e[4] !== m || e[5] !== h || e[6] !== f
		? ((n = t.jsxs(ae, { isActive: m, children: [h, f] })),
			(e[4] = m),
			(e[5] = h),
			(e[6] = f),
			(e[7] = n))
		: (n = e[7]);
	let d;
	return (
		e[8] !== n || e[9] !== r
			? ((d = t.jsx(me, { children: t.jsx(te, { to: r, children: n }) })),
				(e[8] = n),
				(e[9] = r),
				(e[10] = d))
			: (d = e[10]),
		d
	);
}
function at(c) {
	const e = B.c(5),
		{ items: s } = c,
		o = ve().pathname;
	let r;
	if (e[0] !== s || e[1] !== o) {
		let i;
		e[3] !== o
			? ((i = (m) => t.jsx(Pe, { ...m, isActive: o === m.url }, m.title)),
				(e[3] = o),
				(e[4] = i))
			: (i = e[4]),
			(r = s.map(i)),
			(e[0] = s),
			(e[1] = o),
			(e[2] = r);
	} else r = e[2];
	return r;
}
function Re(c) {
	const e = B.c(59),
		{ user: s, variant: o } = c,
		r = o === void 0 ? "default" : o,
		{ theme: i, setTheme: m } = xe();
	let h;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((h = se()), (e[0] = h))
		: (h = e[0]);
	let f;
	e[1] !== s
		? ((f = { ...h, initialData: s }), (e[1] = s), (e[2] = f))
		: (f = e[2]);
	const { data: n } = Le(f);
	let d;
	e[3] !== n
		? ((d = {
				mutationFn: async (l) => {
					const p =
							n != null && n.preferences
								? typeof n.preferences == "string"
									? JSON.parse(n.preferences)
									: n.preferences
								: {},
						z = { ...p, accessibility: { ...p.accessibility, theme: l } },
						{ data: I } = await ce.updateUser({
							preferences: JSON.stringify(z),
						});
					if (!(I != null && I.status))
						throw new Error("Échec de la mise à jour du thème");
					return { newTheme: l, updatedPreferences: z };
				},
				onSuccess: Qe,
				onError: Ee,
			}),
			(e[3] = n),
			(e[4] = d))
		: (d = e[4]);
	const D = pe(d);
	let j;
	e[5] !== m || e[6] !== D
		? ((j = (l) => {
				m(l === "auto" ? "system" : l), D.mutate(l);
			}),
			(e[5] = m),
			(e[6] = D),
			(e[7] = j))
		: (j = e[7]);
	const a = j,
		g = (() => {
			const l = i === "system" ? "auto" : i;
			return console.log("Using local theme for selection:", l), l;
		})();
	if (r === "submenu") {
		let l;
		e[8] !== a ? ((l = () => a("light")), (e[8] = a), (e[9] = l)) : (l = e[9]);
		const p = g === "light" ? "bg-accent" : "";
		let z, I;
		e[10] === Symbol.for("react.memo_cache_sentinel")
			? ((z = t.jsx(Z, { className: "mr-2 h-4 w-4" })),
				(I = t.jsx("span", { children: "Clair" })),
				(e[10] = z),
				(e[11] = I))
			: ((z = e[10]), (I = e[11]));
		let H;
		e[12] !== l || e[13] !== p
			? ((H = t.jsxs(U, { onClick: l, className: p, children: [z, I] })),
				(e[12] = l),
				(e[13] = p),
				(e[14] = H))
			: (H = e[14]);
		let P;
		e[15] !== a
			? ((P = () => a("dark")), (e[15] = a), (e[16] = P))
			: (P = e[16]);
		const X = g === "dark" ? "bg-accent" : "";
		let F, V;
		e[17] === Symbol.for("react.memo_cache_sentinel")
			? ((F = t.jsx(ee, { className: "mr-2 h-4 w-4" })),
				(V = t.jsx("span", { children: "Sombre" })),
				(e[17] = F),
				(e[18] = V))
			: ((F = e[17]), (V = e[18]));
		let R;
		e[19] !== P || e[20] !== X
			? ((R = t.jsxs(U, { onClick: P, className: X, children: [F, V] })),
				(e[19] = P),
				(e[20] = X),
				(e[21] = R))
			: (R = e[21]);
		let E;
		e[22] !== a
			? ((E = () => a("auto")), (e[22] = a), (e[23] = E))
			: (E = e[23]);
		const Y = g === "auto" ? "bg-accent" : "";
		let J, G;
		e[24] === Symbol.for("react.memo_cache_sentinel")
			? ((J = t.jsx(ne, { className: "mr-2 h-4 w-4" })),
				(G = t.jsx("span", { children: "Automatique" })),
				(e[24] = J),
				(e[25] = G))
			: ((J = e[24]), (G = e[25]));
		let Q;
		e[26] !== E || e[27] !== Y
			? ((Q = t.jsxs(U, { onClick: E, className: Y, children: [J, G] })),
				(e[26] = E),
				(e[27] = Y),
				(e[28] = Q))
			: (Q = e[28]);
		let K;
		return (
			e[29] !== H || e[30] !== R || e[31] !== Q
				? ((K = t.jsxs(t.Fragment, { children: [H, R, Q] })),
					(e[29] = H),
					(e[30] = R),
					(e[31] = Q),
					(e[32] = K))
				: (K = e[32]),
			K
		);
	}
	let N;
	e[33] === Symbol.for("react.memo_cache_sentinel")
		? ((N = t.jsx(he, {
				asChild: !0,
				children: t.jsxs(je, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8",
					children: [
						t.jsx(Z, {
							className:
								"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
						}),
						t.jsx(ee, {
							className:
								"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
						}),
						t.jsx("span", {
							className: "sr-only",
							children: "Changer le thème",
						}),
					],
				}),
			})),
			(e[33] = N))
		: (N = e[33]);
	let L;
	e[34] !== a
		? ((L = () => a("light")), (e[34] = a), (e[35] = L))
		: (L = e[35]);
	const q = g === "light" ? "bg-accent" : "";
	let b, y;
	e[36] === Symbol.for("react.memo_cache_sentinel")
		? ((y = t.jsx(Z, { className: "mr-2 h-4 w-4" })),
			(b = t.jsx("span", { children: "Clair" })),
			(e[36] = b),
			(e[37] = y))
		: ((b = e[36]), (y = e[37]));
	let u;
	e[38] !== L || e[39] !== q
		? ((u = t.jsxs(U, { onClick: L, className: q, children: [y, b] })),
			(e[38] = L),
			(e[39] = q),
			(e[40] = u))
		: (u = e[40]);
	let x;
	e[41] !== a ? ((x = () => a("dark")), (e[41] = a), (e[42] = x)) : (x = e[42]);
	const A = g === "dark" ? "bg-accent" : "";
	let _, v;
	e[43] === Symbol.for("react.memo_cache_sentinel")
		? ((_ = t.jsx(ee, { className: "mr-2 h-4 w-4" })),
			(v = t.jsx("span", { children: "Sombre" })),
			(e[43] = _),
			(e[44] = v))
		: ((_ = e[43]), (v = e[44]));
	let S;
	e[45] !== x || e[46] !== A
		? ((S = t.jsxs(U, { onClick: x, className: A, children: [_, v] })),
			(e[45] = x),
			(e[46] = A),
			(e[47] = S))
		: (S = e[47]);
	let w;
	e[48] !== a ? ((w = () => a("auto")), (e[48] = a), (e[49] = w)) : (w = e[49]);
	const $ = g === "auto" ? "bg-accent" : "";
	let k, T;
	e[50] === Symbol.for("react.memo_cache_sentinel")
		? ((k = t.jsx(ne, { className: "mr-2 h-4 w-4" })),
			(T = t.jsx("span", { children: "Automatique" })),
			(e[50] = k),
			(e[51] = T))
		: ((k = e[50]), (T = e[51]));
	let C;
	e[52] !== w || e[53] !== $
		? ((C = t.jsxs(U, { onClick: w, className: $, children: [k, T] })),
			(e[52] = w),
			(e[53] = $),
			(e[54] = C))
		: (C = e[54]);
	let M;
	return (
		e[55] !== u || e[56] !== S || e[57] !== C
			? ((M = t.jsxs(fe, {
					children: [N, t.jsxs(ue, { align: "end", children: [u, S, C] })],
				})),
				(e[55] = u),
				(e[56] = S),
				(e[57] = C),
				(e[58] = M))
			: (M = e[58]),
		M
	);
}
function Ee(c) {
	ge.error("Erreur lors du changement de thème"),
		console.error("Theme update error:", c);
}
function Qe() {
	Ne.invalidateQueries(se());
}
function Be(c) {
	const e = B.c(57),
		{ user: s } = c,
		{ isMobile: o } = Se(),
		r = ye(),
		i = _e();
	let m;
	e[0] !== r || e[1] !== i
		? ((m = async () => {
				i.removeQueries(se()),
					await ce.signOut({
						fetchOptions: {
							onSuccess: () => {
								r({ to: "/" });
							},
						},
					});
			}),
			(e[0] = r),
			(e[1] = i),
			(e[2] = m))
		: (m = e[2]);
	const h = m,
		f = s.image ?? void 0;
	let n;
	e[3] !== f || e[4] !== s.name
		? ((n = t.jsx(re, { src: f, alt: s.name })),
			(e[3] = f),
			(e[4] = s.name),
			(e[5] = n))
		: (n = e[5]);
	let d;
	e[6] !== s.firstName[0]
		? ((d = t.jsx(ie, { className: "rounded-lg", children: s.firstName[0] })),
			(e[6] = s.firstName[0]),
			(e[7] = d))
		: (d = e[7]);
	let D;
	e[8] !== n || e[9] !== d
		? ((D = t.jsxs(oe, { className: "h-8 w-8 rounded-lg", children: [n, d] })),
			(e[8] = n),
			(e[9] = d),
			(e[10] = D))
		: (D = e[10]);
	let j;
	e[11] !== s.name
		? ((j = t.jsx("span", {
				className: "truncate font-semibold",
				children: s.name,
			})),
			(e[11] = s.name),
			(e[12] = j))
		: (j = e[12]);
	let a;
	e[13] !== s.email
		? ((a = t.jsx("span", {
				className: "truncate text-xs",
				children: s.email,
			})),
			(e[13] = s.email),
			(e[14] = a))
		: (a = e[14]);
	let O;
	e[15] !== j || e[16] !== a
		? ((O = t.jsxs("div", {
				className: "grid flex-1 text-left text-sm leading-tight",
				children: [j, a],
			})),
			(e[15] = j),
			(e[16] = a),
			(e[17] = O))
		: (O = e[17]);
	let g;
	e[18] === Symbol.for("react.memo_cache_sentinel")
		? ((g = t.jsx(Ue, { className: "ml-auto size-4" })), (e[18] = g))
		: (g = e[18]);
	let N;
	e[19] !== D || e[20] !== O
		? ((N = t.jsx(he, {
				asChild: !0,
				children: t.jsxs(ae, {
					size: "lg",
					className:
						"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
					children: [D, O, g],
				}),
			})),
			(e[19] = D),
			(e[20] = O),
			(e[21] = N))
		: (N = e[21]);
	const L = o ? "bottom" : "right",
		q = s.image ?? void 0;
	let b;
	e[22] !== q || e[23] !== s.name
		? ((b = t.jsx(re, { src: q, alt: s.name })),
			(e[22] = q),
			(e[23] = s.name),
			(e[24] = b))
		: (b = e[24]);
	let y;
	e[25] !== s.firstName[0]
		? ((y = t.jsx(ie, { className: "rounded-lg", children: s.firstName[0] })),
			(e[25] = s.firstName[0]),
			(e[26] = y))
		: (y = e[26]);
	let u;
	e[27] !== b || e[28] !== y
		? ((u = t.jsxs(oe, { className: "h-8 w-8 rounded-lg", children: [b, y] })),
			(e[27] = b),
			(e[28] = y),
			(e[29] = u))
		: (u = e[29]);
	let x;
	e[30] !== s.name
		? ((x = t.jsx("span", {
				className: "truncate font-semibold",
				children: s.name,
			})),
			(e[30] = s.name),
			(e[31] = x))
		: (x = e[31]);
	let A;
	e[32] !== s.email
		? ((A = t.jsx("span", {
				className: "truncate text-xs",
				children: s.email,
			})),
			(e[32] = s.email),
			(e[33] = A))
		: (A = e[33]);
	let _;
	e[34] !== x || e[35] !== A
		? ((_ = t.jsxs("div", {
				className: "grid flex-1 text-left text-sm leading-tight",
				children: [x, A],
			})),
			(e[34] = x),
			(e[35] = A),
			(e[36] = _))
		: (_ = e[36]);
	let v;
	e[37] !== u || e[38] !== _
		? ((v = t.jsx(we, {
				className: "p-0 font-normal",
				children: t.jsxs("div", {
					className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm",
					children: [u, _],
				}),
			})),
			(e[37] = u),
			(e[38] = _),
			(e[39] = v))
		: (v = e[39]);
	let S;
	e[40] === Symbol.for("react.memo_cache_sentinel")
		? ((S = t.jsx(le, {})), (e[40] = S))
		: (S = e[40]);
	let w;
	e[41] === Symbol.for("react.memo_cache_sentinel")
		? ((w = t.jsx(U, {
				asChild: !0,
				children: t.jsxs(te, {
					to: "/user/profile",
					children: [t.jsx(Ae, {}), "Compte"],
				}),
			})),
			(e[41] = w))
		: (w = e[41]);
	let $;
	e[42] === Symbol.for("react.memo_cache_sentinel")
		? (($ = t.jsxs(ke, {
				children: [
					t.jsx(Te, { className: "h-4 w-4 mr-2" }),
					t.jsx("span", { children: "Thème" }),
				],
			})),
			(e[42] = $))
		: ($ = e[42]);
	let k;
	e[43] !== s
		? ((k = t.jsxs(Ce, {
				children: [
					w,
					t.jsxs(Me, {
						children: [
							$,
							t.jsx(De, {
								children: t.jsx(Re, { user: s, variant: "submenu" }),
							}),
						],
					}),
				],
			})),
			(e[43] = s),
			(e[44] = k))
		: (k = e[44]);
	let T;
	e[45] === Symbol.for("react.memo_cache_sentinel")
		? ((T = t.jsx(le, {})), (e[45] = T))
		: (T = e[45]);
	let C;
	e[46] === Symbol.for("react.memo_cache_sentinel")
		? ((C = t.jsx(ze, {})), (e[46] = C))
		: (C = e[46]);
	let M;
	e[47] !== h
		? ((M = t.jsxs(U, {
				onClick: h,
				className: "cursor-pointer",
				variant: "destructive",
				children: [C, "Me déconnecter"],
			})),
			(e[47] = h),
			(e[48] = M))
		: (M = e[48]);
	let l;
	e[49] !== L || e[50] !== v || e[51] !== k || e[52] !== M
		? ((l = t.jsxs(ue, {
				className:
					"w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
				side: L,
				align: "end",
				sideOffset: 4,
				children: [v, S, k, T, M],
			})),
			(e[49] = L),
			(e[50] = v),
			(e[51] = k),
			(e[52] = M),
			(e[53] = l))
		: (l = e[53]);
	let p;
	return (
		e[54] !== N || e[55] !== l
			? ((p = t.jsx(de, {
					children: t.jsx(me, { children: t.jsxs(fe, { children: [N, l] }) }),
				})),
				(e[54] = N),
				(e[55] = l),
				(e[56] = p))
			: (p = e[56]),
		p
	);
}
function lt() {
	const c = B.c(2),
		{ user: e } = be.useLoaderData();
	let s;
	return (
		c[0] !== e
			? ((s = t.jsx(Be, { user: e })), (c[0] = e), (c[1] = s))
			: (s = c[1]),
		s
	);
}
function nt(c) {
	const e = B.c(3),
		{ siteName: s } = c,
		o = s === void 0 ? "ASP Hub" : s;
	let r;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((r = t.jsx($e, {})), (e[0] = r))
		: (r = e[0]);
	let i;
	return (
		e[1] !== o
			? ((i = t.jsx(de, {
					children: t.jsx(ae, {
						asChild: !0,
						children: t.jsxs(te, {
							to: "/",
							children: [
								r,
								t.jsx("span", { className: "text-lg font-bold", children: o }),
							],
						}),
					}),
				})),
				(e[1] = o),
				(e[2] = i))
			: (i = e[2]),
		i
	);
}
export { tt as H, at as N, st as R, nt as S, lt as a };
