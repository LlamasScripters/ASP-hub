import { d as Re, P as j } from "./index-Bv1xjdPd.js";
import { u as Le } from "./index-DauBq6FI.js";
import { u as F } from "./index-Dl_6cIao.js";
import { c as V } from "./index-Dqr9Wf5M.js";
import { T as Pe, j as U, r as c, H as ee } from "./index-kb-Ylywn.js";
function Oe(e, t = globalThis == null ? void 0 : globalThis.document) {
	const n = F(e);
	c.useEffect(() => {
		const r = (o) => {
			o.key === "Escape" && n(o);
		};
		return (
			t.addEventListener("keydown", r, { capture: !0 }),
			() => t.removeEventListener("keydown", r, { capture: !0 })
		);
	}, [n, t]);
}
var Te = "DismissableLayer",
	$ = "dismissableLayer.update",
	Ae = "dismissableLayer.pointerDownOutside",
	ke = "dismissableLayer.focusOutside",
	te,
	ve = c.createContext({
		layers: new Set(),
		layersWithOutsidePointerEventsDisabled: new Set(),
		branches: new Set(),
	}),
	Ne = c.forwardRef((e, t) => {
		const {
				disableOutsidePointerEvents: n = !1,
				onEscapeKeyDown: r,
				onPointerDownOutside: o,
				onFocusOutside: i,
				onInteractOutside: s,
				onDismiss: a,
				...b
			} = e,
			f = c.useContext(ve),
			[l, v] = c.useState(null),
			h =
				(l == null ? void 0 : l.ownerDocument) ??
				(globalThis == null ? void 0 : globalThis.document),
			[, p] = c.useState({}),
			C = ee(t, (y) => v(y)),
			u = Array.from(f.layers),
			[d] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1),
			m = u.indexOf(d),
			S = l ? u.indexOf(l) : -1,
			E = f.layersWithOutsidePointerEventsDisabled.size > 0,
			g = S >= m,
			w = De((y) => {
				const L = y.target,
					x = [...f.branches].some((K) => K.contains(L));
				!g ||
					x ||
					(o == null || o(y),
					s == null || s(y),
					y.defaultPrevented || a == null || a());
			}, h),
			R = Me((y) => {
				const L = y.target;
				[...f.branches].some((K) => K.contains(L)) ||
					(i == null || i(y),
					s == null || s(y),
					y.defaultPrevented || a == null || a());
			}, h);
		return (
			Oe((y) => {
				S === f.layers.size - 1 &&
					(r == null || r(y),
					!y.defaultPrevented && a && (y.preventDefault(), a()));
			}, h),
			c.useEffect(() => {
				if (l)
					return (
						n &&
							(f.layersWithOutsidePointerEventsDisabled.size === 0 &&
								((te = h.body.style.pointerEvents),
								(h.body.style.pointerEvents = "none")),
							f.layersWithOutsidePointerEventsDisabled.add(l)),
						f.layers.add(l),
						ne(),
						() => {
							n &&
								f.layersWithOutsidePointerEventsDisabled.size === 1 &&
								(h.body.style.pointerEvents = te);
						}
					);
			}, [l, h, n, f]),
			c.useEffect(
				() => () => {
					l &&
						(f.layers.delete(l),
						f.layersWithOutsidePointerEventsDisabled.delete(l),
						ne());
				},
				[l, f],
			),
			c.useEffect(() => {
				const y = () => p({});
				return (
					document.addEventListener($, y),
					() => document.removeEventListener($, y)
				);
			}, []),
			U.jsx(j.div, {
				...b,
				ref: C,
				style: {
					pointerEvents: E ? (g ? "auto" : "none") : void 0,
					...e.style,
				},
				onFocusCapture: V(e.onFocusCapture, R.onFocusCapture),
				onBlurCapture: V(e.onBlurCapture, R.onBlurCapture),
				onPointerDownCapture: V(e.onPointerDownCapture, w.onPointerDownCapture),
			})
		);
	});
Ne.displayName = Te;
var xe = "DismissableLayerBranch",
	Fe = c.forwardRef((e, t) => {
		const n = c.useContext(ve),
			r = c.useRef(null),
			o = ee(t, r);
		return (
			c.useEffect(() => {
				const i = r.current;
				if (i)
					return (
						n.branches.add(i),
						() => {
							n.branches.delete(i);
						}
					);
			}, [n.branches]),
			U.jsx(j.div, { ...e, ref: o })
		);
	});
Fe.displayName = xe;
function De(e, t = globalThis == null ? void 0 : globalThis.document) {
	const n = F(e),
		r = c.useRef(!1),
		o = c.useRef(() => {});
	return (
		c.useEffect(() => {
			const i = (a) => {
					if (a.target && !r.current) {
						const b = () => {
							he(Ae, n, f, { discrete: !0 });
						};
						const f = { originalEvent: a };
						a.pointerType === "touch"
							? (t.removeEventListener("click", o.current),
								(o.current = b),
								t.addEventListener("click", o.current, { once: !0 }))
							: b();
					} else t.removeEventListener("click", o.current);
					r.current = !1;
				},
				s = window.setTimeout(() => {
					t.addEventListener("pointerdown", i);
				}, 0);
			return () => {
				window.clearTimeout(s),
					t.removeEventListener("pointerdown", i),
					t.removeEventListener("click", o.current);
			};
		}, [t, n]),
		{ onPointerDownCapture: () => (r.current = !0) }
	);
}
function Me(e, t = globalThis == null ? void 0 : globalThis.document) {
	const n = F(e),
		r = c.useRef(!1);
	return (
		c.useEffect(() => {
			const o = (i) => {
				i.target &&
					!r.current &&
					he(ke, n, { originalEvent: i }, { discrete: !1 });
			};
			return (
				t.addEventListener("focusin", o),
				() => t.removeEventListener("focusin", o)
			);
		}, [t, n]),
		{
			onFocusCapture: () => (r.current = !0),
			onBlurCapture: () => (r.current = !1),
		}
	);
}
function ne() {
	const e = new CustomEvent($);
	document.dispatchEvent(e);
}
function he(e, t, n, { discrete: r }) {
	const o = n.originalEvent.target,
		i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
	t && o.addEventListener(e, t, { once: !0 }),
		r ? Re(o, i) : o.dispatchEvent(i);
}
var X = "focusScope.autoFocusOnMount",
	Y = "focusScope.autoFocusOnUnmount",
	re = { bubbles: !1, cancelable: !0 },
	Ie = "FocusScope",
	Be = c.forwardRef((e, t) => {
		const {
				loop: n = !1,
				trapped: r = !1,
				onMountAutoFocus: o,
				onUnmountAutoFocus: i,
				...s
			} = e,
			[a, b] = c.useState(null),
			f = F(o),
			l = F(i),
			v = c.useRef(null),
			h = ee(t, (u) => b(u)),
			p = c.useRef({
				paused: !1,
				pause() {
					this.paused = !0;
				},
				resume() {
					this.paused = !1;
				},
			}).current;
		c.useEffect(() => {
			if (r) {
				const u = (E) => {
						if (p.paused || !a) return;
						const g = E.target;
						a.contains(g) ? (v.current = g) : O(v.current, { select: !0 });
					},
					d = (E) => {
						if (p.paused || !a) return;
						const g = E.relatedTarget;
						g !== null && (a.contains(g) || O(v.current, { select: !0 }));
					},
					m = (E) => {
						if (document.activeElement === document.body)
							for (const w of E) w.removedNodes.length > 0 && O(a);
					};
				document.addEventListener("focusin", u),
					document.addEventListener("focusout", d);
				const S = new MutationObserver(m);
				return (
					a && S.observe(a, { childList: !0, subtree: !0 }),
					() => {
						document.removeEventListener("focusin", u),
							document.removeEventListener("focusout", d),
							S.disconnect();
					}
				);
			}
		}, [r, a, p.paused]),
			c.useEffect(() => {
				if (a) {
					oe.add(p);
					const u = document.activeElement;
					if (!a.contains(u)) {
						const m = new CustomEvent(X, re);
						a.addEventListener(X, f),
							a.dispatchEvent(m),
							m.defaultPrevented ||
								(We(Ke(me(a)), { select: !0 }),
								document.activeElement === u && O(a));
					}
					return () => {
						a.removeEventListener(X, f),
							setTimeout(() => {
								const m = new CustomEvent(Y, re);
								a.addEventListener(Y, l),
									a.dispatchEvent(m),
									m.defaultPrevented || O(u ?? document.body, { select: !0 }),
									a.removeEventListener(Y, l),
									oe.remove(p);
							}, 0);
					};
				}
			}, [a, f, l, p]);
		const C = c.useCallback(
			(u) => {
				if ((!n && !r) || p.paused) return;
				const d = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey,
					m = document.activeElement;
				if (d && m) {
					const S = u.currentTarget,
						[E, g] = _e(S);
					E && g
						? !u.shiftKey && m === g
							? (u.preventDefault(), n && O(E, { select: !0 }))
							: u.shiftKey &&
								m === E &&
								(u.preventDefault(), n && O(g, { select: !0 }))
						: m === S && u.preventDefault();
				}
			},
			[n, r, p.paused],
		);
		return U.jsx(j.div, { tabIndex: -1, ...s, ref: h, onKeyDown: C });
	});
Be.displayName = Ie;
function We(e, { select: t = !1 } = {}) {
	const n = document.activeElement;
	for (const r of e)
		if ((O(r, { select: t }), document.activeElement !== n)) return;
}
function _e(e) {
	const t = me(e),
		n = ae(t, e),
		r = ae(t.reverse(), e);
	return [n, r];
}
function me(e) {
	const t = [],
		n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
			acceptNode: (r) => {
				const o = r.tagName === "INPUT" && r.type === "hidden";
				return r.disabled || r.hidden || o
					? NodeFilter.FILTER_SKIP
					: r.tabIndex >= 0
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_SKIP;
			},
		});
	while (n.nextNode()) t.push(n.currentNode);
	return t;
}
function ae(e, t) {
	for (const n of e) if (!Ue(n, { upTo: t })) return n;
}
function Ue(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	while (e) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function je(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function O(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		const n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && je(e) && t && e.select();
	}
}
var oe = He();
function He() {
	let e = [];
	return {
		add(t) {
			const n = e[0];
			t !== n && (n == null || n.pause()), (e = ie(e, t)), e.unshift(t);
		},
		remove(t) {
			var n;
			(e = ie(e, t)), (n = e[0]) == null || n.resume();
		},
	};
}
function ie(e, t) {
	const n = [...e],
		r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Ke(e) {
	return e.filter((t) => t.tagName !== "A");
}
var Ve = "Portal",
	Xe = c.forwardRef((e, t) => {
		var a;
		const { container: n, ...r } = e,
			[o, i] = c.useState(!1);
		Le(() => i(!0), []);
		const s =
			n ||
			(o &&
				((a = globalThis == null ? void 0 : globalThis.document) == null
					? void 0
					: a.body));
		return s ? Pe.createPortal(U.jsx(j.div, { ...r, ref: t }), s) : null;
	});
Xe.displayName = Ve;
var z = 0;
function Bt() {
	c.useEffect(() => {
		const e = document.querySelectorAll("[data-radix-focus-guard]");
		return (
			document.body.insertAdjacentElement("afterbegin", e[0] ?? ce()),
			document.body.insertAdjacentElement("beforeend", e[1] ?? ce()),
			z++,
			() => {
				z === 1 &&
					document
						.querySelectorAll("[data-radix-focus-guard]")
						.forEach((t) => t.remove()),
					z--;
			}
		);
	}, []);
}
function ce() {
	const e = document.createElement("span");
	return (
		e.setAttribute("data-radix-focus-guard", ""),
		(e.tabIndex = 0),
		(e.style.outline = "none"),
		(e.style.opacity = "0"),
		(e.style.position = "fixed"),
		(e.style.pointerEvents = "none"),
		e
	);
}
var P = function () {
	return (
		(P =
			Object.assign ||
			((t) => {
				for (var n, r = 1, o = arguments.length; r < o; r++) {
					n = arguments[r];
					for (var i in n)
						Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
				}
				return t;
			})),
		P.apply(this, arguments)
	);
};
function pe(e, t) {
	var n = {};
	for (var r in e)
		Object.prototype.hasOwnProperty.call(e, r) &&
			t.indexOf(r) < 0 &&
			(n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function")
		for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
			t.indexOf(r[o]) < 0 &&
				Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
				(n[r[o]] = e[r[o]]);
	return n;
}
function Wt(e, t, n, r) {
	function o(i) {
		return i instanceof n
			? i
			: new n((s) => {
					s(i);
				});
	}
	return new (n || (n = Promise))((i, s) => {
		function a(l) {
			try {
				f(r.next(l));
			} catch (v) {
				s(v);
			}
		}
		function b(l) {
			try {
				f(r.throw(l));
			} catch (v) {
				s(v);
			}
		}
		function f(l) {
			l.done ? i(l.value) : o(l.value).then(a, b);
		}
		f((r = r.apply(e, t || [])).next());
	});
}
function Ye(e, t, n) {
	if (n || arguments.length === 2)
		for (var r = 0, o = t.length, i; r < o; r++)
			(i || !(r in t)) &&
				(i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
	return e.concat(i || Array.prototype.slice.call(t));
}
var W = "right-scroll-bar-position",
	_ = "width-before-scroll-bar",
	ze = "with-scroll-bars-hidden",
	Ge = "--removed-body-scroll-bar-size";
function G(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ze(e, t) {
	var n = c.useState(() => ({
		value: e,
		callback: t,
		facade: {
			get current() {
				return n.value;
			},
			set current(r) {
				var o = n.value;
				o !== r && ((n.value = r), n.callback(r, o));
			},
		},
	}))[0];
	return (n.callback = t), n.facade;
}
var qe = typeof window < "u" ? c.useLayoutEffect : c.useEffect,
	ue = new WeakMap();
function Qe(e, t) {
	var n = Ze(null, (r) => e.forEach((o) => G(o, r)));
	return (
		qe(() => {
			var r = ue.get(n);
			if (r) {
				var o = new Set(r),
					i = new Set(e),
					s = n.current;
				o.forEach((a) => {
					i.has(a) || G(a, null);
				}),
					i.forEach((a) => {
						o.has(a) || G(a, s);
					});
			}
			ue.set(n, e);
		}, [e]),
		n
	);
}
function $e(e) {
	return e;
}
function Je(e, t) {
	t === void 0 && (t = $e);
	var n = [],
		r = !1,
		o = {
			read: () => {
				if (r)
					throw new Error(
						"Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
					);
				return n.length ? n[n.length - 1] : e;
			},
			useMedium: (i) => {
				var s = t(i, r);
				return (
					n.push(s),
					() => {
						n = n.filter((a) => a !== s);
					}
				);
			},
			assignSyncMedium: (i) => {
				for (r = !0; n.length; ) {
					var s = n;
					(n = []), s.forEach(i);
				}
				n = { push: (a) => i(a), filter: () => n };
			},
			assignMedium: (i) => {
				r = !0;
				var s = [];
				if (n.length) {
					var a = n;
					(n = []), a.forEach(i), (s = n);
				}
				var b = () => {
						var l = s;
						(s = []), l.forEach(i);
					},
					f = () => Promise.resolve().then(b);
				f(),
					(n = {
						push: (l) => {
							s.push(l), f();
						},
						filter: (l) => ((s = s.filter(l)), n),
					});
			},
		};
	return o;
}
function et(e) {
	e === void 0 && (e = {});
	var t = Je(null);
	return (t.options = P({ async: !0, ssr: !1 }, e)), t;
}
var ye = (e) => {
	var t = e.sideCar,
		n = pe(e, ["sideCar"]);
	if (!t)
		throw new Error(
			"Sidecar: please provide `sideCar` property to import the right car",
		);
	var r = t.read();
	if (!r) throw new Error("Sidecar medium not found");
	return c.createElement(r, P({}, n));
};
ye.isSideCarExport = !0;
function tt(e, t) {
	return e.useMedium(t), ye;
}
var Ee = et(),
	Z = () => {},
	H = c.forwardRef((e, t) => {
		var n = c.useRef(null),
			r = c.useState({
				onScrollCapture: Z,
				onWheelCapture: Z,
				onTouchMoveCapture: Z,
			}),
			o = r[0],
			i = r[1],
			s = e.forwardProps,
			a = e.children,
			b = e.className,
			f = e.removeScrollBar,
			l = e.enabled,
			v = e.shards,
			h = e.sideCar,
			p = e.noIsolation,
			C = e.inert,
			u = e.allowPinchZoom,
			d = e.as,
			m = d === void 0 ? "div" : d,
			S = e.gapMode,
			E = pe(e, [
				"forwardProps",
				"children",
				"className",
				"removeScrollBar",
				"enabled",
				"shards",
				"sideCar",
				"noIsolation",
				"inert",
				"allowPinchZoom",
				"as",
				"gapMode",
			]),
			g = h,
			w = Qe([n, t]),
			R = P(P({}, E), o);
		return c.createElement(
			c.Fragment,
			null,
			l &&
				c.createElement(g, {
					sideCar: Ee,
					removeScrollBar: f,
					shards: v,
					noIsolation: p,
					inert: C,
					setCallbacks: i,
					allowPinchZoom: !!u,
					lockRef: n,
					gapMode: S,
				}),
			s
				? c.cloneElement(c.Children.only(a), P(P({}, R), { ref: w }))
				: c.createElement(m, P({}, R, { className: b, ref: w }), a),
		);
	});
H.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
H.classNames = { fullWidth: _, zeroRight: W };
var nt = () => {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function rt() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = nt();
	return t && e.setAttribute("nonce", t), e;
}
function at(e, t) {
	e.styleSheet
		? (e.styleSheet.cssText = t)
		: e.appendChild(document.createTextNode(t));
}
function ot(e) {
	var t = document.head || document.getElementsByTagName("head")[0];
	t.appendChild(e);
}
var it = () => {
		var e = 0,
			t = null;
		return {
			add: (n) => {
				e == 0 && (t = rt()) && (at(t, n), ot(t)), e++;
			},
			remove: () => {
				e--,
					!e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
			},
		};
	},
	ct = () => {
		var e = it();
		return (t, n) => {
			c.useEffect(
				() => (
					e.add(t),
					() => {
						e.remove();
					}
				),
				[t && n],
			);
		};
	},
	ge = () => {
		var e = ct(),
			t = (n) => {
				var r = n.styles,
					o = n.dynamic;
				return e(r, o), null;
			};
		return t;
	},
	ut = { left: 0, top: 0, right: 0, gap: 0 },
	q = (e) => Number.parseInt(e || "", 10) || 0,
	st = (e) => {
		var t = window.getComputedStyle(document.body),
			n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
			r = t[e === "padding" ? "paddingTop" : "marginTop"],
			o = t[e === "padding" ? "paddingRight" : "marginRight"];
		return [q(n), q(r), q(o)];
	},
	lt = (e) => {
		if ((e === void 0 && (e = "margin"), typeof window > "u")) return ut;
		var t = st(e),
			n = document.documentElement.clientWidth,
			r = window.innerWidth;
		return {
			left: t[0],
			top: t[1],
			right: t[2],
			gap: Math.max(0, r - n + t[2] - t[0]),
		};
	},
	ft = ge(),
	N = "data-scroll-locked",
	dt = (e, t, n, r) => {
		var o = e.left,
			i = e.top,
			s = e.right,
			a = e.gap;
		return (
			n === void 0 && (n = "margin"),
			`
  .`
				.concat(
					ze,
					` {
   overflow: hidden `,
				)
				.concat(
					r,
					`;
   padding-right: `,
				)
				.concat(a, "px ")
				.concat(
					r,
					`;
  }
  body[`,
				)
				.concat(
					N,
					`] {
    overflow: hidden `,
				)
				.concat(
					r,
					`;
    overscroll-behavior: contain;
    `,
				)
				.concat(
					[
						t && "position: relative ".concat(r, ";"),
						n === "margin" &&
							`
    padding-left: `
								.concat(
									o,
									`px;
    padding-top: `,
								)
								.concat(
									i,
									`px;
    padding-right: `,
								)
								.concat(
									s,
									`px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
								)
								.concat(a, "px ")
								.concat(
									r,
									`;
    `,
								),
						n === "padding" &&
							"padding-right: ".concat(a, "px ").concat(r, ";"),
					]
						.filter(Boolean)
						.join(""),
					`
  }
  
  .`,
				)
				.concat(
					W,
					` {
    right: `,
				)
				.concat(a, "px ")
				.concat(
					r,
					`;
  }
  
  .`,
				)
				.concat(
					_,
					` {
    margin-right: `,
				)
				.concat(a, "px ")
				.concat(
					r,
					`;
  }
  
  .`,
				)
				.concat(W, " .")
				.concat(
					W,
					` {
    right: 0 `,
				)
				.concat(
					r,
					`;
  }
  
  .`,
				)
				.concat(_, " .")
				.concat(
					_,
					` {
    margin-right: 0 `,
				)
				.concat(
					r,
					`;
  }
  
  body[`,
				)
				.concat(
					N,
					`] {
    `,
				)
				.concat(Ge, ": ")
				.concat(
					a,
					`px;
  }
`,
				)
		);
	},
	se = () => {
		var e = Number.parseInt(document.body.getAttribute(N) || "0", 10);
		return isFinite(e) ? e : 0;
	},
	vt = () => {
		c.useEffect(
			() => (
				document.body.setAttribute(N, (se() + 1).toString()),
				() => {
					var e = se() - 1;
					e <= 0
						? document.body.removeAttribute(N)
						: document.body.setAttribute(N, e.toString());
				}
			),
			[],
		);
	},
	ht = (e) => {
		var t = e.noRelative,
			n = e.noImportant,
			r = e.gapMode,
			o = r === void 0 ? "margin" : r;
		vt();
		var i = c.useMemo(() => lt(o), [o]);
		return c.createElement(ft, { styles: dt(i, !t, o, n ? "" : "!important") });
	},
	J = !1;
if (typeof window < "u")
	try {
		var D = Object.defineProperty({}, "passive", { get: () => ((J = !0), !0) });
		window.addEventListener("test", D, D),
			window.removeEventListener("test", D, D);
	} catch {
		J = !1;
	}
var T = J ? { passive: !1 } : !1,
	mt = (e) => e.tagName === "TEXTAREA",
	be = (e, t) => {
		if (!(e instanceof Element)) return !1;
		var n = window.getComputedStyle(e);
		return (
			n[t] !== "hidden" &&
			!(n.overflowY === n.overflowX && !mt(e) && n[t] === "visible")
		);
	},
	pt = (e) => be(e, "overflowY"),
	yt = (e) => be(e, "overflowX"),
	le = (e, t) => {
		var n = t.ownerDocument,
			r = t;
		do {
			typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
			var o = we(e, r);
			if (o) {
				var i = Se(e, r),
					s = i[1],
					a = i[2];
				if (s > a) return !0;
			}
			r = r.parentNode;
		} while (r && r !== n.body);
		return !1;
	},
	Et = (e) => {
		var t = e.scrollTop,
			n = e.scrollHeight,
			r = e.clientHeight;
		return [t, n, r];
	},
	gt = (e) => {
		var t = e.scrollLeft,
			n = e.scrollWidth,
			r = e.clientWidth;
		return [t, n, r];
	},
	we = (e, t) => (e === "v" ? pt(t) : yt(t)),
	Se = (e, t) => (e === "v" ? Et(t) : gt(t)),
	bt = (e, t) => (e === "h" && t === "rtl" ? -1 : 1),
	wt = (e, t, n, r, o) => {
		var i = bt(e, window.getComputedStyle(t).direction),
			s = i * r,
			a = n.target,
			b = t.contains(a),
			f = !1,
			l = s > 0,
			v = 0,
			h = 0;
		do {
			var p = Se(e, a),
				C = p[0],
				u = p[1],
				d = p[2],
				m = u - d - i * C;
			(C || m) && we(e, a) && ((v += m), (h += C)),
				a instanceof ShadowRoot ? (a = a.host) : (a = a.parentNode);
		} while ((!b && a !== document.body) || (b && (t.contains(a) || t === a)));
		return ((l && Math.abs(v) < 1) || (!l && Math.abs(h) < 1)) && (f = !0), f;
	},
	M = (e) =>
		"changedTouches" in e
			? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
			: [0, 0],
	fe = (e) => [e.deltaX, e.deltaY],
	de = (e) => (e && "current" in e ? e.current : e),
	St = (e, t) => e[0] === t[0] && e[1] === t[1],
	Ct = (e) =>
		`
  .block-interactivity-`
			.concat(
				e,
				` {pointer-events: none;}
  .allow-interactivity-`,
			)
			.concat(
				e,
				` {pointer-events: all;}
`,
			),
	Pt = 0,
	A = [];
function Rt(e) {
	var t = c.useRef([]),
		n = c.useRef([0, 0]),
		r = c.useRef(),
		o = c.useState(Pt++)[0],
		i = c.useState(ge)[0],
		s = c.useRef(e);
	c.useEffect(() => {
		s.current = e;
	}, [e]),
		c.useEffect(() => {
			if (e.inert) {
				document.body.classList.add("block-interactivity-".concat(o));
				var u = Ye([e.lockRef.current], (e.shards || []).map(de), !0).filter(
					Boolean,
				);
				return (
					u.forEach((d) => d.classList.add("allow-interactivity-".concat(o))),
					() => {
						document.body.classList.remove("block-interactivity-".concat(o)),
							u.forEach((d) =>
								d.classList.remove("allow-interactivity-".concat(o)),
							);
					}
				);
			}
		}, [e.inert, e.lockRef.current, e.shards]);
	var a = c.useCallback((u, d) => {
			if (
				("touches" in u && u.touches.length === 2) ||
				(u.type === "wheel" && u.ctrlKey)
			)
				return !s.current.allowPinchZoom;
			var m = M(u),
				S = n.current,
				E = "deltaX" in u ? u.deltaX : S[0] - m[0],
				g = "deltaY" in u ? u.deltaY : S[1] - m[1],
				w,
				R = u.target,
				y = Math.abs(E) > Math.abs(g) ? "h" : "v";
			if ("touches" in u && y === "h" && R.type === "range") return !1;
			var L = le(y, R);
			if (!L) return !0;
			if ((L ? (w = y) : ((w = y === "v" ? "h" : "v"), (L = le(y, R))), !L))
				return !1;
			if (
				(!r.current && "changedTouches" in u && (E || g) && (r.current = w), !w)
			)
				return !0;
			var x = r.current || w;
			return wt(x, d, u, x === "h" ? E : g);
		}, []),
		b = c.useCallback((u) => {
			var d = u;
			if (!(!A.length || A[A.length - 1] !== i)) {
				var m = "deltaY" in d ? fe(d) : M(d),
					S = t.current.filter(
						(w) =>
							w.name === d.type &&
							(w.target === d.target || d.target === w.shadowParent) &&
							St(w.delta, m),
					)[0];
				if (S && S.should) {
					d.cancelable && d.preventDefault();
					return;
				}
				if (!S) {
					var E = (s.current.shards || [])
							.map(de)
							.filter(Boolean)
							.filter((w) => w.contains(d.target)),
						g = E.length > 0 ? a(d, E[0]) : !s.current.noIsolation;
					g && d.cancelable && d.preventDefault();
				}
			}
		}, []),
		f = c.useCallback((u, d, m, S) => {
			var E = { name: u, delta: d, target: m, should: S, shadowParent: Lt(m) };
			t.current.push(E),
				setTimeout(() => {
					t.current = t.current.filter((g) => g !== E);
				}, 1);
		}, []),
		l = c.useCallback((u) => {
			(n.current = M(u)), (r.current = void 0);
		}, []),
		v = c.useCallback((u) => {
			f(u.type, fe(u), u.target, a(u, e.lockRef.current));
		}, []),
		h = c.useCallback((u) => {
			f(u.type, M(u), u.target, a(u, e.lockRef.current));
		}, []);
	c.useEffect(
		() => (
			A.push(i),
			e.setCallbacks({
				onScrollCapture: v,
				onWheelCapture: v,
				onTouchMoveCapture: h,
			}),
			document.addEventListener("wheel", b, T),
			document.addEventListener("touchmove", b, T),
			document.addEventListener("touchstart", l, T),
			() => {
				(A = A.filter((u) => u !== i)),
					document.removeEventListener("wheel", b, T),
					document.removeEventListener("touchmove", b, T),
					document.removeEventListener("touchstart", l, T);
			}
		),
		[],
	);
	var p = e.removeScrollBar,
		C = e.inert;
	return c.createElement(
		c.Fragment,
		null,
		C ? c.createElement(i, { styles: Ct(o) }) : null,
		p ? c.createElement(ht, { gapMode: e.gapMode }) : null,
	);
}
function Lt(e) {
	for (var t = null; e !== null; )
		e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
	return t;
}
const Ot = tt(Ee, Rt);
var Tt = c.forwardRef((e, t) =>
	c.createElement(H, P({}, e, { ref: t, sideCar: Ot })),
);
Tt.classNames = H.classNames;
var At = (e) => {
		if (typeof document > "u") return null;
		var t = Array.isArray(e) ? e[0] : e;
		return t.ownerDocument.body;
	},
	k = new WeakMap(),
	I = new WeakMap(),
	B = {},
	Q = 0,
	Ce = (e) => e && (e.host || Ce(e.parentNode)),
	kt = (e, t) =>
		t
			.map((n) => {
				if (e.contains(n)) return n;
				var r = Ce(n);
				return r && e.contains(r)
					? r
					: (console.error(
							"aria-hidden",
							n,
							"in not contained inside",
							e,
							". Doing nothing",
						),
						null);
			})
			.filter((n) => !!n),
	Nt = (e, t, n, r) => {
		var o = kt(t, Array.isArray(e) ? e : [e]);
		B[n] || (B[n] = new WeakMap());
		var i = B[n],
			s = [],
			a = new Set(),
			b = new Set(o),
			f = (v) => {
				!v || a.has(v) || (a.add(v), f(v.parentNode));
			};
		o.forEach(f);
		var l = (v) => {
			!v ||
				b.has(v) ||
				Array.prototype.forEach.call(v.children, (h) => {
					if (a.has(h)) l(h);
					else
						try {
							var p = h.getAttribute(r),
								C = p !== null && p !== "false",
								u = (k.get(h) || 0) + 1,
								d = (i.get(h) || 0) + 1;
							k.set(h, u),
								i.set(h, d),
								s.push(h),
								u === 1 && C && I.set(h, !0),
								d === 1 && h.setAttribute(n, "true"),
								C || h.setAttribute(r, "true");
						} catch (m) {
							console.error("aria-hidden: cannot operate on ", h, m);
						}
				});
		};
		return (
			l(t),
			a.clear(),
			Q++,
			() => {
				s.forEach((v) => {
					var h = k.get(v) - 1,
						p = i.get(v) - 1;
					k.set(v, h),
						i.set(v, p),
						h || (I.has(v) || v.removeAttribute(r), I.delete(v)),
						p || v.removeAttribute(n);
				}),
					Q--,
					Q ||
						((k = new WeakMap()),
						(k = new WeakMap()),
						(I = new WeakMap()),
						(B = {}));
			}
		);
	},
	_t = (e, t, n) => {
		n === void 0 && (n = "data-aria-hidden");
		var r = Array.from(Array.isArray(e) ? e : [e]),
			o = At(e);
		return o
			? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))),
				Nt(r, o, n, "aria-hidden"))
			: () => null;
	};
export { Ne as D, Be as F, Xe as P, Tt as R, Wt as _, _t as h, Bt as u };
