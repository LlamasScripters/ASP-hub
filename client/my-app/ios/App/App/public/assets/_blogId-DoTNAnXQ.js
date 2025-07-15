import { a as Ae, b as ze } from "./avatar-DIRgKWh1.js";
import { B as Ue } from "./badge-BAidKpPB.js";
import { C as Ge } from "./calendar-De7tcxsN.js";
import { C as We } from "./chevron-up-DyH28r2x.js";
import { C as Oe } from "./copy-DzRsFaQv.js";
import {
	bQ as $e,
	l as B,
	a as Ce,
	L as Le,
	r as R,
	g as Se,
	B as U,
	e as de,
	f as me,
	j as t,
	c as ve,
	t as ye,
} from "./index-kb-Ylywn.js";
import { M as Je } from "./message-circle-B7OulW_p.js";
import { S as Pe } from "./separator-DDNy3jpa.js";
import { S as Te } from "./share-2-LkRok7S2.js";
import { T as Me } from "./textarea-CTVCAbGX.js";
import {
	h as Be,
	f as De,
	e as Ee,
	i as Fe,
	j as He,
	m as Qe,
	g as Re,
	l as Ve,
	k as qe,
} from "./useBlogQueries-VhutstJQ.js";
import { u as Ie } from "./useQuery-DObI4S3_.js";
import { U as Ye } from "./user-B8jYVTBx.js";
import "./index-DauBq6FI.js";
import "./index-Dl_6cIao.js";
import "./index-Bv1xjdPd.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ke = [
		[
			"path",
			{
				d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
				key: "1jg4f8",
			},
		],
	],
	Xe = Ce("facebook", Ke); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = [
		[
			"path",
			{
				d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
				key: "c2jq9f",
			},
		],
		["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
		["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
	],
	et = Ce("linkedin", Ze); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = [
		[
			"path",
			{
				d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
				key: "pff0z6",
			},
		],
	],
	st = Ce("twitter", tt);
function at(r) {
	const e = ve.c(35),
		{ commentId: s, className: i } = r;
	let w;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((w = new Set()), (e[0] = w))
		: (w = e[0]);
	const [b, he] = R.useState(w),
		{ data: I, isLoading: xe } = Ee();
	let h;
	e[1] !== I
		? ((h = I === void 0 ? [] : I), (e[1] = I), (e[2] = h))
		: (h = e[2]);
	const _ = h,
		{ data: y, isLoading: $ } = De(s);
	let k;
	e[3] !== y
		? ((k = y === void 0 ? [] : y), (e[3] = y), (e[4] = k))
		: (k = e[4]);
	const m = k,
		{ data: a } = Re(s);
	let u;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((u = Se()), (e[5] = u))
		: (u = e[5]);
	const { data: C } = Ie(u),
		o = Be();
	let v;
	e[6] !== s || e[7] !== C || e[8] !== o
		? ((v = async (c) => {
				if (!C) {
					ye.error("Vous devez être connecté pour réagir");
					return;
				}
				try {
					await o.mutateAsync({ commentId: s, reactionId: c });
				} catch (d) {
					console.error("Erreur lors de la réaction:", d);
				}
			}),
			(e[6] = s),
			(e[7] = C),
			(e[8] = o),
			(e[9] = v))
		: (v = e[9]);
	const p = v;
	let S;
	e[10] === Symbol.for("react.memo_cache_sentinel")
		? ((S = (c) => {
				he((d) => new Set(d).add(c));
			}),
			(e[10] = S))
		: (S = e[10]);
	const P = S,
		E = lt;
	if (xe || $) {
		let c;
		e[11] !== i
			? ((c = B("flex items-center gap-1", i)), (e[11] = i), (e[12] = c))
			: (c = e[12]);
		let d;
		e[13] === Symbol.for("react.memo_cache_sentinel")
			? ((d = Array.from({ length: 3 }, rt)), (e[13] = d))
			: (d = e[13]);
		let l;
		return (
			e[14] !== d || e[15] !== c
				? ((l = t.jsx("div", { className: c, children: d })),
					(e[14] = d),
					(e[15] = c),
					(e[16] = l))
				: (l = e[16]),
			l
		);
	}
	if (_.length === 0) return null;
	let j;
	e[17] !== i
		? ((j = B("flex items-center gap-1", i)), (e[17] = i), (e[18] = j))
		: (j = e[18]);
	let x;
	if (
		e[19] !== m ||
		e[20] !== b ||
		e[21] !== p ||
		e[22] !== _ ||
		e[23] !== o ||
		e[24] !== (a == null ? void 0 : a.reactionId)
	) {
		let c;
		e[26] !== m ||
		e[27] !== b ||
		e[28] !== p ||
		e[29] !== o ||
		e[30] !== (a == null ? void 0 : a.reactionId)
			? ((c = (d) => {
					const l = m.find((z) => z.reactionId === d.id),
						n = (l == null ? void 0 : l.count) || 0,
						f = (a == null ? void 0 : a.reactionId) === d.id;
					return t.jsxs(
						U,
						{
							variant: "ghost",
							size: "sm",
							onClick: () => p(d.id),
							disabled: o.isPending,
							className: B(
								"h-6 px-1 flex items-center gap-1",
								f
									? "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
									: "hover:bg-gray-100 dark:hover:bg-gray-800",
							),
							children: [
								b.has(d.id)
									? t.jsx("span", { className: "text-xs", children: E(d.id) })
									: t.jsx("img", {
											src: d.logoLink,
											alt: "reaction",
											className: "w-3 h-3",
											onError: () => P(d.id),
										}),
								n > 0 &&
									t.jsx("span", {
										className: "text-xs font-medium",
										children: n,
									}),
							],
						},
						d.id,
					);
				}),
				(e[26] = m),
				(e[27] = b),
				(e[28] = p),
				(e[29] = o),
				(e[30] = a == null ? void 0 : a.reactionId),
				(e[31] = c))
			: (c = e[31]),
			(x = _.slice(0, 3).map(c)),
			(e[19] = m),
			(e[20] = b),
			(e[21] = p),
			(e[22] = _),
			(e[23] = o),
			(e[24] = a == null ? void 0 : a.reactionId),
			(e[25] = x);
	} else x = e[25];
	let N;
	return (
		e[32] !== x || e[33] !== j
			? ((N = t.jsx("div", { className: j, children: x })),
				(e[32] = x),
				(e[33] = j),
				(e[34] = N))
			: (N = e[34]),
		N
	);
}
function rt() {
	return t.jsx(
		"div",
		{ className: "w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" },
		`comment-skeleton-${Math.random()}`,
	);
}
function lt(r) {
	const e = ["👍", "❤️", "😂", "😮", "😢", "😡"];
	return e[r % e.length] || "👍";
}
function nt(r) {
	const e = ve.c(40),
		{ articleId: s, className: i } = r;
	let w;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((w = new Set()), (e[0] = w))
		: (w = e[0]);
	const [b, he] = R.useState(w),
		{ data: I, isLoading: xe } = Ee();
	let h;
	e[1] !== I
		? ((h = I === void 0 ? [] : I), (e[1] = I), (e[2] = h))
		: (h = e[2]);
	const _ = h,
		{ data: y, isLoading: $ } = Fe(s);
	let k;
	e[3] !== y
		? ((k = y === void 0 ? [] : y), (e[3] = y), (e[4] = k))
		: (k = e[4]);
	const m = k,
		{ data: a } = He(s);
	let u;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((u = Se()), (e[5] = u))
		: (u = e[5]);
	const { data: C } = Ie(u),
		o = qe();
	let v;
	e[6] !== s || e[7] !== C || e[8] !== o
		? ((v = async (l) => {
				if (!C) {
					ye.error("Vous devez être connecté pour réagir");
					return;
				}
				try {
					await o.mutateAsync({ articleId: s, reactionId: l });
				} catch (n) {
					console.error("Erreur lors de la réaction:", n);
				}
			}),
			(e[6] = s),
			(e[7] = C),
			(e[8] = o),
			(e[9] = v))
		: (v = e[9]);
	const p = v;
	let S;
	e[10] === Symbol.for("react.memo_cache_sentinel")
		? ((S = (l) => {
				he((n) => new Set(n).add(l));
			}),
			(e[10] = S))
		: (S = e[10]);
	const P = S,
		E = mt;
	if (xe || $) {
		let l;
		e[11] !== i
			? ((l = B("flex items-center gap-2", i)), (e[11] = i), (e[12] = l))
			: (l = e[12]);
		let n;
		e[13] === Symbol.for("react.memo_cache_sentinel")
			? ((n = t.jsx("div", {
					className: "flex gap-1",
					children: Array.from({ length: 5 }, dt),
				})),
				(e[13] = n))
			: (n = e[13]);
		let f;
		return (
			e[14] !== n || e[15] !== l
				? ((f = t.jsx("div", { className: l, children: n })),
					(e[14] = n),
					(e[15] = l),
					(e[16] = f))
				: (f = e[16]),
			f
		);
	}
	if (_.length === 0) return null;
	let j;
	e[17] !== i
		? ((j = B("flex items-center gap-2", i)), (e[17] = i), (e[18] = j))
		: (j = e[18]);
	let x;
	if (
		e[19] !== m ||
		e[20] !== b ||
		e[21] !== p ||
		e[22] !== _ ||
		e[23] !== o ||
		e[24] !== (a == null ? void 0 : a.reactionId)
	) {
		let l;
		e[26] !== m ||
		e[27] !== b ||
		e[28] !== p ||
		e[29] !== o ||
		e[30] !== (a == null ? void 0 : a.reactionId)
			? ((l = (n) => {
					const f = m.find((M) => M.reactionId === n.id),
						z = (f == null ? void 0 : f.count) || 0,
						L = (a == null ? void 0 : a.reactionId) === n.id;
					return t.jsxs(
						U,
						{
							variant: L ? "default" : "ghost",
							size: "sm",
							onClick: () => p(n.id),
							disabled: o.isPending,
							className: B(
								"flex items-center gap-1 h-8 px-2",
								L
									? "bg-blue-500 text-white hover:bg-blue-600"
									: "hover:bg-gray-100 dark:hover:bg-gray-800",
							),
							children: [
								b.has(n.id)
									? t.jsx("span", { className: "text-sm", children: E(n.id) })
									: t.jsx("img", {
											src: n.logoLink,
											alt: "reaction",
											className: "w-4 h-4",
											onError: () => P(n.id),
										}),
								z > 0 &&
									t.jsx("span", {
										className: B(
											"text-xs font-medium",
											L ? "text-white" : "text-gray-600 dark:text-gray-400",
										),
										children: z,
									}),
							],
						},
						n.id,
					);
				}),
				(e[26] = m),
				(e[27] = b),
				(e[28] = p),
				(e[29] = o),
				(e[30] = a == null ? void 0 : a.reactionId),
				(e[31] = l))
			: (l = e[31]),
			(x = _.map(l)),
			(e[19] = m),
			(e[20] = b),
			(e[21] = p),
			(e[22] = _),
			(e[23] = o),
			(e[24] = a == null ? void 0 : a.reactionId),
			(e[25] = x);
	} else x = e[25];
	let N;
	e[32] !== x
		? ((N = t.jsx("div", { className: "flex gap-1", children: x })),
			(e[32] = x),
			(e[33] = N))
		: (N = e[33]);
	let c;
	e[34] !== m
		? ((c =
				m.some(ct) &&
				t.jsxs("div", {
					className: "text-sm text-gray-500 dark:text-gray-400",
					children: [
						m.reduce(ot, 0),
						" réaction",
						m.reduce(it, 0) > 1 ? "s" : "",
					],
				})),
			(e[34] = m),
			(e[35] = c))
		: (c = e[35]);
	let d;
	return (
		e[36] !== N || e[37] !== c || e[38] !== j
			? ((d = t.jsxs("div", { className: j, children: [N, c] })),
				(e[36] = N),
				(e[37] = c),
				(e[38] = j),
				(e[39] = d))
			: (d = e[39]),
		d
	);
}
function it(r, e) {
	return r + e.count;
}
function ot(r, e) {
	return r + e.count;
}
function ct(r) {
	return r.count > 0;
}
function dt() {
	return t.jsx(
		"div",
		{
			className:
				"w-10 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse",
		},
		`reaction-skeleton-${Math.random()}`,
	);
}
function mt(r) {
	const e = ["👍", "❤️", "😂", "😮", "😢", "😡"];
	return e[r % e.length] || "👍";
}
function ht(r) {
	const e = ve.c(103),
		{ blog: s } = r,
		[i, w] = R.useState(!1),
		[b, he] = R.useState(!1),
		[I, xe] = R.useState(0),
		[h, _] = R.useState(""),
		{ data: y, isLoading: $, error: k } = Ve(s.id);
	let m;
	e[0] !== y
		? ((m = y === void 0 ? [] : y), (e[0] = y), (e[1] = m))
		: (m = e[1]);
	const a = m,
		u = Qe();
	let C;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((C = Se()), (e[2] = C))
		: (C = e[2]);
	const { data: o } = Ie(C);
	let v, p;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((v = () => {
				const g = () => {
					const A = window.scrollY,
						Ne = document.documentElement.scrollHeight - window.innerHeight,
						D = (A / Ne) * 100;
					xe(D), he(A > 500);
				};
				return (
					window.addEventListener("scroll", g),
					() => window.removeEventListener("scroll", g)
				);
			}),
			(p = []),
			(e[3] = v),
			(e[4] = p))
		: ((v = e[3]), (p = e[4])),
		R.useEffect(v, p);
	const S = pt;
	let P;
	e[5] !== s.title
		? ((P = (g) => {
				const A = window.location.href,
					Ne = s.title;
				let D = "";
				switch (g) {
					case "facebook": {
						D = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(A)}`;
						break;
					}
					case "twitter": {
						D = `https://twitter.com/intent/tweet?url=${encodeURIComponent(A)}&text=${encodeURIComponent(Ne)}`;
						break;
					}
					case "linkedin": {
						D = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(A)}`;
						break;
					}
					case "copy": {
						navigator.clipboard.writeText(A),
							ye.success("Lien copié dans le presse-papier !"),
							w(!1);
						return;
					}
				}
				D && (window.open(D, "_blank", "width=600,height=400"), w(!1));
			}),
			(e[5] = s.title),
			(e[6] = P))
		: (P = e[6]);
	const E = P,
		j = ut;
	let x;
	e[7] !== s.id || e[8] !== u || e[9] !== o || e[10] !== h
		? ((x = async () => {
				if (!h.trim()) return;
				if (!o) {
					ye.error("Vous devez être connecté pour commenter");
					return;
				}
				const g = { articleId: s.id, authorId: o.id, content: h.trim() };
				try {
					await u.mutateAsync(g), _("");
				} catch (A) {
					console.error("Erreur lors de l'ajout du commentaire:", A);
				}
			}),
			(e[7] = s.id),
			(e[8] = u),
			(e[9] = o),
			(e[10] = h),
			(e[11] = x))
		: (x = e[11]);
	const N = x,
		c = gt,
		d = ft,
		l = `${I}%`;
	let n;
	e[12] !== l
		? ((n = t.jsx("div", {
				className:
					"fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50",
				children: t.jsx("div", {
					className:
						"h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300",
					style: { width: l },
				}),
			})),
			(e[12] = l),
			(e[13] = n))
		: (n = e[13]);
	let f;
	e[14] !== i ? ((f = () => w(!i)), (e[14] = i), (e[15] = f)) : (f = e[15]);
	let z;
	e[16] === Symbol.for("react.memo_cache_sentinel")
		? ((z = t.jsx(Te, { className: "h-4 w-4" })), (e[16] = z))
		: (z = e[16]);
	let L;
	e[17] !== f
		? ((L = t.jsx(U, {
				variant: "outline",
				size: "sm",
				onClick: f,
				className: "shadow-lg",
				children: z,
			})),
			(e[17] = f),
			(e[18] = L))
		: (L = e[18]);
	let M;
	e[19] !== E || e[20] !== i
		? ((M =
				i &&
				t.jsxs("div", {
					className:
						"absolute right-full mr-2 top-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border p-2 flex flex-col gap-1",
					children: [
						t.jsxs(U, {
							variant: "ghost",
							size: "sm",
							onClick: () => E("facebook"),
							className: "justify-start",
							children: [
								t.jsx(Xe, { className: "h-4 w-4 mr-2 text-blue-600" }),
								"Facebook",
							],
						}),
						t.jsxs(U, {
							variant: "ghost",
							size: "sm",
							onClick: () => E("twitter"),
							className: "justify-start",
							children: [
								t.jsx(st, { className: "h-4 w-4 mr-2 text-blue-400" }),
								"Twitter",
							],
						}),
						t.jsxs(U, {
							variant: "ghost",
							size: "sm",
							onClick: () => E("linkedin"),
							className: "justify-start",
							children: [
								t.jsx(et, { className: "h-4 w-4 mr-2 text-blue-700" }),
								"LinkedIn",
							],
						}),
						t.jsxs(U, {
							variant: "ghost",
							size: "sm",
							onClick: () => E("copy"),
							className: "justify-start",
							children: [t.jsx(Oe, { className: "h-4 w-4 mr-2" }), "Copier"],
						}),
					],
				})),
			(e[19] = E),
			(e[20] = i),
			(e[21] = M))
		: (M = e[21]);
	let F;
	e[22] !== L || e[23] !== M
		? ((F = t.jsx("div", {
				className:
					"fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-2",
				children: t.jsxs("div", { className: "relative", children: [L, M] }),
			})),
			(e[22] = L),
			(e[23] = M),
			(e[24] = F))
		: (F = e[24]);
	let H;
	e[25] !== b
		? ((H =
				b &&
				t.jsx(U, {
					onClick: j,
					className: "fixed bottom-8 right-8 z-40 rounded-full shadow-lg",
					size: "sm",
					children: t.jsx(We, { className: "h-4 w-4" }),
				})),
			(e[25] = b),
			(e[26] = H))
		: (H = e[26]);
	let q;
	e[27] !== s.title
		? ((q = t.jsx("h1", {
				className:
					"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight",
				children: s.title,
			})),
			(e[27] = s.title),
			(e[28] = q))
		: (q = e[28]);
	let fe;
	e[29] === Symbol.for("react.memo_cache_sentinel")
		? ((fe = t.jsx(Ye, { className: "h-4 w-4" })), (e[29] = fe))
		: (fe = e[29]);
	let V;
	e[30] !== s.author || e[31] !== s.authorId
		? ((V = s.author ? c(s.author) : `Auteur ID: ${s.authorId}`),
			(e[30] = s.author),
			(e[31] = s.authorId),
			(e[32] = V))
		: (V = e[32]);
	let Q;
	e[33] !== V
		? ((Q = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [fe, t.jsxs("span", { children: ["Par", " ", V] })],
			})),
			(e[33] = V),
			(e[34] = Q))
		: (Q = e[34]);
	let ge;
	e[35] === Symbol.for("react.memo_cache_sentinel")
		? ((ge = t.jsx(Ge, { className: "h-4 w-4" })), (e[35] = ge))
		: (ge = e[35]);
	let T;
	e[36] !== s.createdAt
		? ((T = S(s.createdAt)), (e[36] = s.createdAt), (e[37] = T))
		: (T = e[37]);
	let O;
	e[38] !== T
		? ((O = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [ge, t.jsx("span", { children: T })],
			})),
			(e[38] = T),
			(e[39] = O))
		: (O = e[39]);
	let W;
	e[40] !== Q || e[41] !== O
		? ((W = t.jsxs("div", {
				className:
					"flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400",
				children: [Q, O],
			})),
			(e[40] = Q),
			(e[41] = O),
			(e[42] = W))
		: (W = e[42]);
	let Y;
	e[43] !== q || e[44] !== W
		? ((Y = t.jsxs("div", { className: "space-y-4", children: [q, W] })),
			(e[43] = q),
			(e[44] = W),
			(e[45] = Y))
		: (Y = e[45]);
	let G;
	e[46] !== s.headerImage || e[47] !== s.title
		? ((G =
				s.headerImage &&
				t.jsxs("div", {
					className: "relative overflow-hidden rounded-2xl shadow-2xl",
					children: [
						t.jsx("img", {
							src: s.headerImage,
							alt: s.title,
							className: "w-full h-96 object-cover",
						}),
						t.jsx("div", {
							className:
								"absolute inset-0 bg-gradient-to-t from-black/20 to-transparent",
						}),
					],
				})),
			(e[46] = s.headerImage),
			(e[47] = s.title),
			(e[48] = G))
		: (G = e[48]);
	let J;
	e[49] !== Y || e[50] !== G
		? ((J = t.jsxs("div", {
				className: "text-center space-y-6",
				children: [Y, G],
			})),
			(e[49] = Y),
			(e[50] = G),
			(e[51] = J))
		: (J = e[51]);
	let K;
	e[52] !== s.content
		? ((K = t.jsx(de, {
				className: "border-0 shadow-xl",
				children: t.jsx(me, {
					className: "p-8",
					children: t.jsx("div", {
						className: `prose prose-lg prose-blue dark:prose-invert max-w-none
                          prose-headings:text-gray-900 dark:prose-headings:text-white
                          prose-p:text-gray-700 dark:prose-p:text-gray-300
                          prose-strong:text-gray-900 dark:prose-strong:text-white
                          prose-a:text-blue-600 hover:prose-a:text-blue-500
                          prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
                          prose-code:text-blue-600 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20
                          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800`,
						dangerouslySetInnerHTML: { __html: s.content },
					}),
				}),
			})),
			(e[52] = s.content),
			(e[53] = K))
		: (K = e[53]);
	let ue;
	e[54] === Symbol.for("react.memo_cache_sentinel")
		? ((ue = t.jsx("div", {
				className: "flex items-center justify-between",
				children: t.jsx("h3", {
					className: "text-lg font-semibold text-gray-900 dark:text-white",
					children: "Réactions",
				}),
			})),
			(e[54] = ue))
		: (ue = e[54]);
	let X;
	e[55] !== s.id
		? ((X = t.jsx(de, {
				className: "border-0 shadow-lg",
				children: t.jsx(me, {
					className: "p-6",
					children: t.jsxs("div", {
						className: "space-y-4",
						children: [ue, t.jsx(nt, { articleId: s.id })],
					}),
				}),
			})),
			(e[55] = s.id),
			(e[56] = X))
		: (X = e[56]);
	let pe;
	e[57] === Symbol.for("react.memo_cache_sentinel")
		? ((pe = t.jsx(Je, { className: "h-5 w-5" })), (e[57] = pe))
		: (pe = e[57]);
	const we = $ ? "..." : a.length,
		ke = a.length > 1 ? "s" : "";
	let Z;
	e[58] !== we || e[59] !== ke
		? ((Z = t.jsx("div", {
				className: "flex items-center gap-6",
				children: t.jsxs("div", {
					className: "flex items-center gap-2 text-gray-600 dark:text-gray-400",
					children: [
						pe,
						t.jsxs("span", {
							className: "font-medium",
							children: [we, " commentaire", ke],
						}),
					],
				}),
			})),
			(e[58] = we),
			(e[59] = ke),
			(e[60] = Z))
		: (Z = e[60]);
	let ee;
	e[61] !== s.tags
		? ((ee =
				s.tags && s.tags.length > 0
					? s.tags.map(xt)
					: t.jsx("span", {
							className: "text-sm text-gray-500",
							children: "Aucun tag",
						})),
			(e[61] = s.tags),
			(e[62] = ee))
		: (ee = e[62]);
	let te;
	e[63] !== ee
		? ((te = t.jsx("div", {
				className: "flex items-center gap-2",
				children: ee,
			})),
			(e[63] = ee),
			(e[64] = te))
		: (te = e[64]);
	let se;
	e[65] !== Z || e[66] !== te
		? ((se = t.jsx(de, {
				className: "border-0 shadow-lg",
				children: t.jsx(me, {
					className: "p-6",
					children: t.jsxs("div", {
						className: "flex items-center justify-between",
						children: [Z, te],
					}),
				}),
			})),
			(e[65] = Z),
			(e[66] = te),
			(e[67] = se))
		: (se = e[67]);
	let be;
	e[68] === Symbol.for("react.memo_cache_sentinel")
		? ((be = t.jsx(Pe, { className: "my-8" })), (e[68] = be))
		: (be = e[68]);
	const _e = $ ? "..." : a.length;
	let ae;
	e[69] !== _e
		? ((ae = t.jsxs("h2", {
				className: "text-2xl font-bold text-gray-900 dark:text-white",
				children: ["Commentaires (", _e, ")"],
			})),
			(e[69] = _e),
			(e[70] = ae))
		: (ae = e[70]);
	let re;
	e[71] !== s.commentsEnabled ||
	e[72] !== u ||
	e[73] !== o ||
	e[74] !== N ||
	e[75] !== h
		? ((re =
				s.commentsEnabled &&
				o &&
				t.jsx(de, {
					children: t.jsx(me, {
						className: "p-6",
						children: t.jsxs("div", {
							className: "space-y-4",
							children: [
								t.jsx(Me, {
									placeholder: "Partagez votre avis sur cet article...",
									value: h,
									onChange: (g) => _(g.target.value),
									className: "min-h-20",
								}),
								t.jsx("div", {
									className: "flex justify-end",
									children: t.jsx(U, {
										onClick: N,
										disabled: !h.trim() || u.isPending,
										children: u.isPending
											? t.jsxs(t.Fragment, {
													children: [
														t.jsx("div", {
															className:
																"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
														}),
														"Publication...",
													],
												})
											: "Publier le commentaire",
									}),
								}),
							],
						}),
					}),
				})),
			(e[71] = s.commentsEnabled),
			(e[72] = u),
			(e[73] = o),
			(e[74] = N),
			(e[75] = h),
			(e[76] = re))
		: (re = e[76]);
	let le;
	e[77] !== s.commentsEnabled || e[78] !== o
		? ((le =
				s.commentsEnabled &&
				!o &&
				t.jsx(de, {
					children: t.jsx(me, {
						className: "p-6 text-center",
						children: t.jsxs("p", {
							className: "text-gray-600 dark:text-gray-400",
							children: [
								t.jsx(Le, {
									to: "/auth/login",
									className: "text-blue-600 hover:text-blue-500 font-medium",
									children: "Connectez-vous",
								}),
								" ",
								"pour laisser un commentaire",
							],
						}),
					}),
				})),
			(e[77] = s.commentsEnabled),
			(e[78] = o),
			(e[79] = le))
		: (le = e[79]);
	let ne;
	e[80] !== s.commentsEnabled || e[81] !== a || e[82] !== k || e[83] !== $
		? ((ne = $
				? t.jsx("div", {
						className: "flex justify-center py-8",
						children: t.jsx("div", {
							className:
								"w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin",
						}),
					})
				: k
					? t.jsx("div", {
							className: "text-center py-8 text-red-500",
							children: "Erreur lors du chargement des commentaires",
						})
					: a.length === 0
						? t.jsx("div", {
								className: "text-center py-8 text-gray-500",
								children: s.commentsEnabled
									? "Aucun commentaire pour le moment. Soyez le premier à commenter !"
									: "Les commentaires sont désactivés pour cet article.",
							})
						: a.map((g) =>
								t.jsx(
									de,
									{
										children: t.jsx(me, {
											className: "p-6",
											children: t.jsxs("div", {
												className: "flex gap-4",
												children: [
													t.jsx(ze, {
														children: g.author.image
															? t.jsx("img", {
																	src: g.author.image,
																	alt: c(g.author),
																})
															: t.jsx(Ae, { children: d(g.author) }),
													}),
													t.jsxs("div", {
														className: "flex-1 space-y-2",
														children: [
															t.jsxs("div", {
																className: "flex items-center gap-2",
																children: [
																	t.jsx("span", {
																		className:
																			"font-semibold text-gray-900 dark:text-white",
																		children: c(g.author),
																	}),
																	t.jsx("span", {
																		className: "text-sm text-gray-500",
																		children: S(g.createdAt),
																	}),
																],
															}),
															t.jsx("p", {
																className:
																	"text-gray-700 dark:text-gray-300 whitespace-pre-wrap",
																children: g.content,
															}),
															t.jsxs("div", {
																className: "flex items-center gap-4",
																children: [
																	t.jsx(at, { commentId: g.id }),
																	t.jsx("button", {
																		type: "button",
																		className:
																			"text-sm text-gray-500 hover:text-blue-600 transition-colors",
																		children: "Répondre",
																	}),
																],
															}),
														],
													}),
												],
											}),
										}),
									},
									g.id,
								),
							)),
			(e[80] = s.commentsEnabled),
			(e[81] = a),
			(e[82] = k),
			(e[83] = $),
			(e[84] = ne))
		: (ne = e[84]);
	let ie;
	e[85] !== ne
		? ((ie = t.jsx("div", { className: "space-y-4", children: ne })),
			(e[85] = ne),
			(e[86] = ie))
		: (ie = e[86]);
	let oe;
	e[87] !== ae || e[88] !== re || e[89] !== le || e[90] !== ie
		? ((oe = t.jsxs("div", {
				className: "space-y-6",
				children: [ae, re, le, ie],
			})),
			(e[87] = ae),
			(e[88] = re),
			(e[89] = le),
			(e[90] = ie),
			(e[91] = oe))
		: (oe = e[91]);
	let ce;
	e[92] !== J || e[93] !== K || e[94] !== X || e[95] !== se || e[96] !== oe
		? ((ce = t.jsx("div", {
				className: "container mx-auto px-4 py-8 max-w-4xl",
				children: t.jsxs("article", {
					className: "space-y-8",
					children: [J, K, X, se, be, oe],
				}),
			})),
			(e[92] = J),
			(e[93] = K),
			(e[94] = X),
			(e[95] = se),
			(e[96] = oe),
			(e[97] = ce))
		: (ce = e[97]);
	let je;
	return (
		e[98] !== F || e[99] !== H || e[100] !== ce || e[101] !== n
			? ((je = t.jsxs("div", {
					className: "min-h-screen bg-background",
					children: [n, F, H, ce],
				})),
				(e[98] = F),
				(e[99] = H),
				(e[100] = ce),
				(e[101] = n),
				(e[102] = je))
			: (je = e[102]),
		je
	);
}
function xt(r) {
	return t.jsxs(Ue, { variant: "secondary", children: ["#", r.name] }, r.id);
}
function ft(r) {
	var i;
	const e = r.firstName || "",
		s = r.lastName || "";
	return e && s
		? `${e[0]}${s[0]}`.toUpperCase()
		: ((i = r.name) == null ? void 0 : i.slice(0, 2).toUpperCase()) || "U";
}
function gt(r) {
	return `${r.firstName} ${r.lastName}`.trim() || r.name;
}
function ut() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}
function pt(r) {
	return new Date(r).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
const Ut = () => {
	const e = ve.c(2),
		{ blog: s } = $e.useLoaderData();
	let i;
	return (
		e[0] !== s
			? ((i = t.jsx(ht, { blog: s })), (e[0] = s), (e[1] = i))
			: (i = e[1]),
		i
	);
};
export { Ut as component };
