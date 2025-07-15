import { C as _e } from "./chevron-down-CMzABl4R.js";
import { C as jt } from "./chevron-up-DyH28r2x.js";
import { c as ht, u as mt } from "./index-3Axhna2x.js";
import { P as j } from "./index-Bv1xjdPd.js";
import { V as _t } from "./index-C6LbJ2-_.js";
import {
	c as Ee,
	R as It,
	C as Nt,
	a as Tt,
	A as bt,
} from "./index-CDAriSY_.js";
import {
	D as Ct,
	h as St,
	P as vt,
	R as wt,
	u as xt,
	F as yt,
} from "./index-CnLXGm6V.js";
import { u as be } from "./index-CvBT1pZ2.js";
import { u as G, c as gt } from "./index-DauBq6FI.js";
import { u as Rt } from "./index-Dl_6cIao.js";
import { c as R, u as Te } from "./index-Dqr9Wf5M.js";
import {
	H as D,
	U as Pe,
	j as d,
	r as i,
	c as te,
	l as z,
} from "./index-kb-Ylywn.js";
import { C as Et, u as Pt } from "./index-mnH6Jux_.js";
function Re(n, [l, e]) {
	return Math.min(e, Math.max(l, n));
}
function Mt(n) {
	const l = At(n),
		e = i.forwardRef((o, t) => {
			const { children: s, ...r } = o,
				a = i.Children.toArray(s),
				c = a.find(Dt);
			if (c) {
				const p = c.props.children,
					g = a.map((S) =>
						S === c
							? i.Children.count(p) > 1
								? i.Children.only(null)
								: i.isValidElement(p)
									? p.props.children
									: null
							: S,
					);
				return d.jsx(l, {
					...r,
					ref: t,
					children: i.isValidElement(p) ? i.cloneElement(p, void 0, g) : null,
				});
			}
			return d.jsx(l, { ...r, ref: t, children: s });
		});
	return (e.displayName = `${n}.Slot`), e;
}
function At(n) {
	const l = i.forwardRef((e, o) => {
		const { children: t, ...s } = e,
			r = i.isValidElement(t) ? Vt(t) : void 0,
			a = D(r, o);
		if (i.isValidElement(t)) {
			const c = Lt(s, t.props);
			return t.type !== i.Fragment && (c.ref = a), i.cloneElement(t, c);
		}
		return i.Children.count(t) > 1 ? i.Children.only(null) : null;
	});
	return (l.displayName = `${n}.SlotClone`), l;
}
var Ot = Symbol("radix.slottable");
function Dt(n) {
	return (
		i.isValidElement(n) &&
		typeof n.type == "function" &&
		"__radixId" in n.type &&
		n.type.__radixId === Ot
	);
}
function Lt(n, l) {
	const e = { ...l };
	for (const o in l) {
		const t = n[o],
			s = l[o];
		/^on[A-Z]/.test(o)
			? t && s
				? (e[o] = (...a) => {
						const c = s(...a);
						return t(...a), c;
					})
				: t && (e[o] = t)
			: o === "style"
				? (e[o] = { ...t, ...s })
				: o === "className" && (e[o] = [t, s].filter(Boolean).join(" "));
	}
	return { ...n, ...e };
}
function Vt(n) {
	var o, t;
	let l =
			(o = Object.getOwnPropertyDescriptor(n.props, "ref")) == null
				? void 0
				: o.get,
		e = l && "isReactWarning" in l && l.isReactWarning;
	return e
		? n.ref
		: ((l =
				(t = Object.getOwnPropertyDescriptor(n, "ref")) == null
					? void 0
					: t.get),
			(e = l && "isReactWarning" in l && l.isReactWarning),
			e ? n.props.ref : n.props.ref || n.ref);
}
var kt = [" ", "Enter", "ArrowUp", "ArrowDown"],
	Bt = [" ", "Enter"],
	Q = "Select",
	[de, pe, Ht] = ht(Q),
	[ne, jo] = gt(Q, [Ht, Ee]),
	ue = Ee(),
	[Wt, Y] = ne(Q),
	[Ft, Ut] = ne(Q),
	je = (n) => {
		const {
				__scopeSelect: l,
				children: e,
				open: o,
				defaultOpen: t,
				onOpenChange: s,
				value: r,
				defaultValue: a,
				onValueChange: c,
				dir: p,
				name: g,
				autoComplete: S,
				disabled: x,
				required: w,
				form: y,
			} = n,
			u = ue(l),
			[v, b] = i.useState(null),
			[f, h] = i.useState(null),
			[M, A] = i.useState(!1),
			re = mt(p),
			[P, L] = Te({ prop: o, defaultProp: t ?? !1, onChange: s, caller: Q }),
			[U, Z] = Te({ prop: r, defaultProp: a, onChange: c, caller: Q }),
			k = i.useRef(null),
			B = v ? y || !!v.closest("form") : !0,
			[$, H] = i.useState(new Set()),
			W = Array.from($)
				.map((E) => E.props.value)
				.join(";");
		return d.jsx(It, {
			...u,
			children: d.jsxs(Wt, {
				required: w,
				scope: l,
				trigger: v,
				onTriggerChange: b,
				valueNode: f,
				onValueNodeChange: h,
				valueNodeHasChildren: M,
				onValueNodeHasChildrenChange: A,
				contentId: be(),
				value: U,
				onValueChange: Z,
				open: P,
				onOpenChange: L,
				dir: re,
				triggerPointerDownPosRef: k,
				disabled: x,
				children: [
					d.jsx(de.Provider, {
						scope: l,
						children: d.jsx(Ft, {
							scope: n.__scopeSelect,
							onNativeOptionAdd: i.useCallback((E) => {
								H((V) => new Set(V).add(E));
							}, []),
							onNativeOptionRemove: i.useCallback((E) => {
								H((V) => {
									const F = new Set(V);
									return F.delete(E), F;
								});
							}, []),
							children: e,
						}),
					}),
					B
						? d.jsxs(
								tt,
								{
									"aria-hidden": !0,
									required: w,
									tabIndex: -1,
									name: g,
									autoComplete: S,
									value: U,
									onChange: (E) => Z(E.target.value),
									disabled: x,
									form: y,
									children: [
										U === void 0 ? d.jsx("option", { value: "" }) : null,
										Array.from($),
									],
								},
								W,
							)
						: null,
				],
			}),
		});
	};
je.displayName = Q;
var Me = "SelectTrigger",
	Ae = i.forwardRef((n, l) => {
		const { __scopeSelect: e, disabled: o = !1, ...t } = n,
			s = ue(e),
			r = Y(Me, e),
			a = r.disabled || o,
			c = D(l, r.onTriggerChange),
			p = pe(e),
			g = i.useRef("touch"),
			[S, x, w] = nt((u) => {
				const v = p().filter((h) => !h.disabled),
					b = v.find((h) => h.value === r.value),
					f = rt(v, u, b);
				f !== void 0 && r.onValueChange(f.value);
			}),
			y = (u) => {
				a || (r.onOpenChange(!0), w()),
					u &&
						(r.triggerPointerDownPosRef.current = {
							x: Math.round(u.pageX),
							y: Math.round(u.pageY),
						});
			};
		return d.jsx(bt, {
			asChild: !0,
			...s,
			children: d.jsx(j.button, {
				type: "button",
				role: "combobox",
				"aria-controls": r.contentId,
				"aria-expanded": r.open,
				"aria-required": r.required,
				"aria-autocomplete": "none",
				dir: r.dir,
				"data-state": r.open ? "open" : "closed",
				disabled: a,
				"data-disabled": a ? "" : void 0,
				"data-placeholder": ot(r.value) ? "" : void 0,
				...t,
				ref: c,
				onClick: R(t.onClick, (u) => {
					u.currentTarget.focus(), g.current !== "mouse" && y(u);
				}),
				onPointerDown: R(t.onPointerDown, (u) => {
					g.current = u.pointerType;
					const v = u.target;
					v.hasPointerCapture(u.pointerId) &&
						v.releasePointerCapture(u.pointerId),
						u.button === 0 &&
							u.ctrlKey === !1 &&
							u.pointerType === "mouse" &&
							(y(u), u.preventDefault());
				}),
				onKeyDown: R(t.onKeyDown, (u) => {
					const v = S.current !== "";
					!(u.ctrlKey || u.altKey || u.metaKey) &&
						u.key.length === 1 &&
						x(u.key),
						!(v && u.key === " ") &&
							kt.includes(u.key) &&
							(y(), u.preventDefault());
				}),
			}),
		});
	});
Ae.displayName = Me;
var Oe = "SelectValue",
	De = i.forwardRef((n, l) => {
		const {
				__scopeSelect: e,
				className: o,
				style: t,
				children: s,
				placeholder: r = "",
				...a
			} = n,
			c = Y(Oe, e),
			{ onValueNodeHasChildrenChange: p } = c,
			g = s !== void 0,
			S = D(l, c.onValueNodeChange);
		return (
			G(() => {
				p(g);
			}, [p, g]),
			d.jsx(j.span, {
				...a,
				ref: S,
				style: { pointerEvents: "none" },
				children: ot(c.value) ? d.jsx(d.Fragment, { children: r }) : s,
			})
		);
	});
De.displayName = Oe;
var $t = "SelectIcon",
	Le = i.forwardRef((n, l) => {
		const { __scopeSelect: e, children: o, ...t } = n;
		return d.jsx(j.span, {
			"aria-hidden": !0,
			...t,
			ref: l,
			children: o || "▼",
		});
	});
Le.displayName = $t;
var Kt = "SelectPortal",
	Ve = (n) => d.jsx(vt, { asChild: !0, ...n });
Ve.displayName = Kt;
var ee = "SelectContent",
	ke = i.forwardRef((n, l) => {
		const e = Y(ee, n.__scopeSelect),
			[o, t] = i.useState();
		if (
			(G(() => {
				t(new DocumentFragment());
			}, []),
			!e.open)
		) {
			const s = o;
			return s
				? Pe.createPortal(
						d.jsx(Be, {
							scope: n.__scopeSelect,
							children: d.jsx(de.Slot, {
								scope: n.__scopeSelect,
								children: d.jsx("div", { children: n.children }),
							}),
						}),
						s,
					)
				: null;
		}
		return d.jsx(He, { ...n, ref: l });
	});
ke.displayName = ee;
var O = 10,
	[Be, q] = ne(ee),
	zt = "SelectContentImpl",
	Gt = Mt("SelectContent.RemoveScroll"),
	He = i.forwardRef((n, l) => {
		const {
				__scopeSelect: e,
				position: o = "item-aligned",
				onCloseAutoFocus: t,
				onEscapeKeyDown: s,
				onPointerDownOutside: r,
				side: a,
				sideOffset: c,
				align: p,
				alignOffset: g,
				arrowPadding: S,
				collisionBoundary: x,
				collisionPadding: w,
				sticky: y,
				hideWhenDetached: u,
				avoidCollisions: v,
				...b
			} = n,
			f = Y(ee, e),
			[h, M] = i.useState(null),
			[A, re] = i.useState(null),
			P = D(l, (m) => M(m)),
			[L, U] = i.useState(null),
			[Z, k] = i.useState(null),
			B = pe(e),
			[$, H] = i.useState(!1),
			W = i.useRef(!1);
		i.useEffect(() => {
			if (h) return St(h);
		}, [h]),
			xt();
		const E = i.useCallback(
				(m) => {
					const [T, ..._] = B().map((I) => I.ref.current),
						[N] = _.slice(-1),
						C = document.activeElement;
					for (const I of m)
						if (
							I === C ||
							(I == null || I.scrollIntoView({ block: "nearest" }),
							I === T && A && (A.scrollTop = 0),
							I === N && A && (A.scrollTop = A.scrollHeight),
							I == null || I.focus(),
							document.activeElement !== C)
						)
							return;
				},
				[B, A],
			),
			V = i.useCallback(() => E([L, h]), [E, L, h]);
		i.useEffect(() => {
			$ && V();
		}, [$, V]);
		const { onOpenChange: F, triggerPointerDownPosRef: K } = f;
		i.useEffect(() => {
			if (h) {
				let m = { x: 0, y: 0 };
				const T = (N) => {
						var C, I;
						m = {
							x: Math.abs(
								Math.round(N.pageX) -
									(((C = K.current) == null ? void 0 : C.x) ?? 0),
							),
							y: Math.abs(
								Math.round(N.pageY) -
									(((I = K.current) == null ? void 0 : I.y) ?? 0),
							),
						};
					},
					_ = (N) => {
						m.x <= 10 && m.y <= 10
							? N.preventDefault()
							: h.contains(N.target) || F(!1),
							document.removeEventListener("pointermove", T),
							(K.current = null);
					};
				return (
					K.current !== null &&
						(document.addEventListener("pointermove", T),
						document.addEventListener("pointerup", _, {
							capture: !0,
							once: !0,
						})),
					() => {
						document.removeEventListener("pointermove", T),
							document.removeEventListener("pointerup", _, { capture: !0 });
					}
				);
			}
		}, [h, F, K]),
			i.useEffect(() => {
				const m = () => F(!1);
				return (
					window.addEventListener("blur", m),
					window.addEventListener("resize", m),
					() => {
						window.removeEventListener("blur", m),
							window.removeEventListener("resize", m);
					}
				);
			}, [F]);
		const [fe, ae] = nt((m) => {
				const T = B().filter((C) => !C.disabled),
					_ = T.find((C) => C.ref.current === document.activeElement),
					N = rt(T, m, _);
				N && setTimeout(() => N.ref.current.focus());
			}),
			me = i.useCallback(
				(m, T, _) => {
					const N = !W.current && !_;
					((f.value !== void 0 && f.value === T) || N) &&
						(U(m), N && (W.current = !0));
				},
				[f.value],
			),
			he = i.useCallback(() => (h == null ? void 0 : h.focus()), [h]),
			oe = i.useCallback(
				(m, T, _) => {
					const N = !W.current && !_;
					((f.value !== void 0 && f.value === T) || N) && k(m);
				},
				[f.value],
			),
			ie = o === "popper" ? xe : We,
			se =
				ie === xe
					? {
							side: a,
							sideOffset: c,
							align: p,
							alignOffset: g,
							arrowPadding: S,
							collisionBoundary: x,
							collisionPadding: w,
							sticky: y,
							hideWhenDetached: u,
							avoidCollisions: v,
						}
					: {};
		return d.jsx(Be, {
			scope: e,
			content: h,
			viewport: A,
			onViewportChange: re,
			itemRefCallback: me,
			selectedItem: L,
			onItemLeave: he,
			itemTextRefCallback: oe,
			focusSelectedItem: V,
			selectedItemText: Z,
			position: o,
			isPositioned: $,
			searchRef: fe,
			children: d.jsx(wt, {
				as: Gt,
				allowPinchZoom: !0,
				children: d.jsx(yt, {
					asChild: !0,
					trapped: f.open,
					onMountAutoFocus: (m) => {
						m.preventDefault();
					},
					onUnmountAutoFocus: R(t, (m) => {
						var T;
						(T = f.trigger) == null || T.focus({ preventScroll: !0 }),
							m.preventDefault();
					}),
					children: d.jsx(Ct, {
						asChild: !0,
						disableOutsidePointerEvents: !0,
						onEscapeKeyDown: s,
						onPointerDownOutside: r,
						onFocusOutside: (m) => m.preventDefault(),
						onDismiss: () => f.onOpenChange(!1),
						children: d.jsx(ie, {
							role: "listbox",
							id: f.contentId,
							"data-state": f.open ? "open" : "closed",
							dir: f.dir,
							onContextMenu: (m) => m.preventDefault(),
							...b,
							...se,
							onPlaced: () => H(!0),
							ref: P,
							style: {
								display: "flex",
								flexDirection: "column",
								outline: "none",
								...b.style,
							},
							onKeyDown: R(b.onKeyDown, (m) => {
								const T = m.ctrlKey || m.altKey || m.metaKey;
								if (
									(m.key === "Tab" && m.preventDefault(),
									!T && m.key.length === 1 && ae(m.key),
									["ArrowUp", "ArrowDown", "Home", "End"].includes(m.key))
								) {
									let N = B()
										.filter((C) => !C.disabled)
										.map((C) => C.ref.current);
									if (
										(["ArrowUp", "End"].includes(m.key) &&
											(N = N.slice().reverse()),
										["ArrowUp", "ArrowDown"].includes(m.key))
									) {
										const C = m.target,
											I = N.indexOf(C);
										N = N.slice(I + 1);
									}
									setTimeout(() => E(N)), m.preventDefault();
								}
							}),
						}),
					}),
				}),
			}),
		});
	});
He.displayName = zt;
var Yt = "SelectItemAlignedPosition",
	We = i.forwardRef((n, l) => {
		const { __scopeSelect: e, onPlaced: o, ...t } = n,
			s = Y(ee, e),
			r = q(ee, e),
			[a, c] = i.useState(null),
			[p, g] = i.useState(null),
			S = D(l, (P) => g(P)),
			x = pe(e),
			w = i.useRef(!1),
			y = i.useRef(!0),
			{
				viewport: u,
				selectedItem: v,
				selectedItemText: b,
				focusSelectedItem: f,
			} = r,
			h = i.useCallback(() => {
				if (s.trigger && s.valueNode && a && p && u && v && b) {
					const P = s.trigger.getBoundingClientRect(),
						L = p.getBoundingClientRect(),
						U = s.valueNode.getBoundingClientRect(),
						Z = b.getBoundingClientRect();
					if (s.dir !== "rtl") {
						const C = Z.left - L.left,
							I = U.left - C,
							X = P.left - I,
							J = P.width + X,
							ge = Math.max(J, L.width),
							ve = window.innerWidth - O,
							Se = Re(I, [O, Math.max(O, ve - ge)]);
						(a.style.minWidth = J + "px"), (a.style.left = Se + "px");
					} else {
						const C = L.right - Z.right,
							I = window.innerWidth - U.right - C,
							X = window.innerWidth - P.right - I,
							J = P.width + X,
							ge = Math.max(J, L.width),
							ve = window.innerWidth - O,
							Se = Re(I, [O, Math.max(O, ve - ge)]);
						(a.style.minWidth = J + "px"), (a.style.right = Se + "px");
					}
					const k = x(),
						B = window.innerHeight - O * 2,
						$ = u.scrollHeight,
						H = window.getComputedStyle(p),
						W = Number.parseInt(H.borderTopWidth, 10),
						E = Number.parseInt(H.paddingTop, 10),
						V = Number.parseInt(H.borderBottomWidth, 10),
						F = Number.parseInt(H.paddingBottom, 10),
						K = W + E + $ + F + V,
						fe = Math.min(v.offsetHeight * 5, K),
						ae = window.getComputedStyle(u),
						me = Number.parseInt(ae.paddingTop, 10),
						he = Number.parseInt(ae.paddingBottom, 10),
						oe = P.top + P.height / 2 - O,
						ie = B - oe,
						se = v.offsetHeight / 2,
						m = v.offsetTop + se,
						T = W + E + m,
						_ = K - T;
					if (T <= oe) {
						const C = k.length > 0 && v === k[k.length - 1].ref.current;
						a.style.bottom = "0px";
						const I = p.clientHeight - u.offsetTop - u.offsetHeight,
							X = Math.max(ie, se + (C ? he : 0) + I + V),
							J = T + X;
						a.style.height = J + "px";
					} else {
						const C = k.length > 0 && v === k[0].ref.current;
						a.style.top = "0px";
						const X = Math.max(oe, W + u.offsetTop + (C ? me : 0) + se) + _;
						(a.style.height = X + "px"), (u.scrollTop = T - oe + u.offsetTop);
					}
					(a.style.margin = `${O}px 0`),
						(a.style.minHeight = fe + "px"),
						(a.style.maxHeight = B + "px"),
						o == null || o(),
						requestAnimationFrame(() => (w.current = !0));
				}
			}, [x, s.trigger, s.valueNode, a, p, u, v, b, s.dir, o]);
		G(() => h(), [h]);
		const [M, A] = i.useState();
		G(() => {
			p && A(window.getComputedStyle(p).zIndex);
		}, [p]);
		const re = i.useCallback(
			(P) => {
				P && y.current === !0 && (h(), f == null || f(), (y.current = !1));
			},
			[h, f],
		);
		return d.jsx(Zt, {
			scope: e,
			contentWrapper: a,
			shouldExpandOnScrollRef: w,
			onScrollButtonChange: re,
			children: d.jsx("div", {
				ref: c,
				style: {
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					zIndex: M,
				},
				children: d.jsx(j.div, {
					...t,
					ref: S,
					style: { boxSizing: "border-box", maxHeight: "100%", ...t.style },
				}),
			}),
		});
	});
We.displayName = Yt;
var qt = "SelectPopperPosition",
	xe = i.forwardRef((n, l) => {
		const {
				__scopeSelect: e,
				align: o = "start",
				collisionPadding: t = O,
				...s
			} = n,
			r = ue(e);
		return d.jsx(Nt, {
			...r,
			...s,
			ref: l,
			align: o,
			collisionPadding: t,
			style: {
				boxSizing: "border-box",
				...s.style,
				"--radix-select-content-transform-origin":
					"var(--radix-popper-transform-origin)",
				"--radix-select-content-available-width":
					"var(--radix-popper-available-width)",
				"--radix-select-content-available-height":
					"var(--radix-popper-available-height)",
				"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
			},
		});
	});
xe.displayName = qt;
var [Zt, Ne] = ne(ee, {}),
	we = "SelectViewport",
	Fe = i.forwardRef((n, l) => {
		const { __scopeSelect: e, nonce: o, ...t } = n,
			s = q(we, e),
			r = Ne(we, e),
			a = D(l, s.onViewportChange),
			c = i.useRef(0);
		return d.jsxs(d.Fragment, {
			children: [
				d.jsx("style", {
					dangerouslySetInnerHTML: {
						__html:
							"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
					},
					nonce: o,
				}),
				d.jsx(de.Slot, {
					scope: e,
					children: d.jsx(j.div, {
						"data-radix-select-viewport": "",
						role: "presentation",
						...t,
						ref: a,
						style: {
							position: "relative",
							flex: 1,
							overflow: "hidden auto",
							...t.style,
						},
						onScroll: R(t.onScroll, (p) => {
							const g = p.currentTarget,
								{ contentWrapper: S, shouldExpandOnScrollRef: x } = r;
							if (x != null && x.current && S) {
								const w = Math.abs(c.current - g.scrollTop);
								if (w > 0) {
									const y = window.innerHeight - O * 2,
										u = Number.parseFloat(S.style.minHeight),
										v = Number.parseFloat(S.style.height),
										b = Math.max(u, v);
									if (b < y) {
										const f = b + w,
											h = Math.min(y, f),
											M = f - h;
										(S.style.height = h + "px"),
											S.style.bottom === "0px" &&
												((g.scrollTop = M > 0 ? M : 0),
												(S.style.justifyContent = "flex-end"));
									}
								}
							}
							c.current = g.scrollTop;
						}),
					}),
				}),
			],
		});
	});
Fe.displayName = we;
var Ue = "SelectGroup",
	[Xt, Jt] = ne(Ue),
	Qt = i.forwardRef((n, l) => {
		const { __scopeSelect: e, ...o } = n,
			t = be();
		return d.jsx(Xt, {
			scope: e,
			id: t,
			children: d.jsx(j.div, {
				role: "group",
				"aria-labelledby": t,
				...o,
				ref: l,
			}),
		});
	});
Qt.displayName = Ue;
var $e = "SelectLabel",
	Ke = i.forwardRef((n, l) => {
		const { __scopeSelect: e, ...o } = n,
			t = Jt($e, e);
		return d.jsx(j.div, { id: t.id, ...o, ref: l });
	});
Ke.displayName = $e;
var ce = "SelectItem",
	[eo, ze] = ne(ce),
	Ge = i.forwardRef((n, l) => {
		const {
				__scopeSelect: e,
				value: o,
				disabled: t = !1,
				textValue: s,
				...r
			} = n,
			a = Y(ce, e),
			c = q(ce, e),
			p = a.value === o,
			[g, S] = i.useState(s ?? ""),
			[x, w] = i.useState(!1),
			y = D(l, (f) => {
				var h;
				return (h = c.itemRefCallback) == null ? void 0 : h.call(c, f, o, t);
			}),
			u = be(),
			v = i.useRef("touch"),
			b = () => {
				t || (a.onValueChange(o), a.onOpenChange(!1));
			};
		if (o === "")
			throw new Error(
				"A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
			);
		return d.jsx(eo, {
			scope: e,
			value: o,
			disabled: t,
			textId: u,
			isSelected: p,
			onItemTextChange: i.useCallback((f) => {
				S((h) => h || ((f == null ? void 0 : f.textContent) ?? "").trim());
			}, []),
			children: d.jsx(de.ItemSlot, {
				scope: e,
				value: o,
				disabled: t,
				textValue: g,
				children: d.jsx(j.div, {
					role: "option",
					"aria-labelledby": u,
					"data-highlighted": x ? "" : void 0,
					"aria-selected": p && x,
					"data-state": p ? "checked" : "unchecked",
					"aria-disabled": t || void 0,
					"data-disabled": t ? "" : void 0,
					tabIndex: t ? void 0 : -1,
					...r,
					ref: y,
					onFocus: R(r.onFocus, () => w(!0)),
					onBlur: R(r.onBlur, () => w(!1)),
					onClick: R(r.onClick, () => {
						v.current !== "mouse" && b();
					}),
					onPointerUp: R(r.onPointerUp, () => {
						v.current === "mouse" && b();
					}),
					onPointerDown: R(r.onPointerDown, (f) => {
						v.current = f.pointerType;
					}),
					onPointerMove: R(r.onPointerMove, (f) => {
						var h;
						(v.current = f.pointerType),
							t
								? (h = c.onItemLeave) == null || h.call(c)
								: v.current === "mouse" &&
									f.currentTarget.focus({ preventScroll: !0 });
					}),
					onPointerLeave: R(r.onPointerLeave, (f) => {
						var h;
						f.currentTarget === document.activeElement &&
							((h = c.onItemLeave) == null || h.call(c));
					}),
					onKeyDown: R(r.onKeyDown, (f) => {
						var M;
						(((M = c.searchRef) == null ? void 0 : M.current) !== "" &&
							f.key === " ") ||
							(Bt.includes(f.key) && b(), f.key === " " && f.preventDefault());
					}),
				}),
			}),
		});
	});
Ge.displayName = ce;
var le = "SelectItemText",
	Ye = i.forwardRef((n, l) => {
		const { __scopeSelect: e, className: o, style: t, ...s } = n,
			r = Y(le, e),
			a = q(le, e),
			c = ze(le, e),
			p = Ut(le, e),
			[g, S] = i.useState(null),
			x = D(
				l,
				(b) => S(b),
				c.onItemTextChange,
				(b) => {
					var f;
					return (f = a.itemTextRefCallback) == null
						? void 0
						: f.call(a, b, c.value, c.disabled);
				},
			),
			w = g == null ? void 0 : g.textContent,
			y = i.useMemo(
				() =>
					d.jsx(
						"option",
						{ value: c.value, disabled: c.disabled, children: w },
						c.value,
					),
				[c.disabled, c.value, w],
			),
			{ onNativeOptionAdd: u, onNativeOptionRemove: v } = p;
		return (
			G(() => (u(y), () => v(y)), [u, v, y]),
			d.jsxs(d.Fragment, {
				children: [
					d.jsx(j.span, { id: c.textId, ...s, ref: x }),
					c.isSelected && r.valueNode && !r.valueNodeHasChildren
						? Pe.createPortal(s.children, r.valueNode)
						: null,
				],
			})
		);
	});
Ye.displayName = le;
var qe = "SelectItemIndicator",
	Ze = i.forwardRef((n, l) => {
		const { __scopeSelect: e, ...o } = n;
		return ze(qe, e).isSelected
			? d.jsx(j.span, { "aria-hidden": !0, ...o, ref: l })
			: null;
	});
Ze.displayName = qe;
var ye = "SelectScrollUpButton",
	Xe = i.forwardRef((n, l) => {
		const e = q(ye, n.__scopeSelect),
			o = Ne(ye, n.__scopeSelect),
			[t, s] = i.useState(!1),
			r = D(l, o.onScrollButtonChange);
		return (
			G(() => {
				if (e.viewport && e.isPositioned) {
					const a = () => {
						const p = c.scrollTop > 0;
						s(p);
					};
					const c = e.viewport;
					return (
						a(),
						c.addEventListener("scroll", a),
						() => c.removeEventListener("scroll", a)
					);
				}
			}, [e.viewport, e.isPositioned]),
			t
				? d.jsx(Qe, {
						...n,
						ref: r,
						onAutoScroll: () => {
							const { viewport: a, selectedItem: c } = e;
							a && c && (a.scrollTop = a.scrollTop - c.offsetHeight);
						},
					})
				: null
		);
	});
Xe.displayName = ye;
var Ce = "SelectScrollDownButton",
	Je = i.forwardRef((n, l) => {
		const e = q(Ce, n.__scopeSelect),
			o = Ne(Ce, n.__scopeSelect),
			[t, s] = i.useState(!1),
			r = D(l, o.onScrollButtonChange);
		return (
			G(() => {
				if (e.viewport && e.isPositioned) {
					const a = () => {
						const p = c.scrollHeight - c.clientHeight,
							g = Math.ceil(c.scrollTop) < p;
						s(g);
					};
					const c = e.viewport;
					return (
						a(),
						c.addEventListener("scroll", a),
						() => c.removeEventListener("scroll", a)
					);
				}
			}, [e.viewport, e.isPositioned]),
			t
				? d.jsx(Qe, {
						...n,
						ref: r,
						onAutoScroll: () => {
							const { viewport: a, selectedItem: c } = e;
							a && c && (a.scrollTop = a.scrollTop + c.offsetHeight);
						},
					})
				: null
		);
	});
Je.displayName = Ce;
var Qe = i.forwardRef((n, l) => {
		const { __scopeSelect: e, onAutoScroll: o, ...t } = n,
			s = q("SelectScrollButton", e),
			r = i.useRef(null),
			a = pe(e),
			c = i.useCallback(() => {
				r.current !== null &&
					(window.clearInterval(r.current), (r.current = null));
			}, []);
		return (
			i.useEffect(() => () => c(), [c]),
			G(() => {
				var g;
				const p = a().find((S) => S.ref.current === document.activeElement);
				(g = p == null ? void 0 : p.ref.current) == null ||
					g.scrollIntoView({ block: "nearest" });
			}, [a]),
			d.jsx(j.div, {
				"aria-hidden": !0,
				...t,
				ref: l,
				style: { flexShrink: 0, ...t.style },
				onPointerDown: R(t.onPointerDown, () => {
					r.current === null && (r.current = window.setInterval(o, 50));
				}),
				onPointerMove: R(t.onPointerMove, () => {
					var p;
					(p = s.onItemLeave) == null || p.call(s),
						r.current === null && (r.current = window.setInterval(o, 50));
				}),
				onPointerLeave: R(t.onPointerLeave, () => {
					c();
				}),
			})
		);
	}),
	to = "SelectSeparator",
	et = i.forwardRef((n, l) => {
		const { __scopeSelect: e, ...o } = n;
		return d.jsx(j.div, { "aria-hidden": !0, ...o, ref: l });
	});
et.displayName = to;
var Ie = "SelectArrow",
	oo = i.forwardRef((n, l) => {
		const { __scopeSelect: e, ...o } = n,
			t = ue(e),
			s = Y(Ie, e),
			r = q(Ie, e);
		return s.open && r.position === "popper"
			? d.jsx(Tt, { ...t, ...o, ref: l })
			: null;
	});
oo.displayName = Ie;
var no = "SelectBubbleInput",
	tt = i.forwardRef(({ __scopeSelect: n, value: l, ...e }, o) => {
		const t = i.useRef(null),
			s = D(o, t),
			r = Pt(l);
		return (
			i.useEffect(() => {
				const a = t.current;
				if (!a) return;
				const c = window.HTMLSelectElement.prototype,
					g = Object.getOwnPropertyDescriptor(c, "value").set;
				if (r !== l && g) {
					const S = new Event("change", { bubbles: !0 });
					g.call(a, l), a.dispatchEvent(S);
				}
			}, [r, l]),
			d.jsx(j.select, {
				...e,
				style: { ..._t, ...e.style },
				ref: s,
				defaultValue: l,
			})
		);
	});
tt.displayName = no;
function ot(n) {
	return n === "" || n === void 0;
}
function nt(n) {
	const l = Rt(n),
		e = i.useRef(""),
		o = i.useRef(0),
		t = i.useCallback(
			(r) => {
				const a = e.current + r;
				l(a),
					(function c(p) {
						(e.current = p),
							window.clearTimeout(o.current),
							p !== "" && (o.current = window.setTimeout(() => c(""), 1e3));
					})(a);
			},
			[l],
		),
		s = i.useCallback(() => {
			(e.current = ""), window.clearTimeout(o.current);
		}, []);
	return i.useEffect(() => () => window.clearTimeout(o.current), []), [e, t, s];
}
function rt(n, l, e) {
	const t = l.length > 1 && Array.from(l).every((p) => p === l[0]) ? l[0] : l,
		s = e ? n.indexOf(e) : -1;
	let r = ro(n, Math.max(s, 0));
	t.length === 1 && (r = r.filter((p) => p !== e));
	const c = r.find((p) =>
		p.textValue.toLowerCase().startsWith(t.toLowerCase()),
	);
	return c !== e ? c : void 0;
}
function ro(n, l) {
	return n.map((e, o) => n[(l + o) % n.length]);
}
var so = je,
	st = Ae,
	lo = De,
	ao = Le,
	io = Ve,
	lt = ke,
	co = Fe,
	at = Ke,
	it = Ge,
	po = Ye,
	uo = Ze,
	ct = Xe,
	dt = Je,
	pt = et;
const Mo = so,
	Ao = lo,
	fo = i.forwardRef((n, l) => {
		const e = te.c(12);
		let o, t, s;
		e[0] !== n
			? (({ className: t, children: o, ...s } = n),
				(e[0] = n),
				(e[1] = o),
				(e[2] = t),
				(e[3] = s))
			: ((o = e[1]), (t = e[2]), (s = e[3]));
		let r;
		e[4] !== t
			? ((r = z(
					"flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
					t,
				)),
				(e[4] = t),
				(e[5] = r))
			: (r = e[5]);
		let a;
		e[6] === Symbol.for("react.memo_cache_sentinel")
			? ((a = d.jsx(ao, {
					asChild: !0,
					children: d.jsx(_e, { className: "h-4 w-4 opacity-50" }),
				})),
				(e[6] = a))
			: (a = e[6]);
		let c;
		return (
			e[7] !== o || e[8] !== s || e[9] !== l || e[10] !== r
				? ((c = d.jsxs(st, { ref: l, className: r, ...s, children: [o, a] })),
					(e[7] = o),
					(e[8] = s),
					(e[9] = l),
					(e[10] = r),
					(e[11] = c))
				: (c = e[11]),
			c
		);
	});
fo.displayName = st.displayName;
const ut = i.forwardRef((n, l) => {
	const e = te.c(10);
	let o, t;
	e[0] !== n
		? (({ className: o, ...t } = n), (e[0] = n), (e[1] = o), (e[2] = t))
		: ((o = e[1]), (t = e[2]));
	let s;
	e[3] !== o
		? ((s = z("flex cursor-default items-center justify-center py-1", o)),
			(e[3] = o),
			(e[4] = s))
		: (s = e[4]);
	let r;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((r = d.jsx(jt, { className: "h-4 w-4" })), (e[5] = r))
		: (r = e[5]);
	let a;
	return (
		e[6] !== t || e[7] !== l || e[8] !== s
			? ((a = d.jsx(ct, { ref: l, className: s, ...t, children: r })),
				(e[6] = t),
				(e[7] = l),
				(e[8] = s),
				(e[9] = a))
			: (a = e[9]),
		a
	);
});
ut.displayName = ct.displayName;
const ft = i.forwardRef((n, l) => {
	const e = te.c(10);
	let o, t;
	e[0] !== n
		? (({ className: o, ...t } = n), (e[0] = n), (e[1] = o), (e[2] = t))
		: ((o = e[1]), (t = e[2]));
	let s;
	e[3] !== o
		? ((s = z("flex cursor-default items-center justify-center py-1", o)),
			(e[3] = o),
			(e[4] = s))
		: (s = e[4]);
	let r;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((r = d.jsx(_e, { className: "h-4 w-4" })), (e[5] = r))
		: (r = e[5]);
	let a;
	return (
		e[6] !== t || e[7] !== l || e[8] !== s
			? ((a = d.jsx(dt, { ref: l, className: s, ...t, children: r })),
				(e[6] = t),
				(e[7] = l),
				(e[8] = s),
				(e[9] = a))
			: (a = e[9]),
		a
	);
});
ft.displayName = dt.displayName;
const mo = i.forwardRef((n, l) => {
	const e = te.c(21);
	let o, t, s, r;
	e[0] !== n
		? (({ className: t, children: o, position: r, ...s } = n),
			(e[0] = n),
			(e[1] = o),
			(e[2] = t),
			(e[3] = s),
			(e[4] = r))
		: ((o = e[1]), (t = e[2]), (s = e[3]), (r = e[4]));
	const a = r === void 0 ? "popper" : r,
		c =
			a === "popper" &&
			"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1";
	let p;
	e[5] !== t || e[6] !== c
		? ((p = z(
				"relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				c,
				t,
			)),
			(e[5] = t),
			(e[6] = c),
			(e[7] = p))
		: (p = e[7]);
	let g;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((g = d.jsx(ut, {})), (e[8] = g))
		: (g = e[8]);
	const S =
		a === "popper" &&
		"h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)";
	let x;
	e[9] !== S ? ((x = z("p-1", S)), (e[9] = S), (e[10] = x)) : (x = e[10]);
	let w;
	e[11] !== o || e[12] !== x
		? ((w = d.jsx(co, { className: x, children: o })),
			(e[11] = o),
			(e[12] = x),
			(e[13] = w))
		: (w = e[13]);
	let y;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((y = d.jsx(ft, {})), (e[14] = y))
		: (y = e[14]);
	let u;
	return (
		e[15] !== a || e[16] !== s || e[17] !== l || e[18] !== p || e[19] !== w
			? ((u = d.jsx(io, {
					children: d.jsxs(lt, {
						ref: l,
						className: p,
						position: a,
						...s,
						children: [g, w, y],
					}),
				})),
				(e[15] = a),
				(e[16] = s),
				(e[17] = l),
				(e[18] = p),
				(e[19] = w),
				(e[20] = u))
			: (u = e[20]),
		u
	);
});
mo.displayName = lt.displayName;
const ho = i.forwardRef((n, l) => {
	const e = te.c(9);
	let o, t;
	e[0] !== n
		? (({ className: o, ...t } = n), (e[0] = n), (e[1] = o), (e[2] = t))
		: ((o = e[1]), (t = e[2]));
	let s;
	e[3] !== o
		? ((s = z("py-1.5 pl-8 pr-2 text-sm font-semibold", o)),
			(e[3] = o),
			(e[4] = s))
		: (s = e[4]);
	let r;
	return (
		e[5] !== t || e[6] !== l || e[7] !== s
			? ((r = d.jsx(at, { ref: l, className: s, ...t })),
				(e[5] = t),
				(e[6] = l),
				(e[7] = s),
				(e[8] = r))
			: (r = e[8]),
		r
	);
});
ho.displayName = at.displayName;
const go = i.forwardRef((n, l) => {
	const e = te.c(14);
	let o, t, s;
	e[0] !== n
		? (({ className: t, children: o, ...s } = n),
			(e[0] = n),
			(e[1] = o),
			(e[2] = t),
			(e[3] = s))
		: ((o = e[1]), (t = e[2]), (s = e[3]));
	let r;
	e[4] !== t
		? ((r = z(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
				t,
			)),
			(e[4] = t),
			(e[5] = r))
		: (r = e[5]);
	let a;
	e[6] === Symbol.for("react.memo_cache_sentinel")
		? ((a = d.jsx("span", {
				className:
					"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
				children: d.jsx(uo, { children: d.jsx(Et, { className: "h-4 w-4" }) }),
			})),
			(e[6] = a))
		: (a = e[6]);
	let c;
	e[7] !== o
		? ((c = d.jsx(po, { children: o })), (e[7] = o), (e[8] = c))
		: (c = e[8]);
	let p;
	return (
		e[9] !== s || e[10] !== l || e[11] !== r || e[12] !== c
			? ((p = d.jsxs(it, { ref: l, className: r, ...s, children: [a, c] })),
				(e[9] = s),
				(e[10] = l),
				(e[11] = r),
				(e[12] = c),
				(e[13] = p))
			: (p = e[13]),
		p
	);
});
go.displayName = it.displayName;
const vo = i.forwardRef((n, l) => {
	const e = te.c(9);
	let o, t;
	e[0] !== n
		? (({ className: o, ...t } = n), (e[0] = n), (e[1] = o), (e[2] = t))
		: ((o = e[1]), (t = e[2]));
	let s;
	e[3] !== o
		? ((s = z("-mx-1 my-1 h-px bg-muted", o)), (e[3] = o), (e[4] = s))
		: (s = e[4]);
	let r;
	return (
		e[5] !== t || e[6] !== l || e[7] !== s
			? ((r = d.jsx(pt, { ref: l, className: s, ...t })),
				(e[5] = t),
				(e[6] = l),
				(e[7] = s),
				(e[8] = r))
			: (r = e[8]),
		r
	);
});
vo.displayName = pt.displayName;
export { Mo as S, fo as a, Ao as b, mo as c, go as d };
