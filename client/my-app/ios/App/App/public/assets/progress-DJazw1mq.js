import { P as g } from "./index-Bv1xjdPd.js";
import { c as I } from "./index-DauBq6FI.js";
import { l as E, j as d, r as p, c as y } from "./index-kb-Ylywn.js";
var m = "Progress",
	v = 100,
	[R, O] = I(m),
	[j, w] = R(m),
	P = p.forwardRef((r, t) => {
		const {
			__scopeProgress: e,
			value: o = null,
			max: a,
			getValueLabel: i = _,
			...n
		} = r;
		(a || a === 0) && !f(a) && console.error(M(`${a}`, "Progress"));
		const l = f(a) ? a : v;
		o !== null && !x(o, l) && console.error(V(`${o}`, "Progress"));
		const s = x(o, l) ? o : null,
			u = c(s) ? i(s, l) : void 0;
		return d.jsx(j, {
			scope: e,
			value: s,
			max: l,
			children: d.jsx(g.div, {
				"aria-valuemax": l,
				"aria-valuemin": 0,
				"aria-valuenow": c(s) ? s : void 0,
				"aria-valuetext": u,
				role: "progressbar",
				"data-state": $(s, l),
				"data-value": s ?? void 0,
				"data-max": l,
				...n,
				ref: t,
			}),
		});
	});
P.displayName = m;
var N = "ProgressIndicator",
	b = p.forwardRef((r, t) => {
		const { __scopeProgress: e, ...o } = r,
			a = w(N, e);
		return d.jsx(g.div, {
			"data-state": $(a.value, a.max),
			"data-value": a.value ?? void 0,
			"data-max": a.max,
			...o,
			ref: t,
		});
	});
b.displayName = N;
function _(r, t) {
	return `${Math.round((r / t) * 100)}%`;
}
function $(r, t) {
	return r == null ? "indeterminate" : r === t ? "complete" : "loading";
}
function c(r) {
	return typeof r == "number";
}
function f(r) {
	return c(r) && !isNaN(r) && r > 0;
}
function x(r, t) {
	return c(r) && !isNaN(r) && r <= t && r >= 0;
}
function M(r, t) {
	return `Invalid prop \`max\` of value \`${r}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${v}\`.`;
}
function V(r, t) {
	return `Invalid prop \`value\` of value \`${r}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${v} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var h = P,
	A = b;
const S = p.forwardRef((r, t) => {
	const e = y.c(13);
	let o, a, i;
	e[0] !== r
		? (({ className: o, value: i, ...a } = r),
			(e[0] = r),
			(e[1] = o),
			(e[2] = a),
			(e[3] = i))
		: ((o = e[1]), (a = e[2]), (i = e[3]));
	let n;
	e[4] !== o
		? ((n = E(
				"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
				o,
			)),
			(e[4] = o),
			(e[5] = n))
		: (n = e[5]);
	const l = `translateX(-${100 - (i || 0)}%)`;
	let s;
	e[6] !== l
		? ((s = d.jsx(A, {
				className: "h-full w-full flex-1 bg-primary transition-all",
				style: { transform: l },
			})),
			(e[6] = l),
			(e[7] = s))
		: (s = e[7]);
	let u;
	return (
		e[8] !== a || e[9] !== t || e[10] !== n || e[11] !== s
			? ((u = d.jsx(h, { ref: t, className: n, ...a, children: s })),
				(e[8] = a),
				(e[9] = t),
				(e[10] = n),
				(e[11] = s),
				(e[12] = u))
			: (u = e[12]),
		u
	);
});
S.displayName = h.displayName;
export { S as P };
