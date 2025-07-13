import {
	d as B,
	a as D,
	b as T,
	c as x,
} from "./buildMatchPatternFn-DF4FdbSS.js";
function m(e) {
	const t = Object.prototype.toString.call(e);
	return e instanceof Date || (typeof e == "object" && t === "[object Date]")
		? new e.constructor(+e)
		: typeof e == "number" ||
				t === "[object Number]" ||
				typeof e == "string" ||
				t === "[object String]"
			? new Date(e)
			: new Date(Number.NaN);
}
const R = {};
function v() {
	return R;
}
function k(e, t) {
	var f, u, l, h;
	const n = v(),
		r =
			(t == null ? void 0 : t.weekStartsOn) ??
			((u = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) ==
			null
				? void 0
				: u.weekStartsOn) ??
			n.weekStartsOn ??
			((h = (l = n.locale) == null ? void 0 : l.options) == null
				? void 0
				: h.weekStartsOn) ??
			0,
		a = m(e),
		o = a.getDay(),
		d = (o < r ? 7 : 0) + o - r;
	return a.setDate(a.getDate() - d), a.setHours(0, 0, 0, 0), a;
}
const A = {
		lessThanXSeconds: {
			one: "less than a second",
			other: "less than {{count}} seconds",
		},
		xSeconds: { one: "1 second", other: "{{count}} seconds" },
		halfAMinute: "half a minute",
		lessThanXMinutes: {
			one: "less than a minute",
			other: "less than {{count}} minutes",
		},
		xMinutes: { one: "1 minute", other: "{{count}} minutes" },
		aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
		xHours: { one: "1 hour", other: "{{count}} hours" },
		xDays: { one: "1 day", other: "{{count}} days" },
		aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
		xWeeks: { one: "1 week", other: "{{count}} weeks" },
		aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
		xMonths: { one: "1 month", other: "{{count}} months" },
		aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
		xYears: { one: "1 year", other: "{{count}} years" },
		overXYears: { one: "over 1 year", other: "over {{count}} years" },
		almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
	},
	I = (e, t, n) => {
		let r;
		const a = A[e];
		return (
			typeof a == "string"
				? (r = a)
				: t === 1
					? (r = a.one)
					: (r = a.other.replace("{{count}}", t.toString())),
			n != null && n.addSuffix
				? n.comparison && n.comparison > 0
					? "in " + r
					: r + " ago"
				: r
		);
	},
	V = {
		lastWeek: "'last' eeee 'at' p",
		yesterday: "'yesterday at' p",
		today: "'today at' p",
		tomorrow: "'tomorrow at' p",
		nextWeek: "eeee 'at' p",
		other: "P",
	},
	J = (e, t, n, r) => V[e],
	$ = {
		narrow: ["B", "A"],
		abbreviated: ["BC", "AD"],
		wide: ["Before Christ", "Anno Domini"],
	},
	U = {
		narrow: ["1", "2", "3", "4"],
		abbreviated: ["Q1", "Q2", "Q3", "Q4"],
		wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
	},
	z = {
		narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
		abbreviated: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		wide: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
	},
	K = {
		narrow: ["S", "M", "T", "W", "T", "F", "S"],
		short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		wide: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		],
	},
	Z = {
		narrow: {
			am: "a",
			pm: "p",
			midnight: "mi",
			noon: "n",
			morning: "morning",
			afternoon: "afternoon",
			evening: "evening",
			night: "night",
		},
		abbreviated: {
			am: "AM",
			pm: "PM",
			midnight: "midnight",
			noon: "noon",
			morning: "morning",
			afternoon: "afternoon",
			evening: "evening",
			night: "night",
		},
		wide: {
			am: "a.m.",
			pm: "p.m.",
			midnight: "midnight",
			noon: "noon",
			morning: "morning",
			afternoon: "afternoon",
			evening: "evening",
			night: "night",
		},
	},
	tt = {
		narrow: {
			am: "a",
			pm: "p",
			midnight: "mi",
			noon: "n",
			morning: "in the morning",
			afternoon: "in the afternoon",
			evening: "in the evening",
			night: "at night",
		},
		abbreviated: {
			am: "AM",
			pm: "PM",
			midnight: "midnight",
			noon: "noon",
			morning: "in the morning",
			afternoon: "in the afternoon",
			evening: "in the evening",
			night: "at night",
		},
		wide: {
			am: "a.m.",
			pm: "p.m.",
			midnight: "midnight",
			noon: "noon",
			morning: "in the morning",
			afternoon: "in the afternoon",
			evening: "in the evening",
			night: "at night",
		},
	},
	et = (e, t) => {
		const n = Number(e),
			r = n % 100;
		if (r > 20 || r < 10)
			switch (r % 10) {
				case 1:
					return n + "st";
				case 2:
					return n + "nd";
				case 3:
					return n + "rd";
			}
		return n + "th";
	},
	nt = {
		ordinalNumber: et,
		era: D({ values: $, defaultWidth: "wide" }),
		quarter: D({
			values: U,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1,
		}),
		month: D({ values: z, defaultWidth: "wide" }),
		day: D({ values: K, defaultWidth: "wide" }),
		dayPeriod: D({
			values: Z,
			defaultWidth: "wide",
			formattingValues: tt,
			defaultFormattingWidth: "wide",
		}),
	},
	rt = /^(\d+)(th|st|nd|rd)?/i,
	at = /\d+/i,
	ot = {
		narrow: /^(b|a)/i,
		abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
		wide: /^(before christ|before common era|anno domini|common era)/i,
	},
	it = { any: [/^b/i, /^(a|c)/i] },
	st = {
		narrow: /^[1234]/i,
		abbreviated: /^q[1234]/i,
		wide: /^[1234](th|st|nd|rd)? quarter/i,
	},
	ut = { any: [/1/i, /2/i, /3/i, /4/i] },
	ct = {
		narrow: /^[jfmasond]/i,
		abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
		wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
	},
	dt = {
		narrow: [
			/^j/i,
			/^f/i,
			/^m/i,
			/^a/i,
			/^m/i,
			/^j/i,
			/^j/i,
			/^a/i,
			/^s/i,
			/^o/i,
			/^n/i,
			/^d/i,
		],
		any: [
			/^ja/i,
			/^f/i,
			/^mar/i,
			/^ap/i,
			/^may/i,
			/^jun/i,
			/^jul/i,
			/^au/i,
			/^s/i,
			/^o/i,
			/^n/i,
			/^d/i,
		],
	},
	ft = {
		narrow: /^[smtwf]/i,
		short: /^(su|mo|tu|we|th|fr|sa)/i,
		abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
		wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
	},
	ht = {
		narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
		any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
	},
	mt = {
		narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
		any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
	},
	lt = {
		any: {
			am: /^a/i,
			pm: /^p/i,
			midnight: /^mi/i,
			noon: /^no/i,
			morning: /morning/i,
			afternoon: /afternoon/i,
			evening: /evening/i,
			night: /night/i,
		},
	},
	gt = {
		ordinalNumber: B({
			matchPattern: rt,
			parsePattern: at,
			valueCallback: (e) => Number.parseInt(e, 10),
		}),
		era: x({
			matchPatterns: ot,
			defaultMatchWidth: "wide",
			parsePatterns: it,
			defaultParseWidth: "any",
		}),
		quarter: x({
			matchPatterns: st,
			defaultMatchWidth: "wide",
			parsePatterns: ut,
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1,
		}),
		month: x({
			matchPatterns: ct,
			defaultMatchWidth: "wide",
			parsePatterns: dt,
			defaultParseWidth: "any",
		}),
		day: x({
			matchPatterns: ft,
			defaultMatchWidth: "wide",
			parsePatterns: ht,
			defaultParseWidth: "any",
		}),
		dayPeriod: x({
			matchPatterns: mt,
			defaultMatchWidth: "any",
			parsePatterns: lt,
			defaultParseWidth: "any",
		}),
	},
	wt = {
		full: "EEEE, MMMM do, y",
		long: "MMMM do, y",
		medium: "MMM d, y",
		short: "MM/dd/yyyy",
	},
	yt = {
		full: "h:mm:ss a zzzz",
		long: "h:mm:ss a z",
		medium: "h:mm:ss a",
		short: "h:mm a",
	},
	bt = {
		full: "{{date}} 'at' {{time}}",
		long: "{{date}} 'at' {{time}}",
		medium: "{{date}}, {{time}}",
		short: "{{date}}, {{time}}",
	},
	Mt = {
		date: T({ formats: wt, defaultWidth: "full" }),
		time: T({ formats: yt, defaultWidth: "full" }),
		dateTime: T({ formats: bt, defaultWidth: "full" }),
	},
	Ot = {
		code: "en-US",
		formatDistance: I,
		formatLong: Mt,
		formatRelative: J,
		localize: nt,
		match: gt,
		options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
	};
function y(e, t) {
	return e instanceof Date ? new e.constructor(t) : new Date(t);
}
const X = 6048e5,
	Pt = 864e5;
function W(e) {
	return k(e, { weekStartsOn: 1 });
}
function L(e) {
	const t = m(e),
		n = t.getFullYear(),
		r = y(e, 0);
	r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
	const a = W(r),
		o = y(e, 0);
	o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
	const d = W(o);
	return t.getTime() >= a.getTime()
		? n + 1
		: t.getTime() >= d.getTime()
			? n
			: n - 1;
}
function q(e) {
	const t = m(e);
	return t.setHours(0, 0, 0, 0), t;
}
function N(e) {
	const t = m(e),
		n = new Date(
			Date.UTC(
				t.getFullYear(),
				t.getMonth(),
				t.getDate(),
				t.getHours(),
				t.getMinutes(),
				t.getSeconds(),
				t.getMilliseconds(),
			),
		);
	return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function Dt(e, t) {
	const n = q(e),
		r = q(t),
		a = +n - N(n),
		o = +r - N(r);
	return Math.round((a - o) / Pt);
}
function xt(e) {
	const t = L(e),
		n = y(e, 0);
	return n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0), W(n);
}
function kt(e) {
	return (
		e instanceof Date ||
		(typeof e == "object" &&
			Object.prototype.toString.call(e) === "[object Date]")
	);
}
function Wt(e) {
	if (!kt(e) && typeof e != "number") return !1;
	const t = m(e);
	return !isNaN(Number(t));
}
function vt(e) {
	const t = m(e),
		n = y(e, 0);
	return n.setFullYear(t.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Yt(e) {
	const t = m(e);
	return Dt(t, vt(t)) + 1;
}
function Tt(e) {
	const t = m(e),
		n = +W(t) - +xt(t);
	return Math.round(n / X) + 1;
}
function _(e, t) {
	var h, M, O, P;
	const n = m(e),
		r = n.getFullYear(),
		a = v(),
		o =
			(t == null ? void 0 : t.firstWeekContainsDate) ??
			((M = (h = t == null ? void 0 : t.locale) == null ? void 0 : h.options) ==
			null
				? void 0
				: M.firstWeekContainsDate) ??
			a.firstWeekContainsDate ??
			((P = (O = a.locale) == null ? void 0 : O.options) == null
				? void 0
				: P.firstWeekContainsDate) ??
			1,
		d = y(e, 0);
	d.setFullYear(r + 1, 0, o), d.setHours(0, 0, 0, 0);
	const f = k(d, t),
		u = y(e, 0);
	u.setFullYear(r, 0, o), u.setHours(0, 0, 0, 0);
	const l = k(u, t);
	return n.getTime() >= f.getTime()
		? r + 1
		: n.getTime() >= l.getTime()
			? r
			: r - 1;
}
function St(e, t) {
	var f, u, l, h;
	const n = v(),
		r =
			(t == null ? void 0 : t.firstWeekContainsDate) ??
			((u = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) ==
			null
				? void 0
				: u.firstWeekContainsDate) ??
			n.firstWeekContainsDate ??
			((h = (l = n.locale) == null ? void 0 : l.options) == null
				? void 0
				: h.firstWeekContainsDate) ??
			1,
		a = _(e, t),
		o = y(e, 0);
	return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), k(o, t);
}
function pt(e, t) {
	const n = m(e),
		r = +k(n, t) - +St(n, t);
	return Math.round(r / X) + 1;
}
function i(e, t) {
	const n = e < 0 ? "-" : "",
		r = Math.abs(e).toString().padStart(t, "0");
	return n + r;
}
const g = {
		y(e, t) {
			const n = e.getFullYear(),
				r = n > 0 ? n : 1 - n;
			return i(t === "yy" ? r % 100 : r, t.length);
		},
		M(e, t) {
			const n = e.getMonth();
			return t === "M" ? String(n + 1) : i(n + 1, 2);
		},
		d(e, t) {
			return i(e.getDate(), t.length);
		},
		a(e, t) {
			const n = e.getHours() / 12 >= 1 ? "pm" : "am";
			switch (t) {
				case "a":
				case "aa":
					return n.toUpperCase();
				case "aaa":
					return n;
				case "aaaaa":
					return n[0];
				case "aaaa":
				default:
					return n === "am" ? "a.m." : "p.m.";
			}
		},
		h(e, t) {
			return i(e.getHours() % 12 || 12, t.length);
		},
		H(e, t) {
			return i(e.getHours(), t.length);
		},
		m(e, t) {
			return i(e.getMinutes(), t.length);
		},
		s(e, t) {
			return i(e.getSeconds(), t.length);
		},
		S(e, t) {
			const n = t.length,
				r = e.getMilliseconds(),
				a = Math.trunc(r * Math.pow(10, n - 3));
			return i(a, t.length);
		},
	},
	b = {
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night",
	},
	C = {
		G: (e, t, n) => {
			const r = e.getFullYear() > 0 ? 1 : 0;
			switch (t) {
				case "G":
				case "GG":
				case "GGG":
					return n.era(r, { width: "abbreviated" });
				case "GGGGG":
					return n.era(r, { width: "narrow" });
				case "GGGG":
				default:
					return n.era(r, { width: "wide" });
			}
		},
		y: (e, t, n) => {
			if (t === "yo") {
				const r = e.getFullYear(),
					a = r > 0 ? r : 1 - r;
				return n.ordinalNumber(a, { unit: "year" });
			}
			return g.y(e, t);
		},
		Y: (e, t, n, r) => {
			const a = _(e, r),
				o = a > 0 ? a : 1 - a;
			if (t === "YY") {
				const d = o % 100;
				return i(d, 2);
			}
			return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : i(o, t.length);
		},
		R: (e, t) => {
			const n = L(e);
			return i(n, t.length);
		},
		u: (e, t) => {
			const n = e.getFullYear();
			return i(n, t.length);
		},
		Q: (e, t, n) => {
			const r = Math.ceil((e.getMonth() + 1) / 3);
			switch (t) {
				case "Q":
					return String(r);
				case "QQ":
					return i(r, 2);
				case "Qo":
					return n.ordinalNumber(r, { unit: "quarter" });
				case "QQQ":
					return n.quarter(r, { width: "abbreviated", context: "formatting" });
				case "QQQQQ":
					return n.quarter(r, { width: "narrow", context: "formatting" });
				case "QQQQ":
				default:
					return n.quarter(r, { width: "wide", context: "formatting" });
			}
		},
		q: (e, t, n) => {
			const r = Math.ceil((e.getMonth() + 1) / 3);
			switch (t) {
				case "q":
					return String(r);
				case "qq":
					return i(r, 2);
				case "qo":
					return n.ordinalNumber(r, { unit: "quarter" });
				case "qqq":
					return n.quarter(r, { width: "abbreviated", context: "standalone" });
				case "qqqqq":
					return n.quarter(r, { width: "narrow", context: "standalone" });
				case "qqqq":
				default:
					return n.quarter(r, { width: "wide", context: "standalone" });
			}
		},
		M: (e, t, n) => {
			const r = e.getMonth();
			switch (t) {
				case "M":
				case "MM":
					return g.M(e, t);
				case "Mo":
					return n.ordinalNumber(r + 1, { unit: "month" });
				case "MMM":
					return n.month(r, { width: "abbreviated", context: "formatting" });
				case "MMMMM":
					return n.month(r, { width: "narrow", context: "formatting" });
				case "MMMM":
				default:
					return n.month(r, { width: "wide", context: "formatting" });
			}
		},
		L: (e, t, n) => {
			const r = e.getMonth();
			switch (t) {
				case "L":
					return String(r + 1);
				case "LL":
					return i(r + 1, 2);
				case "Lo":
					return n.ordinalNumber(r + 1, { unit: "month" });
				case "LLL":
					return n.month(r, { width: "abbreviated", context: "standalone" });
				case "LLLLL":
					return n.month(r, { width: "narrow", context: "standalone" });
				case "LLLL":
				default:
					return n.month(r, { width: "wide", context: "standalone" });
			}
		},
		w: (e, t, n, r) => {
			const a = pt(e, r);
			return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : i(a, t.length);
		},
		I: (e, t, n) => {
			const r = Tt(e);
			return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : i(r, t.length);
		},
		d: (e, t, n) =>
			t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : g.d(e, t),
		D: (e, t, n) => {
			const r = Yt(e);
			return t === "Do"
				? n.ordinalNumber(r, { unit: "dayOfYear" })
				: i(r, t.length);
		},
		E: (e, t, n) => {
			const r = e.getDay();
			switch (t) {
				case "E":
				case "EE":
				case "EEE":
					return n.day(r, { width: "abbreviated", context: "formatting" });
				case "EEEEE":
					return n.day(r, { width: "narrow", context: "formatting" });
				case "EEEEEE":
					return n.day(r, { width: "short", context: "formatting" });
				case "EEEE":
				default:
					return n.day(r, { width: "wide", context: "formatting" });
			}
		},
		e: (e, t, n, r) => {
			const a = e.getDay(),
				o = (a - r.weekStartsOn + 8) % 7 || 7;
			switch (t) {
				case "e":
					return String(o);
				case "ee":
					return i(o, 2);
				case "eo":
					return n.ordinalNumber(o, { unit: "day" });
				case "eee":
					return n.day(a, { width: "abbreviated", context: "formatting" });
				case "eeeee":
					return n.day(a, { width: "narrow", context: "formatting" });
				case "eeeeee":
					return n.day(a, { width: "short", context: "formatting" });
				case "eeee":
				default:
					return n.day(a, { width: "wide", context: "formatting" });
			}
		},
		c: (e, t, n, r) => {
			const a = e.getDay(),
				o = (a - r.weekStartsOn + 8) % 7 || 7;
			switch (t) {
				case "c":
					return String(o);
				case "cc":
					return i(o, t.length);
				case "co":
					return n.ordinalNumber(o, { unit: "day" });
				case "ccc":
					return n.day(a, { width: "abbreviated", context: "standalone" });
				case "ccccc":
					return n.day(a, { width: "narrow", context: "standalone" });
				case "cccccc":
					return n.day(a, { width: "short", context: "standalone" });
				case "cccc":
				default:
					return n.day(a, { width: "wide", context: "standalone" });
			}
		},
		i: (e, t, n) => {
			const r = e.getDay(),
				a = r === 0 ? 7 : r;
			switch (t) {
				case "i":
					return String(a);
				case "ii":
					return i(a, t.length);
				case "io":
					return n.ordinalNumber(a, { unit: "day" });
				case "iii":
					return n.day(r, { width: "abbreviated", context: "formatting" });
				case "iiiii":
					return n.day(r, { width: "narrow", context: "formatting" });
				case "iiiiii":
					return n.day(r, { width: "short", context: "formatting" });
				case "iiii":
				default:
					return n.day(r, { width: "wide", context: "formatting" });
			}
		},
		a: (e, t, n) => {
			const a = e.getHours() / 12 >= 1 ? "pm" : "am";
			switch (t) {
				case "a":
				case "aa":
					return n.dayPeriod(a, {
						width: "abbreviated",
						context: "formatting",
					});
				case "aaa":
					return n
						.dayPeriod(a, { width: "abbreviated", context: "formatting" })
						.toLowerCase();
				case "aaaaa":
					return n.dayPeriod(a, { width: "narrow", context: "formatting" });
				case "aaaa":
				default:
					return n.dayPeriod(a, { width: "wide", context: "formatting" });
			}
		},
		b: (e, t, n) => {
			const r = e.getHours();
			let a;
			switch (
				(r === 12
					? (a = b.noon)
					: r === 0
						? (a = b.midnight)
						: (a = r / 12 >= 1 ? "pm" : "am"),
				t)
			) {
				case "b":
				case "bb":
					return n.dayPeriod(a, {
						width: "abbreviated",
						context: "formatting",
					});
				case "bbb":
					return n
						.dayPeriod(a, { width: "abbreviated", context: "formatting" })
						.toLowerCase();
				case "bbbbb":
					return n.dayPeriod(a, { width: "narrow", context: "formatting" });
				case "bbbb":
				default:
					return n.dayPeriod(a, { width: "wide", context: "formatting" });
			}
		},
		B: (e, t, n) => {
			const r = e.getHours();
			let a;
			switch (
				(r >= 17
					? (a = b.evening)
					: r >= 12
						? (a = b.afternoon)
						: r >= 4
							? (a = b.morning)
							: (a = b.night),
				t)
			) {
				case "B":
				case "BB":
				case "BBB":
					return n.dayPeriod(a, {
						width: "abbreviated",
						context: "formatting",
					});
				case "BBBBB":
					return n.dayPeriod(a, { width: "narrow", context: "formatting" });
				case "BBBB":
				default:
					return n.dayPeriod(a, { width: "wide", context: "formatting" });
			}
		},
		h: (e, t, n) => {
			if (t === "ho") {
				let r = e.getHours() % 12;
				return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
			}
			return g.h(e, t);
		},
		H: (e, t, n) =>
			t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : g.H(e, t),
		K: (e, t, n) => {
			const r = e.getHours() % 12;
			return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : i(r, t.length);
		},
		k: (e, t, n) => {
			let r = e.getHours();
			return (
				r === 0 && (r = 24),
				t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : i(r, t.length)
			);
		},
		m: (e, t, n) =>
			t === "mo"
				? n.ordinalNumber(e.getMinutes(), { unit: "minute" })
				: g.m(e, t),
		s: (e, t, n) =>
			t === "so"
				? n.ordinalNumber(e.getSeconds(), { unit: "second" })
				: g.s(e, t),
		S: (e, t) => g.S(e, t),
		X: (e, t, n) => {
			const r = e.getTimezoneOffset();
			if (r === 0) return "Z";
			switch (t) {
				case "X":
					return Q(r);
				case "XXXX":
				case "XX":
					return w(r);
				case "XXXXX":
				case "XXX":
				default:
					return w(r, ":");
			}
		},
		x: (e, t, n) => {
			const r = e.getTimezoneOffset();
			switch (t) {
				case "x":
					return Q(r);
				case "xxxx":
				case "xx":
					return w(r);
				case "xxxxx":
				case "xxx":
				default:
					return w(r, ":");
			}
		},
		O: (e, t, n) => {
			const r = e.getTimezoneOffset();
			switch (t) {
				case "O":
				case "OO":
				case "OOO":
					return "GMT" + H(r, ":");
				case "OOOO":
				default:
					return "GMT" + w(r, ":");
			}
		},
		z: (e, t, n) => {
			const r = e.getTimezoneOffset();
			switch (t) {
				case "z":
				case "zz":
				case "zzz":
					return "GMT" + H(r, ":");
				case "zzzz":
				default:
					return "GMT" + w(r, ":");
			}
		},
		t: (e, t, n) => {
			const r = Math.trunc(e.getTime() / 1e3);
			return i(r, t.length);
		},
		T: (e, t, n) => {
			const r = e.getTime();
			return i(r, t.length);
		},
	};
function H(e, t = "") {
	const n = e > 0 ? "-" : "+",
		r = Math.abs(e),
		a = Math.trunc(r / 60),
		o = r % 60;
	return o === 0 ? n + String(a) : n + String(a) + t + i(o, 2);
}
function Q(e, t) {
	return e % 60 === 0 ? (e > 0 ? "-" : "+") + i(Math.abs(e) / 60, 2) : w(e, t);
}
function w(e, t = "") {
	const n = e > 0 ? "-" : "+",
		r = Math.abs(e),
		a = i(Math.trunc(r / 60), 2),
		o = i(r % 60, 2);
	return n + a + t + o;
}
const j = (e, t) => {
		switch (e) {
			case "P":
				return t.date({ width: "short" });
			case "PP":
				return t.date({ width: "medium" });
			case "PPP":
				return t.date({ width: "long" });
			case "PPPP":
			default:
				return t.date({ width: "full" });
		}
	},
	G = (e, t) => {
		switch (e) {
			case "p":
				return t.time({ width: "short" });
			case "pp":
				return t.time({ width: "medium" });
			case "ppp":
				return t.time({ width: "long" });
			case "pppp":
			default:
				return t.time({ width: "full" });
		}
	},
	Et = (e, t) => {
		const n = e.match(/(P+)(p+)?/) || [],
			r = n[1],
			a = n[2];
		if (!a) return j(e, t);
		let o;
		switch (r) {
			case "P":
				o = t.dateTime({ width: "short" });
				break;
			case "PP":
				o = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				o = t.dateTime({ width: "long" });
				break;
			case "PPPP":
			default:
				o = t.dateTime({ width: "full" });
				break;
		}
		return o.replace("{{date}}", j(r, t)).replace("{{time}}", G(a, t));
	},
	Ft = { p: G, P: Et },
	qt = /^D+$/,
	Nt = /^Y+$/,
	Ct = ["D", "DD", "YY", "YYYY"];
function Ht(e) {
	return qt.test(e);
}
function Qt(e) {
	return Nt.test(e);
}
function jt(e, t, n) {
	const r = Xt(e, t, n);
	if ((console.warn(r), Ct.includes(e))) throw new RangeError(r);
}
function Xt(e, t, n) {
	const r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Lt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
	_t = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
	Gt = /^'([^]*?)'?$/,
	Bt = /''/g,
	Rt = /[a-zA-Z]/;
function Vt(e, t, n) {
	var h, M, O, P, S, p, E, F;
	const r = v(),
		a = (n == null ? void 0 : n.locale) ?? r.locale ?? Ot,
		o =
			(n == null ? void 0 : n.firstWeekContainsDate) ??
			((M = (h = n == null ? void 0 : n.locale) == null ? void 0 : h.options) ==
			null
				? void 0
				: M.firstWeekContainsDate) ??
			r.firstWeekContainsDate ??
			((P = (O = r.locale) == null ? void 0 : O.options) == null
				? void 0
				: P.firstWeekContainsDate) ??
			1,
		d =
			(n == null ? void 0 : n.weekStartsOn) ??
			((p = (S = n == null ? void 0 : n.locale) == null ? void 0 : S.options) ==
			null
				? void 0
				: p.weekStartsOn) ??
			r.weekStartsOn ??
			((F = (E = r.locale) == null ? void 0 : E.options) == null
				? void 0
				: F.weekStartsOn) ??
			0,
		f = m(e);
	if (!Wt(f)) throw new RangeError("Invalid time value");
	let u = t
		.match(_t)
		.map((c) => {
			const s = c[0];
			if (s === "p" || s === "P") {
				const Y = Ft[s];
				return Y(c, a.formatLong);
			}
			return c;
		})
		.join("")
		.match(Lt)
		.map((c) => {
			if (c === "''") return { isToken: !1, value: "'" };
			const s = c[0];
			if (s === "'") return { isToken: !1, value: At(c) };
			if (C[s]) return { isToken: !0, value: c };
			if (s.match(Rt))
				throw new RangeError(
					"Format string contains an unescaped latin alphabet character `" +
						s +
						"`",
				);
			return { isToken: !1, value: c };
		});
	a.localize.preprocessor && (u = a.localize.preprocessor(f, u));
	const l = { firstWeekContainsDate: o, weekStartsOn: d, locale: a };
	return u
		.map((c) => {
			if (!c.isToken) return c.value;
			const s = c.value;
			((!(n != null && n.useAdditionalWeekYearTokens) && Qt(s)) ||
				(!(n != null && n.useAdditionalDayOfYearTokens) && Ht(s))) &&
				jt(s, t, String(e));
			const Y = C[s[0]];
			return Y(f, s, a.localize, l);
		})
		.join("");
}
function At(e) {
	const t = e.match(Gt);
	return t ? t[1].replace(Bt, "'") : e;
}
export { Vt as f };
