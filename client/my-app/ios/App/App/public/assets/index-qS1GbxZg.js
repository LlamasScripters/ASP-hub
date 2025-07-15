import { A as je } from "./arrow-left-DMyOJown.js";
import { B as ee } from "./badge-BAidKpPB.js";
import { C as X } from "./calendar-De7tcxsN.js";
import { C as fe } from "./chevron-left-BhVEjMY-.js";
import { C as pe } from "./chevron-right-QFzs-bqo.js";
import {
	B as C,
	L as G,
	r as K,
	C as U,
	b as V,
	f as W,
	e as Y,
	bR as ce,
	bV as he,
	c as le,
	bS as me,
	d as oe,
	j as t,
	bU as ue,
	bT as xe,
} from "./index-kb-Ylywn.js";
import { I as Ne } from "./info-hEQo0LXU.js";
import { L as ge } from "./loader-circle-Bxgg9gFD.js";
import { P as te } from "./pen-DMM3ytoN.js";
import { P as be } from "./plus-czqh0ZLb.js";
import { S as ye } from "./square-pen-s7PUkmhH.js";
import { T as ve } from "./timer-l0uyiV2G.js";
const de = (o) =>
		[
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		][o.getDay()],
	Z = (o, e) => {
		const s = de(o),
			a = e[s];
		return a ? !a.closed : !1;
	},
	se = (o, e) => {
		const s = de(o),
			a = e[s];
		return !a || a.closed ? null : { openTime: a.open, closeTime: a.close };
	},
	re = (o) => {
		const [e, s] = o.split(":").map(Number);
		return e * 60 + s;
	},
	J = (o) => {
		const e = o.getFullYear(),
			s = String(o.getMonth() + 1).padStart(2, "0"),
			a = String(o.getDate()).padStart(2, "0");
		return `${e}-${s}-${a}`;
	},
	ne = (o) => {
		switch (o.toLowerCase()) {
			case "confirmed":
			case "confirmé":
				return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-800 dark:text-green-200";
			case "pending":
			case "en_attente":
				return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
			case "cancelled":
			case "annulé":
				return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200";
			default:
				return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200";
		}
	},
	ae = 60,
	we = 20,
	ie = 5,
	ke = 24;
function De({ roomId: o, roomOpeningHours: e }) {
	const [s, a] = K.useState("week"),
		[d, k] = K.useState(new Date()),
		b = new Date(),
		M = b.getHours(),
		T = b.getFullYear(),
		P = String(b.getMonth() + 1).padStart(2, "0"),
		_ = String(b.getDate()).padStart(2, "0"),
		v = `${T}-${P}-${_}`,
		{ start: h, end: D } = K.useMemo(
			() => (s === "week" ? ce(d) : me(d)),
			[s, d],
		),
		{
			roomReservations: R,
			totalCount: F,
			loading: H,
			error: S,
		} = xe({ roomId: o, startDate: h, endDate: D }),
		I = K.useCallback(() => {
			k((r) => {
				const i = new Date(r);
				return (
					s === "week"
						? i.setDate(r.getDate() - 7)
						: i.setMonth(r.getMonth() - 1),
					i
				);
			});
		}, [s]),
		E = K.useCallback(() => {
			k((r) => {
				const i = new Date(r);
				return (
					s === "week"
						? i.setDate(r.getDate() + 7)
						: i.setMonth(r.getMonth() + 1),
					i
				);
			});
		}, [s]),
		z = K.useMemo(() => {
			const r = {};
			for (const i of R) {
				const n = new Date(i.startAt),
					m = J(n);
				r[m] || (r[m] = []), r[m].push(i);
			}
			return r;
		}, [R]),
		A = () => {
			if (s === "week") {
				const r = { day: "numeric", month: "short", year: "numeric" };
				return `${h.toLocaleDateString("fr-FR", r)} - ${D.toLocaleDateString("fr-FR", r)}`;
			}
			return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
		};
	return H
		? t.jsxs(Y, {
				children: [
					t.jsx(U, {
						children: t.jsxs(V, {
							className: "flex items-center gap-2",
							children: [
								t.jsx(X, { className: "w-4 h-4" }),
								"Planning des réservations",
							],
						}),
					}),
					t.jsx(W, {
						children: t.jsx("div", {
							className: "flex items-center justify-center py-8",
							children: t.jsx(ge, {
								className: "h-8 w-8 animate-spin text-muted-foreground",
							}),
						}),
					}),
				],
			})
		: S
			? t.jsxs(Y, {
					children: [
						t.jsx(U, {
							children: t.jsxs(V, {
								className: "flex items-center gap-2",
								children: [
									t.jsx(X, { className: "w-4 h-4" }),
									"Planning des réservations",
								],
							}),
						}),
						t.jsx(W, {
							children: t.jsxs("div", {
								className: "text-center py-8 text-red-600",
								children: ["Erreur lors du chargement des réservations: ", S],
							}),
						}),
					],
				})
			: t.jsxs(Y, {
					children: [
						t.jsx(U, {
							children: t.jsxs("div", {
								className:
									"flex flex-col md:flex-row md:items-center justify-between gap-4",
								children: [
									t.jsxs("div", {
										children: [
											t.jsxs(V, {
												className: "flex items-center gap-2 text-lg",
												children: [
													t.jsx(X, {
														className: "w-6 h-6 text-muted-foreground",
													}),
													"Planning des réservations",
												],
											}),
											t.jsxs(oe, {
												className: "text-sm text-muted-foreground",
												children: [
													"Total : ",
													F,
													" réservation",
													F > 1 ? "s" : "",
												],
											}),
										],
									}),
									t.jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											t.jsxs("div", {
												className: "flex rounded-md border",
												children: [
													t.jsx(C, {
														variant: s === "week" ? "default" : "ghost",
														size: "sm",
														onClick: () => a("week"),
														className: "rounded-r-none",
														children: "Semaine",
													}),
													t.jsx(C, {
														variant: s === "month" ? "default" : "ghost",
														size: "sm",
														onClick: () => a("month"),
														className: "rounded-l-none",
														children: "Mois",
													}),
												],
											}),
											t.jsxs("div", {
												className: "flex items-center gap-1",
												children: [
													t.jsx(C, {
														variant: "outline",
														size: "sm",
														onClick: I,
														children: t.jsx(fe, { className: "h-4 w-4" }),
													}),
													t.jsx("div", {
														className:
															"px-3 py-1 text-sm font-medium min-w-[180px] text-center",
														children: A(),
													}),
													t.jsx(C, {
														variant: "outline",
														size: "sm",
														onClick: E,
														children: t.jsx(pe, { className: "h-4 w-4" }),
													}),
												],
											}),
										],
									}),
								],
							}),
						}),
						t.jsxs(W, {
							children: [
								s === "week" &&
									t.jsx("div", {
										className: "overflow-x-auto",
										children: t.jsxs("div", {
											className: "grid grid-cols-8 gap-1 min-w-[800px]",
											children: [
												t.jsx("div", {
													className:
														"p-2 text-xs font-medium text-muted-foreground",
													children: "Heure",
												}),
												Array.from({ length: 7 }, (r, i) => {
													const n = new Date(h);
													n.setDate(h.getDate() + i);
													const m = Z(n, e),
														g = J(n),
														c = g === v;
													return t.jsxs(
														"div",
														{
															className: `p-2 text-center border-b border-border ${m ? "bg-green-50 dark:bg-green-950/30" : "bg-muted"} ${c ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20" : ""}`,
															children: [
																t.jsxs("div", {
																	className: `text-xs font-medium ${c ? "text-primary" : "text-foreground"}`,
																	children: [
																		n.toLocaleDateString("fr-FR", {
																			weekday: "short",
																		}),
																		c && " (Aujourd'hui)",
																	],
																}),
																t.jsx("div", {
																	className: `text-sm ${c ? "text-primary font-bold" : "text-foreground"}`,
																	children: n.toLocaleDateString("fr-FR", {
																		day: "numeric",
																		month: "short",
																	}),
																}),
																m &&
																	t.jsx("div", {
																		className: `text-xs mt-1 ${c ? "text-primary" : "text-muted-foreground"}`,
																		children: (() => {
																			const l = se(n, e);
																			return l != null &&
																				l.openTime &&
																				l != null &&
																				l.closeTime
																				? `${l.openTime}-${l.closeTime}`
																				: "Ouvert";
																		})(),
																	}),
															],
														},
														`day-header-${g}`,
													);
												}),
												Array.from({ length: ke - ie }, (r, i) => {
													const n = ie + i,
														m = `${n.toString().padStart(2, "0")}:00`,
														g = n === M;
													return t.jsxs(
														"div",
														{
															className: "contents",
															children: [
																t.jsx("div", {
																	className: `p-2 text-xs border-r border-border ${g ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"}`,
																	children: m,
																}),
																Array.from({ length: 7 }, (c, l) => {
																	const x = new Date(h);
																	x.setDate(h.getDate() + l);
																	const p = J(x),
																		L = z[p] || [],
																		f = Z(x, e),
																		B = p === v && g,
																		u = se(x, e),
																		$ =
																			u != null &&
																			u.openTime &&
																			u != null &&
																			u.closeTime
																				? n >=
																						Math.floor(re(u.openTime) / 60) &&
																					n < Math.ceil(re(u.closeTime) / 60)
																				: !1,
																		O = L.filter((y) => {
																			const q = new Date(y.startAt).getHours(),
																				Q = new Date(y.endAt).getHours();
																			return n >= q && n < Q;
																		});
																	let w = "bg-background";
																	return (
																		f
																			? f && !$
																				? (w = "bg-muted")
																				: f &&
																					$ &&
																					(w =
																						"bg-green-50 dark:bg-green-950/20")
																			: (w = "bg-muted"),
																		B && (w = "bg-primary/30"),
																		t.jsxs(
																			"div",
																			{
																				className: `relative border border-border ${w}`,
																				style: { minHeight: `${ae}px` },
																				children: [
																					B &&
																						t.jsx("div", {
																							className:
																								"absolute top-0 left-0 right-0 h-1 bg-primary z-20",
																						}),
																					O.map((y) =>
																						t.jsx(
																							"div",
																							{
																								className: `absolute inset-x-1 rounded text-xs p-1 border group ${ne(y.status)}`,
																								style: {
																									top: "2px",
																									height: `${Math.max(we, ae - 4)}px`,
																									zIndex: 10,
																								},
																								children: t.jsxs("div", {
																									className:
																										"flex justify-between items-start h-full",
																									children: [
																										t.jsxs("div", {
																											className:
																												"flex-1 min-w-0",
																											children: [
																												t.jsx("div", {
																													className:
																														"font-medium truncate",
																													children: y.title,
																												}),
																												t.jsxs("div", {
																													className:
																														"text-xs opacity-75",
																													children: [
																														new Date(
																															y.startAt,
																														).toLocaleTimeString(
																															"fr-FR",
																															{
																																hour: "2-digit",
																																minute:
																																	"2-digit",
																															},
																														),
																														"-",
																														new Date(
																															y.endAt,
																														).toLocaleTimeString(
																															"fr-FR",
																															{
																																hour: "2-digit",
																																minute:
																																	"2-digit",
																															},
																														),
																													],
																												}),
																											],
																										}),
																										t.jsx(C, {
																											size: "icon",
																											variant: "ghost",
																											asChild: !0,
																											title: "Modifier",
																											className:
																												"h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background dark:bg-background/80 dark:hover:bg-background",
																											children: t.jsx(G, {
																												to: "/admin/facilities/roomReservations/$roomReservationId/edit",
																												params: {
																													roomReservationId:
																														y.id,
																												},
																												children: t.jsx(te, {
																													className: "w-3 h-3",
																												}),
																											}),
																										}),
																									],
																								}),
																							},
																							y.id,
																						),
																					),
																				],
																			},
																			`day-${l}-hour-${n}`,
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
								s === "month" &&
									t.jsxs("div", {
										className: "grid grid-cols-7 gap-1",
										children: [
											["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
												(r) =>
													t.jsx(
														"div",
														{
															className:
																"p-2 text-center text-sm font-medium text-muted-foreground",
															children: r,
														},
														r,
													),
											),
											Array.from({ length: 42 }, (r, i) => {
												const n = new Date(h.getFullYear(), h.getMonth(), 1),
													m = n.getDay(),
													g = m === 0 ? -6 : 1 - m,
													c = new Date(n.getFullYear(), n.getMonth(), g + i),
													l = J(c),
													x = z[l] || [],
													p = c.getMonth() === h.getMonth(),
													L = Z(c, e),
													f = l === v;
												return t.jsxs(
													"div",
													{
														className: `p-2 border border-border min-h-[80px] ${p ? "" : "bg-muted/50 text-muted-foreground"} ${!L && p ? "bg-muted" : ""}
									${f ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20" : ""}`,
														children: [
															t.jsxs("div", {
																className: `text-sm font-medium mb-1 ${f ? "text-primary" : "text-foreground"}`,
																children: [
																	c.getDate(),
																	f &&
																		t.jsx("span", {
																			className: "ml-1 text-xs text-primary",
																			children: "(Auj.)",
																		}),
																],
															}),
															t.jsxs("div", {
																className: "space-y-1",
																children: [
																	x.slice(0, 2).map((j) =>
																		t.jsxs(
																			"div",
																			{
																				className: `text-xs p-1 rounded truncate group flex justify-between items-center ${ne(j.status)}`,
																				children: [
																					t.jsx("span", {
																						className: "truncate flex-1 mr-1",
																						children: j.title,
																					}),
																					t.jsx(C, {
																						size: "icon",
																						variant: "ghost",
																						asChild: !0,
																						title: "Modifier",
																						className:
																							"h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background dark:bg-background/80 dark:hover:bg-background",
																						children: t.jsx(G, {
																							to: "/admin/facilities/roomReservations/$roomReservationId/edit",
																							params: {
																								roomReservationId: j.id,
																							},
																							children: t.jsx(te, {
																								className: "w-2 h-2",
																							}),
																						}),
																					}),
																				],
																			},
																			j.id,
																		),
																	),
																	x.length > 2 &&
																		t.jsxs("div", {
																			className:
																				"text-xs text-muted-foreground",
																			children: [
																				"+",
																				x.length - 2,
																				" autre(s)",
																			],
																		}),
																],
															}),
														],
													},
													`month-day-${l}`,
												);
											}),
										],
									}),
								t.jsxs("div", {
									className: "mt-4 pt-4 border-t space-y-3",
									children: [
										t.jsx("div", {
											className:
												"flex items-center justify-between text-sm text-muted-foreground",
											children: t.jsxs("div", {
												className: "flex items-center gap-4",
												children: [
													t.jsx("span", {
														className: "font-medium text-foreground",
														children: "Statuts :",
													}),
													t.jsxs("div", {
														className: "flex items-center gap-1",
														children: [
															t.jsx("div", {
																className:
																	"w-3 h-3 rounded bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800",
															}),
															t.jsx("span", { children: "En attente" }),
														],
													}),
													t.jsxs("div", {
														className: "flex items-center gap-1",
														children: [
															t.jsx("div", {
																className:
																	"w-3 h-3 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800",
															}),
															t.jsx("span", { children: "Confirmée" }),
														],
													}),
													t.jsxs("div", {
														className: "flex items-center gap-1",
														children: [
															t.jsx("div", {
																className:
																	"w-3 h-3 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800",
															}),
															t.jsx("span", { children: "Annulée" }),
														],
													}),
												],
											}),
										}),
										t.jsx("div", {
											className:
												"flex items-center justify-between text-sm text-muted-foreground",
											children: t.jsxs("div", {
												className: "flex items-center gap-4",
												children: [
													t.jsx("span", {
														className: "font-medium text-foreground",
														children: "Disponibilités :",
													}),
													t.jsxs("div", {
														className: "flex items-center gap-1",
														children: [
															t.jsx("div", {
																className:
																	"w-3 h-3 rounded bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800",
															}),
															t.jsx("span", { children: "Heures d'ouverture" }),
														],
													}),
													t.jsxs("div", {
														className: "flex items-center gap-1",
														children: [
															t.jsx("div", {
																className:
																	"w-3 h-3 rounded bg-muted border border-border",
															}),
															t.jsx("span", { children: "Fermé" }),
														],
													}),
													t.jsxs("div", {
														className: "flex items-center gap-1",
														children: [
															t.jsx("div", {
																className:
																	"w-3 h-3 rounded bg-primary/30 border border-primary",
															}),
															t.jsx("span", { children: "Maintenant" }),
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
function Re(o) {
	const e = le.c(68),
		{ room: s, complex: a } = o;
	let d;
	e[0] !== s.name
		? ((d = t.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: s.name,
			})),
			(e[0] = s.name),
			(e[1] = d))
		: (d = e[1]);
	let k;
	e[2] !== a.name
		? ((k = t.jsxs("p", {
				className: "text-muted-foreground",
				children: [
					"Salle du complexe :",
					" ",
					t.jsx("span", { className: "font-medium", children: a.name }),
				],
			})),
			(e[2] = a.name),
			(e[3] = k))
		: (k = e[3]);
	let b;
	e[4] !== s.description
		? ((b = t.jsx("p", {
				className: "text-muted-foreground",
				children: t.jsx("span", {
					className: "font-medium",
					children: s.description,
				}),
			})),
			(e[4] = s.description),
			(e[5] = b))
		: (b = e[5]);
	let M;
	e[6] !== d || e[7] !== k || e[8] !== b
		? ((M = t.jsxs("div", { children: [d, k, b] })),
			(e[6] = d),
			(e[7] = k),
			(e[8] = b),
			(e[9] = M))
		: (M = e[9]);
	let T;
	e[10] !== a.id
		? ((T = { complexId: a.id }), (e[10] = a.id), (e[11] = T))
		: (T = e[11]);
	let P;
	e[12] === Symbol.for("react.memo_cache_sentinel")
		? ((P = t.jsx(je, { className: "w-4 h-4 mr-2" })), (e[12] = P))
		: (P = e[12]);
	let _;
	e[13] !== T
		? ((_ = t.jsx(C, {
				asChild: !0,
				variant: "outline",
				size: "sm",
				children: t.jsxs(G, {
					to: "/admin/facilities/complexes/$complexId",
					params: T,
					children: [P, "Retour au complexe"],
				}),
			})),
			(e[13] = T),
			(e[14] = _))
		: (_ = e[14]);
	let v;
	e[15] !== s.id
		? ((v = { roomId: s.id }), (e[15] = s.id), (e[16] = v))
		: (v = e[16]);
	let h;
	e[17] === Symbol.for("react.memo_cache_sentinel")
		? ((h = t.jsx(be, { className: "w-4 h-4 mr-2" })), (e[17] = h))
		: (h = e[17]);
	let D;
	e[18] !== v
		? ((D = t.jsx(C, {
				asChild: !0,
				variant: "default",
				size: "sm",
				children: t.jsxs(G, {
					to: "/admin/facilities/rooms/$roomId/create-reservation",
					params: v,
					children: [h, "Réserver la salle"],
				}),
			})),
			(e[18] = v),
			(e[19] = D))
		: (D = e[19]);
	let R;
	e[20] !== s.id
		? ((R = { roomId: s.id }), (e[20] = s.id), (e[21] = R))
		: (R = e[21]);
	let F;
	e[22] === Symbol.for("react.memo_cache_sentinel")
		? ((F = t.jsx(ye, { className: "w-4 h-4 mr-2" })), (e[22] = F))
		: (F = e[22]);
	let H;
	e[23] !== R
		? ((H = t.jsx(C, {
				asChild: !0,
				variant: "default",
				size: "sm",
				children: t.jsxs(G, {
					to: "/admin/facilities/rooms/$roomId/edit",
					params: R,
					children: [F, "Modifier"],
				}),
			})),
			(e[23] = R),
			(e[24] = H))
		: (H = e[24]);
	let S;
	e[25] !== D || e[26] !== H || e[27] !== _
		? ((S = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [_, D, H],
			})),
			(e[25] = D),
			(e[26] = H),
			(e[27] = _),
			(e[28] = S))
		: (S = e[28]);
	let I;
	e[29] !== S || e[30] !== M
		? ((I = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [M, S],
			})),
			(e[29] = S),
			(e[30] = M),
			(e[31] = I))
		: (I = e[31]);
	let E;
	e[32] === Symbol.for("react.memo_cache_sentinel")
		? ((E = t.jsxs(U, {
				children: [
					t.jsxs(V, {
						className: "flex items-center gap-2",
						children: [
							t.jsx(Ne, { className: "w-5 h-5 text-muted-foreground" }),
							"Détails de la salle",
						],
					}),
					t.jsx(oe, { children: "Informations principales" }),
				],
			})),
			(e[32] = E))
		: (E = e[32]);
	let z;
	e[33] === Symbol.for("react.memo_cache_sentinel")
		? ((z = t.jsx("strong", { children: "Sport :" })), (e[33] = z))
		: (z = e[33]);
	let A;
	e[34] !== s.sportType
		? ((A = t.jsxs("li", {
				children: [
					z,
					" ",
					t.jsx("span", { className: "font-medium", children: s.sportType }),
				],
			})),
			(e[34] = s.sportType),
			(e[35] = A))
		: (A = e[35]);
	let r;
	e[36] === Symbol.for("react.memo_cache_sentinel")
		? ((r = t.jsx("strong", { children: "Capacité :" })), (e[36] = r))
		: (r = e[36]);
	let i;
	e[37] !== s.capacity
		? ((i = t.jsxs("li", {
				children: [
					r,
					" ",
					t.jsxs("span", {
						className: "font-medium",
						children: [s.capacity, " personnes"],
					}),
				],
			})),
			(e[37] = s.capacity),
			(e[38] = i))
		: (i = e[38]);
	let n;
	e[39] === Symbol.for("react.memo_cache_sentinel")
		? ((n = t.jsx("strong", { children: "Intérieure :" })), (e[39] = n))
		: (n = e[39]);
	const m = s.isIndoor ? "Oui" : "Non";
	let g;
	e[40] !== m
		? ((g = t.jsxs("li", {
				children: [
					n,
					" ",
					t.jsx("span", { className: "font-medium", children: m }),
				],
			})),
			(e[40] = m),
			(e[41] = g))
		: (g = e[41]);
	let c;
	e[42] === Symbol.for("react.memo_cache_sentinel")
		? ((c = t.jsx("strong", { children: "Accréditation :" })), (e[42] = c))
		: (c = e[42]);
	const l = s.accreditation || "Aucune";
	let x;
	e[43] !== l
		? ((x = t.jsxs("li", {
				children: [
					c,
					" ",
					t.jsx("span", { className: "font-medium", children: l }),
				],
			})),
			(e[43] = l),
			(e[44] = x))
		: (x = e[44]);
	let p;
	e[45] !== A || e[46] !== i || e[47] !== g || e[48] !== x
		? ((p = t.jsxs(Y, {
				children: [
					E,
					t.jsx(W, {
						children: t.jsxs("ul", {
							className: "space-y-2 text-sm text-muted-foreground",
							children: [A, i, g, x],
						}),
					}),
				],
			})),
			(e[45] = A),
			(e[46] = i),
			(e[47] = g),
			(e[48] = x),
			(e[49] = p))
		: (p = e[49]);
	let L;
	e[50] === Symbol.for("react.memo_cache_sentinel")
		? ((L = t.jsx(U, {
				children: t.jsxs(V, {
					className: "flex items-center gap-2",
					children: [
						t.jsx(ve, { className: "w-4 h-4" }),
						"Horaires d'ouverture",
					],
				}),
			})),
			(e[50] = L))
		: (L = e[50]);
	let f;
	e[51] !== s.openingHours
		? ((f = Object.entries(ue).map((y) => {
				const [q, Q] = y,
					N = s.openingHours[q];
				return t.jsxs(
					"div",
					{
						className: "p-3 border rounded-lg text-center",
						children: [
							t.jsx("h4", { className: "text-sm font-medium", children: Q }),
							N != null && N.closed
								? t.jsx(ee, {
										variant: "secondary",
										className: "text-xs bg-gray-100 text-gray-600 mt-1",
										children: "Fermé",
									})
								: t.jsxs("div", {
										className: "mt-1 space-y-1",
										children: [
											t.jsx(ee, {
												variant: "default",
												className: "text-xs bg-green-100 text-green-800",
												children: "Ouvert",
											}),
											(N == null ? void 0 : N.open) &&
												(N == null ? void 0 : N.close) &&
												t.jsxs("p", {
													className: "text-xs text-muted-foreground",
													children: [N.open, " - ", N.close],
												}),
										],
									}),
						],
					},
					q,
				);
			})),
			(e[51] = s.openingHours),
			(e[52] = f))
		: (f = e[52]);
	let j;
	e[53] !== f
		? ((j = t.jsx("div", {
				className: "grid gap-2 md:grid-cols-2 lg:grid-cols-7",
				children: f,
			})),
			(e[53] = f),
			(e[54] = j))
		: (j = e[54]);
	const B = Object.values(s.openingHours).some(Se)
		? "La salle est fermé certains jours"
		: "Ouvert tous les jours";
	let u;
	e[55] !== B
		? ((u = t.jsx("p", {
				className: "text-xs text-muted-foreground mt-4 text-center",
				children: B,
			})),
			(e[55] = B),
			(e[56] = u))
		: (u = e[56]);
	let $;
	e[57] !== j || e[58] !== u
		? (($ = t.jsxs(Y, { children: [L, t.jsxs(W, { children: [j, u] })] })),
			(e[57] = j),
			(e[58] = u),
			(e[59] = $))
		: ($ = e[59]);
	let O;
	e[60] !== s.id || e[61] !== s.openingHours
		? ((O = t.jsx(De, { roomId: s.id, roomOpeningHours: s.openingHours })),
			(e[60] = s.id),
			(e[61] = s.openingHours),
			(e[62] = O))
		: (O = e[62]);
	let w;
	return (
		e[63] !== I || e[64] !== p || e[65] !== $ || e[66] !== O
			? ((w = t.jsxs("div", {
					className: "space-y-6",
					children: [I, p, $, O],
				})),
				(e[63] = I),
				(e[64] = p),
				(e[65] = $),
				(e[66] = O),
				(e[67] = w))
			: (w = e[67]),
		w
	);
}
function Se(o) {
	return o == null ? void 0 : o.closed;
}
const Pe = () => {
	const e = le.c(3),
		{ room: s, complex: a } = he.useLoaderData();
	let d;
	return (
		e[0] !== a || e[1] !== s
			? ((d = t.jsx(Re, { room: s, complex: a })),
				(e[0] = a),
				(e[1] = s),
				(e[2] = d))
			: (d = e[2]),
		d
	);
};
export { Pe as component };
