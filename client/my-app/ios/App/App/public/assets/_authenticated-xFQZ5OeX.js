import {
	z as f,
	O as h,
	c as l,
	r as m,
	j as p,
	R as u,
} from "./index-kb-Ylywn.js";
import { S as d } from "./sidebar-D2Jh6HtQ.js";
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
function y({ user: t }) {
	const { setTheme: e, theme: n } = f(),
		o = m.useRef(!1),
		r = m.useRef(null);
	m.useEffect(() => {
		var a;
		if (t != null && t.preferences)
			try {
				const s =
						typeof t.preferences == "string"
							? JSON.parse(t.preferences)
							: t.preferences,
					i =
						(a = s == null ? void 0 : s.accessibility) == null
							? void 0
							: a.theme;
				if (i && ["light", "dark", "auto"].includes(i)) {
					const c = i === "auto" ? "system" : i;
					o.current
						? r.current !== i && (n !== c && e(c), (r.current = i))
						: (e(c), (o.current = !0), (r.current = i));
				}
			} catch (s) {
				console.warn("Failed to parse user preferences for theme:", s);
			}
	}, [t == null ? void 0 : t.preferences, e, n]);
}
const w = () => {
	const e = l.c(3),
		{ user: n } = u.useLoaderData();
	let o;
	e[0] !== n ? ((o = { user: n }), (e[0] = n), (e[1] = o)) : (o = e[1]), y(o);
	let r;
	return (
		e[2] === Symbol.for("react.memo_cache_sentinel")
			? ((r = p.jsx(d, {
					className: "flex min-h-screen bg-gray-50 dark:bg-gray-900",
					children: p.jsx(h, {}),
				})),
				(e[2] = r))
			: (r = e[2]),
		r
	);
};
export { w as component };
