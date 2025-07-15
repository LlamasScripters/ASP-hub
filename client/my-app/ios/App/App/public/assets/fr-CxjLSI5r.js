import {
	b as Ye,
	a as fe,
	c as me,
	d as wn,
} from "./buildMatchPatternFn-DF4FdbSS.js";
import { C as gn } from "./chevron-down-CMzABl4R.js";
import { C as hn } from "./chevron-left-BhVEjMY-.js";
import { C as yn } from "./chevron-right-QFzs-bqo.js";
import {
	bw as Ke,
	r as P,
	j as ae,
	c as fn,
	Z as m,
	B as mn,
	l as x,
} from "./index-kb-Ylywn.js";
const Fe = {},
	ge = {};
function we(t, e) {
	try {
		const r =
			(
				Fe[t] ||
				(Fe[t] = new Intl.DateTimeFormat("en-GB", {
					timeZone: t,
					hour: "numeric",
					timeZoneName: "longOffset",
				}).format)
			)(e).split("GMT")[1] || "";
		return r in ge ? ge[r] : et(r, r.split(":"));
	} catch {
		if (t in ge) return ge[t];
		const n = t == null ? void 0 : t.match(bn);
		return n ? et(t, n.slice(1)) : Number.NaN;
	}
}
const bn = /([+-]\d\d):?(\d\d)?/;
function et(t, e) {
	const n = +e[0],
		r = +(e[1] || 0);
	return (ge[t] = n > 0 ? n * 60 + r : n * 60 - r);
}
class Z extends Date {
	constructor(...e) {
		super(),
			e.length > 1 &&
				typeof e[e.length - 1] == "string" &&
				(this.timeZone = e.pop()),
			(this.internal = new Date()),
			isNaN(we(this.timeZone, this))
				? this.setTime(Number.NaN)
				: e.length
					? typeof e[0] == "number" &&
						(e.length === 1 || (e.length === 2 && typeof e[1] != "number"))
						? this.setTime(e[0])
						: typeof e[0] == "string"
							? this.setTime(+new Date(e[0]))
							: e[0] instanceof Date
								? this.setTime(+e[0])
								: (this.setTime(+new Date(...e)), ft(this), $e(this))
					: this.setTime(Date.now());
	}
	static tz(e, ...n) {
		return n.length ? new Z(...n, e) : new Z(Date.now(), e);
	}
	withTimeZone(e) {
		return new Z(+this, e);
	}
	getTimezoneOffset() {
		return -we(this.timeZone, this);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), $e(this), +this;
	}
	[Symbol.for("constructDateFrom")](e) {
		return new Z(+new Date(e), this.timeZone);
	}
}
const tt = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((t) => {
	if (!tt.test(t)) return;
	const e = t.replace(tt, "$1UTC");
	Z.prototype[e] &&
		(t.startsWith("get")
			? (Z.prototype[t] = function () {
					return this.internal[e]();
				})
			: ((Z.prototype[t] = function () {
					return (
						Date.prototype[e].apply(this.internal, arguments), Mn(this), +this
					);
				}),
				(Z.prototype[e] = function () {
					return Date.prototype[e].apply(this, arguments), $e(this), +this;
				})));
});
function $e(t) {
	t.internal.setTime(+t),
		t.internal.setUTCMinutes(
			t.internal.getUTCMinutes() - t.getTimezoneOffset(),
		);
}
function Mn(t) {
	Date.prototype.setFullYear.call(
		t,
		t.internal.getUTCFullYear(),
		t.internal.getUTCMonth(),
		t.internal.getUTCDate(),
	),
		Date.prototype.setHours.call(
			t,
			t.internal.getUTCHours(),
			t.internal.getUTCMinutes(),
			t.internal.getUTCSeconds(),
			t.internal.getUTCMilliseconds(),
		),
		ft(t);
}
function ft(t) {
	const e = we(t.timeZone, t),
		n = new Date(+t);
	n.setUTCHours(n.getUTCHours() - 1);
	const r = -new Date(+t).getTimezoneOffset(),
		a = -new Date(+n).getTimezoneOffset(),
		o = r - a,
		i = Date.prototype.getHours.apply(t) !== t.internal.getUTCHours();
	o && i && t.internal.setUTCMinutes(t.internal.getUTCMinutes() + o);
	const s = r - e;
	s &&
		Date.prototype.setUTCMinutes.call(
			t,
			Date.prototype.getUTCMinutes.call(t) + s,
		);
	const u = we(t.timeZone, t),
		l = -new Date(+t).getTimezoneOffset() - u,
		d = u !== e,
		h = l - s;
	if (d && h) {
		Date.prototype.setUTCMinutes.call(
			t,
			Date.prototype.getUTCMinutes.call(t) + h,
		);
		const g = we(t.timeZone, t),
			b = u - g;
		b &&
			(t.internal.setUTCMinutes(t.internal.getUTCMinutes() + b),
			Date.prototype.setUTCMinutes.call(
				t,
				Date.prototype.getUTCMinutes.call(t) + b,
			));
	}
}
class I extends Z {
	static tz(e, ...n) {
		return n.length ? new I(...n, e) : new I(Date.now(), e);
	}
	toISOString() {
		const [e, n, r] = this.tzComponents(),
			a = `${e}${n}:${r}`;
		return this.internal.toISOString().slice(0, -1) + a;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		const [e, n, r, a] = this.internal.toUTCString().split(" ");
		return `${e == null ? void 0 : e.slice(0, -1)} ${r} ${n} ${a}`;
	}
	toTimeString() {
		const e = this.internal.toUTCString().split(" ")[4],
			[n, r, a] = this.tzComponents();
		return `${e} GMT${n}${r}${a} (${vn(this.timeZone, this)})`;
	}
	toLocaleString(e, n) {
		return Date.prototype.toLocaleString.call(this, e, {
			...n,
			timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone,
		});
	}
	toLocaleDateString(e, n) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...n,
			timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone,
		});
	}
	toLocaleTimeString(e, n) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...n,
			timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone,
		});
	}
	tzComponents() {
		const e = this.getTimezoneOffset(),
			n = e > 0 ? "-" : "+",
			r = String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			a = String(Math.abs(e) % 60).padStart(2, "0");
		return [n, r, a];
	}
	withTimeZone(e) {
		return new I(+this, e);
	}
	[Symbol.for("constructDateFrom")](e) {
		return new I(+new Date(e), this.timeZone);
	}
}
function vn(t, e) {
	return new Intl.DateTimeFormat("en-GB", { timeZone: t, timeZoneName: "long" })
		.format(e)
		.slice(12);
}
var w;
((t) => {
	(t.Root = "root"),
		(t.Chevron = "chevron"),
		(t.Day = "day"),
		(t.DayButton = "day_button"),
		(t.CaptionLabel = "caption_label"),
		(t.Dropdowns = "dropdowns"),
		(t.Dropdown = "dropdown"),
		(t.DropdownRoot = "dropdown_root"),
		(t.Footer = "footer"),
		(t.MonthGrid = "month_grid"),
		(t.MonthCaption = "month_caption"),
		(t.MonthsDropdown = "months_dropdown"),
		(t.Month = "month"),
		(t.Months = "months"),
		(t.Nav = "nav"),
		(t.NextMonthButton = "button_next"),
		(t.PreviousMonthButton = "button_previous"),
		(t.Week = "week"),
		(t.Weeks = "weeks"),
		(t.Weekday = "weekday"),
		(t.Weekdays = "weekdays"),
		(t.WeekNumber = "week_number"),
		(t.WeekNumberHeader = "week_number_header"),
		(t.YearsDropdown = "years_dropdown");
})(w || (w = {}));
var F;
((t) => {
	(t.disabled = "disabled"),
		(t.hidden = "hidden"),
		(t.outside = "outside"),
		(t.focused = "focused"),
		(t.today = "today");
})(F || (F = {}));
var X;
((t) => {
	(t.range_end = "range_end"),
		(t.range_middle = "range_middle"),
		(t.range_start = "range_start"),
		(t.selected = "selected");
})(X || (X = {}));
var A;
((t) => {
	(t.weeks_before_enter = "weeks_before_enter"),
		(t.weeks_before_exit = "weeks_before_exit"),
		(t.weeks_after_enter = "weeks_after_enter"),
		(t.weeks_after_exit = "weeks_after_exit"),
		(t.caption_after_enter = "caption_after_enter"),
		(t.caption_after_exit = "caption_after_exit"),
		(t.caption_before_enter = "caption_before_enter"),
		(t.caption_before_exit = "caption_before_exit");
})(A || (A = {}));
const mt = 6048e5,
	kn = 864e5,
	nt = Symbol.for("constructDateFrom");
function B(t, e) {
	return typeof t == "function"
		? t(e)
		: t && typeof t == "object" && nt in t
			? t[nt](e)
			: t instanceof Date
				? new t.constructor(e)
				: new Date(e);
}
function T(t, e) {
	return B(e || t, t);
}
function ht(t, e, n) {
	const r = T(t, n == null ? void 0 : n.in);
	return isNaN(e) ? B(t, Number.NaN) : (e && r.setDate(r.getDate() + e), r);
}
function yt(t, e, n) {
	const r = T(t, n == null ? void 0 : n.in);
	if (isNaN(e)) return B(t, Number.NaN);
	if (!e) return r;
	const a = r.getDate(),
		o = B(t, r.getTime());
	o.setMonth(r.getMonth() + e + 1, 0);
	const i = o.getDate();
	return a >= i ? o : (r.setFullYear(o.getFullYear(), o.getMonth(), a), r);
}
const Dn = {};
function ve() {
	return Dn;
}
function ue(t, e) {
	var s, u, c, l;
	const n = ve(),
		r =
			(e == null ? void 0 : e.weekStartsOn) ??
			((u = (s = e == null ? void 0 : e.locale) == null ? void 0 : s.options) ==
			null
				? void 0
				: u.weekStartsOn) ??
			n.weekStartsOn ??
			((l = (c = n.locale) == null ? void 0 : c.options) == null
				? void 0
				: l.weekStartsOn) ??
			0,
		a = T(t, e == null ? void 0 : e.in),
		o = a.getDay(),
		i = (o < r ? 7 : 0) + o - r;
	return a.setDate(a.getDate() - i), a.setHours(0, 0, 0, 0), a;
}
function be(t, e) {
	return ue(t, { ...e, weekStartsOn: 1 });
}
function gt(t, e) {
	const n = T(t, e == null ? void 0 : e.in),
		r = n.getFullYear(),
		a = B(n, 0);
	a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
	const o = be(a),
		i = B(n, 0);
	i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
	const s = be(i);
	return n.getTime() >= o.getTime()
		? r + 1
		: n.getTime() >= s.getTime()
			? r
			: r - 1;
}
function rt(t) {
	const e = T(t),
		n = new Date(
			Date.UTC(
				e.getFullYear(),
				e.getMonth(),
				e.getDate(),
				e.getHours(),
				e.getMinutes(),
				e.getSeconds(),
				e.getMilliseconds(),
			),
		);
	return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function ce(t, ...e) {
	const n = B.bind(
		null,
		e.find((r) => typeof r == "object"),
	);
	return e.map(n);
}
function Me(t, e) {
	const n = T(t, e == null ? void 0 : e.in);
	return n.setHours(0, 0, 0, 0), n;
}
function wt(t, e, n) {
	const [r, a] = ce(n == null ? void 0 : n.in, t, e),
		o = Me(r),
		i = Me(a),
		s = +o - rt(o),
		u = +i - rt(i);
	return Math.round((s - u) / kn);
}
function On(t, e) {
	const n = gt(t, e),
		r = B(t, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), be(r);
}
function pn(t, e, n) {
	return ht(t, e * 7, n);
}
function Wn(t, e, n) {
	return yt(t, e * 12, n);
}
function Cn(t, e) {
	let n,
		r = e == null ? void 0 : e.in;
	return (
		t.forEach((a) => {
			!r && typeof a == "object" && (r = B.bind(null, a));
			const o = T(a, r);
			(!n || n < o || isNaN(+o)) && (n = o);
		}),
		B(r, n || Number.NaN)
	);
}
function xn(t, e) {
	let n,
		r = e == null ? void 0 : e.in;
	return (
		t.forEach((a) => {
			!r && typeof a == "object" && (r = B.bind(null, a));
			const o = T(a, r);
			(!n || n > o || isNaN(+o)) && (n = o);
		}),
		B(r, n || Number.NaN)
	);
}
function Sn(t, e, n) {
	const [r, a] = ce(n == null ? void 0 : n.in, t, e);
	return +Me(r) == +Me(a);
}
function bt(t) {
	return (
		t instanceof Date ||
		(typeof t == "object" &&
			Object.prototype.toString.call(t) === "[object Date]")
	);
}
function Nn(t) {
	return !((!bt(t) && typeof t != "number") || isNaN(+T(t)));
}
function Pn(t, e, n) {
	const [r, a] = ce(n == null ? void 0 : n.in, t, e),
		o = r.getFullYear() - a.getFullYear(),
		i = r.getMonth() - a.getMonth();
	return o * 12 + i;
}
function Tn(t, e) {
	const n = T(t, e == null ? void 0 : e.in),
		r = n.getMonth();
	return (
		n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n
	);
}
function _n(t, e) {
	const [n, r] = ce(t, e.start, e.end);
	return { start: n, end: r };
}
function En(t, e) {
	const { start: n, end: r } = _n(e == null ? void 0 : e.in, t);
	const a = +n > +r;
	const o = a ? +n : +r,
		i = a ? r : n;
	i.setHours(0, 0, 0, 0), i.setDate(1);
	const s = 1;
	const u = [];
	while (+i <= o) u.push(B(n, i)), i.setMonth(i.getMonth() + s);
	return a ? u.reverse() : u;
}
function Yn(t, e) {
	const n = T(t, e == null ? void 0 : e.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Fn(t, e) {
	const n = T(t, e == null ? void 0 : e.in),
		r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Mt(t, e) {
	const n = T(t, e == null ? void 0 : e.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function vt(t, e) {
	var s, u, c, l;
	const n = ve(),
		r =
			(e == null ? void 0 : e.weekStartsOn) ??
			((u = (s = e == null ? void 0 : e.locale) == null ? void 0 : s.options) ==
			null
				? void 0
				: u.weekStartsOn) ??
			n.weekStartsOn ??
			((l = (c = n.locale) == null ? void 0 : c.options) == null
				? void 0
				: l.weekStartsOn) ??
			0,
		a = T(t, e == null ? void 0 : e.in),
		o = a.getDay(),
		i = (o < r ? -7 : 0) + 6 - (o - r);
	return a.setDate(a.getDate() + i), a.setHours(23, 59, 59, 999), a;
}
function Bn(t, e) {
	return vt(t, { ...e, weekStartsOn: 1 });
}
const jn = {
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
	In = (t, e, n) => {
		let r;
		const a = jn[t];
		return (
			typeof a == "string"
				? (r = a)
				: e === 1
					? (r = a.one)
					: (r = a.other.replace("{{count}}", e.toString())),
			n != null && n.addSuffix
				? n.comparison && n.comparison > 0
					? "in " + r
					: r + " ago"
				: r
		);
	};
function Be(t) {
	return (e = {}) => {
		const n = e.width ? String(e.width) : t.defaultWidth;
		return t.formats[n] || t.formats[t.defaultWidth];
	};
}
const Hn = {
		full: "EEEE, MMMM do, y",
		long: "MMMM do, y",
		medium: "MMM d, y",
		short: "MM/dd/yyyy",
	},
	$n = {
		full: "h:mm:ss a zzzz",
		long: "h:mm:ss a z",
		medium: "h:mm:ss a",
		short: "h:mm a",
	},
	qn = {
		full: "{{date}} 'at' {{time}}",
		long: "{{date}} 'at' {{time}}",
		medium: "{{date}}, {{time}}",
		short: "{{date}}, {{time}}",
	},
	An = {
		date: Be({ formats: Hn, defaultWidth: "full" }),
		time: Be({ formats: $n, defaultWidth: "full" }),
		dateTime: Be({ formats: qn, defaultWidth: "full" }),
	},
	zn = {
		lastWeek: "'last' eeee 'at' p",
		yesterday: "'yesterday at' p",
		today: "'today at' p",
		tomorrow: "'tomorrow at' p",
		nextWeek: "eeee 'at' p",
		other: "P",
	},
	Rn = (t, e, n, r) => zn[t];
function he(t) {
	return (e, n) => {
		const r = n != null && n.context ? String(n.context) : "standalone";
		let a;
		if (r === "formatting" && t.formattingValues) {
			const i = t.defaultFormattingWidth || t.defaultWidth,
				s = n != null && n.width ? String(n.width) : i;
			a = t.formattingValues[s] || t.formattingValues[i];
		} else {
			const i = t.defaultWidth,
				s = n != null && n.width ? String(n.width) : t.defaultWidth;
			a = t.values[s] || t.values[i];
		}
		const o = t.argumentCallback ? t.argumentCallback(e) : e;
		return a[o];
	};
}
const Gn = {
		narrow: ["B", "A"],
		abbreviated: ["BC", "AD"],
		wide: ["Before Christ", "Anno Domini"],
	},
	Jn = {
		narrow: ["1", "2", "3", "4"],
		abbreviated: ["Q1", "Q2", "Q3", "Q4"],
		wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
	},
	Xn = {
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
	Ln = {
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
	Qn = {
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
	Zn = {
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
	Vn = (t, e) => {
		const n = Number(t),
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
	Un = {
		ordinalNumber: Vn,
		era: he({ values: Gn, defaultWidth: "wide" }),
		quarter: he({
			values: Jn,
			defaultWidth: "wide",
			argumentCallback: (t) => t - 1,
		}),
		month: he({ values: Xn, defaultWidth: "wide" }),
		day: he({ values: Ln, defaultWidth: "wide" }),
		dayPeriod: he({
			values: Qn,
			defaultWidth: "wide",
			formattingValues: Zn,
			defaultFormattingWidth: "wide",
		}),
	};
function ye(t) {
	return (e, n = {}) => {
		const r = n.width,
			a = (r && t.matchPatterns[r]) || t.matchPatterns[t.defaultMatchWidth],
			o = e.match(a);
		if (!o) return null;
		const i = o[0],
			s = (r && t.parsePatterns[r]) || t.parsePatterns[t.defaultParseWidth],
			u = Array.isArray(s) ? er(s, (d) => d.test(i)) : Kn(s, (d) => d.test(i));
		let c;
		(c = t.valueCallback ? t.valueCallback(u) : u),
			(c = n.valueCallback ? n.valueCallback(c) : c);
		const l = e.slice(i.length);
		return { value: c, rest: l };
	};
}
function Kn(t, e) {
	for (const n in t)
		if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return n;
}
function er(t, e) {
	for (let n = 0; n < t.length; n++) if (e(t[n])) return n;
}
function tr(t) {
	return (e, n = {}) => {
		const r = e.match(t.matchPattern);
		if (!r) return null;
		const a = r[0],
			o = e.match(t.parsePattern);
		if (!o) return null;
		let i = t.valueCallback ? t.valueCallback(o[0]) : o[0];
		i = n.valueCallback ? n.valueCallback(i) : i;
		const s = e.slice(a.length);
		return { value: i, rest: s };
	};
}
const nr = /^(\d+)(th|st|nd|rd)?/i,
	rr = /\d+/i,
	ar = {
		narrow: /^(b|a)/i,
		abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
		wide: /^(before christ|before common era|anno domini|common era)/i,
	},
	or = { any: [/^b/i, /^(a|c)/i] },
	sr = {
		narrow: /^[1234]/i,
		abbreviated: /^q[1234]/i,
		wide: /^[1234](th|st|nd|rd)? quarter/i,
	},
	ir = { any: [/1/i, /2/i, /3/i, /4/i] },
	ur = {
		narrow: /^[jfmasond]/i,
		abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
		wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
	},
	cr = {
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
	dr = {
		narrow: /^[smtwf]/i,
		short: /^(su|mo|tu|we|th|fr|sa)/i,
		abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
		wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
	},
	lr = {
		narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
		any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
	},
	fr = {
		narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
		any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
	},
	mr = {
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
	hr = {
		ordinalNumber: tr({
			matchPattern: nr,
			parsePattern: rr,
			valueCallback: (t) => Number.parseInt(t, 10),
		}),
		era: ye({
			matchPatterns: ar,
			defaultMatchWidth: "wide",
			parsePatterns: or,
			defaultParseWidth: "any",
		}),
		quarter: ye({
			matchPatterns: sr,
			defaultMatchWidth: "wide",
			parsePatterns: ir,
			defaultParseWidth: "any",
			valueCallback: (t) => t + 1,
		}),
		month: ye({
			matchPatterns: ur,
			defaultMatchWidth: "wide",
			parsePatterns: cr,
			defaultParseWidth: "any",
		}),
		day: ye({
			matchPatterns: dr,
			defaultMatchWidth: "wide",
			parsePatterns: lr,
			defaultParseWidth: "any",
		}),
		dayPeriod: ye({
			matchPatterns: fr,
			defaultMatchWidth: "any",
			parsePatterns: mr,
			defaultParseWidth: "any",
		}),
	},
	qe = {
		code: "en-US",
		formatDistance: In,
		formatLong: An,
		formatRelative: Rn,
		localize: Un,
		match: hr,
		options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
	};
function yr(t, e) {
	const n = T(t, e == null ? void 0 : e.in);
	return wt(n, Mt(n)) + 1;
}
function kt(t, e) {
	const n = T(t, e == null ? void 0 : e.in),
		r = +be(n) - +On(n);
	return Math.round(r / mt) + 1;
}
function Dt(t, e) {
	var l, d, h, g;
	const n = T(t, e == null ? void 0 : e.in),
		r = n.getFullYear(),
		a = ve(),
		o =
			(e == null ? void 0 : e.firstWeekContainsDate) ??
			((d = (l = e == null ? void 0 : e.locale) == null ? void 0 : l.options) ==
			null
				? void 0
				: d.firstWeekContainsDate) ??
			a.firstWeekContainsDate ??
			((g = (h = a.locale) == null ? void 0 : h.options) == null
				? void 0
				: g.firstWeekContainsDate) ??
			1,
		i = B((e == null ? void 0 : e.in) || t, 0);
	i.setFullYear(r + 1, 0, o), i.setHours(0, 0, 0, 0);
	const s = ue(i, e),
		u = B((e == null ? void 0 : e.in) || t, 0);
	u.setFullYear(r, 0, o), u.setHours(0, 0, 0, 0);
	const c = ue(u, e);
	return +n >= +s ? r + 1 : +n >= +c ? r : r - 1;
}
function gr(t, e) {
	var s, u, c, l;
	const n = ve(),
		r =
			(e == null ? void 0 : e.firstWeekContainsDate) ??
			((u = (s = e == null ? void 0 : e.locale) == null ? void 0 : s.options) ==
			null
				? void 0
				: u.firstWeekContainsDate) ??
			n.firstWeekContainsDate ??
			((l = (c = n.locale) == null ? void 0 : c.options) == null
				? void 0
				: l.firstWeekContainsDate) ??
			1,
		a = Dt(t, e),
		o = B((e == null ? void 0 : e.in) || t, 0);
	return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), ue(o, e);
}
function Ot(t, e) {
	const n = T(t, e == null ? void 0 : e.in),
		r = +ue(n, e) - +gr(n, e);
	return Math.round(r / mt) + 1;
}
function N(t, e) {
	const n = t < 0 ? "-" : "",
		r = Math.abs(t).toString().padStart(e, "0");
	return n + r;
}
const re = {
		y(t, e) {
			const n = t.getFullYear(),
				r = n > 0 ? n : 1 - n;
			return N(e === "yy" ? r % 100 : r, e.length);
		},
		M(t, e) {
			const n = t.getMonth();
			return e === "M" ? String(n + 1) : N(n + 1, 2);
		},
		d(t, e) {
			return N(t.getDate(), e.length);
		},
		a(t, e) {
			const n = t.getHours() / 12 >= 1 ? "pm" : "am";
			switch (e) {
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
		h(t, e) {
			return N(t.getHours() % 12 || 12, e.length);
		},
		H(t, e) {
			return N(t.getHours(), e.length);
		},
		m(t, e) {
			return N(t.getMinutes(), e.length);
		},
		s(t, e) {
			return N(t.getSeconds(), e.length);
		},
		S(t, e) {
			const n = e.length,
				r = t.getMilliseconds(),
				a = Math.trunc(r * Math.pow(10, n - 3));
			return N(a, e.length);
		},
	},
	ie = {
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night",
	},
	at = {
		G: (t, e, n) => {
			const r = t.getFullYear() > 0 ? 1 : 0;
			switch (e) {
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
		y: (t, e, n) => {
			if (e === "yo") {
				const r = t.getFullYear(),
					a = r > 0 ? r : 1 - r;
				return n.ordinalNumber(a, { unit: "year" });
			}
			return re.y(t, e);
		},
		Y: (t, e, n, r) => {
			const a = Dt(t, r),
				o = a > 0 ? a : 1 - a;
			if (e === "YY") {
				const i = o % 100;
				return N(i, 2);
			}
			return e === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : N(o, e.length);
		},
		R: (t, e) => {
			const n = gt(t);
			return N(n, e.length);
		},
		u: (t, e) => {
			const n = t.getFullYear();
			return N(n, e.length);
		},
		Q: (t, e, n) => {
			const r = Math.ceil((t.getMonth() + 1) / 3);
			switch (e) {
				case "Q":
					return String(r);
				case "QQ":
					return N(r, 2);
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
		q: (t, e, n) => {
			const r = Math.ceil((t.getMonth() + 1) / 3);
			switch (e) {
				case "q":
					return String(r);
				case "qq":
					return N(r, 2);
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
		M: (t, e, n) => {
			const r = t.getMonth();
			switch (e) {
				case "M":
				case "MM":
					return re.M(t, e);
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
		L: (t, e, n) => {
			const r = t.getMonth();
			switch (e) {
				case "L":
					return String(r + 1);
				case "LL":
					return N(r + 1, 2);
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
		w: (t, e, n, r) => {
			const a = Ot(t, r);
			return e === "wo" ? n.ordinalNumber(a, { unit: "week" }) : N(a, e.length);
		},
		I: (t, e, n) => {
			const r = kt(t);
			return e === "Io" ? n.ordinalNumber(r, { unit: "week" }) : N(r, e.length);
		},
		d: (t, e, n) =>
			e === "do" ? n.ordinalNumber(t.getDate(), { unit: "date" }) : re.d(t, e),
		D: (t, e, n) => {
			const r = yr(t);
			return e === "Do"
				? n.ordinalNumber(r, { unit: "dayOfYear" })
				: N(r, e.length);
		},
		E: (t, e, n) => {
			const r = t.getDay();
			switch (e) {
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
		e: (t, e, n, r) => {
			const a = t.getDay(),
				o = (a - r.weekStartsOn + 8) % 7 || 7;
			switch (e) {
				case "e":
					return String(o);
				case "ee":
					return N(o, 2);
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
		c: (t, e, n, r) => {
			const a = t.getDay(),
				o = (a - r.weekStartsOn + 8) % 7 || 7;
			switch (e) {
				case "c":
					return String(o);
				case "cc":
					return N(o, e.length);
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
		i: (t, e, n) => {
			const r = t.getDay(),
				a = r === 0 ? 7 : r;
			switch (e) {
				case "i":
					return String(a);
				case "ii":
					return N(a, e.length);
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
		a: (t, e, n) => {
			const a = t.getHours() / 12 >= 1 ? "pm" : "am";
			switch (e) {
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
		b: (t, e, n) => {
			const r = t.getHours();
			let a;
			switch (
				(r === 12
					? (a = ie.noon)
					: r === 0
						? (a = ie.midnight)
						: (a = r / 12 >= 1 ? "pm" : "am"),
				e)
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
		B: (t, e, n) => {
			const r = t.getHours();
			let a;
			switch (
				(r >= 17
					? (a = ie.evening)
					: r >= 12
						? (a = ie.afternoon)
						: r >= 4
							? (a = ie.morning)
							: (a = ie.night),
				e)
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
		h: (t, e, n) => {
			if (e === "ho") {
				let r = t.getHours() % 12;
				return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
			}
			return re.h(t, e);
		},
		H: (t, e, n) =>
			e === "Ho" ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : re.H(t, e),
		K: (t, e, n) => {
			const r = t.getHours() % 12;
			return e === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : N(r, e.length);
		},
		k: (t, e, n) => {
			let r = t.getHours();
			return (
				r === 0 && (r = 24),
				e === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : N(r, e.length)
			);
		},
		m: (t, e, n) =>
			e === "mo"
				? n.ordinalNumber(t.getMinutes(), { unit: "minute" })
				: re.m(t, e),
		s: (t, e, n) =>
			e === "so"
				? n.ordinalNumber(t.getSeconds(), { unit: "second" })
				: re.s(t, e),
		S: (t, e) => re.S(t, e),
		X: (t, e, n) => {
			const r = t.getTimezoneOffset();
			if (r === 0) return "Z";
			switch (e) {
				case "X":
					return st(r);
				case "XXXX":
				case "XX":
					return se(r);
				case "XXXXX":
				case "XXX":
				default:
					return se(r, ":");
			}
		},
		x: (t, e, n) => {
			const r = t.getTimezoneOffset();
			switch (e) {
				case "x":
					return st(r);
				case "xxxx":
				case "xx":
					return se(r);
				case "xxxxx":
				case "xxx":
				default:
					return se(r, ":");
			}
		},
		O: (t, e, n) => {
			const r = t.getTimezoneOffset();
			switch (e) {
				case "O":
				case "OO":
				case "OOO":
					return "GMT" + ot(r, ":");
				case "OOOO":
				default:
					return "GMT" + se(r, ":");
			}
		},
		z: (t, e, n) => {
			const r = t.getTimezoneOffset();
			switch (e) {
				case "z":
				case "zz":
				case "zzz":
					return "GMT" + ot(r, ":");
				case "zzzz":
				default:
					return "GMT" + se(r, ":");
			}
		},
		t: (t, e, n) => {
			const r = Math.trunc(+t / 1e3);
			return N(r, e.length);
		},
		T: (t, e, n) => N(+t, e.length),
	};
function ot(t, e = "") {
	const n = t > 0 ? "-" : "+",
		r = Math.abs(t),
		a = Math.trunc(r / 60),
		o = r % 60;
	return o === 0 ? n + String(a) : n + String(a) + e + N(o, 2);
}
function st(t, e) {
	return t % 60 === 0 ? (t > 0 ? "-" : "+") + N(Math.abs(t) / 60, 2) : se(t, e);
}
function se(t, e = "") {
	const n = t > 0 ? "-" : "+",
		r = Math.abs(t),
		a = N(Math.trunc(r / 60), 2),
		o = N(r % 60, 2);
	return n + a + e + o;
}
const it = (t, e) => {
		switch (t) {
			case "P":
				return e.date({ width: "short" });
			case "PP":
				return e.date({ width: "medium" });
			case "PPP":
				return e.date({ width: "long" });
			case "PPPP":
			default:
				return e.date({ width: "full" });
		}
	},
	pt = (t, e) => {
		switch (t) {
			case "p":
				return e.time({ width: "short" });
			case "pp":
				return e.time({ width: "medium" });
			case "ppp":
				return e.time({ width: "long" });
			case "pppp":
			default:
				return e.time({ width: "full" });
		}
	},
	wr = (t, e) => {
		const n = t.match(/(P+)(p+)?/) || [],
			r = n[1],
			a = n[2];
		if (!a) return it(t, e);
		let o;
		switch (r) {
			case "P":
				o = e.dateTime({ width: "short" });
				break;
			case "PP":
				o = e.dateTime({ width: "medium" });
				break;
			case "PPP":
				o = e.dateTime({ width: "long" });
				break;
			case "PPPP":
			default:
				o = e.dateTime({ width: "full" });
				break;
		}
		return o.replace("{{date}}", it(r, e)).replace("{{time}}", pt(a, e));
	},
	br = { p: pt, P: wr },
	Mr = /^D+$/,
	vr = /^Y+$/,
	kr = ["D", "DD", "YY", "YYYY"];
function Dr(t) {
	return Mr.test(t);
}
function Or(t) {
	return vr.test(t);
}
function pr(t, e, n) {
	const r = Wr(t, e, n);
	if ((console.warn(r), kr.includes(t))) throw new RangeError(r);
}
function Wr(t, e, n) {
	const r = t[0] === "Y" ? "years" : "days of the month";
	return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Cr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
	xr = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
	Sr = /^'([^]*?)'?$/,
	Nr = /''/g,
	Pr = /[a-zA-Z]/;
function Tr(t, e, n) {
	var l, d, h, g, b, O, k, M;
	const r = ve(),
		a = (n == null ? void 0 : n.locale) ?? r.locale ?? qe,
		o =
			(n == null ? void 0 : n.firstWeekContainsDate) ??
			((d = (l = n == null ? void 0 : n.locale) == null ? void 0 : l.options) ==
			null
				? void 0
				: d.firstWeekContainsDate) ??
			r.firstWeekContainsDate ??
			((g = (h = r.locale) == null ? void 0 : h.options) == null
				? void 0
				: g.firstWeekContainsDate) ??
			1,
		i =
			(n == null ? void 0 : n.weekStartsOn) ??
			((O = (b = n == null ? void 0 : n.locale) == null ? void 0 : b.options) ==
			null
				? void 0
				: O.weekStartsOn) ??
			r.weekStartsOn ??
			((M = (k = r.locale) == null ? void 0 : k.options) == null
				? void 0
				: M.weekStartsOn) ??
			0,
		s = T(t, n == null ? void 0 : n.in);
	if (!Nn(s)) throw new RangeError("Invalid time value");
	let u = e
		.match(xr)
		.map((v) => {
			const y = v[0];
			if (y === "p" || y === "P") {
				const C = br[y];
				return C(v, a.formatLong);
			}
			return v;
		})
		.join("")
		.match(Cr)
		.map((v) => {
			if (v === "''") return { isToken: !1, value: "'" };
			const y = v[0];
			if (y === "'") return { isToken: !1, value: _r(v) };
			if (at[y]) return { isToken: !0, value: v };
			if (y.match(Pr))
				throw new RangeError(
					"Format string contains an unescaped latin alphabet character `" +
						y +
						"`",
				);
			return { isToken: !1, value: v };
		});
	a.localize.preprocessor && (u = a.localize.preprocessor(s, u));
	const c = { firstWeekContainsDate: o, weekStartsOn: i, locale: a };
	return u
		.map((v) => {
			if (!v.isToken) return v.value;
			const y = v.value;
			((!(n != null && n.useAdditionalWeekYearTokens) && Or(y)) ||
				(!(n != null && n.useAdditionalDayOfYearTokens) && Dr(y))) &&
				pr(y, e, String(t));
			const C = at[y[0]];
			return C(s, y, a.localize, c);
		})
		.join("");
}
function _r(t) {
	const e = t.match(Sr);
	return e ? e[1].replace(Nr, "'") : t;
}
function Er(t, e) {
	const n = T(t, e == null ? void 0 : e.in),
		r = n.getFullYear(),
		a = n.getMonth(),
		o = B(n, 0);
	return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Yr(t, e) {
	return T(t, e == null ? void 0 : e.in).getMonth();
}
function Fr(t, e) {
	return T(t, e == null ? void 0 : e.in).getFullYear();
}
function Br(t, e) {
	return +T(t) > +T(e);
}
function jr(t, e) {
	return +T(t) < +T(e);
}
function Ir(t, e, n) {
	const [r, a] = ce(n == null ? void 0 : n.in, t, e);
	return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function Hr(t, e, n) {
	const [r, a] = ce(n == null ? void 0 : n.in, t, e);
	return r.getFullYear() === a.getFullYear();
}
function $r(t, e, n) {
	const r = T(t, n == null ? void 0 : n.in),
		a = r.getFullYear(),
		o = r.getDate(),
		i = B(t, 0);
	i.setFullYear(a, e, 15), i.setHours(0, 0, 0, 0);
	const s = Er(i);
	return r.setMonth(e, Math.min(o, s)), r;
}
function qr(t, e, n) {
	const r = T(t, n == null ? void 0 : n.in);
	return isNaN(+r) ? B(t, Number.NaN) : (r.setFullYear(e), r);
}
const ut = 5,
	Ar = 4;
function zr(t, e) {
	const n = e.startOfMonth(t),
		r = n.getDay() > 0 ? n.getDay() : 7,
		a = e.addDays(t, -r + 1),
		o = e.addDays(a, ut * 7 - 1);
	return e.getMonth(t) === e.getMonth(o) ? ut : Ar;
}
function Wt(t, e) {
	const n = e.startOfMonth(t),
		r = n.getDay();
	return r === 1
		? n
		: r === 0
			? e.addDays(n, -1 * 6)
			: e.addDays(n, -1 * (r - 1));
}
function Rr(t, e) {
	const n = Wt(t, e),
		r = zr(t, e);
	return e.addDays(n, r * 7 - 1);
}
class te {
	constructor(e, n) {
		(this.Date = Date),
			(this.today = () => {
				var r;
				return (r = this.overrides) != null && r.today
					? this.overrides.today()
					: this.options.timeZone
						? I.tz(this.options.timeZone)
						: new this.Date();
			}),
			(this.newDate = (r, a, o) => {
				var i;
				return (i = this.overrides) != null && i.newDate
					? this.overrides.newDate(r, a, o)
					: this.options.timeZone
						? new I(r, a, o, this.options.timeZone)
						: new Date(r, a, o);
			}),
			(this.addDays = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.addDays
					? this.overrides.addDays(r, a)
					: ht(r, a);
			}),
			(this.addMonths = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.addMonths
					? this.overrides.addMonths(r, a)
					: yt(r, a);
			}),
			(this.addWeeks = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.addWeeks
					? this.overrides.addWeeks(r, a)
					: pn(r, a);
			}),
			(this.addYears = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.addYears
					? this.overrides.addYears(r, a)
					: Wn(r, a);
			}),
			(this.differenceInCalendarDays = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.differenceInCalendarDays
					? this.overrides.differenceInCalendarDays(r, a)
					: wt(r, a);
			}),
			(this.differenceInCalendarMonths = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.differenceInCalendarMonths
					? this.overrides.differenceInCalendarMonths(r, a)
					: Pn(r, a);
			}),
			(this.eachMonthOfInterval = (r) => {
				var a;
				return (a = this.overrides) != null && a.eachMonthOfInterval
					? this.overrides.eachMonthOfInterval(r)
					: En(r);
			}),
			(this.endOfBroadcastWeek = (r) => {
				var a;
				return (a = this.overrides) != null && a.endOfBroadcastWeek
					? this.overrides.endOfBroadcastWeek(r)
					: Rr(r, this);
			}),
			(this.endOfISOWeek = (r) => {
				var a;
				return (a = this.overrides) != null && a.endOfISOWeek
					? this.overrides.endOfISOWeek(r)
					: Bn(r);
			}),
			(this.endOfMonth = (r) => {
				var a;
				return (a = this.overrides) != null && a.endOfMonth
					? this.overrides.endOfMonth(r)
					: Tn(r);
			}),
			(this.endOfWeek = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.endOfWeek
					? this.overrides.endOfWeek(r, a)
					: vt(r, this.options);
			}),
			(this.endOfYear = (r) => {
				var a;
				return (a = this.overrides) != null && a.endOfYear
					? this.overrides.endOfYear(r)
					: Fn(r);
			}),
			(this.format = (r, a, o) => {
				var s;
				const i =
					(s = this.overrides) != null && s.format
						? this.overrides.format(r, a, this.options)
						: Tr(r, a, this.options);
				return this.options.numerals && this.options.numerals !== "latn"
					? this.replaceDigits(i)
					: i;
			}),
			(this.getISOWeek = (r) => {
				var a;
				return (a = this.overrides) != null && a.getISOWeek
					? this.overrides.getISOWeek(r)
					: kt(r);
			}),
			(this.getMonth = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.getMonth
					? this.overrides.getMonth(r, this.options)
					: Yr(r, this.options);
			}),
			(this.getYear = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.getYear
					? this.overrides.getYear(r, this.options)
					: Fr(r, this.options);
			}),
			(this.getWeek = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.getWeek
					? this.overrides.getWeek(r, this.options)
					: Ot(r, this.options);
			}),
			(this.isAfter = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.isAfter
					? this.overrides.isAfter(r, a)
					: Br(r, a);
			}),
			(this.isBefore = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.isBefore
					? this.overrides.isBefore(r, a)
					: jr(r, a);
			}),
			(this.isDate = (r) => {
				var a;
				return (a = this.overrides) != null && a.isDate
					? this.overrides.isDate(r)
					: bt(r);
			}),
			(this.isSameDay = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.isSameDay
					? this.overrides.isSameDay(r, a)
					: Sn(r, a);
			}),
			(this.isSameMonth = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.isSameMonth
					? this.overrides.isSameMonth(r, a)
					: Ir(r, a);
			}),
			(this.isSameYear = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.isSameYear
					? this.overrides.isSameYear(r, a)
					: Hr(r, a);
			}),
			(this.max = (r) => {
				var a;
				return (a = this.overrides) != null && a.max
					? this.overrides.max(r)
					: Cn(r);
			}),
			(this.min = (r) => {
				var a;
				return (a = this.overrides) != null && a.min
					? this.overrides.min(r)
					: xn(r);
			}),
			(this.setMonth = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.setMonth
					? this.overrides.setMonth(r, a)
					: $r(r, a);
			}),
			(this.setYear = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.setYear
					? this.overrides.setYear(r, a)
					: qr(r, a);
			}),
			(this.startOfBroadcastWeek = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.startOfBroadcastWeek
					? this.overrides.startOfBroadcastWeek(r, this)
					: Wt(r, this);
			}),
			(this.startOfDay = (r) => {
				var a;
				return (a = this.overrides) != null && a.startOfDay
					? this.overrides.startOfDay(r)
					: Me(r);
			}),
			(this.startOfISOWeek = (r) => {
				var a;
				return (a = this.overrides) != null && a.startOfISOWeek
					? this.overrides.startOfISOWeek(r)
					: be(r);
			}),
			(this.startOfMonth = (r) => {
				var a;
				return (a = this.overrides) != null && a.startOfMonth
					? this.overrides.startOfMonth(r)
					: Yn(r);
			}),
			(this.startOfWeek = (r, a) => {
				var o;
				return (o = this.overrides) != null && o.startOfWeek
					? this.overrides.startOfWeek(r, this.options)
					: ue(r, this.options);
			}),
			(this.startOfYear = (r) => {
				var a;
				return (a = this.overrides) != null && a.startOfYear
					? this.overrides.startOfYear(r)
					: Mt(r);
			}),
			(this.options = { locale: qe, ...e }),
			(this.overrides = n);
	}
	getDigitMap() {
		const { numerals: e = "latn" } = this.options,
			n = new Intl.NumberFormat("en-US", { numberingSystem: e }),
			r = {};
		for (let a = 0; a < 10; a++) r[a.toString()] = n.format(a);
		return r;
	}
	replaceDigits(e) {
		const n = this.getDigitMap();
		return e.replace(/\d/g, (r) => n[r] || r);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
}
const V = new te();
class Ct {
	constructor(e, n, r = V) {
		(this.date = e),
			(this.displayMonth = n),
			(this.outside = !!(n && !r.isSameMonth(e, n))),
			(this.dateLib = r);
	}
	isEqualTo(e) {
		return (
			this.dateLib.isSameDay(e.date, this.date) &&
			this.dateLib.isSameMonth(e.displayMonth, this.displayMonth)
		);
	}
}
class Gr {
	constructor(e, n) {
		(this.date = e), (this.weeks = n);
	}
}
class Jr {
	constructor(e, n) {
		(this.days = n), (this.weekNumber = e);
	}
}
function K(t, e, n = !1, r = V) {
	let { from: a, to: o } = t;
	const { differenceInCalendarDays: i, isSameDay: s } = r;
	return a && o
		? (i(o, a) < 0 && ([a, o] = [o, a]),
			i(e, a) >= (n ? 1 : 0) && i(o, e) >= (n ? 1 : 0))
		: !n && o
			? s(o, e)
			: !n && a
				? s(a, e)
				: !1;
}
function xt(t) {
	return !!(t && typeof t == "object" && "before" in t && "after" in t);
}
function Ae(t) {
	return !!(t && typeof t == "object" && "from" in t);
}
function St(t) {
	return !!(t && typeof t == "object" && "after" in t);
}
function Nt(t) {
	return !!(t && typeof t == "object" && "before" in t);
}
function Pt(t) {
	return !!(t && typeof t == "object" && "dayOfWeek" in t);
}
function Tt(t, e) {
	return Array.isArray(t) && t.every(e.isDate);
}
function ee(t, e, n = V) {
	const r = Array.isArray(e) ? e : [e],
		{ isSameDay: a, differenceInCalendarDays: o, isAfter: i } = n;
	return r.some((s) => {
		if (typeof s == "boolean") return s;
		if (n.isDate(s)) return a(t, s);
		if (Tt(s, n)) return s.includes(t);
		if (Ae(s)) return K(s, t, !1, n);
		if (Pt(s))
			return Array.isArray(s.dayOfWeek)
				? s.dayOfWeek.includes(t.getDay())
				: s.dayOfWeek === t.getDay();
		if (xt(s)) {
			const u = o(s.before, t),
				c = o(s.after, t),
				l = u > 0,
				d = c < 0;
			return i(s.before, s.after) ? d && l : l || d;
		}
		return St(s)
			? o(t, s.after) > 0
			: Nt(s)
				? o(s.before, t) > 0
				: typeof s == "function"
					? s(t)
					: !1;
	});
}
function Xr(t, e, n) {
	const {
			disabled: r,
			hidden: a,
			modifiers: o,
			showOutsideDays: i,
			broadcastCalendar: s,
			today: u,
		} = e,
		{
			isSameDay: c,
			isSameMonth: l,
			startOfMonth: d,
			isBefore: h,
			endOfMonth: g,
			isAfter: b,
		} = n,
		O = e.startMonth && d(e.startMonth),
		k = e.endMonth && g(e.endMonth),
		M = {
			[F.focused]: [],
			[F.outside]: [],
			[F.disabled]: [],
			[F.hidden]: [],
			[F.today]: [],
		},
		v = {};
	for (const y of t) {
		const { date: C, displayMonth: f } = y,
			p = !!(f && !l(C, f)),
			D = !!(O && h(C, O)),
			E = !!(k && b(C, k)),
			z = !!(r && ee(C, r, n)),
			q =
				!!(a && ee(C, a, n)) ||
				D ||
				E ||
				(!s && !i && p) ||
				(s && i === !1 && p),
			H = c(C, u ?? n.today());
		p && M.outside.push(y),
			z && M.disabled.push(y),
			q && M.hidden.push(y),
			H && M.today.push(y),
			o &&
				Object.keys(o).forEach(($) => {
					const oe = o == null ? void 0 : o[$];
					oe && ee(C, oe, n) && (v[$] ? v[$].push(y) : (v[$] = [y]));
				});
	}
	return (y) => {
		const C = {
				[F.focused]: !1,
				[F.disabled]: !1,
				[F.hidden]: !1,
				[F.outside]: !1,
				[F.today]: !1,
			},
			f = {};
		for (const p in M) {
			const D = M[p];
			C[p] = D.some((E) => E === y);
		}
		for (const p in v) f[p] = v[p].some((D) => D === y);
		return { ...C, ...f };
	};
}
function Lr(t, e, n = {}) {
	return Object.entries(t)
		.filter(([, a]) => a === !0)
		.reduce(
			(a, [o]) => (
				n[o]
					? a.push(n[o])
					: e[F[o]]
						? a.push(e[F[o]])
						: e[X[o]] && a.push(e[X[o]]),
				a
			),
			[e[w.Day]],
		);
}
function Qr(t) {
	return m.createElement("button", { ...t });
}
function Zr(t) {
	return m.createElement("span", { ...t });
}
function Vr(t) {
	const { size: e = 24, orientation: n = "left", className: r } = t;
	return m.createElement(
		"svg",
		{ className: r, width: e, height: e, viewBox: "0 0 24 24" },
		n === "up" &&
			m.createElement("polygon", {
				points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28",
			}),
		n === "down" &&
			m.createElement("polygon", {
				points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72",
			}),
		n === "left" &&
			m.createElement("polygon", {
				points:
					"16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20",
			}),
		n === "right" &&
			m.createElement("polygon", {
				points:
					"8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20",
			}),
	);
}
function Ur(t) {
	const { day: e, modifiers: n, ...r } = t;
	return m.createElement("td", { ...r });
}
function Kr(t) {
	const { day: e, modifiers: n, ...r } = t,
		a = m.useRef(null);
	return (
		m.useEffect(() => {
			var o;
			n.focused && ((o = a.current) == null || o.focus());
		}, [n.focused]),
		m.createElement("button", { ref: a, ...r })
	);
}
function ea(t) {
	const { options: e, className: n, components: r, classNames: a, ...o } = t,
		i = [a[w.Dropdown], n].join(" "),
		s = e == null ? void 0 : e.find(({ value: u }) => u === o.value);
	return m.createElement(
		"span",
		{ "data-disabled": o.disabled, className: a[w.DropdownRoot] },
		m.createElement(
			r.Select,
			{ className: i, ...o },
			e == null
				? void 0
				: e.map(({ value: u, label: c, disabled: l }) =>
						m.createElement(r.Option, { key: u, value: u, disabled: l }, c),
					),
		),
		m.createElement(
			"span",
			{ className: a[w.CaptionLabel], "aria-hidden": !0 },
			s == null ? void 0 : s.label,
			m.createElement(r.Chevron, {
				orientation: "down",
				size: 18,
				className: a[w.Chevron],
			}),
		),
	);
}
function ta(t) {
	return m.createElement("div", { ...t });
}
function na(t) {
	return m.createElement("div", { ...t });
}
function ra(t) {
	const { calendarMonth: e, displayIndex: n, ...r } = t;
	return m.createElement("div", { ...r }, t.children);
}
function aa(t) {
	const { calendarMonth: e, displayIndex: n, ...r } = t;
	return m.createElement("div", { ...r });
}
function oa(t) {
	return m.createElement("table", { ...t });
}
function sa(t) {
	return m.createElement("div", { ...t });
}
const _t = P.createContext(void 0);
function ke() {
	const t = P.useContext(_t);
	if (t === void 0)
		throw new Error("useDayPicker() must be used within a custom component.");
	return t;
}
function ia(t) {
	const { components: e } = ke();
	return m.createElement(e.Dropdown, { ...t });
}
function ua(t) {
	const {
			onPreviousClick: e,
			onNextClick: n,
			previousMonth: r,
			nextMonth: a,
			...o
		} = t,
		{
			components: i,
			classNames: s,
			labels: { labelPrevious: u, labelNext: c },
		} = ke(),
		l = P.useCallback(
			(h) => {
				a && (n == null || n(h));
			},
			[a, n],
		),
		d = P.useCallback(
			(h) => {
				r && (e == null || e(h));
			},
			[r, e],
		);
	return m.createElement(
		"nav",
		{ ...o },
		m.createElement(
			i.PreviousMonthButton,
			{
				type: "button",
				className: s[w.PreviousMonthButton],
				tabIndex: r ? void 0 : -1,
				"aria-disabled": r ? void 0 : !0,
				"aria-label": u(r),
				onClick: d,
			},
			m.createElement(i.Chevron, {
				disabled: r ? void 0 : !0,
				className: s[w.Chevron],
				orientation: "left",
			}),
		),
		m.createElement(
			i.NextMonthButton,
			{
				type: "button",
				className: s[w.NextMonthButton],
				tabIndex: a ? void 0 : -1,
				"aria-disabled": a ? void 0 : !0,
				"aria-label": c(a),
				onClick: l,
			},
			m.createElement(i.Chevron, {
				disabled: a ? void 0 : !0,
				orientation: "right",
				className: s[w.Chevron],
			}),
		),
	);
}
function ca(t) {
	const { components: e } = ke();
	return m.createElement(e.Button, { ...t });
}
function da(t) {
	return m.createElement("option", { ...t });
}
function la(t) {
	const { components: e } = ke();
	return m.createElement(e.Button, { ...t });
}
function fa(t) {
	const { rootRef: e, ...n } = t;
	return m.createElement("div", { ...n, ref: e });
}
function ma(t) {
	return m.createElement("select", { ...t });
}
function ha(t) {
	const { week: e, ...n } = t;
	return m.createElement("tr", { ...n });
}
function ya(t) {
	return m.createElement("th", { ...t });
}
function ga(t) {
	return m.createElement(
		"thead",
		{ "aria-hidden": !0 },
		m.createElement("tr", { ...t }),
	);
}
function wa(t) {
	const { week: e, ...n } = t;
	return m.createElement("th", { ...n });
}
function ba(t) {
	return m.createElement("th", { ...t });
}
function Ma(t) {
	return m.createElement("tbody", { ...t });
}
function va(t) {
	const { components: e } = ke();
	return m.createElement(e.Dropdown, { ...t });
}
const ka = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			Button: Qr,
			CaptionLabel: Zr,
			Chevron: Vr,
			Day: Ur,
			DayButton: Kr,
			Dropdown: ea,
			DropdownNav: ta,
			Footer: na,
			Month: ra,
			MonthCaption: aa,
			MonthGrid: oa,
			Months: sa,
			MonthsDropdown: ia,
			Nav: ua,
			NextMonthButton: ca,
			Option: da,
			PreviousMonthButton: la,
			Root: fa,
			Select: ma,
			Week: ha,
			WeekNumber: wa,
			WeekNumberHeader: ba,
			Weekday: ya,
			Weekdays: ga,
			Weeks: Ma,
			YearsDropdown: va,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);
function Da(t) {
	return { ...ka, ...t };
}
function Oa(t) {
	const e = {
		"data-mode": t.mode ?? void 0,
		"data-required": "required" in t ? t.required : void 0,
		"data-multiple-months":
			(t.numberOfMonths && t.numberOfMonths > 1) || void 0,
		"data-week-numbers": t.showWeekNumber || void 0,
		"data-broadcast-calendar": t.broadcastCalendar || void 0,
		"data-nav-layout": t.navLayout || void 0,
	};
	return (
		Object.entries(t).forEach(([n, r]) => {
			n.startsWith("data-") && (e[n] = r);
		}),
		e
	);
}
function ze() {
	const t = {};
	for (const e in w) t[w[e]] = `rdp-${w[e]}`;
	for (const e in F) t[F[e]] = `rdp-${F[e]}`;
	for (const e in X) t[X[e]] = `rdp-${X[e]}`;
	for (const e in A) t[A[e]] = `rdp-${A[e]}`;
	return t;
}
function Et(t, e, n) {
	return (n ?? new te(e)).format(t, "LLLL y");
}
const pa = Et;
function Wa(t, e, n) {
	return (n ?? new te(e)).format(t, "d");
}
function Ca(t, e = V) {
	return e.format(t, "LLLL");
}
function xa(t, e = V) {
	return t < 10
		? e.formatNumber(`0${t.toLocaleString()}`)
		: e.formatNumber(`${t.toLocaleString()}`);
}
function Sa() {
	return "";
}
function Na(t, e, n) {
	return (n ?? new te(e)).format(t, "cccccc");
}
function Yt(t, e = V) {
	return e.format(t, "yyyy");
}
const Pa = Yt,
	Ta = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				formatCaption: Et,
				formatDay: Wa,
				formatMonthCaption: pa,
				formatMonthDropdown: Ca,
				formatWeekNumber: xa,
				formatWeekNumberHeader: Sa,
				formatWeekdayName: Na,
				formatYearCaption: Pa,
				formatYearDropdown: Yt,
			},
			Symbol.toStringTag,
			{ value: "Module" },
		),
	);
function _a(t) {
	return (
		t != null &&
			t.formatMonthCaption &&
			!t.formatCaption &&
			(t.formatCaption = t.formatMonthCaption),
		t != null &&
			t.formatYearCaption &&
			!t.formatYearDropdown &&
			(t.formatYearDropdown = t.formatYearCaption),
		{ ...Ta, ...t }
	);
}
function Ea(t, e, n, r, a) {
	const {
		startOfMonth: o,
		startOfYear: i,
		endOfYear: s,
		eachMonthOfInterval: u,
		getMonth: c,
	} = a;
	return u({ start: i(t), end: s(t) }).map((h) => {
		const g = r.formatMonthDropdown(h, a),
			b = c(h),
			O = (e && h < o(e)) || (n && h > o(n)) || !1;
		return { value: b, label: g, disabled: O };
	});
}
function Ya(t, e = {}, n = {}) {
	let r = { ...(e == null ? void 0 : e[w.Day]) };
	return (
		Object.entries(t)
			.filter(([, a]) => a === !0)
			.forEach(([a]) => {
				r = { ...r, ...(n == null ? void 0 : n[a]) };
			}),
		r
	);
}
function Fa(t, e, n) {
	const r = t.today(),
		a = e ? t.startOfISOWeek(r) : t.startOfWeek(r),
		o = [];
	for (let i = 0; i < 7; i++) {
		const s = t.addDays(a, i);
		o.push(s);
	}
	return o;
}
function Ba(t, e, n, r) {
	if (!t || !e) return;
	const {
			startOfYear: a,
			endOfYear: o,
			addYears: i,
			getYear: s,
			isBefore: u,
			isSameYear: c,
		} = r,
		l = a(t),
		d = o(e),
		h = [];
	let g = l;
	while (u(g, d) || c(g, d)) h.push(g), (g = i(g, 1));
	return h.map((b) => {
		const O = n.formatYearDropdown(b, r);
		return { value: s(b), label: O, disabled: !1 };
	});
}
function Ft(t, e, n) {
	return (n ?? new te(e)).format(t, "LLLL y");
}
const ja = Ft;
function Ia(t, e, n, r) {
	let a = (r ?? new te(n)).format(t, "PPPP");
	return e != null && e.today && (a = `Today, ${a}`), a;
}
function Bt(t, e, n, r) {
	let a = (r ?? new te(n)).format(t, "PPPP");
	return (
		e.today && (a = `Today, ${a}`), e.selected && (a = `${a}, selected`), a
	);
}
const Ha = Bt;
function $a() {
	return "";
}
function qa(t) {
	return "Choose the Month";
}
function Aa(t) {
	return "Go to the Next Month";
}
function za(t) {
	return "Go to the Previous Month";
}
function Ra(t, e, n) {
	return (n ?? new te(e)).format(t, "cccc");
}
function Ga(t, e) {
	return `Week ${t}`;
}
function Ja(t) {
	return "Week Number";
}
function Xa(t) {
	return "Choose the Year";
}
const La = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				labelCaption: ja,
				labelDay: Ha,
				labelDayButton: Bt,
				labelGrid: Ft,
				labelGridcell: Ia,
				labelMonthDropdown: qa,
				labelNav: $a,
				labelNext: Aa,
				labelPrevious: za,
				labelWeekNumber: Ga,
				labelWeekNumberHeader: Ja,
				labelWeekday: Ra,
				labelYearDropdown: Xa,
			},
			Symbol.toStringTag,
			{ value: "Module" },
		),
	),
	De = (t) => (t instanceof HTMLElement ? t : null),
	je = (t) => [...(t.querySelectorAll("[data-animated-month]") ?? [])],
	Qa = (t) => De(t.querySelector("[data-animated-month]")),
	Ie = (t) => De(t.querySelector("[data-animated-caption]")),
	He = (t) => De(t.querySelector("[data-animated-weeks]")),
	Za = (t) => De(t.querySelector("[data-animated-nav]")),
	Va = (t) => De(t.querySelector("[data-animated-weekdays]"));
function Ua(t, e, { classNames: n, months: r, focused: a, dateLib: o }) {
	const i = P.useRef(null),
		s = P.useRef(r),
		u = P.useRef(!1);
	P.useLayoutEffect(() => {
		const c = s.current;
		if (
			((s.current = r),
			!e ||
				!t.current ||
				!(t.current instanceof HTMLElement) ||
				r.length === 0 ||
				c.length === 0 ||
				r.length !== c.length)
		)
			return;
		const l = o.isSameMonth(r[0].date, c[0].date),
			d = o.isAfter(r[0].date, c[0].date),
			h = d ? n[A.caption_after_enter] : n[A.caption_before_enter],
			g = d ? n[A.weeks_after_enter] : n[A.weeks_before_enter],
			b = i.current,
			O = t.current.cloneNode(!0);
		if (
			(O instanceof HTMLElement
				? (je(O).forEach((y) => {
						if (!(y instanceof HTMLElement)) return;
						const C = Qa(y);
						C && y.contains(C) && y.removeChild(C);
						const f = Ie(y);
						f && f.classList.remove(h);
						const p = He(y);
						p && p.classList.remove(g);
					}),
					(i.current = O))
				: (i.current = null),
			u.current || l || a)
		)
			return;
		const k = b instanceof HTMLElement ? je(b) : [],
			M = je(t.current);
		if (
			M &&
			M.every((v) => v instanceof HTMLElement) &&
			k &&
			k.every((v) => v instanceof HTMLElement)
		) {
			(u.current = !0), (t.current.style.isolation = "isolate");
			const v = Za(t.current);
			v && (v.style.zIndex = "1"),
				M.forEach((y, C) => {
					const f = k[C];
					if (!f) return;
					(y.style.position = "relative"), (y.style.overflow = "hidden");
					const p = Ie(y);
					p && p.classList.add(h);
					const D = He(y);
					D && D.classList.add(g);
					const E = () => {
						(u.current = !1),
							t.current && (t.current.style.isolation = ""),
							v && (v.style.zIndex = ""),
							p && p.classList.remove(h),
							D && D.classList.remove(g),
							(y.style.position = ""),
							(y.style.overflow = ""),
							y.contains(f) && y.removeChild(f);
					};
					(f.style.pointerEvents = "none"),
						(f.style.position = "absolute"),
						(f.style.overflow = "hidden"),
						f.setAttribute("aria-hidden", "true");
					const z = Va(f);
					z && (z.style.opacity = "0");
					const q = Ie(f);
					q &&
						(q.classList.add(
							d ? n[A.caption_before_exit] : n[A.caption_after_exit],
						),
						q.addEventListener("animationend", E));
					const H = He(f);
					H &&
						H.classList.add(d ? n[A.weeks_before_exit] : n[A.weeks_after_exit]),
						y.insertBefore(f, y.firstChild);
				});
		}
	});
}
function Ka(t, e, n, r) {
	const a = t[0],
		o = t[t.length - 1],
		{ ISOWeek: i, fixedWeeks: s, broadcastCalendar: u } = n ?? {},
		{
			addDays: c,
			differenceInCalendarDays: l,
			differenceInCalendarMonths: d,
			endOfBroadcastWeek: h,
			endOfISOWeek: g,
			endOfMonth: b,
			endOfWeek: O,
			isAfter: k,
			startOfBroadcastWeek: M,
			startOfISOWeek: v,
			startOfWeek: y,
		} = r,
		C = u ? M(a, r) : i ? v(a) : y(a),
		f = u ? h(o) : i ? g(b(o)) : O(b(o)),
		p = l(f, C),
		D = d(o, a) + 1,
		E = [];
	for (let H = 0; H <= p; H++) {
		const $ = c(C, H);
		if (e && k($, e)) break;
		E.push($);
	}
	const q = (u ? 35 : 42) * D;
	if (s && E.length < q) {
		const H = q - E.length;
		for (let $ = 0; $ < H; $++) {
			const oe = c(E[E.length - 1], 1);
			E.push(oe);
		}
	}
	return E;
}
function eo(t) {
	const e = [];
	return t.reduce((n, r) => {
		const a = r.weeks.reduce((o, i) => [...o, ...i.days], e);
		return [...n, ...a];
	}, e);
}
function to(t, e, n, r) {
	const { numberOfMonths: a = 1 } = n,
		o = [];
	for (let i = 0; i < a; i++) {
		const s = r.addMonths(t, i);
		if (e && s > e) break;
		o.push(s);
	}
	return o;
}
function ct(t, e) {
	const {
		month: n,
		defaultMonth: r,
		today: a = e.today(),
		numberOfMonths: o = 1,
		endMonth: i,
		startMonth: s,
	} = t;
	let u = n || r || a;
	const { differenceInCalendarMonths: c, addMonths: l, startOfMonth: d } = e;
	if (i && c(i, u) < 0) {
		const h = -1 * (o - 1);
		u = l(i, h);
	}
	return s && c(u, s) < 0 && (u = s), d(u);
}
function no(t, e, n, r) {
	const {
			addDays: a,
			endOfBroadcastWeek: o,
			endOfISOWeek: i,
			endOfMonth: s,
			endOfWeek: u,
			getISOWeek: c,
			getWeek: l,
			startOfBroadcastWeek: d,
			startOfISOWeek: h,
			startOfWeek: g,
		} = r,
		b = t.reduce((O, k) => {
			const M = n.broadcastCalendar ? d(k, r) : n.ISOWeek ? h(k) : g(k),
				v = n.broadcastCalendar ? o(k) : n.ISOWeek ? i(s(k)) : u(s(k)),
				y = e.filter((D) => D >= M && D <= v),
				C = n.broadcastCalendar ? 35 : 42;
			if (n.fixedWeeks && y.length < C) {
				const D = e.filter((E) => {
					const z = C - y.length;
					return E > v && E <= a(v, z);
				});
				y.push(...D);
			}
			const f = y.reduce((D, E) => {
					const z = n.ISOWeek ? c(E) : l(E),
						q = D.find(($) => $.weekNumber === z),
						H = new Ct(E, k, r);
					return q ? q.days.push(H) : D.push(new Jr(z, [H])), D;
				}, []),
				p = new Gr(k, f);
			return O.push(p), O;
		}, []);
	return n.reverseMonths ? b.reverse() : b;
}
function ro(t, e) {
	let { startMonth: n, endMonth: r } = t;
	const {
			startOfYear: a,
			startOfDay: o,
			startOfMonth: i,
			endOfMonth: s,
			addYears: u,
			endOfYear: c,
			newDate: l,
			today: d,
		} = e,
		{ fromYear: h, toYear: g, fromMonth: b, toMonth: O } = t;
	!n && b && (n = b),
		!n && h && (n = e.newDate(h, 0, 1)),
		!r && O && (r = O),
		!r && g && (r = l(g, 11, 31));
	const k =
		t.captionLayout === "dropdown" || t.captionLayout === "dropdown-years";
	return (
		n
			? (n = i(n))
			: h
				? (n = l(h, 0, 1))
				: !n && k && (n = a(u(t.today ?? d(), -100))),
		r
			? (r = s(r))
			: g
				? (r = l(g, 11, 31))
				: !r && k && (r = c(t.today ?? d())),
		[n && o(n), r && o(r)]
	);
}
function ao(t, e, n, r) {
	if (n.disableNavigation) return;
	const { pagedNavigation: a, numberOfMonths: o = 1 } = n,
		{ startOfMonth: i, addMonths: s, differenceInCalendarMonths: u } = r,
		c = a ? o : 1,
		l = i(t);
	if (!e) return s(l, c);
	if (!(u(e, t) < o)) return s(l, c);
}
function oo(t, e, n, r) {
	if (n.disableNavigation) return;
	const { pagedNavigation: a, numberOfMonths: o } = n,
		{ startOfMonth: i, addMonths: s, differenceInCalendarMonths: u } = r,
		c = a ? (o ?? 1) : 1,
		l = i(t);
	if (!e) return s(l, -c);
	if (!(u(l, e) <= 0)) return s(l, -c);
}
function so(t) {
	const e = [];
	return t.reduce((n, r) => [...n, ...r.weeks], e);
}
function xe(t, e) {
	const [n, r] = P.useState(t);
	return [e === void 0 ? n : e, r];
}
function io(t, e) {
	const [n, r] = ro(t, e),
		{ startOfMonth: a, endOfMonth: o } = e,
		i = ct(t, e),
		[s, u] = xe(i, t.month ? i : void 0);
	P.useEffect(() => {
		const p = ct(t, e);
		u(p);
	}, [t.timeZone]);
	const c = to(s, r, t, e),
		l = Ka(c, t.endMonth ? o(t.endMonth) : void 0, t, e),
		d = no(c, l, t, e),
		h = so(d),
		g = eo(d),
		b = oo(s, n, t, e),
		O = ao(s, r, t, e),
		{ disableNavigation: k, onMonthChange: M } = t,
		v = (p) => h.some((D) => D.days.some((E) => E.isEqualTo(p))),
		y = (p) => {
			if (k) return;
			let D = a(p);
			n && D < a(n) && (D = a(n)),
				r && D > a(r) && (D = a(r)),
				u(D),
				M == null || M(D);
		};
	return {
		months: d,
		weeks: h,
		days: g,
		navStart: n,
		navEnd: r,
		previousMonth: b,
		nextMonth: O,
		goToMonth: y,
		goToDay: (p) => {
			v(p) || y(p.date);
		},
	};
}
var Q;
((t) => {
	(t[(t.Today = 0)] = "Today"),
		(t[(t.Selected = 1)] = "Selected"),
		(t[(t.LastFocused = 2)] = "LastFocused"),
		(t[(t.FocusedModifier = 3)] = "FocusedModifier");
})(Q || (Q = {}));
function dt(t) {
	return !t[F.disabled] && !t[F.hidden] && !t[F.outside];
}
function uo(t, e, n, r) {
	let a,
		o = -1;
	for (const i of t) {
		const s = e(i);
		dt(s) &&
			(s[F.focused] && o < Q.FocusedModifier
				? ((a = i), (o = Q.FocusedModifier))
				: r != null && r.isEqualTo(i) && o < Q.LastFocused
					? ((a = i), (o = Q.LastFocused))
					: n(i.date) && o < Q.Selected
						? ((a = i), (o = Q.Selected))
						: s[F.today] && o < Q.Today && ((a = i), (o = Q.Today)));
	}
	return a || (a = t.find((i) => dt(e(i)))), a;
}
function co(t, e, n, r, a, o, i) {
	const { ISOWeek: s, broadcastCalendar: u } = o,
		{
			addDays: c,
			addMonths: l,
			addWeeks: d,
			addYears: h,
			endOfBroadcastWeek: g,
			endOfISOWeek: b,
			endOfWeek: O,
			max: k,
			min: M,
			startOfBroadcastWeek: v,
			startOfISOWeek: y,
			startOfWeek: C,
		} = i;
	let p = {
		day: c,
		week: d,
		month: l,
		year: h,
		startOfWeek: (D) => (u ? v(D, i) : s ? y(D) : C(D)),
		endOfWeek: (D) => (u ? g(D) : s ? b(D) : O(D)),
	}[t](n, e === "after" ? 1 : -1);
	return (
		e === "before" && r
			? (p = k([r, p]))
			: e === "after" && a && (p = M([a, p])),
		p
	);
}
function jt(t, e, n, r, a, o, i, s = 0) {
	if (s > 365) return;
	const u = co(t, e, n.date, r, a, o, i),
		c = !!(o.disabled && ee(u, o.disabled, i)),
		l = !!(o.hidden && ee(u, o.hidden, i)),
		d = u,
		h = new Ct(u, d, i);
	return !c && !l ? h : jt(t, e, h, r, a, o, i, s + 1);
}
function lo(t, e, n, r, a) {
	const { autoFocus: o } = t,
		[i, s] = P.useState(),
		u = uo(e.days, n, r || (() => !1), i),
		[c, l] = P.useState(o ? u : void 0);
	return {
		isFocusTarget: (O) => !!(u != null && u.isEqualTo(O)),
		setFocused: l,
		focused: c,
		blur: () => {
			s(c), l(void 0);
		},
		moveFocus: (O, k) => {
			if (!c) return;
			const M = jt(O, k, c, e.navStart, e.navEnd, t, a);
			M && (e.goToDay(M), l(M));
		},
	};
}
function fo(t, e) {
	const { selected: n, required: r, onSelect: a } = t,
		[o, i] = xe(n, a ? n : void 0),
		s = a ? n : o,
		{ isSameDay: u } = e,
		c = (g) => (s == null ? void 0 : s.some((b) => u(b, g))) ?? !1,
		{ min: l, max: d } = t;
	return {
		selected: s,
		select: (g, b, O) => {
			let k = [...(s ?? [])];
			if (c(g)) {
				if (
					(s == null ? void 0 : s.length) === l ||
					(r && (s == null ? void 0 : s.length) === 1)
				)
					return;
				k = s == null ? void 0 : s.filter((M) => !u(M, g));
			} else
				(s == null ? void 0 : s.length) === d ? (k = [g]) : (k = [...k, g]);
			return a || i(k), a == null || a(k, g, b, O), k;
		},
		isSelected: c,
	};
}
function mo(t, e, n = 0, r = 0, a = !1, o = V) {
	const { from: i, to: s } = e || {},
		{ isSameDay: u, isAfter: c, isBefore: l } = o;
	let d;
	if (!i && !s) d = { from: t, to: n > 0 ? void 0 : t };
	else if (i && !s)
		u(i, t)
			? a
				? (d = { from: i, to: void 0 })
				: (d = void 0)
			: l(t, i)
				? (d = { from: t, to: i })
				: (d = { from: i, to: t });
	else if (i && s)
		if (u(i, t) && u(s, t)) a ? (d = { from: i, to: s }) : (d = void 0);
		else if (u(i, t)) d = { from: i, to: n > 0 ? void 0 : t };
		else if (u(s, t)) d = { from: t, to: n > 0 ? void 0 : t };
		else if (l(t, i)) d = { from: t, to: s };
		else if (c(t, i)) d = { from: i, to: t };
		else if (c(t, s)) d = { from: i, to: t };
		else throw new Error("Invalid range");
	if (d != null && d.from && d != null && d.to) {
		const h = o.differenceInCalendarDays(d.to, d.from);
		r > 0 && h > r
			? (d = { from: t, to: void 0 })
			: n > 1 && h < n && (d = { from: t, to: void 0 });
	}
	return d;
}
function ho(t, e, n = V) {
	const r = Array.isArray(e) ? e : [e];
	let a = t.from;
	const o = n.differenceInCalendarDays(t.to, t.from),
		i = Math.min(o, 6);
	for (let s = 0; s <= i; s++) {
		if (r.includes(a.getDay())) return !0;
		a = n.addDays(a, 1);
	}
	return !1;
}
function lt(t, e, n = V) {
	return (
		K(t, e.from, !1, n) ||
		K(t, e.to, !1, n) ||
		K(e, t.from, !1, n) ||
		K(e, t.to, !1, n)
	);
}
function yo(t, e, n = V) {
	const r = Array.isArray(e) ? e : [e];
	if (
		r
			.filter((s) => typeof s != "function")
			.some((s) =>
				typeof s == "boolean"
					? s
					: n.isDate(s)
						? K(t, s, !1, n)
						: Tt(s, n)
							? s.some((u) => K(t, u, !1, n))
							: Ae(s)
								? s.from && s.to
									? lt(t, { from: s.from, to: s.to }, n)
									: !1
								: Pt(s)
									? ho(t, s.dayOfWeek, n)
									: xt(s)
										? n.isAfter(s.before, s.after)
											? lt(
													t,
													{
														from: n.addDays(s.after, 1),
														to: n.addDays(s.before, -1),
													},
													n,
												)
											: ee(t.from, s, n) || ee(t.to, s, n)
										: St(s) || Nt(s)
											? ee(t.from, s, n) || ee(t.to, s, n)
											: !1,
			)
	)
		return !0;
	const i = r.filter((s) => typeof s == "function");
	if (i.length) {
		let s = t.from;
		const u = n.differenceInCalendarDays(t.to, t.from);
		for (let c = 0; c <= u; c++) {
			if (i.some((l) => l(s))) return !0;
			s = n.addDays(s, 1);
		}
	}
	return !1;
}
function go(t, e) {
	const {
			disabled: n,
			excludeDisabled: r,
			selected: a,
			required: o,
			onSelect: i,
		} = t,
		[s, u] = xe(a, i ? a : void 0),
		c = i ? a : s;
	return {
		selected: c,
		select: (h, g, b) => {
			const { min: O, max: k } = t,
				M = h ? mo(h, c, O, k, o, e) : void 0;
			return (
				r &&
					n &&
					M != null &&
					M.from &&
					M.to &&
					yo({ from: M.from, to: M.to }, n, e) &&
					((M.from = h), (M.to = void 0)),
				i || u(M),
				i == null || i(M, h, g, b),
				M
			);
		},
		isSelected: (h) => c && K(c, h, !1, e),
	};
}
function wo(t, e) {
	const { selected: n, required: r, onSelect: a } = t,
		[o, i] = xe(n, a ? n : void 0),
		s = a ? n : o,
		{ isSameDay: u } = e;
	return {
		selected: s,
		select: (d, h, g) => {
			let b = d;
			return (
				!r && s && s && u(d, s) && (b = void 0),
				a || i(b),
				a == null || a(b, d, h, g),
				b
			);
		},
		isSelected: (d) => (s ? u(s, d) : !1),
	};
}
function bo(t, e) {
	const n = wo(t, e),
		r = fo(t, e),
		a = go(t, e);
	switch (t.mode) {
		case "single":
			return n;
		case "multiple":
			return r;
		case "range":
			return a;
		default:
			return;
	}
}
function Mo(t) {
	var Ue;
	let e = t;
	e.timeZone &&
		((e = { ...t }),
		e.today && (e.today = new I(e.today, e.timeZone)),
		e.month && (e.month = new I(e.month, e.timeZone)),
		e.defaultMonth && (e.defaultMonth = new I(e.defaultMonth, e.timeZone)),
		e.startMonth && (e.startMonth = new I(e.startMonth, e.timeZone)),
		e.endMonth && (e.endMonth = new I(e.endMonth, e.timeZone)),
		e.mode === "single" && e.selected
			? (e.selected = new I(e.selected, e.timeZone))
			: e.mode === "multiple" && e.selected
				? (e.selected =
						(Ue = e.selected) == null
							? void 0
							: Ue.map((W) => new I(W, e.timeZone)))
				: e.mode === "range" &&
					e.selected &&
					(e.selected = {
						from: e.selected.from ? new I(e.selected.from, e.timeZone) : void 0,
						to: e.selected.to ? new I(e.selected.to, e.timeZone) : void 0,
					}));
	const {
			components: n,
			formatters: r,
			labels: a,
			dateLib: o,
			locale: i,
			classNames: s,
		} = P.useMemo(() => {
			const W = { ...qe, ...e.locale };
			return {
				dateLib: new te(
					{
						locale: W,
						weekStartsOn: e.broadcastCalendar ? 1 : e.weekStartsOn,
						firstWeekContainsDate: e.firstWeekContainsDate,
						useAdditionalWeekYearTokens: e.useAdditionalWeekYearTokens,
						useAdditionalDayOfYearTokens: e.useAdditionalDayOfYearTokens,
						timeZone: e.timeZone,
						numerals: e.numerals,
					},
					e.dateLib,
				),
				components: Da(e.components),
				formatters: _a(e.formatters),
				labels: { ...La, ...e.labels },
				locale: W,
				classNames: { ...ze(), ...e.classNames },
			};
		}, [
			e.locale,
			e.broadcastCalendar,
			e.weekStartsOn,
			e.firstWeekContainsDate,
			e.useAdditionalWeekYearTokens,
			e.useAdditionalDayOfYearTokens,
			e.timeZone,
			e.numerals,
			e.dateLib,
			e.components,
			e.formatters,
			e.labels,
			e.classNames,
		]),
		{
			captionLayout: u,
			mode: c,
			navLayout: l,
			numberOfMonths: d = 1,
			onDayBlur: h,
			onDayClick: g,
			onDayFocus: b,
			onDayKeyDown: O,
			onDayMouseEnter: k,
			onDayMouseLeave: M,
			onNextClick: v,
			onPrevClick: y,
			showWeekNumber: C,
			styles: f,
		} = e,
		{
			formatCaption: p,
			formatDay: D,
			formatMonthDropdown: E,
			formatWeekNumber: z,
			formatWeekNumberHeader: q,
			formatWeekdayName: H,
			formatYearDropdown: $,
		} = r,
		oe = io(e, o),
		{
			days: Re,
			months: Se,
			navStart: Ge,
			navEnd: Je,
			previousMonth: R,
			nextMonth: G,
			goToMonth: U,
		} = oe,
		Ne = Xr(Re, e, o),
		{ isSelected: de, select: le, selected: Oe } = bo(e, o) ?? {},
		{
			blur: Xe,
			focused: pe,
			isFocusTarget: It,
			moveFocus: Le,
			setFocused: We,
		} = lo(e, oe, Ne, de ?? (() => !1), o),
		{
			labelDayButton: Ht,
			labelGridcell: $t,
			labelGrid: qt,
			labelMonthDropdown: At,
			labelNav: Qe,
			labelPrevious: zt,
			labelNext: Rt,
			labelWeekday: Gt,
			labelWeekNumber: Jt,
			labelWeekNumberHeader: Xt,
			labelYearDropdown: Lt,
		} = a,
		Qt = P.useMemo(() => Fa(o, e.ISOWeek), [o, e.ISOWeek]),
		Ze = c !== void 0 || g !== void 0,
		Pe = P.useCallback(() => {
			R && (U(R), y == null || y(R));
		}, [R, U, y]),
		Te = P.useCallback(() => {
			G && (U(G), v == null || v(G));
		}, [U, G, v]),
		Zt = P.useCallback(
			(W, Y) => (_) => {
				_.preventDefault(),
					_.stopPropagation(),
					We(W),
					le == null || le(W.date, Y, _),
					g == null || g(W.date, Y, _);
			},
			[le, g, We],
		),
		Vt = P.useCallback(
			(W, Y) => (_) => {
				We(W), b == null || b(W.date, Y, _);
			},
			[b, We],
		),
		Ut = P.useCallback(
			(W, Y) => (_) => {
				Xe(), h == null || h(W.date, Y, _);
			},
			[Xe, h],
		),
		Kt = P.useCallback(
			(W, Y) => (_) => {
				const ne = {
					ArrowLeft: ["day", e.dir === "rtl" ? "after" : "before"],
					ArrowRight: ["day", e.dir === "rtl" ? "before" : "after"],
					ArrowDown: ["week", "after"],
					ArrowUp: ["week", "before"],
					PageUp: [_.shiftKey ? "year" : "month", "before"],
					PageDown: [_.shiftKey ? "year" : "month", "after"],
					Home: ["startOfWeek", "before"],
					End: ["endOfWeek", "after"],
				};
				if (ne[_.key]) {
					_.preventDefault(), _.stopPropagation();
					const [J, Ce] = ne[_.key];
					Le(J, Ce);
				}
				O == null || O(W.date, Y, _);
			},
			[Le, O, e.dir],
		),
		en = P.useCallback(
			(W, Y) => (_) => {
				k == null || k(W.date, Y, _);
			},
			[k],
		),
		tn = P.useCallback(
			(W, Y) => (_) => {
				M == null || M(W.date, Y, _);
			},
			[M],
		),
		nn = P.useCallback(
			(W) => (Y) => {
				const _ = Number(Y.target.value),
					ne = o.setMonth(o.startOfMonth(W), _);
				U(ne);
			},
			[o, U],
		),
		rn = P.useCallback(
			(W) => (Y) => {
				const _ = Number(Y.target.value),
					ne = o.setYear(o.startOfMonth(W), _);
				U(ne);
			},
			[o, U],
		),
		{ className: an, style: on } = P.useMemo(
			() => ({
				className: [s[w.Root], e.className].filter(Boolean).join(" "),
				style: { ...(f == null ? void 0 : f[w.Root]), ...e.style },
			}),
			[s, e.className, e.style, f],
		),
		sn = Oa(e),
		Ve = P.useRef(null);
	Ua(Ve, !!e.animate, { classNames: s, months: Se, focused: pe, dateLib: o });
	const un = {
		dayPickerProps: e,
		selected: Oe,
		select: le,
		isSelected: de,
		months: Se,
		nextMonth: G,
		previousMonth: R,
		goToMonth: U,
		getModifiers: Ne,
		components: n,
		classNames: s,
		styles: f,
		labels: a,
		formatters: r,
	};
	return m.createElement(
		_t.Provider,
		{ value: un },
		m.createElement(
			n.Root,
			{
				rootRef: e.animate ? Ve : void 0,
				className: an,
				style: on,
				dir: e.dir,
				id: e.id,
				lang: e.lang,
				nonce: e.nonce,
				title: e.title,
				role: e.role,
				"aria-label": e["aria-label"],
				...sn,
			},
			m.createElement(
				n.Months,
				{ className: s[w.Months], style: f == null ? void 0 : f[w.Months] },
				!e.hideNavigation &&
					!l &&
					m.createElement(n.Nav, {
						"data-animated-nav": e.animate ? "true" : void 0,
						className: s[w.Nav],
						style: f == null ? void 0 : f[w.Nav],
						"aria-label": Qe(),
						onPreviousClick: Pe,
						onNextClick: Te,
						previousMonth: R,
						nextMonth: G,
					}),
				Se.map((W, Y) => {
					const _ = Ea(W.date, Ge, Je, r, o),
						ne = Ba(Ge, Je, r, o);
					return m.createElement(
						n.Month,
						{
							"data-animated-month": e.animate ? "true" : void 0,
							className: s[w.Month],
							style: f == null ? void 0 : f[w.Month],
							key: Y,
							displayIndex: Y,
							calendarMonth: W,
						},
						l === "around" &&
							!e.hideNavigation &&
							Y === 0 &&
							m.createElement(
								n.PreviousMonthButton,
								{
									type: "button",
									className: s[w.PreviousMonthButton],
									tabIndex: R ? void 0 : -1,
									"aria-disabled": R ? void 0 : !0,
									"aria-label": zt(R),
									onClick: Pe,
									"data-animated-button": e.animate ? "true" : void 0,
								},
								m.createElement(n.Chevron, {
									disabled: R ? void 0 : !0,
									className: s[w.Chevron],
									orientation: e.dir === "rtl" ? "right" : "left",
								}),
							),
						m.createElement(
							n.MonthCaption,
							{
								"data-animated-caption": e.animate ? "true" : void 0,
								className: s[w.MonthCaption],
								style: f == null ? void 0 : f[w.MonthCaption],
								calendarMonth: W,
								displayIndex: Y,
							},
							u != null && u.startsWith("dropdown")
								? m.createElement(
										n.DropdownNav,
										{
											className: s[w.Dropdowns],
											style: f == null ? void 0 : f[w.Dropdowns],
										},
										u === "dropdown" || u === "dropdown-months"
											? m.createElement(n.MonthsDropdown, {
													className: s[w.MonthsDropdown],
													"aria-label": At(),
													classNames: s,
													components: n,
													disabled: !!e.disableNavigation,
													onChange: nn(W.date),
													options: _,
													style: f == null ? void 0 : f[w.Dropdown],
													value: o.getMonth(W.date),
												})
											: m.createElement("span", null, E(W.date, o)),
										u === "dropdown" || u === "dropdown-years"
											? m.createElement(n.YearsDropdown, {
													className: s[w.YearsDropdown],
													"aria-label": Lt(o.options),
													classNames: s,
													components: n,
													disabled: !!e.disableNavigation,
													onChange: rn(W.date),
													options: ne,
													style: f == null ? void 0 : f[w.Dropdown],
													value: o.getYear(W.date),
												})
											: m.createElement("span", null, $(W.date, o)),
										m.createElement(
											"span",
											{
												role: "status",
												"aria-live": "polite",
												style: {
													border: 0,
													clip: "rect(0 0 0 0)",
													height: "1px",
													margin: "-1px",
													overflow: "hidden",
													padding: 0,
													position: "absolute",
													width: "1px",
													whiteSpace: "nowrap",
													wordWrap: "normal",
												},
											},
											p(W.date, o.options, o),
										),
									)
								: m.createElement(
										n.CaptionLabel,
										{
											className: s[w.CaptionLabel],
											role: "status",
											"aria-live": "polite",
										},
										p(W.date, o.options, o),
									),
						),
						l === "around" &&
							!e.hideNavigation &&
							Y === d - 1 &&
							m.createElement(
								n.NextMonthButton,
								{
									type: "button",
									className: s[w.NextMonthButton],
									tabIndex: G ? void 0 : -1,
									"aria-disabled": G ? void 0 : !0,
									"aria-label": Rt(G),
									onClick: Te,
									"data-animated-button": e.animate ? "true" : void 0,
								},
								m.createElement(n.Chevron, {
									disabled: G ? void 0 : !0,
									className: s[w.Chevron],
									orientation: e.dir === "rtl" ? "left" : "right",
								}),
							),
						Y === d - 1 &&
							l === "after" &&
							!e.hideNavigation &&
							m.createElement(n.Nav, {
								"data-animated-nav": e.animate ? "true" : void 0,
								className: s[w.Nav],
								style: f == null ? void 0 : f[w.Nav],
								"aria-label": Qe(),
								onPreviousClick: Pe,
								onNextClick: Te,
								previousMonth: R,
								nextMonth: G,
							}),
						m.createElement(
							n.MonthGrid,
							{
								role: "grid",
								"aria-multiselectable": c === "multiple" || c === "range",
								"aria-label": qt(W.date, o.options, o) || void 0,
								className: s[w.MonthGrid],
								style: f == null ? void 0 : f[w.MonthGrid],
							},
							!e.hideWeekdays &&
								m.createElement(
									n.Weekdays,
									{
										"data-animated-weekdays": e.animate ? "true" : void 0,
										className: s[w.Weekdays],
										style: f == null ? void 0 : f[w.Weekdays],
									},
									C &&
										m.createElement(
											n.WeekNumberHeader,
											{
												"aria-label": Xt(o.options),
												className: s[w.WeekNumberHeader],
												style: f == null ? void 0 : f[w.WeekNumberHeader],
												scope: "col",
											},
											q(),
										),
									Qt.map((J, Ce) =>
										m.createElement(
											n.Weekday,
											{
												"aria-label": Gt(J, o.options, o),
												className: s[w.Weekday],
												key: Ce,
												style: f == null ? void 0 : f[w.Weekday],
												scope: "col",
											},
											H(J, o.options, o),
										),
									),
								),
							m.createElement(
								n.Weeks,
								{
									"data-animated-weeks": e.animate ? "true" : void 0,
									className: s[w.Weeks],
									style: f == null ? void 0 : f[w.Weeks],
								},
								W.weeks.map((J, Ce) =>
									m.createElement(
										n.Week,
										{
											className: s[w.Week],
											key: J.weekNumber,
											style: f == null ? void 0 : f[w.Week],
											week: J,
										},
										C &&
											m.createElement(
												n.WeekNumber,
												{
													week: J,
													style: f == null ? void 0 : f[w.WeekNumber],
													"aria-label": Jt(J.weekNumber, { locale: i }),
													className: s[w.WeekNumber],
													scope: "row",
													role: "rowheader",
												},
												z(J.weekNumber, o),
											),
										J.days.map((j) => {
											const { date: L } = j,
												S = Ne(j);
											if (
												((S[F.focused] =
													!S.hidden && !!(pe != null && pe.isEqualTo(j))),
												(S[X.selected] =
													(de == null ? void 0 : de(L)) || S.selected),
												Ae(Oe))
											) {
												const { from: _e, to: Ee } = Oe;
												(S[X.range_start] = !!(_e && Ee && o.isSameDay(L, _e))),
													(S[X.range_end] = !!(_e && Ee && o.isSameDay(L, Ee))),
													(S[X.range_middle] = K(Oe, L, !0, o));
											}
											const cn = Ya(S, f, e.modifiersStyles),
												dn = Lr(S, s, e.modifiersClassNames),
												ln = !Ze && !S.hidden ? $t(L, S, o.options, o) : void 0;
											return m.createElement(
												n.Day,
												{
													key: `${o.format(L, "yyyy-MM-dd")}_${o.format(j.displayMonth, "yyyy-MM")}`,
													day: j,
													modifiers: S,
													className: dn.join(" "),
													style: cn,
													role: "gridcell",
													"aria-selected": S.selected || void 0,
													"aria-label": ln,
													"data-day": o.format(L, "yyyy-MM-dd"),
													"data-month": j.outside
														? o.format(L, "yyyy-MM")
														: void 0,
													"data-selected": S.selected || void 0,
													"data-disabled": S.disabled || void 0,
													"data-hidden": S.hidden || void 0,
													"data-outside": j.outside || void 0,
													"data-focused": S.focused || void 0,
													"data-today": S.today || void 0,
												},
												!S.hidden && Ze
													? m.createElement(
															n.DayButton,
															{
																className: s[w.DayButton],
																style: f == null ? void 0 : f[w.DayButton],
																type: "button",
																day: j,
																modifiers: S,
																disabled: S.disabled || void 0,
																tabIndex: It(j) ? 0 : -1,
																"aria-label": Ht(L, S, o.options, o),
																onClick: Zt(j, S),
																onBlur: Ut(j, S),
																onFocus: Vt(j, S),
																onKeyDown: Kt(j, S),
																onMouseEnter: en(j, S),
																onMouseLeave: tn(j, S),
															},
															D(L, o.options, o),
														)
													: !S.hidden && D(j.date, o.options, o),
											);
										}),
									),
								),
							),
						),
					);
				}),
			),
			e.footer &&
				m.createElement(
					n.Footer,
					{
						className: s[w.Footer],
						style: f == null ? void 0 : f[w.Footer],
						role: "status",
						"aria-live": "polite",
					},
					e.footer,
				),
		),
	);
}
function ts({
	className: t,
	classNames: e,
	showOutsideDays: n = !0,
	captionLayout: r = "label",
	buttonVariant: a = "ghost",
	formatters: o,
	components: i,
	...s
}) {
	const u = ze();
	return ae.jsx(Mo, {
		showOutsideDays: n,
		className: x(
			"bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
			String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
			String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
			t,
		),
		captionLayout: r,
		formatters: {
			formatMonthDropdown: (c) =>
				c.toLocaleString("default", { month: "short" }),
			...o,
		},
		classNames: {
			root: x("w-fit", u.root),
			months: x("flex gap-4 flex-col md:flex-row relative", u.months),
			month: x("flex flex-col w-full gap-4", u.month),
			nav: x(
				"flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
				u.nav,
			),
			button_previous: x(
				Ke({ variant: a }),
				"size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
				u.button_previous,
			),
			button_next: x(
				Ke({ variant: a }),
				"size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
				u.button_next,
			),
			month_caption: x(
				"flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
				u.month_caption,
			),
			dropdowns: x(
				"w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
				u.dropdowns,
			),
			dropdown_root: x(
				"relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
				u.dropdown_root,
			),
			dropdown: x(
				"bg-popover text-popover-foreground absolute inset-0 opacity-0",
				u.dropdown,
			),
			caption_label: x(
				"select-none font-medium",
				r === "label"
					? "text-sm"
					: "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
				u.caption_label,
			),
			table: "w-full border-collapse",
			weekdays: x("flex", u.weekdays),
			weekday: x(
				"text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
				u.weekday,
			),
			week: x("flex w-full mt-2", u.week),
			week_number_header: x(
				"select-none w-(--cell-size)",
				u.week_number_header,
			),
			week_number: x(
				"text-[0.8rem] select-none text-muted-foreground",
				u.week_number,
			),
			day: x(
				"relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
				u.day,
			),
			range_start: x("rounded-l-md bg-accent", u.range_start),
			range_middle: x("rounded-none", u.range_middle),
			range_end: x("rounded-r-md bg-accent", u.range_end),
			today: x(
				"bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
				u.today,
			),
			outside: x(
				"text-muted-foreground aria-selected:text-muted-foreground",
				u.outside,
			),
			disabled: x("text-muted-foreground opacity-50", u.disabled),
			hidden: x("invisible", u.hidden),
			...e,
		},
		components: {
			Root: ({ className: c, rootRef: l, ...d }) =>
				ae.jsx("div", {
					"data-slot": "calendar",
					ref: l,
					className: x(c),
					...d,
				}),
			Chevron: ({ className: c, orientation: l, ...d }) =>
				l === "left"
					? ae.jsx(hn, { className: x("size-4", c), ...d })
					: l === "right"
						? ae.jsx(yn, { className: x("size-4", c), ...d })
						: ae.jsx(gn, { className: x("size-4", c), ...d }),
			DayButton: vo,
			WeekNumber: ({ children: c, ...l }) =>
				ae.jsx("td", {
					...l,
					children: ae.jsx("div", {
						className:
							"flex size-(--cell-size) items-center justify-center text-center",
						children: c,
					}),
				}),
			...i,
		},
		...s,
	});
}
function vo(t) {
	const e = fn.c(19);
	let n, r, a, o;
	e[0] !== t
		? (({ className: n, day: r, modifiers: a, ...o } = t),
			(e[0] = t),
			(e[1] = n),
			(e[2] = r),
			(e[3] = a),
			(e[4] = o))
		: ((n = e[1]), (r = e[2]), (a = e[3]), (o = e[4]));
	const i = ze(),
		s = P.useRef(null);
	let u, c;
	e[5] !== a.focused
		? ((u = () => {
				var C;
				a.focused && ((C = s.current) == null || C.focus());
			}),
			(c = [a.focused]),
			(e[5] = a.focused),
			(e[6] = u),
			(e[7] = c))
		: ((u = e[6]), (c = e[7])),
		P.useEffect(u, c);
	const l = mn,
		d = "ghost",
		h = "icon";
	let g;
	e[8] !== r.date
		? ((g = r.date.toLocaleDateString()), (e[8] = r.date), (e[9] = g))
		: (g = e[9]);
	const b = a.selected && !a.range_start && !a.range_end && !a.range_middle,
		O = a.range_start,
		k = a.range_end,
		M = a.range_middle,
		v = x(
			"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
			i.day,
			n,
		);
	let y;
	return (
		e[10] !== l ||
		e[11] !== a.range_end ||
		e[12] !== a.range_middle ||
		e[13] !== a.range_start ||
		e[14] !== o ||
		e[15] !== v ||
		e[16] !== g ||
		e[17] !== b
			? ((y = ae.jsx(l, {
					ref: s,
					variant: d,
					size: h,
					"data-day": g,
					"data-selected-single": b,
					"data-range-start": O,
					"data-range-end": k,
					"data-range-middle": M,
					className: v,
					...o,
				})),
				(e[10] = l),
				(e[11] = a.range_end),
				(e[12] = a.range_middle),
				(e[13] = a.range_start),
				(e[14] = o),
				(e[15] = v),
				(e[16] = g),
				(e[17] = b),
				(e[18] = y))
			: (y = e[18]),
		y
	);
}
const ko = {
		lessThanXSeconds: {
			one: "moins d’une seconde",
			other: "moins de {{count}} secondes",
		},
		xSeconds: { one: "1 seconde", other: "{{count}} secondes" },
		halfAMinute: "30 secondes",
		lessThanXMinutes: {
			one: "moins d’une minute",
			other: "moins de {{count}} minutes",
		},
		xMinutes: { one: "1 minute", other: "{{count}} minutes" },
		aboutXHours: { one: "environ 1 heure", other: "environ {{count}} heures" },
		xHours: { one: "1 heure", other: "{{count}} heures" },
		xDays: { one: "1 jour", other: "{{count}} jours" },
		aboutXWeeks: {
			one: "environ 1 semaine",
			other: "environ {{count}} semaines",
		},
		xWeeks: { one: "1 semaine", other: "{{count}} semaines" },
		aboutXMonths: { one: "environ 1 mois", other: "environ {{count}} mois" },
		xMonths: { one: "1 mois", other: "{{count}} mois" },
		aboutXYears: { one: "environ 1 an", other: "environ {{count}} ans" },
		xYears: { one: "1 an", other: "{{count}} ans" },
		overXYears: { one: "plus d’un an", other: "plus de {{count}} ans" },
		almostXYears: { one: "presqu’un an", other: "presque {{count}} ans" },
	},
	Do = (t, e, n) => {
		let r;
		const a = ko[t];
		return (
			typeof a == "string"
				? (r = a)
				: e === 1
					? (r = a.one)
					: (r = a.other.replace("{{count}}", String(e))),
			n != null && n.addSuffix
				? n.comparison && n.comparison > 0
					? "dans " + r
					: "il y a " + r
				: r
		);
	},
	Oo = {
		full: "EEEE d MMMM y",
		long: "d MMMM y",
		medium: "d MMM y",
		short: "dd/MM/y",
	},
	po = {
		full: "HH:mm:ss zzzz",
		long: "HH:mm:ss z",
		medium: "HH:mm:ss",
		short: "HH:mm",
	},
	Wo = {
		full: "{{date}} 'à' {{time}}",
		long: "{{date}} 'à' {{time}}",
		medium: "{{date}}, {{time}}",
		short: "{{date}}, {{time}}",
	},
	Co = {
		date: Ye({ formats: Oo, defaultWidth: "full" }),
		time: Ye({ formats: po, defaultWidth: "full" }),
		dateTime: Ye({ formats: Wo, defaultWidth: "full" }),
	},
	xo = {
		lastWeek: "eeee 'dernier à' p",
		yesterday: "'hier à' p",
		today: "'aujourd’hui à' p",
		tomorrow: "'demain à' p'",
		nextWeek: "eeee 'prochain à' p",
		other: "P",
	},
	So = (t, e, n, r) => xo[t],
	No = {
		narrow: ["av. J.-C", "ap. J.-C"],
		abbreviated: ["av. J.-C", "ap. J.-C"],
		wide: ["avant Jésus-Christ", "après Jésus-Christ"],
	},
	Po = {
		narrow: ["T1", "T2", "T3", "T4"],
		abbreviated: ["1er trim.", "2ème trim.", "3ème trim.", "4ème trim."],
		wide: [
			"1er trimestre",
			"2ème trimestre",
			"3ème trimestre",
			"4ème trimestre",
		],
	},
	To = {
		narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
		abbreviated: [
			"janv.",
			"févr.",
			"mars",
			"avr.",
			"mai",
			"juin",
			"juil.",
			"août",
			"sept.",
			"oct.",
			"nov.",
			"déc.",
		],
		wide: [
			"janvier",
			"février",
			"mars",
			"avril",
			"mai",
			"juin",
			"juillet",
			"août",
			"septembre",
			"octobre",
			"novembre",
			"décembre",
		],
	},
	_o = {
		narrow: ["D", "L", "M", "M", "J", "V", "S"],
		short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
		abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
		wide: [
			"dimanche",
			"lundi",
			"mardi",
			"mercredi",
			"jeudi",
			"vendredi",
			"samedi",
		],
	},
	Eo = {
		narrow: {
			am: "AM",
			pm: "PM",
			midnight: "minuit",
			noon: "midi",
			morning: "mat.",
			afternoon: "ap.m.",
			evening: "soir",
			night: "mat.",
		},
		abbreviated: {
			am: "AM",
			pm: "PM",
			midnight: "minuit",
			noon: "midi",
			morning: "matin",
			afternoon: "après-midi",
			evening: "soir",
			night: "matin",
		},
		wide: {
			am: "AM",
			pm: "PM",
			midnight: "minuit",
			noon: "midi",
			morning: "du matin",
			afternoon: "de l’après-midi",
			evening: "du soir",
			night: "du matin",
		},
	},
	Yo = (t, e) => {
		const n = Number(t),
			r = e == null ? void 0 : e.unit;
		if (n === 0) return "0";
		const a = ["year", "week", "hour", "minute", "second"];
		let o;
		return (
			n === 1 ? (o = r && a.includes(r) ? "ère" : "er") : (o = "ème"), n + o
		);
	},
	Fo = ["MMM", "MMMM"],
	Bo = {
		preprocessor: (t, e) =>
			t.getDate() === 1 || !e.some((r) => r.isToken && Fo.includes(r.value))
				? e
				: e.map((r) =>
						r.isToken && r.value === "do" ? { isToken: !0, value: "d" } : r,
					),
		ordinalNumber: Yo,
		era: fe({ values: No, defaultWidth: "wide" }),
		quarter: fe({
			values: Po,
			defaultWidth: "wide",
			argumentCallback: (t) => t - 1,
		}),
		month: fe({ values: To, defaultWidth: "wide" }),
		day: fe({ values: _o, defaultWidth: "wide" }),
		dayPeriod: fe({ values: Eo, defaultWidth: "wide" }),
	},
	jo = /^(\d+)(ième|ère|ème|er|e)?/i,
	Io = /\d+/i,
	Ho = {
		narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
		abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
		wide: /^(avant Jésus-Christ|après Jésus-Christ)/i,
	},
	$o = { any: [/^av/i, /^ap/i] },
	qo = {
		narrow: /^T?[1234]/i,
		abbreviated: /^[1234](er|ème|e)? trim\.?/i,
		wide: /^[1234](er|ème|e)? trimestre/i,
	},
	Ao = { any: [/1/i, /2/i, /3/i, /4/i] },
	zo = {
		narrow: /^[jfmasond]/i,
		abbreviated:
			/^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
		wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
	},
	Ro = {
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
			/^av/i,
			/^ma/i,
			/^juin/i,
			/^juil/i,
			/^ao/i,
			/^s/i,
			/^o/i,
			/^n/i,
			/^d/i,
		],
	},
	Go = {
		narrow: /^[lmjvsd]/i,
		short: /^(di|lu|ma|me|je|ve|sa)/i,
		abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
		wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i,
	},
	Jo = {
		narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
		any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i],
	},
	Xo = {
		narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
		any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i,
	},
	Lo = {
		any: {
			am: /^a/i,
			pm: /^p/i,
			midnight: /^min/i,
			noon: /^mid/i,
			morning: /mat/i,
			afternoon: /ap/i,
			evening: /soir/i,
			night: /nuit/i,
		},
	},
	Qo = {
		ordinalNumber: wn({
			matchPattern: jo,
			parsePattern: Io,
			valueCallback: (t) => Number.parseInt(t),
		}),
		era: me({
			matchPatterns: Ho,
			defaultMatchWidth: "wide",
			parsePatterns: $o,
			defaultParseWidth: "any",
		}),
		quarter: me({
			matchPatterns: qo,
			defaultMatchWidth: "wide",
			parsePatterns: Ao,
			defaultParseWidth: "any",
			valueCallback: (t) => t + 1,
		}),
		month: me({
			matchPatterns: zo,
			defaultMatchWidth: "wide",
			parsePatterns: Ro,
			defaultParseWidth: "any",
		}),
		day: me({
			matchPatterns: Go,
			defaultMatchWidth: "wide",
			parsePatterns: Jo,
			defaultParseWidth: "any",
		}),
		dayPeriod: me({
			matchPatterns: Xo,
			defaultMatchWidth: "any",
			parsePatterns: Lo,
			defaultParseWidth: "any",
		}),
	},
	ns = {
		code: "fr",
		formatDistance: Do,
		formatLong: Co,
		formatRelative: So,
		localize: Bo,
		match: Qo,
		options: { weekStartsOn: 1, firstWeekContainsDate: 4 },
	};
export { ts as C, I as T, ns as f };
