import { B as p } from "./badge-BAidKpPB.js";
import { B as $ } from "./book-open-5M4-kq4-.js";
import { C as q } from "./calendar-De7tcxsN.js";
import { F as H } from "./funnel-DNedUVhi.js";
import {
	C as B,
	b as D,
	d as E,
	c as F,
	f as I,
	L,
	e as M,
	bE as P,
	A as R,
	j as e,
	B as l,
	r as o,
	a as w,
} from "./index-kb-Ylywn.js";
import { I as V } from "./input-CdkcPZS3.js";
import { M as W } from "./message-circle-B7OulW_p.js";
import { S as N } from "./search-CT8NOJQT.js";
import { d, c as f, S as g, a as j, b as v } from "./select-D8GIfri3.js";
import { S as O } from "./share-2-LkRok7S2.js";
import { c as z } from "./useBlogQueries-VhutstJQ.js";
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
import "./chevron-up-DyH28r2x.js";
import "./useQuery-DObI4S3_.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U = [
		["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
		["path", { d: "M7 20V4", key: "1yoxec" }],
		["path", { d: "M11 4h10", key: "1w87gc" }],
		["path", { d: "M11 8h7", key: "djye34" }],
		["path", { d: "M11 12h4", key: "q8tih4" }],
	],
	Z = w("arrow-down-wide-narrow", U); /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G = [
		["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
		["path", { d: "M7 4v16", key: "1glfcx" }],
		["path", { d: "M11 12h4", key: "q8tih4" }],
		["path", { d: "M11 16h7", key: "uosisv" }],
		["path", { d: "M11 20h10", key: "jvxblo" }],
	],
	J = w("arrow-up-narrow-wide", G);
function K({ blogs: m }) {
	const [a, n] = o.useState(""),
		[r, y] = o.useState("all"),
		[x, b] = o.useState("newest"),
		{ data: h = [] } = z(),
		C = o.useMemo(() => h.map((t) => t.name), [h]),
		c = o.useMemo(() => {
			const t = m.filter((s) => {
				var u;
				const i =
						s.title.toLowerCase().includes(a.toLowerCase()) ||
						s.content.toLowerCase().includes(a.toLowerCase()),
					T =
						r === "all" ||
						((u = s.tags) == null ? void 0 : u.some((A) => A.name === r));
				return i && T;
			});
			return (
				t.sort((s, i) => {
					switch (x) {
						case "newest":
							return (
								new Date(i.createdAt).getTime() -
								new Date(s.createdAt).getTime()
							);
						case "oldest":
							return (
								new Date(s.createdAt).getTime() -
								new Date(i.createdAt).getTime()
							);
						case "title":
							return s.title.localeCompare(i.title);
						default:
							return 0;
					}
				}),
				t
			);
		}, [m, a, r, x]),
		k = (t) =>
			new Date(t).toLocaleDateString("fr-FR", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		S = (t) => {
			const s = document.createElement("div");
			return (s.innerHTML = t), s.textContent || s.innerText || "";
		};
	return e.jsxs("div", {
		className: "min-h-screen bg-background",
		children: [
			e.jsx("div", {
				className: "bg-background shadow-sm border-b",
				children: e.jsx("div", {
					className: "container mx-auto px-4 py-12",
					children: e.jsxs("div", {
						className: "text-center max-w-3xl mx-auto",
						children: [
							e.jsx("h1", {
								className:
									"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",
								children: "📰 Blog du Club",
							}),
							e.jsx("p", {
								className: "text-xl text-gray-600 dark:text-gray-300 mb-8",
								children:
									"Découvrez toutes les actualités et événements de notre club sportif",
							}),
							e.jsxs("div", {
								className: "relative max-w-2xl mx-auto",
								children: [
									e.jsx(N, {
										className:
											"absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5",
									}),
									e.jsx(V, {
										type: "text",
										placeholder: "Rechercher dans les articles...",
										value: a,
										onChange: (t) => n(t.target.value),
										className:
											"pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg",
									}),
								],
							}),
						],
					}),
				}),
			}),
			e.jsxs("div", {
				className: "container mx-auto px-4 py-8",
				children: [
					e.jsxs("div", {
						className:
							"flex flex-col md:flex-row gap-4 items-center justify-between mb-8",
						children: [
							e.jsxs("div", {
								className: "flex flex-wrap gap-3 items-center",
								children: [
									e.jsx(H, { className: "h-5 w-5 text-gray-600" }),
									e.jsx("span", {
										className:
											"text-sm font-medium text-gray-700 dark:text-gray-300",
										children: "Filtrer par :",
									}),
									e.jsxs(g, {
										value: r,
										onValueChange: y,
										children: [
											e.jsx(j, {
												className: "w-40",
												children: e.jsx(v, { placeholder: "Tous les tags" }),
											}),
											e.jsxs(f, {
												children: [
													e.jsx(d, { value: "all", children: "Tous les tags" }),
													C.map((t) =>
														e.jsxs(d, { value: t, children: ["#", t] }, t),
													),
												],
											}),
										],
									}),
								],
							}),
							e.jsxs("div", {
								className: "flex items-center gap-3",
								children: [
									e.jsx("span", {
										className:
											"text-sm font-medium text-gray-700 dark:text-gray-300",
										children: "Trier par :",
									}),
									e.jsxs(g, {
										value: x,
										onValueChange: (t) => b(t),
										children: [
											e.jsx(j, { className: "w-48", children: e.jsx(v, {}) }),
											e.jsxs(f, {
												children: [
													e.jsx(d, {
														value: "newest",
														children: e.jsxs("div", {
															className: "flex items-center gap-2",
															children: [
																e.jsx(Z, { className: "h-4 w-4" }),
																"Plus récent",
															],
														}),
													}),
													e.jsx(d, {
														value: "oldest",
														children: e.jsxs("div", {
															className: "flex items-center gap-2",
															children: [
																e.jsx(J, { className: "h-4 w-4" }),
																"Plus ancien",
															],
														}),
													}),
													e.jsx(d, {
														value: "title",
														children: e.jsxs("div", {
															className: "flex items-center gap-2",
															children: [
																e.jsx($, { className: "h-4 w-4" }),
																"Titre A-Z",
															],
														}),
													}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
					e.jsx("div", {
						className: "mb-6",
						children: e.jsxs("p", {
							className: "text-gray-600 dark:text-gray-400",
							children: [
								c.length,
								" article",
								c.length > 1 ? "s" : "",
								" trouvé",
								c.length > 1 ? "s" : "",
								a &&
									e.jsxs("span", {
										children: [
											" ",
											'pour "',
											e.jsx("strong", { children: a }),
											'"',
										],
									}),
							],
						}),
					}),
					c.length === 0
						? e.jsxs("div", {
								className: "text-center py-16",
								children: [
									e.jsx(N, {
										className: "h-16 w-16 text-gray-300 mx-auto mb-4",
									}),
									e.jsx("h3", {
										className: "text-xl font-semibold text-gray-600 mb-2",
										children: "Aucun article trouvé",
									}),
									e.jsx("p", {
										className: "text-gray-500 mb-6",
										children: a
											? "Essayez de modifier votre recherche ou vos filtres"
											: "Aucun article n'est disponible pour le moment",
									}),
									a &&
										e.jsx(l, {
											onClick: () => n(""),
											variant: "outline",
											children: "Effacer la recherche",
										}),
								],
							})
						: e.jsx("div", {
								className: "grid gap-8 md:grid-cols-2 lg:grid-cols-4",
								children: c.map((t) =>
									e.jsxs(
										M,
										{
											className:
												"group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg",
											children: [
												t.headerImage &&
													e.jsxs("div", {
														className:
															"aspect-video overflow-hidden rounded-t-lg relative",
														children: [
															e.jsx("img", {
																src: t.headerImage,
																alt: t.title,
																className:
																	"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
															}),
															e.jsx("div", {
																className:
																	"absolute inset-0 bg-gradient-to-t from-black/20 to-transparent",
															}),
														],
													}),
												e.jsxs(B, {
													className: "pb-3",
													children: [
														e.jsxs("div", {
															className:
																"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2",
															children: [
																e.jsx(q, { className: "h-4 w-4" }),
																k(t.createdAt),
															],
														}),
														e.jsx(D, {
															className:
																"text-xl leading-tight group-hover:text-blue-600 transition-colors",
															children: e.jsx(L, {
																to: "/dashboard/blog/$blogId",
																params: { blogId: t.id },
																className: "hover:underline",
																children: t.title,
															}),
														}),
													],
												}),
												e.jsxs(I, {
													className: "pb-3",
													children: [
														e.jsxs(E, {
															className:
																"text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed",
															children: [S(t.content).substring(0, 150), "..."],
														}),
														e.jsx("div", {
															className: "flex flex-wrap gap-1 mt-3",
															children:
																t.tags && t.tags.length > 0
																	? t.tags.slice(0, 3).map((s) =>
																			e.jsxs(
																				p,
																				{
																					variant: "secondary",
																					className: "text-xs",
																					children: ["#", s.name],
																				},
																				s.id,
																			),
																		)
																	: e.jsx(p, {
																			variant: "outline",
																			className: "text-xs text-gray-400",
																			children: "Aucun tag",
																		}),
														}),
													],
												}),
												e.jsx(R, {
													className: "pt-3 border-t",
													children: e.jsxs("div", {
														className:
															"flex items-center justify-between w-full",
														children: [
															e.jsx("div", {
																className:
																	"flex items-center gap-4 text-gray-500 dark:text-gray-400",
																children: e.jsxs("button", {
																	type: "button",
																	className:
																		"flex items-center gap-1 hover:text-blue-500 transition-colors",
																	children: [
																		e.jsx(W, { className: "h-4 w-4" }),
																		e.jsx("span", {
																			className: "text-xs",
																			children: t.commentsCount || 0,
																		}),
																	],
																}),
															}),
															e.jsx(l, {
																size: "sm",
																variant: "ghost",
																className: "p-2",
																children: e.jsx(O, { className: "h-4 w-4" }),
															}),
														],
													}),
												}),
											],
										},
										t.id,
									),
								),
							}),
					c.length > 9 &&
						e.jsx("div", {
							className: "flex justify-center mt-12",
							children: e.jsxs("div", {
								className: "flex gap-2",
								children: [
									e.jsx(l, {
										variant: "outline",
										disabled: !0,
										children: "Précédent",
									}),
									e.jsx(l, {
										variant: "outline",
										className: "bg-blue-500 text-white",
										children: "1",
									}),
									e.jsx(l, { variant: "outline", children: "2" }),
									e.jsx(l, { variant: "outline", children: "3" }),
									e.jsx(l, { variant: "outline", children: "Suivant" }),
								],
							}),
						}),
				],
			}),
		],
	});
}
const we = () => {
	const a = F.c(2),
		{ blogs: n } = P.useLoaderData();
	let r;
	return (
		a[0] !== n
			? ((r = e.jsx(K, { blogs: n })), (a[0] = n), (a[1] = r))
			: (r = a[1]),
		r
	);
};
export { we as component };
