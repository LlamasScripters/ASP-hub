import { A as G, a as J } from "./alert-DcqybFAu.js";
import { C as ge } from "./calendar-De7tcxsN.js";
import { C as ye } from "./clock-Kg0fBwSd.js";
import {
	c9 as R,
	B as W,
	R as Z,
	e as ae,
	r as c,
	ca as de,
	j as e,
	bT as ee,
	c8 as f,
	f as ie,
	d as le,
	b as ne,
	L as oe,
	C as re,
	c7 as se,
	c6 as te,
} from "./index-kb-Ylywn.js";
import { I as be } from "./info-hEQo0LXU.js";
import { I as F } from "./input-CdkcPZS3.js";
import { L as we } from "./loader-circle-Bxgg9gFD.js";
import {
	c as fe,
	a as he,
	b as je,
	d as pe,
	S as xe,
} from "./select-D8GIfri3.js";
import {
	d as b,
	u as ce,
	b as g,
	a as me,
	F as p,
	s as ue,
	e as v,
	f as w,
	c as y,
} from "./zod-B5AhSGj5.js";
const L = [
	{ key: "monday", label: "Lundi" },
	{ key: "tuesday", label: "Mardi" },
	{ key: "wednesday", label: "Mercredi" },
	{ key: "thursday", label: "Jeudi" },
	{ key: "friday", label: "Vendredi" },
	{ key: "saturday", label: "Samedi" },
	{ key: "sunday", label: "Dimanche" },
];
function Fe({
	roomId: N,
	roomOpeningHours: S,
	roomReservation: r,
	onSuccess: C,
	onCancelLink: u,
}) {
	const { user: m } = Z.useLoaderData(),
		{ createRoomReservation: O, updateRoomReservation: U } = ee({ roomId: N }),
		n = !!r,
		[T, _] = c.useState(n ? "edit" : "create"),
		[I, $] = c.useState(!1),
		[H, z] = c.useState(null),
		[D, A] = c.useState(null);
	u = u || `/admin/facilities/rooms/${N}`;
	const x = c.useMemo(
			() => ({
				title: (r == null ? void 0 : r.title) ?? "",
				startAt: r ? r.startAt : new Date(),
				endAt: r ? r.endAt : new Date(Date.now() + 60 * 60 * 1e3),
				status: (r == null ? void 0 : r.status) ?? "pending",
			}),
			[r],
		),
		s = ce({ resolver: ue(n ? te : se), defaultValues: x }),
		V = c.useCallback(
			(t, a) => {
				var B, K;
				const i = t.getDay(),
					d = [
						"sunday",
						"monday",
						"tuesday",
						"wednesday",
						"thursday",
						"friday",
						"saturday",
					][i],
					o = S[d];
				if (!o || o.closed)
					return `La salle est fermée ${(((B = L.find((j) => j.key === d)) == null ? void 0 : B.label) || "ce jour").toLowerCase()}.`;
				if (t.toDateString() !== a.toDateString())
					return "La réservation doit commencer et finir le même jour.";
				const q = t.getHours() * 60 + t.getMinutes(),
					P = a.getHours() * 60 + a.getMinutes();
				if (
					!(() => {
						if (!o.open || !o.close) return !1;
						const [h, j] = o.open.split(":").map(Number),
							[k, Q] = o.close.split(":").map(Number),
							X = h * 60 + j,
							Y = k * 60 + Q;
						return q >= X && P <= Y;
					})()
				) {
					const h = o.open && o.close ? `${o.open} - ${o.close}` : "Non défini";
					return `La réservation doit être comprise dans les horaires d'ouverture ${(((K = L.find((k) => k.key === d)) == null ? void 0 : K.label) || "ce jour").toLowerCase()} : ${h}.`;
				}
				return null;
			},
			[S],
		),
		E = s.watch("startAt"),
		M = s.watch("endAt");
	return (
		c.useEffect(() => {
			if (E && M) {
				const t = V(E, M);
				A(t);
			}
		}, [E, M, V]),
		c.useEffect(() => {
			T !== (n ? "edit" : "create") && (_(n ? "edit" : "create"), s.reset(x));
		}, [n, T, s, x]),
		e.jsxs(ae, {
			className: "w-full max-w-2xl mx-auto",
			children: [
				e.jsxs(re, {
					children: [
						e.jsxs(ne, {
							className: "flex items-center gap-2",
							children: [
								e.jsx(ge, { className: "w-5 h-5 text-muted-foreground" }),
								n ? "Modifier la réservation" : "Nouvelle réservation",
							],
						}),
						e.jsx(le, {
							children: n
								? "Mettez à jour le créneau de réservation"
								: "Réservez un créneau pour cette salle",
						}),
					],
				}),
				e.jsxs(ie, {
					children: [
						e.jsxs("div", {
							className: "mb-6 p-4 bg-muted/50 rounded-lg",
							children: [
								e.jsxs("div", {
									className: "flex items-center gap-2 mb-3",
									children: [
										e.jsx(ye, { className: "w-4 h-4 text-muted-foreground" }),
										e.jsx("h3", {
											className: "font-medium text-sm",
											children: "Horaires d'ouverture",
										}),
									],
								}),
								e.jsx("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",
									children: L.map((t) => {
										const a = S[t.key];
										return e.jsxs(
											"div",
											{
												className: "flex justify-between",
												children: [
													e.jsxs("span", {
														className: "font-medium",
														children: [t.label, " :"],
													}),
													e.jsx("span", {
														className: "text-muted-foreground",
														children:
															a && !a.closed && a.open && a.close
																? `${a.open} - ${a.close}`
																: "Fermé",
													}),
												],
											},
											t.key,
										);
									}),
								}),
							],
						}),
						e.jsx(me, {
							...s,
							children: e.jsxs("form", {
								onSubmit: async (t) => {
									t.preventDefault();
									const a = s.getValues("startAt"),
										i = s.getValues("endAt");
									if (a && i) {
										const l = V(a, i);
										if (l) {
											A(l);
											return;
										}
									}
									$(!0), z(null), A(null);
									try {
										let l = null;
										if (n && r) {
											const d = {
												title: s.getValues("title") ?? "",
												startAt: s.getValues("startAt") ?? new Date(),
												endAt: s.getValues("endAt") ?? new Date(),
												status: s.getValues("status") ?? "pending",
											};
											l = await U(r.id, d);
										} else {
											if (!(m != null && m.id))
												throw new Error("Utilisateur non authentifié");
											const d = {
												title: s.getValues("title") ?? "",
												startAt: s.getValues("startAt") ?? new Date(),
												endAt:
													s.getValues("endAt") ??
													new Date(Date.now() + 60 * 60 * 1e3),
												roomId: N,
												bookerId: m.id,
												status: s.getValues("status") ?? "pending",
											};
											l = await O(d);
										}
										l && (C == null || C(l), n || s.reset(x));
									} catch (l) {
										let d = "Erreur inattendue";
										l instanceof Error && (d = l.message), z(d);
									} finally {
										$(!1);
									}
								},
								className: "space-y-6",
								children: [
									e.jsx(p, {
										control: s.control,
										name: "title",
										render: ({ field: t }) =>
											e.jsxs(g, {
												children: [
													e.jsx(y, { children: "Titre *" }),
													e.jsx(b, {
														children: e.jsx(F, {
															placeholder: "Ex : Entraînement football",
															...t,
														}),
													}),
													e.jsx(w, {
														children: "Nom du créneau ou de l'événement",
													}),
													e.jsx(v, {}),
												],
											}),
									}),
									e.jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-4",
										children: [
											e.jsx(p, {
												control: s.control,
												name: "startAt",
												render: ({ field: t }) =>
													e.jsxs(g, {
														children: [
															e.jsx(y, { children: "Date de début *" }),
															e.jsx(b, {
																children: e.jsx(F, {
																	type: "datetime-local",
																	value: t.value ? f(t.value) : "",
																	onChange: (a) => {
																		const i = R(a.target.value);
																		t.onChange(i);
																	},
																	min: f(new Date()),
																}),
															}),
															e.jsx(w, {
																children: "Sélecteur de date et heure de début",
															}),
															e.jsx(v, {}),
														],
													}),
											}),
											e.jsx(p, {
												control: s.control,
												name: "endAt",
												render: ({ field: t }) =>
													e.jsxs(g, {
														children: [
															e.jsx(y, { children: "Date de fin *" }),
															e.jsx(b, {
																children: e.jsx(F, {
																	type: "datetime-local",
																	value: t.value ? f(t.value) : "",
																	onChange: (a) => {
																		const i = R(a.target.value);
																		t.onChange(i);
																	},
																	min: f(new Date()),
																}),
															}),
															e.jsx(w, {
																children: "Sélecteur de date et heure de fin",
															}),
															e.jsx(v, {}),
														],
													}),
											}),
										],
									}),
									e.jsx(p, {
										control: s.control,
										name: "status",
										render: ({ field: t }) =>
											e.jsxs(g, {
												children: [
													e.jsx(y, { children: "Statut" }),
													e.jsx(b, {
														children: e.jsxs(xe, {
															onValueChange: t.onChange,
															defaultValue: t.value,
															children: [
																e.jsx(he, {
																	children: e.jsx(je, {
																		placeholder: "Sélectionner un statut",
																	}),
																}),
																e.jsx(fe, {
																	children: Object.entries(de).map(([a, i]) =>
																		e.jsx(pe, { value: a, children: i }, a),
																	),
																}),
															],
														}),
													}),
													e.jsx(w, {
														children:
															"Sélectionnez le statut de la réservation",
													}),
													e.jsx(v, {}),
												],
											}),
									}),
									D &&
										e.jsxs(G, {
											variant: "destructive",
											children: [
												e.jsx(be, { className: "h-4 w-4" }),
												e.jsx(J, { children: D }),
											],
										}),
									H &&
										e.jsx(G, {
											variant: "destructive",
											children: e.jsx(J, { children: H }),
										}),
									e.jsxs("div", {
										className:
											"flex items-center justify-end pt-4 border-t space-x-4",
										children: [
											u &&
												e.jsx(W, {
													variant: "outline",
													asChild: !0,
													children: e.jsx(oe, { to: u, children: "Annuler" }),
												}),
											e.jsx(W, {
												type: "submit",
												disabled: I || !!D,
												children: I
													? e.jsxs(e.Fragment, {
															children: [
																e.jsx(we, {
																	className: "mr-2 h-4 w-4 animate-spin",
																}),
																n ? "Enregistrement..." : "Création...",
															],
														})
													: n
														? "Modifier la réservation"
														: "Créer la réservation",
											}),
										],
									}),
								],
							}),
						}),
					],
				}),
			],
		})
	);
}
export { Fe as R };
