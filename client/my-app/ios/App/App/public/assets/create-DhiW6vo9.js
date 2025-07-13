import { S as b } from "./SectionForm-DL22m5yy.js";
import { a as j, A as x } from "./alert-DcqybFAu.js";
import { A as _ } from "./arrow-left-DMyOJown.js";
import { C as S } from "./circle-alert-CvO-74L-.js";
import { c as d, cd as f, L as h, j as t, B as u } from "./index-kb-Ylywn.js";
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
function g() {
	const e = d.c(14);
	let m;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((m = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/create",
			}),
			(e[0] = m))
		: (m = e[0]);
	const { clubId: s } = f(m);
	let l;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((l = t.jsxs("div", {
				children: [
					t.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Créer une section",
					}),
					t.jsx("p", {
						className: "text-muted-foreground",
						children:
							"Ajoutez une nouvelle section sportive à votre association",
					}),
				],
			})),
			(e[1] = l))
		: (l = e[1]);
	let o;
	e[2] !== s ? ((o = { clubId: s }), (e[2] = s), (e[3] = o)) : (o = e[3]);
	let c;
	e[4] === Symbol.for("react.memo_cache_sentinel")
		? ((c = t.jsx(_, { className: "w-4 h-4 mr-2" })), (e[4] = c))
		: (c = e[4]);
	let r;
	e[5] !== o
		? ((r = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					l,
					t.jsx(u, {
						variant: "outline",
						size: "sm",
						asChild: !0,
						children: t.jsxs(h, {
							to: "/admin/dashboard/clubs/$clubId/sections",
							params: o,
							children: [c, "Retour aux sections"],
						}),
					}),
				],
			})),
			(e[5] = o),
			(e[6] = r))
		: (r = e[6]);
	let n;
	e[7] === Symbol.for("react.memo_cache_sentinel")
		? ((n = t.jsx(S, { className: "h-4 w-4" })), (e[7] = n))
		: (n = e[7]);
	let a;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((a = t.jsxs(x, {
				children: [
					n,
					t.jsxs(j, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Chaque section peut contenir plusieurs catégories d'âge avec leurs propres sessions d'entraînement.",
						],
					}),
				],
			})),
			(e[8] = a))
		: (a = e[8]);
	let i;
	e[9] !== s
		? ((i = t.jsx(b, { mode: "create", clubId: s })), (e[9] = s), (e[10] = i))
		: (i = e[10]);
	let p;
	return (
		e[11] !== r || e[12] !== i
			? ((p = t.jsxs("div", { className: "space-y-6", children: [r, a, i] })),
				(e[11] = r),
				(e[12] = i),
				(e[13] = p))
			: (p = e[13]),
		p
	);
}
const Q = g;
export { Q as component };
