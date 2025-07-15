import { C as p } from "./ClubForm-Dc2FTBEu.js";
import { a as c, A as n } from "./alert-DcqybFAu.js";
import { A as d } from "./arrow-left-DMyOJown.js";
import { C as f } from "./circle-alert-CvO-74L-.js";
import { B as a, j as e, L as l, c as m } from "./index-kb-Ylywn.js";
import "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./input-CdkcPZS3.js";
import "./textarea-CTVCAbGX.js";
import "./loader-circle-Bxgg9gFD.js";
import "./circle-check-big-DWIiKDvL.js";
import "./building-2-C_wvjtu2.js";
import "./file-text-Dzq0McNO.js";
import "./map-pin-DywQhs4x.js";
import "./mail--zklVbGT.js";
import "./phone-BY2bep43.js";
import "./save-TX27fQkL.js";
function x() {
	const t = m.c(4);
	let o;
	t[0] === Symbol.for("react.memo_cache_sentinel")
		? ((o = e.jsxs("div", {
				children: [
					e.jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Créer une association",
					}),
					e.jsx("p", {
						className: "text-muted-foreground",
						children: "Configurez votre nouvelle association sportive",
					}),
				],
			})),
			(t[0] = o))
		: (o = t[0]);
	let r;
	t[1] === Symbol.for("react.memo_cache_sentinel")
		? ((r = e.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [
					o,
					e.jsx(a, {
						variant: "outline",
						size: "sm",
						asChild: !0,
						children: e.jsxs(l, {
							to: "/admin/dashboard/clubs",
							children: [
								e.jsx(d, { className: "w-4 h-4 mr-2" }),
								"Retour au tableau de bord",
							],
						}),
					}),
				],
			})),
			(t[1] = r))
		: (r = t[1]);
	let s;
	t[2] === Symbol.for("react.memo_cache_sentinel")
		? ((s = e.jsx(f, { className: "h-4 w-4" })), (t[2] = s))
		: (s = t[2]);
	let i;
	return (
		t[3] === Symbol.for("react.memo_cache_sentinel")
			? ((i = e.jsxs("div", {
					className: "space-y-6",
					children: [
						r,
						e.jsxs(n, {
							children: [
								s,
								e.jsxs(c, {
									children: [
										e.jsx("strong", { children: "Important :" }),
										" Une fois créée, cette association contiendra toutes vos sections et catégories sportives.",
									],
								}),
							],
						}),
						e.jsx(p, { mode: "create" }),
					],
				})),
				(t[3] = i))
			: (i = t[3]),
		i
	);
}
const E = x;
export { E as component };
