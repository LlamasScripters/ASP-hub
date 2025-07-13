import { D as A, L as I } from "./LoginWithGoogleButton-ss4yDFMb.js";
import { L as P } from "./Logo-BEbQ983O.js";
import { A as M } from "./arrow-left-DMyOJown.js";
import { C as D } from "./checkbox-DT5FljqG.js";
import {
	w as C,
	f as F,
	b as L,
	r as N,
	d as S,
	e as T,
	A as _,
	y as b,
	j as e,
	i as g,
	L as h,
	B as j,
	c as u,
	C as v,
	o as w,
	s as x,
	h as y,
} from "./index-kb-Ylywn.js";
import { I as p } from "./input-CdkcPZS3.js";
import {
	u as E,
	a as R,
	b as c,
	e as d,
	F as i,
	s as k,
	c as l,
	d as m,
} from "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./GoogleIcon-D1uQH_Nc.js";
import "./index-DauBq6FI.js";
import "./index-Dqr9Wf5M.js";
import "./index-mnH6Jux_.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
const $ = w({
	firstName: x().min(2, "Le prénom doit contenir au moins 2 caractères"),
	lastName: x().min(2, "Le nom doit contenir au moins 2 caractères"),
	email: x().email("Adresse email invalide"),
	password: x().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
	confirmPassword: x(),
	acceptTerms: b().refine((s) => s === !0, {
		message: "Vous devez accepter les conditions d'utilisation",
	}),
}).refine((s) => s.password === s.confirmPassword, {
	message: "Les mots de passe ne correspondent pas",
	path: ["confirmPassword"],
});
function B() {
	const [s, a] = N.useState(!1),
		o = g(),
		t = E({
			resolver: k($),
			defaultValues: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
				acceptTerms: !1,
			},
		}),
		n = async (r) => {
			a(!0);
			try {
				const { error: f } = await y.signUp.email({
					email: r.email,
					password: r.password,
					name: `${r.firstName} ${r.lastName}`,
					firstName: r.firstName,
					lastName: r.lastName,
					acceptTerms: r.acceptTerms,
				});
				if (!f) {
					o({ to: "/auth/account-created" });
					return;
				}
				f.code && t.setError("root", { message: C(f.code) });
			} catch {
				t.setError("root", { message: "Une erreur inattendue s'est produite" });
			} finally {
				a(!1);
			}
		};
	return e.jsxs("div", {
		className: "space-y-6",
		children: [
			e.jsx(R, {
				...t,
				children: e.jsxs("form", {
					onSubmit: t.handleSubmit(n),
					className: "space-y-2",
					children: [
						e.jsx(i, {
							control: t.control,
							name: "firstName",
							render: ({ field: r }) =>
								e.jsxs(c, {
									children: [
										e.jsx(l, { children: "Prénom" }),
										e.jsx(m, {
											children: e.jsx(p, { placeholder: "Prénom", ...r }),
										}),
										e.jsx(d, {}),
									],
								}),
						}),
						e.jsx(i, {
							control: t.control,
							name: "lastName",
							render: ({ field: r }) =>
								e.jsxs(c, {
									children: [
										e.jsx(l, { children: "Nom" }),
										e.jsx(m, {
											children: e.jsx(p, { placeholder: "Nom", ...r }),
										}),
										e.jsx(d, {}),
									],
								}),
						}),
						e.jsx(i, {
							control: t.control,
							name: "email",
							render: ({ field: r }) =>
								e.jsxs(c, {
									children: [
										e.jsx(l, { children: "Email" }),
										e.jsx(m, {
											children: e.jsx(p, {
												type: "email",
												placeholder: "Adresse email",
												...r,
											}),
										}),
										e.jsx(d, {}),
									],
								}),
						}),
						e.jsx(i, {
							control: t.control,
							name: "password",
							render: ({ field: r }) =>
								e.jsxs(c, {
									children: [
										e.jsx(l, { children: "Mot de passe" }),
										e.jsx(m, {
											children: e.jsx(p, {
												type: "password",
												placeholder: "Mot de passe",
												...r,
											}),
										}),
										e.jsx(d, {}),
									],
								}),
						}),
						e.jsx(i, {
							control: t.control,
							name: "confirmPassword",
							render: ({ field: r }) =>
								e.jsxs(c, {
									children: [
										e.jsx(l, { children: "Confirmer le mot de passe" }),
										e.jsx(m, {
											children: e.jsx(p, {
												type: "password",
												placeholder: "Confirmer le mot de passe",
												...r,
											}),
										}),
										e.jsx(d, {}),
									],
								}),
						}),
						e.jsx(i, {
							control: t.control,
							name: "acceptTerms",
							render: ({ field: r }) =>
								e.jsxs(c, {
									children: [
										e.jsxs("div", {
											className:
												"flex flex-row items-start space-x-3 space-y-0",
											children: [
												e.jsx(m, {
													children: e.jsx(D, {
														checked: r.value,
														onCheckedChange: r.onChange,
														id: "acceptTerms",
													}),
												}),
												e.jsx("div", {
													className: "space-y-1 leading-none",
													children: e.jsx(l, {
														children: "J'accepte les conditions d'utilisation",
													}),
												}),
											],
										}),
										e.jsx(d, {}),
									],
								}),
						}),
						t.formState.errors.root &&
							e.jsx("div", {
								className: "text-sm font-medium text-destructive",
								children: t.formState.errors.root.message,
							}),
						e.jsx(j, {
							type: "submit",
							className: "w-full",
							disabled: s,
							children: s ? "Création du compte..." : "Créer un compte",
						}),
					],
				}),
			}),
			e.jsx(A, {
				children: e.jsx("span", {
					className: "bg-card px-2 text-muted-foreground",
					children: "Ou continuer avec",
				}),
			}),
			e.jsx(I, {}),
		],
	});
}
function z() {
	const s = u.c(4);
	let a;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((a = e.jsx(j, {
				variant: "link",
				asChild: !0,
				children: e.jsxs(h, {
					to: "/",
					className: "flex items-center mb-8",
					children: [
						e.jsx(M, { className: "w-4 h-4 mr-2" }),
						"Retour à l'accueil",
					],
				}),
			})),
			(s[0] = a))
		: (a = s[0]);
	let o;
	s[1] === Symbol.for("react.memo_cache_sentinel")
		? ((o = e.jsxs(v, {
				className: "space-y-1 text-center",
				children: [
					e.jsx("div", {
						className: "flex justify-center mb-2",
						children: e.jsx(P, {}),
					}),
					e.jsx(L, {
						className: "text-2xl font-bold",
						children: "Créer un compte",
					}),
					e.jsx(S, { children: "Inscrivez-vous pour rejoindre l'association" }),
				],
			})),
			(s[1] = o))
		: (o = s[1]);
	let t;
	s[2] === Symbol.for("react.memo_cache_sentinel")
		? ((t = e.jsx(F, { children: e.jsx(B, {}) })), (s[2] = t))
		: (t = s[2]);
	let n;
	return (
		s[3] === Symbol.for("react.memo_cache_sentinel")
			? ((n = e.jsx("div", {
					className: "flex flex-col min-h-screen",
					children: e.jsxs("div", {
						className:
							"container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6",
						children: [
							a,
							e.jsxs(T, {
								className: "w-full max-w-md",
								children: [
									o,
									t,
									e.jsx(_, {
										className: "flex justify-center",
										children: e.jsxs("div", {
											className: "text-sm text-center text-muted-foreground",
											children: [
												"Déjà inscrit?",
												" ",
												e.jsx(j, {
													variant: "link",
													asChild: !0,
													className: "p-0",
													children: e.jsx(h, {
														to: "/auth/login",
														children: "Se connecter",
													}),
												}),
											],
										}),
									}),
								],
							}),
						],
					}),
				})),
				(s[3] = n))
			: (n = s[3]),
		n
	);
}
const re = () => {
	const a = u.c(1);
	let o;
	return (
		a[0] === Symbol.for("react.memo_cache_sentinel")
			? ((o = e.jsx(z, {})), (a[0] = o))
			: (o = a[0]),
		o
	);
};
export { re as component };
