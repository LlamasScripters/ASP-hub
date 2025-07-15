import { M as N } from "./MinibusForm-D89IP9eu.js";
import { A as d, a as f } from "./alert-DcqybFAu.js";
import { A as _ } from "./arrow-left-DMyOJown.js";
import { C as A } from "./circle-alert-CvO-74L-.js";
import { C as v } from "./circle-check-big-DWIiKDvL.js";
import {
	L as C,
	B as S,
	i as b,
	r as g,
	j as s,
	c as x,
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
function w() {
	const e = x.c(13),
		i = b(),
		[t, h] = g.useState(!1);
	let n;
	e[0] !== i
		? ((n = (j) => {
				h(!0),
					setTimeout(() => {
						i({ to: `/admin/assets/minibuses/${j.id}` });
					}, 1500);
			}),
			(e[0] = i),
			(e[1] = n))
		: (n = e[1]);
	const p = n;
	let c;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((c = s.jsxs("div", {
				children: [
					s.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Créer un minibus",
					}),
					s.jsx("p", {
						className: "text-muted-foreground",
						children: "Ajouter un nouveau minibus à la flotte",
					}),
				],
			})),
			(e[2] = c))
		: (c = e[2]);
	let m;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((m = s.jsxs("div", {
				className: "flex justify-between items-center",
				children: [
					c,
					s.jsx(S, {
						variant: "outline",
						size: "sm",
						asChild: !0,
						children: s.jsxs(C, {
							to: "/admin/assets/minibuses",
							children: [s.jsx(_, { className: "w-4 h-4 mr-2" }), "Retour"],
						}),
					}),
				],
			})),
			(e[3] = m))
		: (m = e[3]);
	let r;
	e[4] !== t
		? ((r =
				t &&
				s.jsxs(d, {
					className: "border-green-200 bg-green-50",
					children: [
						s.jsx(v, { className: "h-4 w-4 text-green-600" }),
						s.jsx(f, {
							className: "text-green-800",
							children: "Minibus créé avec succès ! Redirection en cours...",
						}),
					],
				})),
			(e[4] = t),
			(e[5] = r))
		: (r = e[5]);
	let a;
	e[6] === Symbol.for("react.memo_cache_sentinel")
		? ((a = s.jsx(A, { className: "h-4 w-4" })), (e[6] = a))
		: (a = e[6]);
	let l;
	e[7] === Symbol.for("react.memo_cache_sentinel")
		? ((l = s.jsxs(d, {
				children: [
					a,
					s.jsxs(f, {
						children: [
							s.jsx("strong", { children: "Important :" }),
							" Assurez-vous de remplir tous les champs requis et de définir les créneaux de disponibilité appropriés.",
						],
					}),
				],
			})),
			(e[7] = l))
		: (l = e[7]);
	let o;
	e[8] !== p
		? ((o = s.jsx(N, {
				onSuccess: p,
				onCancelLink: "/admin/assets/minibuses",
			})),
			(e[8] = p),
			(e[9] = o))
		: (o = e[9]);
	let u;
	return (
		e[10] !== r || e[11] !== o
			? ((u = s.jsxs("div", {
					className: "space-y-6",
					children: [m, r, l, o],
				})),
				(e[10] = r),
				(e[11] = o),
				(e[12] = u))
			: (u = e[12]),
		u
	);
}
const U = () => {
	const i = x.c(1);
	let t;
	return (
		i[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = s.jsx(w, {})), (i[0] = t))
			: (t = i[0]),
		t
	);
};
export { U as component };
