import { u as L } from "./index-3Axhna2x.js";
import { c as N, R as V, I as k } from "./index-BP52hRXm.js";
import { P as G } from "./index-BRam3N1Z.js";
import { P as b } from "./index-Bv1xjdPd.js";
import { u as K } from "./index-CvBT1pZ2.js";
import { c as D } from "./index-DauBq6FI.js";
import { u as F, c as g } from "./index-Dqr9Wf5M.js";
import { c as T, r as d, j as l, l as x } from "./index-kb-Ylywn.js";
var v = "Tabs",
	[B, ae] = D(v, [N]),
	h = N(),
	[q, y] = B(v),
	C = d.forwardRef((n, r) => {
		const {
				__scopeTabs: e,
				value: t,
				onValueChange: a,
				defaultValue: o,
				orientation: s = "horizontal",
				dir: u,
				activationMode: m = "automatic",
				...p
			} = n,
			c = L(u),
			[i, f] = F({ prop: t, onChange: a, defaultProp: o ?? "", caller: v });
		return l.jsx(q, {
			scope: e,
			baseId: K(),
			value: i,
			onValueChange: f,
			orientation: s,
			dir: c,
			activationMode: m,
			children: l.jsx(b.div, { dir: c, "data-orientation": s, ...p, ref: r }),
		});
	});
C.displayName = v;
var R = "TabsList",
	I = d.forwardRef((n, r) => {
		const { __scopeTabs: e, loop: t = !0, ...a } = n,
			o = y(R, e),
			s = h(e);
		return l.jsx(V, {
			asChild: !0,
			...s,
			orientation: o.orientation,
			dir: o.dir,
			loop: t,
			children: l.jsx(b.div, {
				role: "tablist",
				"aria-orientation": o.orientation,
				...a,
				ref: r,
			}),
		});
	});
I.displayName = R;
var j = "TabsTrigger",
	w = d.forwardRef((n, r) => {
		const { __scopeTabs: e, value: t, disabled: a = !1, ...o } = n,
			s = y(j, e),
			u = h(e),
			m = E(s.baseId, t),
			p = P(s.baseId, t),
			c = t === s.value;
		return l.jsx(k, {
			asChild: !0,
			...u,
			focusable: !a,
			active: c,
			children: l.jsx(b.button, {
				type: "button",
				role: "tab",
				"aria-selected": c,
				"aria-controls": p,
				"data-state": c ? "active" : "inactive",
				"data-disabled": a ? "" : void 0,
				disabled: a,
				id: m,
				...o,
				ref: r,
				onMouseDown: g(n.onMouseDown, (i) => {
					!a && i.button === 0 && i.ctrlKey === !1
						? s.onValueChange(t)
						: i.preventDefault();
				}),
				onKeyDown: g(n.onKeyDown, (i) => {
					[" ", "Enter"].includes(i.key) && s.onValueChange(t);
				}),
				onFocus: g(n.onFocus, () => {
					const i = s.activationMode !== "manual";
					!c && !a && i && s.onValueChange(t);
				}),
			}),
		});
	});
w.displayName = j;
var _ = "TabsContent",
	A = d.forwardRef((n, r) => {
		const { __scopeTabs: e, value: t, forceMount: a, children: o, ...s } = n,
			u = y(_, e),
			m = E(u.baseId, t),
			p = P(u.baseId, t),
			c = t === u.value,
			i = d.useRef(c);
		return (
			d.useEffect(() => {
				const f = requestAnimationFrame(() => (i.current = !1));
				return () => cancelAnimationFrame(f);
			}, []),
			l.jsx(G, {
				present: a || c,
				children: ({ present: f }) =>
					l.jsx(b.div, {
						"data-state": c ? "active" : "inactive",
						"data-orientation": u.orientation,
						role: "tabpanel",
						"aria-labelledby": m,
						hidden: !f,
						id: p,
						tabIndex: 0,
						...s,
						ref: r,
						style: { ...n.style, animationDuration: i.current ? "0s" : void 0 },
						children: f && o,
					}),
			})
		);
	});
A.displayName = _;
function E(n, r) {
	return `${n}-trigger-${r}`;
}
function P(n, r) {
	return `${n}-content-${r}`;
}
var z = C,
	S = I,
	$ = w,
	M = A;
const oe = z,
	H = d.forwardRef((n, r) => {
		const e = T.c(9);
		let t, a;
		e[0] !== n
			? (({ className: t, ...a } = n), (e[0] = n), (e[1] = t), (e[2] = a))
			: ((t = e[1]), (a = e[2]));
		let o;
		e[3] !== t
			? ((o = x(
					"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
					t,
				)),
				(e[3] = t),
				(e[4] = o))
			: (o = e[4]);
		let s;
		return (
			e[5] !== a || e[6] !== r || e[7] !== o
				? ((s = l.jsx(S, { ref: r, className: o, ...a })),
					(e[5] = a),
					(e[6] = r),
					(e[7] = o),
					(e[8] = s))
				: (s = e[8]),
			s
		);
	});
H.displayName = S.displayName;
const O = d.forwardRef((n, r) => {
	const e = T.c(9);
	let t, a;
	e[0] !== n
		? (({ className: t, ...a } = n), (e[0] = n), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let o;
	e[3] !== t
		? ((o = x(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
				t,
			)),
			(e[3] = t),
			(e[4] = o))
		: (o = e[4]);
	let s;
	return (
		e[5] !== a || e[6] !== r || e[7] !== o
			? ((s = l.jsx($, { ref: r, className: o, ...a })),
				(e[5] = a),
				(e[6] = r),
				(e[7] = o),
				(e[8] = s))
			: (s = e[8]),
		s
	);
});
O.displayName = $.displayName;
const J = d.forwardRef((n, r) => {
	const e = T.c(9);
	let t, a;
	e[0] !== n
		? (({ className: t, ...a } = n), (e[0] = n), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let o;
	e[3] !== t
		? ((o = x(
				"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				t,
			)),
			(e[3] = t),
			(e[4] = o))
		: (o = e[4]);
	let s;
	return (
		e[5] !== a || e[6] !== r || e[7] !== o
			? ((s = l.jsx(M, { ref: r, className: o, ...a })),
				(e[5] = a),
				(e[6] = r),
				(e[7] = o),
				(e[8] = s))
			: (s = e[8]),
		s
	);
});
J.displayName = M.displayName;
export { H as T, O as a, J as b, oe as c };
