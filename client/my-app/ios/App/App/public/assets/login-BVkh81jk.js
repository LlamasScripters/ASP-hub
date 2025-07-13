import { L as A, D as _ } from "./LoginWithGoogleButton-ss4yDFMb.js";
import { L as F } from "./Logo-BEbQ983O.js";
import { A as P } from "./arrow-left-DMyOJown.js";
import {
	e as C,
	f as L,
	C as N,
	b as S,
	i as b,
	B as c,
	s as d,
	j as e,
	c as g,
	L as l,
	h as m,
	w as v,
	d as w,
	o as y,
} from "./index-kb-Ylywn.js";
import { I as j } from "./input-CdkcPZS3.js";
import { u as I } from "./useLocation-Boh3DZN6.js";
import {
	u as E,
	s as M,
	e as f,
	b as h,
	a as k,
	d as p,
	c as u,
	F as x,
} from "./zod-B5AhSGj5.js";
import "./GoogleIcon-D1uQH_Nc.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
const R = y({
	email: d().email("Adresse email invalide"),
	password: d().min(1, "Le mot de passe est requis"),
});
function B() {
	const s = b(),
		o = I(),
		{ isPending: t } = m.useSession(),
		r = E({ resolver: M(R), defaultValues: { email: "", password: "" } }),
		a = async (n) => {
			try {
				const { error: i } = await m.signIn.email(
					{ email: n.email, password: n.password },
					{
						onSuccess: () => {
							s({ to: o.search.redirect ?? "/dashboard" });
						},
					},
				);
				i != null && i.code && r.setError("root", { message: v(i.code) });
			} catch {
				r.setError("root", { message: "Une erreur inattendue s'est produite" });
			}
		};
	return e.jsxs("div", {
		className: "space-y-6",
		children: [
			e.jsx(k, {
				...r,
				children: e.jsxs("form", {
					onSubmit: r.handleSubmit(a),
					className: "space-y-4",
					children: [
						e.jsxs("div", {
							className: "space-y-2",
							children: [
								e.jsx(x, {
									control: r.control,
									name: "email",
									render: ({ field: n }) =>
										e.jsxs(h, {
											children: [
												e.jsx(u, { children: "Adresse email" }),
												e.jsx(p, {
													children: e.jsx(j, {
														type: "email",
														placeholder: "Adresse email",
														...n,
													}),
												}),
												e.jsx(f, {}),
											],
										}),
								}),
								e.jsx(x, {
									control: r.control,
									name: "password",
									render: ({ field: n }) =>
										e.jsxs(h, {
											children: [
												e.jsxs("div", {
													className: "flex items-center justify-between",
													children: [
														e.jsx(u, { children: "Mot de passe" }),
														e.jsx(c, {
															variant: "link",
															asChild: !0,
															className: "pr-0 text-xs",
															children: e.jsx(l, {
																to: "/auth/forgot-password",
																children: "Mot de passe oublié ?",
															}),
														}),
													],
												}),
												e.jsx(p, {
													children: e.jsx(j, {
														type: "password",
														placeholder: "Mot de passe",
														...n,
													}),
												}),
												e.jsx(f, {}),
											],
										}),
								}),
								r.formState.errors.root &&
									e.jsx("div", {
										className: "text-destructive text-sm text-center",
										children: r.formState.errors.root.message,
									}),
							],
						}),
						e.jsx(c, {
							type: "submit",
							disabled: t,
							className: "w-full",
							children: t ? "Connexion en cours..." : "Se connecter",
						}),
					],
				}),
			}),
			e.jsx(_, {
				children: e.jsx("span", {
					className: "bg-card px-2 text-muted-foreground",
					children: "Ou continuer avec",
				}),
			}),
			e.jsx(A, {}),
		],
	});
}
function D() {
	const s = g.c(4);
	let o;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((o = e.jsx(c, {
				variant: "link",
				asChild: !0,
				children: e.jsxs(l, {
					to: "/",
					className: "flex items-center mb-8",
					children: [
						e.jsx(P, { className: "w-4 h-4 mr-2" }),
						"Retour à l'accueil",
					],
				}),
			})),
			(s[0] = o))
		: (o = s[0]);
	let t;
	s[1] === Symbol.for("react.memo_cache_sentinel")
		? ((t = e.jsxs(N, {
				className: "space-y-1 text-center",
				children: [
					e.jsx("div", {
						className: "flex justify-center mb-2",
						children: e.jsx(F, {}),
					}),
					e.jsx(S, { className: "text-2xl font-bold", children: "Connexion" }),
					e.jsx(w, {
						children: "Entrez vos identifiants pour accéder à votre compte",
					}),
				],
			})),
			(s[1] = t))
		: (t = s[1]);
	let r;
	s[2] === Symbol.for("react.memo_cache_sentinel")
		? ((r = e.jsx(B, {})), (s[2] = r))
		: (r = s[2]);
	let a;
	return (
		s[3] === Symbol.for("react.memo_cache_sentinel")
			? ((a = e.jsx("div", {
					className: "flex flex-col min-h-screen",
					children: e.jsxs("div", {
						className:
							"container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6",
						children: [
							o,
							e.jsxs(C, {
								className: "w-full max-w-md",
								children: [
									t,
									e.jsxs(L, {
										children: [
											r,
											e.jsxs("div", {
												className:
													"mt-4 text-sm text-center text-muted-foreground",
												children: [
													"Pas encore de compte?",
													" ",
													e.jsx(c, {
														variant: "link",
														asChild: !0,
														className: "p-0",
														children: e.jsx(l, {
															to: "/auth/register",
															children: "S'inscrire",
														}),
													}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
				})),
				(s[3] = a))
			: (a = s[3]),
		a
	);
}
const J = () => {
	const o = g.c(1);
	let t;
	return (
		o[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = e.jsx(D, {})), (o[0] = t))
			: (t = o[0]),
		t
	);
};
export { J as component };
