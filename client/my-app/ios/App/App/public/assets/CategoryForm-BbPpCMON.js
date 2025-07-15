import { a as F, A as T } from "./alert-DcqybFAu.js";
import { A as ae } from "./arrow-left-DMyOJown.js";
import { C as I } from "./calendar-De7tcxsN.js";
import { C as Z } from "./circle-alert-CvO-74L-.js";
import {
	f as $,
	e as A,
	o as G,
	i as K,
	p as L,
	C as Q,
	s as S,
	b as W,
	d as X,
	t as b,
	j as e,
	r as x,
	B as z,
} from "./index-kb-Ylywn.js";
import { I as C } from "./input-CdkcPZS3.js";
import { L as j } from "./label-B9JbzJbC.js";
import { L as R } from "./loader-circle-Bxgg9gFD.js";
import { S as se } from "./save-TX27fQkL.js";
import { S as D } from "./separator-DDNy3jpa.js";
import { T as Y } from "./textarea-CTVCAbGX.js";
import { T as ee } from "./triangle-alert-CLALGpH0.js";
const re = G({
	name: S().min(1, "Le nom est obligatoire"),
	description: S().optional(),
	ageMin: L().int().nonnegative().optional(),
	ageMax: L().int().nonnegative().optional(),
})
	.refine(
		(a) =>
			!(
				(a.ageMin !== void 0) != (a.ageMax !== void 0) ||
				(a.ageMin !== void 0 &&
					a.ageMax !== void 0 &&
					(a.ageMin > a.ageMax || a.ageMin === a.ageMax))
			),
		{
			message:
				"Si vous définissez une limite d'âge, vous devez remplir à la fois l'âge minimum et maximum",
			path: ["ageRange"],
		},
	)
	.refine(
		(a) =>
			a.ageMin !== void 0 && a.ageMax !== void 0 ? a.ageMin <= a.ageMax : !0,
		{
			message: "L'âge minimum doit être inférieur à l'âge maximum",
			path: ["ageMax"],
		},
	)
	.refine(
		(a) =>
			a.ageMin !== void 0 && a.ageMax !== void 0 ? a.ageMin !== a.ageMax : !0,
		{
			message: "L'âge minimum et maximum ne peuvent pas être identiques",
			path: ["ageMax"],
		},
	);
function fe({ mode: a, clubId: c, sectionId: l, categoryId: p }) {
	const y = K(),
		[r, h] = x.useState({}),
		[t, g] = x.useState({}),
		[N, m] = x.useState(!1),
		[U, q] = x.useState([]),
		[M, E] = x.useState(!0);
	x.useEffect(() => {
		(async () => {
			try {
				E(!0);
				const i = await fetch(`/api/clubs/${c}/sections/${l}/categories`);
				if (!i.ok) throw new Error("Erreur lors du chargement des catégories");
				const n = await i.json();
				q(n);
			} catch (i) {
				console.error("Erreur lors du chargement des catégories:", i),
					b.error("Erreur lors du chargement des catégories existantes");
			} finally {
				E(!1);
			}
		})();
	}, [c, l]),
		x.useEffect(() => {
			a === "edit" &&
				p &&
				!M &&
				(m(!0),
				fetch(`/api/clubs/${c}/sections/${l}/categories/${p}`)
					.then((s) => s.json())
					.then(h)
					.finally(() => m(!1)));
		}, [a, p, c, l, M]);
	const w = (s) => {
			if (!s.trim()) return null;
			const i = s.trim().toLowerCase();
			return U.find((u) => u.name.trim().toLowerCase() === i && u.id !== p)
				? "Une catégorie avec ce nom existe déjà dans cette section"
				: null;
		},
		d = ((s, i) => {
			if ((s !== void 0) != (i !== void 0))
				return "Si vous définissez une limite d'âge, vous devez remplir à la fois l'âge minimum et maximum";
			if (s !== void 0 && i !== void 0) {
				if (s > i)
					return "L'âge minimum ne peut pas être supérieur à l'âge maximum";
				if (s === i)
					return "L'âge minimum et maximum ne peuvent pas être identiques";
			}
			return null;
		})(r.ageMin, r.ageMax),
		v = w(r.name || ""),
		O = r.ageMin !== void 0 && r.ageMax !== void 0 && !d,
		_ = (r.ageMin !== void 0) != (r.ageMax !== void 0),
		k = (s) => {
			const i = s ? Number(s) : void 0;
			h((n) => ({ ...n, ageMin: i }));
		},
		P = (s) => {
			const i = s ? Number(s) : void 0;
			h((n) => ({ ...n, ageMax: i }));
		},
		B = (s) => {
			h((i) => ({ ...i, name: s })),
				t.name === "Une catégorie avec ce nom existe déjà dans cette section" &&
					g((i) => {
						const { name: n, ...u } = i;
						return u;
					});
		},
		J = async (s) => {
			var u;
			s.preventDefault(), g({}), m(!0);
			const i = w(r.name || "");
			if (i) {
				g({ name: i }), m(!1);
				return;
			}
			if (d) {
				g({ ageRange: d }), m(!1);
				return;
			}
			const n = re.safeParse({
				...r,
				ageMin: r.ageMin ? Number(r.ageMin) : void 0,
				ageMax: r.ageMax ? Number(r.ageMax) : void 0,
			});
			if (!n.success) {
				const o = {};
				for (const f of n.error.errors) {
					const H = f.path[0];
					o[H] = f.message;
				}
				g(o), m(!1);
				return;
			}
			try {
				let o;
				if (
					(a === "create"
						? (o = await fetch(`/api/clubs/${c}/sections/${l}/categories`, {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify(n.data),
							}))
						: (o = await fetch(
								`/api/clubs/${c}/sections/${l}/categories/${p}`,
								{
									method: "PUT",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify(n.data),
								},
							)),
					!o.ok)
				) {
					const f = await o.json().catch(() => ({}));
					if (
						o.status === 409 ||
						((u = f.message) != null && u.includes("existe déjà"))
					) {
						g({
							name: "Une catégorie avec ce nom existe déjà dans cette section",
						}),
							m(!1);
						return;
					}
					throw new Error(f.message || "Erreur lors de la sauvegarde");
				}
				b.success(
					a === "create"
						? "Catégorie créée avec succès !"
						: "Catégorie modifiée avec succès !",
				),
					y({
						to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
						params: { clubId: c, sectionId: l },
					});
			} catch (o) {
				console.error("Erreur:", o),
					b.error("Erreur lors de la sauvegarde de la catégorie"),
					g({ general: "Une erreur est survenue lors de la sauvegarde" });
			} finally {
				m(!1);
			}
		},
		V = () => {
			y({
				to: "/admin/dashboard/clubs/$clubId/sections/$sectionId/categories",
				params: { clubId: c, sectionId: l },
			});
		};
	return M
		? e.jsx("div", {
				className: "container mx-auto p-6 max-w-2xl",
				children: e.jsx(A, {
					children: e.jsx($, {
						className: "pt-6",
						children: e.jsxs("div", {
							className: "flex items-center justify-center space-x-2",
							children: [
								e.jsx(R, { className: "h-6 w-6 animate-spin" }),
								e.jsx("span", { children: "Chargement des données..." }),
							],
						}),
					}),
				}),
			})
		: e.jsx("div", {
				className: "container mx-auto p-6 max-w-2xl",
				children: e.jsxs("div", {
					className: "space-y-6",
					children: [
						t.general &&
							e.jsxs(T, {
								variant: "destructive",
								children: [
									e.jsx(Z, { className: "h-4 w-4" }),
									e.jsx(F, { children: t.general }),
								],
							}),
						e.jsxs(A, {
							children: [
								e.jsxs(Q, {
									children: [
										e.jsxs(W, {
											className: "flex items-center gap-2",
											children: [
												"Formulaire d",
												"",
												a === "create" ? "e création" : "'édition",
												" d'une catégorie",
											],
										}),
										e.jsx(X, {
											children:
												a === "edit"
													? e.jsx("p", {
															className: "text-sm text-muted-foreground",
															children:
																"Modifiez les informations de cette catégorie pour mettre à jour ses paramètres.",
														})
													: e.jsxs("p", {
															className: "text-sm text-muted-foreground",
															children: [
																"Remplissez les informations ci-dessous pour créer une nouvelle catégorie dans cette section. Les champs marqués d'un",
																" ",
																e.jsx("span", {
																	className: "text-destructive font-medium",
																	children: "*",
																}),
																" sont obligatoires.",
															],
														}),
										}),
									],
								}),
								e.jsx($, {
									children: e.jsxs("form", {
										onSubmit: J,
										className: "space-y-6",
										children: [
											e.jsxs("div", {
												className: "space-y-4",
												children: [
													e.jsxs("div", {
														className: "space-y-2",
														children: [
															e.jsxs(j, {
																htmlFor: "name",
																className: "text-sm font-medium",
																children: [
																	"Nom de la catégorie",
																	" ",
																	e.jsx("span", {
																		className: "text-destructive",
																		children: "*",
																	}),
																],
															}),
															e.jsx(C, {
																id: "name",
																placeholder: "Ex: U15, Seniors, Débutants...",
																value: r.name ?? "",
																onChange: (s) => B(s.target.value),
																className:
																	t.name || v ? "border-destructive" : "",
															}),
															(t.name || v) &&
																e.jsx("p", {
																	className: "text-sm text-destructive",
																	children: t.name || v,
																}),
														],
													}),
													e.jsxs("div", {
														className: "space-y-2",
														children: [
															e.jsx(j, {
																htmlFor: "description",
																className: "text-sm font-medium",
																children: "Description",
															}),
															e.jsx(Y, {
																id: "description",
																placeholder:
																	"Description optionnelle de la catégorie...",
																value: r.description ?? "",
																onChange: (s) =>
																	h({ ...r, description: s.target.value }),
																rows: 3,
																className: "resize-none",
															}),
															e.jsx("p", {
																className: "text-xs text-muted-foreground",
																children:
																	"Ajoutez des détails sur cette catégorie (objectifs, niveau requis, etc.)",
															}),
														],
													}),
												],
											}),
											e.jsx(D, {}),
											e.jsxs("div", {
												className: "space-y-4",
												children: [
													e.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															e.jsx(I, { className: "h-4 w-4" }),
															e.jsx("h3", {
																className: "text-lg font-semibold",
																children: "Tranche d'âge",
															}),
														],
													}),
													e.jsx("p", {
														className: "text-sm text-muted-foreground",
														children:
															"Définissez les limites d'âge pour cette catégorie",
													}),
													e.jsxs("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-4",
														children: [
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsx(j, {
																		htmlFor: "ageMin",
																		className: "text-sm font-medium",
																		children: "Âge minimum",
																	}),
																	e.jsx(C, {
																		id: "ageMin",
																		type: "number",
																		placeholder: "Ex: 12",
																		min: "0",
																		max: "100",
																		value: r.ageMin ?? "",
																		onChange: (s) => k(s.target.value),
																		className:
																			t.ageMin || d ? "border-destructive" : "",
																	}),
																	t.ageMin &&
																		e.jsx("p", {
																			className: "text-sm text-destructive",
																			children: t.ageMin,
																		}),
																],
															}),
															e.jsxs("div", {
																className: "space-y-2",
																children: [
																	e.jsx(j, {
																		htmlFor: "ageMax",
																		className: "text-sm font-medium",
																		children: "Âge maximum",
																	}),
																	e.jsx(C, {
																		id: "ageMax",
																		type: "number",
																		placeholder: "Ex: 18",
																		min: "0",
																		max: "100",
																		value: r.ageMax ?? "",
																		onChange: (s) => P(s.target.value),
																		className:
																			t.ageMax || d ? "border-destructive" : "",
																	}),
																	t.ageMax &&
																		e.jsx("p", {
																			className: "text-sm text-destructive",
																			children: t.ageMax,
																		}),
																],
															}),
														],
													}),
													d &&
														e.jsxs(T, {
															variant: "destructive",
															children: [
																e.jsx(ee, { className: "h-4 w-4" }),
																e.jsx(F, { children: d }),
															],
														}),
													O &&
														e.jsx("div", {
															className:
																"p-3 bg-green-50 border border-green-200 rounded-lg",
															children: e.jsxs("p", {
																className: "text-sm text-green-700",
																children: [
																	"✅ Cette catégorie acceptera les participants âgés de",
																	" ",
																	e.jsxs("span", {
																		className: "font-semibold",
																		children: [
																			r.ageMin,
																			" à ",
																			r.ageMax,
																			" ans",
																		],
																	}),
																	r.ageMin !== void 0 &&
																		r.ageMax !== void 0 &&
																		e.jsxs(e.Fragment, {
																			children: [
																				" ",
																				"(",
																				r.ageMax - r.ageMin + 1,
																				" années couvertes)",
																			],
																		}),
																],
															}),
														}),
													_ &&
														e.jsx("div", {
															className:
																"p-3 bg-orange-50 border border-orange-200 rounded-lg",
															children: e.jsxs("p", {
																className: "text-sm text-orange-700",
																children: [
																	"⚠️ ",
																	e.jsx("strong", { children: "Attention :" }),
																	" Vous devez remplir à la fois l'âge minimum et maximum pour définir une limite d'âge, ou laisser les deux champs vides pour une catégorie sans restriction.",
																],
															}),
														}),
													!r.ageMin &&
														!r.ageMax &&
														e.jsx("div", {
															className:
																"p-3 bg-blue-50 border border-blue-200 rounded-lg",
															children: e.jsxs("p", {
																className: "text-sm text-blue-700",
																children: [
																	"💡 ",
																	e.jsx("strong", {
																		children: "Options disponibles :",
																	}),
																	e.jsx("br", {}),
																	"• Laissez vide pour une catégorie",
																	" ",
																	e.jsx("strong", {
																		children: "sans restriction d'âge",
																	}),
																	e.jsx("br", {}),
																	"• Ou remplissez ",
																	e.jsx("strong", {
																		children: "les deux champs",
																	}),
																	" ",
																	"pour définir une tranche d'âge spécifique",
																],
															}),
														}),
												],
											}),
											e.jsx(D, {}),
											e.jsxs("div", {
												className: "flex flex-col sm:flex-row gap-3 pt-6",
												children: [
													e.jsx(z, {
														type: "submit",
														disabled: N || !!d || !!v,
														className:
															"flex items-center gap-2 flex-1 sm:flex-none hover:cursor-pointer hover:opacity-90 transition-opacity",
														children: N
															? e.jsxs(e.Fragment, {
																	children: [
																		e.jsx(R, {
																			className: "h-4 w-4 animate-spin",
																		}),
																		a === "create"
																			? "Création..."
																			: "Modification...",
																	],
																})
															: e.jsxs(e.Fragment, {
																	children: [
																		e.jsx(se, { className: "h-4 w-4" }),
																		a === "create"
																			? "Créer la catégorie"
																			: "Sauvegarder",
																	],
																}),
													}),
													e.jsxs(z, {
														type: "button",
														variant: "outline",
														onClick: V,
														disabled: N,
														className:
															"flex items-center gap-2 hover:cursor-pointer hover:opacity-90 transition-opacity",
														children: [
															e.jsx(ae, { className: "h-4 w-4" }),
															"Annuler",
														],
													}),
												],
											}),
										],
									}),
								}),
							],
						}),
					],
				}),
			});
}
export { fe as C };
