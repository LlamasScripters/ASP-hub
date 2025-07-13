import {
	Z as E,
	n as Tt,
	r as W,
	c as ne,
	j as re,
	l as xe,
} from "./index-kb-Ylywn.js";
import { L as Ut } from "./label-B9JbzJbC.js";
var ge = (e) => e.type === "checkbox",
	ae = (e) => e instanceof Date,
	P = (e) => e == null;
const ct = (e) => typeof e == "object";
var C = (e) => !P(e) && !Array.isArray(e) && ct(e) && !ae(e),
	dt = (e) =>
		C(e) && e.target ? (ge(e.target) ? e.target.checked : e.target.value) : e,
	Pt = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
	ft = (e, r) => e.has(Pt(r)),
	Bt = (e) => {
		const r = e.constructor && e.constructor.prototype;
		return C(r) && r.hasOwnProperty("isPrototypeOf");
	},
	Oe =
		typeof window < "u" &&
		typeof window.HTMLElement < "u" &&
		typeof document < "u";
function O(e) {
	let r;
	const t = Array.isArray(e),
		s = typeof FileList < "u" ? e instanceof FileList : !1;
	if (e instanceof Date) r = new Date(e);
	else if (e instanceof Set) r = new Set(e);
	else if (!(Oe && (e instanceof Blob || s)) && (t || C(e)))
		if (((r = t ? [] : {}), !t && !Bt(e))) r = e;
		else for (const a in e) e.hasOwnProperty(a) && (r[a] = O(e[a]));
	else return e;
	return r;
}
var Ae = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
	k = (e) => e === void 0,
	y = (e, r, t) => {
		if (!r || !C(e)) return t;
		const s = Ae(r.split(/[,[\].]+?/)).reduce((a, n) => (P(a) ? a : a[n]), e);
		return k(s) || s === e ? (k(e[r]) ? t : e[r]) : s;
	},
	j = (e) => typeof e == "boolean",
	Me = (e) => /^\w*$/.test(e),
	yt = (e) => Ae(e.replace(/["|']|\]/g, "").split(/\.|\[/)),
	D = (e, r, t) => {
		let s = -1;
		const a = Me(r) ? [r] : yt(r),
			n = a.length,
			o = n - 1;
		while (++s < n) {
			const c = a[s];
			let g = t;
			if (s !== o) {
				const v = e[c];
				g = C(v) || Array.isArray(v) ? v : isNaN(+a[s + 1]) ? {} : [];
			}
			if (c === "__proto__" || c === "constructor" || c === "prototype") return;
			(e[c] = g), (e = e[c]);
		}
	};
const be = { BLUR: "blur", FOCUS_OUT: "focusout", CHANGE: "change" },
	z = {
		onBlur: "onBlur",
		onChange: "onChange",
		onSubmit: "onSubmit",
		onTouched: "onTouched",
		all: "all",
	},
	X = {
		max: "max",
		min: "min",
		maxLength: "maxLength",
		minLength: "minLength",
		pattern: "pattern",
		required: "required",
		validate: "validate",
	},
	mt = E.createContext(null),
	we = () => E.useContext(mt),
	$t = (e) => {
		const { children: r, ...t } = e;
		return E.createElement(mt.Provider, { value: t }, r);
	};
var gt = (e, r, t, s = !0) => {
	const a = { defaultValues: r._defaultValues };
	for (const n in e)
		Object.defineProperty(a, n, {
			get: () => {
				const o = n;
				return (
					r._proxyFormState[o] !== z.all &&
						(r._proxyFormState[o] = !s || z.all),
					t && (t[o] = !0),
					e[o]
				);
			},
		});
	return a;
};
const Ie = typeof window < "u" ? W.useLayoutEffect : W.useEffect;
function jt(e) {
	const r = we(),
		{ control: t = r.control, disabled: s, name: a, exact: n } = e || {},
		[o, c] = E.useState(t._formState),
		g = E.useRef({
			isDirty: !1,
			isLoading: !1,
			dirtyFields: !1,
			touchedFields: !1,
			validatingFields: !1,
			isValidating: !1,
			isValid: !1,
			errors: !1,
		});
	return (
		Ie(
			() =>
				t._subscribe({
					name: a,
					formState: g.current,
					exact: n,
					callback: (v) => {
						!s && c({ ...t._formState, ...v });
					},
				}),
			[a, s, n],
		),
		E.useEffect(() => {
			g.current.isValid && t._setValid(!0);
		}, [t]),
		E.useMemo(() => gt(o, t, g.current, !1), [o, t])
	);
}
var J = (e) => typeof e == "string",
	ht = (e, r, t, s, a) =>
		J(e)
			? (s && r.watch.add(e), y(t, e, a))
			: Array.isArray(e)
				? e.map((n) => (s && r.watch.add(n), y(t, n)))
				: (s && (r.watchAll = !0), t);
function qt(e) {
	const r = we(),
		{
			control: t = r.control,
			name: s,
			defaultValue: a,
			disabled: n,
			exact: o,
		} = e || {},
		c = E.useRef(a),
		[g, v] = E.useState(t._getWatch(s, c.current));
	return (
		Ie(
			() =>
				t._subscribe({
					name: s,
					formState: { values: !0 },
					exact: o,
					callback: (b) =>
						!n && v(ht(s, t._names, b.values || t._formValues, !1, c.current)),
				}),
			[s, t, n, o],
		),
		E.useEffect(() => t._removeUnmounted()),
		g
	);
}
function Wt(e) {
	const r = we(),
		{ name: t, disabled: s, control: a = r.control, shouldUnregister: n } = e,
		o = ft(a._names.array, t),
		c = qt({
			control: a,
			name: t,
			defaultValue: y(a._formValues, t, y(a._defaultValues, t, e.defaultValue)),
			exact: !0,
		}),
		g = jt({ control: a, name: t, exact: !0 }),
		v = E.useRef(e),
		b = E.useRef(
			a.register(t, {
				...e.rules,
				value: c,
				...(j(e.disabled) ? { disabled: e.disabled } : {}),
			}),
		),
		A = E.useMemo(
			() =>
				Object.defineProperties(
					{},
					{
						invalid: { enumerable: !0, get: () => !!y(g.errors, t) },
						isDirty: { enumerable: !0, get: () => !!y(g.dirtyFields, t) },
						isTouched: { enumerable: !0, get: () => !!y(g.touchedFields, t) },
						isValidating: {
							enumerable: !0,
							get: () => !!y(g.validatingFields, t),
						},
						error: { enumerable: !0, get: () => y(g.errors, t) },
					},
				),
			[g, t],
		),
		F = E.useCallback(
			(I) =>
				b.current.onChange({
					target: { value: dt(I), name: t },
					type: be.CHANGE,
				}),
			[t],
		),
		se = E.useCallback(
			() =>
				b.current.onBlur({
					target: { value: y(a._formValues, t), name: t },
					type: be.BLUR,
				}),
			[t, a._formValues],
		),
		H = E.useCallback(
			(I) => {
				const T = y(a._fields, t);
				T &&
					I &&
					(T._f.ref = {
						focus: () => I.focus(),
						select: () => I.select(),
						setCustomValidity: (_) => I.setCustomValidity(_),
						reportValidity: () => I.reportValidity(),
					});
			},
			[a._fields, t],
		),
		N = E.useMemo(
			() => ({
				name: t,
				value: c,
				...(j(s) || g.disabled ? { disabled: g.disabled || s } : {}),
				onChange: F,
				onBlur: se,
				ref: H,
			}),
			[t, s, g.disabled, F, se, H, c],
		);
	return (
		E.useEffect(() => {
			const I = a._options.shouldUnregister || n;
			a.register(t, {
				...v.current.rules,
				...(j(v.current.disabled) ? { disabled: v.current.disabled } : {}),
			});
			const T = (_, K) => {
				const $ = y(a._fields, _);
				$ && $._f && ($._f.mount = K);
			};
			if ((T(t, !0), I)) {
				const _ = O(y(a._options.defaultValues, t));
				D(a._defaultValues, t, _),
					k(y(a._formValues, t)) && D(a._formValues, t, _);
			}
			return (
				!o && a.register(t),
				() => {
					(o ? I && !a._state.action : I) ? a.unregister(t) : T(t, !1);
				}
			);
		}, [t, a, o, n]),
		E.useEffect(() => {
			a._setDisabledField({ disabled: s, name: t });
		}, [s, t, a]),
		E.useMemo(() => ({ field: N, formState: g, fieldState: A }), [N, g, A])
	);
}
const Ht = (e) => e.render(Wt(e));
var vt = (e, r, t, s, a) =>
		r
			? {
					...t[e],
					types: { ...(t[e] && t[e].types ? t[e].types : {}), [s]: a || !0 },
				}
			: {},
	ye = (e) => (Array.isArray(e) ? e : [e]),
	Je = () => {
		let e = [];
		return {
			get observers() {
				return e;
			},
			next: (a) => {
				for (const n of e) n.next && n.next(a);
			},
			subscribe: (a) => (
				e.push(a),
				{
					unsubscribe: () => {
						e = e.filter((n) => n !== a);
					},
				}
			),
			unsubscribe: () => {
				e = [];
			},
		};
	},
	Ne = (e) => P(e) || !ct(e);
function te(e, r) {
	if (Ne(e) || Ne(r)) return e === r;
	if (ae(e) && ae(r)) return e.getTime() === r.getTime();
	const t = Object.keys(e),
		s = Object.keys(r);
	if (t.length !== s.length) return !1;
	for (const a of t) {
		const n = e[a];
		if (!s.includes(a)) return !1;
		if (a !== "ref") {
			const o = r[a];
			if (
				(ae(n) && ae(o)) ||
				(C(n) && C(o)) ||
				(Array.isArray(n) && Array.isArray(o))
					? !te(n, o)
					: n !== o
			)
				return !1;
		}
	}
	return !0;
}
var U = (e) => C(e) && !Object.keys(e).length,
	Te = (e) => e.type === "file",
	G = (e) => typeof e == "function",
	_e = (e) => {
		if (!Oe) return !1;
		const r = e ? e.ownerDocument : 0;
		return (
			e instanceof
			(r && r.defaultView ? r.defaultView.HTMLElement : HTMLElement)
		);
	},
	bt = (e) => e.type === "select-multiple",
	Ue = (e) => e.type === "radio",
	Kt = (e) => Ue(e) || ge(e),
	pe = (e) => _e(e) && e.isConnected;
function zt(e, r) {
	const t = r.slice(0, -1).length;
	let s = 0;
	while (s < t) e = k(e) ? s++ : e[r[s++]];
	return e;
}
function Gt(e) {
	for (const r in e) if (e.hasOwnProperty(r) && !k(e[r])) return !1;
	return !0;
}
function L(e, r) {
	const t = Array.isArray(r) ? r : Me(r) ? [r] : yt(r),
		s = t.length === 1 ? e : zt(e, t),
		a = t.length - 1,
		n = t[a];
	return (
		s && delete s[n],
		a !== 0 &&
			((C(s) && U(s)) || (Array.isArray(s) && Gt(s))) &&
			L(e, t.slice(0, -1)),
		e
	);
}
var _t = (e) => {
	for (const r in e) if (G(e[r])) return !0;
	return !1;
};
function Fe(e, r = {}) {
	const t = Array.isArray(e);
	if (C(e) || t)
		for (const s in e)
			Array.isArray(e[s]) || (C(e[s]) && !_t(e[s]))
				? ((r[s] = Array.isArray(e[s]) ? [] : {}), Fe(e[s], r[s]))
				: P(e[s]) || (r[s] = !0);
	return r;
}
function Ft(e, r, t) {
	const s = Array.isArray(e);
	if (C(e) || s)
		for (const a in e)
			Array.isArray(e[a]) || (C(e[a]) && !_t(e[a]))
				? k(r) || Ne(t[a])
					? (t[a] = Array.isArray(e[a]) ? Fe(e[a], []) : { ...Fe(e[a]) })
					: Ft(e[a], P(r) ? {} : r[a], t[a])
				: (t[a] = !te(e[a], r[a]));
	return t;
}
var de = (e, r) => Ft(e, r, Fe(r));
const Qe = { value: !1, isValid: !1 },
	Xe = { value: !0, isValid: !0 };
var Vt = (e) => {
		if (Array.isArray(e)) {
			if (e.length > 1) {
				const r = e
					.filter((t) => t && t.checked && !t.disabled)
					.map((t) => t.value);
				return { value: r, isValid: !!r.length };
			}
			return e[0].checked && !e[0].disabled
				? e[0].attributes && !k(e[0].attributes.value)
					? k(e[0].value) || e[0].value === ""
						? Xe
						: { value: e[0].value, isValid: !0 }
					: Xe
				: Qe;
		}
		return Qe;
	},
	xt = (e, { valueAsNumber: r, valueAsDate: t, setValueAs: s }) =>
		k(e)
			? e
			: r
				? e === ""
					? Number.NaN
					: e && +e
				: t && J(e)
					? new Date(e)
					: s
						? s(e)
						: e;
const et = { isValid: !1, value: null };
var At = (e) =>
	Array.isArray(e)
		? e.reduce(
				(r, t) =>
					t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : r,
				et,
			)
		: et;
function tt(e) {
	const r = e.ref;
	return Te(r)
		? r.files
		: Ue(r)
			? At(e.refs).value
			: bt(r)
				? [...r.selectedOptions].map(({ value: t }) => t)
				: ge(r)
					? Vt(e.refs).value
					: xt(k(r.value) ? e.ref.value : r.value, e);
}
var Yt = (e, r, t, s) => {
		const a = {};
		for (const n of e) {
			const o = y(r, n);
			o && D(a, n, o._f);
		}
		return {
			criteriaMode: t,
			names: [...e],
			fields: a,
			shouldUseNativeValidation: s,
		};
	},
	Ve = (e) => e instanceof RegExp,
	fe = (e) =>
		k(e)
			? e
			: Ve(e)
				? e.source
				: C(e)
					? Ve(e.value)
						? e.value.source
						: e.value
					: e,
	rt = (e) => ({
		isOnSubmit: !e || e === z.onSubmit,
		isOnBlur: e === z.onBlur,
		isOnChange: e === z.onChange,
		isOnAll: e === z.all,
		isOnTouch: e === z.onTouched,
	});
const st = "AsyncFunction";
var Zt = (e) =>
		!!e &&
		!!e.validate &&
		!!(
			(G(e.validate) && e.validate.constructor.name === st) ||
			(C(e.validate) &&
				Object.values(e.validate).find((r) => r.constructor.name === st))
		),
	Jt = (e) =>
		e.mount &&
		(e.required ||
			e.min ||
			e.max ||
			e.maxLength ||
			e.minLength ||
			e.pattern ||
			e.validate),
	it = (e, r, t) =>
		!t &&
		(r.watchAll ||
			r.watch.has(e) ||
			[...r.watch].some(
				(s) => e.startsWith(s) && /^\.\w+/.test(e.slice(s.length)),
			));
const me = (e, r, t, s) => {
	for (const a of t || Object.keys(e)) {
		const n = y(e, a);
		if (n) {
			const { _f: o, ...c } = n;
			if (o) {
				if (o.refs && o.refs[0] && r(o.refs[0], a) && !s) return !0;
				if (o.ref && r(o.ref, o.name) && !s) return !0;
				if (me(c, r)) break;
			} else if (C(c) && me(c, r)) break;
		}
	}
};
function at(e, r, t) {
	const s = y(e, t);
	if (s || Me(t)) return { error: s, name: t };
	const a = t.split(".");
	while (a.length) {
		const n = a.join("."),
			o = y(r, n),
			c = y(e, n);
		if (o && !Array.isArray(o) && t !== n) return { name: t };
		if (c && c.type) return { name: n, error: c };
		a.pop();
	}
	return { name: t };
}
var Qt = (e, r, t, s) => {
		t(e);
		const { name: a, ...n } = e;
		return (
			U(n) ||
			Object.keys(n).length >= Object.keys(r).length ||
			Object.keys(n).find((o) => r[o] === (!s || z.all))
		);
	},
	Xt = (e, r, t) =>
		!e ||
		!r ||
		e === r ||
		ye(e).some((s) => s && (t ? s === r : s.startsWith(r) || r.startsWith(s))),
	er = (e, r, t, s, a) =>
		a.isOnAll
			? !1
			: !t && a.isOnTouch
				? !(r || e)
				: (t ? s.isOnBlur : a.isOnBlur)
					? !e
					: (t ? s.isOnChange : a.isOnChange)
						? e
						: !0,
	tr = (e, r) => !Ae(y(e, r)).length && L(e, r),
	rr = (e, r, t) => {
		const s = ye(y(e, t));
		return D(s, "root", r[t]), D(e, t, s), e;
	},
	ve = (e) => J(e);
function nt(e, r, t = "validate") {
	if (ve(e) || (Array.isArray(e) && e.every(ve)) || (j(e) && !e))
		return { type: t, message: ve(e) ? e : "", ref: r };
}
var le = (e) => (C(e) && !Ve(e) ? e : { value: e, message: "" }),
	lt = async (e, r, t, s, a, n) => {
		const {
				ref: o,
				refs: c,
				required: g,
				maxLength: v,
				minLength: b,
				min: A,
				max: F,
				pattern: se,
				validate: H,
				name: N,
				valueAsNumber: I,
				mount: T,
			} = e._f,
			_ = y(t, N);
		if (!T || r.has(N)) return {};
		const K = c ? c[0] : o,
			$ = (w) => {
				a &&
					K.reportValidity &&
					(K.setCustomValidity(j(w) ? "" : w || ""), K.reportValidity());
			},
			p = {},
			oe = Ue(o),
			ue = ge(o),
			Ee = oe || ue,
			Y =
				((I || Te(o)) && k(o.value) && k(_)) ||
				(_e(o) && o.value === "") ||
				_ === "" ||
				(Array.isArray(_) && !_.length),
			ie = vt.bind(null, N, s, p),
			Q = (w, V, S, B = X.maxLength, q = X.minLength) => {
				const Z = w ? V : S;
				p[N] = { type: w ? B : q, message: Z, ref: o, ...ie(w ? B : q, Z) };
			};
		if (
			n
				? !Array.isArray(_) || !_.length
				: g &&
					((!Ee && (Y || P(_))) ||
						(j(_) && !_) ||
						(ue && !Vt(c).isValid) ||
						(oe && !At(c).isValid))
		) {
			const { value: w, message: V } = ve(g)
				? { value: !!g, message: g }
				: le(g);
			if (
				w &&
				((p[N] = {
					type: X.required,
					message: V,
					ref: K,
					...ie(X.required, V),
				}),
				!s)
			)
				return $(V), p;
		}
		if (!Y && (!P(A) || !P(F))) {
			let w, V;
			const S = le(F),
				B = le(A);
			if (!P(_) && !isNaN(_)) {
				const q = o.valueAsNumber || (_ && +_);
				P(S.value) || (w = q > S.value), P(B.value) || (V = q < B.value);
			} else {
				const q = o.valueAsDate || new Date(_),
					Z = (he) => new Date(new Date().toDateString() + " " + he),
					ee = o.type == "time",
					ce = o.type == "week";
				J(S.value) &&
					_ &&
					(w = ee
						? Z(_) > Z(S.value)
						: ce
							? _ > S.value
							: q > new Date(S.value)),
					J(B.value) &&
						_ &&
						(V = ee
							? Z(_) < Z(B.value)
							: ce
								? _ < B.value
								: q < new Date(B.value));
			}
			if ((w || V) && (Q(!!w, S.message, B.message, X.max, X.min), !s))
				return $(p[N].message), p;
		}
		if ((v || b) && !Y && (J(_) || (n && Array.isArray(_)))) {
			const w = le(v),
				V = le(b),
				S = !P(w.value) && _.length > +w.value,
				B = !P(V.value) && _.length < +V.value;
			if ((S || B) && (Q(S, w.message, V.message), !s))
				return $(p[N].message), p;
		}
		if (se && !Y && J(_)) {
			const { value: w, message: V } = le(se);
			if (
				Ve(w) &&
				!_.match(w) &&
				((p[N] = { type: X.pattern, message: V, ref: o, ...ie(X.pattern, V) }),
				!s)
			)
				return $(V), p;
		}
		if (H) {
			if (G(H)) {
				const w = await H(_, t),
					V = nt(w, K);
				if (V && ((p[N] = { ...V, ...ie(X.validate, V.message) }), !s))
					return $(V.message), p;
			} else if (C(H)) {
				let w = {};
				for (const V in H) {
					if (!U(w) && !s) break;
					const S = nt(await H[V](_, t), K, V);
					S &&
						((w = { ...S, ...ie(V, S.message) }),
						$(S.message),
						s && (p[N] = w));
				}
				if (!U(w) && ((p[N] = { ref: K, ...w }), !s)) return p;
			}
		}
		return $(!0), p;
	};
const sr = {
	mode: z.onSubmit,
	reValidateMode: z.onChange,
	shouldFocusError: !0,
};
function ir(e = {}) {
	let r = { ...sr, ...e },
		t = {
			submitCount: 0,
			isDirty: !1,
			isReady: !1,
			isLoading: G(r.defaultValues),
			isValidating: !1,
			isSubmitted: !1,
			isSubmitting: !1,
			isSubmitSuccessful: !1,
			isValid: !1,
			touchedFields: {},
			dirtyFields: {},
			validatingFields: {},
			errors: r.errors || {},
			disabled: r.disabled || !1,
		};
	const s = {};
	let a =
			C(r.defaultValues) || C(r.values)
				? O(r.defaultValues || r.values) || {}
				: {},
		n = r.shouldUnregister ? {} : O(a),
		o = { action: !1, mount: !1, watch: !1 },
		c = {
			mount: new Set(),
			disabled: new Set(),
			unMount: new Set(),
			array: new Set(),
			watch: new Set(),
		},
		g,
		v = 0;
	const b = {
		isDirty: !1,
		dirtyFields: !1,
		validatingFields: !1,
		touchedFields: !1,
		isValidating: !1,
		isValid: !1,
		errors: !1,
	};
	let A = { ...b };
	const F = { array: Je(), state: Je() },
		se = rt(r.mode),
		H = rt(r.reValidateMode),
		N = r.criteriaMode === z.all,
		I = (i) => (l) => {
			clearTimeout(v), (v = setTimeout(i, l));
		},
		T = async (i) => {
			if (!r.disabled && (b.isValid || A.isValid || i)) {
				const l = r.resolver ? U((await Y()).errors) : await Q(s, !0);
				l !== t.isValid && F.state.next({ isValid: l });
			}
		},
		_ = (i, l) => {
			!r.disabled &&
				(b.isValidating ||
					b.validatingFields ||
					A.isValidating ||
					A.validatingFields) &&
				((i || Array.from(c.mount)).forEach((u) => {
					u && (l ? D(t.validatingFields, u, l) : L(t.validatingFields, u));
				}),
				F.state.next({
					validatingFields: t.validatingFields,
					isValidating: !U(t.validatingFields),
				}));
		},
		K = (i, l = [], u, m, f = !0, d = !0) => {
			if (m && u && !r.disabled) {
				if (((o.action = !0), d && Array.isArray(y(s, i)))) {
					const h = u(y(s, i), m.argA, m.argB);
					f && D(s, i, h);
				}
				if (d && Array.isArray(y(t.errors, i))) {
					const h = u(y(t.errors, i), m.argA, m.argB);
					f && D(t.errors, i, h), tr(t.errors, i);
				}
				if (
					(b.touchedFields || A.touchedFields) &&
					d &&
					Array.isArray(y(t.touchedFields, i))
				) {
					const h = u(y(t.touchedFields, i), m.argA, m.argB);
					f && D(t.touchedFields, i, h);
				}
				(b.dirtyFields || A.dirtyFields) && (t.dirtyFields = de(a, n)),
					F.state.next({
						name: i,
						isDirty: V(i, l),
						dirtyFields: t.dirtyFields,
						errors: t.errors,
						isValid: t.isValid,
					});
			} else D(n, i, l);
		},
		$ = (i, l) => {
			D(t.errors, i, l), F.state.next({ errors: t.errors });
		},
		p = (i) => {
			(t.errors = i), F.state.next({ errors: t.errors, isValid: !1 });
		},
		oe = (i, l, u, m) => {
			const f = y(s, i);
			if (f) {
				const d = y(n, i, k(u) ? y(a, i) : u);
				k(d) || (m && m.defaultChecked) || l
					? D(n, i, l ? d : tt(f._f))
					: q(i, d),
					o.mount && T();
			}
		},
		ue = (i, l, u, m, f) => {
			let d = !1,
				h = !1;
			const x = { name: i };
			if (!r.disabled) {
				if (!u || m) {
					(b.isDirty || A.isDirty) &&
						((h = t.isDirty),
						(t.isDirty = x.isDirty = V()),
						(d = h !== x.isDirty));
					const R = te(y(a, i), l);
					(h = !!y(t.dirtyFields, i)),
						R ? L(t.dirtyFields, i) : D(t.dirtyFields, i, !0),
						(x.dirtyFields = t.dirtyFields),
						(d = d || ((b.dirtyFields || A.dirtyFields) && h !== !R));
				}
				if (u) {
					const R = y(t.touchedFields, i);
					R ||
						(D(t.touchedFields, i, u),
						(x.touchedFields = t.touchedFields),
						(d = d || ((b.touchedFields || A.touchedFields) && R !== u)));
				}
				d && f && F.state.next(x);
			}
			return d ? x : {};
		},
		Ee = (i, l, u, m) => {
			const f = y(t.errors, i),
				d = (b.isValid || A.isValid) && j(l) && t.isValid !== l;
			if (
				(r.delayError && u
					? ((g = I(() => $(i, u))), g(r.delayError))
					: (clearTimeout(v),
						(g = null),
						u ? D(t.errors, i, u) : L(t.errors, i)),
				(u ? !te(f, u) : f) || !U(m) || d)
			) {
				const h = {
					...m,
					...(d && j(l) ? { isValid: l } : {}),
					errors: t.errors,
					name: i,
				};
				(t = { ...t, ...h }), F.state.next(h);
			}
		},
		Y = async (i) => {
			_(i, !0);
			const l = await r.resolver(
				n,
				r.context,
				Yt(i || c.mount, s, r.criteriaMode, r.shouldUseNativeValidation),
			);
			return _(i), l;
		},
		ie = async (i) => {
			const { errors: l } = await Y(i);
			if (i)
				for (const u of i) {
					const m = y(l, u);
					m ? D(t.errors, u, m) : L(t.errors, u);
				}
			else t.errors = l;
			return l;
		},
		Q = async (i, l, u = { valid: !0 }) => {
			for (const m in i) {
				const f = i[m];
				if (f) {
					const { _f: d, ...h } = f;
					if (d) {
						const x = c.array.has(d.name),
							R = f._f && Zt(f._f);
						R && b.validatingFields && _([m], !0);
						const M = await lt(
							f,
							c.disabled,
							n,
							N,
							r.shouldUseNativeValidation && !l,
							x,
						);
						if (
							(R && b.validatingFields && _([m]),
							M[d.name] && ((u.valid = !1), l))
						)
							break;
						!l &&
							(y(M, d.name)
								? x
									? rr(t.errors, M, d.name)
									: D(t.errors, d.name, M[d.name])
								: L(t.errors, d.name));
					}
					!U(h) && (await Q(h, l, u));
				}
			}
			return u.valid;
		},
		w = () => {
			for (const i of c.unMount) {
				const l = y(s, i);
				l &&
					(l._f.refs ? l._f.refs.every((u) => !pe(u)) : !pe(l._f.ref)) &&
					ke(i);
			}
			c.unMount = new Set();
		},
		V = (i, l) => !r.disabled && (i && l && D(n, i, l), !te(Pe(), a)),
		S = (i, l, u) =>
			ht(i, c, { ...(o.mount ? n : k(l) ? a : J(i) ? { [i]: l } : l) }, u, l),
		B = (i) => Ae(y(o.mount ? n : a, i, r.shouldUnregister ? y(a, i, []) : [])),
		q = (i, l, u = {}) => {
			const m = y(s, i);
			let f = l;
			if (m) {
				const d = m._f;
				d &&
					(!d.disabled && D(n, i, xt(l, d)),
					(f = _e(d.ref) && P(l) ? "" : l),
					bt(d.ref)
						? [...d.ref.options].forEach(
								(h) => (h.selected = f.includes(h.value)),
							)
						: d.refs
							? ge(d.ref)
								? d.refs.length > 1
									? d.refs.forEach(
											(h) =>
												(!h.defaultChecked || !h.disabled) &&
												(h.checked = Array.isArray(f)
													? !!f.find((x) => x === h.value)
													: f === h.value),
										)
									: d.refs[0] && (d.refs[0].checked = !!f)
								: d.refs.forEach((h) => (h.checked = h.value === f))
							: Te(d.ref)
								? (d.ref.value = "")
								: ((d.ref.value = f),
									d.ref.type || F.state.next({ name: i, values: O(n) })));
			}
			(u.shouldDirty || u.shouldTouch) &&
				ue(i, f, u.shouldTouch, u.shouldDirty, !0),
				u.shouldValidate && Se(i);
		},
		Z = (i, l, u) => {
			for (const m in l) {
				const f = l[m],
					d = `${i}.${m}`,
					h = y(s, d);
				(c.array.has(i) || C(f) || (h && !h._f)) && !ae(f)
					? Z(d, f, u)
					: q(d, f, u);
			}
		},
		ee = (i, l, u = {}) => {
			const m = y(s, i),
				f = c.array.has(i),
				d = O(l);
			D(n, i, d),
				f
					? (F.array.next({ name: i, values: O(n) }),
						(b.isDirty || b.dirtyFields || A.isDirty || A.dirtyFields) &&
							u.shouldDirty &&
							F.state.next({
								name: i,
								dirtyFields: de(a, n),
								isDirty: V(i, d),
							}))
					: m && !m._f && !P(d)
						? Z(i, d, u)
						: q(i, d, u),
				it(i, c) && F.state.next({ ...t }),
				F.state.next({ name: o.mount ? i : void 0, values: O(n) });
		},
		ce = async (i) => {
			o.mount = !0;
			const l = i.target;
			let u = l.name,
				m = !0;
			const f = y(s, u),
				d = (h) => {
					m =
						Number.isNaN(h) ||
						(ae(h) && isNaN(h.getTime())) ||
						te(h, y(n, u, h));
				};
			if (f) {
				let h, x;
				const R = l.type ? tt(f._f) : dt(i),
					M = i.type === be.BLUR || i.type === be.FOCUS_OUT,
					Ot =
						(!Jt(f._f) && !r.resolver && !y(t.errors, u) && !f._f.deps) ||
						er(M, y(t.touchedFields, u), t.isSubmitted, H, se),
					Re = it(u, c, M);
				D(n, u, R),
					M
						? (f._f.onBlur && f._f.onBlur(i), g && g(0))
						: f._f.onChange && f._f.onChange(i);
				const Le = ue(u, R, M),
					Mt = !U(Le) || Re;
				if ((!M && F.state.next({ name: u, type: i.type, values: O(n) }), Ot))
					return (
						(b.isValid || A.isValid) &&
							(r.mode === "onBlur" ? M && T() : M || T()),
						Mt && F.state.next({ name: u, ...(Re ? {} : Le) })
					);
				if ((!M && Re && F.state.next({ ...t }), r.resolver)) {
					const { errors: Ye } = await Y([u]);
					if ((d(R), m)) {
						const It = at(t.errors, s, u),
							Ze = at(Ye, s, It.name || u);
						(h = Ze.error), (u = Ze.name), (x = U(Ye));
					}
				} else
					_([u], !0),
						(h = (await lt(f, c.disabled, n, N, r.shouldUseNativeValidation))[
							u
						]),
						_([u]),
						d(R),
						m &&
							(h ? (x = !1) : (b.isValid || A.isValid) && (x = await Q(s, !0)));
				m && (f._f.deps && Se(f._f.deps), Ee(u, x, h, Le));
			}
		},
		he = (i, l) => {
			if (y(t.errors, l) && i.focus) return i.focus(), 1;
		},
		Se = async (i, l = {}) => {
			let u, m;
			const f = ye(i);
			if (r.resolver) {
				const d = await ie(k(i) ? i : f);
				(u = U(d)), (m = i ? !f.some((h) => y(d, h)) : u);
			} else
				i
					? ((m = (
							await Promise.all(
								f.map(async (d) => {
									const h = y(s, d);
									return await Q(h && h._f ? { [d]: h } : h);
								}),
							)
						).every(Boolean)),
						!(!m && !t.isValid) && T())
					: (m = u = await Q(s));
			return (
				F.state.next({
					...(!J(i) || ((b.isValid || A.isValid) && u !== t.isValid)
						? {}
						: { name: i }),
					...(r.resolver || !i ? { isValid: u } : {}),
					errors: t.errors,
				}),
				l.shouldFocus && !m && me(s, he, i ? f : c.mount),
				m
			);
		},
		Pe = (i) => {
			const l = { ...(o.mount ? n : a) };
			return k(i) ? l : J(i) ? y(l, i) : i.map((u) => y(l, u));
		},
		Be = (i, l) => ({
			invalid: !!y((l || t).errors, i),
			isDirty: !!y((l || t).dirtyFields, i),
			error: y((l || t).errors, i),
			isValidating: !!y(t.validatingFields, i),
			isTouched: !!y((l || t).touchedFields, i),
		}),
		St = (i) => {
			i && ye(i).forEach((l) => L(t.errors, l)),
				F.state.next({ errors: i ? t.errors : {} });
		},
		$e = (i, l, u) => {
			const m = (y(s, i, { _f: {} })._f || {}).ref,
				f = y(t.errors, i) || {},
				{ ref: d, message: h, type: x, ...R } = f;
			D(t.errors, i, { ...R, ...l, ref: m }),
				F.state.next({ name: i, errors: t.errors, isValid: !1 }),
				u && u.shouldFocus && m && m.focus && m.focus();
		},
		kt = (i, l) =>
			G(i)
				? F.state.subscribe({ next: (u) => i(S(void 0, l), u) })
				: S(i, l, !0),
		je = (i) =>
			F.state.subscribe({
				next: (l) => {
					Xt(i.name, l.name, i.exact) &&
						Qt(l, i.formState || b, Nt, i.reRenderRoot) &&
						i.callback({ values: { ...n }, ...t, ...l });
				},
			}).unsubscribe,
		Ct = (i) => (
			(o.mount = !0), (A = { ...A, ...i.formState }), je({ ...i, formState: A })
		),
		ke = (i, l = {}) => {
			for (const u of i ? ye(i) : c.mount)
				c.mount.delete(u),
					c.array.delete(u),
					l.keepValue || (L(s, u), L(n, u)),
					!l.keepError && L(t.errors, u),
					!l.keepDirty && L(t.dirtyFields, u),
					!l.keepTouched && L(t.touchedFields, u),
					!l.keepIsValidating && L(t.validatingFields, u),
					!r.shouldUnregister && !l.keepDefaultValue && L(a, u);
			F.state.next({ values: O(n) }),
				F.state.next({ ...t, ...(l.keepDirty ? { isDirty: V() } : {}) }),
				!l.keepIsValid && T();
		},
		qe = ({ disabled: i, name: l }) => {
			((j(i) && o.mount) || i || c.disabled.has(l)) &&
				(i ? c.disabled.add(l) : c.disabled.delete(l));
		},
		Ce = (i, l = {}) => {
			let u = y(s, i);
			const m = j(l.disabled) || j(r.disabled);
			return (
				D(s, i, {
					...(u || {}),
					_f: {
						...(u && u._f ? u._f : { ref: { name: i } }),
						name: i,
						mount: !0,
						...l,
					},
				}),
				c.mount.add(i),
				u
					? qe({ disabled: j(l.disabled) ? l.disabled : r.disabled, name: i })
					: oe(i, !0, l.value),
				{
					...(m ? { disabled: l.disabled || r.disabled } : {}),
					...(r.progressive
						? {
								required: !!l.required,
								min: fe(l.min),
								max: fe(l.max),
								minLength: fe(l.minLength),
								maxLength: fe(l.maxLength),
								pattern: fe(l.pattern),
							}
						: {}),
					name: i,
					onChange: ce,
					onBlur: ce,
					ref: (f) => {
						if (f) {
							Ce(i, l), (u = y(s, i));
							const d =
									(k(f.value) &&
										f.querySelectorAll &&
										f.querySelectorAll("input,select,textarea")[0]) ||
									f,
								h = Kt(d),
								x = u._f.refs || [];
							if (h ? x.find((R) => R === d) : d === u._f.ref) return;
							D(s, i, {
								_f: {
									...u._f,
									...(h
										? {
												refs: [
													...x.filter(pe),
													d,
													...(Array.isArray(y(a, i)) ? [{}] : []),
												],
												ref: { type: d.type, name: i },
											}
										: { ref: d }),
								},
							}),
								oe(i, !1, void 0, d);
						} else
							(u = y(s, i, {})),
								u._f && (u._f.mount = !1),
								(r.shouldUnregister || l.shouldUnregister) &&
									!(ft(c.array, i) && o.action) &&
									c.unMount.add(i);
					},
				}
			);
		},
		We = () => r.shouldFocusError && me(s, he, c.mount),
		Rt = (i) => {
			j(i) &&
				(F.state.next({ disabled: i }),
				me(
					s,
					(l, u) => {
						const m = y(s, u);
						m &&
							((l.disabled = m._f.disabled || i),
							Array.isArray(m._f.refs) &&
								m._f.refs.forEach((f) => {
									f.disabled = m._f.disabled || i;
								}));
					},
					0,
					!1,
				));
		},
		He = (i, l) => async (u) => {
			let m;
			u && (u.preventDefault && u.preventDefault(), u.persist && u.persist());
			let f = O(n);
			if ((F.state.next({ isSubmitting: !0 }), r.resolver)) {
				const { errors: d, values: h } = await Y();
				(t.errors = d), (f = h);
			} else await Q(s);
			if (c.disabled.size) for (const d of c.disabled) D(f, d, void 0);
			if ((L(t.errors, "root"), U(t.errors))) {
				F.state.next({ errors: {} });
				try {
					await i(f, u);
				} catch (d) {
					m = d;
				}
			} else l && (await l({ ...t.errors }, u)), We(), setTimeout(We);
			if (
				(F.state.next({
					isSubmitted: !0,
					isSubmitting: !1,
					isSubmitSuccessful: U(t.errors) && !m,
					submitCount: t.submitCount + 1,
					errors: t.errors,
				}),
				m)
			)
				throw m;
		},
		Lt = (i, l = {}) => {
			y(s, i) &&
				(k(l.defaultValue)
					? ee(i, O(y(a, i)))
					: (ee(i, l.defaultValue), D(a, i, O(l.defaultValue))),
				l.keepTouched || L(t.touchedFields, i),
				l.keepDirty ||
					(L(t.dirtyFields, i),
					(t.isDirty = l.defaultValue ? V(i, O(y(a, i))) : V())),
				l.keepError || (L(t.errors, i), b.isValid && T()),
				F.state.next({ ...t }));
		},
		Ke = (i, l = {}) => {
			const u = i ? O(i) : a,
				m = O(u),
				f = U(i),
				d = f ? a : m;
			if ((l.keepDefaultValues || (a = u), !l.keepValues)) {
				if (l.keepDirtyValues) {
					const h = new Set([...c.mount, ...Object.keys(de(a, n))]);
					for (const x of Array.from(h))
						y(t.dirtyFields, x) ? D(d, x, y(n, x)) : ee(x, y(d, x));
				} else {
					if (Oe && k(i))
						for (const h of c.mount) {
							const x = y(s, h);
							if (x && x._f) {
								const R = Array.isArray(x._f.refs) ? x._f.refs[0] : x._f.ref;
								if (_e(R)) {
									const M = R.closest("form");
									if (M) {
										M.reset();
										break;
									}
								}
							}
						}
					for (const h of c.mount) ee(h, y(d, h));
				}
				(n = O(d)),
					F.array.next({ values: { ...d } }),
					F.state.next({ values: { ...d } });
			}
			(c = {
				mount: l.keepDirtyValues ? c.mount : new Set(),
				unMount: new Set(),
				array: new Set(),
				disabled: new Set(),
				watch: new Set(),
				watchAll: !1,
				focus: "",
			}),
				(o.mount = !b.isValid || !!l.keepIsValid || !!l.keepDirtyValues),
				(o.watch = !!r.shouldUnregister),
				F.state.next({
					submitCount: l.keepSubmitCount ? t.submitCount : 0,
					isDirty: f
						? !1
						: l.keepDirty
							? t.isDirty
							: !!(l.keepDefaultValues && !te(i, a)),
					isSubmitted: l.keepIsSubmitted ? t.isSubmitted : !1,
					dirtyFields: f
						? {}
						: l.keepDirtyValues
							? l.keepDefaultValues && n
								? de(a, n)
								: t.dirtyFields
							: l.keepDefaultValues && i
								? de(a, i)
								: l.keepDirty
									? t.dirtyFields
									: {},
					touchedFields: l.keepTouched ? t.touchedFields : {},
					errors: l.keepErrors ? t.errors : {},
					isSubmitSuccessful: l.keepIsSubmitSuccessful
						? t.isSubmitSuccessful
						: !1,
					isSubmitting: !1,
				});
		},
		ze = (i, l) => Ke(G(i) ? i(n) : i, l),
		pt = (i, l = {}) => {
			const u = y(s, i),
				m = u && u._f;
			if (m) {
				const f = m.refs ? m.refs[0] : m.ref;
				f.focus && (f.focus(), l.shouldSelect && G(f.select) && f.select());
			}
		},
		Nt = (i) => {
			t = { ...t, ...i };
		},
		Ge = {
			control: {
				register: Ce,
				unregister: ke,
				getFieldState: Be,
				handleSubmit: He,
				setError: $e,
				_subscribe: je,
				_runSchema: Y,
				_getWatch: S,
				_getDirty: V,
				_setValid: T,
				_setFieldArray: K,
				_setDisabledField: qe,
				_setErrors: p,
				_getFieldArray: B,
				_reset: Ke,
				_resetDefaultValues: () =>
					G(r.defaultValues) &&
					r.defaultValues().then((i) => {
						ze(i, r.resetOptions), F.state.next({ isLoading: !1 });
					}),
				_removeUnmounted: w,
				_disableForm: Rt,
				_subjects: F,
				_proxyFormState: b,
				get _fields() {
					return s;
				},
				get _formValues() {
					return n;
				},
				get _state() {
					return o;
				},
				set _state(i) {
					o = i;
				},
				get _defaultValues() {
					return a;
				},
				get _names() {
					return c;
				},
				set _names(i) {
					c = i;
				},
				get _formState() {
					return t;
				},
				get _options() {
					return r;
				},
				set _options(i) {
					r = { ...r, ...i };
				},
			},
			subscribe: Ct,
			trigger: Se,
			register: Ce,
			handleSubmit: He,
			watch: kt,
			setValue: ee,
			getValues: Pe,
			reset: ze,
			resetField: Lt,
			clearErrors: St,
			unregister: ke,
			setError: $e,
			setFocus: pt,
			getFieldState: Be,
		};
	return { ...Ge, formControl: Ge };
}
function hr(e = {}) {
	const r = E.useRef(void 0),
		t = E.useRef(void 0),
		[s, a] = E.useState({
			isDirty: !1,
			isValidating: !1,
			isLoading: G(e.defaultValues),
			isSubmitted: !1,
			isSubmitting: !1,
			isSubmitSuccessful: !1,
			isValid: !1,
			submitCount: 0,
			dirtyFields: {},
			touchedFields: {},
			validatingFields: {},
			errors: e.errors || {},
			disabled: e.disabled || !1,
			isReady: !1,
			defaultValues: G(e.defaultValues) ? void 0 : e.defaultValues,
		});
	r.current ||
		((r.current = { ...(e.formControl ? e.formControl : ir(e)), formState: s }),
		e.formControl &&
			e.defaultValues &&
			!G(e.defaultValues) &&
			e.formControl.reset(e.defaultValues, e.resetOptions));
	const n = r.current.control;
	return (
		(n._options = e),
		Ie(() => {
			const o = n._subscribe({
				formState: n._proxyFormState,
				callback: () => a({ ...n._formState }),
				reRenderRoot: !0,
			});
			return a((c) => ({ ...c, isReady: !0 })), (n._formState.isReady = !0), o;
		}, [n]),
		E.useEffect(() => n._disableForm(e.disabled), [n, e.disabled]),
		E.useEffect(() => {
			e.mode && (n._options.mode = e.mode),
				e.reValidateMode && (n._options.reValidateMode = e.reValidateMode),
				e.errors && !U(e.errors) && n._setErrors(e.errors);
		}, [n, e.errors, e.mode, e.reValidateMode]),
		E.useEffect(() => {
			e.shouldUnregister && n._subjects.state.next({ values: n._getWatch() });
		}, [n, e.shouldUnregister]),
		E.useEffect(() => {
			if (n._proxyFormState.isDirty) {
				const o = n._getDirty();
				o !== s.isDirty && n._subjects.state.next({ isDirty: o });
			}
		}, [n, s.isDirty]),
		E.useEffect(() => {
			e.values && !te(e.values, t.current)
				? (n._reset(e.values, n._options.resetOptions),
					(t.current = e.values),
					a((o) => ({ ...o })))
				: n._resetDefaultValues();
		}, [n, e.values]),
		E.useEffect(() => {
			n._state.mount || (n._setValid(), (n._state.mount = !0)),
				n._state.watch &&
					((n._state.watch = !1), n._subjects.state.next({ ...n._formState })),
				n._removeUnmounted();
		}),
		(r.current.formState = gt(s, n)),
		r.current
	);
}
const vr = $t,
	wt = W.createContext({}),
	br = (e) => {
		const r = ne.c(9);
		let t;
		r[0] !== e ? (({ ...t } = e), (r[0] = e), (r[1] = t)) : (t = r[1]);
		let s;
		r[2] !== t.name
			? ((s = { name: t.name }), (r[2] = t.name), (r[3] = s))
			: (s = r[3]);
		let a;
		r[4] !== t
			? ((a = re.jsx(Ht, { ...t })), (r[4] = t), (r[5] = a))
			: (a = r[5]);
		let n;
		return (
			r[6] !== s || r[7] !== a
				? ((n = re.jsx(wt.Provider, { value: s, children: a })),
					(r[6] = s),
					(r[7] = a),
					(r[8] = n))
				: (n = r[8]),
			n
		);
	},
	De = () => {
		const e = ne.c(11),
			r = W.useContext(wt),
			t = W.useContext(Dt),
			{ getFieldState: s, formState: a } = we();
		let n;
		e[0] !== r.name || e[1] !== a || e[2] !== s
			? ((n = s(r.name, a)),
				(e[0] = r.name),
				(e[1] = a),
				(e[2] = s),
				(e[3] = n))
			: (n = e[3]);
		const o = n;
		if (!r) throw new Error("useFormField should be used within <FormField>");
		const { id: c } = t,
			g = `${c}-form-item`,
			v = `${c}-form-item-description`,
			b = `${c}-form-item-message`;
		let A;
		return (
			e[4] !== r.name ||
			e[5] !== o ||
			e[6] !== c ||
			e[7] !== g ||
			e[8] !== v ||
			e[9] !== b
				? ((A = {
						id: c,
						name: r.name,
						formItemId: g,
						formDescriptionId: v,
						formMessageId: b,
						...o,
					}),
					(e[4] = r.name),
					(e[5] = o),
					(e[6] = c),
					(e[7] = g),
					(e[8] = v),
					(e[9] = b),
					(e[10] = A))
				: (A = e[10]),
			A
		);
	},
	Dt = W.createContext({}),
	ar = W.forwardRef((e, r) => {
		const t = ne.c(14);
		let s, a;
		t[0] !== e
			? (({ className: s, ...a } = e), (t[0] = e), (t[1] = s), (t[2] = a))
			: ((s = t[1]), (a = t[2]));
		const n = W.useId();
		let o;
		t[3] !== n ? ((o = { id: n }), (t[3] = n), (t[4] = o)) : (o = t[4]);
		let c;
		t[5] !== s
			? ((c = xe("space-y-2", s)), (t[5] = s), (t[6] = c))
			: (c = t[6]);
		let g;
		t[7] !== a || t[8] !== r || t[9] !== c
			? ((g = re.jsx("div", { ref: r, className: c, ...a })),
				(t[7] = a),
				(t[8] = r),
				(t[9] = c),
				(t[10] = g))
			: (g = t[10]);
		let v;
		return (
			t[11] !== o || t[12] !== g
				? ((v = re.jsx(Dt.Provider, { value: o, children: g })),
					(t[11] = o),
					(t[12] = g),
					(t[13] = v))
				: (v = t[13]),
			v
		);
	});
ar.displayName = "FormItem";
const nr = W.forwardRef((e, r) => {
	const t = ne.c(11);
	let s, a;
	t[0] !== e
		? (({ className: s, ...a } = e), (t[0] = e), (t[1] = s), (t[2] = a))
		: ((s = t[1]), (a = t[2]));
	const { error: n, formItemId: o } = De(),
		c = n && "text-destructive";
	let g;
	t[3] !== s || t[4] !== c
		? ((g = xe(c, s)), (t[3] = s), (t[4] = c), (t[5] = g))
		: (g = t[5]);
	let v;
	return (
		t[6] !== o || t[7] !== a || t[8] !== r || t[9] !== g
			? ((v = re.jsx(Ut, { ref: r, className: g, htmlFor: o, ...a })),
				(t[6] = o),
				(t[7] = a),
				(t[8] = r),
				(t[9] = g),
				(t[10] = v))
			: (v = t[10]),
		v
	);
});
nr.displayName = "FormLabel";
const lr = W.forwardRef((e, r) => {
	const t = ne.c(8);
	let s;
	t[0] !== e ? (({ ...s } = e), (t[0] = e), (t[1] = s)) : (s = t[1]);
	const {
			error: a,
			formItemId: n,
			formDescriptionId: o,
			formMessageId: c,
		} = De(),
		g = a ? `${o} ${c}` : `${o}`,
		v = !!a;
	let b;
	return (
		t[2] !== n || t[3] !== s || t[4] !== r || t[5] !== g || t[6] !== v
			? ((b = re.jsx(Tt, {
					ref: r,
					id: n,
					"aria-describedby": g,
					"aria-invalid": v,
					...s,
				})),
				(t[2] = n),
				(t[3] = s),
				(t[4] = r),
				(t[5] = g),
				(t[6] = v),
				(t[7] = b))
			: (b = t[7]),
		b
	);
});
lr.displayName = "FormControl";
const or = W.forwardRef((e, r) => {
	const t = ne.c(10);
	let s, a;
	t[0] !== e
		? (({ className: s, ...a } = e), (t[0] = e), (t[1] = s), (t[2] = a))
		: ((s = t[1]), (a = t[2]));
	const { formDescriptionId: n } = De();
	let o;
	t[3] !== s
		? ((o = xe("text-sm text-muted-foreground", s)), (t[3] = s), (t[4] = o))
		: (o = t[4]);
	let c;
	return (
		t[5] !== n || t[6] !== a || t[7] !== r || t[8] !== o
			? ((c = re.jsx("p", { ref: r, id: n, className: o, ...a })),
				(t[5] = n),
				(t[6] = a),
				(t[7] = r),
				(t[8] = o),
				(t[9] = c))
			: (c = t[9]),
		c
	);
});
or.displayName = "FormDescription";
const ur = W.forwardRef((e, r) => {
	const t = ne.c(12);
	let s, a, n;
	t[0] !== e
		? (({ className: a, children: s, ...n } = e),
			(t[0] = e),
			(t[1] = s),
			(t[2] = a),
			(t[3] = n))
		: ((s = t[1]), (a = t[2]), (n = t[3]));
	const { error: o, formMessageId: c } = De(),
		g = o ? String(o == null ? void 0 : o.message) : s;
	if (!g) return null;
	let v;
	t[4] !== a
		? ((v = xe("text-sm font-medium text-destructive", a)),
			(t[4] = a),
			(t[5] = v))
		: (v = t[5]);
	let b;
	return (
		t[6] !== g || t[7] !== c || t[8] !== n || t[9] !== r || t[10] !== v
			? ((b = re.jsx("p", { ref: r, id: c, className: v, ...n, children: g })),
				(t[6] = g),
				(t[7] = c),
				(t[8] = n),
				(t[9] = r),
				(t[10] = v),
				(t[11] = b))
			: (b = t[11]),
		b
	);
});
ur.displayName = "FormMessage";
const ot = (e, r, t) => {
		if (e && "reportValidity" in e) {
			const s = y(t, r);
			e.setCustomValidity((s && s.message) || ""), e.reportValidity();
		}
	},
	Et = (e, r) => {
		for (const t in r.fields) {
			const s = r.fields[t];
			s && s.ref && "reportValidity" in s.ref
				? ot(s.ref, t, e)
				: s && s.refs && s.refs.forEach((a) => ot(a, t, e));
		}
	},
	cr = (e, r) => {
		r.shouldUseNativeValidation && Et(e, r);
		const t = {};
		for (const s in e) {
			const a = y(r.fields, s),
				n = Object.assign(e[s] || {}, { ref: a && a.ref });
			if (dr(r.names || Object.keys(e), s)) {
				const o = Object.assign({}, y(t, s));
				D(o, "root", n), D(t, s, o);
			} else D(t, s, n);
		}
		return t;
	},
	dr = (e, r) => {
		const t = ut(r);
		return e.some((s) => ut(s).match(`^${t}\\.\\d+`));
	};
function ut(e) {
	return e.replace(/\]|\[/g, "");
}
function fr(e, r) {
	for (var t = {}; e.length; ) {
		var s = e[0],
			a = s.code,
			n = s.message,
			o = s.path.join(".");
		if (!t[o])
			if ("unionErrors" in s) {
				var c = s.unionErrors[0].errors[0];
				t[o] = { message: c.message, type: c.code };
			} else t[o] = { message: n, type: a };
		if (
			("unionErrors" in s &&
				s.unionErrors.forEach((b) => b.errors.forEach((A) => e.push(A))),
			r)
		) {
			var g = t[o].types,
				v = g && g[s.code];
			t[o] = vt(o, r, t, a, v ? [].concat(v, s.message) : s.message);
		}
		e.shift();
	}
	return t;
}
function _r(e, r, t) {
	return (
		t === void 0 && (t = {}),
		(s, a, n) => {
			try {
				return Promise.resolve(
					((o, c) => {
						try {
							var g = Promise.resolve(
								e[t.mode === "sync" ? "parse" : "parseAsync"](s, r),
							).then(
								(v) => (
									n.shouldUseNativeValidation && Et({}, n),
									{ errors: {}, values: t.raw ? Object.assign({}, s) : v }
								),
							);
						} catch (v) {
							return c(v);
						}
						return g && g.then ? g.then(void 0, c) : g;
					})(0, (o) => {
						if (((c) => Array.isArray(c == null ? void 0 : c.errors))(o))
							return {
								values: {},
								errors: cr(
									fr(
										o.errors,
										!n.shouldUseNativeValidation && n.criteriaMode === "all",
									),
									n,
								),
							};
						throw o;
					}),
				);
			} catch (o) {
				return Promise.reject(o);
			}
		}
	);
}
export {
	br as F,
	vr as a,
	ar as b,
	nr as c,
	lr as d,
	ur as e,
	or as f,
	_r as s,
	hr as u,
};
