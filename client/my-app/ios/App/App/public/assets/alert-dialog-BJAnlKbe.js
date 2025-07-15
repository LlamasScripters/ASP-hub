import { c as V } from "./index-DauBq6FI.js";
import { c as U } from "./index-Dqr9Wf5M.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import {
	P as B,
	R as G,
	T as J,
	D as K,
	a as N,
	O as Q,
	b as W,
	W as Y,
	C as q,
	c as x,
} from "./index-PyBbJ2cN.js";
import {
	H as D,
	c as d,
	j as i,
	r as n,
	l as p,
	bw as v,
	a as z,
} from "./index-kb-Ylywn.js";
const X = [
		["path", { d: "M3 6h18", key: "d0wm0j" }],
		["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
		["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
		["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
		["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
	],
	be = z("trash-2", X);
var Z = Symbol("radix.slottable");
function ee(s) {
	const t = ({ children: e }) => i.jsx(i.Fragment, { children: e });
	return (t.displayName = `${s}.Slottable`), (t.__radixId = Z), t;
}
var y = "AlertDialog",
	[te, je] = V(y, [x]),
	c = x(),
	_ = (s) => {
		const { __scopeAlertDialog: t, ...e } = s,
			a = c(t);
		return i.jsx(G, { ...a, ...e, modal: !0 });
	};
_.displayName = y;
var ae = "AlertDialogTrigger",
	h = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, ...a } = s,
			o = c(e);
		return i.jsx(W, { ...o, ...a, ref: t });
	});
h.displayName = ae;
var oe = "AlertDialogPortal",
	R = (s) => {
		const { __scopeAlertDialog: t, ...e } = s,
			a = c(t);
		return i.jsx(B, { ...a, ...e });
	};
R.displayName = oe;
var se = "AlertDialogOverlay",
	b = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, ...a } = s,
			o = c(e);
		return i.jsx(Q, { ...o, ...a, ref: t });
	});
b.displayName = se;
var m = "AlertDialogContent",
	[le, re] = te(m),
	ie = ee("AlertDialogContent"),
	j = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, children: a, ...o } = s,
			l = c(e),
			r = n.useRef(null),
			g = D(t, r),
			u = n.useRef(null);
		return i.jsx(Y, {
			contentName: m,
			titleName: E,
			docsSlug: "alert-dialog",
			children: i.jsx(le, {
				scope: e,
				cancelRef: u,
				children: i.jsxs(q, {
					role: "alertdialog",
					...l,
					...o,
					ref: g,
					onOpenAutoFocus: U(o.onOpenAutoFocus, (f) => {
						var A;
						f.preventDefault(),
							(A = u.current) == null || A.focus({ preventScroll: !0 });
					}),
					onPointerDownOutside: (f) => f.preventDefault(),
					onInteractOutside: (f) => f.preventDefault(),
					children: [i.jsx(ie, { children: a }), i.jsx(ce, { contentRef: r })],
				}),
			}),
		});
	});
j.displayName = m;
var E = "AlertDialogTitle",
	S = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, ...a } = s,
			o = c(e);
		return i.jsx(J, { ...o, ...a, ref: t });
	});
S.displayName = E;
var T = "AlertDialogDescription",
	w = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, ...a } = s,
			o = c(e);
		return i.jsx(K, { ...o, ...a, ref: t });
	});
w.displayName = T;
var ne = "AlertDialogAction",
	C = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, ...a } = s,
			o = c(e);
		return i.jsx(N, { ...o, ...a, ref: t });
	});
C.displayName = ne;
var $ = "AlertDialogCancel",
	P = n.forwardRef((s, t) => {
		const { __scopeAlertDialog: e, ...a } = s,
			{ cancelRef: o } = re($, e),
			l = c(e),
			r = D(t, o);
		return i.jsx(N, { ...l, ...a, ref: r });
	});
P.displayName = $;
var ce = ({ contentRef: s }) => {
		const t = `\`${m}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${m}\` by passing a \`${T}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${m}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
		return (
			n.useEffect(() => {
				var a;
				document.getElementById(
					(a = s.current) == null ? void 0 : a.getAttribute("aria-describedby"),
				) || console.warn(t);
			}, [t, s]),
			null
		);
	},
	de = _,
	pe = h,
	ge = R,
	O = b,
	I = j,
	M = C,
	k = P,
	F = S,
	L = w;
const Ee = de,
	Se = pe,
	me = ge,
	H = n.forwardRef((s, t) => {
		const e = d.c(9);
		let a, o;
		e[0] !== s
			? (({ className: a, ...o } = s), (e[0] = s), (e[1] = a), (e[2] = o))
			: ((a = e[1]), (o = e[2]));
		let l;
		e[3] !== a
			? ((l = p(
					"fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					a,
				)),
				(e[3] = a),
				(e[4] = l))
			: (l = e[4]);
		let r;
		return (
			e[5] !== o || e[6] !== t || e[7] !== l
				? ((r = i.jsx(O, { className: l, ...o, ref: t })),
					(e[5] = o),
					(e[6] = t),
					(e[7] = l),
					(e[8] = r))
				: (r = e[8]),
			r
		);
	});
H.displayName = O.displayName;
const fe = n.forwardRef((s, t) => {
	const e = d.c(10);
	let a, o;
	e[0] !== s
		? (({ className: a, ...o } = s), (e[0] = s), (e[1] = a), (e[2] = o))
		: ((a = e[1]), (o = e[2]));
	let l;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((l = i.jsx(H, {})), (e[3] = l))
		: (l = e[3]);
	let r;
	e[4] !== a
		? ((r = p(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
				a,
			)),
			(e[4] = a),
			(e[5] = r))
		: (r = e[5]);
	let g;
	return (
		e[6] !== o || e[7] !== t || e[8] !== r
			? ((g = i.jsxs(me, {
					children: [l, i.jsx(I, { ref: t, className: r, ...o })],
				})),
				(e[6] = o),
				(e[7] = t),
				(e[8] = r),
				(e[9] = g))
			: (g = e[9]),
		g
	);
});
fe.displayName = I.displayName;
const ue = (s) => {
	const t = d.c(8);
	let e, a;
	t[0] !== s
		? (({ className: e, ...a } = s), (t[0] = s), (t[1] = e), (t[2] = a))
		: ((e = t[1]), (a = t[2]));
	let o;
	t[3] !== e
		? ((o = p("flex flex-col space-y-2 text-center sm:text-left", e)),
			(t[3] = e),
			(t[4] = o))
		: (o = t[4]);
	let l;
	return (
		t[5] !== a || t[6] !== o
			? ((l = i.jsx("div", { className: o, ...a })),
				(t[5] = a),
				(t[6] = o),
				(t[7] = l))
			: (l = t[7]),
		l
	);
};
ue.displayName = "AlertDialogHeader";
const Ae = (s) => {
	const t = d.c(8);
	let e, a;
	t[0] !== s
		? (({ className: e, ...a } = s), (t[0] = s), (t[1] = e), (t[2] = a))
		: ((e = t[1]), (a = t[2]));
	let o;
	t[3] !== e
		? ((o = p(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				e,
			)),
			(t[3] = e),
			(t[4] = o))
		: (o = t[4]);
	let l;
	return (
		t[5] !== a || t[6] !== o
			? ((l = i.jsx("div", { className: o, ...a })),
				(t[5] = a),
				(t[6] = o),
				(t[7] = l))
			: (l = t[7]),
		l
	);
};
Ae.displayName = "AlertDialogFooter";
const De = n.forwardRef((s, t) => {
	const e = d.c(9);
	let a, o;
	e[0] !== s
		? (({ className: a, ...o } = s), (e[0] = s), (e[1] = a), (e[2] = o))
		: ((a = e[1]), (o = e[2]));
	let l;
	e[3] !== a
		? ((l = p("text-lg font-semibold", a)), (e[3] = a), (e[4] = l))
		: (l = e[4]);
	let r;
	return (
		e[5] !== o || e[6] !== t || e[7] !== l
			? ((r = i.jsx(F, { ref: t, className: l, ...o })),
				(e[5] = o),
				(e[6] = t),
				(e[7] = l),
				(e[8] = r))
			: (r = e[8]),
		r
	);
});
De.displayName = F.displayName;
const ve = n.forwardRef((s, t) => {
	const e = d.c(9);
	let a, o;
	e[0] !== s
		? (({ className: a, ...o } = s), (e[0] = s), (e[1] = a), (e[2] = o))
		: ((a = e[1]), (o = e[2]));
	let l;
	e[3] !== a
		? ((l = p("text-sm text-muted-foreground", a)), (e[3] = a), (e[4] = l))
		: (l = e[4]);
	let r;
	return (
		e[5] !== o || e[6] !== t || e[7] !== l
			? ((r = i.jsx(L, { ref: t, className: l, ...o })),
				(e[5] = o),
				(e[6] = t),
				(e[7] = l),
				(e[8] = r))
			: (r = e[8]),
		r
	);
});
ve.displayName = L.displayName;
const xe = n.forwardRef((s, t) => {
	const e = d.c(9);
	let a, o;
	e[0] !== s
		? (({ className: a, ...o } = s), (e[0] = s), (e[1] = a), (e[2] = o))
		: ((a = e[1]), (o = e[2]));
	let l;
	e[3] !== a ? ((l = p(v(), a)), (e[3] = a), (e[4] = l)) : (l = e[4]);
	let r;
	return (
		e[5] !== o || e[6] !== t || e[7] !== l
			? ((r = i.jsx(M, { ref: t, className: l, ...o })),
				(e[5] = o),
				(e[6] = t),
				(e[7] = l),
				(e[8] = r))
			: (r = e[8]),
		r
	);
});
xe.displayName = M.displayName;
const Ne = n.forwardRef((s, t) => {
	const e = d.c(9);
	let a, o;
	e[0] !== s
		? (({ className: a, ...o } = s), (e[0] = s), (e[1] = a), (e[2] = o))
		: ((a = e[1]), (o = e[2]));
	let l;
	e[3] !== a
		? ((l = p(v({ variant: "outline" }), "mt-2 sm:mt-0", a)),
			(e[3] = a),
			(e[4] = l))
		: (l = e[4]);
	let r;
	return (
		e[5] !== o || e[6] !== t || e[7] !== l
			? ((r = i.jsx(k, { ref: t, className: l, ...o })),
				(e[5] = o),
				(e[6] = t),
				(e[7] = l),
				(e[8] = r))
			: (r = e[8]),
		r
	);
});
Ne.displayName = k.displayName;
export {
	Ne as A,
	be as T,
	xe as a,
	De as b,
	ue as c,
	ve as d,
	Ae as e,
	fe as f,
	Ee as g,
	Se as h,
};
