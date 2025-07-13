import { r as i, H as m, j as p, U as y } from "./index-kb-Ylywn.js";
function E(e) {
	const r = v(e),
		o = i.forwardRef((n, t) => {
			const { children: s, ...c } = n,
				a = i.Children.toArray(s),
				l = a.find(C);
			if (l) {
				const f = l.props.children,
					d = a.map((u) =>
						u === l
							? i.Children.count(f) > 1
								? i.Children.only(null)
								: i.isValidElement(f)
									? f.props.children
									: null
							: u,
					);
				return p.jsx(r, {
					...c,
					ref: t,
					children: i.isValidElement(f) ? i.cloneElement(f, void 0, d) : null,
				});
			}
			return p.jsx(r, { ...c, ref: t, children: s });
		});
	return (o.displayName = `${e}.Slot`), o;
}
function v(e) {
	const r = i.forwardRef((o, n) => {
		const { children: t, ...s } = o,
			c = i.isValidElement(t) ? g(t) : void 0,
			a = m(c, n);
		if (i.isValidElement(t)) {
			const l = S(s, t.props);
			return t.type !== i.Fragment && (l.ref = a), i.cloneElement(t, l);
		}
		return i.Children.count(t) > 1 ? i.Children.only(null) : null;
	});
	return (r.displayName = `${e}.SlotClone`), r;
}
var h = Symbol("radix.slottable");
function C(e) {
	return (
		i.isValidElement(e) &&
		typeof e.type == "function" &&
		"__radixId" in e.type &&
		e.type.__radixId === h
	);
}
function S(e, r) {
	const o = { ...r };
	for (const n in r) {
		const t = e[n],
			s = r[n];
		/^on[A-Z]/.test(n)
			? t && s
				? (o[n] = (...a) => {
						const l = s(...a);
						return t(...a), l;
					})
				: t && (o[n] = t)
			: n === "style"
				? (o[n] = { ...t, ...s })
				: n === "className" && (o[n] = [t, s].filter(Boolean).join(" "));
	}
	return { ...e, ...o };
}
function g(e) {
	var n, t;
	let r =
			(n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
				? void 0
				: n.get,
		o = r && "isReactWarning" in r && r.isReactWarning;
	return o
		? e.ref
		: ((r =
				(t = Object.getOwnPropertyDescriptor(e, "ref")) == null
					? void 0
					: t.get),
			(o = r && "isReactWarning" in r && r.isReactWarning),
			o ? e.props.ref : e.props.ref || e.ref);
}
var x = [
		"a",
		"button",
		"div",
		"form",
		"h2",
		"h3",
		"img",
		"input",
		"label",
		"li",
		"nav",
		"ol",
		"p",
		"select",
		"span",
		"svg",
		"ul",
	],
	P = x.reduce((e, r) => {
		const o = E(`Primitive.${r}`),
			n = i.forwardRef((t, s) => {
				const { asChild: c, ...a } = t,
					l = c ? o : r;
				return (
					typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
					p.jsx(l, { ...a, ref: s })
				);
			});
		return (n.displayName = `Primitive.${r}`), { ...e, [r]: n };
	}, {});
function b(e, r) {
	e && y.flushSync(() => e.dispatchEvent(r));
}
export { P, b as d };
