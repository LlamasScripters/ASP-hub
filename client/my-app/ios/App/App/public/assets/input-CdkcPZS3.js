import { l as a, j as d, c as l } from "./index-kb-Ylywn.js";
function p(s) {
	const e = l.c(10);
	let i, t, r;
	e[0] !== s
		? (({ className: i, type: r, ...t } = s),
			(e[0] = s),
			(e[1] = i),
			(e[2] = t),
			(e[3] = r))
		: ((i = e[1]), (t = e[2]), (r = e[3]));
	let n;
	e[4] !== i
		? ((n = a(
				"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				i,
			)),
			(e[4] = i),
			(e[5] = n))
		: (n = e[5]);
	let o;
	return (
		e[6] !== t || e[7] !== n || e[8] !== r
			? ((o = d.jsx("input", {
					type: r,
					"data-slot": "input",
					className: n,
					...t,
				})),
				(e[6] = t),
				(e[7] = n),
				(e[8] = r),
				(e[9] = o))
			: (o = e[9]),
		o
	);
}
export { p as I };
