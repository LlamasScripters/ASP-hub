import {
	N as C,
	H as I,
	R as N,
	S as g,
	a as y,
} from "./SidebarHeaderContent-0zjAgR8H.js";
import { B } from "./building-2-C_wvjtu2.js";
import { B as H } from "./bus-KD7vR1-x.js";
import { S as c, c as l, O as p, j as t } from "./index-kb-Ylywn.js";
import { S as R } from "./separator-DDNy3jpa.js";
import {
	g as S,
	i as _,
	d as b,
	a as d,
	c as f,
	f as h,
	h as j,
	e as u,
	b as x,
} from "./sidebar-D2Jh6HtQ.js";
import { U as A } from "./users-BMY-28E4.js";
import "./index-PyBbJ2cN.js";
import "./index-Dqr9Wf5M.js";
import "./index-DauBq6FI.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Bv1xjdPd.js";
import "./index-Dl_6cIao.js";
import "./index-BRam3N1Z.js";
import "./x-BwQkFnmd.js";
import "./tooltip-CmSjPkvl.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-C6LbJ2-_.js";
import "./use-mobile-yLXS96or.js";
import "./useLocation-Boh3DZN6.js";
import "./dropdown-menu-B4Bx1zOg.js";
import "./index-3Axhna2x.js";
import "./index-BP52hRXm.js";
import "./chevron-right-QFzs-bqo.js";
import "./useQuery-DObI4S3_.js";
import "./sun-BHPvtmae.js";
import "./avatar-DIRgKWh1.js";
import "./user-B8jYVTBx.js";
import "./palette-D-QMsnM0.js";
import "./Logo-BEbQ983O.js";
const v = [
	{ url: "/admin", title: "Accueil", IconComponent: I },
	{ url: "/admin/users", title: "Utilisateurs", IconComponent: A },
	{ url: "/admin/facilities/complexes", title: "Complexes", IconComponent: B },
	{ url: "/admin/assets/minibuses", title: "Minibus", IconComponent: H },
	{ url: "/admin/dashboard/clubs", title: "Clubs", IconComponent: c },
	{ url: "/admin/blog", title: "Blog", IconComponent: N },
];
function U(s) {
	const e = l.c(8);
	let i;
	e[0] !== s ? (({ ...i } = s), (e[0] = s), (e[1] = i)) : (i = e[1]);
	let o;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((o = t.jsx(x, { children: t.jsx(g, { siteName: "ASP Hub - Admin" }) })),
			(e[2] = o))
		: (o = e[2]);
	let r;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((r = t.jsx(f, {
				children: t.jsx(b, {
					children: t.jsx(u, { children: t.jsx(C, { items: v }) }),
				}),
			})),
			(e[3] = r))
		: (r = e[3]);
	let m, a;
	e[4] === Symbol.for("react.memo_cache_sentinel")
		? ((m = t.jsx(h, { children: t.jsx(y, {}) })),
			(a = t.jsx(S, {})),
			(e[4] = m),
			(e[5] = a))
		: ((m = e[4]), (a = e[5]));
	let n;
	return (
		e[6] !== i
			? ((n = t.jsxs(d, { collapsible: "icon", ...i, children: [o, r, m, a] })),
				(e[6] = i),
				(e[7] = n))
			: (n = e[7]),
		n
	);
}
const ce = () => {
	const e = l.c(3);
	let i;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((i = t.jsx(U, {})), (e[0] = i))
		: (i = e[0]);
	let o;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((o = t.jsxs("header", {
				className: "flex h-16 shrink-0 items-center gap-2 border-b px-4",
				children: [
					t.jsx(j, { className: "-ml-1" }),
					t.jsx(R, { orientation: "vertical", className: "mr-2 h-4" }),
					t.jsx("h1", {
						className: "text-lg font-semibold",
						children: "Panel d'administration",
					}),
				],
			})),
			(e[1] = o))
		: (o = e[1]);
	let r;
	return (
		e[2] === Symbol.for("react.memo_cache_sentinel")
			? ((r = t.jsxs(t.Fragment, {
					children: [
						i,
						t.jsxs(_, {
							children: [
								o,
								t.jsx("main", {
									className: "flex flex-1 flex-col gap-4 p-4",
									children: t.jsx(p, {}),
								}),
							],
						}),
					],
				})),
				(e[2] = r))
			: (r = e[2]),
		r
	);
};
export { ce as component };
