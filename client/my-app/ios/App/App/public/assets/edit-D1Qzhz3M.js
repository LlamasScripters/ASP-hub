import { S as _ } from "./SessionForm-URyAaN_1.js";
import { a as I, A as g } from "./alert-DcqybFAu.js";
import { A as y } from "./arrow-left-DMyOJown.js";
import { C as S } from "./circle-alert-CvO-74L-.js";
import { L as b, c as h, B as j, j as s, cd as u } from "./index-kb-Ylywn.js";
import "./input-CdkcPZS3.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./select-D8GIfri3.js";
import "./index-Dqr9Wf5M.js";
import "./index-DauBq6FI.js";
import "./index-3Axhna2x.js";
import "./index-CnLXGm6V.js";
import "./index-Dl_6cIao.js";
import "./index-CvBT1pZ2.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-mnH6Jux_.js";
import "./index-C6LbJ2-_.js";
import "./chevron-down-CMzABl4R.js";
import "./chevron-up-DyH28r2x.js";
import "./separator-DDNy3jpa.js";
import "./textarea-CTVCAbGX.js";
import "./loader-circle-Bxgg9gFD.js";
import "./file-text-Dzq0McNO.js";
import "./clock-Kg0fBwSd.js";
import "./map-pin-DywQhs4x.js";
import "./save-TX27fQkL.js";
function $() {
	const e = h.c(19);
	let a;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((a = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit",
			}),
			(e[0] = a))
		: (a = e[0]);
	const { clubId: t, sectionId: i, categoryId: o, sessionId: x } = u(a);
	let c;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((c = s.jsxs("div", {
				children: [
					s.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Modifier la session",
					}),
					s.jsx("p", {
						className: "text-muted-foreground",
						children: "Modifiez les informations de votre session",
					}),
				],
			})),
			(e[1] = c))
		: (c = e[1]);
	let r;
	e[2] !== o || e[3] !== t || e[4] !== i
		? ((r = { clubId: t, sectionId: i, categoryId: o }),
			(e[2] = o),
			(e[3] = t),
			(e[4] = i),
			(e[5] = r))
		: (r = e[5]);
	let l;
	e[6] === Symbol.for("react.memo_cache_sentinel")
		? ((l = s.jsx(y, { className: "w-4 h-4 mr-2" })), (e[6] = l))
		: (l = e[6]);
	let m;
	e[7] !== r
		? ((m = s.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					c,
					s.jsx("div", {
						className: "flex items-center gap-2",
						children: s.jsx(j, {
							variant: "outline",
							size: "sm",
							asChild: !0,
							children: s.jsxs(b, {
								to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions",
								params: r,
								children: [l, "Retour aux sessions"],
							}),
						}),
					}),
				],
			})),
			(e[7] = r),
			(e[8] = m))
		: (m = e[8]);
	let d;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((d = s.jsx(S, { className: "h-4 w-4" })), (e[9] = d))
		: (d = e[9]);
	let p;
	e[10] === Symbol.for("react.memo_cache_sentinel")
		? ((p = s.jsxs(g, {
				children: [
					d,
					s.jsxs(I, {
						children: [
							s.jsx("strong", { children: "Important :" }),
							" Les modifications peuvent affecter les participants déjà inscrits à cette session.",
						],
					}),
				],
			})),
			(e[10] = p))
		: (p = e[10]);
	let n;
	e[11] !== o || e[12] !== t || e[13] !== i || e[14] !== x
		? ((n = s.jsx(_, {
				mode: "edit",
				clubId: t,
				sectionId: i,
				categoryId: o,
				sessionId: x,
			})),
			(e[11] = o),
			(e[12] = t),
			(e[13] = i),
			(e[14] = x),
			(e[15] = n))
		: (n = e[15]);
	let f;
	return (
		e[16] !== m || e[17] !== n
			? ((f = s.jsxs("div", { className: "space-y-6", children: [m, p, n] })),
				(e[16] = m),
				(e[17] = n),
				(e[18] = f))
			: (f = e[18]),
		f
	);
}
const Z = $;
export { Z as component };
