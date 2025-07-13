import {
	c,
	B as d,
	j as e,
	b as i,
	C as l,
	f as m,
	S as n,
	e as o,
	d as r,
	L as x,
} from "./index-kb-Ylywn.js";
function f() {
	const a = c.c(2);
	let t;
	a[0] === Symbol.for("react.memo_cache_sentinel")
		? ((t = e.jsxs(l, {
				className: "space-y-1 text-center",
				children: [
					e.jsx("div", {
						className: "flex justify-center mb-2",
						children: e.jsx(n, { className: "w-10 h-10 text-emerald-600" }),
					}),
					e.jsx(i, {
						className: "text-2xl font-bold",
						children: "Vérification de l'email",
					}),
					e.jsx(r, {
						children:
							"Votre email a été vérifié avec succès ! Redirection vers la connexion...",
					}),
				],
			})),
			(a[0] = t))
		: (t = a[0]);
	let s;
	return (
		a[1] === Symbol.for("react.memo_cache_sentinel")
			? ((s = e.jsxs(o, {
					className: "w-full max-w-md",
					children: [
						t,
						e.jsx(m, {
							className: "flex flex-col items-center justify-center",
							children: e.jsx(d, {
								variant: "default",
								className: "mt-4",
								asChild: !0,
								children: e.jsx(x, {
									to: "/auth/login",
									children: "Retour à la connexion",
								}),
							}),
						}),
					],
				})),
				(a[1] = s))
			: (s = a[1]),
		s
	);
}
const h = () => {
	const t = c.c(1);
	let s;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((s = e.jsx(f, {})), (t[0] = s))
			: (s = t[0]),
		s
	);
};
export { h as component };
