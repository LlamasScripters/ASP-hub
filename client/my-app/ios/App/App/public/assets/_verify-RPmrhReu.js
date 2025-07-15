import { A as m } from "./arrow-left-DMyOJown.js";
import { O as a, B as c, L as i, c as o, j as s } from "./index-kb-Ylywn.js";
function x(l) {
	const e = o.c(3),
		{ children: t } = l;
	let r;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((r = s.jsx(c, {
				variant: "link",
				asChild: !0,
				children: s.jsxs(i, {
					to: "/",
					className:
						"flex items-center mb-8 text-emerald-600 hover:text-emerald-700",
					children: [
						s.jsx(m, { className: "w-4 h-4 mr-2" }),
						"Retour à l'accueil",
					],
				}),
			})),
			(e[0] = r))
		: (r = e[0]);
	let n;
	return (
		e[1] !== t
			? ((n = s.jsx("div", {
					className: "flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900",
					children: s.jsxs("div", {
						className:
							"container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6",
						children: [r, t],
					}),
				})),
				(e[1] = t),
				(e[2] = n))
			: (n = e[2]),
		n
	);
}
const p = () => {
	const e = o.c(1);
	let t;
	return (
		e[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = s.jsx(x, { children: s.jsx(a, {}) })), (e[0] = t))
			: (t = e[0]),
		t
	);
};
export { p as component };
