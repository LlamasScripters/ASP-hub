import { c as n, j as r } from "./index-kb-Ylywn.js";
const m = (c) => {
	const e = n.c(4),
		{ error: a } = c;
	console.error("Error loading blog article:", a);
	let t, s, l;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((t = r.jsx("div", {
				className: "text-red-500 text-6xl mb-4",
				children: "📄",
			})),
			(s = r.jsx("h2", {
				className: "text-2xl font-bold text-red-600 mb-2",
				children: "Article introuvable",
			})),
			(l = r.jsx("p", {
				className: "text-gray-600 mb-4",
				children:
					"L'article que vous cherchez n'existe pas ou n'est plus disponible.",
			})),
			(e[0] = t),
			(e[1] = s),
			(e[2] = l))
		: ((t = e[0]), (s = e[1]), (l = e[2]));
	let o;
	return (
		e[3] === Symbol.for("react.memo_cache_sentinel")
			? ((o = r.jsx("div", {
					className: "min-h-screen bg-background",
					children: r.jsx("div", {
						className: "container mx-auto p-4",
						children: r.jsxs("div", {
							className: "text-center py-12",
							children: [
								t,
								s,
								l,
								r.jsx("div", {
									className: "space-x-4",
									children: r.jsx("a", {
										href: "/dashboard/blog",
										className:
											"px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",
										children: "Retour au blog",
									}),
								}),
							],
						}),
					}),
				})),
				(e[3] = o))
			: (o = e[3]),
		o
	);
};
export { m as errorComponent };
