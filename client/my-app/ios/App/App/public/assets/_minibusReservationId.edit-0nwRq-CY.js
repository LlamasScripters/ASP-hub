import { M as C } from "./MinibusReservationForm-qQ54ap1j.js";
import { A as L, a as M } from "./alert-DcqybFAu.js";
import { A as E } from "./arrow-left-DMyOJown.js";
import { C as w } from "./circle-alert-CvO-74L-.js";
import {
	ci as A,
	c1 as N,
	L as S,
	i as _,
	B as g,
	j as t,
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
import "./separator-DDNy3jpa.js";
import "./useMinibusReservations-Ch0A6YDJ.js";
import "./info-hEQo0LXU.js";
import "./loader-circle-Bxgg9gFD.js";
function k(v) {
	var j, R;
	const e = y.c(25),
		{ minibus: i, minibusReservation: s } = v,
		o = _(),
		x =
			((R =
				(j = N().__store.prevState) == null ? void 0 : j.resolvedLocation) ==
			null
				? void 0
				: R.href) || void 0;
	let c;
	e[0] !== i.id || e[1] !== o
		? ((c = () => {
				setTimeout(() => {
					o({ to: `/admin/assets/minibuses/${i.id}` });
				}, 1500);
			}),
			(e[0] = i.id),
			(e[1] = o),
			(e[2] = c))
		: (c = e[2]);
	const h = c;
	let u;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((u = t.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Modifier une réservation",
			})),
			(e[3] = u))
		: (u = e[3]);
	let r;
	e[4] !== s.title
		? ((r = t.jsx("span", { className: "font-medium", children: s.title })),
			(e[4] = s.title),
			(e[5] = r))
		: (r = e[5]);
	let n;
	e[6] !== i.name
		? ((n = t.jsx("span", { className: "font-medium", children: i.name })),
			(e[6] = i.name),
			(e[7] = n))
		: (n = e[7]);
	let m;
	e[8] !== r || e[9] !== n
		? ((m = t.jsxs("div", {
				children: [
					u,
					t.jsxs("p", {
						className: "text-muted-foreground",
						children: ["Modifier la réservation", " ", r, " du minibus ", n],
					}),
				],
			})),
			(e[8] = r),
			(e[9] = n),
			(e[10] = m))
		: (m = e[10]);
	let p;
	e[11] === Symbol.for("react.memo_cache_sentinel")
		? ((p = t.jsx(g, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: t.jsxs(S, {
					to: "/admin/assets/minibuses",
					children: [
						t.jsx(E, { className: "w-4 h-4 mr-2" }),
						"Retour au minibus",
					],
				}),
			})),
			(e[11] = p))
		: (p = e[11]);
	let a;
	e[12] !== m
		? ((a = t.jsxs("div", {
				className: "flex justify-between items-center",
				children: [m, p],
			})),
			(e[12] = m),
			(e[13] = a))
		: (a = e[13]);
	let d;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((d = t.jsx(w, { className: "h-4 w-4" })), (e[14] = d))
		: (d = e[14]);
	let f;
	e[15] === Symbol.for("react.memo_cache_sentinel")
		? ((f = t.jsxs(L, {
				children: [
					d,
					t.jsxs(M, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" En modifiant le créneau, vous pouvez entrer en conflit avec d'autres réservations. Vérifiez bien les nouvelles dates.",
						],
					}),
				],
			})),
			(e[15] = f))
		: (f = e[15]);
	let l;
	e[16] !== h ||
	e[17] !== i.disponibility ||
	e[18] !== i.id ||
	e[19] !== s ||
	e[20] !== x
		? ((l = t.jsx(C, {
				minibusId: i.id,
				minibusDisponibility: i.disponibility,
				minibusReservation: s,
				onSuccess: h,
				onCancelLink: x,
			})),
			(e[16] = h),
			(e[17] = i.disponibility),
			(e[18] = i.id),
			(e[19] = s),
			(e[20] = x),
			(e[21] = l))
		: (l = e[21]);
	let b;
	return (
		e[22] !== l || e[23] !== a
			? ((b = t.jsxs("div", { className: "space-y-6", children: [a, f, l] })),
				(e[22] = l),
				(e[23] = a),
				(e[24] = b))
			: (b = e[24]),
		b
	);
}
const ne = () => {
	const e = y.c(3),
		{ minibus: i, minibusReservation: s } = A.useLoaderData();
	let o;
	return (
		e[0] !== i || e[1] !== s
			? ((o = t.jsx(k, { minibus: i, minibusReservation: s })),
				(e[0] = i),
				(e[1] = s),
				(e[2] = o))
			: (o = e[2]),
		o
	);
};
export { ne as component };
