import { P as y } from "./index-BRam3N1Z.js";
import { P as _ } from "./index-Bv1xjdPd.js";
import { c as A, A as E, C as J, a as Q, R as q } from "./index-CDAriSY_.js";
import {
	u as B,
	R as G,
	F as K,
	P as W,
	D as Z,
	h as z,
} from "./index-CnLXGm6V.js";
import { u as U } from "./index-CvBT1pZ2.js";
import { c as L } from "./index-DauBq6FI.js";
import { u as H, c as g } from "./index-Dqr9Wf5M.js";
import { l as $, H as R, c as V, r as a, j as l } from "./index-kb-Ylywn.js";
function X(o) {
	const n = Y(o),
		e = a.forwardRef((r, t) => {
			const { children: s, ...i } = r,
				c = a.Children.toArray(s),
				p = c.find(oe);
			if (p) {
				const u = p.props.children,
					d = c.map((v) =>
						v === p
							? a.Children.count(u) > 1
								? a.Children.only(null)
								: a.isValidElement(u)
									? u.props.children
									: null
							: v,
					);
				return l.jsx(n, {
					...i,
					ref: t,
					children: a.isValidElement(u) ? a.cloneElement(u, void 0, d) : null,
				});
			}
			return l.jsx(n, { ...i, ref: t, children: s });
		});
	return (e.displayName = `${o}.Slot`), e;
}
function Y(o) {
	const n = a.forwardRef((e, r) => {
		const { children: t, ...s } = e,
			i = a.isValidElement(t) ? re(t) : void 0,
			c = R(i, r);
		if (a.isValidElement(t)) {
			const p = te(s, t.props);
			return t.type !== a.Fragment && (p.ref = c), a.cloneElement(t, p);
		}
		return a.Children.count(t) > 1 ? a.Children.only(null) : null;
	});
	return (n.displayName = `${o}.SlotClone`), n;
}
var ee = Symbol("radix.slottable");
function oe(o) {
	return (
		a.isValidElement(o) &&
		typeof o.type == "function" &&
		"__radixId" in o.type &&
		o.type.__radixId === ee
	);
}
function te(o, n) {
	const e = { ...n };
	for (const r in n) {
		const t = o[r],
			s = n[r];
		/^on[A-Z]/.test(r)
			? t && s
				? (e[r] = (...c) => {
						const p = s(...c);
						return t(...c), p;
					})
				: t && (e[r] = t)
			: r === "style"
				? (e[r] = { ...t, ...s })
				: r === "className" && (e[r] = [t, s].filter(Boolean).join(" "));
	}
	return { ...o, ...e };
}
function re(o) {
	var r, t;
	let n =
			(r = Object.getOwnPropertyDescriptor(o.props, "ref")) == null
				? void 0
				: r.get,
		e = n && "isReactWarning" in n && n.isReactWarning;
	return e
		? o.ref
		: ((n =
				(t = Object.getOwnPropertyDescriptor(o, "ref")) == null
					? void 0
					: t.get),
			(e = n && "isReactWarning" in n && n.isReactWarning),
			e ? o.props.ref : o.props.ref || o.ref);
}
var C = "Popover",
	[b, _e] = L(C, [A]),
	h = A(),
	[ne, f] = b(C),
	w = (o) => {
		const {
				__scopePopover: n,
				children: e,
				open: r,
				defaultOpen: t,
				onOpenChange: s,
				modal: i = !1,
			} = o,
			c = h(n),
			p = a.useRef(null),
			[u, d] = a.useState(!1),
			[v, P] = H({ prop: r, defaultProp: t ?? !1, onChange: s, caller: C });
		return l.jsx(q, {
			...c,
			children: l.jsx(ne, {
				scope: n,
				contentId: U(),
				triggerRef: p,
				open: v,
				onOpenChange: P,
				onOpenToggle: a.useCallback(() => P((x) => !x), [P]),
				hasCustomAnchor: u,
				onCustomAnchorAdd: a.useCallback(() => d(!0), []),
				onCustomAnchorRemove: a.useCallback(() => d(!1), []),
				modal: i,
				children: e,
			}),
		});
	};
w.displayName = C;
var j = "PopoverAnchor",
	se = a.forwardRef((o, n) => {
		const { __scopePopover: e, ...r } = o,
			t = f(j, e),
			s = h(e),
			{ onCustomAnchorAdd: i, onCustomAnchorRemove: c } = t;
		return (
			a.useEffect(() => (i(), () => c()), [i, c]),
			l.jsx(E, { ...s, ...r, ref: n })
		);
	});
se.displayName = j;
var S = "PopoverTrigger",
	N = a.forwardRef((o, n) => {
		const { __scopePopover: e, ...r } = o,
			t = f(S, e),
			s = h(e),
			i = R(n, t.triggerRef),
			c = l.jsx(_.button, {
				type: "button",
				"aria-haspopup": "dialog",
				"aria-expanded": t.open,
				"aria-controls": t.contentId,
				"data-state": M(t.open),
				...r,
				ref: i,
				onClick: g(o.onClick, t.onOpenToggle),
			});
		return t.hasCustomAnchor ? c : l.jsx(E, { asChild: !0, ...s, children: c });
	});
N.displayName = S;
var O = "PopoverPortal",
	[ae, ie] = b(O, { forceMount: void 0 }),
	F = (o) => {
		const { __scopePopover: n, forceMount: e, children: r, container: t } = o,
			s = f(O, n);
		return l.jsx(ae, {
			scope: n,
			forceMount: e,
			children: l.jsx(y, {
				present: e || s.open,
				children: l.jsx(W, { asChild: !0, container: t, children: r }),
			}),
		});
	};
F.displayName = O;
var m = "PopoverContent",
	D = a.forwardRef((o, n) => {
		const e = ie(m, o.__scopePopover),
			{ forceMount: r = e.forceMount, ...t } = o,
			s = f(m, o.__scopePopover);
		return l.jsx(y, {
			present: r || s.open,
			children: s.modal
				? l.jsx(le, { ...t, ref: n })
				: l.jsx(pe, { ...t, ref: n }),
		});
	});
D.displayName = m;
var ce = X("PopoverContent.RemoveScroll"),
	le = a.forwardRef((o, n) => {
		const e = f(m, o.__scopePopover),
			r = a.useRef(null),
			t = R(n, r),
			s = a.useRef(!1);
		return (
			a.useEffect(() => {
				const i = r.current;
				if (i) return z(i);
			}, []),
			l.jsx(G, {
				as: ce,
				allowPinchZoom: !0,
				children: l.jsx(I, {
					...o,
					ref: t,
					trapFocus: e.open,
					disableOutsidePointerEvents: !0,
					onCloseAutoFocus: g(o.onCloseAutoFocus, (i) => {
						var c;
						i.preventDefault(),
							s.current || (c = e.triggerRef.current) == null || c.focus();
					}),
					onPointerDownOutside: g(
						o.onPointerDownOutside,
						(i) => {
							const c = i.detail.originalEvent,
								p = c.button === 0 && c.ctrlKey === !0,
								u = c.button === 2 || p;
							s.current = u;
						},
						{ checkForDefaultPrevented: !1 },
					),
					onFocusOutside: g(o.onFocusOutside, (i) => i.preventDefault(), {
						checkForDefaultPrevented: !1,
					}),
				}),
			})
		);
	}),
	pe = a.forwardRef((o, n) => {
		const e = f(m, o.__scopePopover),
			r = a.useRef(!1),
			t = a.useRef(!1);
		return l.jsx(I, {
			...o,
			ref: n,
			trapFocus: !1,
			disableOutsidePointerEvents: !1,
			onCloseAutoFocus: (s) => {
				var i, c;
				(i = o.onCloseAutoFocus) == null || i.call(o, s),
					s.defaultPrevented ||
						(r.current || (c = e.triggerRef.current) == null || c.focus(),
						s.preventDefault()),
					(r.current = !1),
					(t.current = !1);
			},
			onInteractOutside: (s) => {
				var p, u;
				(p = o.onInteractOutside) == null || p.call(o, s),
					s.defaultPrevented ||
						((r.current = !0),
						s.detail.originalEvent.type === "pointerdown" && (t.current = !0));
				const i = s.target;
				((u = e.triggerRef.current) == null ? void 0 : u.contains(i)) &&
					s.preventDefault(),
					s.detail.originalEvent.type === "focusin" &&
						t.current &&
						s.preventDefault();
			},
		});
	}),
	I = a.forwardRef((o, n) => {
		const {
				__scopePopover: e,
				trapFocus: r,
				onOpenAutoFocus: t,
				onCloseAutoFocus: s,
				disableOutsidePointerEvents: i,
				onEscapeKeyDown: c,
				onPointerDownOutside: p,
				onFocusOutside: u,
				onInteractOutside: d,
				...v
			} = o,
			P = f(m, e),
			x = h(e);
		return (
			B(),
			l.jsx(K, {
				asChild: !0,
				loop: !0,
				trapped: r,
				onMountAutoFocus: t,
				onUnmountAutoFocus: s,
				children: l.jsx(Z, {
					asChild: !0,
					disableOutsidePointerEvents: i,
					onInteractOutside: d,
					onEscapeKeyDown: c,
					onPointerDownOutside: p,
					onFocusOutside: u,
					onDismiss: () => P.onOpenChange(!1),
					children: l.jsx(J, {
						"data-state": M(P.open),
						role: "dialog",
						id: P.contentId,
						...x,
						...v,
						ref: n,
						style: {
							...v.style,
							"--radix-popover-content-transform-origin":
								"var(--radix-popper-transform-origin)",
							"--radix-popover-content-available-width":
								"var(--radix-popper-available-width)",
							"--radix-popover-content-available-height":
								"var(--radix-popper-available-height)",
							"--radix-popover-trigger-width":
								"var(--radix-popper-anchor-width)",
							"--radix-popover-trigger-height":
								"var(--radix-popper-anchor-height)",
						},
					}),
				}),
			})
		);
	}),
	T = "PopoverClose",
	ue = a.forwardRef((o, n) => {
		const { __scopePopover: e, ...r } = o,
			t = f(T, e);
		return l.jsx(_.button, {
			type: "button",
			...r,
			ref: n,
			onClick: g(o.onClick, () => t.onOpenChange(!1)),
		});
	});
ue.displayName = T;
var de = "PopoverArrow",
	fe = a.forwardRef((o, n) => {
		const { __scopePopover: e, ...r } = o,
			t = h(e);
		return l.jsx(Q, { ...t, ...r, ref: n });
	});
fe.displayName = de;
function M(o) {
	return o ? "open" : "closed";
}
var ve = w,
	Pe = N,
	me = F,
	k = D;
const be = ve,
	we = Pe,
	ge = a.forwardRef((o, n) => {
		const e = V.c(13);
		let r, t, s, i;
		e[0] !== o
			? (({ className: r, align: s, sideOffset: i, ...t } = o),
				(e[0] = o),
				(e[1] = r),
				(e[2] = t),
				(e[3] = s),
				(e[4] = i))
			: ((r = e[1]), (t = e[2]), (s = e[3]), (i = e[4]));
		const c = s === void 0 ? "center" : s,
			p = i === void 0 ? 4 : i;
		let u;
		e[5] !== r
			? ((u = $(
					"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					r,
				)),
				(e[5] = r),
				(e[6] = u))
			: (u = e[6]);
		let d;
		return (
			e[7] !== c || e[8] !== t || e[9] !== n || e[10] !== p || e[11] !== u
				? ((d = l.jsx(me, {
						children: l.jsx(k, {
							ref: n,
							align: c,
							sideOffset: p,
							className: u,
							...t,
						}),
					})),
					(e[7] = c),
					(e[8] = t),
					(e[9] = n),
					(e[10] = p),
					(e[11] = u),
					(e[12] = d))
				: (d = e[12]),
			d
		);
	});
ge.displayName = k.displayName;
export { we as P, ge as a, be as b };
