import { A as H } from "./arrow-left-DMyOJown.js";
import {
	b as A,
	s as C,
	L as E,
	u as F,
	d as I,
	e as L,
	c as N,
	f as P,
	C as R,
	o as _,
	r as g,
	j as s,
	B as v,
	h as w,
} from "./index-kb-Ylywn.js";
import { I as D } from "./input-CdkcPZS3.js";
import {
	e as $,
	d as B,
	a as M,
	s as T,
	b as V,
	u as k,
	c as q,
	F as z,
} from "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
const U = _({ email: C().email("Adresse email invalide") });
function G() {
	const e = N.c(29),
		[r, a] = g.useState(!1);
	let o;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((o = { resolver: T(U), defaultValues: { email: "" } }), (e[0] = o))
		: (o = e[0]);
	const t = k(o);
	let f;
	e[1] === Symbol.for("react.memo_cache_sentinel")
		? ((f = () => {
				a(!0);
			}),
			(e[1] = f))
		: (f = e[1]);
	let x;
	e[2] !== t
		? ((x = {
				mutationFn: K,
				onSuccess: f,
				onError: () => {
					t.setError("root", {
						message: "Une erreur inattendue s'est produite",
					});
				},
			}),
			(e[2] = t),
			(e[3] = x))
		: (x = e[3]);
	const { mutate: l } = F(x);
	let h;
	e[4] !== l
		? ((h = (u) => {
				l(u);
			}),
			(e[4] = l),
			(e[5] = h))
		: (h = e[5]);
	const y = h;
	if (r) {
		let u;
		e[6] === Symbol.for("react.memo_cache_sentinel")
			? ((u = s.jsxs("div", {
					className: "space-y-2",
					children: [
						s.jsx("h2", {
							className: "text-lg font-medium",
							children: "Email envoyé !",
						}),
						s.jsx("p", {
							className: "text-sm text-muted-foreground",
							children:
								"Si cette adresse email existe dans notre système, vous recevrez un lien de réinitialisation dans quelques minutes.",
						}),
					],
				})),
				(e[6] = u))
			: (u = e[6]);
		let j;
		e[7] === Symbol.for("react.memo_cache_sentinel")
			? ((j = s.jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Vous n'avez pas reçu l'email ?",
				})),
				(e[7] = j))
			: (j = e[7]);
		let S;
		return (
			e[8] !== t || e[9] !== l
				? ((S = s.jsxs("div", {
						className: "space-y-6 text-center",
						children: [
							u,
							s.jsxs("div", {
								className: "space-y-2",
								children: [
									j,
									s.jsx(v, {
										variant: "outline",
										onClick: () => l(t.getValues()),
										children: "Renvoyer",
									}),
								],
							}),
						],
					})),
					(e[8] = t),
					(e[9] = l),
					(e[10] = S))
				: (S = e[10]),
			S
		);
	}
	let i;
	e[11] !== t || e[12] !== y
		? ((i = t.handleSubmit(y)), (e[11] = t), (e[12] = y), (e[13] = i))
		: (i = e[13]);
	let n;
	e[14] !== t.control
		? ((n = s.jsx(z, { control: t.control, name: "email", render: J })),
			(e[14] = t.control),
			(e[15] = n))
		: (n = e[15]);
	let c;
	e[16] !== t.formState.errors.root
		? ((c =
				t.formState.errors.root &&
				s.jsx("div", {
					className: "text-red-500 text-sm text-center",
					children: t.formState.errors.root.message,
				})),
			(e[16] = t.formState.errors.root),
			(e[17] = c))
		: (c = e[17]);
	const b = t.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le lien";
	let m;
	e[18] !== t.formState.isSubmitting || e[19] !== b
		? ((m = s.jsx(v, {
				type: "submit",
				disabled: t.formState.isSubmitting,
				className: "w-full",
				children: b,
			})),
			(e[18] = t.formState.isSubmitting),
			(e[19] = b),
			(e[20] = m))
		: (m = e[20]);
	let d;
	e[21] !== i || e[22] !== n || e[23] !== c || e[24] !== m
		? ((d = s.jsxs("form", {
				onSubmit: i,
				className: "space-y-6",
				children: [n, c, m],
			})),
			(e[21] = i),
			(e[22] = n),
			(e[23] = c),
			(e[24] = m),
			(e[25] = d))
		: (d = e[25]);
	let p;
	return (
		e[26] !== t || e[27] !== d
			? ((p = s.jsx("div", {
					className: "space-y-6",
					children: s.jsx(M, { ...t, children: d }),
				})),
				(e[26] = t),
				(e[27] = d),
				(e[28] = p))
			: (p = e[28]),
		p
	);
}
function J(e) {
	const { field: r } = e;
	return s.jsxs(V, {
		children: [
			s.jsx(q, { children: "Adresse email" }),
			s.jsx(B, {
				children: s.jsx(D, {
					type: "email",
					placeholder: "votre@email.com",
					...r,
				}),
			}),
			s.jsx($, {}),
		],
	});
}
async function K(e) {
	const { error: r } = await w.forgetPassword({
		email: e.email,
		redirectTo: "/auth/reset-password",
	});
	return { error: r };
}
const ee = () => {
	const r = N.c(3);
	let a;
	r[0] === Symbol.for("react.memo_cache_sentinel")
		? ((a = s.jsx("div", {
				className: "flex flex-col space-y-2 text-center",
				children: s.jsx(v, {
					variant: "link",
					asChild: !0,
					className: "self-center",
					children: s.jsxs(E, {
						to: "/auth/login",
						className: "flex items-center",
						children: [
							s.jsx(H, { className: "mr-2 h-4 w-4" }),
							"Retour à la connexion",
						],
					}),
				}),
			})),
			(r[0] = a))
		: (a = r[0]);
	let o;
	r[1] === Symbol.for("react.memo_cache_sentinel")
		? ((o = s.jsxs(R, {
				className: "space-y-1",
				children: [
					s.jsx(A, {
						className: "text-2xl text-center",
						children: "Mot de passe oublié",
					}),
					s.jsx(I, {
						className: "text-center",
						children:
							"Entrez votre adresse email pour recevoir un lien de réinitialisation",
					}),
				],
			})),
			(r[1] = o))
		: (o = r[1]);
	let t;
	return (
		r[2] === Symbol.for("react.memo_cache_sentinel")
			? ((t = s.jsx("div", {
					className:
						"flex min-h-screen flex-col items-center justify-center bg-muted/50",
					children: s.jsxs("div", {
						className:
							"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]",
						children: [
							a,
							s.jsxs(L, {
								children: [o, s.jsx(P, { children: s.jsx(G, {}) })],
							}),
						],
					}),
				})),
				(r[2] = t))
			: (t = r[2]),
		t
	);
};
export { ee as component };
