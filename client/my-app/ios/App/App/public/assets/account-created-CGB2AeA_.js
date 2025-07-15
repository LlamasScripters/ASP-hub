import { A as j, a as v } from "./alert-DcqybFAu.js";
import { C as b } from "./circle-check-big-DWIiKDvL.js";
import {
	C as d,
	j as e,
	e as f,
	d as h,
	c as m,
	B as o,
	L as p,
	f as u,
	b as x,
} from "./index-kb-Ylywn.js";
import { M as N } from "./mail--zklVbGT.js";
const S = () => {
	const s = m.c(7);
	let t;
	s[0] === Symbol.for("react.memo_cache_sentinel")
		? ((t = e.jsxs(d, {
				className: "text-center pb-4",
				children: [
					e.jsx("div", {
						className:
							"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4",
						children: e.jsx(b, { className: "w-8 h-8 text-green-600" }),
					}),
					e.jsx(x, {
						className: "text-2xl font-bold",
						children: "Compte créé avec succès !",
					}),
				],
			})),
			(s[0] = t))
		: (t = s[0]);
	let i;
	s[1] === Symbol.for("react.memo_cache_sentinel")
		? ((i = e.jsxs("div", {
				className: "text-center",
				children: [
					e.jsx("div", {
						className:
							"mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4",
						children: e.jsx(N, { className: "w-6 h-6 text-blue-600" }),
					}),
					e.jsx(h, {
						className: "text-center leading-relaxed",
						children:
							"Nous avons envoyé un email de vérification dans votre boîte de réception. Veuillez vérifier votre email et cliquer sur le lien de vérification pour activer votre compte.",
					}),
				],
			})),
			(s[1] = i))
		: (i = s[1]);
	let l;
	s[2] === Symbol.for("react.memo_cache_sentinel")
		? ((l = e.jsx("h3", {
				className: "font-semibold text-foreground mb-2",
				children: "Prochaines étapes :",
			})),
			(s[2] = l))
		: (l = s[2]);
	let r;
	s[3] === Symbol.for("react.memo_cache_sentinel")
		? ((r = e.jsx(j, {
				children: e.jsx(v, {
					children: e.jsxs("div", {
						children: [
							l,
							e.jsxs("ol", {
								className: "text-sm space-y-1 list-decimal list-inside",
								children: [
									e.jsx("li", {
										children: "Vérifiez votre boîte de réception",
									}),
									e.jsx("li", {
										children: "Cherchez notre email de vérification",
									}),
									e.jsx("li", {
										children: "Cliquez sur le lien de vérification",
									}),
									e.jsx("li", {
										children: "Commencez à utiliser votre compte !",
									}),
								],
							}),
						],
					}),
				}),
			})),
			(s[3] = r))
		: (r = s[3]);
	let a, c;
	s[4] === Symbol.for("react.memo_cache_sentinel")
		? ((a = e.jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Vous n'avez pas reçu l'email ?",
			})),
			(c = e.jsx(o, {
				variant: "link",
				className: "text-sm h-auto p-0",
				children: "Renvoyer l'email de vérification",
			})),
			(s[4] = a),
			(s[5] = c))
		: ((a = s[4]), (c = s[5]));
	let n;
	return (
		s[6] === Symbol.for("react.memo_cache_sentinel")
			? ((n = e.jsx("div", {
					className: "flex min-h-screen bg-gray-50 dark:bg-gray-900",
					children: e.jsx("div", {
						className:
							"container flex flex-col items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6",
						children: e.jsxs(f, {
							className: "w-full max-w-md",
							children: [
								t,
								e.jsxs(u, {
									className: "space-y-6",
									children: [
										i,
										r,
										e.jsxs("div", {
											className: "text-center space-y-2",
											children: [
												a,
												c,
												e.jsxs("p", {
													className: "text-sm text-muted-foreground",
													children: [
														"Vérifiez votre dossier spam ou",
														" ",
														e.jsx(o, {
															variant: "link",
															asChild: !0,
															className: "text-sm h-auto p-0",
															children: e.jsx(p, {
																to: "/support",
																children: "contactez le support",
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
					}),
				})),
				(s[6] = n))
			: (n = s[6]),
		n
	);
};
export { S as component };
