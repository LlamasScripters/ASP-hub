import { C as w } from "./ComplexForm-bxJ8A0xo.js";
import { A as f, a as u } from "./alert-DcqybFAu.js";
import { A as N } from "./arrow-left-DMyOJown.js";
import { C as b } from "./circle-alert-CvO-74L-.js";
import { C as A } from "./circle-check-big-DWIiKDvL.js";
import {
	r as C,
	L as S,
	i as g,
	c as j,
	j as s,
	B as v,
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
import "./info-hEQo0LXU.js";
import "./map-pin-DywQhs4x.js";
import "./timer-l0uyiV2G.js";
import "./users-BMY-28E4.js";
import "./car-DIHhrsj8.js";
import "./loader-circle-Bxgg9gFD.js";
function _() {
	const e = j.c(13),
		n = g(),
		[p, d] = C.useState(!1);
	let o;
	e[0] !== n
		? ((o = (h) => {
				d(!0),
					setTimeout(() => {
						n({ to: `/admin/facilities/complexes/${h.id}` });
					}, 1500);
			}),
			(e[0] = n),
			(e[1] = o))
		: (o = e[1]);
	const x = o;
	let i;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((i = s.jsxs("div", {
				children: [
					s.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Créer un complexe",
					}),
					s.jsx("p", {
						className: "text-muted-foreground",
						children:
							"Remplissez les informations pour ajouter un nouveau complexe",
					}),
				],
			})),
			(e[2] = i))
		: (i = e[2]);
	let l;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((l = s.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					i,
					s.jsx(v, {
						variant: "outline",
						size: "sm",
						asChild: !0,
						children: s.jsxs(S, {
							to: "/admin/facilities/complexes",
							search: { view: "complexes" },
							children: [
								s.jsx(N, { className: "w-4 h-4 mr-2" }),
								"Retour à la liste",
							],
						}),
					}),
				],
			})),
			(e[3] = l))
		: (l = e[3]);
	let t;
	e[4] !== p
		? ((t =
				p &&
				s.jsxs(f, {
					className: "border-green-200 bg-green-50",
					children: [
						s.jsx(A, { className: "h-4 w-4 text-green-600" }),
						s.jsx(u, {
							className: "text-green-800",
							children:
								"Le complexe a été créé avec succès ! Redirection en cours...",
						}),
					],
				})),
			(e[4] = p),
			(e[5] = t))
		: (t = e[5]);
	let c;
	e[6] === Symbol.for("react.memo_cache_sentinel")
		? ((c = s.jsx(b, { className: "h-4 w-4" })), (e[6] = c))
		: (c = e[6]);
	let m;
	e[7] === Symbol.for("react.memo_cache_sentinel")
		? ((m = s.jsxs(f, {
				children: [
					c,
					s.jsxs(u, {
						children: [
							s.jsx("strong", { children: "Important :" }),
							" Une fois créé, ce complexe pourra contenir des salles qui pourront être réservées. Assurez-vous de fournir des informations précises et complètes.",
						],
					}),
				],
			})),
			(e[7] = m))
		: (m = e[7]);
	let r;
	e[8] !== x
		? ((r = s.jsx(w, {
				onSuccess: x,
				onCancelLink: "/admin/facilities/complexes?view=complexes",
			})),
			(e[8] = x),
			(e[9] = r))
		: (r = e[9]);
	let a;
	return (
		e[10] !== t || e[11] !== r
			? ((a = s.jsxs("div", {
					className: "space-y-6",
					children: [l, t, m, r],
				})),
				(e[10] = t),
				(e[11] = r),
				(e[12] = a))
			: (a = e[12]),
		a
	);
}
const V = _;
export { V as component };
