import { l as c, j as d, r as l, c as n } from "./index-kb-Ylywn.js";
const u = l.forwardRef((a, i) => {
	const e = n.c(9);
	let s, r;
	e[0] !== a
		? (({ className: s, ...r } = a), (e[0] = a), (e[1] = s), (e[2] = r))
		: ((s = e[1]), (r = e[2]));
	let t;
	e[3] !== s
		? ((t = c(
				"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				s,
			)),
			(e[3] = s),
			(e[4] = t))
		: (t = e[4]);
	let o;
	return (
		e[5] !== r || e[6] !== i || e[7] !== t
			? ((o = d.jsx("textarea", { className: t, ref: i, ...r })),
				(e[5] = r),
				(e[6] = i),
				(e[7] = t),
				(e[8] = o))
			: (o = e[8]),
		o
	);
});
u.displayName = "Textarea";
export { u as T };
