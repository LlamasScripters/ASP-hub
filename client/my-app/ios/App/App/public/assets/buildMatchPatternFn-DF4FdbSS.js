function k(t) {
	return (a = {}) => {
		const e = a.width ? String(a.width) : t.defaultWidth;
		return t.formats[e] || t.formats[t.defaultWidth];
	};
}
function v(t) {
	return (a, e) => {
		const n = e != null && e.context ? String(e.context) : "standalone";
		let r;
		if (n === "formatting" && t.formattingValues) {
			const l = t.defaultFormattingWidth || t.defaultWidth,
				u = e != null && e.width ? String(e.width) : l;
			r = t.formattingValues[u] || t.formattingValues[l];
		} else {
			const l = t.defaultWidth,
				u = e != null && e.width ? String(e.width) : t.defaultWidth;
			r = t.values[u] || t.values[l];
		}
		const c = t.argumentCallback ? t.argumentCallback(a) : a;
		return r[c];
	};
}
function w(t) {
	return (a, e = {}) => {
		const n = e.width,
			r = (n && t.matchPatterns[n]) || t.matchPatterns[t.defaultMatchWidth],
			c = a.match(r);
		if (!c) return null;
		const l = c[0],
			u = (n && t.parsePatterns[n]) || t.parsePatterns[t.defaultParseWidth],
			f = Array.isArray(u) ? b(u, (h) => h.test(l)) : m(u, (h) => h.test(l));
		let d;
		(d = t.valueCallback ? t.valueCallback(f) : f),
			(d = e.valueCallback ? e.valueCallback(d) : d);
		const i = a.slice(l.length);
		return { value: d, rest: i };
	};
}
function m(t, a) {
	for (const e in t)
		if (Object.prototype.hasOwnProperty.call(t, e) && a(t[e])) return e;
}
function b(t, a) {
	for (let e = 0; e < t.length; e++) if (a(t[e])) return e;
}
function P(t) {
	return (a, e = {}) => {
		const n = a.match(t.matchPattern);
		if (!n) return null;
		const r = n[0],
			c = a.match(t.parsePattern);
		if (!c) return null;
		let l = t.valueCallback ? t.valueCallback(c[0]) : c[0];
		l = e.valueCallback ? e.valueCallback(l) : l;
		const u = a.slice(r.length);
		return { value: l, rest: u };
	};
}
export { v as a, k as b, w as c, P as d };
