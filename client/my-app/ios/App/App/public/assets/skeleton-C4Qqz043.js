import { l as c, j as i, c as n } from "./index-kb-Ylywn.js";
function m(o) {
	const e = n.c(8);
	let s, t;
	e[0] !== o
		? (({ className: s, ...t } = o), (e[0] = o), (e[1] = s), (e[2] = t))
		: ((s = e[1]), (t = e[2]));
	let l;
	e[3] !== s
		? ((l = c("bg-accent animate-pulse rounded-md", s)), (e[3] = s), (e[4] = l))
		: (l = e[4]);
	let a;
	return (
		e[5] !== t || e[6] !== l
			? ((a = i.jsx("div", { "data-slot": "skeleton", className: l, ...t })),
				(e[5] = t),
				(e[6] = l),
				(e[7] = a))
			: (a = e[7]),
		a
	);
}
export { m as S };
