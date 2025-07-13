import {
	c as a,
	d as c,
	L as d,
	j as e,
	S as i,
	C as l,
	f as m,
	b as n,
	e as o,
} from "./index-kb-Ylywn.js";
function f() {
	const r = a.c(2);
	let s;
	r[0] === Symbol.for("react.memo_cache_sentinel")
		? ((s = e.jsxs(l, {
				className: "space-y-1 text-center",
				children: [
					e.jsx("div", {
						className: "flex justify-center mb-2",
						children: e.jsx(i, { className: "w-10 h-10 text-emerald-600" }),
					}),
					e.jsx(n, {
						className: "text-2xl font-bold",
						children: "Erreur de vérification",
					}),
					e.jsx(c, {
						children:
							"Une erreur est survenue lors de la vérification de votre email. Le lien est peut-être invalide ou expiré.",
					}),
				],
			})),
			(r[0] = s))
		: (s = r[0]);
	let t;
	return (
		r[1] === Symbol.for("react.memo_cache_sentinel")
			? ((t = e.jsxs(o, {
					className: "w-full max-w-md",
					children: [
						s,
						e.jsx(m, {
							className: "flex flex-col items-center justify-center",
							children: e.jsx(d, {
								to: "/auth/login",
								className: "mt-4 text-emerald-600 hover:text-emerald-700",
								children: "Retour à la connexion",
							}),
						}),
					],
				})),
				(r[1] = t))
			: (t = r[1]),
		t
	);
}
export { f as V };
