import { m as c, l as d, c as i, j as l } from "./index-kb-Ylywn.js";
const u = c(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: { variant: "default" },
	},
);
function g(a) {
	const e = i.c(10);
	let r, t, n;
	e[0] !== a
		? (({ className: r, variant: n, ...t } = a),
			(e[0] = a),
			(e[1] = r),
			(e[2] = t),
			(e[3] = n))
		: ((r = e[1]), (t = e[2]), (n = e[3]));
	let o;
	e[4] !== r || e[5] !== n
		? ((o = d(u({ variant: n }), r)), (e[4] = r), (e[5] = n), (e[6] = o))
		: (o = e[6]);
	let s;
	return (
		e[7] !== t || e[8] !== o
			? ((s = l.jsx("div", { className: o, ...t })),
				(e[7] = t),
				(e[8] = o),
				(e[9] = s))
			: (s = e[9]),
		s
	);
}
export { g as B };
