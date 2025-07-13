var P = Object.defineProperty;
var A = (s, e, t) =>
	e in s
		? P(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
		: (s[e] = t);
var p = (s, e, t) => A(s, typeof e != "symbol" ? e + "" : e, t);
import {
	ad as $,
	b3 as $e,
	aQ as Ae,
	a6 as B,
	aY as Be,
	_ as C,
	aR as Ce,
	a8 as D,
	a_ as De,
	aL as Ee,
	ac as F,
	b2 as Fe,
	ak as G,
	b9 as Ge,
	aa as H,
	b0 as He,
	a2 as I,
	aV as Ie,
	ae as J,
	b4 as Je,
	ah as K,
	b6 as Ke,
	a7 as L,
	aZ as Le,
	a9 as M,
	a$ as Me,
	a4 as N,
	aX as Ne,
	a3 as O,
	aW as Oe,
	aP as Pe,
	am as Q,
	bb as Qe,
	aJ as Re,
	bv as Rt,
	aN as Se,
	aF as Te,
	br as Tt,
	$ as U,
	aS as Ue,
	ag as V,
	b5 as Ve,
	aj as W,
	b8 as We,
	al as X,
	ba as Xe,
	ai as Y,
	b7 as Ye,
	y as Ze,
	af as _,
	aG as _e,
	bs as _t,
	as as ae,
	bf as at,
	aD as be,
	bp as bt,
	aw as ce,
	bj as ct,
	aA as de,
	bn as dt,
	an as ee,
	p as et,
	az as fe,
	bm as ft,
	aI as ge,
	bu as gt,
	ay as he,
	bl as ht,
	au as ie,
	bh as it,
	a0 as j,
	aT as je,
	aO as ke,
	aB as le,
	bo as lt,
	aE as me,
	bq as mt,
	at as ne,
	bg as nt,
	aq as oe,
	bd as ot,
	ax as pe,
	bk as pt,
	aK as qe,
	ar as re,
	be as rt,
	ap as se,
	bc as st,
	ao as te,
	o as tt,
	av as ue,
	bi as ut,
	a1 as v,
	G as ve,
	aU as w,
	aH as we,
	bt as wt,
	aM as xe,
	a5 as y,
	aC as ye,
	s as yt,
	ab as z,
	b1 as ze,
} from "./index-kb-Ylywn.js";
const Jt = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			BRAND: C,
			DIRTY: U,
			EMPTY_PATH: j,
			INVALID: v,
			NEVER: I,
			OK: O,
			ParseStatus: N,
			Schema: y,
			ZodAny: B,
			ZodArray: L,
			ZodBigInt: D,
			ZodBoolean: M,
			ZodBranded: H,
			ZodCatch: z,
			ZodDate: F,
			ZodDefault: $,
			ZodDiscriminatedUnion: J,
			ZodEffects: _,
			ZodEnum: V,
			ZodError: K,
			get ZodFirstPartyTypeKind() {
				return Y;
			},
			ZodFunction: W,
			ZodIntersection: G,
			ZodIssueCode: X,
			ZodLazy: Q,
			ZodLiteral: ee,
			ZodMap: te,
			ZodNaN: se,
			ZodNativeEnum: oe,
			ZodNever: re,
			ZodNull: ae,
			ZodNullable: ne,
			ZodNumber: ie,
			ZodObject: ue,
			ZodOptional: ce,
			ZodParsedType: pe,
			ZodPipeline: he,
			ZodPromise: fe,
			ZodReadonly: de,
			ZodRecord: le,
			ZodSchema: y,
			ZodSet: ye,
			ZodString: be,
			ZodSymbol: me,
			ZodTransformer: _,
			ZodTuple: Te,
			ZodType: y,
			ZodUndefined: _e,
			ZodUnion: we,
			ZodUnknown: ge,
			ZodVoid: Re,
			addIssueToContext: qe,
			any: Ee,
			array: xe,
			bigint: Se,
			boolean: Ze,
			coerce: ke,
			custom: Pe,
			date: Ae,
			datetimeRegex: Ce,
			defaultErrorMap: Ue,
			discriminatedUnion: je,
			effect: w,
			enum: ve,
			function: Ie,
			getErrorMap: Oe,
			getParsedType: Ne,
			instanceof: Be,
			intersection: Le,
			isAborted: De,
			isAsync: Me,
			isDirty: He,
			isValid: ze,
			late: Fe,
			lazy: $e,
			literal: Je,
			makeIssue: Ve,
			map: Ke,
			nan: Ye,
			nativeEnum: We,
			never: Ge,
			null: Xe,
			nullable: Qe,
			number: et,
			object: tt,
			get objectUtil() {
				return st;
			},
			oboolean: ot,
			onumber: rt,
			optional: at,
			ostring: nt,
			pipeline: it,
			preprocess: ut,
			promise: ct,
			quotelessJson: pt,
			record: ht,
			set: ft,
			setErrorMap: dt,
			strictObject: lt,
			string: yt,
			symbol: bt,
			transformer: w,
			tuple: mt,
			undefined: Tt,
			union: _t,
			unknown: wt,
			get util() {
				return gt;
			},
			void: Rt,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);
class g extends Error {
	constructor(t, o, r) {
		const a = t.status || t.status === 0 ? t.status : "",
			n = t.statusText || "",
			i = `${a} ${n}`.trim(),
			u = i ? `status code ${i}` : "an unknown error";
		super(`Request failed with ${u}: ${o.method} ${o.url}`);
		p(this, "response");
		p(this, "request");
		p(this, "options");
		(this.name = "HTTPError"),
			(this.response = t),
			(this.request = o),
			(this.options = r);
	}
}
class E extends Error {
	constructor(t) {
		super(`Request timed out: ${t.method} ${t.url}`);
		p(this, "request");
		(this.name = "TimeoutError"), (this.request = t);
	}
}
const R = (() => {
		let s = !1,
			e = !1;
		const t = typeof globalThis.ReadableStream == "function",
			o = typeof globalThis.Request == "function";
		if (t && o)
			try {
				e = new globalThis.Request("https://empty.invalid", {
					body: new globalThis.ReadableStream(),
					method: "POST",
					get duplex() {
						return (s = !0), "half";
					},
				}).headers.has("Content-Type");
			} catch (r) {
				if (r instanceof Error && r.message === "unsupported BodyInit type")
					return !1;
				throw r;
			}
		return s && !e;
	})(),
	qt = typeof globalThis.AbortController == "function",
	Et = typeof globalThis.ReadableStream == "function",
	xt = typeof globalThis.FormData == "function",
	x = ["get", "post", "put", "patch", "head", "delete"],
	St = {
		json: "application/json",
		text: "text/*",
		formData: "multipart/form-data",
		arrayBuffer: "*/*",
		blob: "*/*",
	},
	b = 2147483647,
	Zt = new TextEncoder().encode(
		"------WebKitFormBoundaryaxpyiPgbbPti10Rw",
	).length,
	S = Symbol("stop"),
	kt = {
		json: !0,
		parseJson: !0,
		stringifyJson: !0,
		searchParams: !0,
		prefixUrl: !0,
		retry: !0,
		timeout: !0,
		hooks: !0,
		throwHttpErrors: !0,
		onDownloadProgress: !0,
		onUploadProgress: !0,
		fetch: !0,
	},
	Pt = {
		method: !0,
		headers: !0,
		body: !0,
		mode: !0,
		credentials: !0,
		cache: !0,
		redirect: !0,
		referrer: !0,
		referrerPolicy: !0,
		integrity: !0,
		keepalive: !0,
		signal: !0,
		window: !0,
		dispatcher: !0,
		duplex: !0,
		priority: !0,
	},
	At = (s) => {
		if (!s) return 0;
		if (s instanceof FormData) {
			let e = 0;
			for (const [t, o] of s)
				(e += Zt),
					(e += new TextEncoder().encode(
						`Content-Disposition: form-data; name="${t}"`,
					).length),
					(e +=
						typeof o == "string" ? new TextEncoder().encode(o).length : o.size);
			return e;
		}
		if (s instanceof Blob) return s.size;
		if (s instanceof ArrayBuffer) return s.byteLength;
		if (typeof s == "string") return new TextEncoder().encode(s).length;
		if (s instanceof URLSearchParams)
			return new TextEncoder().encode(s.toString()).length;
		if ("byteLength" in s) return s.byteLength;
		if (typeof s == "object" && s !== null)
			try {
				const e = JSON.stringify(s);
				return new TextEncoder().encode(e).length;
			} catch {
				return 0;
			}
		return 0;
	},
	Ct = (s, e) => {
		const t = Number(s.headers.get("content-length")) || 0;
		let o = 0;
		return s.status === 204
			? (e &&
					e(
						{ percent: 1, totalBytes: t, transferredBytes: o },
						new Uint8Array(),
					),
				new Response(null, {
					status: s.status,
					statusText: s.statusText,
					headers: s.headers,
				}))
			: new Response(
					new ReadableStream({
						async start(r) {
							const a = s.body.getReader();
							e &&
								e(
									{ percent: 0, transferredBytes: 0, totalBytes: t },
									new Uint8Array(),
								);
							async function n() {
								const { done: i, value: u } = await a.read();
								if (i) {
									r.close();
									return;
								}
								if (e) {
									o += u.byteLength;
									const c = t === 0 ? 0 : o / t;
									e({ percent: c, transferredBytes: o, totalBytes: t }, u);
								}
								r.enqueue(u), await n();
							}
							await n();
						},
					}),
					{ status: s.status, statusText: s.statusText, headers: s.headers },
				);
	},
	Ut = (s, e) => {
		const t = At(s.body);
		let o = 0;
		return new Request(s, {
			duplex: "half",
			body: new ReadableStream({
				async start(r) {
					const a =
						s.body instanceof ReadableStream
							? s.body.getReader()
							: new Response("").body.getReader();
					async function n() {
						const { done: i, value: u } = await a.read();
						if (i) {
							e &&
								e(
									{
										percent: 1,
										transferredBytes: o,
										totalBytes: Math.max(t, o),
									},
									new Uint8Array(),
								),
								r.close();
							return;
						}
						o += u.byteLength;
						let c = t === 0 ? 0 : o / t;
						(t < o || c === 1) && (c = 0.99),
							e &&
								e(
									{
										percent: Number(c.toFixed(2)),
										transferredBytes: o,
										totalBytes: t,
									},
									u,
								),
							r.enqueue(u),
							await n();
					}
					await n();
				},
			}),
		});
	},
	h = (s) => s !== null && typeof s == "object",
	f = (...s) => {
		for (const e of s)
			if ((!h(e) || Array.isArray(e)) && e !== void 0)
				throw new TypeError("The `options` argument must be an object");
		return T({}, ...s);
	},
	Z = (s = {}, e = {}) => {
		const t = new globalThis.Headers(s),
			o = e instanceof globalThis.Headers,
			r = new globalThis.Headers(e);
		for (const [a, n] of r.entries())
			(o && n === "undefined") || n === void 0 ? t.delete(a) : t.set(a, n);
		return t;
	};
function d(s, e, t) {
	return Object.hasOwn(e, t) && e[t] === void 0
		? []
		: T(s[t] ?? [], e[t] ?? []);
}
const k = (s = {}, e = {}) => ({
		beforeRequest: d(s, e, "beforeRequest"),
		beforeRetry: d(s, e, "beforeRetry"),
		afterResponse: d(s, e, "afterResponse"),
		beforeError: d(s, e, "beforeError"),
	}),
	T = (...s) => {
		let e = {},
			t = {},
			o = {};
		for (const r of s)
			if (Array.isArray(r)) Array.isArray(e) || (e = []), (e = [...e, ...r]);
			else if (h(r)) {
				for (let [a, n] of Object.entries(r))
					h(n) && a in e && (n = T(e[a], n)), (e = { ...e, [a]: n });
				h(r.hooks) && ((o = k(o, r.hooks)), (e.hooks = o)),
					h(r.headers) && ((t = Z(t, r.headers)), (e.headers = t));
			}
		return e;
	},
	jt = (s) => (x.includes(s) ? s.toUpperCase() : s),
	vt = ["get", "put", "head", "delete", "options", "trace"],
	It = [408, 413, 429, 500, 502, 503, 504],
	Ot = [413, 429, 503],
	q = {
		limit: 2,
		methods: vt,
		statusCodes: It,
		afterStatusCodes: Ot,
		maxRetryAfter: Number.POSITIVE_INFINITY,
		backoffLimit: Number.POSITIVE_INFINITY,
		delay: (s) => 0.3 * 2 ** (s - 1) * 1e3,
	},
	Nt = (s = {}) => {
		if (typeof s == "number") return { ...q, limit: s };
		if (s.methods && !Array.isArray(s.methods))
			throw new Error("retry.methods must be an array");
		if (s.statusCodes && !Array.isArray(s.statusCodes))
			throw new Error("retry.statusCodes must be an array");
		return { ...q, ...s };
	};
async function Bt(s, e, t, o) {
	return new Promise((r, a) => {
		const n = setTimeout(() => {
			t && t.abort(), a(new E(s));
		}, o.timeout);
		o.fetch(s, e)
			.then(r)
			.catch(a)
			.then(() => {
				clearTimeout(n);
			});
	});
}
async function Lt(s, { signal: e }) {
	return new Promise((t, o) => {
		e && (e.throwIfAborted(), e.addEventListener("abort", r, { once: !0 }));
		function r() {
			clearTimeout(a), o(e.reason);
		}
		const a = setTimeout(() => {
			e == null || e.removeEventListener("abort", r), t();
		}, s);
	});
}
const Dt = (s, e) => {
	const t = {};
	for (const o in e) !(o in Pt) && !(o in kt) && !(o in s) && (t[o] = e[o]);
	return t;
};
class l {
	constructor(e, t = {}) {
		p(this, "request");
		p(this, "abortController");
		p(this, "_retryCount", 0);
		p(this, "_input");
		p(this, "_options");
		var o, r;
		if (
			((this._input = e),
			(this._options = {
				...t,
				headers: Z(this._input.headers, t.headers),
				hooks: k(
					{
						beforeRequest: [],
						beforeRetry: [],
						beforeError: [],
						afterResponse: [],
					},
					t.hooks,
				),
				method: jt(t.method ?? this._input.method ?? "GET"),
				prefixUrl: String(t.prefixUrl || ""),
				retry: Nt(t.retry),
				throwHttpErrors: t.throwHttpErrors !== !1,
				timeout: t.timeout ?? 1e4,
				fetch: t.fetch ?? globalThis.fetch.bind(globalThis),
			}),
			typeof this._input != "string" &&
				!(
					this._input instanceof URL ||
					this._input instanceof globalThis.Request
				))
		)
			throw new TypeError("`input` must be a string, URL, or Request");
		if (this._options.prefixUrl && typeof this._input == "string") {
			if (this._input.startsWith("/"))
				throw new Error(
					"`input` must not begin with a slash when using `prefixUrl`",
				);
			this._options.prefixUrl.endsWith("/") || (this._options.prefixUrl += "/"),
				(this._input = this._options.prefixUrl + this._input);
		}
		if (qt) {
			const a = this._options.signal ?? this._input.signal;
			(this.abortController = new globalThis.AbortController()),
				(this._options.signal = a
					? AbortSignal.any([a, this.abortController.signal])
					: this.abortController.signal);
		}
		if (
			(R && (this._options.duplex = "half"),
			this._options.json !== void 0 &&
				((this._options.body =
					((r = (o = this._options).stringifyJson) == null
						? void 0
						: r.call(o, this._options.json)) ??
					JSON.stringify(this._options.json)),
				this._options.headers.set(
					"content-type",
					this._options.headers.get("content-type") ?? "application/json",
				)),
			(this.request = new globalThis.Request(this._input, this._options)),
			this._options.searchParams)
		) {
			const n =
					"?" +
					(typeof this._options.searchParams == "string"
						? this._options.searchParams.replace(/^\?/, "")
						: new URLSearchParams(this._options.searchParams).toString()),
				i = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, n);
			((xt && this._options.body instanceof globalThis.FormData) ||
				this._options.body instanceof URLSearchParams) &&
				!(this._options.headers && this._options.headers["content-type"]) &&
				this.request.headers.delete("content-type"),
				(this.request = new globalThis.Request(
					new globalThis.Request(i, { ...this.request }),
					this._options,
				));
		}
		if (this._options.onUploadProgress) {
			if (typeof this._options.onUploadProgress != "function")
				throw new TypeError("The `onUploadProgress` option must be a function");
			if (!R)
				throw new Error(
					"Request streams are not supported in your environment. The `duplex` option for `Request` is not available.",
				);
			this.request.body &&
				(this.request = Ut(this.request, this._options.onUploadProgress));
		}
	}
	static create(e, t) {
		const o = new l(e, t),
			r = async () => {
				if (typeof o._options.timeout == "number" && o._options.timeout > b)
					throw new RangeError(
						`The \`timeout\` option cannot be greater than ${b}`,
					);
				await Promise.resolve();
				let i = await o._fetch();
				for (const u of o._options.hooks.afterResponse) {
					const c = await u(
						o.request,
						o._options,
						o._decorateResponse(i.clone()),
					);
					c instanceof globalThis.Response && (i = c);
				}
				if ((o._decorateResponse(i), !i.ok && o._options.throwHttpErrors)) {
					let u = new g(i, o.request, o._options);
					for (const c of o._options.hooks.beforeError) u = await c(u);
					throw u;
				}
				if (o._options.onDownloadProgress) {
					if (typeof o._options.onDownloadProgress != "function")
						throw new TypeError(
							"The `onDownloadProgress` option must be a function",
						);
					if (!Et)
						throw new Error(
							"Streams are not supported in your environment. `ReadableStream` is missing.",
						);
					return Ct(i.clone(), o._options.onDownloadProgress);
				}
				return i;
			},
			n = (
				o._options.retry.methods.includes(o.request.method.toLowerCase())
					? o._retry(r)
					: r()
			).finally(async () => {
				var i;
				o.request.bodyUsed ||
					(await ((i = o.request.body) == null ? void 0 : i.cancel()));
			});
		for (const [i, u] of Object.entries(St))
			n[i] = async () => {
				o.request.headers.set("accept", o.request.headers.get("accept") || u);
				const c = await n;
				if (i === "json") {
					if (
						c.status === 204 ||
						(await c.clone().arrayBuffer()).byteLength === 0
					)
						return "";
					if (t.parseJson) return t.parseJson(await c.text());
				}
				return c[i]();
			};
		return n;
	}
	_calculateRetryDelay(e) {
		if (
			(this._retryCount++,
			this._retryCount > this._options.retry.limit || e instanceof E)
		)
			throw e;
		if (e instanceof g) {
			if (!this._options.retry.statusCodes.includes(e.response.status)) throw e;
			const o =
				e.response.headers.get("Retry-After") ??
				e.response.headers.get("RateLimit-Reset") ??
				e.response.headers.get("X-RateLimit-Reset") ??
				e.response.headers.get("X-Rate-Limit-Reset");
			if (
				o &&
				this._options.retry.afterStatusCodes.includes(e.response.status)
			) {
				let r = Number(o) * 1e3;
				Number.isNaN(r)
					? (r = Date.parse(o) - Date.now())
					: r >= Date.parse("2024-01-01") && (r -= Date.now());
				const a = this._options.retry.maxRetryAfter ?? r;
				return r < a ? r : a;
			}
			if (e.response.status === 413) throw e;
		}
		const t = this._options.retry.delay(this._retryCount);
		return Math.min(this._options.retry.backoffLimit, t);
	}
	_decorateResponse(e) {
		return (
			this._options.parseJson &&
				(e.json = async () => this._options.parseJson(await e.text())),
			e
		);
	}
	async _retry(e) {
		try {
			return await e();
		} catch (t) {
			const o = Math.min(this._calculateRetryDelay(t), b);
			if (this._retryCount < 1) throw t;
			await Lt(o, { signal: this._options.signal });
			for (const r of this._options.hooks.beforeRetry)
				if (
					(await r({
						request: this.request,
						options: this._options,
						error: t,
						retryCount: this._retryCount,
					})) === S
				)
					return;
			return this._retry(e);
		}
	}
	async _fetch() {
		for (const o of this._options.hooks.beforeRequest) {
			const r = await o(this.request, this._options);
			if (r instanceof Request) {
				this.request = r;
				break;
			}
			if (r instanceof Response) return r;
		}
		const e = Dt(this.request, this._options),
			t = this.request;
		return (
			(this.request = t.clone()),
			this._options.timeout === !1
				? this._options.fetch(t, e)
				: Bt(t, e, this.abortController, this._options)
		);
	}
} /*! MIT License © Sindre Sorhus */
const m = (s) => {
		const e = (t, o) => l.create(t, f(s, o));
		for (const t of x) e[t] = (o, r) => l.create(o, f(s, r, { method: t }));
		return (
			(e.create = (t) => m(f(t))),
			(e.extend = (t) => (
				typeof t == "function" && (t = t(s ?? {})), m(f(s, t))
			)),
			(e.stop = S),
			e
		);
	},
	Mt = m(),
	Vt = Mt.create({ prefixUrl: "/api" });
export { Vt as a, Jt as z };
