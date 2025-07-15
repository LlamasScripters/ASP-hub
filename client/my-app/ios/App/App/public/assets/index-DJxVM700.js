import { j as e, c as s } from "./index-kb-Ylywn.js";
const a = (o) => {
	const r = s.c(1),
		{ error: n } = o;
	console.error("Error loading complex details:", n);
	let t;
	return (
		r[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = e.jsx("div", {
					className: "flex items-center justify-center min-h-[400px]",
					children: e.jsxs("div", {
						className: "text-center",
						children: [
							e.jsx("h2", {
								className: "text-lg font-semibold text-red-600 mb-2",
								children: "Erreur de chargement",
							}),
							e.jsx("p", {
								className: "text-gray-600 mb-4",
								children: "Impossible de charger les détails du complexe.",
							}),
							e.jsx("button", {
								type: "button",
								onClick: c,
								className:
									"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2",
								children: "Retour",
							}),
							e.jsx("button", {
								type: "button",
								onClick: l,
								className:
									"px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700",
								children: "Réessayer",
							}),
						],
					}),
				})),
				(r[0] = t))
			: (t = r[0]),
		t
	);
};
function c() {
	return window.history.back();
}
function l() {
	return window.location.reload();
}
export { a as errorComponent };
