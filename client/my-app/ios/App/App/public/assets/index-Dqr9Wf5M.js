import { u as R } from "./index-DauBq6FI.js";
import { r as f, Q as w } from "./index-kb-Ylywn.js";
function y(t, e, { checkForDefaultPrevented: o = !0 } = {}) {
	return (c) => {
		if ((t == null || t(c), o === !1 || !c.defaultPrevented))
			return e == null ? void 0 : e(c);
	};
}
var S = w[" useInsertionEffect ".trim().toString()] || R;
function C({ prop: t, defaultProp: e, onChange: o = () => {}, caller: l }) {
	const [c, s, n] = b({ defaultProp: e, onChange: o }),
		r = t !== void 0,
		m = r ? t : c;
	{
		const u = f.useRef(t !== void 0);
		f.useEffect(() => {
			const i = u.current;
			i !== r &&
				console.warn(
					`${l} is changing from ${i ? "controlled" : "uncontrolled"} to ${r ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
				),
				(u.current = r);
		}, [r, l]);
	}
	const a = f.useCallback(
		(u) => {
			var i;
			if (r) {
				const d = v(u) ? u(t) : u;
				d !== t && ((i = n.current) == null || i.call(n, d));
			} else s(u);
		},
		[r, t, s, n],
	);
	return [m, a];
}
function b({ defaultProp: t, onChange: e }) {
	const [o, l] = f.useState(t),
		c = f.useRef(o),
		s = f.useRef(e);
	return (
		S(() => {
			s.current = e;
		}, [e]),
		f.useEffect(() => {
			var n;
			c.current !== o &&
				((n = s.current) == null || n.call(s, o), (c.current = o));
		}, [o, c]),
		[o, l, s]
	);
}
function v(t) {
	return typeof t == "function";
}
export { y as c, C as u };
