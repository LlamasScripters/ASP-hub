import { A as Ne } from "./arrow-left-DMyOJown.js";
import { B as V } from "./badge-BAidKpPB.js";
import { C as se } from "./calendar-De7tcxsN.js";
import { C as je } from "./chevron-left-BhVEjMY-.js";
import { C as ye } from "./chevron-right-QFzs-bqo.js";
import {
	e as G,
	C as J,
	r as L,
	B as M,
	f as Q,
	L as Y,
	b as Z,
	d as de,
	b_ as fe,
	bM as ge,
	bZ as he,
	c as oe,
	j as s,
	bY as xe,
} from "./index-kb-Ylywn.js";
import { I as ke } from "./info-hEQo0LXU.js";
import { L as pe } from "./loader-circle-Bxgg9gFD.js";
import { P as te } from "./pen-DMM3ytoN.js";
import { P as we } from "./plus-czqh0ZLb.js";
import { S as De } from "./square-pen-s7PUkmhH.js";
import { T as _e } from "./timer-l0uyiV2G.js";
import { u as be } from "./useMinibusReservations-Ch0A6YDJ.js";
import { U as ve } from "./user-check-TNP4cs-F.js";
import { U as Se } from "./users-BMY-28E4.js";
const ce = (i) =>
		[
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		][i.getDay()],
	X = (i, e) => {
		const t = ce(i),
			a = e[t];
		return a ? a.available : !1;
	},
	re = (i, e) => {
		const t = ce(i),
			a = e[t];
		return !a || !a.available
			? { openTime: null, closeTime: null }
			: { openTime: a.open, closeTime: a.close };
	},
	ae = (i) => {
		const [e, t] = i.split(":").map(Number);
		return e * 60 + t;
	},
	W = (i) => {
		const e = i.getFullYear(),
			t = String(i.getMonth() + 1).padStart(2, "0"),
			a = String(i.getDate()).padStart(2, "0");
		return `${e}-${t}-${a}`;
	},
	ne = (i) => {
		switch (i.toLowerCase()) {
			case "pending":
				return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800";
			case "confirmed":
				return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800";
			case "cancelled":
				return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800";
			case "completed":
				return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800";
			case "no_show":
				return "bg-muted dark:bg-muted text-muted-foreground border-border";
			case "rescheduled":
				return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800";
			default:
				return "bg-muted dark:bg-muted text-muted-foreground border-border";
		}
	},
	ie = 60,
	Ce = 20,
	le = 5,
	Me = 24;
function Re({ minibusDisponibility: i }) {
	const [e, t] = L.useState("week"),
		[a, p] = L.useState(new Date()),
		{ start: o, end: v } = L.useMemo(
			() => (e === "week" ? xe(a) : he(a)),
			[e, a],
		),
		{ minibusReservations: H, loading: R } = be({ minibusId: void 0 }),
		D = L.useMemo(
			() =>
				H.filter((r) => {
					const l = new Date(r.startAt);
					return l >= o && l <= v;
				}),
			[H, o, v],
		),
		j = new Date(),
		$ = j.getHours(),
		F = j.getFullYear(),
		T = String(j.getMonth() + 1).padStart(2, "0"),
		A = String(j.getDate()).padStart(2, "0"),
		N = `${F}-${T}-${A}`,
		z = L.useCallback(() => {
			if (e === "week") {
				const r = new Date(a);
				r.setDate(r.getDate() - 7), p(r);
			} else {
				const r = new Date(a);
				r.setMonth(r.getMonth() - 1), p(r);
			}
		}, [e, a]),
		O = L.useCallback(() => {
			if (e === "week") {
				const r = new Date(a);
				r.setDate(r.getDate() + 7), p(r);
			} else {
				const r = new Date(a);
				r.setMonth(r.getMonth() + 1), p(r);
			}
		}, [e, a]),
		k = L.useMemo(() => {
			const r = {};
			for (const l of D) {
				const n = new Date(l.startAt),
					d = W(n);
				r[d] || (r[d] = []), r[d].push(l);
			}
			return r;
		}, [D]),
		B = () => {
			if (e === "week") {
				const r = { day: "numeric", month: "short", year: "numeric" };
				return `${o.toLocaleDateString("fr-FR", r)} - ${v.toLocaleDateString("fr-FR", r)}`;
			}
			return a.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
		};
	return R
		? s.jsxs(G, {
				children: [
					s.jsx(J, {
						children: s.jsxs(Z, {
							className: "flex items-center gap-2",
							children: [
								s.jsx(se, { className: "w-4 h-4" }),
								"Planning des réservations",
							],
						}),
					}),
					s.jsx(Q, {
						children: s.jsx("div", {
							className: "flex items-center justify-center py-8",
							children: s.jsx(pe, {
								className: "h-8 w-8 animate-spin text-muted-foreground",
							}),
						}),
					}),
				],
			})
		: s.jsxs(G, {
				children: [
					s.jsx(J, {
						children: s.jsxs("div", {
							className:
								"flex flex-col md:flex-row md:items-center justify-between gap-4",
							children: [
								s.jsxs("div", {
									children: [
										s.jsxs(Z, {
											className: "flex items-center gap-2 text-lg",
											children: [
												s.jsx(se, {
													className: "w-6 h-6 text-muted-foreground",
												}),
												"Planning des réservations",
											],
										}),
										s.jsxs(de, {
											className: "text-sm text-muted-foreground",
											children: [
												"Total : ",
												D.length,
												" réservation",
												D.length > 1 ? "s" : "",
												" sur la période",
											],
										}),
									],
								}),
								s.jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										s.jsxs("div", {
											className: "flex rounded-md border",
											children: [
												s.jsx(M, {
													variant: e === "week" ? "default" : "ghost",
													size: "sm",
													onClick: () => t("week"),
													className: "rounded-r-none",
													children: "Semaine",
												}),
												s.jsx(M, {
													variant: e === "month" ? "default" : "ghost",
													size: "sm",
													onClick: () => t("month"),
													className: "rounded-l-none",
													children: "Mois",
												}),
											],
										}),
										s.jsxs("div", {
											className: "flex items-center gap-1",
											children: [
												s.jsx(M, {
													variant: "outline",
													size: "sm",
													onClick: z,
													children: s.jsx(je, { className: "h-4 w-4" }),
												}),
												s.jsx("div", {
													className:
														"px-3 py-1 text-sm font-medium min-w-[180px] text-center",
													children: B(),
												}),
												s.jsx(M, {
													variant: "outline",
													size: "sm",
													onClick: O,
													children: s.jsx(ye, { className: "h-4 w-4" }),
												}),
											],
										}),
									],
								}),
							],
						}),
					}),
					s.jsxs(Q, {
						children: [
							e === "week" &&
								s.jsx("div", {
									className: "overflow-x-auto",
									children: s.jsxs("div", {
										className: "grid grid-cols-8 gap-1 min-w-[800px]",
										children: [
											s.jsx("div", {
												className:
													"p-2 text-xs font-medium text-muted-foreground",
												children: "Heure",
											}),
											Array.from({ length: 7 }, (r, l) => {
												const n = new Date(o);
												n.setDate(o.getDate() + l);
												const d = X(n, i),
													h = W(n),
													c = h === N;
												return s.jsxs(
													"div",
													{
														className: `p-2 text-center border-b border-border ${d ? "bg-green-50 dark:bg-green-950/30" : "bg-muted"} ${c ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20" : ""}`,
														children: [
															s.jsxs("div", {
																className: `text-xs font-medium ${c ? "text-primary" : "text-foreground"}`,
																children: [
																	n.toLocaleDateString("fr-FR", {
																		weekday: "short",
																	}),
																	c && " (Aujourd'hui)",
																],
															}),
															s.jsx("div", {
																className: `text-sm ${c ? "text-primary font-bold" : "text-foreground"}`,
																children: n.toLocaleDateString("fr-FR", {
																	day: "numeric",
																	month: "short",
																}),
															}),
															d &&
																s.jsx("div", {
																	className: `text-xs mt-1 ${c ? "text-primary" : "text-muted-foreground"}`,
																	children: (() => {
																		const m = re(n, i);
																		return m.openTime && m.closeTime
																			? `${m.openTime}-${m.closeTime}`
																			: "Disponible";
																	})(),
																}),
														],
													},
													`day-header-${h}`,
												);
											}),
											Array.from({ length: Me - le }, (r, l) => {
												const n = le + l,
													d = `${n.toString().padStart(2, "0")}:00`,
													h = n === $;
												return s.jsxs(
													"div",
													{
														className: "contents",
														children: [
															s.jsx("div", {
																className: `p-2 text-xs border-r border-border ${h ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"}`,
																children: d,
															}),
															Array.from({ length: 7 }, (c, m) => {
																const x = new Date(o);
																x.setDate(o.getDate() + m);
																const g = W(x),
																	w = k[g] || [],
																	f = X(x, i),
																	_ = g === N && h,
																	y = re(x, i),
																	C =
																		y.openTime && y.closeTime
																			? n >= Math.floor(ae(y.openTime) / 60) &&
																				n < Math.ceil(ae(y.closeTime) / 60)
																			: !1,
																	E = w.filter((u) => {
																		const K = new Date(u.startAt).getHours(),
																			P = new Date(u.endAt).getHours();
																		return n >= K && n < P;
																	});
																let b = "bg-background";
																return (
																	f
																		? f && !C
																			? (b = "bg-muted")
																			: f &&
																				C &&
																				(b = "bg-green-50 dark:bg-green-950/20")
																		: (b = "bg-muted"),
																	_ && (b = "bg-primary/30"),
																	s.jsxs(
																		"div",
																		{
																			className: `relative border border-border ${b}`,
																			style: { minHeight: `${ie}px` },
																			children: [
																				_ &&
																					s.jsx("div", {
																						className:
																							"absolute top-0 left-0 right-0 h-1 bg-primary z-20",
																					}),
																				E.map((u) =>
																					s.jsx(
																						"div",
																						{
																							className: `absolute inset-x-1 rounded text-xs p-1 border group ${ne(u.status)}`,
																							style: {
																								top: "2px",
																								height: `${Math.max(Ce, ie - 4)}px`,
																								zIndex: 10,
																							},
																							children: s.jsxs("div", {
																								className:
																									"flex justify-between items-start h-full",
																								children: [
																									s.jsxs("div", {
																										className: "flex-1 min-w-0",
																										children: [
																											s.jsx("div", {
																												className:
																													"font-medium truncate",
																												children: u.title,
																											}),
																											s.jsxs("div", {
																												className:
																													"text-xs opacity-75",
																												children: [
																													new Date(
																														u.startAt,
																													).toLocaleTimeString(
																														"fr-FR",
																														{
																															hour: "2-digit",
																															minute: "2-digit",
																														},
																													),
																													"-",
																													new Date(
																														u.endAt,
																													).toLocaleTimeString(
																														"fr-FR",
																														{
																															hour: "2-digit",
																															minute: "2-digit",
																														},
																													),
																												],
																											}),
																										],
																									}),
																									s.jsx(M, {
																										size: "icon",
																										variant: "ghost",
																										asChild: !0,
																										title: "Modifier",
																										className:
																											"h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80 dark:hover:bg-background/60",
																										children: s.jsx(Y, {
																											to: "/admin/assets/minibusReservations/$minibusReservationId/edit",
																											params: {
																												minibusReservationId:
																													u.id,
																											},
																											children: s.jsx(te, {
																												className: "w-3 h-3",
																											}),
																										}),
																									}),
																								],
																							}),
																						},
																						u.id,
																					),
																				),
																			],
																		},
																		`day-${m}-hour-${n}`,
																	)
																);
															}),
														],
													},
													`hour-${n}`,
												);
											}),
										],
									}),
								}),
							e === "month" &&
								s.jsxs("div", {
									className: "grid grid-cols-7 gap-1",
									children: [
										["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((r) =>
											s.jsx(
												"div",
												{
													className:
														"p-2 text-center text-sm font-medium text-muted-foreground",
													children: r,
												},
												r,
											),
										),
										Array.from({ length: 42 }, (r, l) => {
											const n = new Date(o.getFullYear(), o.getMonth(), 1),
												d = n.getDay(),
												h = d === 0 ? -6 : 1 - d,
												c = new Date(n.getFullYear(), n.getMonth(), h + l),
												m = W(c),
												x = k[m] || [],
												g = c.getMonth() === o.getMonth(),
												w = X(c, i),
												f = m === N;
											return s.jsxs(
												"div",
												{
													className: `p-2 border border-border min-h-[80px] ${g ? "" : "bg-muted/50 text-muted-foreground"} ${!w && g ? "bg-muted" : ""}
									${f ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20" : ""}`,
													children: [
														s.jsxs("div", {
															className: `text-sm font-medium mb-1 ${f ? "text-primary" : "text-foreground"}`,
															children: [
																c.getDate(),
																f &&
																	s.jsx("span", {
																		className: "ml-1 text-xs text-primary",
																		children: "(Auj.)",
																	}),
															],
														}),
														s.jsxs("div", {
															className: "space-y-1",
															children: [
																x.slice(0, 2).map((S) =>
																	s.jsxs(
																		"div",
																		{
																			className: `text-xs p-1 rounded truncate group flex justify-between items-center ${ne(S.status)}`,
																			children: [
																				s.jsx("span", {
																					className: "truncate flex-1 mr-1",
																					children: S.title,
																				}),
																				s.jsx(M, {
																					size: "icon",
																					variant: "ghost",
																					asChild: !0,
																					title: "Modifier",
																					className:
																						"h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background dark:bg-background/80 dark:hover:bg-background",
																					children: s.jsx(Y, {
																						to: "/admin/assets/minibusReservations/$minibusReservationId/edit",
																						params: {
																							minibusReservationId: S.id,
																						},
																						children: s.jsx(te, {
																							className: "w-2 h-2",
																						}),
																					}),
																				}),
																			],
																		},
																		S.id,
																	),
																),
																x.length > 2 &&
																	s.jsxs("div", {
																		className: "text-xs text-muted-foreground",
																		children: ["+", x.length - 2, " autre(s)"],
																	}),
															],
														}),
													],
												},
												`month-day-${m}`,
											);
										}),
									],
								}),
							s.jsxs("div", {
								className: "mt-4 pt-4 border-t space-y-3",
								children: [
									s.jsx("div", {
										className:
											"flex items-center justify-between text-sm text-muted-foreground",
										children: s.jsxs("div", {
											className: "flex items-center gap-4",
											children: [
												s.jsx("span", {
													className: "font-medium text-foreground",
													children: "Statuts :",
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800",
														}),
														s.jsx("span", { children: "En attente" }),
													],
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800",
														}),
														s.jsx("span", { children: "Confirmée" }),
													],
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800",
														}),
														s.jsx("span", { children: "Annulée" }),
													],
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800",
														}),
														s.jsx("span", { children: "Terminée" }),
													],
												}),
											],
										}),
									}),
									s.jsx("div", {
										className:
											"flex items-center justify-between text-sm text-muted-foreground",
										children: s.jsxs("div", {
											className: "flex items-center gap-4",
											children: [
												s.jsx("span", {
													className: "font-medium text-foreground",
													children: "Disponibilités :",
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800",
														}),
														s.jsx("span", {
															children: "Heures de disponibilité",
														}),
													],
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-muted border border-border",
														}),
														s.jsx("span", { children: "Indisponible" }),
													],
												}),
												s.jsxs("div", {
													className: "flex items-center gap-1",
													children: [
														s.jsx("div", {
															className:
																"w-3 h-3 rounded bg-primary/30 border border-primary",
														}),
														s.jsx("span", { children: "Maintenant" }),
													],
												}),
											],
										}),
									}),
								],
							}),
						],
					}),
				],
			});
}
function $e(i) {
	const e = oe.c(74),
		{ minibus: t } = i;
	let a;
	e[0] !== t.name
		? ((a = s.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: t.name,
			})),
			(e[0] = t.name),
			(e[1] = a))
		: (a = e[1]);
	let p;
	e[2] !== t.licensePlate
		? ((p = s.jsxs("p", {
				className: "text-muted-foreground",
				children: [
					"Plaque d'immatriculation :",
					" ",
					s.jsx("span", { className: "font-medium", children: t.licensePlate }),
				],
			})),
			(e[2] = t.licensePlate),
			(e[3] = p))
		: (p = e[3]);
	let o;
	e[4] !== t.isAvailable
		? ((o = s.jsx("div", {
				className: "flex items-center gap-2 mt-2",
				children: t.isAvailable
					? s.jsx(V, {
							variant: "default",
							className: "bg-green-100 text-green-800",
							children: "Disponible",
						})
					: s.jsx(V, {
							variant: "secondary",
							className: "bg-red-100 text-red-800",
							children: "Indisponible",
						}),
			})),
			(e[4] = t.isAvailable),
			(e[5] = o))
		: (o = e[5]);
	let v;
	e[6] !== a || e[7] !== p || e[8] !== o
		? ((v = s.jsxs("div", { children: [a, p, o] })),
			(e[6] = a),
			(e[7] = p),
			(e[8] = o),
			(e[9] = v))
		: (v = e[9]);
	let H;
	e[10] === Symbol.for("react.memo_cache_sentinel")
		? ((H = s.jsx(M, {
				asChild: !0,
				variant: "outline",
				size: "sm",
				children: s.jsxs(Y, {
					to: "/admin/assets/minibuses",
					children: [
						s.jsx(Ne, { className: "w-4 h-4 mr-2" }),
						"Retour à la liste",
					],
				}),
			})),
			(e[10] = H))
		: (H = e[10]);
	let R;
	e[11] !== t.id
		? ((R = { minibusId: t.id }), (e[11] = t.id), (e[12] = R))
		: (R = e[12]);
	let D;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((D = s.jsx(we, { className: "w-4 h-4 mr-2" })), (e[13] = D))
		: (D = e[13]);
	let j;
	e[14] !== R
		? ((j = s.jsx(M, {
				asChild: !0,
				variant: "default",
				size: "sm",
				children: s.jsxs(Y, {
					to: "/admin/assets/minibuses/$minibusId/create-reservation",
					params: R,
					children: [D, "Réserver le minibus"],
				}),
			})),
			(e[14] = R),
			(e[15] = j))
		: (j = e[15]);
	let $;
	e[16] !== t.id
		? (($ = { minibusId: t.id }), (e[16] = t.id), (e[17] = $))
		: ($ = e[17]);
	let F;
	e[18] === Symbol.for("react.memo_cache_sentinel")
		? ((F = s.jsx(De, { className: "w-4 h-4 mr-2" })), (e[18] = F))
		: (F = e[18]);
	let T;
	e[19] !== $
		? ((T = s.jsx(M, {
				asChild: !0,
				variant: "default",
				size: "sm",
				children: s.jsxs(Y, {
					to: "/admin/assets/minibuses/$minibusId/edit",
					params: $,
					children: [F, "Modifier"],
				}),
			})),
			(e[19] = $),
			(e[20] = T))
		: (T = e[20]);
	let A;
	e[21] !== T || e[22] !== j
		? ((A = s.jsxs("div", {
				className: "flex items-center gap-2",
				children: [H, j, T],
			})),
			(e[21] = T),
			(e[22] = j),
			(e[23] = A))
		: (A = e[23]);
	let N;
	e[24] !== A || e[25] !== v
		? ((N = s.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [v, " ", A],
			})),
			(e[24] = A),
			(e[25] = v),
			(e[26] = N))
		: (N = e[26]);
	let z;
	e[27] === Symbol.for("react.memo_cache_sentinel")
		? ((z = s.jsxs(J, {
				children: [
					s.jsxs(Z, {
						className: "flex items-center gap-2",
						children: [
							s.jsx(ke, { className: "w-5 h-5 text-muted-foreground" }),
							"Détails du minibus",
						],
					}),
					s.jsx(de, { children: "Informations principales" }),
				],
			})),
			(e[27] = z))
		: (z = e[27]);
	let O;
	e[28] === Symbol.for("react.memo_cache_sentinel")
		? ((O = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Nom",
			})),
			(e[28] = O))
		: (O = e[28]);
	let k;
	e[29] !== t.name
		? ((k = s.jsxs("div", {
				children: [O, s.jsx("p", { className: "text-sm", children: t.name })],
			})),
			(e[29] = t.name),
			(e[30] = k))
		: (k = e[30]);
	let B;
	e[31] === Symbol.for("react.memo_cache_sentinel")
		? ((B = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Description",
			})),
			(e[31] = B))
		: (B = e[31]);
	const r = t.description || "Aucune description";
	let l;
	e[32] !== r
		? ((l = s.jsxs("div", {
				children: [B, s.jsx("p", { className: "text-sm", children: r })],
			})),
			(e[32] = r),
			(e[33] = l))
		: (l = e[33]);
	let n;
	e[34] === Symbol.for("react.memo_cache_sentinel")
		? ((n = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Plaque d'immatriculation",
			})),
			(e[34] = n))
		: (n = e[34]);
	let d;
	e[35] !== t.licensePlate
		? ((d = s.jsxs("div", {
				children: [
					n,
					s.jsx("p", {
						className: "text-sm font-mono",
						children: t.licensePlate,
					}),
				],
			})),
			(e[35] = t.licensePlate),
			(e[36] = d))
		: (d = e[36]);
	let h;
	e[37] !== k || e[38] !== l || e[39] !== d
		? ((h = s.jsxs("div", { className: "space-y-4", children: [k, l, d] })),
			(e[37] = k),
			(e[38] = l),
			(e[39] = d),
			(e[40] = h))
		: (h = e[40]);
	let c, m;
	e[41] === Symbol.for("react.memo_cache_sentinel")
		? ((c = s.jsx(Se, { className: "w-4 h-4 text-muted-foreground" })),
			(m = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Capacité totale",
			})),
			(e[41] = c),
			(e[42] = m))
		: ((c = e[41]), (m = e[42]));
	let x;
	e[43] !== t.capacity
		? ((x = s.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					c,
					s.jsxs("div", {
						children: [
							m,
							s.jsxs("p", {
								className: "text-sm",
								children: [t.capacity, " places"],
							}),
						],
					}),
				],
			})),
			(e[43] = t.capacity),
			(e[44] = x))
		: (x = e[44]);
	let g;
	e[45] !== t.disabledPersonCapacity
		? ((g =
				t.disabledPersonCapacity > 0 &&
				s.jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						s.jsx(ve, { className: "w-4 h-4 text-muted-foreground" }),
						s.jsxs("div", {
							children: [
								s.jsx("h4", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Places PMR",
								}),
								s.jsxs("p", {
									className: "text-sm",
									children: [t.disabledPersonCapacity, " places"],
								}),
							],
						}),
					],
				})),
			(e[45] = t.disabledPersonCapacity),
			(e[46] = g))
		: (g = e[46]);
	let w;
	e[47] !== x || e[48] !== g
		? ((w = s.jsxs("div", {
				className: "flex items-center gap-6",
				children: [x, g],
			})),
			(e[47] = x),
			(e[48] = g),
			(e[49] = w))
		: (w = e[49]);
	let f;
	e[50] === Symbol.for("react.memo_cache_sentinel")
		? ((f = s.jsx("h4", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Statut",
			})),
			(e[50] = f))
		: (f = e[50]);
	const S = t.isAvailable ? "Disponible pour les réservations" : "Indisponible";
	let _;
	e[51] !== S
		? ((_ = s.jsxs("div", {
				children: [f, s.jsx("p", { className: "text-sm", children: S })],
			})),
			(e[51] = S),
			(e[52] = _))
		: (_ = e[52]);
	let y;
	e[53] !== w || e[54] !== _
		? ((y = s.jsxs("div", { className: "space-y-4", children: [w, _] })),
			(e[53] = w),
			(e[54] = _),
			(e[55] = y))
		: (y = e[55]);
	let C;
	e[56] !== h || e[57] !== y
		? ((C = s.jsxs(G, {
				children: [
					z,
					s.jsx(Q, {
						children: s.jsxs("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [h, y],
						}),
					}),
				],
			})),
			(e[56] = h),
			(e[57] = y),
			(e[58] = C))
		: (C = e[58]);
	let E;
	e[59] === Symbol.for("react.memo_cache_sentinel")
		? ((E = s.jsx(J, {
				children: s.jsxs(Z, {
					className: "flex items-center gap-2",
					children: [s.jsx(_e, { className: "w-4 h-4" }), "Disponibilités"],
				}),
			})),
			(e[59] = E))
		: (E = e[59]);
	let b;
	e[60] !== t.disponibility
		? ((b = Object.entries(ge).map((me) => {
				const [ee, ue] = me,
					I = t.disponibility[ee];
				return s.jsxs(
					"div",
					{
						className: "p-3 border rounded-lg text-center",
						children: [
							s.jsx("h4", { className: "text-sm font-medium", children: ue }),
							I != null && I.available
								? s.jsxs("div", {
										className: "mt-1 space-y-1",
										children: [
											s.jsx(V, {
												variant: "default",
												className: "text-xs bg-green-100 text-green-800",
												children: "Disponible",
											}),
											I.open &&
												I.close &&
												s.jsxs("p", {
													className: "text-xs text-muted-foreground",
													children: [I.open, " - ", I.close],
												}),
										],
									})
								: s.jsx(V, {
										variant: "secondary",
										className: "text-xs bg-gray-100 text-gray-600 mt-1",
										children: "Indisponible",
									}),
						],
					},
					ee,
				);
			})),
			(e[60] = t.disponibility),
			(e[61] = b))
		: (b = e[61]);
	let u;
	e[62] !== b
		? ((u = s.jsx("div", {
				className: "grid gap-2 md:grid-cols-2 lg:grid-cols-7",
				children: b,
			})),
			(e[62] = b),
			(e[63] = u))
		: (u = e[63]);
	let K;
	e[64] === Symbol.for("react.memo_cache_sentinel")
		? ((K = s.jsx("p", {
				className: "text-xs text-muted-foreground mt-4 text-center",
				children:
					"Les heures indiquées correspondent aux créneaux où le minibus peut être réservé.",
			})),
			(e[64] = K))
		: (K = e[64]);
	let P;
	e[65] !== u
		? ((P = s.jsxs(G, { children: [E, s.jsxs(Q, { children: [u, K] })] })),
			(e[65] = u),
			(e[66] = P))
		: (P = e[66]);
	let U;
	e[67] !== t.disponibility
		? ((U = s.jsx(Re, { minibusDisponibility: t.disponibility })),
			(e[67] = t.disponibility),
			(e[68] = U))
		: (U = e[68]);
	let q;
	return (
		e[69] !== N || e[70] !== C || e[71] !== P || e[72] !== U
			? ((q = s.jsxs("div", {
					className: "space-y-6",
					children: [N, C, P, U],
				})),
				(e[69] = N),
				(e[70] = C),
				(e[71] = P),
				(e[72] = U),
				(e[73] = q))
			: (q = e[73]),
		q
	);
}
const Ve = () => {
	const e = oe.c(2),
		{ minibus: t } = fe.useLoaderData();
	let a;
	return (
		e[0] !== t
			? ((a = s.jsx($e, { minibus: t })), (e[0] = t), (e[1] = a))
			: (a = e[1]),
		a
	);
};
export { Ve as component };
