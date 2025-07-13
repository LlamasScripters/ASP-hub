import { C as s } from "./ClubForm-Dc2FTBEu.js";
import { cd as e, j as p, c as r } from "./index-kb-Ylywn.js";
import "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./alert-DcqybFAu.js";
import "./input-CdkcPZS3.js";
import "./textarea-CTVCAbGX.js";
import "./loader-circle-Bxgg9gFD.js";
import "./arrow-left-DMyOJown.js";
import "./circle-check-big-DWIiKDvL.js";
import "./building-2-C_wvjtu2.js";
import "./circle-alert-CvO-74L-.js";
import "./file-text-Dzq0McNO.js";
import "./map-pin-DywQhs4x.js";
import "./mail--zklVbGT.js";
import "./phone-BY2bep43.js";
import "./save-TX27fQkL.js";
function n() {
	const t = r.c(3);
	let o;
	t[0] === Symbol.for("react.memo_cache_sentinel")
		? ((o = {
				from: "/_authenticated/admin/_admin/dashboard/clubs/$clubId/edit",
			}),
			(t[0] = o))
		: (o = t[0]);
	const { clubId: i } = e(o);
	let m;
	return (
		t[1] !== i
			? ((m = p.jsx(s, { mode: "edit", clubId: i })), (t[1] = i), (t[2] = m))
			: (m = t[2]),
		m
	);
}
const g = n;
export { g as component };
