import { M as L } from "./MinibusReservationForm-qQ54ap1j.js";
import { a as A, A as S } from "./alert-DcqybFAu.js";
import { A as w } from "./arrow-left-DMyOJown.js";
import { C as I } from "./circle-alert-CvO-74L-.js";
import {
	cf as C,
	c1 as N,
	B as R,
	i as _,
	L as g,
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
function M(x) {
	var j, v;
	const e = y.c(24),
		{ minibus: i } = x,
		s = _(),
		b =
			((v =
				(j = N().__store.prevState) == null ? void 0 : j.resolvedLocation) ==
			null
				? void 0
				: v.href) || void 0;
	let a;
	e[0] !== i.id || e[1] !== s
		? ((a = () => {
				setTimeout(() => {
					s({ to: `/admin/assets/minibuses/${i.id}` });
				}, 1500);
			}),
			(e[0] = i.id),
			(e[1] = s),
			(e[2] = a))
		: (a = e[2]);
	const h = a;
	let c;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((c = t.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Créer une réservation",
			})),
			(e[3] = c))
		: (c = e[3]);
	let r;
	e[4] !== i.name
		? ((r = t.jsxs("div", {
				children: [
					c,
					t.jsxs("p", {
						className: "text-muted-foreground",
						children: [
							"Nouvelle réservation pour le minibus",
							" ",
							t.jsx("span", { className: "font-medium", children: i.name }),
						],
					}),
				],
			})),
			(e[4] = i.name),
			(e[5] = r))
		: (r = e[5]);
	let o;
	e[6] !== i.id
		? ((o = { minibusId: i.id }), (e[6] = i.id), (e[7] = o))
		: (o = e[7]);
	let p;
	e[8] === Symbol.for("react.memo_cache_sentinel")
		? ((p = t.jsx(w, { className: "w-4 h-4 mr-2" })), (e[8] = p))
		: (p = e[8]);
	let n;
	e[9] !== o
		? ((n = t.jsx(R, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: t.jsxs(g, {
					to: "/admin/assets/minibuses/$minibusId",
					params: o,
					children: [p, "Retour au minibus"],
				}),
			})),
			(e[9] = o),
			(e[10] = n))
		: (n = e[10]);
	let m;
	e[11] !== r || e[12] !== n
		? ((m = t.jsxs("div", {
				className: "flex justify-between items-center",
				children: [r, " ", n],
			})),
			(e[11] = r),
			(e[12] = n),
			(e[13] = m))
		: (m = e[13]);
	let u;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((u = t.jsx(I, { className: "h-4 w-4" })), (e[14] = u))
		: (u = e[14]);
	let d;
	e[15] === Symbol.for("react.memo_cache_sentinel")
		? ((d = t.jsxs(S, {
				children: [
					u,
					t.jsxs(A, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Veuillez vérifier que les créneaux choisis ne soient pas déjà réservés et respectent les heures de disponibilité du minibus.",
						],
					}),
				],
			})),
			(e[15] = d))
		: (d = e[15]);
	let l;
	e[16] !== h || e[17] !== i.disponibility || e[18] !== i.id || e[19] !== b
		? ((l = t.jsx(L, {
				minibusId: i.id,
				minibusDisponibility: i.disponibility,
				onSuccess: h,
				onCancelLink: b,
			})),
			(e[16] = h),
			(e[17] = i.disponibility),
			(e[18] = i.id),
			(e[19] = b),
			(e[20] = l))
		: (l = e[20]);
	let f;
	return (
		e[21] !== l || e[22] !== m
			? ((f = t.jsxs("div", { className: "space-y-6", children: [m, d, l] })),
				(e[21] = l),
				(e[22] = m),
				(e[23] = f))
			: (f = e[23]),
		f
	);
}
const oe = () => {
	const e = y.c(2),
		{ minibus: i } = C.useLoaderData();
	let s;
	return (
		e[0] !== i
			? ((s = t.jsx(M, { minibus: i })), (e[0] = i), (e[1] = s))
			: (s = e[1]),
		s
	);
};
export { oe as component };
