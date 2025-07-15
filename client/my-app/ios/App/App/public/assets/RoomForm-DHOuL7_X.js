import { A as M, a as O } from "./alert-DcqybFAu.js";
import { C as S } from "./checkbox-DT5FljqG.js";
import {
	C as $,
	c3 as A,
	bU as B,
	r as D,
	c4 as E,
	B as F,
	bW as I,
	b as L,
	e as R,
	j as e,
	f as q,
	L as z,
} from "./index-kb-Ylywn.js";
import { I as X } from "./info-hEQo0LXU.js";
import { I as h } from "./input-CdkcPZS3.js";
import { L as ee } from "./loader-circle-Bxgg9gFD.js";
import { S as J, a as K, d as Q, b as U, c as Y } from "./select-D8GIfri3.js";
import { S as k } from "./settings-CM_XdmzG.js";
import { T as w } from "./textarea-CTVCAbGX.js";
import { T as Z } from "./timer-l0uyiV2G.js";
import { W as _ } from "./warehouse-BXw1dHMx.js";
import {
	a as G,
	s as P,
	u as W,
	b as c,
	d,
	F as i,
	c as o,
	e as p,
	f as x,
} from "./zod-B5AhSGj5.js";
const se = [
	"Football",
	"Basketball",
	"Tennis",
	"Volleyball",
	"Handball",
	"Badminton",
	"Natation",
	"Gymnastique",
	"Judo",
	"Karaté",
	"Danse",
	"Fitness",
	"Musculation",
	"Escalade",
	"Ping-pong",
	"Squash",
	"Boxe",
	"Yoga",
	"Pilates",
	"Autre",
];
function he({
	complexId: j,
	complexOpeningHours: N,
	room: a,
	onSuccess: f,
	onCancelLink: b,
}) {
	const { createRoom: H, updateRoom: V } = I({ complexId: j }),
		[v, C] = D.useState(!1),
		m = !!a,
		n = W({
			resolver: P(m ? A : E),
			defaultValues: {
				name: (a == null ? void 0 : a.name) || "",
				complexId: j,
				description: (a == null ? void 0 : a.description) || "",
				sportType: (a == null ? void 0 : a.sportType) || "",
				openingHours: (a == null ? void 0 : a.openingHours) || N,
				isIndoor: (a == null ? void 0 : a.isIndoor) ?? !0,
				accreditation: (a == null ? void 0 : a.accreditation) || "",
				capacity: (a == null ? void 0 : a.capacity) || 1,
			},
		}),
		y = n.watch("openingHours"),
		T = async (s) => {
			C(!0);
			try {
				let r = null;
				m && a ? (r = await V(a.id, s)) : (r = await H({ ...s, complexId: j })),
					r && (f == null || f(r), m || n.reset());
			} catch (r) {
				console.error("Form submission error:", r);
			} finally {
				C(!1);
			}
		};
	return e.jsxs(R, {
		className: "w-full max-w-2xl mx-auto",
		children: [
			e.jsx($, {
				children: e.jsx(L, {
					className: "flex items-center gap-2",
					children: "Formulaire d'édition",
				}),
			}),
			e.jsx(q, {
				children: e.jsx(G, {
					...n,
					children: e.jsxs("form", {
						onSubmit: n.handleSubmit(T),
						className: "space-y-6",
						children: [
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className:
											"flex items-center gap-2 text-sm font-medium text-gray-700",
										children: [
											e.jsx(X, { className: "w-4 h-4" }),
											"Informations générales",
										],
									}),
									e.jsx(i, {
										control: n.control,
										name: "name",
										render: ({ field: s }) =>
											e.jsxs(c, {
												children: [
													e.jsx(o, { children: "Nom de la salle *" }),
													e.jsx(d, {
														children: e.jsx(h, {
															placeholder: "Ex: Salle de sport principale",
															...s,
														}),
													}),
													e.jsx(x, {
														children: "Le nom de la salle ou de l'espace",
													}),
													e.jsx(p, {}),
												],
											}),
									}),
									e.jsx(i, {
										control: n.control,
										name: "description",
										render: ({ field: s }) =>
											e.jsxs(c, {
												children: [
													e.jsx(o, { children: "Description" }),
													e.jsx(d, {
														children: e.jsx(w, {
															placeholder:
																"Ex: Salle équipée de machines de musculation, espace cardio...",
															className: "min-h-[80px]",
															...s,
														}),
													}),
													e.jsx(x, {
														children: "Description détaillée de la salle",
													}),
													e.jsx(p, {}),
												],
											}),
									}),
									e.jsx(i, {
										control: n.control,
										name: "sportType",
										render: ({ field: s }) =>
											e.jsxs(c, {
												children: [
													e.jsx(o, { children: "Type de sport *" }),
													e.jsxs(J, {
														onValueChange: s.onChange,
														defaultValue: s.value,
														children: [
															e.jsx(d, {
																children: e.jsx(K, {
																	children: e.jsx(U, {
																		placeholder: "Sélectionnez un sport",
																	}),
																}),
															}),
															e.jsx(Y, {
																children: se.map((r) =>
																	e.jsx(Q, { value: r, children: r }, r),
																),
															}),
														],
													}),
													e.jsx(x, {
														children:
															"Sport principal pratiqué dans cette salle",
													}),
													e.jsx(p, {}),
												],
											}),
									}),
								],
							}),
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [
											e.jsx(Z, { className: "w-4 h-4" }),
											"Horaires d'ouverture",
										],
									}),
									y &&
										Object.entries(B).map(([s, r]) => {
											const u = y[s];
											if (!u) return null;
											const l = N[s];
											if (!(l && !l.closed))
												return (
													u.closed ||
														(n.setValue(`openingHours.${s}.closed`, !0),
														n.setValue(`openingHours.${s}.open`, null),
														n.setValue(`openingHours.${s}.close`, null)),
													e.jsxs(
														"div",
														{
															className:
																"flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800",
															children: [
																e.jsx("span", {
																	className:
																		"w-20 font-medium text-gray-500 dark:text-gray-400",
																	children: r,
																}),
																e.jsx("div", {
																	className:
																		"flex items-center gap-2 flex-1 mx-4",
																	children: e.jsx("span", {
																		className:
																			"text-sm text-muted-foreground italic",
																		children: "Le complexe est fermé ce jour",
																	}),
																}),
															],
														},
														s,
													)
												);
											const g = !u.closed;
											return e.jsxs(
												"div",
												{
													className:
														"flex items-center justify-between p-3 border rounded-lg",
													children: [
														e.jsx("span", {
															className: "w-20 font-medium",
															children: r,
														}),
														e.jsxs("div", {
															className: "flex items-center gap-2 flex-1 mx-4",
															children: [
																e.jsx(h, {
																	type: "time",
																	disabled: !g,
																	min: l.open || void 0,
																	max: l.close || void 0,
																	value: u.open || "",
																	onChange: (t) =>
																		n.setValue(
																			`openingHours.${s}.open`,
																			t.target.value,
																		),
																}),
																e.jsx("span", { children: "à" }),
																e.jsx(h, {
																	type: "time",
																	disabled: !g,
																	min: l.open || void 0,
																	max: l.close || void 0,
																	value: u.close || "",
																	onChange: (t) =>
																		n.setValue(
																			`openingHours.${s}.close`,
																			t.target.value,
																		),
																}),
															],
														}),
														e.jsx(S, {
															checked: g,
															onCheckedChange: (t) => {
																n.setValue(`openingHours.${s}.closed`, !t),
																	t ||
																		(n.setValue(`openingHours.${s}.open`, null),
																		n.setValue(
																			`openingHours.${s}.close`,
																			null,
																		));
															},
														}),
													],
												},
												s,
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
											"flex items-center gap-2 text-sm font-medium text-gray-700",
										children: [
											e.jsx(k, { className: "w-4 h-4" }),
											"Configuration",
										],
									}),
									e.jsx(i, {
										control: n.control,
										name: "isIndoor",
										render: ({ field: s }) =>
											e.jsxs(c, {
												className:
													"flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
												children: [
													e.jsx(d, {
														children: e.jsx(S, {
															checked: s.value,
															onCheckedChange: s.onChange,
														}),
													}),
													e.jsxs("div", {
														className: "space-y-1 leading-none",
														children: [
															e.jsxs(o, {
																className: "flex items-center gap-2",
																children: [
																	e.jsx(_, { className: "w-4 h-4" }),
																	"Salle intérieure",
																],
															}),
															e.jsx(x, {
																children:
																	"Cochez cette case si la salle est couverte/intérieure. Décochez pour un terrain extérieur.",
															}),
														],
													}),
												],
											}),
									}),
									e.jsx(i, {
										control: n.control,
										name: "accreditation",
										render: ({ field: s }) =>
											e.jsxs(c, {
												children: [
													e.jsx(o, { children: "Accréditation" }),
													e.jsx(d, {
														children: e.jsx(w, {
															placeholder:
																"Ex: Homologuée FFT, Norme FIFA, Certification FFA...",
															className: "min-h-[80px]",
															...s,
														}),
													}),
													e.jsx(x, {
														children:
															"Certifications, homologations ou accréditations officielles de cette salle",
													}),
													e.jsx(p, {}),
												],
											}),
									}),
									e.jsx(i, {
										control: n.control,
										name: "capacity",
										render: ({ field: s }) =>
											e.jsxs(c, {
												children: [
													e.jsx(o, { children: "Capacité *" }),
													e.jsx(d, {
														children: e.jsx(h, {
															type: "number",
															placeholder: "Ex: 30",
															...s,
															onChange: (r) =>
																s.onChange(
																	r.target.value ? Number(r.target.value) : 1,
																),
														}),
													}),
													e.jsx(x, {
														children:
															"Nombre maximum de personnes pouvant utiliser la salle",
													}),
													e.jsx(p, {}),
												],
											}),
									}),
								],
							}),
							n.formState.errors.root &&
								e.jsx(M, {
									variant: "destructive",
									children: e.jsx(O, {
										children: n.formState.errors.root.message,
									}),
								}),
							e.jsxs("div", {
								className:
									"flex items-center justify-end space-x-4 pt-6 border-t",
								children: [
									b &&
										e.jsx(F, {
											variant: "outline",
											asChild: !0,
											children: e.jsx(z, { to: b, children: "Annuler" }),
										}),
									e.jsx(F, {
										type: "submit",
										disabled: v,
										children: v
											? e.jsxs(e.Fragment, {
													children: [
														e.jsx(ee, {
															className: "mr-2 h-4 w-4 animate-spin",
														}),
														m ? "Modification..." : "Création...",
													],
												})
											: m
												? "Modifier la salle"
												: "Créer la salle",
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
export { he as R };
