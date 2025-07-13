import { S as _ } from "./SectionForm-DL22m5yy.js";
import { a as b, A as j } from "./alert-DcqybFAu.js";
import { A as S } from "./arrow-left-DMyOJown.js";
import { C as g } from "./circle-alert-CvO-74L-.js";
import { c as f, B as h, j as t, L as u, cd as x } from "./index-kb-Ylywn.js";
import "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./input-CdkcPZS3.js";
import "./popover-DyNr3sDf.js";
import "./index-Dqr9Wf5M.js";
import "./index-DauBq6FI.js";
import "./index-CnLXGm6V.js";
import "./index-Dl_6cIao.js";
import "./index-CvBT1pZ2.js";
import "./index-CDAriSY_.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
import "./palette-D-QMsnM0.js";
import "./textarea-CTVCAbGX.js";
import "./loader-circle-Bxgg9gFD.js";
import "./folder-open-Bjf3vPky.js";
import "./file-text-Dzq0McNO.js";
import "./save-TX27fQkL.js";
function v() {
	const e = f.c(15);
	let m;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((m = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/edit",
			}),
			(e[0] = m))
		: (m = e[0]);
	const { clubId: s, sectionId: p } = x(m);
	let c;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((c = t.jsxs("div", {
				children: [
					t.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Modifier la section",
					}),
					t.jsx("p", {
						className: "text-muted-foreground",
						children: "Modifiez les informations de votre section sportive",
					}),
				],
			})),
			(e[1] = c))
		: (c = e[1]);
	let i;
	e[2] !== s ? ((i = { clubId: s }), (e[2] = s), (e[3] = i)) : (i = e[3]);
	let l;
	e[4] === Symbol.for("react.memo_cache_sentinel")
		? ((l = t.jsx(S, { className: "w-4 h-4 mr-2" })), (e[4] = l))
		: (l = e[4]);
	let o;
	e[5] !== i
		? ((o = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					c,
					t.jsx("div", {
						className: "flex items-center gap-2",
						children: t.jsx(h, {
							variant: "outline",
							size: "sm",
							asChild: !0,
							children: t.jsxs(u, {
								to: "/admin/dashboard/clubs/$clubId/sections",
								params: i,
								children: [l, "Retour aux sections"],
							}),
						}),
					}),
				],
			})),
			(e[5] = i),
			(e[6] = o))
		: (o = e[6]);
	let a;
	e[7] === Symbol.for("react.memo_cache_sentinel")
		? ((a = t.jsx(g, { className: "h-4 w-4" })), (e[7] = a))
		: (a = e[7]);
	let n;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((n = t.jsxs(j, {
				children: [
					a,
					t.jsxs(b, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Les modifications de cette section affecteront toutes les catégories et sessions associées.",
						],
					}),
				],
			})),
			(e[8] = n))
		: (n = e[8]);
	let r;
	e[9] !== s || e[10] !== p
		? ((r = t.jsx(_, { mode: "edit", clubId: s, sectionId: p })),
			(e[9] = s),
			(e[10] = p),
			(e[11] = r))
		: (r = e[11]);
	let d;
	return (
		e[12] !== o || e[13] !== r
			? ((d = t.jsxs("div", { className: "space-y-6", children: [o, n, r] })),
				(e[12] = o),
				(e[13] = r),
				(e[14] = d))
			: (d = e[14]),
		d
	);
}
const T = v;
export { T as component };
