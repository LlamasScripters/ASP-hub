import { A as Se } from "./arrow-left-DMyOJown.js";
import {
	B as I,
	cg as ae,
	r as d,
	L as de,
	j as e,
	f as le,
	C as ne,
	b as oe,
	ch as re,
	e as se,
	R as te,
} from "./index-kb-Ylywn.js";
import { I as Me } from "./info-hEQo0LXU.js";
import { I as N } from "./input-CdkcPZS3.js";
import { L as we } from "./loader-circle-Bxgg9gFD.js";
import {
	d as fe,
	b as he,
	S as me,
	c as pe,
	a as xe,
} from "./select-D8GIfri3.js";
import { S as je } from "./separator-DDNy3jpa.js";
import { u as ge, m as ye } from "./useMinibusReservations-Ch0A6YDJ.js";
import {
	u as ce,
	d as h,
	s as ie,
	b as m,
	e as p,
	F as u,
	a as ue,
	c as x,
} from "./zod-B5AhSGj5.js";
const be = [
	{ key: "monday", label: "Lundi" },
	{ key: "tuesday", label: "Mardi" },
	{ key: "wednesday", label: "Mercredi" },
	{ key: "thursday", label: "Jeudi" },
	{ key: "friday", label: "Vendredi" },
	{ key: "saturday", label: "Samedi" },
	{ key: "sunday", label: "Dimanche" },
];
function Le({
	minibusId: f,
	minibusDisponibility: C,
	minibusReservation: r,
	onSuccess: j,
	onCancelLink: g,
	searchParams: O,
	routeParams: B,
}) {
	const { user: K } = te.useLoaderData(),
		{ createMinibusReservation: W, updateMinibusReservation: q } = ge({
			minibusId: f,
			searchParams: O,
			routeParams: B,
		}),
		l = !!r,
		[v, z] = d.useState(l ? "edit" : "create"),
		[A, T] = d.useState(!1),
		[E, y] = d.useState(null),
		[c, G] = d.useState(null);
	g = g || `/admin/assets/minibuses/${f}`;
	const M = d.useMemo(
			() => ({
				title: (r == null ? void 0 : r.title) ?? "",
				startAt: r
					? r.startAt instanceof Date
						? r.startAt
						: new Date(r.startAt)
					: new Date(),
				endAt: r
					? r.endAt instanceof Date
						? r.endAt
						: new Date(r.endAt)
					: new Date(Date.now() + 60 * 60 * 1e3),
				status: (r == null ? void 0 : r.status) ?? "pending",
			}),
			[r],
		),
		s = ce({ resolver: ie(l ? ae : re), defaultValues: M }),
		F = d.useCallback(
			(t, a) => {
				var H, V;
				const n = t.getDay(),
					i = [
						"sunday",
						"monday",
						"tuesday",
						"wednesday",
						"thursday",
						"friday",
						"saturday",
					][n],
					o = C[i];
				if (!o || !o.available)
					return `Le minibus n'est pas disponible le ${((V = (H = be.find((D) => D.key === i)) == null ? void 0 : H.label)) == null ? void 0 : V.toLowerCase()}`;
				const b = t.getHours(),
					J = t.getMinutes(),
					U = a.getHours(),
					Y = a.getMinutes(),
					P = b * 60 + J,
					Q = U * 60 + Y;
				if (o.open && o.close) {
					const [D, X] = o.open.split(":").map(Number),
						[Z, _] = o.close.split(":").map(Number),
						R = D * 60 + X,
						ee = Z * 60 + _;
					if (P < R || Q > ee)
						return `Le créneau doit être entre ${o.open} et ${o.close}`;
				}
				return null;
			},
			[C],
		),
		S = s.watch("startAt"),
		w = s.watch("endAt");
	d.useEffect(() => {
		if (S && w) {
			const t = F(S, w);
			G(t);
		}
	}, [S, w, F]),
		d.useEffect(() => {
			l !== (v === "edit") && (z(l ? "edit" : "create"), s.reset(M));
		}, [l, v, s, M]);
	const k = (t) => {
			if (!t) return "";
			const a = t instanceof Date ? t : new Date(t);
			if (Number.isNaN(a.getTime())) return "";
			const n = a.getFullYear(),
				$ = String(a.getMonth() + 1).padStart(2, "0"),
				i = String(a.getDate()).padStart(2, "0"),
				o = String(a.getHours()).padStart(2, "0"),
				b = String(a.getMinutes()).padStart(2, "0");
			return `${n}-${$}-${i}T${o}:${b}`;
		},
		L = (t) => new Date(t);
	return e.jsxs(se, {
		className: "w-full max-w-2xl mx-auto",
		children: [
			e.jsx(ne, {
				children: e.jsxs(oe, {
					className: "flex items-center gap-2",
					children: [
						e.jsx(Me, { className: "w-5 h-5" }),
						l ? "Modifier la réservation" : "Nouvelle réservation",
					],
				}),
			}),
			e.jsx(le, {
				children: e.jsx(ue, {
					...s,
					children: e.jsxs("form", {
						onSubmit: async (t) => {
							if ((t.preventDefault(), c)) {
								y(c);
								return;
							}
							T(!0), y(null);
							try {
								const a = s.getValues();
								let n = null;
								l && r
									? (n = await q(r.id, a))
									: (n = await W({ ...a, minibusId: f, bookerId: K.id })),
									n && (j == null || j(n), l || s.reset());
							} catch (a) {
								console.error("Form submission error:", a),
									y(a instanceof Error ? a.message : "Une erreur est survenue");
							} finally {
								T(!1);
							}
						},
						className: "space-y-6",
						children: [
							E &&
								e.jsx("div", {
									className:
										"p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md",
									children: E,
								}),
							c &&
								e.jsx("div", {
									className:
										"p-3 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-md",
									children: c,
								}),
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsx(u, {
										control: s.control,
										name: "title",
										render: ({ field: t }) =>
											e.jsxs(m, {
												children: [
													e.jsx(x, { children: "Titre de la réservation *" }),
													e.jsx(h, {
														children: e.jsx(N, {
															placeholder: "Ex: Transport équipe foot",
															...t,
														}),
													}),
													e.jsx(p, {}),
												],
											}),
									}),
									e.jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-4",
										children: [
											e.jsx(u, {
												control: s.control,
												name: "startAt",
												render: ({ field: t }) =>
													e.jsxs(m, {
														children: [
															e.jsx(x, {
																children: "Date et heure de début *",
															}),
															e.jsx(h, {
																children: e.jsx(N, {
																	type: "datetime-local",
																	...t,
																	value: t.value ? k(t.value) : "",
																	onChange: (a) =>
																		t.onChange(L(a.target.value)),
																}),
															}),
															e.jsx(p, {}),
														],
													}),
											}),
											e.jsx(u, {
												control: s.control,
												name: "endAt",
												render: ({ field: t }) =>
													e.jsxs(m, {
														children: [
															e.jsx(x, { children: "Date et heure de fin *" }),
															e.jsx(h, {
																children: e.jsx(N, {
																	type: "datetime-local",
																	...t,
																	value: t.value ? k(t.value) : "",
																	onChange: (a) =>
																		t.onChange(L(a.target.value)),
																}),
															}),
															e.jsx(p, {}),
														],
													}),
											}),
										],
									}),
									e.jsx(u, {
										control: s.control,
										name: "status",
										render: ({ field: t }) =>
											e.jsxs(m, {
												children: [
													e.jsx(x, { children: "Statut" }),
													e.jsxs(me, {
														onValueChange: t.onChange,
														defaultValue: t.value,
														children: [
															e.jsx(h, {
																children: e.jsx(xe, {
																	children: e.jsx(he, {
																		placeholder: "Sélectionnez un statut",
																	}),
																}),
															}),
															e.jsx(pe, {
																children: Object.entries(ye).map(([a, n]) =>
																	e.jsx(fe, { value: a, children: n }, a),
																),
															}),
														],
													}),
													e.jsx(p, {}),
												],
											}),
									}),
								],
							}),
							e.jsx(je, {}),
							e.jsxs("div", {
								className: "flex items-center justify-between pt-4",
								children: [
									e.jsx(I, {
										variant: "outline",
										asChild: !0,
										children: e.jsxs(de, {
											to: g,
											children: [
												e.jsx(Se, { className: "w-4 h-4 mr-2" }),
												"Annuler",
											],
										}),
									}),
									e.jsxs(I, {
										type: "submit",
										disabled: A || !!c,
										className: "min-w-[120px]",
										children: [
											A &&
												e.jsx(we, { className: "w-4 h-4 mr-2 animate-spin" }),
											l ? "Modifier la réservation" : "Créer la réservation",
										],
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
export { Le as M };
