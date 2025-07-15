import { b as A, a as L, A as T } from "./alert-DcqybFAu.js";
import { B as E } from "./badge-BAidKpPB.js";
import { C as _ } from "./calendar-days-jtWlYB0j.js";
import { F as $ } from "./funnel-DNedUVhi.js";
import {
	c as I,
	i as S,
	B as b,
	r as c,
	C as d,
	j as e,
	a as g,
	f as h,
	K as k,
	b as m,
	e as n,
	d as x,
} from "./index-kb-Ylywn.js";
import { I as R } from "./input-CdkcPZS3.js";
import { P as F } from "./plus-czqh0ZLb.js";
import { S as V } from "./search-CT8NOJQT.js";
import { c as B, S as M, d as u, a as z } from "./select-D8GIfri3.js";
import { S as D } from "./separator-DDNy3jpa.js";
import { W as P } from "./warehouse-BXw1dHMx.js";
import "./index-Dqr9Wf5M.js";
import "./index-DauBq6FI.js";
import "./index-3Axhna2x.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-CvBT1pZ2.js";
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
const q = [
		["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
		["path", { d: "m15 9-6 6", key: "1uzhvr" }],
		["path", { d: "m9 9 6 6", key: "z0biqf" }],
	],
	W = g("circle-x", q); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H = [
		[
			"rect",
			{ width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" },
		],
		[
			"rect",
			{ width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" },
		],
		["path", { d: "M14 4h7", key: "3xa0d5" }],
		["path", { d: "M14 9h7", key: "1icrd9" }],
		["path", { d: "M14 15h7", key: "1mj8o2" }],
		["path", { d: "M14 20h7", key: "11slyb" }],
	],
	K = g("layout-list", H);
function O({ initialRooms: a = [] }) {
	const t = S(),
		[l, o] = c.useState(""),
		[r, N] = c.useState("all"),
		p = c.useMemo(
			() =>
				a.filter((s) => {
					const i = s.name.toLowerCase().includes(l.toLowerCase()),
						w =
							r === "all" ||
							(r === "true" && s.isIndoor) ||
							(r === "false" && !s.isIndoor);
					return i && w;
				}),
			[l, r, a],
		),
		y = (s, i) => {
			t({ to: `/admin/facilities/complexes/${i}/rooms/${s}` });
		},
		v = () => {
			t({ to: "/admin/facilities/complexes" });
		},
		j = a.length,
		f = a.filter((s) => s.isIndoor).length,
		C = j - f;
	return e.jsxs("div", {
		className: "space-y-6",
		children: [
			e.jsxs("div", {
				className:
					"flex flex-col md:flex-row md:items-center md:justify-between gap-4",
				children: [
					e.jsxs("div", {
						children: [
							e.jsx("h1", {
								className: "text-3xl font-bold tracking-tight",
								children: "Toutes les salles",
							}),
							e.jsx("p", {
								className: "text-muted-foreground",
								children:
									"Liste de toutes les salles enregistrées dans les complexes",
							}),
						],
					}),
					e.jsxs(b, {
						onClick: v,
						className: "w-full md:w-auto",
						children: [
							e.jsx(F, { className: "w-4 h-4 mr-2" }),
							" Nouvelle salle",
						],
					}),
				],
			}),
			e.jsxs(n, {
				children: [
					e.jsxs(d, {
						children: [
							e.jsx(m, { children: "Filtres" }),
							e.jsx(x, {
								children: "Recherchez et filtrez les salles par type ou nom",
							}),
						],
					}),
					e.jsxs(h, {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							e.jsxs("div", {
								className: "relative",
								children: [
									e.jsx(V, {
										className:
											"absolute left-3 top-2.5 w-4 h-4 text-muted-foreground",
									}),
									e.jsx(R, {
										placeholder: "Rechercher par nom...",
										value: l,
										onChange: (s) => o(s.target.value),
										className: "pl-8",
									}),
								],
							}),
							e.jsxs(M, {
								onValueChange: N,
								defaultValue: r,
								children: [
									e.jsxs(z, {
										children: [
											e.jsx($, { className: "mr-2 h-4 w-4" }),
											" Type de salle",
										],
									}),
									e.jsxs(B, {
										children: [
											e.jsx(u, { value: "all", children: "Tous" }),
											e.jsx(u, { value: "true", children: "Intérieur" }),
											e.jsx(u, { value: "false", children: "Extérieur" }),
										],
									}),
								],
							}),
						],
					}),
				],
			}),
			e.jsxs(n, {
				children: [
					e.jsxs(d, {
						children: [
							e.jsx(m, { children: "Statistiques des salles" }),
							e.jsx(x, {
								children: "Vue globale de toutes les salles enregistrées",
							}),
						],
					}),
					e.jsxs(h, {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							e.jsxs("div", {
								className: "flex items-center space-x-3",
								children: [
									e.jsx(P, { className: "w-6 h-6 text-muted-foreground" }),
									e.jsxs("div", {
										children: [
											e.jsx("p", {
												className: "text-sm text-muted-foreground",
												children: "Total",
											}),
											e.jsx("p", {
												className: "font-semibold text-lg",
												children: j,
											}),
										],
									}),
								],
							}),
							e.jsxs("div", {
								className: "flex items-center space-x-3",
								children: [
									e.jsx(K, { className: "w-6 h-6 text-muted-foreground" }),
									e.jsxs("div", {
										children: [
											e.jsx("p", {
												className: "text-sm text-muted-foreground",
												children: "Intérieures",
											}),
											e.jsx("p", {
												className: "font-semibold text-lg",
												children: f,
											}),
										],
									}),
								],
							}),
							e.jsxs("div", {
								className: "flex items-center space-x-3",
								children: [
									e.jsx(_, { className: "w-6 h-6 text-muted-foreground" }),
									e.jsxs("div", {
										children: [
											e.jsx("p", {
												className: "text-sm text-muted-foreground",
												children: "Extérieures",
											}),
											e.jsx("p", {
												className: "font-semibold text-lg",
												children: C,
											}),
										],
									}),
								],
							}),
						],
					}),
				],
			}),
			e.jsx(D, {}),
			e.jsxs("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: [
					p.length === 0 &&
						e.jsxs(T, {
							variant: "destructive",
							className: "col-span-full",
							children: [
								e.jsx(W, { className: "w-5 h-5" }),
								e.jsx(A, { children: "Aucune salle trouvée" }),
								e.jsx(L, {
									children:
										"Aucun résultat ne correspond aux filtres ou à la recherche actuelle.",
								}),
							],
						}),
					p.map((s) =>
						e.jsxs(
							n,
							{
								className: "cursor-pointer hover:shadow-lg transition-shadow",
								onClick: () => y(s.id, s.complexId),
								children: [
									e.jsxs(d, {
										children: [
											e.jsxs(m, {
												className: "flex items-center justify-between",
												children: [
													s.name,
													e.jsx(E, {
														variant: "outline",
														children: s.isIndoor ? "Intérieur" : "Extérieur",
													}),
												],
											}),
											e.jsx(x, {
												className: "text-xs text-muted-foreground",
												children: s.sportType || "Sport non précisé",
											}),
										],
									}),
									e.jsx(h, {
										children: e.jsx("p", {
											className: "text-sm text-muted-foreground",
											children: "Aucune description fournie.",
										}),
									}),
								],
							},
							s.id,
						),
					),
				],
			}),
		],
	});
}
const fe = () => {
	const t = I.c(3);
	let l;
	t[0] === Symbol.for("react.memo_cache_sentinel")
		? ((l = { from: "/_authenticated/admin/_admin/facilities/rooms/" }),
			(t[0] = l))
		: (l = t[0]);
	const o = k(l);
	let r;
	return (
		t[1] !== o.rooms
			? ((r = e.jsx(O, { initialRooms: o.rooms })),
				(t[1] = o.rooms),
				(t[2] = r))
			: (r = t[2]),
		r
	);
};
export { fe as component };
