import { S as C } from "./SessionForm-URyAaN_1.js";
import { a as A, A as v } from "./alert-DcqybFAu.js";
import { A as w } from "./arrow-left-DMyOJown.js";
import { C as E } from "./circle-alert-CvO-74L-.js";
import {
	B as $,
	cd as I,
	L as N,
	r as g,
	j as t,
	c as y,
} from "./index-kb-Ylywn.js";
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
function L() {
	const e = y.c(27);
	let c;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((c = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create",
			}),
			(e[0] = c))
		: (c = e[0]);
	const { clubId: s, sectionId: o, categoryId: i } = I(c),
		[b, S] = g.useState(null);
	let p, d;
	e[1] !== s || e[2] !== o
		? ((p = () => {
				fetch(`/api/clubs/${s}/sections/${o}`).then(R).then(S);
			}),
			(d = [s, o]),
			(e[1] = s),
			(e[2] = o),
			(e[3] = p),
			(e[4] = d))
		: ((p = e[3]), (d = e[4])),
		g.useEffect(p, d);
	let f;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((f = t.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Créer une session",
			})),
			(e[5] = f))
		: (f = e[5]);
	const _ = (b == null ? void 0 : b.name) || "...";
	let r;
	e[6] !== _
		? ((r = t.jsxs("div", {
				children: [
					f,
					t.jsxs("p", {
						className: "text-muted-foreground",
						children: [
							"Nouvelle session pour la section",
							" ",
							t.jsx("span", { className: "font-medium", children: _ }),
						],
					}),
				],
			})),
			(e[6] = _),
			(e[7] = r))
		: (r = e[7]);
	let n;
	e[8] !== i || e[9] !== s || e[10] !== o
		? ((n = { clubId: s, sectionId: o, categoryId: i }),
			(e[8] = i),
			(e[9] = s),
			(e[10] = o),
			(e[11] = n))
		: (n = e[11]);
	let u;
	e[12] === Symbol.for("react.memo_cache_sentinel")
		? ((u = t.jsx(w, { className: "w-4 h-4 mr-2" })), (e[12] = u))
		: (u = e[12]);
	let l;
	e[13] !== n
		? ((l = t.jsx($, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: t.jsxs(N, {
					to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions",
					params: n,
					children: [u, "Retour aux sessions"],
				}),
			})),
			(e[13] = n),
			(e[14] = l))
		: (l = e[14]);
	let m;
	e[15] !== r || e[16] !== l
		? ((m = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [r, l],
			})),
			(e[15] = r),
			(e[16] = l),
			(e[17] = m))
		: (m = e[17]);
	let h;
	e[18] === Symbol.for("react.memo_cache_sentinel")
		? ((h = t.jsx(E, { className: "h-4 w-4" })), (e[18] = h))
		: (h = e[18]);
	let x;
	e[19] === Symbol.for("react.memo_cache_sentinel")
		? ((x = t.jsxs(v, {
				children: [
					h,
					t.jsxs(A, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Vérifiez que les dates et horaires choisis ne sont pas en conflit avec d'autres sessions.",
						],
					}),
				],
			})),
			(e[19] = x))
		: (x = e[19]);
	let a;
	e[20] !== i || e[21] !== s || e[22] !== o
		? ((a = t.jsx(C, {
				mode: "create",
				clubId: s,
				sectionId: o,
				categoryId: i,
			})),
			(e[20] = i),
			(e[21] = s),
			(e[22] = o),
			(e[23] = a))
		: (a = e[23]);
	let j;
	return (
		e[24] !== a || e[25] !== m
			? ((j = t.jsxs("div", { className: "space-y-6", children: [m, x, a] })),
				(e[24] = a),
				(e[25] = m),
				(e[26] = j))
			: (j = e[26]),
		j
	);
}
function R(e) {
	return e.json();
}
const le = L;
export { le as component };
