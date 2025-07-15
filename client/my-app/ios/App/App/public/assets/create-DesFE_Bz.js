import { C as g } from "./CategoryForm-BbPpCMON.js";
import { a as b, A as j } from "./alert-DcqybFAu.js";
import { A as _ } from "./arrow-left-DMyOJown.js";
import { C as y } from "./circle-alert-CvO-74L-.js";
import { c as f, B as h, j as t, cd as u, L as x } from "./index-kb-Ylywn.js";
import "./input-CdkcPZS3.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./separator-DDNy3jpa.js";
import "./textarea-CTVCAbGX.js";
import "./loader-circle-Bxgg9gFD.js";
import "./calendar-De7tcxsN.js";
import "./triangle-alert-CLALGpH0.js";
import "./save-TX27fQkL.js";
function C() {
	const e = f.c(16);
	let l;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((l = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create",
			}),
			(e[0] = l))
		: (l = e[0]);
	const { clubId: s, sectionId: r } = u(l);
	let c;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((c = t.jsxs("div", {
				children: [
					t.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Créer une catégorie",
					}),
					t.jsx("p", {
						className: "text-muted-foreground",
						children: "Ajoutez une nouvelle catégorie à votre section",
					}),
				],
			})),
			(e[1] = c))
		: (c = e[1]);
	let o;
	e[2] !== s || e[3] !== r
		? ((o = { clubId: s, sectionId: r }), (e[2] = s), (e[3] = r), (e[4] = o))
		: (o = e[4]);
	let m;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((m = t.jsx(_, { className: "w-4 h-4 mr-2" })), (e[5] = m))
		: (m = e[5]);
	let i;
	e[6] !== o
		? ((i = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					c,
					t.jsx(h, {
						variant: "outline",
						size: "sm",
						asChild: !0,
						children: t.jsxs(x, {
							to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
							params: o,
							children: [m, "Retour à la liste"],
						}),
					}),
				],
			})),
			(e[6] = o),
			(e[7] = i))
		: (i = e[7]);
	let n;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((n = t.jsx(y, { className: "h-4 w-4" })), (e[8] = n))
		: (n = e[8]);
	let d;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((d = t.jsxs(j, {
				children: [
					n,
					t.jsxs(b, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Assurez-vous de définir les tranches d'âge appropriées pour cette catégorie.",
						],
					}),
				],
			})),
			(e[9] = d))
		: (d = e[9]);
	let a;
	e[10] !== s || e[11] !== r
		? ((a = t.jsx(g, { mode: "create", clubId: s, sectionId: r })),
			(e[10] = s),
			(e[11] = r),
			(e[12] = a))
		: (a = e[12]);
	let p;
	return (
		e[13] !== i || e[14] !== a
			? ((p = t.jsxs("div", { className: "space-y-6", children: [i, d, a] })),
				(e[13] = i),
				(e[14] = a),
				(e[15] = p))
			: (p = e[15]),
		p
	);
}
const D = C;
export { D as component };
