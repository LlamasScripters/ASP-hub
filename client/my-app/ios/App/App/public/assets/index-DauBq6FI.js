import { j as l, r as s } from "./index-kb-Ylywn.js";
function b(e, c) {
	const o = s.createContext(c),
		x = (r) => {
			const { children: t, ...n } = r,
				u = s.useMemo(() => n, Object.values(n));
			return l.jsx(o.Provider, { value: u, children: t });
		};
	x.displayName = e + "Provider";
	function i(r) {
		const t = s.useContext(o);
		if (t) return t;
		if (c !== void 0) return c;
		throw new Error(`\`${r}\` must be used within \`${e}\``);
	}
	return [x, i];
}
function j(e, c = []) {
	let o = [];
	function x(r, t) {
		const n = s.createContext(t),
			u = o.length;
		o = [...o, t];
		const p = (d) => {
			var h;
			const { scope: a, children: v, ...f } = d,
				m = ((h = a == null ? void 0 : a[e]) == null ? void 0 : h[u]) || n,
				S = s.useMemo(() => f, Object.values(f));
			return l.jsx(m.Provider, { value: S, children: v });
		};
		p.displayName = r + "Provider";
		function C(d, a) {
			var m;
			const v = ((m = a == null ? void 0 : a[e]) == null ? void 0 : m[u]) || n,
				f = s.useContext(v);
			if (f) return f;
			if (t !== void 0) return t;
			throw new Error(`\`${d}\` must be used within \`${r}\``);
		}
		return [p, C];
	}
	const i = () => {
		const r = o.map((t) => s.createContext(t));
		return (n) => {
			const u = (n == null ? void 0 : n[e]) || r;
			return s.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: u } }), [n, u]);
		};
	};
	return (i.scopeName = e), [x, P(i, ...c)];
}
function P(...e) {
	const c = e[0];
	if (e.length === 1) return c;
	const o = () => {
		const x = e.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
		return (r) => {
			const t = x.reduce((n, { useScope: u, scopeName: p }) => {
				const d = u(r)[`__scope${p}`];
				return { ...n, ...d };
			}, {});
			return s.useMemo(() => ({ [`__scope${c.scopeName}`]: t }), [t]);
		};
	};
	return (o.scopeName = c.scopeName), o;
}
var w =
	globalThis != null && globalThis.document ? s.useLayoutEffect : () => {};
export { b as a, j as c, w as u };
