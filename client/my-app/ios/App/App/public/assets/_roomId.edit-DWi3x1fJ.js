import { R as D } from "./RoomForm-DHOuL7_X.js";
import { A as I, a as L } from "./alert-DcqybFAu.js";
import { A as M } from "./arrow-left-DMyOJown.js";
import { C as T } from "./circle-alert-CvO-74L-.js";
import { C as P } from "./circle-check-big-DWIiKDvL.js";
import {
	i as $,
	L as A,
	c1 as B,
	c as E,
	r as k,
	j as t,
	B as y,
	c2 as z,
} from "./index-kb-Ylywn.js";
import "./checkbox-DT5FljqG.js";
import "./index-DauBq6FI.js";
import "./index-Dqr9Wf5M.js";
import "./index-mnH6Jux_.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
import "./index-Bv1xjdPd.js";
import "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./input-CdkcPZS3.js";
import "./select-D8GIfri3.js";
import "./index-3Axhna2x.js";
import "./index-CnLXGm6V.js";
import "./index-Dl_6cIao.js";
import "./index-CvBT1pZ2.js";
import "./index-CDAriSY_.js";
import "./index-C6LbJ2-_.js";
import "./chevron-down-CMzABl4R.js";
import "./chevron-up-DyH28r2x.js";
import "./textarea-CTVCAbGX.js";
import "./info-hEQo0LXU.js";
import "./timer-l0uyiV2G.js";
import "./settings-CM_XdmzG.js";
import "./warehouse-BXw1dHMx.js";
import "./loader-circle-Bxgg9gFD.js";
function q(b) {
	var w, C;
	const e = E.c(37),
		{ complex: s, room: o } = b,
		i = $(),
		[_, H] = k.useState(!1),
		N =
			((C =
				(w = B().__store.prevState) == null ? void 0 : w.resolvedLocation) ==
			null
				? void 0
				: C.href) || void 0;
	let u;
	e[0] !== s.id || e[1] !== i
		? ((u = () => {
				H(!0),
					setTimeout(() => {
						i({ to: `/admin/facilities/complexes/${s.id}?view=rooms` });
					}, 1500);
			}),
			(e[0] = s.id),
			(e[1] = i),
			(e[2] = u))
		: (u = e[2]);
	const R = u;
	let x;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((x = t.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Modifier une salle",
			})),
			(e[3] = x))
		: (x = e[3]);
	let r;
	e[4] !== o.name
		? ((r = t.jsx("strong", { children: o.name })), (e[4] = o.name), (e[5] = r))
		: (r = e[5]);
	let l;
	e[6] !== s.name || e[7] !== r
		? ((l = t.jsxs("div", {
				children: [
					x,
					t.jsxs("p", {
						className: "text-muted-foreground",
						children: ["Modifier la salle ", r, " du complexe", " ", s.name],
					}),
				],
			})),
			(e[6] = s.name),
			(e[7] = r),
			(e[8] = l))
		: (l = e[8]);
	let h;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((h = { view: "rooms" }), (e[9] = h))
		: (h = e[9]);
	let m;
	e[10] !== s.id
		? ((m = { complexId: s.id }), (e[10] = s.id), (e[11] = m))
		: (m = e[11]);
	let j;
	e[12] === Symbol.for("react.memo_cache_sentinel")
		? ((j = t.jsx(M, { className: "w-4 h-4 mr-2" })), (e[12] = j))
		: (j = e[12]);
	let a;
	e[13] !== m
		? ((a = t.jsx(y, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: t.jsxs(A, {
					to: "/admin/facilities/complexes/$complexId",
					search: h,
					params: m,
					children: [j, "Retour au complexe"],
				}),
			})),
			(e[13] = m),
			(e[14] = a))
		: (a = e[14]);
	let c;
	e[15] !== o.id
		? ((c = t.jsx(y, {
				asChild: !0,
				children: t.jsx(A, {
					to: "/admin/facilities/rooms/$roomId",
					params: { roomId: o.id },
					children: "Voir les détails",
				}),
			})),
			(e[15] = o.id),
			(e[16] = c))
		: (c = e[16]);
	let n;
	e[17] !== a || e[18] !== c
		? ((n = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [a, c],
			})),
			(e[17] = a),
			(e[18] = c),
			(e[19] = n))
		: (n = e[19]);
	let p;
	e[20] !== n || e[21] !== l
		? ((p = t.jsxs("div", {
				className: "flex justify-between items-center",
				children: [l, n],
			})),
			(e[20] = n),
			(e[21] = l),
			(e[22] = p))
		: (p = e[22]);
	let d;
	e[23] !== _
		? ((d =
				_ &&
				t.jsxs(I, {
					className: "border-green-200 bg-green-50",
					children: [
						t.jsx(P, { className: "h-4 w-4 text-green-600" }),
						t.jsx(L, {
							className: "text-green-800",
							children: "Salle modifiée avec succès ! Redirection en cours...",
						}),
					],
				})),
			(e[23] = _),
			(e[24] = d))
		: (d = e[24]);
	let g;
	e[25] === Symbol.for("react.memo_cache_sentinel")
		? ((g = t.jsx(T, { className: "h-4 w-4" })), (e[25] = g))
		: (g = e[25]);
	let v;
	e[26] === Symbol.for("react.memo_cache_sentinel")
		? ((v = t.jsxs(I, {
				children: [
					g,
					t.jsxs(L, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Assurez-vous que les informations de la salle sont correctes avant de sauvegarder. Toute modification peut affecter les réservations existantes.",
						],
					}),
				],
			})),
			(e[26] = v))
		: (v = e[26]);
	let f;
	e[27] !== s.id ||
	e[28] !== s.openingHours ||
	e[29] !== R ||
	e[30] !== N ||
	e[31] !== o
		? ((f = t.jsx(D, {
				complexId: s.id,
				complexOpeningHours: s.openingHours,
				room: o,
				onSuccess: R,
				onCancelLink: N,
			})),
			(e[27] = s.id),
			(e[28] = s.openingHours),
			(e[29] = R),
			(e[30] = N),
			(e[31] = o),
			(e[32] = f))
		: (f = e[32]);
	let S;
	return (
		e[33] !== p || e[34] !== d || e[35] !== f
			? ((S = t.jsxs("div", {
					className: "space-y-6",
					children: [p, d, v, f],
				})),
				(e[33] = p),
				(e[34] = d),
				(e[35] = f),
				(e[36] = S))
			: (S = e[36]),
		S
	);
}
const Se = () => {
	const e = E.c(3),
		{ room: s, complex: o } = z.useLoaderData();
	let i;
	return (
		e[0] !== o || e[1] !== s
			? ((i = t.jsx(q, { room: s, complex: o })),
				(e[0] = o),
				(e[1] = s),
				(e[2] = i))
			: (i = e[2]),
		i
	);
};
export { Se as component };
