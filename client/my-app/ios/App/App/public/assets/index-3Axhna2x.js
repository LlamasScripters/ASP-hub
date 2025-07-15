import { c as h } from "./index-DauBq6FI.js";
import { j as E, Z as R, H as g, r } from "./index-kb-Ylywn.js";
function N(e) {
	const t = T(e),
		l = r.forwardRef((n, o) => {
			const { children: c, ...f } = n,
				s = r.Children.toArray(c),
				i = s.find(P);
			if (i) {
				const u = i.props.children,
					S = s.map((y) =>
						y === i
							? r.Children.count(u) > 1
								? r.Children.only(null)
								: r.isValidElement(u)
									? u.props.children
									: null
							: y,
					);
				return E.jsx(t, {
					...f,
					ref: o,
					children: r.isValidElement(u) ? r.cloneElement(u, void 0, S) : null,
				});
			}
			return E.jsx(t, { ...f, ref: o, children: c });
		});
	return (l.displayName = `${e}.Slot`), l;
}
function T(e) {
	const t = r.forwardRef((l, n) => {
		const { children: o, ...c } = l,
			f = r.isValidElement(o) ? b(o) : void 0,
			s = g(f, n);
		if (r.isValidElement(o)) {
			const i = D(c, o.props);
			return o.type !== r.Fragment && (i.ref = s), r.cloneElement(o, i);
		}
		return r.Children.count(o) > 1 ? r.Children.only(null) : null;
	});
	return (t.displayName = `${e}.SlotClone`), t;
}
var j = Symbol("radix.slottable");
function P(e) {
	return (
		r.isValidElement(e) &&
		typeof e.type == "function" &&
		"__radixId" in e.type &&
		e.type.__radixId === j
	);
}
function D(e, t) {
	const l = { ...t };
	for (const n in t) {
		const o = e[n],
			c = t[n];
		/^on[A-Z]/.test(n)
			? o && c
				? (l[n] = (...s) => {
						const i = c(...s);
						return o(...s), i;
					})
				: o && (l[n] = o)
			: n === "style"
				? (l[n] = { ...o, ...c })
				: n === "className" && (l[n] = [o, c].filter(Boolean).join(" "));
	}
	return { ...e, ...l };
}
function b(e) {
	var n, o;
	let t =
			(n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
				? void 0
				: n.get,
		l = t && "isReactWarning" in t && t.isReactWarning;
	return l
		? e.ref
		: ((t =
				(o = Object.getOwnPropertyDescriptor(e, "ref")) == null
					? void 0
					: o.get),
			(l = t && "isReactWarning" in t && t.isReactWarning),
			l ? e.props.ref : e.props.ref || e.ref);
}
function W(e) {
	const t = e + "CollectionProvider",
		[l, n] = h(t),
		[o, c] = l(t, { collectionRef: { current: null }, itemMap: new Map() }),
		f = (m) => {
			const { scope: a, children: x } = m,
				p = R.useRef(null),
				d = R.useRef(new Map()).current;
			return E.jsx(o, { scope: a, itemMap: d, collectionRef: p, children: x });
		};
	f.displayName = t;
	const s = e + "CollectionSlot",
		i = N(s),
		u = R.forwardRef((m, a) => {
			const { scope: x, children: p } = m,
				d = c(s, x),
				C = g(a, d.collectionRef);
			return E.jsx(i, { ref: C, children: p });
		});
	u.displayName = s;
	const S = e + "CollectionItemSlot",
		y = "data-radix-collection-item",
		v = N(S),
		A = R.forwardRef((m, a) => {
			const { scope: x, children: p, ...d } = m,
				C = R.useRef(null),
				M = g(a, C),
				I = c(S, x);
			return (
				R.useEffect(
					() => (
						I.itemMap.set(C, { ref: C, ...d }), () => void I.itemMap.delete(C)
					),
				),
				E.jsx(v, { [y]: "", ref: M, children: p })
			);
		});
	A.displayName = S;
	function O(m) {
		const a = c(e + "CollectionConsumer", m);
		return R.useCallback(() => {
			const p = a.collectionRef.current;
			if (!p) return [];
			const d = Array.from(p.querySelectorAll(`[${y}]`));
			return Array.from(a.itemMap.values()).sort(
				(I, _) => d.indexOf(I.ref.current) - d.indexOf(_.ref.current),
			);
		}, [a.collectionRef, a.itemMap]);
	}
	return [{ Provider: f, Slot: u, ItemSlot: A }, O, n];
}
var w = r.createContext(void 0);
function H(e) {
	const t = r.useContext(w);
	return e || t || "ltr";
}
export { W as c, H as u };
