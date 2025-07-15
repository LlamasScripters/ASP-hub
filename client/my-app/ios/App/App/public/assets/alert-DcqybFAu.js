import { c, l as d, r as n, j as p, m as v } from "./index-kb-Ylywn.js";
const u = v(
		"relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
		{
			variants: {
				variant: {
					default: "bg-background text-foreground",
					destructive:
						"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				},
			},
			defaultVariants: { variant: "default" },
		},
	),
	m = n.forwardRef((r, i) => {
		const e = c.c(11);
		let t, s, a;
		e[0] !== r
			? (({ className: t, variant: a, ...s } = r),
				(e[0] = r),
				(e[1] = t),
				(e[2] = s),
				(e[3] = a))
			: ((t = e[1]), (s = e[2]), (a = e[3]));
		let l;
		e[4] !== t || e[5] !== a
			? ((l = d(u({ variant: a }), t)), (e[4] = t), (e[5] = a), (e[6] = l))
			: (l = e[6]);
		let o;
		return (
			e[7] !== s || e[8] !== i || e[9] !== l
				? ((o = p.jsx("div", { ref: i, role: "alert", className: l, ...s })),
					(e[7] = s),
					(e[8] = i),
					(e[9] = l),
					(e[10] = o))
				: (o = e[10]),
			o
		);
	});
m.displayName = "Alert";
const f = n.forwardRef((r, i) => {
	const e = c.c(9);
	let t, s;
	e[0] !== r
		? (({ className: t, ...s } = r), (e[0] = r), (e[1] = t), (e[2] = s))
		: ((t = e[1]), (s = e[2]));
	let a;
	e[3] !== t
		? ((a = d("mb-1 font-medium leading-none tracking-tight", t)),
			(e[3] = t),
			(e[4] = a))
		: (a = e[4]);
	let l;
	return (
		e[5] !== s || e[6] !== i || e[7] !== a
			? ((l = p.jsx("h5", { ref: i, className: a, ...s })),
				(e[5] = s),
				(e[6] = i),
				(e[7] = a),
				(e[8] = l))
			: (l = e[8]),
		l
	);
});
f.displayName = "AlertTitle";
const g = n.forwardRef((r, i) => {
	const e = c.c(9);
	let t, s;
	e[0] !== r
		? (({ className: t, ...s } = r), (e[0] = r), (e[1] = t), (e[2] = s))
		: ((t = e[1]), (s = e[2]));
	let a;
	e[3] !== t
		? ((a = d("text-sm [&_p]:leading-relaxed", t)), (e[3] = t), (e[4] = a))
		: (a = e[4]);
	let l;
	return (
		e[5] !== s || e[6] !== i || e[7] !== a
			? ((l = p.jsx("div", { ref: i, className: a, ...s })),
				(e[5] = s),
				(e[6] = i),
				(e[7] = a),
				(e[8] = l))
			: (l = e[8]),
		l
	);
});
g.displayName = "AlertDescription";
export { m as A, g as a, f as b };
