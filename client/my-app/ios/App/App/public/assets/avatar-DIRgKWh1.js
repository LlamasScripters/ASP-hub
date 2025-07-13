import { P as p } from "./index-Bv1xjdPd.js";
import { u as f, c as w } from "./index-DauBq6FI.js";
import { u as j } from "./index-Dl_6cIao.js";
import { V as b, r as l, l as m, j as u, c as v } from "./index-kb-Ylywn.js";
var C = b();
function y() {
	return C.useSyncExternalStore(
		_,
		() => !0,
		() => !1,
	);
}
function _() {
	return () => {};
}
var g = "Avatar",
	[k, B] = w(g),
	[$, S] = k(g),
	L = l.forwardRef((n, e) => {
		const { __scopeAvatar: r, ...t } = n,
			[s, a] = l.useState("idle");
		return u.jsx($, {
			scope: r,
			imageLoadingStatus: s,
			onImageLoadingStatusChange: a,
			children: u.jsx(p.span, { ...t, ref: e }),
		});
	});
L.displayName = g;
var E = "AvatarImage",
	h = l.forwardRef((n, e) => {
		const {
				__scopeAvatar: r,
				src: t,
				onLoadingStatusChange: s = () => {},
				...a
			} = n,
			c = S(E, r),
			o = F(t, a),
			i = j((d) => {
				s(d), c.onImageLoadingStatusChange(d);
			});
		return (
			f(() => {
				o !== "idle" && i(o);
			}, [o, i]),
			o === "loaded" ? u.jsx(p.img, { ...a, ref: e, src: t }) : null
		);
	});
h.displayName = E;
var I = "AvatarFallback",
	N = l.forwardRef((n, e) => {
		const { __scopeAvatar: r, delayMs: t, ...s } = n,
			a = S(I, r),
			[c, o] = l.useState(t === void 0);
		return (
			l.useEffect(() => {
				if (t !== void 0) {
					const i = window.setTimeout(() => o(!0), t);
					return () => window.clearTimeout(i);
				}
			}, [t]),
			c && a.imageLoadingStatus !== "loaded"
				? u.jsx(p.span, { ...s, ref: e })
				: null
		);
	});
N.displayName = I;
function x(n, e) {
	return n
		? e
			? (n.src !== e && (n.src = e),
				n.complete && n.naturalWidth > 0 ? "loaded" : "loading")
			: "error"
		: "idle";
}
function F(n, { referrerPolicy: e, crossOrigin: r }) {
	const t = y(),
		s = l.useRef(null),
		a = t ? (s.current || (s.current = new window.Image()), s.current) : null,
		[c, o] = l.useState(() => x(a, n));
	return (
		f(() => {
			o(x(a, n));
		}, [a, n]),
		f(() => {
			const i = (R) => () => {
				o(R);
			};
			if (!a) return;
			const d = i("loaded"),
				A = i("error");
			return (
				a.addEventListener("load", d),
				a.addEventListener("error", A),
				e && (a.referrerPolicy = e),
				typeof r == "string" && (a.crossOrigin = r),
				() => {
					a.removeEventListener("load", d), a.removeEventListener("error", A);
				}
			);
		}, [a, r, e]),
		c
	);
}
var M = L,
	P = h,
	z = N;
function G(n) {
	const e = v.c(8);
	let r, t;
	e[0] !== n
		? (({ className: r, ...t } = n), (e[0] = n), (e[1] = r), (e[2] = t))
		: ((r = e[1]), (t = e[2]));
	let s;
	e[3] !== r
		? ((s = m("relative flex size-8 shrink-0 overflow-hidden rounded-full", r)),
			(e[3] = r),
			(e[4] = s))
		: (s = e[4]);
	let a;
	return (
		e[5] !== t || e[6] !== s
			? ((a = u.jsx(M, { "data-slot": "avatar", className: s, ...t })),
				(e[5] = t),
				(e[6] = s),
				(e[7] = a))
			: (a = e[7]),
		a
	);
}
function K(n) {
	const e = v.c(8);
	let r, t;
	e[0] !== n
		? (({ className: r, ...t } = n), (e[0] = n), (e[1] = r), (e[2] = t))
		: ((r = e[1]), (t = e[2]));
	let s;
	e[3] !== r
		? ((s = m("aspect-square size-full", r)), (e[3] = r), (e[4] = s))
		: (s = e[4]);
	let a;
	return (
		e[5] !== t || e[6] !== s
			? ((a = u.jsx(P, { "data-slot": "avatar-image", className: s, ...t })),
				(e[5] = t),
				(e[6] = s),
				(e[7] = a))
			: (a = e[7]),
		a
	);
}
function W(n) {
	const e = v.c(8);
	let r, t;
	e[0] !== n
		? (({ className: r, ...t } = n), (e[0] = n), (e[1] = r), (e[2] = t))
		: ((r = e[1]), (t = e[2]));
	let s;
	e[3] !== r
		? ((s = m(
				"bg-muted flex size-full items-center justify-center rounded-full",
				r,
			)),
			(e[3] = r),
			(e[4] = s))
		: (s = e[4]);
	let a;
	return (
		e[5] !== t || e[6] !== s
			? ((a = u.jsx(z, { "data-slot": "avatar-fallback", className: s, ...t })),
				(e[5] = t),
				(e[6] = s),
				(e[7] = a))
			: (a = e[7]),
		a
	);
}
export { K as A, W as a, G as b };
