import { P as E } from "./index-BRam3N1Z.js";
import { P as D } from "./index-Bv1xjdPd.js";
import {
	h as K,
	u as U,
	F as Y,
	P as Z,
	R as q,
	D as z,
} from "./index-CnLXGm6V.js";
import { u as y } from "./index-CvBT1pZ2.js";
import { c as B, a as H } from "./index-DauBq6FI.js";
import { u as $, c as m } from "./index-Dqr9Wf5M.js";
import { j as i, r as s, H as x } from "./index-kb-Ylywn.js";
function J(e) {
	const o = Q(e),
		a = s.forwardRef((n, t) => {
			const { children: r, ...l } = n,
				c = s.Children.toArray(r),
				u = c.find(ee);
			if (u) {
				const d = u.props.children,
					p = c.map((v) =>
						v === u
							? s.Children.count(d) > 1
								? s.Children.only(null)
								: s.isValidElement(d)
									? d.props.children
									: null
							: v,
					);
				return i.jsx(o, {
					...l,
					ref: t,
					children: s.isValidElement(d) ? s.cloneElement(d, void 0, p) : null,
				});
			}
			return i.jsx(o, { ...l, ref: t, children: r });
		});
	return (a.displayName = `${e}.Slot`), a;
}
function Q(e) {
	const o = s.forwardRef((a, n) => {
		const { children: t, ...r } = a,
			l = s.isValidElement(t) ? oe(t) : void 0,
			c = x(l, n);
		if (s.isValidElement(t)) {
			const u = te(r, t.props);
			return t.type !== s.Fragment && (u.ref = c), s.cloneElement(t, u);
		}
		return s.Children.count(t) > 1 ? s.Children.only(null) : null;
	});
	return (o.displayName = `${e}.SlotClone`), o;
}
var X = Symbol("radix.slottable");
function ee(e) {
	return (
		s.isValidElement(e) &&
		typeof e.type == "function" &&
		"__radixId" in e.type &&
		e.type.__radixId === X
	);
}
function te(e, o) {
	const a = { ...o };
	for (const n in o) {
		const t = e[n],
			r = o[n];
		/^on[A-Z]/.test(n)
			? t && r
				? (a[n] = (...c) => {
						const u = r(...c);
						return t(...c), u;
					})
				: t && (a[n] = t)
			: n === "style"
				? (a[n] = { ...t, ...r })
				: n === "className" && (a[n] = [t, r].filter(Boolean).join(" "));
	}
	return { ...e, ...a };
}
function oe(e) {
	var n, t;
	let o =
			(n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
				? void 0
				: n.get,
		a = o && "isReactWarning" in o && o.isReactWarning;
	return a
		? e.ref
		: ((o =
				(t = Object.getOwnPropertyDescriptor(e, "ref")) == null
					? void 0
					: t.get),
			(a = o && "isReactWarning" in o && o.isReactWarning),
			a ? e.props.ref : e.props.ref || e.ref);
}
var R = "Dialog",
	[O, xe] = B(R),
	[ne, f] = O(R),
	N = (e) => {
		const {
				__scopeDialog: o,
				children: a,
				open: n,
				defaultOpen: t,
				onOpenChange: r,
				modal: l = !0,
			} = e,
			c = s.useRef(null),
			u = s.useRef(null),
			[d, p] = $({ prop: n, defaultProp: t ?? !1, onChange: r, caller: R });
		return i.jsx(ne, {
			scope: o,
			triggerRef: c,
			contentRef: u,
			contentId: y(),
			titleId: y(),
			descriptionId: y(),
			open: d,
			onOpenChange: p,
			onOpenToggle: s.useCallback(() => p((v) => !v), [p]),
			modal: l,
			children: a,
		});
	};
N.displayName = R;
var I = "DialogTrigger",
	b = s.forwardRef((e, o) => {
		const { __scopeDialog: a, ...n } = e,
			t = f(I, a),
			r = x(o, t.triggerRef);
		return i.jsx(D.button, {
			type: "button",
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			"aria-controls": t.contentId,
			"data-state": P(t.open),
			...n,
			ref: r,
			onClick: m(e.onClick, t.onOpenToggle),
		});
	});
b.displayName = I;
var h = "DialogPortal",
	[re, j] = O(h, { forceMount: void 0 }),
	A = (e) => {
		const { __scopeDialog: o, forceMount: a, children: n, container: t } = e,
			r = f(h, o);
		return i.jsx(re, {
			scope: o,
			forceMount: a,
			children: s.Children.map(n, (l) =>
				i.jsx(E, {
					present: a || r.open,
					children: i.jsx(Z, { asChild: !0, container: t, children: l }),
				}),
			),
		});
	};
A.displayName = h;
var C = "DialogOverlay",
	T = s.forwardRef((e, o) => {
		const a = j(C, e.__scopeDialog),
			{ forceMount: n = a.forceMount, ...t } = e,
			r = f(C, e.__scopeDialog);
		return r.modal
			? i.jsx(E, {
					present: n || r.open,
					children: i.jsx(se, { ...t, ref: o }),
				})
			: null;
	});
T.displayName = C;
var ae = J("DialogOverlay.RemoveScroll"),
	se = s.forwardRef((e, o) => {
		const { __scopeDialog: a, ...n } = e,
			t = f(C, a);
		return i.jsx(q, {
			as: ae,
			allowPinchZoom: !0,
			shards: [t.contentRef],
			children: i.jsx(D.div, {
				"data-state": P(t.open),
				...n,
				ref: o,
				style: { pointerEvents: "auto", ...n.style },
			}),
		});
	}),
	g = "DialogContent",
	S = s.forwardRef((e, o) => {
		const a = j(g, e.__scopeDialog),
			{ forceMount: n = a.forceMount, ...t } = e,
			r = f(g, e.__scopeDialog);
		return i.jsx(E, {
			present: n || r.open,
			children: r.modal
				? i.jsx(ie, { ...t, ref: o })
				: i.jsx(le, { ...t, ref: o }),
		});
	});
S.displayName = g;
var ie = s.forwardRef((e, o) => {
		const a = f(g, e.__scopeDialog),
			n = s.useRef(null),
			t = x(o, a.contentRef, n);
		return (
			s.useEffect(() => {
				const r = n.current;
				if (r) return K(r);
			}, []),
			i.jsx(w, {
				...e,
				ref: t,
				trapFocus: a.open,
				disableOutsidePointerEvents: !0,
				onCloseAutoFocus: m(e.onCloseAutoFocus, (r) => {
					var l;
					r.preventDefault(), (l = a.triggerRef.current) == null || l.focus();
				}),
				onPointerDownOutside: m(e.onPointerDownOutside, (r) => {
					const l = r.detail.originalEvent,
						c = l.button === 0 && l.ctrlKey === !0;
					(l.button === 2 || c) && r.preventDefault();
				}),
				onFocusOutside: m(e.onFocusOutside, (r) => r.preventDefault()),
			})
		);
	}),
	le = s.forwardRef((e, o) => {
		const a = f(g, e.__scopeDialog),
			n = s.useRef(!1),
			t = s.useRef(!1);
		return i.jsx(w, {
			...e,
			ref: o,
			trapFocus: !1,
			disableOutsidePointerEvents: !1,
			onCloseAutoFocus: (r) => {
				var l, c;
				(l = e.onCloseAutoFocus) == null || l.call(e, r),
					r.defaultPrevented ||
						(n.current || (c = a.triggerRef.current) == null || c.focus(),
						r.preventDefault()),
					(n.current = !1),
					(t.current = !1);
			},
			onInteractOutside: (r) => {
				var u, d;
				(u = e.onInteractOutside) == null || u.call(e, r),
					r.defaultPrevented ||
						((n.current = !0),
						r.detail.originalEvent.type === "pointerdown" && (t.current = !0));
				const l = r.target;
				((d = a.triggerRef.current) == null ? void 0 : d.contains(l)) &&
					r.preventDefault(),
					r.detail.originalEvent.type === "focusin" &&
						t.current &&
						r.preventDefault();
			},
		});
	}),
	w = s.forwardRef((e, o) => {
		const {
				__scopeDialog: a,
				trapFocus: n,
				onOpenAutoFocus: t,
				onCloseAutoFocus: r,
				...l
			} = e,
			c = f(g, a),
			u = s.useRef(null),
			d = x(o, u);
		return (
			U(),
			i.jsxs(i.Fragment, {
				children: [
					i.jsx(Y, {
						asChild: !0,
						loop: !0,
						trapped: n,
						onMountAutoFocus: t,
						onUnmountAutoFocus: r,
						children: i.jsx(z, {
							role: "dialog",
							id: c.contentId,
							"aria-describedby": c.descriptionId,
							"aria-labelledby": c.titleId,
							"data-state": P(c.open),
							...l,
							ref: d,
							onDismiss: () => c.onOpenChange(!1),
						}),
					}),
					i.jsxs(i.Fragment, {
						children: [
							i.jsx(ce, { titleId: c.titleId }),
							i.jsx(de, { contentRef: u, descriptionId: c.descriptionId }),
						],
					}),
				],
			})
		);
	}),
	_ = "DialogTitle",
	M = s.forwardRef((e, o) => {
		const { __scopeDialog: a, ...n } = e,
			t = f(_, a);
		return i.jsx(D.h2, { id: t.titleId, ...n, ref: o });
	});
M.displayName = _;
var F = "DialogDescription",
	W = s.forwardRef((e, o) => {
		const { __scopeDialog: a, ...n } = e,
			t = f(F, a);
		return i.jsx(D.p, { id: t.descriptionId, ...n, ref: o });
	});
W.displayName = F;
var L = "DialogClose",
	V = s.forwardRef((e, o) => {
		const { __scopeDialog: a, ...n } = e,
			t = f(L, a);
		return i.jsx(D.button, {
			type: "button",
			...n,
			ref: o,
			onClick: m(e.onClick, () => t.onOpenChange(!1)),
		});
	});
V.displayName = L;
function P(e) {
	return e ? "open" : "closed";
}
var k = "DialogTitleWarning",
	[Re, G] = H(k, { contentName: g, titleName: _, docsSlug: "dialog" }),
	ce = ({ titleId: e }) => {
		const o = G(k),
			a = `\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;
		return (
			s.useEffect(() => {
				e && (document.getElementById(e) || console.error(a));
			}, [a, e]),
			null
		);
	},
	ue = "DialogDescriptionWarning",
	de = ({ contentRef: e, descriptionId: o }) => {
		const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${G(ue).contentName}}.`;
		return (
			s.useEffect(() => {
				var r;
				const t =
					(r = e.current) == null ? void 0 : r.getAttribute("aria-describedby");
				o && t && (document.getElementById(o) || console.warn(n));
			}, [n, e, o]),
			null
		);
	},
	ye = N,
	Ee = b,
	he = A,
	_e = T,
	Pe = S,
	Oe = M,
	Ne = W,
	Ie = V;
export {
	Pe as C,
	Ne as D,
	_e as O,
	he as P,
	ye as R,
	Oe as T,
	Re as W,
	Ie as a,
	Ee as b,
	xe as c,
};
