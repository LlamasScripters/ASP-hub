import { u as Le } from "./index-8ZKmGdXm.js";
import { P as bt } from "./index-Bv1xjdPd.js";
import { c as Ee, u as _t } from "./index-DauBq6FI.js";
import { u as De } from "./index-Dl_6cIao.js";
import { H as Kt, r as P, U as Se, j as X } from "./index-kb-Ylywn.js";
const Te = ["top", "right", "bottom", "left"],
	Z = Math.min,
	H = Math.max,
	ft = Math.round,
	lt = Math.floor,
	z = (t) => ({ x: t, y: t }),
	Me = { left: "right", right: "left", bottom: "top", top: "bottom" },
	$e = { start: "end", end: "start" };
function yt(t, e, n) {
	return H(t, Z(e, n));
}
function q(t, e) {
	return typeof t == "function" ? t(e) : t;
}
function U(t) {
	return t.split("-")[0];
}
function tt(t) {
	return t.split("-")[1];
}
function Rt(t) {
	return t === "x" ? "y" : "x";
}
function Pt(t) {
	return t === "y" ? "height" : "width";
}
const ke = new Set(["top", "bottom"]);
function V(t) {
	return ke.has(U(t)) ? "y" : "x";
}
function Ct(t) {
	return Rt(V(t));
}
function Ne(t, e, n) {
	n === void 0 && (n = !1);
	const o = tt(t),
		i = Ct(t),
		r = Pt(i);
	let s =
		i === "x"
			? o === (n ? "end" : "start")
				? "right"
				: "left"
			: o === "start"
				? "bottom"
				: "top";
	return e.reference[r] > e.floating[r] && (s = ut(s)), [s, ut(s)];
}
function Fe(t) {
	const e = ut(t);
	return [vt(t), e, vt(e)];
}
function vt(t) {
	return t.replace(/start|end/g, (e) => $e[e]);
}
const Bt = ["left", "right"],
	jt = ["right", "left"],
	He = ["top", "bottom"],
	We = ["bottom", "top"];
function _e(t, e, n) {
	switch (t) {
		case "top":
		case "bottom":
			return n ? (e ? jt : Bt) : e ? Bt : jt;
		case "left":
		case "right":
			return e ? He : We;
		default:
			return [];
	}
}
function Be(t, e, n, o) {
	const i = tt(t);
	let r = _e(U(t), n === "start", o);
	return (
		i && ((r = r.map((s) => s + "-" + i)), e && (r = r.concat(r.map(vt)))), r
	);
}
function ut(t) {
	return t.replace(/left|right|bottom|top/g, (e) => Me[e]);
}
function je(t) {
	return { top: 0, right: 0, bottom: 0, left: 0, ...t };
}
function Gt(t) {
	return typeof t != "number"
		? je(t)
		: { top: t, right: t, bottom: t, left: t };
}
function dt(t) {
	const { x: e, y: n, width: o, height: i } = t;
	return {
		width: o,
		height: i,
		top: n,
		left: e,
		right: e + o,
		bottom: n + i,
		x: e,
		y: n,
	};
}
function Vt(t, e, n) {
	const { reference: o, floating: i } = t;
	const r = V(e),
		s = Ct(e),
		c = Pt(s),
		a = U(e),
		l = r === "y",
		f = o.x + o.width / 2 - i.width / 2,
		u = o.y + o.height / 2 - i.height / 2,
		p = o[c] / 2 - i[c] / 2;
	let d;
	switch (a) {
		case "top":
			d = { x: f, y: o.y - i.height };
			break;
		case "bottom":
			d = { x: f, y: o.y + o.height };
			break;
		case "right":
			d = { x: o.x + o.width, y: u };
			break;
		case "left":
			d = { x: o.x - i.width, y: u };
			break;
		default:
			d = { x: o.x, y: o.y };
	}
	switch (tt(e)) {
		case "start":
			d[s] -= p * (n && l ? -1 : 1);
			break;
		case "end":
			d[s] += p * (n && l ? -1 : 1);
			break;
	}
	return d;
}
const Ve = async (t, e, n) => {
	const {
			placement: o = "bottom",
			strategy: i = "absolute",
			middleware: r = [],
			platform: s,
		} = n,
		c = r.filter(Boolean),
		a = await (s.isRTL == null ? void 0 : s.isRTL(e));
	let l = await s.getElementRects({ reference: t, floating: e, strategy: i }),
		{ x: f, y: u } = Vt(l, o, a),
		p = o,
		d = {},
		m = 0;
	for (let h = 0; h < c.length; h++) {
		const { name: w, fn: g } = c[h],
			{
				x,
				y: A,
				data: y,
				reset: v,
			} = await g({
				x: f,
				y: u,
				initialPlacement: o,
				placement: p,
				strategy: i,
				middlewareData: d,
				rects: l,
				platform: s,
				elements: { reference: t, floating: e },
			});
		(f = x ?? f),
			(u = A ?? u),
			(d = { ...d, [w]: { ...d[w], ...y } }),
			v &&
				m <= 50 &&
				(m++,
				typeof v == "object" &&
					(v.placement && (p = v.placement),
					v.rects &&
						(l =
							v.rects === !0
								? await s.getElementRects({
										reference: t,
										floating: e,
										strategy: i,
									})
								: v.rects),
					({ x: f, y: u } = Vt(l, p, a))),
				(h = -1));
	}
	return { x: f, y: u, placement: p, strategy: i, middlewareData: d };
};
async function ot(t, e) {
	var n;
	e === void 0 && (e = {});
	const { x: o, y: i, platform: r, rects: s, elements: c, strategy: a } = t,
		{
			boundary: l = "clippingAncestors",
			rootBoundary: f = "viewport",
			elementContext: u = "floating",
			altBoundary: p = !1,
			padding: d = 0,
		} = q(e, t),
		m = Gt(d),
		w = c[p ? (u === "floating" ? "reference" : "floating") : u],
		g = dt(
			await r.getClippingRect({
				element:
					(n = await (r.isElement == null ? void 0 : r.isElement(w))) == null ||
					n
						? w
						: w.contextElement ||
							(await (r.getDocumentElement == null
								? void 0
								: r.getDocumentElement(c.floating))),
				boundary: l,
				rootBoundary: f,
				strategy: a,
			}),
		),
		x =
			u === "floating"
				? { x: o, y: i, width: s.floating.width, height: s.floating.height }
				: s.reference,
		A = await (r.getOffsetParent == null
			? void 0
			: r.getOffsetParent(c.floating)),
		y = (await (r.isElement == null ? void 0 : r.isElement(A)))
			? (await (r.getScale == null ? void 0 : r.getScale(A))) || { x: 1, y: 1 }
			: { x: 1, y: 1 },
		v = dt(
			r.convertOffsetParentRelativeRectToViewportRelativeRect
				? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: c,
						rect: x,
						offsetParent: A,
						strategy: a,
					})
				: x,
		);
	return {
		top: (g.top - v.top + m.top) / y.y,
		bottom: (v.bottom - g.bottom + m.bottom) / y.y,
		left: (g.left - v.left + m.left) / y.x,
		right: (v.right - g.right + m.right) / y.x,
	};
}
const ze = (t) => ({
		name: "arrow",
		options: t,
		async fn(e) {
			const {
					x: n,
					y: o,
					placement: i,
					rects: r,
					platform: s,
					elements: c,
					middlewareData: a,
				} = e,
				{ element: l, padding: f = 0 } = q(t, e) || {};
			if (l == null) return {};
			const u = Gt(f),
				p = { x: n, y: o },
				d = Ct(i),
				m = Pt(d),
				h = await s.getDimensions(l),
				w = d === "y",
				g = w ? "top" : "left",
				x = w ? "bottom" : "right",
				A = w ? "clientHeight" : "clientWidth",
				y = r.reference[m] + r.reference[d] - p[d] - r.floating[m],
				v = p[d] - r.reference[d],
				R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
			let C = R ? R[A] : 0;
			(!C || !(await (s.isElement == null ? void 0 : s.isElement(R)))) &&
				(C = c.floating[A] || r.floating[m]);
			const T = y / 2 - v / 2,
				N = C / 2 - h[m] / 2 - 1,
				L = Z(u[g], N),
				$ = Z(u[x], N),
				k = L,
				S = C - h[m] - $,
				O = C / 2 - h[m] / 2 + T,
				F = yt(k, O, S),
				E =
					!a.arrow &&
					tt(i) != null &&
					O !== F &&
					r.reference[m] / 2 - (O < k ? L : $) - h[m] / 2 < 0,
				D = E ? (O < k ? O - k : O - S) : 0;
			return {
				[d]: p[d] + D,
				data: {
					[d]: F,
					centerOffset: O - F - D,
					...(E && { alignmentOffset: D }),
				},
				reset: E,
			};
		},
	}),
	Ie = (t) => (
		t === void 0 && (t = {}),
		{
			name: "flip",
			options: t,
			async fn(e) {
				var n, o;
				const {
						placement: i,
						middlewareData: r,
						rects: s,
						initialPlacement: c,
						platform: a,
						elements: l,
					} = e,
					{
						mainAxis: f = !0,
						crossAxis: u = !0,
						fallbackPlacements: p,
						fallbackStrategy: d = "bestFit",
						fallbackAxisSideDirection: m = "none",
						flipAlignment: h = !0,
						...w
					} = q(t, e);
				if ((n = r.arrow) != null && n.alignmentOffset) return {};
				const g = U(i),
					x = V(c),
					A = U(c) === c,
					y = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)),
					v = p || (A || !h ? [ut(c)] : Fe(c)),
					R = m !== "none";
				!p && R && v.push(...Be(c, h, m, y));
				const C = [c, ...v],
					T = await ot(e, w),
					N = [];
				let L = ((o = r.flip) == null ? void 0 : o.overflows) || [];
				if ((f && N.push(T[g]), u)) {
					const O = Ne(i, s, y);
					N.push(T[O[0]], T[O[1]]);
				}
				if (
					((L = [...L, { placement: i, overflows: N }]),
					!N.every((O) => O <= 0))
				) {
					var $, k;
					const O = ((($ = r.flip) == null ? void 0 : $.index) || 0) + 1,
						F = C[O];
					if (
						F &&
						(!(u === "alignment" ? x !== V(F) : !1) ||
							L.every((b) => b.overflows[0] > 0 && V(b.placement) === x))
					)
						return {
							data: { index: O, overflows: L },
							reset: { placement: F },
						};
					let E =
						(k = L.filter((D) => D.overflows[0] <= 0).sort(
							(D, b) => D.overflows[1] - b.overflows[1],
						)[0]) == null
							? void 0
							: k.placement;
					if (!E)
						switch (d) {
							case "bestFit": {
								var S;
								const D =
									(S = L.filter((b) => {
										if (R) {
											const M = V(b.placement);
											return M === x || M === "y";
										}
										return !0;
									})
										.map((b) => [
											b.placement,
											b.overflows
												.filter((M) => M > 0)
												.reduce((M, j) => M + j, 0),
										])
										.sort((b, M) => b[1] - M[1])[0]) == null
										? void 0
										: S[0];
								D && (E = D);
								break;
							}
							case "initialPlacement":
								E = c;
								break;
						}
					if (i !== E) return { reset: { placement: E } };
				}
				return {};
			},
		}
	);
function zt(t, e) {
	return {
		top: t.top - e.height,
		right: t.right - e.width,
		bottom: t.bottom - e.height,
		left: t.left - e.width,
	};
}
function It(t) {
	return Te.some((e) => t[e] >= 0);
}
const Ye = (t) => (
		t === void 0 && (t = {}),
		{
			name: "hide",
			options: t,
			async fn(e) {
				const { rects: n } = e,
					{ strategy: o = "referenceHidden", ...i } = q(t, e);
				switch (o) {
					case "referenceHidden": {
						const r = await ot(e, { ...i, elementContext: "reference" }),
							s = zt(r, n.reference);
						return {
							data: { referenceHiddenOffsets: s, referenceHidden: It(s) },
						};
					}
					case "escaped": {
						const r = await ot(e, { ...i, altBoundary: !0 }),
							s = zt(r, n.floating);
						return { data: { escapedOffsets: s, escaped: It(s) } };
					}
					default:
						return {};
				}
			},
		}
	),
	Jt = new Set(["left", "top"]);
async function Xe(t, e) {
	const { placement: n, platform: o, elements: i } = t,
		r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)),
		s = U(n),
		c = tt(n),
		a = V(n) === "y",
		l = Jt.has(s) ? -1 : 1,
		f = r && a ? -1 : 1,
		u = q(e, t);
	let {
		mainAxis: p,
		crossAxis: d,
		alignmentAxis: m,
	} = typeof u == "number"
		? { mainAxis: u, crossAxis: 0, alignmentAxis: null }
		: {
				mainAxis: u.mainAxis || 0,
				crossAxis: u.crossAxis || 0,
				alignmentAxis: u.alignmentAxis,
			};
	return (
		c && typeof m == "number" && (d = c === "end" ? m * -1 : m),
		a ? { x: d * f, y: p * l } : { x: p * l, y: d * f }
	);
}
const qe = (t) => (
		t === void 0 && (t = 0),
		{
			name: "offset",
			options: t,
			async fn(e) {
				var n, o;
				const { x: i, y: r, placement: s, middlewareData: c } = e,
					a = await Xe(e, t);
				return s === ((n = c.offset) == null ? void 0 : n.placement) &&
					(o = c.arrow) != null &&
					o.alignmentOffset
					? {}
					: { x: i + a.x, y: r + a.y, data: { ...a, placement: s } };
			},
		}
	),
	Ue = (t) => (
		t === void 0 && (t = {}),
		{
			name: "shift",
			options: t,
			async fn(e) {
				const { x: n, y: o, placement: i } = e,
					{
						mainAxis: r = !0,
						crossAxis: s = !1,
						limiter: c = {
							fn: (w) => {
								const { x: g, y: x } = w;
								return { x: g, y: x };
							},
						},
						...a
					} = q(t, e),
					l = { x: n, y: o },
					f = await ot(e, a),
					u = V(U(i)),
					p = Rt(u);
				let d = l[p],
					m = l[u];
				if (r) {
					const w = p === "y" ? "top" : "left",
						g = p === "y" ? "bottom" : "right",
						x = d + f[w],
						A = d - f[g];
					d = yt(x, d, A);
				}
				if (s) {
					const w = u === "y" ? "top" : "left",
						g = u === "y" ? "bottom" : "right",
						x = m + f[w],
						A = m - f[g];
					m = yt(x, m, A);
				}
				const h = c.fn({ ...e, [p]: d, [u]: m });
				return {
					...h,
					data: { x: h.x - n, y: h.y - o, enabled: { [p]: r, [u]: s } },
				};
			},
		}
	),
	Ze = (t) => (
		t === void 0 && (t = {}),
		{
			options: t,
			fn(e) {
				const { x: n, y: o, placement: i, rects: r, middlewareData: s } = e,
					{ offset: c = 0, mainAxis: a = !0, crossAxis: l = !0 } = q(t, e),
					f = { x: n, y: o },
					u = V(i),
					p = Rt(u);
				let d = f[p],
					m = f[u];
				const h = q(c, e),
					w =
						typeof h == "number"
							? { mainAxis: h, crossAxis: 0 }
							: { mainAxis: 0, crossAxis: 0, ...h };
				if (a) {
					const A = p === "y" ? "height" : "width",
						y = r.reference[p] - r.floating[A] + w.mainAxis,
						v = r.reference[p] + r.reference[A] - w.mainAxis;
					d < y ? (d = y) : d > v && (d = v);
				}
				if (l) {
					var g, x;
					const A = p === "y" ? "width" : "height",
						y = Jt.has(U(i)),
						v =
							r.reference[u] -
							r.floating[A] +
							((y && ((g = s.offset) == null ? void 0 : g[u])) || 0) +
							(y ? 0 : w.crossAxis),
						R =
							r.reference[u] +
							r.reference[A] +
							(y ? 0 : ((x = s.offset) == null ? void 0 : x[u]) || 0) -
							(y ? w.crossAxis : 0);
					m < v ? (m = v) : m > R && (m = R);
				}
				return { [p]: d, [u]: m };
			},
		}
	),
	Ke = (t) => (
		t === void 0 && (t = {}),
		{
			name: "size",
			options: t,
			async fn(e) {
				var n, o;
				const { placement: i, rects: r, platform: s, elements: c } = e,
					{ apply: a = () => {}, ...l } = q(t, e),
					f = await ot(e, l),
					u = U(i),
					p = tt(i),
					d = V(i) === "y",
					{ width: m, height: h } = r.floating;
				let w, g;
				u === "top" || u === "bottom"
					? ((w = u),
						(g =
							p ===
							((await (s.isRTL == null ? void 0 : s.isRTL(c.floating)))
								? "start"
								: "end")
								? "left"
								: "right"))
					: ((g = u), (w = p === "end" ? "top" : "bottom"));
				const x = h - f.top - f.bottom,
					A = m - f.left - f.right,
					y = Z(h - f[w], x),
					v = Z(m - f[g], A),
					R = !e.middlewareData.shift;
				let C = y,
					T = v;
				if (
					((n = e.middlewareData.shift) != null && n.enabled.x && (T = A),
					(o = e.middlewareData.shift) != null && o.enabled.y && (C = x),
					R && !p)
				) {
					const L = H(f.left, 0),
						$ = H(f.right, 0),
						k = H(f.top, 0),
						S = H(f.bottom, 0);
					d
						? (T = m - 2 * (L !== 0 || $ !== 0 ? L + $ : H(f.left, f.right)))
						: (C = h - 2 * (k !== 0 || S !== 0 ? k + S : H(f.top, f.bottom)));
				}
				await a({ ...e, availableWidth: T, availableHeight: C });
				const N = await s.getDimensions(c.floating);
				return m !== N.width || h !== N.height ? { reset: { rects: !0 } } : {};
			},
		}
	);
function pt() {
	return typeof window < "u";
}
function et(t) {
	return Qt(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function W(t) {
	var e;
	return (
		(t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) ||
		window
	);
}
function Y(t) {
	var e;
	return (e = (Qt(t) ? t.ownerDocument : t.document) || window.document) == null
		? void 0
		: e.documentElement;
}
function Qt(t) {
	return pt() ? t instanceof Node || t instanceof W(t).Node : !1;
}
function _(t) {
	return pt() ? t instanceof Element || t instanceof W(t).Element : !1;
}
function I(t) {
	return pt() ? t instanceof HTMLElement || t instanceof W(t).HTMLElement : !1;
}
function Yt(t) {
	return !pt() || typeof ShadowRoot > "u"
		? !1
		: t instanceof ShadowRoot || t instanceof W(t).ShadowRoot;
}
const Ge = new Set(["inline", "contents"]);
function rt(t) {
	const { overflow: e, overflowX: n, overflowY: o, display: i } = B(t);
	return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !Ge.has(i);
}
const Je = new Set(["table", "td", "th"]);
function Qe(t) {
	return Je.has(et(t));
}
const tn = [":popover-open", ":modal"];
function ht(t) {
	return tn.some((e) => {
		try {
			return t.matches(e);
		} catch {
			return !1;
		}
	});
}
const en = ["transform", "translate", "scale", "rotate", "perspective"],
	nn = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
	on = ["paint", "layout", "strict", "content"];
function Ot(t) {
	const e = St(),
		n = _(t) ? B(t) : t;
	return (
		en.some((o) => (n[o] ? n[o] !== "none" : !1)) ||
		(n.containerType ? n.containerType !== "normal" : !1) ||
		(!e && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
		(!e && (n.filter ? n.filter !== "none" : !1)) ||
		nn.some((o) => (n.willChange || "").includes(o)) ||
		on.some((o) => (n.contain || "").includes(o))
	);
}
function rn(t) {
	let e = K(t);
	while (I(e) && !Q(e)) {
		if (Ot(e)) return e;
		if (ht(e)) return null;
		e = K(e);
	}
	return null;
}
function St() {
	return typeof CSS > "u" || !CSS.supports
		? !1
		: CSS.supports("-webkit-backdrop-filter", "none");
}
const sn = new Set(["html", "body", "#document"]);
function Q(t) {
	return sn.has(et(t));
}
function B(t) {
	return W(t).getComputedStyle(t);
}
function gt(t) {
	return _(t)
		? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
		: { scrollLeft: t.scrollX, scrollTop: t.scrollY };
}
function K(t) {
	if (et(t) === "html") return t;
	const e = t.assignedSlot || t.parentNode || (Yt(t) && t.host) || Y(t);
	return Yt(e) ? e.host : e;
}
function te(t) {
	const e = K(t);
	return Q(e)
		? t.ownerDocument
			? t.ownerDocument.body
			: t.body
		: I(e) && rt(e)
			? e
			: te(e);
}
function it(t, e, n) {
	var o;
	e === void 0 && (e = []), n === void 0 && (n = !0);
	const i = te(t),
		r = i === ((o = t.ownerDocument) == null ? void 0 : o.body),
		s = W(i);
	if (r) {
		const c = At(s);
		return e.concat(
			s,
			s.visualViewport || [],
			rt(i) ? i : [],
			c && n ? it(c) : [],
		);
	}
	return e.concat(i, it(i, [], n));
}
function At(t) {
	return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function ee(t) {
	const e = B(t);
	let n = Number.parseFloat(e.width) || 0,
		o = Number.parseFloat(e.height) || 0;
	const i = I(t),
		r = i ? t.offsetWidth : n,
		s = i ? t.offsetHeight : o,
		c = ft(n) !== r || ft(o) !== s;
	return c && ((n = r), (o = s)), { width: n, height: o, $: c };
}
function Et(t) {
	return _(t) ? t : t.contextElement;
}
function J(t) {
	const e = Et(t);
	if (!I(e)) return z(1);
	const n = e.getBoundingClientRect(),
		{ width: o, height: i, $: r } = ee(e);
	let s = (r ? ft(n.width) : n.width) / o,
		c = (r ? ft(n.height) : n.height) / i;
	return (
		(!s || !Number.isFinite(s)) && (s = 1),
		(!c || !Number.isFinite(c)) && (c = 1),
		{ x: s, y: c }
	);
}
const cn = z(0);
function ne(t) {
	const e = W(t);
	return !St() || !e.visualViewport
		? cn
		: { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop };
}
function ln(t, e, n) {
	return e === void 0 && (e = !1), !n || (e && n !== W(t)) ? !1 : e;
}
function G(t, e, n, o) {
	e === void 0 && (e = !1), n === void 0 && (n = !1);
	const i = t.getBoundingClientRect(),
		r = Et(t);
	let s = z(1);
	e && (o ? _(o) && (s = J(o)) : (s = J(t)));
	const c = ln(r, n, o) ? ne(r) : z(0);
	let a = (i.left + c.x) / s.x,
		l = (i.top + c.y) / s.y,
		f = i.width / s.x,
		u = i.height / s.y;
	if (r) {
		const p = W(r),
			d = o && _(o) ? W(o) : o;
		let m = p,
			h = At(m);
		while (h && o && d !== m) {
			const w = J(h),
				g = h.getBoundingClientRect(),
				x = B(h),
				A = g.left + (h.clientLeft + Number.parseFloat(x.paddingLeft)) * w.x,
				y = g.top + (h.clientTop + Number.parseFloat(x.paddingTop)) * w.y;
			(a *= w.x),
				(l *= w.y),
				(f *= w.x),
				(u *= w.y),
				(a += A),
				(l += y),
				(m = W(h)),
				(h = At(m));
		}
	}
	return dt({ width: f, height: u, x: a, y: l });
}
function Dt(t, e) {
	const n = gt(t).scrollLeft;
	return e ? e.left + n : G(Y(t)).left + n;
}
function oe(t, e, n) {
	n === void 0 && (n = !1);
	const o = t.getBoundingClientRect(),
		i = o.left + e.scrollLeft - (n ? 0 : Dt(t, o)),
		r = o.top + e.scrollTop;
	return { x: i, y: r };
}
function an(t) {
	const { elements: e, rect: n, offsetParent: o, strategy: i } = t;
	const r = i === "fixed",
		s = Y(o),
		c = e ? ht(e.floating) : !1;
	if (o === s || (c && r)) return n;
	let a = { scrollLeft: 0, scrollTop: 0 },
		l = z(1);
	const f = z(0),
		u = I(o);
	if ((u || (!u && !r)) && ((et(o) !== "body" || rt(s)) && (a = gt(o)), I(o))) {
		const d = G(o);
		(l = J(o)), (f.x = d.x + o.clientLeft), (f.y = d.y + o.clientTop);
	}
	const p = s && !u && !r ? oe(s, a, !0) : z(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - a.scrollLeft * l.x + f.x + p.x,
		y: n.y * l.y - a.scrollTop * l.y + f.y + p.y,
	};
}
function fn(t) {
	return Array.from(t.getClientRects());
}
function un(t) {
	const e = Y(t),
		n = gt(t),
		o = t.ownerDocument.body,
		i = H(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth),
		r = H(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
	let s = -n.scrollLeft + Dt(t);
	const c = -n.scrollTop;
	return (
		B(o).direction === "rtl" && (s += H(e.clientWidth, o.clientWidth) - i),
		{ width: i, height: r, x: s, y: c }
	);
}
function dn(t, e) {
	const n = W(t),
		o = Y(t),
		i = n.visualViewport;
	let r = o.clientWidth,
		s = o.clientHeight,
		c = 0,
		a = 0;
	if (i) {
		(r = i.width), (s = i.height);
		const l = St();
		(!l || (l && e === "fixed")) && ((c = i.offsetLeft), (a = i.offsetTop));
	}
	return { width: r, height: s, x: c, y: a };
}
const mn = new Set(["absolute", "fixed"]);
function pn(t, e) {
	const n = G(t, !0, e === "fixed"),
		o = n.top + t.clientTop,
		i = n.left + t.clientLeft,
		r = I(t) ? J(t) : z(1),
		s = t.clientWidth * r.x,
		c = t.clientHeight * r.y,
		a = i * r.x,
		l = o * r.y;
	return { width: s, height: c, x: a, y: l };
}
function Xt(t, e, n) {
	let o;
	if (e === "viewport") o = dn(t, n);
	else if (e === "document") o = un(Y(t));
	else if (_(e)) o = pn(e, n);
	else {
		const i = ne(t);
		o = { x: e.x - i.x, y: e.y - i.y, width: e.width, height: e.height };
	}
	return dt(o);
}
function ie(t, e) {
	const n = K(t);
	return n === e || !_(n) || Q(n) ? !1 : B(n).position === "fixed" || ie(n, e);
}
function hn(t, e) {
	const n = e.get(t);
	if (n) return n;
	let o = it(t, [], !1).filter((c) => _(c) && et(c) !== "body"),
		i = null;
	const r = B(t).position === "fixed";
	let s = r ? K(t) : t;
	while (_(s) && !Q(s)) {
		const c = B(s),
			a = Ot(s);
		!a && c.position === "fixed" && (i = null),
			(
				r
					? !a && !i
					: (!a && c.position === "static" && !!i && mn.has(i.position)) ||
						(rt(s) && !a && ie(t, s))
			)
				? (o = o.filter((f) => f !== s))
				: (i = c),
			(s = K(s));
	}
	return e.set(t, o), o;
}
function gn(t) {
	const { element: e, boundary: n, rootBoundary: o, strategy: i } = t;
	const s = [
			...(n === "clippingAncestors"
				? ht(e)
					? []
					: hn(e, this._c)
				: [].concat(n)),
			o,
		],
		c = s[0],
		a = s.reduce(
			(l, f) => {
				const u = Xt(e, f, i);
				return (
					(l.top = H(u.top, l.top)),
					(l.right = Z(u.right, l.right)),
					(l.bottom = Z(u.bottom, l.bottom)),
					(l.left = H(u.left, l.left)),
					l
				);
			},
			Xt(e, c, i),
		);
	return {
		width: a.right - a.left,
		height: a.bottom - a.top,
		x: a.left,
		y: a.top,
	};
}
function wn(t) {
	const { width: e, height: n } = ee(t);
	return { width: e, height: n };
}
function xn(t, e, n) {
	const o = I(e),
		i = Y(e),
		r = n === "fixed",
		s = G(t, !0, r, e);
	let c = { scrollLeft: 0, scrollTop: 0 };
	const a = z(0);
	function l() {
		a.x = Dt(i);
	}
	if (o || (!o && !r))
		if (((et(e) !== "body" || rt(i)) && (c = gt(e)), o)) {
			const d = G(e, !0, r, e);
			(a.x = d.x + e.clientLeft), (a.y = d.y + e.clientTop);
		} else i && l();
	r && !o && i && l();
	const f = i && !o && !r ? oe(i, c) : z(0),
		u = s.left + c.scrollLeft - a.x - f.x,
		p = s.top + c.scrollTop - a.y - f.y;
	return { x: u, y: p, width: s.width, height: s.height };
}
function wt(t) {
	return B(t).position === "static";
}
function qt(t, e) {
	if (!I(t) || B(t).position === "fixed") return null;
	if (e) return e(t);
	let n = t.offsetParent;
	return Y(t) === n && (n = n.ownerDocument.body), n;
}
function re(t, e) {
	const n = W(t);
	if (ht(t)) return n;
	if (!I(t)) {
		let i = K(t);
		while (i && !Q(i)) {
			if (_(i) && !wt(i)) return i;
			i = K(i);
		}
		return n;
	}
	let o = qt(t, e);
	while (o && Qe(o) && wt(o)) o = qt(o, e);
	return o && Q(o) && wt(o) && !Ot(o) ? n : o || rn(t) || n;
}
const yn = async function (t) {
	const e = this.getOffsetParent || re,
		n = this.getDimensions,
		o = await n(t.floating);
	return {
		reference: xn(t.reference, await e(t.floating), t.strategy),
		floating: { x: 0, y: 0, width: o.width, height: o.height },
	};
};
function vn(t) {
	return B(t).direction === "rtl";
}
const An = {
	convertOffsetParentRelativeRectToViewportRelativeRect: an,
	getDocumentElement: Y,
	getClippingRect: gn,
	getOffsetParent: re,
	getElementRects: yn,
	getClientRects: fn,
	getDimensions: wn,
	getScale: J,
	isElement: _,
	isRTL: vn,
};
function se(t, e) {
	return (
		t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height
	);
}
function bn(t, e) {
	let n = null,
		o;
	const i = Y(t);
	function r() {
		var c;
		clearTimeout(o), (c = n) == null || c.disconnect(), (n = null);
	}
	function s(c, a) {
		c === void 0 && (c = !1), a === void 0 && (a = 1), r();
		const l = t.getBoundingClientRect(),
			{ left: f, top: u, width: p, height: d } = l;
		if ((c || e(), !p || !d)) return;
		const m = lt(u),
			h = lt(i.clientWidth - (f + p)),
			w = lt(i.clientHeight - (u + d)),
			g = lt(f),
			A = {
				rootMargin: -m + "px " + -h + "px " + -w + "px " + -g + "px",
				threshold: H(0, Z(1, a)) || 1,
			};
		let y = !0;
		function v(R) {
			const C = R[0].intersectionRatio;
			if (C !== a) {
				if (!y) return s();
				C
					? s(!1, C)
					: (o = setTimeout(() => {
							s(!1, 1e-7);
						}, 1e3));
			}
			C === 1 && !se(l, t.getBoundingClientRect()) && s(), (y = !1);
		}
		try {
			n = new IntersectionObserver(v, { ...A, root: i.ownerDocument });
		} catch {
			n = new IntersectionObserver(v, A);
		}
		n.observe(t);
	}
	return s(!0), r;
}
function Rn(t, e, n, o) {
	o === void 0 && (o = {});
	const {
			ancestorScroll: i = !0,
			ancestorResize: r = !0,
			elementResize: s = typeof ResizeObserver == "function",
			layoutShift: c = typeof IntersectionObserver == "function",
			animationFrame: a = !1,
		} = o,
		l = Et(t),
		f = i || r ? [...(l ? it(l) : []), ...it(e)] : [];
	f.forEach((g) => {
		i && g.addEventListener("scroll", n, { passive: !0 }),
			r && g.addEventListener("resize", n);
	});
	const u = l && c ? bn(l, n) : null;
	let p = -1,
		d = null;
	s &&
		((d = new ResizeObserver((g) => {
			const [x] = g;
			x &&
				x.target === l &&
				d &&
				(d.unobserve(e),
				cancelAnimationFrame(p),
				(p = requestAnimationFrame(() => {
					var A;
					(A = d) == null || A.observe(e);
				}))),
				n();
		})),
		l && !a && d.observe(l),
		d.observe(e));
	let m,
		h = a ? G(t) : null;
	a && w();
	function w() {
		const g = G(t);
		h && !se(h, g) && n(), (h = g), (m = requestAnimationFrame(w));
	}
	return (
		n(),
		() => {
			var g;
			f.forEach((x) => {
				i && x.removeEventListener("scroll", n),
					r && x.removeEventListener("resize", n);
			}),
				u == null || u(),
				(g = d) == null || g.disconnect(),
				(d = null),
				a && cancelAnimationFrame(m);
		}
	);
}
const Pn = qe,
	Cn = Ue,
	On = Ie,
	Sn = Ke,
	En = Ye,
	Ut = ze,
	Dn = Ze,
	Ln = (t, e, n) => {
		const o = new Map(),
			i = { platform: An, ...n },
			r = { ...i.platform, _c: o };
		return Ve(t, e, { ...i, platform: r });
	};
var Tn = typeof document < "u",
	Mn = () => {},
	at = Tn ? P.useLayoutEffect : Mn;
function mt(t, e) {
	if (t === e) return !0;
	if (typeof t != typeof e) return !1;
	if (typeof t == "function" && t.toString() === e.toString()) return !0;
	let n, o, i;
	if (t && e && typeof t == "object") {
		if (Array.isArray(t)) {
			if (((n = t.length), n !== e.length)) return !1;
			for (o = n; o-- !== 0; ) if (!mt(t[o], e[o])) return !1;
			return !0;
		}
		if (((i = Object.keys(t)), (n = i.length), n !== Object.keys(e).length))
			return !1;
		for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(e, i[o])) return !1;
		for (o = n; o-- !== 0; ) {
			const r = i[o];
			if (!(r === "_owner" && t.$$typeof) && !mt(t[r], e[r])) return !1;
		}
		return !0;
	}
	return t !== t && e !== e;
}
function ce(t) {
	return typeof window > "u"
		? 1
		: (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Zt(t, e) {
	const n = ce(t);
	return Math.round(e * n) / n;
}
function xt(t) {
	const e = P.useRef(t);
	return (
		at(() => {
			e.current = t;
		}),
		e
	);
}
function $n(t) {
	t === void 0 && (t = {});
	const {
			placement: e = "bottom",
			strategy: n = "absolute",
			middleware: o = [],
			platform: i,
			elements: { reference: r, floating: s } = {},
			transform: c = !0,
			whileElementsMounted: a,
			open: l,
		} = t,
		[f, u] = P.useState({
			x: 0,
			y: 0,
			strategy: n,
			placement: e,
			middlewareData: {},
			isPositioned: !1,
		}),
		[p, d] = P.useState(o);
	mt(p, o) || d(o);
	const [m, h] = P.useState(null),
		[w, g] = P.useState(null),
		x = P.useCallback((b) => {
			b !== R.current && ((R.current = b), h(b));
		}, []),
		A = P.useCallback((b) => {
			b !== C.current && ((C.current = b), g(b));
		}, []),
		y = r || m,
		v = s || w,
		R = P.useRef(null),
		C = P.useRef(null),
		T = P.useRef(f),
		N = a != null,
		L = xt(a),
		$ = xt(i),
		k = xt(l),
		S = P.useCallback(() => {
			if (!R.current || !C.current) return;
			const b = { placement: e, strategy: n, middleware: p };
			$.current && (b.platform = $.current),
				Ln(R.current, C.current, b).then((M) => {
					const j = { ...M, isPositioned: k.current !== !1 };
					O.current &&
						!mt(T.current, j) &&
						((T.current = j),
						Se.flushSync(() => {
							u(j);
						}));
				});
		}, [p, e, n, $, k]);
	at(() => {
		l === !1 &&
			T.current.isPositioned &&
			((T.current.isPositioned = !1), u((b) => ({ ...b, isPositioned: !1 })));
	}, [l]);
	const O = P.useRef(!1);
	at(
		() => (
			(O.current = !0),
			() => {
				O.current = !1;
			}
		),
		[],
	),
		at(() => {
			if ((y && (R.current = y), v && (C.current = v), y && v)) {
				if (L.current) return L.current(y, v, S);
				S();
			}
		}, [y, v, S, L, N]);
	const F = P.useMemo(
			() => ({ reference: R, floating: C, setReference: x, setFloating: A }),
			[x, A],
		),
		E = P.useMemo(() => ({ reference: y, floating: v }), [y, v]),
		D = P.useMemo(() => {
			const b = { position: n, left: 0, top: 0 };
			if (!E.floating) return b;
			const M = Zt(E.floating, f.x),
				j = Zt(E.floating, f.y);
			return c
				? {
						...b,
						transform: "translate(" + M + "px, " + j + "px)",
						...(ce(E.floating) >= 1.5 && { willChange: "transform" }),
					}
				: { position: n, left: M, top: j };
		}, [n, c, E.floating, f.x, f.y]);
	return P.useMemo(
		() => ({ ...f, update: S, refs: F, elements: E, floatingStyles: D }),
		[f, S, F, E, D],
	);
}
const kn = (t) => {
		function e(n) {
			return {}.hasOwnProperty.call(n, "current");
		}
		return {
			name: "arrow",
			options: t,
			fn(n) {
				const { element: o, padding: i } = typeof t == "function" ? t(n) : t;
				return o && e(o)
					? o.current != null
						? Ut({ element: o.current, padding: i }).fn(n)
						: {}
					: o
						? Ut({ element: o, padding: i }).fn(n)
						: {};
			},
		};
	},
	Nn = (t, e) => ({ ...Pn(t), options: [t, e] }),
	Fn = (t, e) => ({ ...Cn(t), options: [t, e] }),
	Hn = (t, e) => ({ ...Dn(t), options: [t, e] }),
	Wn = (t, e) => ({ ...On(t), options: [t, e] }),
	_n = (t, e) => ({ ...Sn(t), options: [t, e] }),
	Bn = (t, e) => ({ ...En(t), options: [t, e] }),
	jn = (t, e) => ({ ...kn(t), options: [t, e] });
var Vn = "Arrow",
	le = P.forwardRef((t, e) => {
		const { children: n, width: o = 10, height: i = 5, ...r } = t;
		return X.jsx(bt.svg, {
			...r,
			ref: e,
			width: o,
			height: i,
			viewBox: "0 0 30 10",
			preserveAspectRatio: "none",
			children: t.asChild ? n : X.jsx("polygon", { points: "0,0 30,0 15,10" }),
		});
	});
le.displayName = Vn;
var zn = le,
	Lt = "Popper",
	[ae, eo] = Ee(Lt),
	[In, fe] = ae(Lt),
	ue = (t) => {
		const { __scopePopper: e, children: n } = t,
			[o, i] = P.useState(null);
		return X.jsx(In, { scope: e, anchor: o, onAnchorChange: i, children: n });
	};
ue.displayName = Lt;
var de = "PopperAnchor",
	me = P.forwardRef((t, e) => {
		const { __scopePopper: n, virtualRef: o, ...i } = t,
			r = fe(de, n),
			s = P.useRef(null),
			c = Kt(e, s);
		return (
			P.useEffect(() => {
				r.onAnchorChange((o == null ? void 0 : o.current) || s.current);
			}),
			o ? null : X.jsx(bt.div, { ...i, ref: c })
		);
	});
me.displayName = de;
var Tt = "PopperContent",
	[Yn, Xn] = ae(Tt),
	pe = P.forwardRef((t, e) => {
		var Mt, $t, kt, Nt, Ft, Ht;
		const {
				__scopePopper: n,
				side: o = "bottom",
				sideOffset: i = 0,
				align: r = "center",
				alignOffset: s = 0,
				arrowPadding: c = 0,
				avoidCollisions: a = !0,
				collisionBoundary: l = [],
				collisionPadding: f = 0,
				sticky: u = "partial",
				hideWhenDetached: p = !1,
				updatePositionStrategy: d = "optimized",
				onPlaced: m,
				...h
			} = t,
			w = fe(Tt, n),
			[g, x] = P.useState(null),
			A = Kt(e, (nt) => x(nt)),
			[y, v] = P.useState(null),
			R = Le(y),
			C = (R == null ? void 0 : R.width) ?? 0,
			T = (R == null ? void 0 : R.height) ?? 0,
			N = o + (r !== "center" ? "-" + r : ""),
			L =
				typeof f == "number"
					? f
					: { top: 0, right: 0, bottom: 0, left: 0, ...f },
			$ = Array.isArray(l) ? l : [l],
			k = $.length > 0,
			S = { padding: L, boundary: $.filter(Un), altBoundary: k },
			{
				refs: O,
				floatingStyles: F,
				placement: E,
				isPositioned: D,
				middlewareData: b,
			} = $n({
				strategy: "fixed",
				placement: N,
				whileElementsMounted: (...nt) =>
					Rn(...nt, { animationFrame: d === "always" }),
				elements: { reference: w.anchor },
				middleware: [
					Nn({ mainAxis: i + T, alignmentAxis: s }),
					a &&
						Fn({
							mainAxis: !0,
							crossAxis: !1,
							limiter: u === "partial" ? Hn() : void 0,
							...S,
						}),
					a && Wn({ ...S }),
					_n({
						...S,
						apply: ({
							elements: nt,
							rects: Wt,
							availableWidth: Re,
							availableHeight: Pe,
						}) => {
							const { width: Ce, height: Oe } = Wt.reference,
								ct = nt.floating.style;
							ct.setProperty("--radix-popper-available-width", `${Re}px`),
								ct.setProperty("--radix-popper-available-height", `${Pe}px`),
								ct.setProperty("--radix-popper-anchor-width", `${Ce}px`),
								ct.setProperty("--radix-popper-anchor-height", `${Oe}px`);
						},
					}),
					y && jn({ element: y, padding: c }),
					Zn({ arrowWidth: C, arrowHeight: T }),
					p && Bn({ strategy: "referenceHidden", ...S }),
				],
			}),
			[M, j] = we(E),
			st = De(m);
		_t(() => {
			D && (st == null || st());
		}, [D, st]);
		const xe = (Mt = b.arrow) == null ? void 0 : Mt.x,
			ye = ($t = b.arrow) == null ? void 0 : $t.y,
			ve = ((kt = b.arrow) == null ? void 0 : kt.centerOffset) !== 0,
			[Ae, be] = P.useState();
		return (
			_t(() => {
				g && be(window.getComputedStyle(g).zIndex);
			}, [g]),
			X.jsx("div", {
				ref: O.setFloating,
				"data-radix-popper-content-wrapper": "",
				style: {
					...F,
					transform: D ? F.transform : "translate(0, -200%)",
					minWidth: "max-content",
					zIndex: Ae,
					"--radix-popper-transform-origin": [
						(Nt = b.transformOrigin) == null ? void 0 : Nt.x,
						(Ft = b.transformOrigin) == null ? void 0 : Ft.y,
					].join(" "),
					...(((Ht = b.hide) == null ? void 0 : Ht.referenceHidden) && {
						visibility: "hidden",
						pointerEvents: "none",
					}),
				},
				dir: t.dir,
				children: X.jsx(Yn, {
					scope: n,
					placedSide: M,
					onArrowChange: v,
					arrowX: xe,
					arrowY: ye,
					shouldHideArrow: ve,
					children: X.jsx(bt.div, {
						"data-side": M,
						"data-align": j,
						...h,
						ref: A,
						style: { ...h.style, animation: D ? void 0 : "none" },
					}),
				}),
			})
		);
	});
pe.displayName = Tt;
var he = "PopperArrow",
	qn = { top: "bottom", right: "left", bottom: "top", left: "right" },
	ge = P.forwardRef((e, n) => {
		const { __scopePopper: o, ...i } = e,
			r = Xn(he, o),
			s = qn[r.placedSide];
		return X.jsx("span", {
			ref: r.onArrowChange,
			style: {
				position: "absolute",
				left: r.arrowX,
				top: r.arrowY,
				[s]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0",
				}[r.placedSide],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)",
				}[r.placedSide],
				visibility: r.shouldHideArrow ? "hidden" : void 0,
			},
			children: X.jsx(zn, {
				...i,
				ref: n,
				style: { ...i.style, display: "block" },
			}),
		});
	});
ge.displayName = he;
function Un(t) {
	return t !== null;
}
var Zn = (t) => ({
	name: "transformOrigin",
	options: t,
	fn(e) {
		var w, g, x;
		const { placement: n, rects: o, middlewareData: i } = e,
			s = ((w = i.arrow) == null ? void 0 : w.centerOffset) !== 0,
			c = s ? 0 : t.arrowWidth,
			a = s ? 0 : t.arrowHeight,
			[l, f] = we(n),
			u = { start: "0%", center: "50%", end: "100%" }[f],
			p = (((g = i.arrow) == null ? void 0 : g.x) ?? 0) + c / 2,
			d = (((x = i.arrow) == null ? void 0 : x.y) ?? 0) + a / 2;
		let m = "",
			h = "";
		return (
			l === "bottom"
				? ((m = s ? u : `${p}px`), (h = `${-a}px`))
				: l === "top"
					? ((m = s ? u : `${p}px`), (h = `${o.floating.height + a}px`))
					: l === "right"
						? ((m = `${-a}px`), (h = s ? u : `${d}px`))
						: l === "left" &&
							((m = `${o.floating.width + a}px`), (h = s ? u : `${d}px`)),
			{ data: { x: m, y: h } }
		);
	},
});
function we(t) {
	const [e, n = "center"] = t.split("-");
	return [e, n];
}
var no = ue,
	oo = me,
	io = pe,
	ro = ge;
export {
	oo as A,
	io as C,
	no as R,
	ro as a,
	I as b,
	eo as c,
	_ as d,
	it as e,
	lt as f,
	W as g,
	St as h,
	Yt as i,
	Q as j,
	K as k,
	B as l,
	et as m,
	Wn as n,
	Nn as o,
	Rn as p,
	Hn as q,
	Fn as s,
	$n as u,
};
