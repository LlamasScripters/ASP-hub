import { j as e, c as n } from "./index-kb-Ylywn.js";
const a = (o) => {
	const t = n.c(1),
		{ error: s } = o;
	console.error("Error loading blogs:", s);
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
								children: "Erreur de chargement",
							}),
							e.jsx("p", {
								className: "text-gray-600 mb-4",
								children: "Impossible de charger les articles de blog.",
							}),
							e.jsx("button", {
								type: "button",
								onClick: l,
								className:
									"px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",
								children: "Réessayer",
							}),
						],
					}),
				})),
				(t[0] = r))
			: (r = t[0]),
		r
	);
};
function l() {
	return window.location.reload();
}
export { a as errorComponent };
