import { R as $ } from "./RoomForm-DHOuL7_X.js";
import { A as C, a as N } from "./alert-DcqybFAu.js";
import { A as k } from "./arrow-left-DMyOJown.js";
import { C as I } from "./circle-alert-CvO-74L-.js";
import { C as H } from "./circle-check-big-DWIiKDvL.js";
import {
	L as A,
	cc as L,
	i as _,
	r as b,
	j as s,
	c as w,
	B as y,
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
function B(S) {
	const e = w.c(28),
		{ complex: t } = S,
		o = _(),
		[j, R] = b.useState(!1);
	let n;
	e[0] !== t.id || e[1] !== o
		? ((n = () => {
				R(!0),
					setTimeout(() => {
						o({ to: `/admin/facilities/complexes/${t.id}?view=rooms` });
					}, 1500);
			}),
			(e[0] = t.id),
			(e[1] = o),
			(e[2] = n))
		: (n = e[2]);
	const g = n;
	let p;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((p = s.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Créer une salle",
			})),
			(e[3] = p))
		: (p = e[3]);
	let i;
	e[4] !== t.name
		? ((i = s.jsxs("div", {
				children: [
					p,
					s.jsxs("p", {
						className: "text-muted-foreground",
						children: ["Nouvelle salle pour le complexe ", t.name],
					}),
				],
			})),
			(e[4] = t.name),
			(e[5] = i))
		: (i = e[5]);
	let d;
	e[6] === Symbol.for("react.memo_cache_sentinel")
		? ((d = { view: "rooms" }), (e[6] = d))
		: (d = e[6]);
	let r;
	e[7] !== t.id
		? ((r = { complexId: t.id }), (e[7] = t.id), (e[8] = r))
		: (r = e[8]);
	let u;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((u = s.jsx(k, { className: "w-4 h-4 mr-2" })), (e[9] = u))
		: (u = e[9]);
	let l;
	e[10] !== r
		? ((l = s.jsx(y, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: s.jsxs(A, {
					to: "/admin/facilities/complexes/$complexId",
					search: d,
					params: r,
					children: [u, "Retour"],
				}),
			})),
			(e[10] = r),
			(e[11] = l))
		: (l = e[11]);
	let m;
	e[12] !== i || e[13] !== l
		? ((m = s.jsxs("div", {
				className: "flex justify-between items-center",
				children: [i, l],
			})),
			(e[12] = i),
			(e[13] = l),
			(e[14] = m))
		: (m = e[14]);
	let c;
	e[15] !== j
		? ((c =
				j &&
				s.jsxs(C, {
					className: "border-green-200 bg-green-50",
					children: [
						s.jsx(H, { className: "h-4 w-4 text-green-600" }),
						s.jsx(N, {
							className: "text-green-800",
							children: "Salle créée avec succès ! Redirection en cours...",
						}),
					],
				})),
			(e[15] = j),
			(e[16] = c))
		: (c = e[16]);
	let x;
	e[17] === Symbol.for("react.memo_cache_sentinel")
		? ((x = s.jsx(I, { className: "h-4 w-4" })), (e[17] = x))
		: (x = e[17]);
	let f;
	e[18] === Symbol.for("react.memo_cache_sentinel")
		? ((f = s.jsxs(C, {
				children: [
					x,
					s.jsxs(N, {
						children: [
							s.jsx("strong", { children: "Important :" }),
							" Assurez-vous de remplir tous les champs requis avant de soumettre le formulaire.",
						],
					}),
				],
			})),
			(e[18] = f))
		: (f = e[18]);
	const v = `/admin/facilities/complexes/${t.id}?view=rooms`;
	let a;
	e[19] !== t.id || e[20] !== t.openingHours || e[21] !== g || e[22] !== v
		? ((a = s.jsx($, {
				complexId: t.id,
				complexOpeningHours: t.openingHours,
				onSuccess: g,
				onCancelLink: v,
			})),
			(e[19] = t.id),
			(e[20] = t.openingHours),
			(e[21] = g),
			(e[22] = v),
			(e[23] = a))
		: (a = e[23]);
	let h;
	return (
		e[24] !== a || e[25] !== m || e[26] !== c
			? ((h = s.jsxs("div", {
					className: "space-y-6",
					children: [m, c, f, a],
				})),
				(e[24] = a),
				(e[25] = m),
				(e[26] = c),
				(e[27] = h))
			: (h = e[27]),
		h
	);
}
const de = () => {
	const e = w.c(2),
		{ complex: t } = L.useLoaderData();
	let o;
	return (
		e[0] !== t
			? ((o = s.jsx(B, { complex: t })), (e[0] = t), (e[1] = o))
			: (o = e[1]),
		o
	);
};
export { de as component };
