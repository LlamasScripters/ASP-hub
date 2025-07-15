import {
	a as G,
	R as K,
	D as L,
	T as P,
	C as V,
	P as W,
	O as X,
} from "./index-PyBbJ2cN.js";
import {
	B as A,
	m as B,
	r as E,
	n as H,
	a as R,
	c as m,
	j as o,
	l as p,
} from "./index-kb-Ylywn.js";
import { T as F, c as J, a as U, b as Y } from "./tooltip-CmSjPkvl.js";
import { u as Q } from "./use-mobile-yLXS96or.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import { X as q } from "./x-BwQkFnmd.js";
const Z = [
		[
			"rect",
			{ width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
		],
		["path", { d: "M9 3v18", key: "fh3hqa" }],
	],
	ee = R("panel-left", Z);
function te(l) {
	const e = m.c(4);
	let t;
	e[0] !== l ? (({ ...t } = l), (e[0] = l), (e[1] = t)) : (t = e[1]);
	let a;
	return (
		e[2] !== t
			? ((a = o.jsx(K, { "data-slot": "sheet", ...t })), (e[2] = t), (e[3] = a))
			: (a = e[3]),
		a
	);
}
function ae(l) {
	const e = m.c(4);
	let t;
	e[0] !== l ? (({ ...t } = l), (e[0] = l), (e[1] = t)) : (t = e[1]);
	let a;
	return (
		e[2] !== t
			? ((a = o.jsx(W, { "data-slot": "sheet-portal", ...t })),
				(e[2] = t),
				(e[3] = a))
			: (a = e[3]),
		a
	);
}
function se(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				t,
			)),
			(e[3] = t),
			(e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx(X, { "data-slot": "sheet-overlay", className: s, ...a })),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function ie(l) {
	const e = m.c(17);
	let t, a, s, i;
	e[0] !== l
		? (({ className: a, children: t, side: i, ...s } = l),
			(e[0] = l),
			(e[1] = t),
			(e[2] = a),
			(e[3] = s),
			(e[4] = i))
		: ((t = e[1]), (a = e[2]), (s = e[3]), (i = e[4]));
	const n = i === void 0 ? "right" : i;
	let d;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((d = o.jsx(se, {})), (e[5] = d))
		: (d = e[5]);
	const r =
			n === "right" &&
			"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
		f =
			n === "left" &&
			"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
		h =
			n === "top" &&
			"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
		v =
			n === "bottom" &&
			"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t";
	let c;
	e[6] !== a || e[7] !== r || e[8] !== f || e[9] !== h || e[10] !== v
		? ((c = p(
				"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
				r,
				f,
				h,
				v,
				a,
			)),
			(e[6] = a),
			(e[7] = r),
			(e[8] = f),
			(e[9] = h),
			(e[10] = v),
			(e[11] = c))
		: (c = e[11]);
	let g;
	e[12] === Symbol.for("react.memo_cache_sentinel")
		? ((g = o.jsxs(G, {
				className:
					"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
				children: [
					o.jsx(q, { className: "size-4" }),
					o.jsx("span", { className: "sr-only", children: "Close" }),
				],
			})),
			(e[12] = g))
		: (g = e[12]);
	let x;
	return (
		e[13] !== t || e[14] !== s || e[15] !== c
			? ((x = o.jsxs(ae, {
					children: [
						d,
						o.jsxs(V, {
							"data-slot": "sheet-content",
							className: c,
							...s,
							children: [t, g],
						}),
					],
				})),
				(e[13] = t),
				(e[14] = s),
				(e[15] = c),
				(e[16] = x))
			: (x = e[16]),
		x
	);
}
function le(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("flex flex-col gap-1.5 p-4", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("div", {
					"data-slot": "sheet-header",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function oe(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("text-foreground font-semibold", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx(P, { "data-slot": "sheet-title", className: s, ...a })),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function re(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("text-muted-foreground text-sm", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx(L, {
					"data-slot": "sheet-description",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
const ne = "sidebar_state",
	de = 60 * 60 * 24 * 7,
	ce = "16rem",
	fe = "18rem",
	ue = "3rem",
	be = "b",
	O = E.createContext(null);
function M() {
	const l = E.useContext(O);
	if (!l) throw new Error("useSidebar must be used within a SidebarProvider.");
	return l;
}
function we({
	defaultOpen: l = !0,
	open: e,
	onOpenChange: t,
	className: a,
	style: s,
	children: i,
	...n
}) {
	const d = Q(),
		[r, f] = E.useState(!1),
		[h, v] = E.useState(l),
		c = e ?? h,
		g = E.useCallback(
			(u) => {
				const b = typeof u == "function" ? u(c) : u;
				t ? t(b) : v(b),
					(document.cookie = `${ne}=${b}; path=/; max-age=${de}`);
			},
			[t, c],
		),
		x = E.useCallback(() => (d ? f((u) => !u) : g((u) => !u)), [d, g, f]);
	E.useEffect(() => {
		const u = (b) => {
			b.key === be && (b.metaKey || b.ctrlKey) && (b.preventDefault(), x());
		};
		return (
			window.addEventListener("keydown", u),
			() => window.removeEventListener("keydown", u)
		);
	}, [x]);
	const $ = c ? "expanded" : "collapsed",
		N = E.useMemo(
			() => ({
				state: $,
				open: c,
				setOpen: g,
				isMobile: d,
				openMobile: r,
				setOpenMobile: f,
				toggleSidebar: x,
			}),
			[$, c, g, d, r, f, x],
		);
	return o.jsx(O.Provider, {
		value: N,
		children: o.jsx(F, {
			delayDuration: 0,
			children: o.jsx("div", {
				"data-slot": "sidebar-wrapper",
				style: { "--sidebar-width": ce, "--sidebar-width-icon": ue, ...s },
				className: p(
					"group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
					a,
				),
				...n,
				children: i,
			}),
		}),
	});
}
function Ne(l) {
	const e = m.c(46);
	let t, a, s, i, n, d;
	e[0] !== l
		? (({
				side: i,
				variant: n,
				collapsible: d,
				className: a,
				children: t,
				...s
			} = l),
			(e[0] = l),
			(e[1] = t),
			(e[2] = a),
			(e[3] = s),
			(e[4] = i),
			(e[5] = n),
			(e[6] = d))
		: ((t = e[1]), (a = e[2]), (s = e[3]), (i = e[4]), (n = e[5]), (d = e[6]));
	const r = i === void 0 ? "left" : i,
		f = n === void 0 ? "sidebar" : n,
		h = d === void 0 ? "offcanvas" : d,
		{ isMobile: v, state: c, openMobile: g, setOpenMobile: x } = M();
	if (h === "none") {
		let _;
		e[7] !== a
			? ((_ = p(
					"bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
					a,
				)),
				(e[7] = a),
				(e[8] = _))
			: (_ = e[8]);
		let C;
		return (
			e[9] !== t || e[10] !== s || e[11] !== _
				? ((C = o.jsx("div", {
						"data-slot": "sidebar",
						className: _,
						...s,
						children: t,
					})),
					(e[9] = t),
					(e[10] = s),
					(e[11] = _),
					(e[12] = C))
				: (C = e[12]),
			C
		);
	}
	if (v) {
		let _;
		e[13] === Symbol.for("react.memo_cache_sentinel")
			? ((_ = { "--sidebar-width": fe }), (e[13] = _))
			: (_ = e[13]);
		let C;
		e[14] === Symbol.for("react.memo_cache_sentinel")
			? ((C = o.jsxs(le, {
					className: "sr-only",
					children: [
						o.jsx(oe, { children: "Sidebar" }),
						o.jsx(re, { children: "Displays the mobile sidebar." }),
					],
				})),
				(e[14] = C))
			: (C = e[14]);
		let I;
		e[15] !== t
			? ((I = o.jsx("div", {
					className: "flex h-full w-full flex-col",
					children: t,
				})),
				(e[15] = t),
				(e[16] = I))
			: (I = e[16]);
		let T;
		e[17] !== r || e[18] !== I
			? ((T = o.jsxs(ie, {
					"data-sidebar": "sidebar",
					"data-slot": "sidebar",
					"data-mobile": "true",
					className:
						"bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
					style: _,
					side: r,
					children: [C, I],
				})),
				(e[17] = r),
				(e[18] = I),
				(e[19] = T))
			: (T = e[19]);
		let D;
		return (
			e[20] !== g || e[21] !== s || e[22] !== x || e[23] !== T
				? ((D = o.jsx(te, { open: g, onOpenChange: x, ...s, children: T })),
					(e[20] = g),
					(e[21] = s),
					(e[22] = x),
					(e[23] = T),
					(e[24] = D))
				: (D = e[24]),
			D
		);
	}
	const $ = c === "collapsed" ? h : "",
		N =
			f === "floating" || f === "inset"
				? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
				: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)";
	let u;
	e[25] !== N
		? ((u = p(
				"relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
				"group-data-[collapsible=offcanvas]:w-0",
				"group-data-[side=right]:rotate-180",
				N,
			)),
			(e[25] = N),
			(e[26] = u))
		: (u = e[26]);
	let b;
	e[27] !== u
		? ((b = o.jsx("div", { "data-slot": "sidebar-gap", className: u })),
			(e[27] = u),
			(e[28] = b))
		: (b = e[28]);
	const y =
			r === "left"
				? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
				: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
		z =
			f === "floating" || f === "inset"
				? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
				: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l";
	let w;
	e[29] !== a || e[30] !== y || e[31] !== z
		? ((w = p(
				"fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
				y,
				z,
				a,
			)),
			(e[29] = a),
			(e[30] = y),
			(e[31] = z),
			(e[32] = w))
		: (w = e[32]);
	let S;
	e[33] !== t
		? ((S = o.jsx("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className:
					"bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
				children: t,
			})),
			(e[33] = t),
			(e[34] = S))
		: (S = e[34]);
	let j;
	e[35] !== s || e[36] !== w || e[37] !== S
		? ((j = o.jsx("div", {
				"data-slot": "sidebar-container",
				className: w,
				...s,
				children: S,
			})),
			(e[35] = s),
			(e[36] = w),
			(e[37] = S),
			(e[38] = j))
		: (j = e[38]);
	let k;
	return (
		e[39] !== r ||
		e[40] !== c ||
		e[41] !== j ||
		e[42] !== $ ||
		e[43] !== b ||
		e[44] !== f
			? ((k = o.jsxs("div", {
					className: "group peer text-sidebar-foreground hidden md:block",
					"data-state": c,
					"data-collapsible": $,
					"data-variant": f,
					"data-side": r,
					"data-slot": "sidebar",
					children: [b, j],
				})),
				(e[39] = r),
				(e[40] = c),
				(e[41] = j),
				(e[42] = $),
				(e[43] = b),
				(e[44] = f),
				(e[45] = k))
			: (k = e[45]),
		k
	);
}
function Se(l) {
	const e = m.c(15);
	let t, a, s;
	e[0] !== l
		? (({ className: t, onClick: a, ...s } = l),
			(e[0] = l),
			(e[1] = t),
			(e[2] = a),
			(e[3] = s))
		: ((t = e[1]), (a = e[2]), (s = e[3]));
	const { toggleSidebar: i } = M();
	let n;
	e[4] !== t ? ((n = p("size-7", t)), (e[4] = t), (e[5] = n)) : (n = e[5]);
	let d;
	e[6] !== a || e[7] !== i
		? ((d = (v) => {
				a == null || a(v), i();
			}),
			(e[6] = a),
			(e[7] = i),
			(e[8] = d))
		: (d = e[8]);
	let r, f;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((r = o.jsx(ee, {})),
			(f = o.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })),
			(e[9] = r),
			(e[10] = f))
		: ((r = e[9]), (f = e[10]));
	let h;
	return (
		e[11] !== s || e[12] !== n || e[13] !== d
			? ((h = o.jsxs(A, {
					"data-sidebar": "trigger",
					"data-slot": "sidebar-trigger",
					variant: "ghost",
					size: "icon",
					className: n,
					onClick: d,
					...s,
					children: [r, f],
				})),
				(e[11] = s),
				(e[12] = n),
				(e[13] = d),
				(e[14] = h))
			: (h = e[14]),
		h
	);
}
function je(l) {
	const e = m.c(9);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	const { toggleSidebar: s } = M();
	let i;
	e[3] !== t
		? ((i = p(
				"hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
				"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
				"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				t,
			)),
			(e[3] = t),
			(e[4] = i))
		: (i = e[4]);
	let n;
	return (
		e[5] !== a || e[6] !== i || e[7] !== s
			? ((n = o.jsx("button", {
					"data-sidebar": "rail",
					"data-slot": "sidebar-rail",
					"aria-label": "Toggle Sidebar",
					tabIndex: -1,
					onClick: s,
					title: "Toggle Sidebar",
					className: i,
					...a,
				})),
				(e[5] = a),
				(e[6] = i),
				(e[7] = s),
				(e[8] = n))
			: (n = e[8]),
		n
	);
}
function _e(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p(
				"bg-background relative flex w-full flex-1 flex-col",
				"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				t,
			)),
			(e[3] = t),
			(e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("main", {
					"data-slot": "sidebar-inset",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function ye(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("flex flex-col gap-2 p-2", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("div", {
					"data-slot": "sidebar-header",
					"data-sidebar": "header",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function Ce(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("flex flex-col gap-2 p-2", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("div", {
					"data-slot": "sidebar-footer",
					"data-sidebar": "footer",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function $e(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
				t,
			)),
			(e[3] = t),
			(e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("div", {
					"data-slot": "sidebar-content",
					"data-sidebar": "content",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function Ee(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("relative flex w-full min-w-0 flex-col p-2", t)),
			(e[3] = t),
			(e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("div", {
					"data-slot": "sidebar-group",
					"data-sidebar": "group",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function ze(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("flex w-full min-w-0 flex-col gap-1", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("ul", {
					"data-slot": "sidebar-menu",
					"data-sidebar": "menu",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
function Ie(l) {
	const e = m.c(8);
	let t, a;
	e[0] !== l
		? (({ className: t, ...a } = l), (e[0] = l), (e[1] = t), (e[2] = a))
		: ((t = e[1]), (a = e[2]));
	let s;
	e[3] !== t
		? ((s = p("group/menu-item relative", t)), (e[3] = t), (e[4] = s))
		: (s = e[4]);
	let i;
	return (
		e[5] !== a || e[6] !== s
			? ((i = o.jsx("li", {
					"data-slot": "sidebar-menu-item",
					"data-sidebar": "menu-item",
					className: s,
					...a,
				})),
				(e[5] = a),
				(e[6] = s),
				(e[7] = i))
			: (i = e[7]),
		i
	);
}
const pe = B(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-10 px-4 py-2 text-sm font-medium",
				sm: "h-7 text-xs",
				lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);
function Te(l) {
	const e = m.c(28);
	let t, a, s, i, n, d, r;
	e[0] !== l
		? (({
				asChild: s,
				isActive: i,
				variant: n,
				size: d,
				tooltip: r,
				className: t,
				...a
			} = l),
			(e[0] = l),
			(e[1] = t),
			(e[2] = a),
			(e[3] = s),
			(e[4] = i),
			(e[5] = n),
			(e[6] = d),
			(e[7] = r))
		: ((t = e[1]),
			(a = e[2]),
			(s = e[3]),
			(i = e[4]),
			(n = e[5]),
			(d = e[6]),
			(r = e[7]));
	const f = s === void 0 ? !1 : s,
		h = i === void 0 ? !1 : i,
		v = n === void 0 ? "default" : n,
		c = d === void 0 ? "default" : d,
		g = f ? H : "button",
		{ isMobile: x, state: $ } = M();
	let N;
	e[8] !== t || e[9] !== c || e[10] !== v
		? ((N = p(pe({ variant: v, size: c }), t)),
			(e[8] = t),
			(e[9] = c),
			(e[10] = v),
			(e[11] = N))
		: (N = e[11]);
	let u;
	e[12] !== g || e[13] !== h || e[14] !== a || e[15] !== c || e[16] !== N
		? ((u = o.jsx(g, {
				"data-slot": "sidebar-menu-button",
				"data-sidebar": "menu-button",
				"data-size": c,
				"data-active": h,
				className: N,
				...a,
			})),
			(e[12] = g),
			(e[13] = h),
			(e[14] = a),
			(e[15] = c),
			(e[16] = N),
			(e[17] = u))
		: (u = e[17]);
	const b = u;
	if (!r) return b;
	if (typeof r == "string") {
		let j;
		e[18] !== r
			? ((j = { children: r }), (e[18] = r), (e[19] = j))
			: (j = e[19]),
			(r = j);
	}
	let y;
	e[20] !== b
		? ((y = o.jsx(Y, { asChild: !0, children: b })), (e[20] = b), (e[21] = y))
		: (y = e[21]);
	const z = $ !== "collapsed" || x;
	let w;
	e[22] !== z || e[23] !== r
		? ((w = o.jsx(U, { side: "right", align: "center", hidden: z, ...r })),
			(e[22] = z),
			(e[23] = r),
			(e[24] = w))
		: (w = e[24]);
	let S;
	return (
		e[25] !== y || e[26] !== w
			? ((S = o.jsxs(J, { children: [y, w] })),
				(e[25] = y),
				(e[26] = w),
				(e[27] = S))
			: (S = e[27]),
		S
	);
}
export {
	we as S,
	Ne as a,
	ye as b,
	$e as c,
	Ee as d,
	ze as e,
	Ce as f,
	je as g,
	Se as h,
	_e as i,
	Te as j,
	Ie as k,
	M as u,
};
