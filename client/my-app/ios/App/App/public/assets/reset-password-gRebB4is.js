import { P as ce, c as ie } from "./PasswordStrengthIndicator-GvqmZ7qZ.js";
import { A as ue } from "./arrow-left-DMyOJown.js";
import { E as G } from "./eye-D8N8bRfa.js";
import { E as O } from "./eye-off-zA7XEEL7.js";
import {
	s as I,
	o as Q,
	v as R,
	p as U,
	r as V,
	i as W,
	u as X,
	h as Y,
	w as Z,
	c as _,
	e as ae,
	L as ee,
	x as le,
	f as ne,
	d as oe,
	b as re,
	j as s,
	C as se,
	S as te,
	B as z,
} from "./index-kb-Ylywn.js";
import { I as H } from "./input-CdkcPZS3.js";
import {
	F as $,
	d as B,
	e as D,
	b as T,
	u as de,
	a as fe,
	s as me,
	c as q,
} from "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
const he = Q({
	newPassword: I().min(R.passwordMinLength, {
		message: `Le mot de passe doit faire au moins ${R.passwordMinLength} caractères`,
	}),
	confirmPassword: I().min(1, "Veuillez confirmer le mot de passe"),
	passwordMinStrength: U().min(3, "Veuillez entrer un mot de passe fort"),
}).refine((c) => c.newPassword === c.confirmPassword, {
	message: "Les mots de passe ne correspondent pas",
	path: ["confirmPassword"],
});
function pe(c) {
	const e = _.c(43),
		{ token: i } = c,
		[r, a] = V.useState(!1),
		[n, J] = V.useState(!1),
		C = W();
	let b;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((b = {
				resolver: me(he),
				defaultValues: {
					newPassword: "",
					confirmPassword: "",
					passwordMinStrength: 0,
				},
			}),
			(e[0] = b))
		: (b = e[0]);
	const t = de(b);
	let m;
	e[1] !== i
		? ((m = async (o) => {
				const { error: l } = await Y.resetPassword({
					newPassword: o.newPassword,
					token: i,
				});
				if (l != null && l.code) throw new Error(l.code);
			}),
			(e[1] = i),
			(e[2] = m))
		: (m = e[2]);
	let d;
	e[3] !== C
		? ((d = () => {
				C({
					to: "/auth/login",
					search: { from: "reset-password-success" },
					mask: { to: "/auth/login" },
				});
			}),
			(e[3] = C),
			(e[4] = d))
		: (d = e[4]);
	let f;
	e[5] !== t
		? ((f = (o) => {
				t.setError("root", { message: Z(o.message) });
			}),
			(e[5] = t),
			(e[6] = f))
		: (f = e[6]);
	let v;
	e[7] !== m || e[8] !== d || e[9] !== f
		? ((v = { mutationFn: m, onSuccess: d, onError: f }),
			(e[7] = m),
			(e[8] = d),
			(e[9] = f),
			(e[10] = v))
		: (v = e[10]);
	const M = X(v);
	let P;
	e[11] !== M
		? ((P = (o) => {
				console.log(o), M.mutate(o);
			}),
			(e[11] = M),
			(e[12] = P))
		: (P = e[12]);
	const F = P,
		K = xe;
	let N;
	e[13] !== t
		? ((N = (o) => (l) => {
				o(l);
				const { score: L } = ie(l.target.value);
				t.setValue("passwordMinStrength", L);
			}),
			(e[13] = t),
			(e[14] = N))
		: (N = e[14]);
	const E = N;
	let u;
	e[15] !== t || e[16] !== F
		? ((u = t.handleSubmit(F, K)), (e[15] = t), (e[16] = F), (e[17] = u))
		: (u = e[17]);
	let h;
	e[18] !== E || e[19] !== r
		? ((h = (o) => {
				const { field: l } = o,
					{ onChange: L, ...A } = l;
				return s.jsxs(T, {
					children: [
						s.jsx(q, { children: "Nouveau mot de passe" }),
						s.jsx(B, {
							children: s.jsxs("div", {
								className: "relative",
								children: [
									s.jsx(H, {
										type: r ? "text" : "password",
										placeholder: `Nouveau mot de passe (min. ${R.passwordMinLength} caractères)`,
										...A,
										onChange: E(L),
									}),
									s.jsx(z, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className:
											"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
										onClick: () => a(!r),
										"aria-label": r
											? "Masquer le mot de passe"
											: "Afficher le mot de passe",
										children: r
											? s.jsx(O, { className: "size-4" })
											: s.jsx(G, { className: "size-4" }),
									}),
								],
							}),
						}),
						s.jsx(ce, { password: A.value }),
						s.jsx(D, {}),
					],
				});
			}),
			(e[18] = E),
			(e[19] = r),
			(e[20] = h))
		: (h = e[20]);
	let p;
	e[21] !== t.control || e[22] !== h
		? ((p = s.jsx($, { control: t.control, name: "newPassword", render: h })),
			(e[21] = t.control),
			(e[22] = h),
			(e[23] = p))
		: (p = e[23]);
	let x;
	e[24] !== n
		? ((x = (o) => {
				const { field: l } = o;
				return s.jsxs(T, {
					children: [
						s.jsx(q, { children: "Confirmer le mot de passe" }),
						s.jsx(B, {
							children: s.jsxs("div", {
								className: "relative",
								children: [
									s.jsx(H, {
										type: n ? "text" : "password",
										placeholder: "Confirmer le nouveau mot de passe",
										...l,
									}),
									s.jsx(z, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className:
											"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
										onClick: () => J(!n),
										"aria-label": n
											? "Masquer le mot de passe"
											: "Afficher le mot de passe",
										children: n
											? s.jsx(O, { className: "size-4" })
											: s.jsx(G, { className: "size-4" }),
									}),
								],
							}),
						}),
						s.jsx(D, {}),
					],
				});
			}),
			(e[24] = n),
			(e[25] = x))
		: (x = e[25]);
	let w;
	e[26] !== t.control || e[27] !== x
		? ((w = s.jsx($, {
				control: t.control,
				name: "confirmPassword",
				render: x,
			})),
			(e[26] = t.control),
			(e[27] = x),
			(e[28] = w))
		: (w = e[28]);
	let j;
	e[29] !== t.formState.errors.root
		? ((j =
				t.formState.errors.root &&
				s.jsx("div", {
					className: "text-red-500 text-sm text-center",
					children: t.formState.errors.root.message,
				})),
			(e[29] = t.formState.errors.root),
			(e[30] = j))
		: (j = e[30]);
	const k = t.formState.isSubmitting
		? "Mise à jour..."
		: "Définir le mot de passe";
	let g;
	e[31] !== t.formState.isSubmitting || e[32] !== k
		? ((g = s.jsx(z, {
				type: "submit",
				disabled: t.formState.isSubmitting,
				className: "w-full",
				children: k,
			})),
			(e[31] = t.formState.isSubmitting),
			(e[32] = k),
			(e[33] = g))
		: (g = e[33]);
	let S;
	e[34] !== p || e[35] !== w || e[36] !== j || e[37] !== g || e[38] !== u
		? ((S = s.jsxs("form", {
				onSubmit: u,
				className: "space-y-6",
				children: [p, w, j, g],
			})),
			(e[34] = p),
			(e[35] = w),
			(e[36] = j),
			(e[37] = g),
			(e[38] = u),
			(e[39] = S))
		: (S = e[39]);
	let y;
	return (
		e[40] !== t || e[41] !== S
			? ((y = s.jsx(fe, { ...t, children: S })),
				(e[40] = t),
				(e[41] = S),
				(e[42] = y))
			: (y = e[42]),
		y
	);
}
function xe(c) {
	console.log(c);
}
function we(c) {
	const e = _.c(4),
		{ token: i } = c;
	let r;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((r = s.jsxs(ee, {
				to: "/",
				className:
					"flex items-center mb-8 text-emerald-600 hover:text-emerald-700",
				children: [
					s.jsx(ue, { className: "w-4 h-4 mr-2" }),
					"Retour à l'accueil",
				],
			})),
			(e[0] = r))
		: (r = e[0]);
	let a;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((a = s.jsxs(se, {
				className: "space-y-1 text-center",
				children: [
					s.jsx("div", {
						className: "flex justify-center mb-2",
						children: s.jsx(te, { className: "w-10 h-10 text-emerald-600" }),
					}),
					s.jsx(re, {
						className: "text-2xl font-bold",
						children: "Changer de mot de passe",
					}),
					s.jsx(oe, { children: "Veuillez entrer un nouveau mot de passe" }),
				],
			})),
			(e[1] = a))
		: (a = e[1]);
	let n;
	return (
		e[2] !== i
			? ((n = s.jsx("div", {
					className: "flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900",
					children: s.jsxs("div", {
						className:
							"container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6",
						children: [
							r,
							s.jsxs(ae, {
								className: "w-full max-w-md",
								children: [
									a,
									s.jsx(ne, {
										children: i
											? s.jsx(pe, { token: i })
											: s.jsx("div", {
													className: "text-center",
													children: s.jsx("p", {
														children:
															"Le lien de réinitialisation est invalide ou a expiré.",
													}),
												}),
									}),
								],
							}),
						],
					}),
				})),
				(e[2] = i),
				(e[3] = n))
			: (n = e[3]),
		n
	);
}
const Me = () => {
	const e = _.c(2),
		{ token: i } = le.useSearch(),
		r = i || "";
	let a;
	return (
		e[0] !== r
			? ((a = s.jsx(we, { token: r })), (e[0] = r), (e[1] = a))
			: (a = e[1]),
		a
	);
};
export { Me as component };
