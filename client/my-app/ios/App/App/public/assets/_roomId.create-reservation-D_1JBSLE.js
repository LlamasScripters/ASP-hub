import { R as I } from "./RoomReservationForm-Clry92fM.js";
import { A as H, a as w } from "./alert-DcqybFAu.js";
import { A as $ } from "./arrow-left-DMyOJown.js";
import { C as k } from "./circle-alert-CvO-74L-.js";
import {
	L as A,
	c as C,
	c5 as L,
	i as S,
	c1 as b,
	j as o,
	B as y,
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
function E(R) {
	var N, _;
	const e = C.c(29),
		{ complex: r, room: t } = R,
		s = S(),
		v =
			((_ =
				(N = b().__store.prevState) == null ? void 0 : N.resolvedLocation) ==
			null
				? void 0
				: _.href) || void 0;
	let d;
	e[0] !== s || e[1] !== t.id
		? ((d = () => {
				setTimeout(() => {
					s({ to: `/admin/facilities/rooms/${t.id}` });
				}, 1500);
			}),
			(e[0] = s),
			(e[1] = t.id),
			(e[2] = d))
		: (d = e[2]);
	const g = d;
	let f;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((f = o.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Créer une réservation",
			})),
			(e[3] = f))
		: (f = e[3]);
	let i;
	e[4] !== t.name
		? ((i = o.jsx("span", { className: "font-medium", children: t.name })),
			(e[4] = t.name),
			(e[5] = i))
		: (i = e[5]);
	let n;
	e[6] !== r.name
		? ((n = o.jsx("span", { className: "font-medium", children: r.name })),
			(e[6] = r.name),
			(e[7] = n))
		: (n = e[7]);
	let m;
	e[8] !== i || e[9] !== n
		? ((m = o.jsxs("div", {
				children: [
					f,
					o.jsxs("p", {
						className: "text-muted-foreground",
						children: [
							"Nouvelle réservation pour la salle",
							" ",
							i,
							" du complexe",
							" ",
							n,
						],
					}),
				],
			})),
			(e[8] = i),
			(e[9] = n),
			(e[10] = m))
		: (m = e[10]);
	let a;
	e[11] !== t.id
		? ((a = { roomId: t.id }), (e[11] = t.id), (e[12] = a))
		: (a = e[12]);
	let u;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((u = o.jsx($, { className: "w-4 h-4 mr-2" })), (e[13] = u))
		: (u = e[13]);
	let l;
	e[14] !== a
		? ((l = o.jsx(y, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: o.jsxs(A, {
					to: "/admin/facilities/rooms/$roomId",
					params: a,
					children: [u, "Retour à la salle"],
				}),
			})),
			(e[14] = a),
			(e[15] = l))
		: (l = e[15]);
	let c;
	e[16] !== m || e[17] !== l
		? ((c = o.jsxs("div", {
				className: "flex justify-between items-center",
				children: [m, l],
			})),
			(e[16] = m),
			(e[17] = l),
			(e[18] = c))
		: (c = e[18]);
	let x;
	e[19] === Symbol.for("react.memo_cache_sentinel")
		? ((x = o.jsx(k, { className: "h-4 w-4" })), (e[19] = x))
		: (x = e[19]);
	let h;
	e[20] === Symbol.for("react.memo_cache_sentinel")
		? ((h = o.jsxs(H, {
				children: [
					x,
					o.jsxs(w, {
						children: [
							o.jsx("strong", { children: "Important :" }),
							" Veuillez vérifier que les créneaux choisis ne soient pas déjà réservés. En cas de conflit, un message d’erreur s’affichera.",
						],
					}),
				],
			})),
			(e[20] = h))
		: (h = e[20]);
	let p;
	e[21] !== g || e[22] !== v || e[23] !== t.id || e[24] !== t.openingHours
		? ((p = o.jsx(I, {
				roomId: t.id,
				roomOpeningHours: t.openingHours,
				onSuccess: g,
				onCancelLink: v,
			})),
			(e[21] = g),
			(e[22] = v),
			(e[23] = t.id),
			(e[24] = t.openingHours),
			(e[25] = p))
		: (p = e[25]);
	let j;
	return (
		e[26] !== p || e[27] !== c
			? ((j = o.jsxs("div", { className: "space-y-6", children: [c, h, p] })),
				(e[26] = p),
				(e[27] = c),
				(e[28] = j))
			: (j = e[28]),
		j
	);
}
const ae = () => {
	const e = C.c(3),
		{ room: r, complex: t } = L.useLoaderData();
	let s;
	return (
		e[0] !== t || e[1] !== r
			? ((s = o.jsx(E, { room: r, complex: t })),
				(e[0] = t),
				(e[1] = r),
				(e[2] = s))
			: (s = e[2]),
		s
	);
};
export { ae as component };
