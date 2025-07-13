import { j as c, c as d, r as i, l as m } from "./index-kb-Ylywn.js";
const n = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m("w-full caption-bottom text-sm", l)), (e[3] = l), (e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("div", {
					className: "relative w-full overflow-auto",
					children: c.jsx("table", { ref: r, className: t, ...s }),
				})),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
n.displayName = "Table";
const p = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m("[&_tr]:border-b", l)), (e[3] = l), (e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("thead", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
p.displayName = "TableHeader";
const f = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m("[&_tr:last-child]:border-0", l)), (e[3] = l), (e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("tbody", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
f.displayName = "TableBody";
const b = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", l)),
			(e[3] = l),
			(e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("tfoot", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
b.displayName = "TableFooter";
const N = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m(
				"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
				l,
			)),
			(e[3] = l),
			(e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("tr", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
N.displayName = "TableRow";
const u = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m(
				"h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
				l,
			)),
			(e[3] = l),
			(e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("th", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
u.displayName = "TableHead";
const x = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m("p-4 align-middle [&:has([role=checkbox])]:pr-0", l)),
			(e[3] = l),
			(e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("td", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
x.displayName = "TableCell";
const T = i.forwardRef((o, r) => {
	const e = d.c(9);
	let l, s;
	e[0] !== o
		? (({ className: l, ...s } = o), (e[0] = o), (e[1] = l), (e[2] = s))
		: ((l = e[1]), (s = e[2]));
	let t;
	e[3] !== l
		? ((t = m("mt-4 text-sm text-muted-foreground", l)), (e[3] = l), (e[4] = t))
		: (t = e[4]);
	let a;
	return (
		e[5] !== s || e[6] !== r || e[7] !== t
			? ((a = c.jsx("caption", { ref: r, className: t, ...s })),
				(e[5] = s),
				(e[6] = r),
				(e[7] = t),
				(e[8] = a))
			: (a = e[8]),
		a
	);
});
T.displayName = "TableCaption";
export { p as T, N as a, u as b, n as c, f as d, x as e };
