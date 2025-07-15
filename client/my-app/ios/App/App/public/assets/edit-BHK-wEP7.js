import { C as _ } from "./CategoryForm-BbPpCMON.js";
import { a as b, A as g } from "./alert-DcqybFAu.js";
import { A as y } from "./arrow-left-DMyOJown.js";
import { C as I } from "./circle-alert-CvO-74L-.js";
import { cd as h, L as j, j as t, B as u, c as x } from "./index-kb-Ylywn.js";
import "./input-CdkcPZS3.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./separator-DDNy3jpa.js";
import "./textarea-CTVCAbGX.js";
import "./loader-circle-Bxgg9gFD.js";
import "./calendar-De7tcxsN.js";
import "./triangle-alert-CLALGpH0.js";
import "./save-TX27fQkL.js";
function v() {
	const e = x.c(17);
	let c;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((c = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
			}),
			(e[0] = c))
		: (c = e[0]);
	const { clubId: s, sectionId: i, categoryId: p } = h(c);
	let l;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((l = t.jsxs("div", {
				children: [
					t.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Modifier la catégorie",
					}),
					t.jsx("p", {
						className: "text-muted-foreground",
						children: "Modifiez les informations de votre catégorie",
					}),
				],
			})),
			(e[1] = l))
		: (l = e[1]);
	let o;
	e[2] !== s || e[3] !== i
		? ((o = { clubId: s, sectionId: i }), (e[2] = s), (e[3] = i), (e[4] = o))
		: (o = e[4]);
	let m;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((m = t.jsx(y, { className: "w-4 h-4 mr-2" })), (e[5] = m))
		: (m = e[5]);
	let r;
	e[6] !== o
		? ((r = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					l,
					t.jsx("div", {
						className: "flex items-center gap-2",
						children: t.jsx(u, {
							variant: "outline",
							size: "sm",
							asChild: !0,
							children: t.jsxs(j, {
								to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
								params: o,
								children: [m, "Retour à la liste"],
							}),
						}),
					}),
				],
			})),
			(e[6] = o),
			(e[7] = r))
		: (r = e[7]);
	let n;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((n = t.jsx(I, { className: "h-4 w-4" })), (e[8] = n))
		: (n = e[8]);
	let d;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((d = t.jsxs(g, {
				children: [
					n,
					t.jsxs(b, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Les modifications de cette catégorie peuvent affecter les sessions associées.",
						],
					}),
				],
			})),
			(e[9] = d))
		: (d = e[9]);
	let a;
	e[10] !== p || e[11] !== s || e[12] !== i
		? ((a = t.jsx(_, { mode: "edit", clubId: s, sectionId: i, categoryId: p })),
			(e[10] = p),
			(e[11] = s),
			(e[12] = i),
			(e[13] = a))
		: (a = e[13]);
	let f;
	return (
		e[14] !== r || e[15] !== a
			? ((f = t.jsxs("div", { className: "space-y-6", children: [r, d, a] })),
				(e[14] = r),
				(e[15] = a),
				(e[16] = f))
			: (f = e[16]),
		f
	);
}
const D = v;
export { D as component };
