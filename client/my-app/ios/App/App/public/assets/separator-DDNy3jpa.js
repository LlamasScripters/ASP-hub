import { P as x } from "./index-Bv1xjdPd.js";
import { j as d, c as f, r as m, l as u } from "./index-kb-Ylywn.js";
var h = "Separator",
	p = "horizontal",
	N = ["horizontal", "vertical"],
	v = m.forwardRef((i, t) => {
		const { decorative: a, orientation: o = p, ...e } = i,
			r = E(o) ? o : p,
			s = a
				? { role: "none" }
				: {
						"aria-orientation": r === "vertical" ? r : void 0,
						role: "separator",
					};
		return d.jsx(x.div, { "data-orientation": r, ...s, ...e, ref: t });
	});
v.displayName = h;
function E(i) {
	return N.includes(i);
}
var O = v;
function P(i) {
	const t = f.c(12);
	let a, o, e, r;
	t[0] !== i
		? (({ className: a, orientation: e, decorative: r, ...o } = i),
			(t[0] = i),
			(t[1] = a),
			(t[2] = o),
			(t[3] = e),
			(t[4] = r))
		: ((a = t[1]), (o = t[2]), (e = t[3]), (r = t[4]));
	const l = e === void 0 ? "horizontal" : e,
		s = r === void 0 ? !0 : r;
	let n;
	t[5] !== a
		? ((n = u(
				"bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
				a,
			)),
			(t[5] = a),
			(t[6] = n))
		: (n = t[6]);
	let c;
	return (
		t[7] !== s || t[8] !== l || t[9] !== o || t[10] !== n
			? ((c = d.jsx(O, {
					"data-slot": "separator-root",
					decorative: s,
					orientation: l,
					className: n,
					...o,
				})),
				(t[7] = s),
				(t[8] = l),
				(t[9] = o),
				(t[10] = n),
				(t[11] = c))
			: (c = t[11]),
		c
	);
}
export { P as S };
