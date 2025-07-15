import { R as $ } from "./RoomReservationForm-Clry92fM.js";
import { a as I, A as w } from "./alert-DcqybFAu.js";
import { A as k } from "./arrow-left-DMyOJown.js";
import { C as z } from "./circle-alert-CvO-74L-.js";
import {
	i as A,
	B as C,
	L as E,
	cb as H,
	c1 as L,
	j as o,
	c as y,
} from "./index-kb-Ylywn.js";
import "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./input-CdkcPZS3.js";
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
import "./calendar-De7tcxsN.js";
import "./clock-Kg0fBwSd.js";
import "./info-hEQo0LXU.js";
import "./loader-circle-Bxgg9gFD.js";
function B(_) {
	var b, S;
	const e = y.c(33),
		{ complex: r, room: t, roomReservation: i } = _,
		s = A(),
		g =
			((S =
				(b = L().__store.prevState) == null ? void 0 : b.resolvedLocation) ==
			null
				? void 0
				: S.href) || void 0;
	let u;
	e[0] !== s || e[1] !== t.id
		? ((u = () => {
				setTimeout(() => {
					s({ to: `/admin/facilities/rooms/${t.id}` });
				}, 1500);
			}),
			(e[0] = s),
			(e[1] = t.id),
			(e[2] = u))
		: (u = e[2]);
	const N = u;
	let x;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((x = o.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Modifier une réservation",
			})),
			(e[3] = x))
		: (x = e[3]);
	let n;
	e[4] !== i.title
		? ((n = o.jsx("span", { className: "font-medium", children: i.title })),
			(e[4] = i.title),
			(e[5] = n))
		: (n = e[5]);
	let m;
	e[6] !== t.name
		? ((m = o.jsx("span", { className: "font-medium", children: t.name })),
			(e[6] = t.name),
			(e[7] = m))
		: (m = e[7]);
	let l;
	e[8] !== r.name
		? ((l = o.jsx("span", { className: "font-medium", children: r.name })),
			(e[8] = r.name),
			(e[9] = l))
		: (l = e[9]);
	let a;
	e[10] !== n || e[11] !== m || e[12] !== l
		? ((a = o.jsxs("div", {
				children: [
					x,
					o.jsxs("p", {
						className: "text-muted-foreground",
						children: [
							"Modifier la réservation",
							" ",
							n,
							" de la salle ",
							m,
							" du complexe",
							" ",
							l,
						],
					}),
				],
			})),
			(e[10] = n),
			(e[11] = m),
			(e[12] = l),
			(e[13] = a))
		: (a = e[13]);
	let c;
	e[14] !== t.id
		? ((c = { roomId: t.id }), (e[14] = t.id), (e[15] = c))
		: (c = e[15]);
	let h;
	e[16] === Symbol.for("react.memo_cache_sentinel")
		? ((h = o.jsx(k, { className: "w-4 h-4 mr-2" })), (e[16] = h))
		: (h = e[16]);
	let p;
	e[17] !== c
		? ((p = o.jsx(C, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: o.jsxs(E, {
					to: "/admin/facilities/rooms/$roomId",
					params: c,
					children: [h, "Retour à la salle"],
				}),
			})),
			(e[17] = c),
			(e[18] = p))
		: (p = e[18]);
	let d;
	e[19] !== a || e[20] !== p
		? ((d = o.jsxs("div", {
				className: "flex justify-between items-center",
				children: [a, p],
			})),
			(e[19] = a),
			(e[20] = p),
			(e[21] = d))
		: (d = e[21]);
	let v;
	e[22] === Symbol.for("react.memo_cache_sentinel")
		? ((v = o.jsx(z, { className: "h-4 w-4" })), (e[22] = v))
		: (v = e[22]);
	let j;
	e[23] === Symbol.for("react.memo_cache_sentinel")
		? ((j = o.jsxs(w, {
				children: [
					v,
					o.jsxs(I, {
						children: [
							o.jsx("strong", { children: "Important :" }),
							" En modifiant le créneau, vous pouvez entrer en conflit avec d’autres réservations. Vérifiez bien les nouvelles dates.",
						],
					}),
				],
			})),
			(e[23] = j))
		: (j = e[23]);
	let f;
	e[24] !== N ||
	e[25] !== g ||
	e[26] !== t.id ||
	e[27] !== t.openingHours ||
	e[28] !== i
		? ((f = o.jsx($, {
				roomId: t.id,
				roomOpeningHours: t.openingHours,
				roomReservation: i,
				onSuccess: N,
				onCancelLink: g,
			})),
			(e[24] = N),
			(e[25] = g),
			(e[26] = t.id),
			(e[27] = t.openingHours),
			(e[28] = i),
			(e[29] = f))
		: (f = e[29]);
	let R;
	return (
		e[30] !== d || e[31] !== f
			? ((R = o.jsxs("div", { className: "space-y-6", children: [d, j, f] })),
				(e[30] = d),
				(e[31] = f),
				(e[32] = R))
			: (R = e[32]),
		R
	);
}
const ce = () => {
	const e = y.c(4),
		{ roomReservation: r, room: t, complex: i } = H.useLoaderData();
	let s;
	return (
		e[0] !== i || e[1] !== t || e[2] !== r
			? ((s = o.jsx(B, { roomReservation: r, room: t, complex: i })),
				(e[0] = i),
				(e[1] = t),
				(e[2] = r),
				(e[3] = s))
			: (s = e[3]),
		s
	);
};
export { ce as component };
