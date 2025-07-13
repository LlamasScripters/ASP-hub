import { a as P, A as k } from "./alert-DcqybFAu.js";
import { C as K, A as y } from "./car-DIHhrsj8.js";
import { C as v } from "./checkbox-DT5FljqG.js";
import {
	L as $,
	bF as A,
	C as D,
	M as H,
	bH as I,
	b as L,
	r as M,
	B as N,
	f as O,
	bI as R,
	bG as S,
	e as V,
	j as e,
} from "./index-kb-Ylywn.js";
import { I as U } from "./info-hEQo0LXU.js";
import { I as i } from "./input-CdkcPZS3.js";
import { L as Q } from "./loader-circle-Bxgg9gFD.js";
import { M as q } from "./map-pin-DywQhs4x.js";
import { T as G } from "./timer-l0uyiV2G.js";
import { U as J } from "./users-BMY-28E4.js";
import {
	a as B,
	u as T,
	e as c,
	d,
	b as l,
	c as o,
	F as t,
	f as x,
	s as z,
} from "./zod-B5AhSGj5.js";
function te({ complex: s, onSuccess: h, onCancelLink: p }) {
	const { createComplex: F, updateComplex: w } = H(),
		[g, b] = M.useState(!1),
		m = !!s,
		a = T({
			resolver: z(m ? S : I),
			defaultValues: {
				name: (s == null ? void 0 : s.name) || "",
				description: (s == null ? void 0 : s.description) || "",
				street: (s == null ? void 0 : s.street) || "",
				city: (s == null ? void 0 : s.city) || "",
				postalCode: (s == null ? void 0 : s.postalCode) || "",
				numberOfElevators: (s == null ? void 0 : s.numberOfElevators) || 0,
				accessibleForReducedMobility:
					(s == null ? void 0 : s.accessibleForReducedMobility) || !1,
				parkingCapacity: (s == null ? void 0 : s.parkingCapacity) || 0,
				openingHours: (s == null ? void 0 : s.openingHours) || A,
			},
		}),
		C = a.watch("openingHours"),
		E = async (r) => {
			b(!0);
			try {
				let n = null;
				m && s ? (n = await w(s.id, r)) : (n = await F(r)),
					n && (h == null || h(n), m || a.reset());
			} catch (n) {
				console.error("Form submission error:", n);
			} finally {
				b(!1);
			}
		};
	return e.jsxs(V, {
		className: "w-full max-w-2xl mx-auto",
		children: [
			e.jsx(D, {
				children: e.jsx(L, {
					className: "flex items-center gap-2",
					children: m ? "Formulaire d'édition" : "Formulaire de création",
				}),
			}),
			e.jsx(O, {
				children: e.jsx(B, {
					...a,
					children: e.jsxs("form", {
						onSubmit: a.handleSubmit(E),
						className: "space-y-6",
						children: [
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className:
											"flex items-center gap-2 text-sm font-medium text-muted-foreground",
										children: [
											e.jsx(U, { className: "w-4 h-4" }),
											"Informations générales",
										],
									}),
									e.jsx(t, {
										control: a.control,
										name: "name",
										render: ({ field: r }) =>
											e.jsxs(l, {
												children: [
													e.jsx(o, { children: "Nom du complexe *" }),
													e.jsx(d, {
														children: e.jsx(i, {
															placeholder: "Ex: Complexe Nelson Mandela",
															...r,
														}),
													}),
													e.jsx(x, {
														children: "Le nom officiel du complexe sportif",
													}),
													e.jsx(c, {}),
												],
											}),
									}),
									e.jsx(t, {
										control: a.control,
										name: "description",
										render: ({ field: r }) =>
											e.jsxs(l, {
												children: [
													e.jsx(o, { children: "Description" }),
													e.jsx(d, {
														children: e.jsx(i, {
															placeholder:
																"Ex: Complexe polyvalent avec terrains de sport, salles de réunion, etc.",
															...r,
														}),
													}),
													e.jsx(x, {
														children: "Description détaillée du complexe",
													}),
													e.jsx(c, {}),
												],
											}),
									}),
								],
							}),
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className:
											"flex items-center gap-2 text-sm font-medium text-muted-foreground",
										children: [
											e.jsx(q, { className: "w-4 h-4" }),
											"Localisation",
										],
									}),
									e.jsx(t, {
										control: a.control,
										name: "street",
										render: ({ field: r }) =>
											e.jsxs(l, {
												children: [
													e.jsx(o, { children: "Adresse *" }),
													e.jsx(d, {
														children: e.jsx(i, {
															placeholder: "Ex: 42 Avenue des Sports",
															...r,
														}),
													}),
													e.jsx(x, {
														children: "Adresse complète du complexe",
													}),
													e.jsx(c, {}),
												],
											}),
									}),
									e.jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-4",
										children: [
											e.jsx(t, {
												control: a.control,
												name: "city",
												render: ({ field: r }) =>
													e.jsxs(l, {
														children: [
															e.jsx(o, { children: "Ville *" }),
															e.jsx(d, {
																children: e.jsx(i, {
																	placeholder: "Ex: Pierrefitte-sur-Seine",
																	...r,
																}),
															}),
															e.jsx(c, {}),
														],
													}),
											}),
											e.jsx(t, {
												control: a.control,
												name: "postalCode",
												render: ({ field: r }) =>
													e.jsxs(l, {
														children: [
															e.jsx(o, { children: "Code postal *" }),
															e.jsx(d, {
																children: e.jsx(i, {
																	placeholder: "Ex: 93380",
																	...r,
																}),
															}),
															e.jsx(c, {}),
														],
													}),
											}),
										],
									}),
								],
							}),
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [
											e.jsx(G, { className: "w-4 h-4" }),
											"Horaires d'ouverture",
										],
									}),
									C &&
										Object.entries(R).map(([r, n]) => {
											const j = C[r];
											if (!j) return null;
											const f = !j.closed;
											return e.jsxs(
												"div",
												{
													className:
														"flex items-center justify-between p-3 border rounded-lg",
													children: [
														e.jsx("span", {
															className: "w-20 font-medium",
															children: n,
														}),
														e.jsxs("div", {
															className: "flex items-center gap-2 flex-1 mx-4",
															children: [
																e.jsx(i, {
																	type: "time",
																	disabled: !f,
																	value: j.open || "",
																	onChange: (u) =>
																		a.setValue(
																			`openingHours.${r}.open`,
																			u.target.value,
																		),
																}),
																e.jsx("span", { children: "à" }),
																e.jsx(i, {
																	type: "time",
																	disabled: !f,
																	value: j.close || "",
																	onChange: (u) =>
																		a.setValue(
																			`openingHours.${r}.close`,
																			u.target.value,
																		),
																}),
															],
														}),
														e.jsx(v, {
															checked: f,
															onCheckedChange: (u) => {
																a.setValue(`openingHours.${r}.closed`, !u),
																	u ||
																		(a.setValue(`openingHours.${r}.open`, null),
																		a.setValue(
																			`openingHours.${r}.close`,
																			null,
																		));
															},
														}),
													],
												},
												r,
											);
										}),
									e.jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "Décochez un jour pour le marquer comme fermé.",
									}),
								],
							}),
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className:
											"flex items-center gap-2 text-sm font-medium text-muted-foreground",
										children: [
											e.jsx(J, { className: "w-4 h-4" }),
											"Services et accessibilité",
										],
									}),
									e.jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6",
										children: [
											e.jsx(t, {
												control: a.control,
												name: "numberOfElevators",
												render: ({ field: r }) =>
													e.jsxs(l, {
														children: [
															e.jsx(o, { children: "Nombre d'ascenseurs" }),
															e.jsx(d, {
																children: e.jsxs("div", {
																	className: "relative",
																	children: [
																		e.jsx(y, {
																			className:
																				"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4",
																		}),
																		e.jsx(i, {
																			type: "number",
																			placeholder: "Ex: 2",
																			className: "pl-10",
																			min: "0",
																			max: "20",
																			...r,
																			onChange: (n) =>
																				r.onChange(
																					n.target.value
																						? Number(n.target.value)
																						: 0,
																				),
																		}),
																	],
																}),
															}),
															e.jsx(x, {
																children:
																	"Nombre d'ascenseurs disponibles dans le complexe",
															}),
															e.jsx(c, {}),
														],
													}),
											}),
											e.jsx(t, {
												control: a.control,
												name: "parkingCapacity",
												render: ({ field: r }) =>
													e.jsxs(l, {
														children: [
															e.jsx(o, { children: "Capacité du parking" }),
															e.jsx(d, {
																children: e.jsxs("div", {
																	className: "relative",
																	children: [
																		e.jsx(K, {
																			className:
																				"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4",
																		}),
																		e.jsx(i, {
																			type: "number",
																			placeholder: "Ex: 100",
																			className: "pl-10",
																			min: "0",
																			max: "1000",
																			...r,
																			onChange: (n) =>
																				r.onChange(
																					n.target.value
																						? Number(n.target.value)
																						: 0,
																				),
																		}),
																	],
																}),
															}),
															e.jsx(x, {
																children:
																	"Nombre de places de parking disponibles",
															}),
															e.jsx(c, {}),
														],
													}),
											}),
										],
									}),
									e.jsx(t, {
										control: a.control,
										name: "accessibleForReducedMobility",
										render: ({ field: r }) =>
											e.jsxs(l, {
												className:
													"flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
												children: [
													e.jsx(d, {
														children: e.jsx(v, {
															checked: r.value,
															onCheckedChange: r.onChange,
														}),
													}),
													e.jsxs("div", {
														className: "space-y-1 leading-none",
														children: [
															e.jsxs(o, {
																className: "flex items-center gap-2",
																children: [
																	e.jsx(y, { className: "w-4 h-4" }),
																	"Accessible aux personnes à mobilité réduite (PMR)",
																],
															}),
															e.jsx(x, {
																children:
																	"Cochez cette case si le complexe est entièrement accessible aux personnes en situation de handicap",
															}),
														],
													}),
												],
											}),
									}),
								],
							}),
							a.formState.errors.root &&
								e.jsx(k, {
									variant: "destructive",
									children: e.jsx(P, {
										children: a.formState.errors.root.message,
									}),
								}),
							e.jsxs("div", {
								className:
									"flex items-center justify-end space-x-4 pt-6 border-t",
								children: [
									p &&
										e.jsx(N, {
											variant: "outline",
											asChild: !0,
											children: e.jsx($, { to: p, children: "Annuler" }),
										}),
									e.jsx(N, {
										type: "submit",
										disabled: g,
										children: g
											? e.jsxs(e.Fragment, {
													children: [
														e.jsx(Q, {
															className: "mr-2 h-4 w-4 animate-spin",
														}),
														m ? "Modification..." : "Création...",
													],
												})
											: m
												? "Modifier le complexe"
												: "Créer le complexe",
									}),
								],
							}),
						],
					}),
				}),
			}),
		],
	});
}
export { te as C };
