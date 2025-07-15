import { a as D, A as T } from "./alert-DcqybFAu.js";
import { A as z } from "./arrow-left-DMyOJown.js";
import { B as Q } from "./building-2-C_wvjtu2.js";
import { C as W } from "./circle-alert-CvO-74L-.js";
import { C as K } from "./circle-check-big-DWIiKDvL.js";
import { F as X } from "./file-text-Dzq0McNO.js";
import {
	b as A,
	d as F,
	i as G,
	b4 as L,
	L as O,
	C as S,
	o as V,
	t as b,
	j as e,
	r as f,
	s as i,
	a as q,
	e as v,
	f as w,
	B as y,
} from "./index-kb-Ylywn.js";
import { I as g } from "./input-CdkcPZS3.js";
import { L as M } from "./loader-circle-Bxgg9gFD.js";
import { M as Z } from "./mail--zklVbGT.js";
import { M as Y } from "./map-pin-DywQhs4x.js";
import { P as ee, G as se } from "./phone-BY2bep43.js";
import { S as re } from "./save-TX27fQkL.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import { T as E } from "./textarea-CTVCAbGX.js";
import {
	u as H,
	s as J,
	a as _,
	b as c,
	d,
	F as l,
	f as m,
	c as o,
	e as x,
} from "./zod-B5AhSGj5.js";
const te = [
		[
			"rect",
			{
				width: "18",
				height: "14",
				x: "3",
				y: "5",
				rx: "2",
				ry: "2",
				key: "12ruh7",
			},
		],
		["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4", key: "1ueiar" }],
	],
	ae = q("captions", te),
	ne = V({
		name: i()
			.min(1, "Le nom du club est requis")
			.max(255, "Le nom ne peut pas dépasser 255 caractères"),
		description: i().optional(),
		address: i().optional(),
		email: i().email("Adresse email invalide").optional().or(L("")),
		phone: i()
			.optional()
			.refine((r) => !r || /^0[0-9]{9}$/.test(r), {
				message:
					"Veuillez mettre un numéro de téléphone valide (10 chiffres commençant par 0)",
			}),
		website: i().url("L'URL du site web est invalide").optional().or(L("")),
	});
function ve({ mode: r, clubId: h }) {
	const N = G(),
		[p, u] = f.useState(!1),
		[P, C] = f.useState(!1),
		[t, R] = f.useState(null),
		a = H({
			resolver: J(ne),
			defaultValues: {
				name: "",
				description: "",
				address: "",
				email: "",
				phone: "",
				website: "",
			},
		});
	f.useEffect(() => {
		r === "edit" &&
			h &&
			(u(!0),
			fetch(`/api/clubs/${h}`)
				.then((s) => {
					if (!s.ok) throw new Error("Erreur lors du chargement du club");
					return s.json();
				})
				.then((s) => {
					R(s),
						a.reset({
							name: s.name || "",
							description: s.description || "",
							address: s.address || "",
							email: s.email || "",
							phone: s.phone || "",
							website: s.website || "",
						});
				})
				.catch((s) => {
					console.error("Erreur:", s),
						b.error("Erreur lors du chargement du club");
				})
				.finally(() => u(!1)));
	}, [r, h, a]);
	const B = async (s) => {
			u(!0);
			try {
				const n = {
						...s,
						email: s.email || void 0,
						phone: s.phone || void 0,
						website: s.website || void 0,
						description: s.description || void 0,
						address: s.address || void 0,
					},
					j = r === "create" ? "/api/clubs" : `/api/clubs/${h}`;
				if (
					!(
						await fetch(j, {
							method: r === "create" ? "POST" : "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(n),
						})
					).ok
				)
					throw new Error("Erreur lors de la sauvegarde");
				r === "edit"
					? (C(!0),
						setTimeout(() => {
							C(!1);
						}, 3e3),
						setTimeout(() => {
							N({ to: "..", replace: !0 });
						}, 1500))
					: (b.success("Club créé avec succès !"),
						N({ to: "..", replace: !0 }));
			} catch (n) {
				console.error("Erreur:", n),
					b.error("Une erreur est survenue lors de la sauvegarde");
			} finally {
				u(!1);
			}
		},
		I = () => {
			N({ to: "..", replace: !0 });
		},
		U = (s) =>
			new Date(s).toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
	return p && r === "edit"
		? e.jsx("div", {
				className: "space-y-6",
				children: e.jsx(v, {
					children: e.jsx(w, {
						className: "pt-6",
						children: e.jsxs("div", {
							className: "flex items-center justify-center space-x-2",
							children: [
								e.jsx(M, { className: "h-6 w-6 animate-spin" }),
								e.jsx("span", { children: "Chargement du club..." }),
							],
						}),
					}),
				}),
			})
		: e.jsxs("div", {
				className: "space-y-6",
				children: [
					e.jsxs("div", {
						className:
							"flex flex-col justify-between gap-4 md:flex-row md:items-center",
						children: [
							e.jsxs("div", {
								children: [
									e.jsx("h1", {
										className: "text-3xl font-bold tracking-tight",
										children:
											r === "create" ? "Créer un club" : "Modifier le club",
									}),
									e.jsx("p", {
										className: "text-muted-foreground",
										children:
											r === "create"
												? "Remplissez les informations ci-dessous pour créer votre club"
												: `Modifiez les informations du club "${(t == null ? void 0 : t.name) || ""}"`,
									}),
								],
							}),
							e.jsx("div", {
								className: "flex items-center gap-2",
								children: e.jsx(y, {
									variant: "outline",
									size: "sm",
									asChild: !0,
									children: e.jsxs(O, {
										to: "..",
										children: [
											e.jsx(z, { className: "w-4 h-4 mr-2" }),
											"Retour",
										],
									}),
								}),
							}),
						],
					}),
					P &&
						e.jsxs(T, {
							className: "border-green-200 bg-green-50",
							children: [
								e.jsx(K, { className: "h-4 w-4 text-green-600" }),
								e.jsx(D, {
									className: "text-green-800",
									children:
										"Le club a été modifié avec succès ! Redirection en cours...",
								}),
							],
						}),
					r === "edit" &&
						t &&
						e.jsxs(v, {
							className:
								"bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
							children: [
								e.jsxs(S, {
									children: [
										e.jsxs(A, {
											className:
												"flex items-center gap-2 text-green-900 dark:text-green-100",
											children: [
												e.jsx(Q, { className: "w-5 h-5" }),
												"Informations actuelles",
											],
										}),
										e.jsx(F, {
											className: "text-green-700 dark:text-green-300",
											children:
												"Voici les informations actuellement enregistrées pour ce club",
										}),
									],
								}),
								e.jsxs(w, {
									className: "space-y-3",
									children: [
										e.jsxs("div", {
											className:
												"grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
											children: [
												e.jsxs("div", {
													children: [
														e.jsx("span", {
															className:
																"font-medium text-green-900 dark:text-green-100",
															children: "Nom :",
														}),
														e.jsx("span", {
															className:
																"ml-2 text-green-800 dark:text-green-200",
															children: t.name,
														}),
													],
												}),
												t.email &&
													e.jsxs("div", {
														children: [
															e.jsx("span", {
																className:
																	"font-medium text-green-900 dark:text-green-100",
																children: "Email :",
															}),
															e.jsx("span", {
																className:
																	"ml-2 text-green-800 dark:text-green-200",
																children: t.email,
															}),
														],
													}),
												t.phone &&
													e.jsxs("div", {
														children: [
															e.jsx("span", {
																className:
																	"font-medium text-green-900 dark:text-green-100",
																children: "Téléphone :",
															}),
															e.jsx("span", {
																className:
																	"ml-2 text-green-800 dark:text-green-200",
																children: t.phone,
															}),
														],
													}),
												t.website &&
													e.jsxs("div", {
														children: [
															e.jsx("span", {
																className:
																	"font-medium text-green-900 dark:text-green-100",
																children: "Site web :",
															}),
															e.jsx("span", {
																className:
																	"ml-2 text-green-800 dark:text-green-200",
																children: t.website,
															}),
														],
													}),
												t.updatedAt &&
													e.jsxs("div", {
														children: [
															e.jsx("span", {
																className:
																	"font-medium text-green-900 dark:text-green-100",
																children: "Dernière modification :",
															}),
															e.jsx("span", {
																className:
																	"ml-2 text-green-800 dark:text-green-200",
																children: U(t.updatedAt),
															}),
														],
													}),
											],
										}),
										t.description &&
											e.jsxs("div", {
												className: "mt-4",
												children: [
													e.jsx("span", {
														className:
															"font-medium text-green-900 dark:text-green-100",
														children: "Description :",
													}),
													e.jsx("p", {
														className:
															"ml-2 text-green-800 dark:text-green-200 mt-1",
														children: t.description,
													}),
												],
											}),
										t.address &&
											e.jsxs("div", {
												children: [
													e.jsx("span", {
														className:
															"font-medium text-green-900 dark:text-green-100",
														children: "Adresse :",
													}),
													e.jsx("p", {
														className:
															"ml-2 text-green-800 dark:text-green-200 mt-1",
														children: t.address,
													}),
												],
											}),
									],
								}),
							],
						}),
					r === "edit" &&
						e.jsxs(T, {
							children: [
								e.jsx(W, { className: "h-4 w-4" }),
								e.jsxs(D, {
									children: [
										e.jsx("strong", { children: "Important :" }),
										" Les modifications apportées à ce club affecteront toutes les données associées. Assurez-vous que les informations sont correctes avant de sauvegarder.",
									],
								}),
							],
						}),
					e.jsxs(v, {
						className: "shadow-lg border",
						children: [
							e.jsxs(S, {
								className: "space-y-1",
								children: [
									e.jsxs(A, {
										className: "text-2xl flex items-center gap-2",
										children: [
											"Formulaire d",
											"",
											r === "create" ? "e création" : "'édition",
											" de club",
										],
									}),
									e.jsxs(F, {
										children: [
											"Remplissez les informations ci-dessous pour",
											" ",
											r === "create" ? "créer" : "modifier",
											" votre club.",
										],
									}),
								],
							}),
							e.jsx(w, {
								className: "space-y-6",
								children: e.jsx(_, {
									...a,
									children: e.jsxs("form", {
										onSubmit: a.handleSubmit(B),
										className: "space-y-6",
										children: [
											e.jsx(l, {
												control: a.control,
												name: "name",
												render: ({ field: s }) =>
													e.jsxs(c, {
														children: [
															e.jsxs(o, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	e.jsx(ae, { className: "h-4 w-4" }),
																	"Nom du club *",
																],
															}),
															e.jsx(d, {
																children: e.jsx(g, {
																	placeholder:
																		"Ex: Club Sportif Municipal, Association de Football...",
																	className: "h-11",
																	...s,
																}),
															}),
															e.jsx(m, {
																children:
																	"Le nom officiel de votre club ou association sportive.",
															}),
															e.jsx(x, {}),
														],
													}),
											}),
											e.jsx(l, {
												control: a.control,
												name: "description",
												render: ({ field: s }) =>
													e.jsxs(c, {
														children: [
															e.jsxs(o, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	e.jsx(X, { className: "h-4 w-4" }),
																	"Description",
																],
															}),
															e.jsx(d, {
																children: e.jsx(E, {
																	placeholder:
																		"Décrivez votre club, ses activités, ses valeurs...",
																	className: "min-h-[100px] resize-vertical",
																	...s,
																}),
															}),
															e.jsx(m, {
																children:
																	"Une description de votre club, ses activités et ses objectifs.",
															}),
															e.jsx(x, {}),
														],
													}),
											}),
											e.jsx(l, {
												control: a.control,
												name: "address",
												render: ({ field: s }) =>
													e.jsxs(c, {
														children: [
															e.jsxs(o, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	e.jsx(Y, { className: "h-4 w-4" }),
																	"Adresse",
																],
															}),
															e.jsx(d, {
																children: e.jsx(E, {
																	placeholder:
																		"Adresse complète du club ou lieu principal d'activité...",
																	className: "min-h-[80px] resize-vertical",
																	...s,
																}),
															}),
															e.jsx(m, {
																children:
																	"L'adresse physique de votre club ou de votre lieu principal d'activité.",
															}),
															e.jsx(x, {}),
														],
													}),
											}),
											e.jsxs("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-6",
												children: [
													e.jsx(l, {
														control: a.control,
														name: "email",
														render: ({ field: s }) =>
															e.jsxs(c, {
																children: [
																	e.jsxs(o, {
																		className:
																			"text-foreground font-medium flex items-center gap-2",
																		children: [
																			e.jsx(Z, { className: "h-4 w-4" }),
																			"Email",
																		],
																	}),
																	e.jsx(d, {
																		children: e.jsx(g, {
																			type: "email",
																			placeholder: "contact@monclub.fr",
																			className: "h-11",
																			...s,
																		}),
																	}),
																	e.jsx(m, {
																		children:
																			"Adresse email de contact du club.",
																	}),
																	e.jsx(x, {}),
																],
															}),
													}),
													e.jsx(l, {
														control: a.control,
														name: "phone",
														render: ({ field: s }) =>
															e.jsxs(c, {
																children: [
																	e.jsxs(o, {
																		className:
																			"text-foreground font-medium flex items-center gap-2",
																		children: [
																			e.jsx(ee, { className: "h-4 w-4" }),
																			"Téléphone",
																		],
																	}),
																	e.jsx(d, {
																		children: e.jsx(g, {
																			type: "tel",
																			placeholder: "0123456789",
																			className: "h-11",
																			maxLength: 10,
																			...s,
																			onPaste: (n) => {
																				n.preventDefault();
																				const k = n.clipboardData
																					.getData("text")
																					.replace(/\D/g, "")
																					.slice(0, 10);
																				s.onChange(k);
																			},
																			onChange: (n) => {
																				const j = n.target.value.replace(
																					/\D/g,
																					"",
																				);
																				s.onChange(j);
																			},
																		}),
																	}),
																	e.jsx(m, {
																		children:
																			"Numéro de téléphone à 10 chiffres (sans espaces ni tirets).",
																	}),
																	e.jsx(x, {}),
																],
															}),
													}),
												],
											}),
											e.jsx(l, {
												control: a.control,
												name: "website",
												render: ({ field: s }) =>
													e.jsxs(c, {
														children: [
															e.jsxs(o, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	e.jsx(se, { className: "h-4 w-4" }),
																	"Site web",
																],
															}),
															e.jsx(d, {
																children: e.jsx(g, {
																	type: "url",
																	placeholder: "https://www.monclub.fr",
																	className: "h-11",
																	...s,
																}),
															}),
															e.jsx(m, {
																children:
																	"URL du site web officiel de votre club.",
															}),
															e.jsx(x, {}),
														],
													}),
											}),
											e.jsxs("div", {
												className: "flex flex-col sm:flex-row gap-3 pt-6",
												children: [
													e.jsx(y, {
														type: "submit",
														disabled: p,
														className:
															"flex items-center gap-2 flex-1 sm:flex-none hover:bg-primary/90 transition-colors cursor-pointer",
														children: p
															? e.jsxs(e.Fragment, {
																	children: [
																		e.jsx(M, {
																			className: "h-4 w-4 animate-spin",
																		}),
																		r === "create"
																			? "Création..."
																			: "Modification...",
																	],
																})
															: e.jsxs(e.Fragment, {
																	children: [
																		e.jsx(re, { className: "h-4 w-4" }),
																		r === "create"
																			? "Créer le club"
																			: "Sauvegarder",
																	],
																}),
													}),
													e.jsxs(y, {
														type: "button",
														variant: "outline",
														onClick: I,
														disabled: p,
														className:
															"flex items-center gap-2 hover:bg-muted transition-colors cursor-pointer",
														children: [
															e.jsx(z, { className: "h-4 w-4" }),
															"Annuler",
														],
													}),
												],
											}),
										],
									}),
								}),
							}),
						],
					}),
				],
			});
}
export { ve as C };
