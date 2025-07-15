import {
	c as a,
	S as c,
	B as d,
	j as e,
	d as i,
	f as m,
	b as n,
	e as o,
	C as r,
	L as x,
} from "./index-kb-Ylywn.js";
function f() {
	const s = a.c(2);
	let l;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((l = e.jsxs(r, {
				className: "space-y-1 text-center",
				children: [
					e.jsx("div", {
						className: "flex justify-center mb-2",
						children: e.jsx(c, { className: "w-12 h-12 text-emerald-600" }),
					}),
					e.jsx(n, {
						className: "text-3xl font-bold",
						children: "Interdit 🛑",
					}),
					e.jsx(i, {
						children:
							"Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
					}),
				],
			})),
			(s[0] = l))
		: (l = s[0]);
	let t;
	return (
		s[1] === Symbol.for("react.memo_cache_sentinel")
			? ((t = e.jsx("div", {
					className:
						"flex flex-col w-full min-h-screen bg-background text-foreground",
					children: e.jsx("div", {
						className:
							"container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6",
						children: e.jsxs(o, {
							className: "w-full max-w-md shadow-lg",
							children: [
								l,
								e.jsx(m, {
									className: "flex flex-col items-center justify-center gap-4",
									children: e.jsx(d, {
										asChild: !0,
										size: "lg",
										className: "w-full mt-2",
										children: e.jsx(x, {
											to: "/",
											children: "Retour à l'accueil",
										}),
									}),
								}),
							],
						}),
					}),
				})),
				(s[1] = t))
			: (t = s[1]),
		t
	);
}
const p = f;
export { p as errorComponent };
