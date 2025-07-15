import { c as i, j as r } from "./index-kb-Ylywn.js";
const m = (n) => {
	const e = i.c(4),
		{ error: a } = n;
	console.error("Error loading blog:", a);
	let t, o, s;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((t = r.jsx("div", {
				className: "text-red-500 text-6xl mb-4",
				children: "📝",
			})),
			(o = r.jsx("h2", {
				className: "text-2xl font-bold text-red-600 mb-2",
				children: "Article non trouvé",
			})),
			(s = r.jsx("p", {
				className: "text-gray-600 mb-4",
				children:
					"L'article que vous souhaitez modifier n'existe pas ou a été supprimé.",
			})),
			(e[0] = t),
			(e[1] = o),
			(e[2] = s))
		: ((t = e[0]), (o = e[1]), (s = e[2]));
	let l;
	return (
		e[3] === Symbol.for("react.memo_cache_sentinel")
			? ((l = r.jsx("div", {
					className: "container mx-auto p-4",
					children: r.jsxs("div", {
						className: "text-center py-12",
						children: [
							t,
							o,
							s,
							r.jsxs("div", {
								className: "space-x-4",
								children: [
									r.jsx("a", {
										href: "/admin/blog",
										className:
											"px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",
										children: "Retour à la liste",
									}),
									r.jsx("a", {
										href: "/admin/blog/create",
										className:
											"px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors",
										children: "Créer un nouvel article",
									}),
								],
							}),
						],
					}),
				})),
				(e[3] = l))
			: (l = e[3]),
		l
	);
};
export { m as errorComponent };
