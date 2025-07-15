import { j as e, c as n } from "./index-kb-Ylywn.js";
const i = (s) => {
	const t = n.c(1),
		{ error: o } = s;
	console.error("Error loading rooms:", o);
	let r;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((r = e.jsx("div", {
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
								children:
									"Impossible de charger les salles. Veuillez réessayer plus tard.",
							}),
							e.jsx("button", {
								type: "button",
								onClick: l,
								className:
									"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
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
export { i as errorComponent };
