import { P as $ } from "./index-BRam3N1Z.js";
import { P as se } from "./index-Bv1xjdPd.js";
import { R as ae } from "./index-C6LbJ2-_.js";
import {
	c as H,
	R as ne,
	C as oe,
	a as re,
	A as te,
} from "./index-CDAriSY_.js";
import { D as Q, P as Z } from "./index-CnLXGm6V.js";
import { u as ee } from "./index-CvBT1pZ2.js";
import { c as J } from "./index-DauBq6FI.js";
import { c as C, u as W } from "./index-Dqr9Wf5M.js";
import { l as K, H as M, j as c, r as i, c as j } from "./index-kb-Ylywn.js";
var ie = Symbol("radix.slottable");
function le(o) {
	const e = ({ children: t }) => c.jsx(c.Fragment, { children: t });
	return (e.displayName = `${o}.Slottable`), (e.__radixId = ie), e;
}
var [D, Fe] = J("Tooltip", [H]),
	O = H(),
	F = "TooltipProvider",
	ce = 700,
	A = "tooltip.open",
	[ue, k] = D(F),
	G = (o) => {
		const {
				__scopeTooltip: e,
				delayDuration: t = ce,
				skipDelayDuration: r = 300,
				disableHoverableContent: n = !1,
				children: s,
			} = o,
			l = i.useRef(!0),
			p = i.useRef(!1),
			a = i.useRef(0);
		return (
			i.useEffect(() => {
				const d = a.current;
				return () => window.clearTimeout(d);
			}, []),
			c.jsx(ue, {
				scope: e,
				isOpenDelayedRef: l,
				delayDuration: t,
				onOpen: i.useCallback(() => {
					window.clearTimeout(a.current), (l.current = !1);
				}, []),
				onClose: i.useCallback(() => {
					window.clearTimeout(a.current),
						(a.current = window.setTimeout(() => (l.current = !0), r));
				}, [r]),
				isPointerInTransitRef: p,
				onPointerInTransitChange: i.useCallback((d) => {
					p.current = d;
				}, []),
				disableHoverableContent: n,
				children: s,
			})
		);
	};
G.displayName = F;
var R = "Tooltip",
	[pe, _] = D(R),
	z = (o) => {
		const {
				__scopeTooltip: e,
				children: t,
				open: r,
				defaultOpen: n,
				onOpenChange: s,
				disableHoverableContent: l,
				delayDuration: p,
			} = o,
			a = k(R, o.__scopeTooltip),
			d = O(e),
			[u, x] = i.useState(null),
			v = ee(),
			f = i.useRef(0),
			m = l ?? a.disableHoverableContent,
			T = p ?? a.delayDuration,
			h = i.useRef(!1),
			[g, y] = W({
				prop: r,
				defaultProp: n ?? !1,
				onChange: (S) => {
					S
						? (a.onOpen(), document.dispatchEvent(new CustomEvent(A)))
						: a.onClose(),
						s == null || s(S);
				},
				caller: R,
			}),
			w = i.useMemo(
				() => (g ? (h.current ? "delayed-open" : "instant-open") : "closed"),
				[g],
			),
			E = i.useCallback(() => {
				window.clearTimeout(f.current),
					(f.current = 0),
					(h.current = !1),
					y(!0);
			}, [y]),
			P = i.useCallback(() => {
				window.clearTimeout(f.current), (f.current = 0), y(!1);
			}, [y]),
			N = i.useCallback(() => {
				window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						(h.current = !0), y(!0), (f.current = 0);
					}, T));
			}, [T, y]);
		return (
			i.useEffect(
				() => () => {
					f.current && (window.clearTimeout(f.current), (f.current = 0));
				},
				[],
			),
			c.jsx(ne, {
				...d,
				children: c.jsx(pe, {
					scope: e,
					contentId: v,
					open: g,
					stateAttribute: w,
					trigger: u,
					onTriggerChange: x,
					onTriggerEnter: i.useCallback(() => {
						a.isOpenDelayedRef.current ? N() : E();
					}, [a.isOpenDelayedRef, N, E]),
					onTriggerLeave: i.useCallback(() => {
						m ? P() : (window.clearTimeout(f.current), (f.current = 0));
					}, [P, m]),
					onOpen: E,
					onClose: P,
					disableHoverableContent: m,
					children: t,
				}),
			})
		);
	};
z.displayName = R;
var L = "TooltipTrigger",
	B = i.forwardRef((o, e) => {
		const { __scopeTooltip: t, ...r } = o,
			n = _(L, t),
			s = k(L, t),
			l = O(t),
			p = i.useRef(null),
			a = M(e, p, n.onTriggerChange),
			d = i.useRef(!1),
			u = i.useRef(!1),
			x = i.useCallback(() => (d.current = !1), []);
		return (
			i.useEffect(
				() => () => document.removeEventListener("pointerup", x),
				[x],
			),
			c.jsx(te, {
				asChild: !0,
				...l,
				children: c.jsx(se.button, {
					"aria-describedby": n.open ? n.contentId : void 0,
					"data-state": n.stateAttribute,
					...r,
					ref: a,
					onPointerMove: C(o.onPointerMove, (v) => {
						v.pointerType !== "touch" &&
							!u.current &&
							!s.isPointerInTransitRef.current &&
							(n.onTriggerEnter(), (u.current = !0));
					}),
					onPointerLeave: C(o.onPointerLeave, () => {
						n.onTriggerLeave(), (u.current = !1);
					}),
					onPointerDown: C(o.onPointerDown, () => {
						n.open && n.onClose(),
							(d.current = !0),
							document.addEventListener("pointerup", x, { once: !0 });
					}),
					onFocus: C(o.onFocus, () => {
						d.current || n.onOpen();
					}),
					onBlur: C(o.onBlur, n.onClose),
					onClick: C(o.onClick, n.onClose),
				}),
			})
		);
	});
B.displayName = L;
var I = "TooltipPortal",
	[de, fe] = D(I, { forceMount: void 0 }),
	U = (o) => {
		const { __scopeTooltip: e, forceMount: t, children: r, container: n } = o,
			s = _(I, e);
		return c.jsx(de, {
			scope: e,
			forceMount: t,
			children: c.jsx($, {
				present: t || s.open,
				children: c.jsx(Z, { asChild: !0, container: n, children: r }),
			}),
		});
	};
U.displayName = I;
var b = "TooltipContent",
	V = i.forwardRef((o, e) => {
		const t = fe(b, o.__scopeTooltip),
			{ forceMount: r = t.forceMount, side: n = "top", ...s } = o,
			l = _(b, o.__scopeTooltip);
		return c.jsx($, {
			present: r || l.open,
			children: l.disableHoverableContent
				? c.jsx(Y, { side: n, ...s, ref: e })
				: c.jsx(xe, { side: n, ...s, ref: e }),
		});
	}),
	xe = i.forwardRef((o, e) => {
		const t = _(b, o.__scopeTooltip),
			r = k(b, o.__scopeTooltip),
			n = i.useRef(null),
			s = M(e, n),
			[l, p] = i.useState(null),
			{ trigger: a, onClose: d } = t,
			u = n.current,
			{ onPointerInTransitChange: x } = r,
			v = i.useCallback(() => {
				p(null), x(!1);
			}, [x]),
			f = i.useCallback(
				(m, T) => {
					const h = m.currentTarget,
						g = { x: m.clientX, y: m.clientY },
						y = Te(g, h.getBoundingClientRect()),
						w = ye(g, y),
						E = ge(T.getBoundingClientRect()),
						P = be([...w, ...E]);
					p(P), x(!0);
				},
				[x],
			);
		return (
			i.useEffect(() => () => v(), [v]),
			i.useEffect(() => {
				if (a && u) {
					const m = (h) => f(h, u),
						T = (h) => f(h, a);
					return (
						a.addEventListener("pointerleave", m),
						u.addEventListener("pointerleave", T),
						() => {
							a.removeEventListener("pointerleave", m),
								u.removeEventListener("pointerleave", T);
						}
					);
				}
			}, [a, u, f, v]),
			i.useEffect(() => {
				if (l) {
					const m = (T) => {
						const h = T.target,
							g = { x: T.clientX, y: T.clientY },
							y =
								(a == null ? void 0 : a.contains(h)) ||
								(u == null ? void 0 : u.contains(h)),
							w = !Ce(g, l);
						y ? v() : w && (v(), d());
					};
					return (
						document.addEventListener("pointermove", m),
						() => document.removeEventListener("pointermove", m)
					);
				}
			}, [a, u, l, d, v]),
			c.jsx(Y, { ...o, ref: s })
		);
	}),
	[ve, me] = D(R, { isInside: !1 }),
	he = le("TooltipContent"),
	Y = i.forwardRef((o, e) => {
		const {
				__scopeTooltip: t,
				children: r,
				"aria-label": n,
				onEscapeKeyDown: s,
				onPointerDownOutside: l,
				...p
			} = o,
			a = _(b, t),
			d = O(t),
			{ onClose: u } = a;
		return (
			i.useEffect(
				() => (
					document.addEventListener(A, u),
					() => document.removeEventListener(A, u)
				),
				[u],
			),
			i.useEffect(() => {
				if (a.trigger) {
					const x = (v) => {
						const f = v.target;
						f != null && f.contains(a.trigger) && u();
					};
					return (
						window.addEventListener("scroll", x, { capture: !0 }),
						() => window.removeEventListener("scroll", x, { capture: !0 })
					);
				}
			}, [a.trigger, u]),
			c.jsx(Q, {
				asChild: !0,
				disableOutsidePointerEvents: !1,
				onEscapeKeyDown: s,
				onPointerDownOutside: l,
				onFocusOutside: (x) => x.preventDefault(),
				onDismiss: u,
				children: c.jsxs(oe, {
					"data-state": a.stateAttribute,
					...d,
					...p,
					ref: e,
					style: {
						...p.style,
						"--radix-tooltip-content-transform-origin":
							"var(--radix-popper-transform-origin)",
						"--radix-tooltip-content-available-width":
							"var(--radix-popper-available-width)",
						"--radix-tooltip-content-available-height":
							"var(--radix-popper-available-height)",
						"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
						"--radix-tooltip-trigger-height":
							"var(--radix-popper-anchor-height)",
					},
					children: [
						c.jsx(he, { children: r }),
						c.jsx(ve, {
							scope: t,
							isInside: !0,
							children: c.jsx(ae, {
								id: a.contentId,
								role: "tooltip",
								children: n || r,
							}),
						}),
					],
				}),
			})
		);
	});
V.displayName = b;
var q = "TooltipArrow",
	X = i.forwardRef((o, e) => {
		const { __scopeTooltip: t, ...r } = o,
			n = O(t);
		return me(q, t).isInside ? null : c.jsx(re, { ...n, ...r, ref: e });
	});
X.displayName = q;
function Te(o, e) {
	const t = Math.abs(e.top - o.y),
		r = Math.abs(e.bottom - o.y),
		n = Math.abs(e.right - o.x),
		s = Math.abs(e.left - o.x);
	switch (Math.min(t, r, n, s)) {
		case s:
			return "left";
		case n:
			return "right";
		case t:
			return "top";
		case r:
			return "bottom";
		default:
			throw new Error("unreachable");
	}
}
function ye(o, e, t = 5) {
	const r = [];
	switch (e) {
		case "top":
			r.push({ x: o.x - t, y: o.y + t }, { x: o.x + t, y: o.y + t });
			break;
		case "bottom":
			r.push({ x: o.x - t, y: o.y - t }, { x: o.x + t, y: o.y - t });
			break;
		case "left":
			r.push({ x: o.x + t, y: o.y - t }, { x: o.x + t, y: o.y + t });
			break;
		case "right":
			r.push({ x: o.x - t, y: o.y - t }, { x: o.x - t, y: o.y + t });
			break;
	}
	return r;
}
function ge(o) {
	const { top: e, right: t, bottom: r, left: n } = o;
	return [
		{ x: n, y: e },
		{ x: t, y: e },
		{ x: t, y: r },
		{ x: n, y: r },
	];
}
function Ce(o, e) {
	const { x: t, y: r } = o;
	let n = !1;
	for (let s = 0, l = e.length - 1; s < e.length; l = s++) {
		const p = e[s],
			a = e[l],
			d = p.x,
			u = p.y,
			x = a.x,
			v = a.y;
		u > r != v > r && t < ((x - d) * (r - u)) / (v - u) + d && (n = !n);
	}
	return n;
}
function be(o) {
	const e = o.slice();
	return (
		e.sort((t, r) =>
			t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0,
		),
		we(e)
	);
}
function we(o) {
	if (o.length <= 1) return o.slice();
	const e = [];
	for (let r = 0; r < o.length; r++) {
		const n = o[r];
		while (e.length >= 2) {
			const s = e[e.length - 1],
				l = e[e.length - 2];
			if ((s.x - l.x) * (n.y - l.y) >= (s.y - l.y) * (n.x - l.x)) e.pop();
			else break;
		}
		e.push(n);
	}
	e.pop();
	const t = [];
	for (let r = o.length - 1; r >= 0; r--) {
		const n = o[r];
		while (t.length >= 2) {
			const s = t[t.length - 1],
				l = t[t.length - 2];
			if ((s.x - l.x) * (n.y - l.y) >= (s.y - l.y) * (n.x - l.x)) t.pop();
			else break;
		}
		t.push(n);
	}
	return (
		t.pop(),
		e.length === 1 && t.length === 1 && e[0].x === t[0].x && e[0].y === t[0].y
			? e
			: e.concat(t)
	);
}
var Ee = G,
	Pe = z,
	Re = B,
	_e = U,
	je = V,
	De = X;
function Oe(o) {
	const e = j.c(6);
	let t, r;
	e[0] !== o
		? (({ delayDuration: r, ...t } = o), (e[0] = o), (e[1] = t), (e[2] = r))
		: ((t = e[1]), (r = e[2]));
	const n = r === void 0 ? 0 : r;
	let s;
	return (
		e[3] !== n || e[4] !== t
			? ((s = c.jsx(Ee, {
					"data-slot": "tooltip-provider",
					delayDuration: n,
					...t,
				})),
				(e[3] = n),
				(e[4] = t),
				(e[5] = s))
			: (s = e[5]),
		s
	);
}
function Ge(o) {
	const e = j.c(4);
	let t;
	e[0] !== o ? (({ ...t } = o), (e[0] = o), (e[1] = t)) : (t = e[1]);
	let r;
	return (
		e[2] !== t
			? ((r = c.jsx(Oe, {
					children: c.jsx(Pe, { "data-slot": "tooltip", ...t }),
				})),
				(e[2] = t),
				(e[3] = r))
			: (r = e[3]),
		r
	);
}
function ze(o) {
	const e = j.c(4);
	let t;
	e[0] !== o ? (({ ...t } = o), (e[0] = o), (e[1] = t)) : (t = e[1]);
	let r;
	return (
		e[2] !== t
			? ((r = c.jsx(Re, { "data-slot": "tooltip-trigger", ...t })),
				(e[2] = t),
				(e[3] = r))
			: (r = e[3]),
		r
	);
}
function Be(o) {
	const e = j.c(13);
	let t, r, n, s;
	e[0] !== o
		? (({ className: r, sideOffset: s, children: t, ...n } = o),
			(e[0] = o),
			(e[1] = t),
			(e[2] = r),
			(e[3] = n),
			(e[4] = s))
		: ((t = e[1]), (r = e[2]), (n = e[3]), (s = e[4]));
	const l = s === void 0 ? 0 : s;
	let p;
	e[5] !== r
		? ((p = K(
				"bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
				r,
			)),
			(e[5] = r),
			(e[6] = p))
		: (p = e[6]);
	let a;
	e[7] === Symbol.for("react.memo_cache_sentinel")
		? ((a = c.jsx(De, {
				className:
					"bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
			})),
			(e[7] = a))
		: (a = e[7]);
	let d;
	return (
		e[8] !== t || e[9] !== n || e[10] !== l || e[11] !== p
			? ((d = c.jsx(_e, {
					children: c.jsxs(je, {
						"data-slot": "tooltip-content",
						sideOffset: l,
						className: p,
						...n,
						children: [t, a],
					}),
				})),
				(e[8] = t),
				(e[9] = n),
				(e[10] = l),
				(e[11] = p),
				(e[12] = d))
			: (d = e[12]),
		d
	);
}
export { Oe as T, Be as a, ze as b, Ge as c };
