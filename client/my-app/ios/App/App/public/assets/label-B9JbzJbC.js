import { P as x } from "./index-Bv1xjdPd.js";
import { c as d, l as f, r as i, j as n, m as u } from "./index-kb-Ylywn.js";
var b = "Label",
	m = i.forwardRef((t, r) =>
		n.jsx(x.label, {
			...t,
			ref: r,
			onMouseDown: (e) => {
				var a;
				e.target.closest("button, input, select, textarea") ||
					((a = t.onMouseDown) == null || a.call(t, e),
					!e.defaultPrevented && e.detail > 1 && e.preventDefault());
			},
		}),
	);
m.displayName = b;
var c = m;
const p = u(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	),
	N = i.forwardRef((t, r) => {
		const e = d.c(9);
		let s, a;
		e[0] !== t
			? (({ className: s, ...a } = t), (e[0] = t), (e[1] = s), (e[2] = a))
			: ((s = e[1]), (a = e[2]));
		let l;
		e[3] !== s ? ((l = f(p(), s)), (e[3] = s), (e[4] = l)) : (l = e[4]);
		let o;
		return (
			e[5] !== a || e[6] !== r || e[7] !== l
				? ((o = n.jsx(c, { ref: r, className: l, ...a })),
					(e[5] = a),
					(e[6] = r),
					(e[7] = l),
					(e[8] = o))
				: (o = e[8]),
			o
		);
	});
N.displayName = c.displayName;
export { N as L };
