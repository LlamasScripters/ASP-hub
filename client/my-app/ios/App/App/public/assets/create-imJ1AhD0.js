import { j as e, c as l } from "./index-kb-Ylywn.js";
const n = (o) => {
	const t = l.c(1),
		{ error: s } = o;
	console.error("Error in blog create page:", s);
	let r;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((r = e.jsx("div", {
					className: "container mx-auto p-4",
					children: e.jsxs("div", {
						className: "text-center py-12",
						children: [
							e.jsx("div", {
								className: "text-red-500 text-6xl mb-4",
								children: "⚠️",
							}),
							e.jsx("h2", {
								className: "text-2xl font-bold text-red-600 mb-2",
								children: "Erreur de la page",
							}),
							e.jsx("p", {
								className: "text-gray-600 mb-4",
								children:
									"Une erreur s'est produite lors du chargement de la page de création d'article.",
							}),
							e.jsx("a", {
								href: "/admin/blog",
								className:
									"px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",
								children: "Retour à la liste",
							}),
						],
					}),
				})),
				(t[0] = r))
			: (r = t[0]),
		r
	);
};
export { n as errorComponent };
