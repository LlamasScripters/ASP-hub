import {
	N as C,
	R as I,
	H as N,
	S as g,
	a as v,
} from "./SidebarHeaderContent-0zjAgR8H.js";
import { C as H } from "./calendar-De7tcxsN.js";
import { S as c, c as l, O as p, j as t } from "./index-kb-Ylywn.js";
import { S as R } from "./separator-DDNy3jpa.js";
import { S as A } from "./settings-CM_XdmzG.js";
import {
	f as S,
	i as _,
	b,
	a as d,
	d as f,
	c as h,
	h as j,
	g as u,
	e as x,
} from "./sidebar-D2Jh6HtQ.js";
import { U as y } from "./users-BMY-28E4.js";
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
const P = [
	{ url: "/dashboard", title: "Tableau de bord", IconComponent: N },
	{ url: "/dashboard/members", title: "Adhérents", IconComponent: y },
	{ url: "/dashboard/activities", title: "Activités", IconComponent: H },
	{ url: "/dashboard/social", title: "Projets sociaux", IconComponent: c },
	{ url: "/dashboard/blog", title: "Blog", IconComponent: I },
	{ url: "/user/settings", title: "Paramètres", IconComponent: A },
];
function U(i) {
	const e = l.c(8);
	let r;
	e[0] !== i ? (({ ...r } = i), (e[0] = i), (e[1] = r)) : (r = e[1]);
	let o;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((o = t.jsx(b, { children: t.jsx(g, { siteName: "ASP Hub" }) })),
			(e[2] = o))
		: (o = e[2]);
	let s;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((s = t.jsx(h, {
				children: t.jsx(f, {
					children: t.jsx(x, { children: t.jsx(C, { items: P }) }),
				}),
			})),
			(e[3] = s))
		: (s = e[3]);
	let a, m;
	e[4] === Symbol.for("react.memo_cache_sentinel")
		? ((a = t.jsx(S, { children: t.jsx(v, {}) })),
			(m = t.jsx(u, {})),
			(e[4] = a),
			(e[5] = m))
		: ((a = e[4]), (m = e[5]));
	let n;
	return (
		e[6] !== r
			? ((n = t.jsxs(d, { collapsible: "icon", ...r, children: [o, s, a, m] })),
				(e[6] = r),
				(e[7] = n))
			: (n = e[7]),
		n
	);
}
const ce = () => {
	const e = l.c(3);
	let r;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((r = t.jsx(U, {})), (e[0] = r))
		: (r = e[0]);
	let o;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((o = t.jsxs("header", {
				className: "flex h-16 shrink-0 items-center gap-2 border-b px-4",
				children: [
					t.jsx(j, { className: "-ml-1" }),
					t.jsx(R, { orientation: "vertical", className: "mr-2 h-4" }),
					t.jsx("h1", {
						className: "text-lg font-semibold",
						children: "ASP Hub",
					}),
				],
			})),
			(e[1] = o))
		: (o = e[1]);
	let s;
	return (
		e[2] === Symbol.for("react.memo_cache_sentinel")
			? ((s = t.jsxs(t.Fragment, {
					children: [
						r,
						t.jsxs(_, {
							children: [
								o,
								t.jsx("main", {
									className: "flex-1 p-4 overflow-auto md:p-6",
									children: t.jsx(p, {}),
								}),
							],
						}),
					],
				})),
				(e[2] = s))
			: (s = e[2]),
		s
	);
};
export { ce as component };
