import { G as g } from "./GoogleIcon-D1uQH_Nc.js";
import {
	j as c,
	B as d,
	u as f,
	w as h,
	l as m,
	c as u,
	h as x,
} from "./index-kb-Ylywn.js";
function b(t) {
	const e = u.c(9),
		{ children: o, className: i } = t;
	let s;
	e[0] !== i
		? ((s = m("w-full border-t", i)), (e[0] = i), (e[1] = s))
		: (s = e[1]);
	let n;
	e[2] !== s
		? ((n = c.jsx("div", {
				className: "absolute inset-0 flex items-center",
				children: c.jsx("span", { className: s }),
			})),
			(e[2] = s),
			(e[3] = n))
		: (n = e[3]);
	let a;
	e[4] !== o
		? ((a = c.jsx("div", {
				className: "relative flex justify-center text-xs uppercase",
				children: o,
			})),
			(e[4] = o),
			(e[5] = a))
		: (a = e[5]);
	let l;
	return (
		e[6] !== n || e[7] !== a
			? ((l = c.jsxs("div", { className: "relative", children: [n, a] })),
				(e[6] = n),
				(e[7] = a),
				(e[8] = l))
			: (l = e[8]),
		l
	);
}
function w() {
	const t = u.c(10);
	let e;
	t[0] === Symbol.for("react.memo_cache_sentinel")
		? ((e = { mutationFn: p }), (t[0] = e))
		: (e = t[0]);
	const { mutate: o, isPending: i } = f(e);
	let s;
	t[1] !== o
		? ((s = () => {
				o();
			}),
			(t[1] = o),
			(t[2] = s))
		: (s = t[2]);
	let n;
	t[3] === Symbol.for("react.memo_cache_sentinel")
		? ((n = c.jsx(g, { className: "h-5 w-5" })), (t[3] = n))
		: (n = t[3]);
	const a = i ? "Connexion en cours..." : "Continuer avec Google";
	let l;
	t[4] !== a
		? ((l = c.jsx("span", { children: a })), (t[4] = a), (t[5] = l))
		: (l = t[5]);
	let r;
	return (
		t[6] !== i || t[7] !== s || t[8] !== l
			? ((r = c.jsxs(d, {
					variant: "outline",
					onClick: s,
					disabled: i,
					className: "w-full flex items-center justify-center gap-2",
					children: [n, l],
				})),
				(t[6] = i),
				(t[7] = s),
				(t[8] = l),
				(t[9] = r))
			: (r = t[9]),
		r
	);
}
async function p() {
	const { data: t, error: e } = await x.signIn.social({
		provider: "google",
		callbackURL: "/dashboard",
	});
	if (e != null && e.code) throw new Error(h(e.code));
	return t;
}
export { b as D, w as L };
