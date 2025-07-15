import { M as k } from "./MinibusForm-D89IP9eu.js";
import { a as C, A as _ } from "./alert-DcqybFAu.js";
import { A as $ } from "./arrow-left-DMyOJown.js";
import { C as I } from "./circle-alert-CvO-74L-.js";
import { C as B } from "./circle-check-big-DWIiKDvL.js";
import {
	ce as E,
	c1 as L,
	L as N,
	i as R,
	B as S,
	j as s,
	c as w,
	r as y,
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
import "./separator-DDNy3jpa.js";
import "./textarea-CTVCAbGX.js";
import "./info-hEQo0LXU.js";
import "./timer-l0uyiV2G.js";
import "./loader-circle-Bxgg9gFD.js";
function z(b) {
	var g, v;
	const e = w.c(23),
		{ minibus: t } = b,
		i = R(),
		[x, A] = y.useState(!1),
		h =
			((v =
				(g = L().__store.prevState) == null ? void 0 : g.resolvedLocation) ==
			null
				? void 0
				: v.href) || void 0;
	let l;
	e[0] !== i
		? ((l = (M) => {
				A(!0),
					setTimeout(() => {
						i({ to: `/admin/assets/minibuses/${M.id}` });
					}, 1500);
			}),
			(e[0] = i),
			(e[1] = l))
		: (l = e[1]);
	const j = l;
	let m;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((m = s.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Modifier un minibus",
			})),
			(e[2] = m))
		: (m = e[2]);
	let r;
	e[3] !== t.name
		? ((r = s.jsxs("div", {
				children: [
					m,
					s.jsxs("p", {
						className: "text-muted-foreground",
						children: [
							"Modifier le minibus ",
							s.jsx("strong", { children: t.name }),
						],
					}),
				],
			})),
			(e[3] = t.name),
			(e[4] = r))
		: (r = e[4]);
	let u;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((u = s.jsx(S, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: s.jsxs(N, {
					to: "/admin/assets/minibuses",
					children: [
						s.jsx($, { className: "w-4 h-4 mr-2" }),
						"Retour à la liste",
					],
				}),
			})),
			(e[5] = u))
		: (u = e[5]);
	let o;
	e[6] !== t.id
		? ((o = s.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					u,
					s.jsx(S, {
						asChild: !0,
						children: s.jsx(N, {
							to: "/admin/assets/minibuses/$minibusId",
							params: { minibusId: t.id },
							children: "Voir les détails",
						}),
					}),
				],
			})),
			(e[6] = t.id),
			(e[7] = o))
		: (o = e[7]);
	let n;
	e[8] !== r || e[9] !== o
		? ((n = s.jsxs("div", {
				className: "flex justify-between items-center",
				children: [r, o],
			})),
			(e[8] = r),
			(e[9] = o),
			(e[10] = n))
		: (n = e[10]);
	let a;
	e[11] !== x
		? ((a =
				x &&
				s.jsxs(_, {
					className: "border-green-200 bg-green-50",
					children: [
						s.jsx(B, { className: "h-4 w-4 text-green-600" }),
						s.jsx(C, {
							className: "text-green-800",
							children: "Minibus modifié avec succès ! Redirection en cours...",
						}),
					],
				})),
			(e[11] = x),
			(e[12] = a))
		: (a = e[12]);
	let d;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((d = s.jsx(I, { className: "h-4 w-4" })), (e[13] = d))
		: (d = e[13]);
	let f;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((f = s.jsxs(_, {
				children: [
					d,
					s.jsxs(C, {
						children: [
							s.jsx("strong", { children: "Important :" }),
							" Assurez-vous que les informations du minibus sont correctes avant de sauvegarder. Toute modification peut affecter les réservations existantes.",
						],
					}),
				],
			})),
			(e[14] = f))
		: (f = e[14]);
	let c;
	e[15] !== j || e[16] !== t || e[17] !== h
		? ((c = s.jsx(k, { minibus: t, onSuccess: j, onCancelLink: h })),
			(e[15] = j),
			(e[16] = t),
			(e[17] = h),
			(e[18] = c))
		: (c = e[18]);
	let p;
	return (
		e[19] !== c || e[20] !== n || e[21] !== a
			? ((p = s.jsxs("div", {
					className: "space-y-6",
					children: [n, a, f, c],
				})),
				(e[19] = c),
				(e[20] = n),
				(e[21] = a),
				(e[22] = p))
			: (p = e[22]),
		p
	);
}
const oe = () => {
	const e = w.c(2),
		{ minibus: t } = E.useLoaderData();
	let i;
	return (
		e[0] !== t
			? ((i = s.jsx(z, { minibus: t })), (e[0] = t), (e[1] = i))
			: (i = e[1]),
		i
	);
};
export { oe as component };
