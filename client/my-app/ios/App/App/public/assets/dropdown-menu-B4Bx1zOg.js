import { C as Tn } from "./chevron-right-QFzs-bqo.js";
import { c as wn, u as xn } from "./index-3Axhna2x.js";
import { c as De, I as In, R as Nn } from "./index-BP52hRXm.js";
import { P as q } from "./index-BRam3N1Z.js";
import { d as hn, P as j } from "./index-Bv1xjdPd.js";
import {
	A as En,
	a as Pn,
	R as Se,
	c as be,
	C as yn,
} from "./index-CDAriSY_.js";
import {
	P as Cn,
	D as Dn,
	u as Rn,
	F as Sn,
	h as _n,
	R as bn,
} from "./index-CnLXGm6V.js";
import { u as X } from "./index-CvBT1pZ2.js";
import { c as Re } from "./index-DauBq6FI.js";
import { u as ae } from "./index-Dl_6cIao.js";
import { u as _e, c as g } from "./index-Dqr9Wf5M.js";
import {
	W as Ce,
	l as O,
	c as R,
	H as T,
	j as c,
	r as s,
} from "./index-kb-Ylywn.js";
function On(n) {
	const e = jn(n),
		t = s.forwardRef((o, r) => {
			const { children: a, ...i } = o,
				u = s.Children.toArray(a),
				l = u.find(kn);
			if (l) {
				const v = l.props.children,
					p = u.map((d) =>
						d === l
							? s.Children.count(v) > 1
								? s.Children.only(null)
								: s.isValidElement(v)
									? v.props.children
									: null
							: d,
					);
				return c.jsx(e, {
					...i,
					ref: r,
					children: s.isValidElement(v) ? s.cloneElement(v, void 0, p) : null,
				});
			}
			return c.jsx(e, { ...i, ref: r, children: a });
		});
	return (t.displayName = `${n}.Slot`), t;
}
function jn(n) {
	const e = s.forwardRef((t, o) => {
		const { children: r, ...a } = t,
			i = s.isValidElement(r) ? Fn(r) : void 0,
			u = T(i, o);
		if (s.isValidElement(r)) {
			const l = Ln(a, r.props);
			return r.type !== s.Fragment && (l.ref = u), s.cloneElement(r, l);
		}
		return s.Children.count(r) > 1 ? s.Children.only(null) : null;
	});
	return (e.displayName = `${n}.SlotClone`), e;
}
var An = Symbol("radix.slottable");
function kn(n) {
	return (
		s.isValidElement(n) &&
		typeof n.type == "function" &&
		"__radixId" in n.type &&
		n.type.__radixId === An
	);
}
function Ln(n, e) {
	const t = { ...e };
	for (const o in e) {
		const r = n[o],
			a = e[o];
		/^on[A-Z]/.test(o)
			? r && a
				? (t[o] = (...u) => {
						const l = a(...u);
						return r(...u), l;
					})
				: r && (t[o] = r)
			: o === "style"
				? (t[o] = { ...r, ...a })
				: o === "className" && (t[o] = [r, a].filter(Boolean).join(" "));
	}
	return { ...n, ...t };
}
function Fn(n) {
	var o, r;
	let e =
			(o = Object.getOwnPropertyDescriptor(n.props, "ref")) == null
				? void 0
				: o.get,
		t = e && "isReactWarning" in e && e.isReactWarning;
	return t
		? n.ref
		: ((e =
				(r = Object.getOwnPropertyDescriptor(n, "ref")) == null
					? void 0
					: r.get),
			(t = e && "isReactWarning" in e && e.isReactWarning),
			t ? n.props.ref : n.props.ref || n.ref);
}
var re = ["Enter", " "],
	Gn = ["ArrowDown", "PageUp", "Home"],
	Ee = ["ArrowUp", "PageDown", "End"],
	$n = [...Gn, ...Ee],
	Kn = { ltr: [...re, "ArrowRight"], rtl: [...re, "ArrowLeft"] },
	Un = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
	$ = "Menu",
	[F, Vn, Bn] = wn($),
	[y, ye] = Re($, [Bn, be, De]),
	K = be(),
	Pe = De(),
	[Ie, D] = y($),
	[Wn, U] = y($),
	Ne = (n) => {
		const {
				__scopeMenu: e,
				open: t = !1,
				children: o,
				dir: r,
				onOpenChange: a,
				modal: i = !0,
			} = n,
			u = K(e),
			[l, v] = s.useState(null),
			p = s.useRef(!1),
			d = ae(a),
			m = xn(r);
		return (
			s.useEffect(() => {
				const h = () => {
						(p.current = !0),
							document.addEventListener("pointerdown", M, {
								capture: !0,
								once: !0,
							}),
							document.addEventListener("pointermove", M, {
								capture: !0,
								once: !0,
							});
					},
					M = () => (p.current = !1);
				return (
					document.addEventListener("keydown", h, { capture: !0 }),
					() => {
						document.removeEventListener("keydown", h, { capture: !0 }),
							document.removeEventListener("pointerdown", M, { capture: !0 }),
							document.removeEventListener("pointermove", M, { capture: !0 });
					}
				);
			}, []),
			c.jsx(Se, {
				...u,
				children: c.jsx(Ie, {
					scope: e,
					open: t,
					onOpenChange: d,
					content: l,
					onContentChange: v,
					children: c.jsx(Wn, {
						scope: e,
						onClose: s.useCallback(() => d(!1), [d]),
						isUsingKeyboardRef: p,
						dir: m,
						modal: i,
						children: o,
					}),
				}),
			})
		);
	};
Ne.displayName = $;
var zn = "MenuAnchor",
	se = s.forwardRef((n, e) => {
		const { __scopeMenu: t, ...o } = n,
			r = K(t);
		return c.jsx(En, { ...r, ...o, ref: e });
	});
se.displayName = zn;
var ce = "MenuPortal",
	[Hn, Te] = y(ce, { forceMount: void 0 }),
	Oe = (n) => {
		const { __scopeMenu: e, forceMount: t, children: o, container: r } = n,
			a = D(ce, e);
		return c.jsx(Hn, {
			scope: e,
			forceMount: t,
			children: c.jsx(q, {
				present: t || a.open,
				children: c.jsx(Cn, { asChild: !0, container: r, children: o }),
			}),
		});
	};
Oe.displayName = ce;
var C = "MenuContent",
	[Xn, ie] = y(C),
	je = s.forwardRef((n, e) => {
		const t = Te(C, n.__scopeMenu),
			{ forceMount: o = t.forceMount, ...r } = n,
			a = D(C, n.__scopeMenu),
			i = U(C, n.__scopeMenu);
		return c.jsx(F.Provider, {
			scope: n.__scopeMenu,
			children: c.jsx(q, {
				present: o || a.open,
				children: c.jsx(F.Slot, {
					scope: n.__scopeMenu,
					children: i.modal
						? c.jsx(Yn, { ...r, ref: e })
						: c.jsx(Zn, { ...r, ref: e }),
				}),
			}),
		});
	}),
	Yn = s.forwardRef((n, e) => {
		const t = D(C, n.__scopeMenu),
			o = s.useRef(null),
			r = T(e, o);
		return (
			s.useEffect(() => {
				const a = o.current;
				if (a) return _n(a);
			}, []),
			c.jsx(ue, {
				...n,
				ref: r,
				trapFocus: t.open,
				disableOutsidePointerEvents: t.open,
				disableOutsideScroll: !0,
				onFocusOutside: g(n.onFocusOutside, (a) => a.preventDefault(), {
					checkForDefaultPrevented: !1,
				}),
				onDismiss: () => t.onOpenChange(!1),
			})
		);
	}),
	Zn = s.forwardRef((n, e) => {
		const t = D(C, n.__scopeMenu);
		return c.jsx(ue, {
			...n,
			ref: e,
			trapFocus: !1,
			disableOutsidePointerEvents: !1,
			disableOutsideScroll: !1,
			onDismiss: () => t.onOpenChange(!1),
		});
	}),
	qn = On("MenuContent.ScrollLock"),
	ue = s.forwardRef((n, e) => {
		const {
				__scopeMenu: t,
				loop: o = !1,
				trapFocus: r,
				onOpenAutoFocus: a,
				onCloseAutoFocus: i,
				disableOutsidePointerEvents: u,
				onEntryFocus: l,
				onEscapeKeyDown: v,
				onPointerDownOutside: p,
				onFocusOutside: d,
				onInteractOutside: m,
				onDismiss: h,
				disableOutsideScroll: M,
				...E
			} = n,
			P = D(C, t),
			A = U(C, t),
			V = K(t),
			B = Pe(t),
			me = Vn(t),
			[pn, ve] = s.useState(null),
			W = s.useRef(null),
			fn = T(e, W, P.onContentChange),
			z = s.useRef(0),
			H = s.useRef(""),
			mn = s.useRef(0),
			ee = s.useRef(null),
			ge = s.useRef("right"),
			ne = s.useRef(0),
			vn = M ? bn : s.Fragment,
			gn = M ? { as: qn, allowPinchZoom: !0 } : void 0,
			Mn = (f) => {
				var N, he;
				const x = H.current + f,
					_ = me().filter((b) => !b.disabled),
					S = document.activeElement,
					te =
						(N = _.find((b) => b.ref.current === S)) == null
							? void 0
							: N.textValue,
					oe = _.map((b) => b.textValue),
					Me = ut(oe, x, te),
					k =
						(he = _.find((b) => b.textValue === Me)) == null
							? void 0
							: he.ref.current;
				(function b(we) {
					(H.current = we),
						window.clearTimeout(z.current),
						we !== "" && (z.current = window.setTimeout(() => b(""), 1e3));
				})(x),
					k && setTimeout(() => k.focus());
			};
		s.useEffect(() => () => window.clearTimeout(z.current), []), Rn();
		const I = s.useCallback((f) => {
			var _, S;
			return (
				ge.current === ((_ = ee.current) == null ? void 0 : _.side) &&
				lt(f, (S = ee.current) == null ? void 0 : S.area)
			);
		}, []);
		return c.jsx(Xn, {
			scope: t,
			searchRef: H,
			onItemEnter: s.useCallback(
				(f) => {
					I(f) && f.preventDefault();
				},
				[I],
			),
			onItemLeave: s.useCallback(
				(f) => {
					var x;
					I(f) || ((x = W.current) == null || x.focus(), ve(null));
				},
				[I],
			),
			onTriggerLeave: s.useCallback(
				(f) => {
					I(f) && f.preventDefault();
				},
				[I],
			),
			pointerGraceTimerRef: mn,
			onPointerGraceIntentChange: s.useCallback((f) => {
				ee.current = f;
			}, []),
			children: c.jsx(vn, {
				...gn,
				children: c.jsx(Sn, {
					asChild: !0,
					trapped: r,
					onMountAutoFocus: g(a, (f) => {
						var x;
						f.preventDefault(),
							(x = W.current) == null || x.focus({ preventScroll: !0 });
					}),
					onUnmountAutoFocus: i,
					children: c.jsx(Dn, {
						asChild: !0,
						disableOutsidePointerEvents: u,
						onEscapeKeyDown: v,
						onPointerDownOutside: p,
						onFocusOutside: d,
						onInteractOutside: m,
						onDismiss: h,
						children: c.jsx(Nn, {
							asChild: !0,
							...B,
							dir: A.dir,
							orientation: "vertical",
							loop: o,
							currentTabStopId: pn,
							onCurrentTabStopIdChange: ve,
							onEntryFocus: g(l, (f) => {
								A.isUsingKeyboardRef.current || f.preventDefault();
							}),
							preventScrollOnEntryFocus: !0,
							children: c.jsx(yn, {
								role: "menu",
								"aria-orientation": "vertical",
								"data-state": qe(P.open),
								"data-radix-menu-content": "",
								dir: A.dir,
								...V,
								...E,
								ref: fn,
								style: { outline: "none", ...E.style },
								onKeyDown: g(E.onKeyDown, (f) => {
									const _ =
											f.target.closest("[data-radix-menu-content]") ===
											f.currentTarget,
										S = f.ctrlKey || f.altKey || f.metaKey,
										te = f.key.length === 1;
									_ &&
										(f.key === "Tab" && f.preventDefault(),
										!S && te && Mn(f.key));
									const oe = W.current;
									if (f.target !== oe || !$n.includes(f.key)) return;
									f.preventDefault();
									const k = me()
										.filter((N) => !N.disabled)
										.map((N) => N.ref.current);
									Ee.includes(f.key) && k.reverse(), ct(k);
								}),
								onBlur: g(n.onBlur, (f) => {
									f.currentTarget.contains(f.target) ||
										(window.clearTimeout(z.current), (H.current = ""));
								}),
								onPointerMove: g(
									n.onPointerMove,
									G((f) => {
										const x = f.target,
											_ = ne.current !== f.clientX;
										if (f.currentTarget.contains(x) && _) {
											const S = f.clientX > ne.current ? "right" : "left";
											(ge.current = S), (ne.current = f.clientX);
										}
									}),
								),
							}),
						}),
					}),
				}),
			}),
		});
	});
je.displayName = C;
var Jn = "MenuGroup",
	de = s.forwardRef((n, e) => {
		const { __scopeMenu: t, ...o } = n;
		return c.jsx(j.div, { role: "group", ...o, ref: e });
	});
de.displayName = Jn;
var Qn = "MenuLabel",
	Ae = s.forwardRef((n, e) => {
		const { __scopeMenu: t, ...o } = n;
		return c.jsx(j.div, { ...o, ref: e });
	});
Ae.displayName = Qn;
var Y = "MenuItem",
	xe = "menu.itemSelect",
	J = s.forwardRef((n, e) => {
		const { disabled: t = !1, onSelect: o, ...r } = n,
			a = s.useRef(null),
			i = U(Y, n.__scopeMenu),
			u = ie(Y, n.__scopeMenu),
			l = T(e, a),
			v = s.useRef(!1),
			p = () => {
				const d = a.current;
				if (!t && d) {
					const m = new CustomEvent(xe, { bubbles: !0, cancelable: !0 });
					d.addEventListener(xe, (h) => (o == null ? void 0 : o(h)), {
						once: !0,
					}),
						hn(d, m),
						m.defaultPrevented ? (v.current = !1) : i.onClose();
				}
			};
		return c.jsx(ke, {
			...r,
			ref: l,
			disabled: t,
			onClick: g(n.onClick, p),
			onPointerDown: (d) => {
				var m;
				(m = n.onPointerDown) == null || m.call(n, d), (v.current = !0);
			},
			onPointerUp: g(n.onPointerUp, (d) => {
				var m;
				v.current || (m = d.currentTarget) == null || m.click();
			}),
			onKeyDown: g(n.onKeyDown, (d) => {
				const m = u.searchRef.current !== "";
				t ||
					(m && d.key === " ") ||
					(re.includes(d.key) && (d.currentTarget.click(), d.preventDefault()));
			}),
		});
	});
J.displayName = Y;
var ke = s.forwardRef((n, e) => {
		const { __scopeMenu: t, disabled: o = !1, textValue: r, ...a } = n,
			i = ie(Y, t),
			u = Pe(t),
			l = s.useRef(null),
			v = T(e, l),
			[p, d] = s.useState(!1),
			[m, h] = s.useState("");
		return (
			s.useEffect(() => {
				const M = l.current;
				M && h((M.textContent ?? "").trim());
			}, [a.children]),
			c.jsx(F.ItemSlot, {
				scope: t,
				disabled: o,
				textValue: r ?? m,
				children: c.jsx(In, {
					asChild: !0,
					...u,
					focusable: !o,
					children: c.jsx(j.div, {
						role: "menuitem",
						"data-highlighted": p ? "" : void 0,
						"aria-disabled": o || void 0,
						"data-disabled": o ? "" : void 0,
						...a,
						ref: v,
						onPointerMove: g(
							n.onPointerMove,
							G((M) => {
								o
									? i.onItemLeave(M)
									: (i.onItemEnter(M),
										M.defaultPrevented ||
											M.currentTarget.focus({ preventScroll: !0 }));
							}),
						),
						onPointerLeave: g(
							n.onPointerLeave,
							G((M) => i.onItemLeave(M)),
						),
						onFocus: g(n.onFocus, () => d(!0)),
						onBlur: g(n.onBlur, () => d(!1)),
					}),
				}),
			})
		);
	}),
	et = "MenuCheckboxItem",
	Le = s.forwardRef((n, e) => {
		const { checked: t = !1, onCheckedChange: o, ...r } = n;
		return c.jsx(Ue, {
			scope: n.__scopeMenu,
			checked: t,
			children: c.jsx(J, {
				role: "menuitemcheckbox",
				"aria-checked": Z(t) ? "mixed" : t,
				...r,
				ref: e,
				"data-state": fe(t),
				onSelect: g(
					r.onSelect,
					() => (o == null ? void 0 : o(Z(t) ? !0 : !t)),
					{ checkForDefaultPrevented: !1 },
				),
			}),
		});
	});
Le.displayName = et;
var Fe = "MenuRadioGroup",
	[nt, tt] = y(Fe, { value: void 0, onValueChange: () => {} }),
	Ge = s.forwardRef((n, e) => {
		const { value: t, onValueChange: o, ...r } = n,
			a = ae(o);
		return c.jsx(nt, {
			scope: n.__scopeMenu,
			value: t,
			onValueChange: a,
			children: c.jsx(de, { ...r, ref: e }),
		});
	});
Ge.displayName = Fe;
var $e = "MenuRadioItem",
	Ke = s.forwardRef((n, e) => {
		const { value: t, ...o } = n,
			r = tt($e, n.__scopeMenu),
			a = t === r.value;
		return c.jsx(Ue, {
			scope: n.__scopeMenu,
			checked: a,
			children: c.jsx(J, {
				role: "menuitemradio",
				"aria-checked": a,
				...o,
				ref: e,
				"data-state": fe(a),
				onSelect: g(
					o.onSelect,
					() => {
						var i;
						return (i = r.onValueChange) == null ? void 0 : i.call(r, t);
					},
					{ checkForDefaultPrevented: !1 },
				),
			}),
		});
	});
Ke.displayName = $e;
var le = "MenuItemIndicator",
	[Ue, ot] = y(le, { checked: !1 }),
	Ve = s.forwardRef((n, e) => {
		const { __scopeMenu: t, forceMount: o, ...r } = n,
			a = ot(le, t);
		return c.jsx(q, {
			present: o || Z(a.checked) || a.checked === !0,
			children: c.jsx(j.span, { ...r, ref: e, "data-state": fe(a.checked) }),
		});
	});
Ve.displayName = le;
var rt = "MenuSeparator",
	Be = s.forwardRef((n, e) => {
		const { __scopeMenu: t, ...o } = n;
		return c.jsx(j.div, {
			role: "separator",
			"aria-orientation": "horizontal",
			...o,
			ref: e,
		});
	});
Be.displayName = rt;
var at = "MenuArrow",
	We = s.forwardRef((n, e) => {
		const { __scopeMenu: t, ...o } = n,
			r = K(t);
		return c.jsx(Pn, { ...r, ...o, ref: e });
	});
We.displayName = at;
var pe = "MenuSub",
	[st, ze] = y(pe),
	He = (n) => {
		const { __scopeMenu: e, children: t, open: o = !1, onOpenChange: r } = n,
			a = D(pe, e),
			i = K(e),
			[u, l] = s.useState(null),
			[v, p] = s.useState(null),
			d = ae(r);
		return (
			s.useEffect(() => (a.open === !1 && d(!1), () => d(!1)), [a.open, d]),
			c.jsx(Se, {
				...i,
				children: c.jsx(Ie, {
					scope: e,
					open: o,
					onOpenChange: d,
					content: v,
					onContentChange: p,
					children: c.jsx(st, {
						scope: e,
						contentId: X(),
						triggerId: X(),
						trigger: u,
						onTriggerChange: l,
						children: t,
					}),
				}),
			})
		);
	};
He.displayName = pe;
var L = "MenuSubTrigger",
	Xe = s.forwardRef((n, e) => {
		const t = D(L, n.__scopeMenu),
			o = U(L, n.__scopeMenu),
			r = ze(L, n.__scopeMenu),
			a = ie(L, n.__scopeMenu),
			i = s.useRef(null),
			{ pointerGraceTimerRef: u, onPointerGraceIntentChange: l } = a,
			v = { __scopeMenu: n.__scopeMenu },
			p = s.useCallback(() => {
				i.current && window.clearTimeout(i.current), (i.current = null);
			}, []);
		return (
			s.useEffect(() => p, [p]),
			s.useEffect(() => {
				const d = u.current;
				return () => {
					window.clearTimeout(d), l(null);
				};
			}, [u, l]),
			c.jsx(se, {
				asChild: !0,
				...v,
				children: c.jsx(ke, {
					id: r.triggerId,
					"aria-haspopup": "menu",
					"aria-expanded": t.open,
					"aria-controls": r.contentId,
					"data-state": qe(t.open),
					...n,
					ref: Ce(e, r.onTriggerChange),
					onClick: (d) => {
						var m;
						(m = n.onClick) == null || m.call(n, d),
							!(n.disabled || d.defaultPrevented) &&
								(d.currentTarget.focus(), t.open || t.onOpenChange(!0));
					},
					onPointerMove: g(
						n.onPointerMove,
						G((d) => {
							a.onItemEnter(d),
								!d.defaultPrevented &&
									!n.disabled &&
									!t.open &&
									!i.current &&
									(a.onPointerGraceIntentChange(null),
									(i.current = window.setTimeout(() => {
										t.onOpenChange(!0), p();
									}, 100)));
						}),
					),
					onPointerLeave: g(
						n.onPointerLeave,
						G((d) => {
							var h, M;
							p();
							const m =
								(h = t.content) == null ? void 0 : h.getBoundingClientRect();
							if (m) {
								const E = (M = t.content) == null ? void 0 : M.dataset.side,
									P = E === "right",
									A = P ? -5 : 5,
									V = m[P ? "left" : "right"],
									B = m[P ? "right" : "left"];
								a.onPointerGraceIntentChange({
									area: [
										{ x: d.clientX + A, y: d.clientY },
										{ x: V, y: m.top },
										{ x: B, y: m.top },
										{ x: B, y: m.bottom },
										{ x: V, y: m.bottom },
									],
									side: E,
								}),
									window.clearTimeout(u.current),
									(u.current = window.setTimeout(
										() => a.onPointerGraceIntentChange(null),
										300,
									));
							} else {
								if ((a.onTriggerLeave(d), d.defaultPrevented)) return;
								a.onPointerGraceIntentChange(null);
							}
						}),
					),
					onKeyDown: g(n.onKeyDown, (d) => {
						var h;
						const m = a.searchRef.current !== "";
						n.disabled ||
							(m && d.key === " ") ||
							(Kn[o.dir].includes(d.key) &&
								(t.onOpenChange(!0),
								(h = t.content) == null || h.focus(),
								d.preventDefault()));
					}),
				}),
			})
		);
	});
Xe.displayName = L;
var Ye = "MenuSubContent",
	Ze = s.forwardRef((n, e) => {
		const t = Te(C, n.__scopeMenu),
			{ forceMount: o = t.forceMount, ...r } = n,
			a = D(C, n.__scopeMenu),
			i = U(C, n.__scopeMenu),
			u = ze(Ye, n.__scopeMenu),
			l = s.useRef(null),
			v = T(e, l);
		return c.jsx(F.Provider, {
			scope: n.__scopeMenu,
			children: c.jsx(q, {
				present: o || a.open,
				children: c.jsx(F.Slot, {
					scope: n.__scopeMenu,
					children: c.jsx(ue, {
						id: u.contentId,
						"aria-labelledby": u.triggerId,
						...r,
						ref: v,
						align: "start",
						side: i.dir === "rtl" ? "left" : "right",
						disableOutsidePointerEvents: !1,
						disableOutsideScroll: !1,
						trapFocus: !1,
						onOpenAutoFocus: (p) => {
							var d;
							i.isUsingKeyboardRef.current &&
								((d = l.current) == null || d.focus()),
								p.preventDefault();
						},
						onCloseAutoFocus: (p) => p.preventDefault(),
						onFocusOutside: g(n.onFocusOutside, (p) => {
							p.target !== u.trigger && a.onOpenChange(!1);
						}),
						onEscapeKeyDown: g(n.onEscapeKeyDown, (p) => {
							i.onClose(), p.preventDefault();
						}),
						onKeyDown: g(n.onKeyDown, (p) => {
							var h;
							const d = p.currentTarget.contains(p.target),
								m = Un[i.dir].includes(p.key);
							d &&
								m &&
								(a.onOpenChange(!1),
								(h = u.trigger) == null || h.focus(),
								p.preventDefault());
						}),
					}),
				}),
			}),
		});
	});
Ze.displayName = Ye;
function qe(n) {
	return n ? "open" : "closed";
}
function Z(n) {
	return n === "indeterminate";
}
function fe(n) {
	return Z(n) ? "indeterminate" : n ? "checked" : "unchecked";
}
function ct(n) {
	const e = document.activeElement;
	for (const t of n)
		if (t === e || (t.focus(), document.activeElement !== e)) return;
}
function it(n, e) {
	return n.map((t, o) => n[(e + o) % n.length]);
}
function ut(n, e, t) {
	const r = e.length > 1 && Array.from(e).every((v) => v === e[0]) ? e[0] : e,
		a = t ? n.indexOf(t) : -1;
	let i = it(n, Math.max(a, 0));
	r.length === 1 && (i = i.filter((v) => v !== t));
	const l = i.find((v) => v.toLowerCase().startsWith(r.toLowerCase()));
	return l !== t ? l : void 0;
}
function dt(n, e) {
	const { x: t, y: o } = n;
	let r = !1;
	for (let a = 0, i = e.length - 1; a < e.length; i = a++) {
		const u = e[a],
			l = e[i],
			v = u.x,
			p = u.y,
			d = l.x,
			m = l.y;
		p > o != m > o && t < ((d - v) * (o - p)) / (m - p) + v && (r = !r);
	}
	return r;
}
function lt(n, e) {
	if (!e) return !1;
	const t = { x: n.clientX, y: n.clientY };
	return dt(t, e);
}
function G(n) {
	return (e) => (e.pointerType === "mouse" ? n(e) : void 0);
}
var pt = Ne,
	ft = se,
	mt = Oe,
	vt = je,
	gt = de,
	Mt = Ae,
	ht = J,
	wt = Le,
	xt = Ge,
	Ct = Ke,
	_t = Ve,
	Rt = Be,
	bt = We,
	St = He,
	Dt = Xe,
	Et = Ze,
	Q = "DropdownMenu",
	[yt, ho] = Re(Q, [ye]),
	w = ye(),
	[Pt, Je] = yt(Q),
	Qe = (n) => {
		const {
				__scopeDropdownMenu: e,
				children: t,
				dir: o,
				open: r,
				defaultOpen: a,
				onOpenChange: i,
				modal: u = !0,
			} = n,
			l = w(e),
			v = s.useRef(null),
			[p, d] = _e({ prop: r, defaultProp: a ?? !1, onChange: i, caller: Q });
		return c.jsx(Pt, {
			scope: e,
			triggerId: X(),
			triggerRef: v,
			contentId: X(),
			open: p,
			onOpenChange: d,
			onOpenToggle: s.useCallback(() => d((m) => !m), [d]),
			modal: u,
			children: c.jsx(pt, {
				...l,
				open: p,
				onOpenChange: d,
				dir: o,
				modal: u,
				children: t,
			}),
		});
	};
Qe.displayName = Q;
var en = "DropdownMenuTrigger",
	nn = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, disabled: o = !1, ...r } = n,
			a = Je(en, t),
			i = w(t);
		return c.jsx(ft, {
			asChild: !0,
			...i,
			children: c.jsx(j.button, {
				type: "button",
				id: a.triggerId,
				"aria-haspopup": "menu",
				"aria-expanded": a.open,
				"aria-controls": a.open ? a.contentId : void 0,
				"data-state": a.open ? "open" : "closed",
				"data-disabled": o ? "" : void 0,
				disabled: o,
				...r,
				ref: Ce(e, a.triggerRef),
				onPointerDown: g(n.onPointerDown, (u) => {
					!o &&
						u.button === 0 &&
						u.ctrlKey === !1 &&
						(a.onOpenToggle(), a.open || u.preventDefault());
				}),
				onKeyDown: g(n.onKeyDown, (u) => {
					o ||
						(["Enter", " "].includes(u.key) && a.onOpenToggle(),
						u.key === "ArrowDown" && a.onOpenChange(!0),
						["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
				}),
			}),
		});
	});
nn.displayName = en;
var It = "DropdownMenuPortal",
	tn = (n) => {
		const { __scopeDropdownMenu: e, ...t } = n,
			o = w(e);
		return c.jsx(mt, { ...o, ...t });
	};
tn.displayName = It;
var on = "DropdownMenuContent",
	rn = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = Je(on, t),
			a = w(t),
			i = s.useRef(!1);
		return c.jsx(vt, {
			id: r.contentId,
			"aria-labelledby": r.triggerId,
			...a,
			...o,
			ref: e,
			onCloseAutoFocus: g(n.onCloseAutoFocus, (u) => {
				var l;
				i.current || (l = r.triggerRef.current) == null || l.focus(),
					(i.current = !1),
					u.preventDefault();
			}),
			onInteractOutside: g(n.onInteractOutside, (u) => {
				const l = u.detail.originalEvent,
					v = l.button === 0 && l.ctrlKey === !0,
					p = l.button === 2 || v;
				(!r.modal || p) && (i.current = !0);
			}),
			style: {
				...n.style,
				"--radix-dropdown-menu-content-transform-origin":
					"var(--radix-popper-transform-origin)",
				"--radix-dropdown-menu-content-available-width":
					"var(--radix-popper-available-width)",
				"--radix-dropdown-menu-content-available-height":
					"var(--radix-popper-available-height)",
				"--radix-dropdown-menu-trigger-width":
					"var(--radix-popper-anchor-width)",
				"--radix-dropdown-menu-trigger-height":
					"var(--radix-popper-anchor-height)",
			},
		});
	});
rn.displayName = on;
var Nt = "DropdownMenuGroup",
	an = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(gt, { ...r, ...o, ref: e });
	});
an.displayName = Nt;
var Tt = "DropdownMenuLabel",
	sn = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(Mt, { ...r, ...o, ref: e });
	});
sn.displayName = Tt;
var Ot = "DropdownMenuItem",
	cn = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(ht, { ...r, ...o, ref: e });
	});
cn.displayName = Ot;
var jt = "DropdownMenuCheckboxItem",
	At = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(wt, { ...r, ...o, ref: e });
	});
At.displayName = jt;
var kt = "DropdownMenuRadioGroup",
	Lt = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(xt, { ...r, ...o, ref: e });
	});
Lt.displayName = kt;
var Ft = "DropdownMenuRadioItem",
	Gt = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(Ct, { ...r, ...o, ref: e });
	});
Gt.displayName = Ft;
var $t = "DropdownMenuItemIndicator",
	Kt = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(_t, { ...r, ...o, ref: e });
	});
Kt.displayName = $t;
var Ut = "DropdownMenuSeparator",
	un = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(Rt, { ...r, ...o, ref: e });
	});
un.displayName = Ut;
var Vt = "DropdownMenuArrow",
	Bt = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(bt, { ...r, ...o, ref: e });
	});
Bt.displayName = Vt;
var Wt = (n) => {
		const {
				__scopeDropdownMenu: e,
				children: t,
				open: o,
				onOpenChange: r,
				defaultOpen: a,
			} = n,
			i = w(e),
			[u, l] = _e({
				prop: o,
				defaultProp: a ?? !1,
				onChange: r,
				caller: "DropdownMenuSub",
			});
		return c.jsx(St, { ...i, open: u, onOpenChange: l, children: t });
	},
	zt = "DropdownMenuSubTrigger",
	dn = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(Dt, { ...r, ...o, ref: e });
	});
dn.displayName = zt;
var Ht = "DropdownMenuSubContent",
	ln = s.forwardRef((n, e) => {
		const { __scopeDropdownMenu: t, ...o } = n,
			r = w(t);
		return c.jsx(Et, {
			...r,
			...o,
			ref: e,
			style: {
				...n.style,
				"--radix-dropdown-menu-content-transform-origin":
					"var(--radix-popper-transform-origin)",
				"--radix-dropdown-menu-content-available-width":
					"var(--radix-popper-available-width)",
				"--radix-dropdown-menu-content-available-height":
					"var(--radix-popper-available-height)",
				"--radix-dropdown-menu-trigger-width":
					"var(--radix-popper-anchor-width)",
				"--radix-dropdown-menu-trigger-height":
					"var(--radix-popper-anchor-height)",
			},
		});
	});
ln.displayName = Ht;
var Xt = Qe,
	Yt = nn,
	Zt = tn,
	qt = rn,
	Jt = an,
	Qt = sn,
	eo = cn,
	no = un,
	to = Wt,
	oo = dn,
	ro = ln;
function wo(n) {
	const e = R.c(4);
	let t;
	e[0] !== n ? (({ ...t } = n), (e[0] = n), (e[1] = t)) : (t = e[1]);
	let o;
	return (
		e[2] !== t
			? ((o = c.jsx(Xt, { "data-slot": "dropdown-menu", ...t })),
				(e[2] = t),
				(e[3] = o))
			: (o = e[3]),
		o
	);
}
function xo(n) {
	const e = R.c(4);
	let t;
	e[0] !== n ? (({ ...t } = n), (e[0] = n), (e[1] = t)) : (t = e[1]);
	let o;
	return (
		e[2] !== t
			? ((o = c.jsx(Yt, { "data-slot": "dropdown-menu-trigger", ...t })),
				(e[2] = t),
				(e[3] = o))
			: (o = e[3]),
		o
	);
}
function Co(n) {
	const e = R.c(10);
	let t, o, r;
	e[0] !== n
		? (({ className: t, sideOffset: r, ...o } = n),
			(e[0] = n),
			(e[1] = t),
			(e[2] = o),
			(e[3] = r))
		: ((t = e[1]), (o = e[2]), (r = e[3]));
	const a = r === void 0 ? 4 : r;
	let i;
	e[4] !== t
		? ((i = O(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
				t,
			)),
			(e[4] = t),
			(e[5] = i))
		: (i = e[5]);
	let u;
	return (
		e[6] !== o || e[7] !== a || e[8] !== i
			? ((u = c.jsx(Zt, {
					children: c.jsx(qt, {
						"data-slot": "dropdown-menu-content",
						sideOffset: a,
						className: i,
						...o,
					}),
				})),
				(e[6] = o),
				(e[7] = a),
				(e[8] = i),
				(e[9] = u))
			: (u = e[9]),
		u
	);
}
function _o(n) {
	const e = R.c(4);
	let t;
	e[0] !== n ? (({ ...t } = n), (e[0] = n), (e[1] = t)) : (t = e[1]);
	let o;
	return (
		e[2] !== t
			? ((o = c.jsx(Jt, { "data-slot": "dropdown-menu-group", ...t })),
				(e[2] = t),
				(e[3] = o))
			: (o = e[3]),
		o
	);
}
function Ro(n) {
	const e = R.c(12);
	let t, o, r, a;
	e[0] !== n
		? (({ className: t, inset: o, variant: a, ...r } = n),
			(e[0] = n),
			(e[1] = t),
			(e[2] = o),
			(e[3] = r),
			(e[4] = a))
		: ((t = e[1]), (o = e[2]), (r = e[3]), (a = e[4]));
	const i = a === void 0 ? "default" : a;
	let u;
	e[5] !== t
		? ((u = O(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				t,
			)),
			(e[5] = t),
			(e[6] = u))
		: (u = e[6]);
	let l;
	return (
		e[7] !== o || e[8] !== r || e[9] !== u || e[10] !== i
			? ((l = c.jsx(eo, {
					"data-slot": "dropdown-menu-item",
					"data-inset": o,
					"data-variant": i,
					className: u,
					...r,
				})),
				(e[7] = o),
				(e[8] = r),
				(e[9] = u),
				(e[10] = i),
				(e[11] = l))
			: (l = e[11]),
		l
	);
}
function bo(n) {
	const e = R.c(10);
	let t, o, r;
	e[0] !== n
		? (({ className: t, inset: o, ...r } = n),
			(e[0] = n),
			(e[1] = t),
			(e[2] = o),
			(e[3] = r))
		: ((t = e[1]), (o = e[2]), (r = e[3]));
	let a;
	e[4] !== t
		? ((a = O("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", t)),
			(e[4] = t),
			(e[5] = a))
		: (a = e[5]);
	let i;
	return (
		e[6] !== o || e[7] !== r || e[8] !== a
			? ((i = c.jsx(Qt, {
					"data-slot": "dropdown-menu-label",
					"data-inset": o,
					className: a,
					...r,
				})),
				(e[6] = o),
				(e[7] = r),
				(e[8] = a),
				(e[9] = i))
			: (i = e[9]),
		i
	);
}
function So(n) {
	const e = R.c(8);
	let t, o;
	e[0] !== n
		? (({ className: t, ...o } = n), (e[0] = n), (e[1] = t), (e[2] = o))
		: ((t = e[1]), (o = e[2]));
	let r;
	e[3] !== t
		? ((r = O("bg-border -mx-1 my-1 h-px", t)), (e[3] = t), (e[4] = r))
		: (r = e[4]);
	let a;
	return (
		e[5] !== o || e[6] !== r
			? ((a = c.jsx(no, {
					"data-slot": "dropdown-menu-separator",
					className: r,
					...o,
				})),
				(e[5] = o),
				(e[6] = r),
				(e[7] = a))
			: (a = e[7]),
		a
	);
}
function Do(n) {
	const e = R.c(4);
	let t;
	e[0] !== n ? (({ ...t } = n), (e[0] = n), (e[1] = t)) : (t = e[1]);
	let o;
	return (
		e[2] !== t
			? ((o = c.jsx(to, { "data-slot": "dropdown-menu-sub", ...t })),
				(e[2] = t),
				(e[3] = o))
			: (o = e[3]),
		o
	);
}
function Eo(n) {
	const e = R.c(13);
	let t, o, r, a;
	e[0] !== n
		? (({ className: o, inset: r, children: t, ...a } = n),
			(e[0] = n),
			(e[1] = t),
			(e[2] = o),
			(e[3] = r),
			(e[4] = a))
		: ((t = e[1]), (o = e[2]), (r = e[3]), (a = e[4]));
	let i;
	e[5] !== o
		? ((i = O(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
				o,
			)),
			(e[5] = o),
			(e[6] = i))
		: (i = e[6]);
	let u;
	e[7] === Symbol.for("react.memo_cache_sentinel")
		? ((u = c.jsx(Tn, { className: "ml-auto size-4" })), (e[7] = u))
		: (u = e[7]);
	let l;
	return (
		e[8] !== t || e[9] !== r || e[10] !== a || e[11] !== i
			? ((l = c.jsxs(oo, {
					"data-slot": "dropdown-menu-sub-trigger",
					"data-inset": r,
					className: i,
					...a,
					children: [t, u],
				})),
				(e[8] = t),
				(e[9] = r),
				(e[10] = a),
				(e[11] = i),
				(e[12] = l))
			: (l = e[12]),
		l
	);
}
function yo(n) {
	const e = R.c(8);
	let t, o;
	e[0] !== n
		? (({ className: t, ...o } = n), (e[0] = n), (e[1] = t), (e[2] = o))
		: ((t = e[1]), (o = e[2]));
	let r;
	e[3] !== t
		? ((r = O(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
				t,
			)),
			(e[3] = t),
			(e[4] = r))
		: (r = e[4]);
	let a;
	return (
		e[5] !== o || e[6] !== r
			? ((a = c.jsx(ro, {
					"data-slot": "dropdown-menu-sub-content",
					className: r,
					...o,
				})),
				(e[5] = o),
				(e[6] = r),
				(e[7] = a))
			: (a = e[7]),
		a
	);
}
export {
	Ro as D,
	xo as a,
	wo as b,
	Co as c,
	bo as d,
	So as e,
	Eo as f,
	_o as g,
	Do as h,
	yo as i,
};
