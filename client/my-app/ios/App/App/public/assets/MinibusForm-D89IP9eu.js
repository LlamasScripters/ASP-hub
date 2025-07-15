import { C as Z } from "./checkbox-DT5FljqG.js";
import { u as le } from "./index-8ZKmGdXm.js";
import { P as T } from "./index-Bv1xjdPd.js";
import { c as te } from "./index-DauBq6FI.js";
import { c as ae, u as re } from "./index-Dqr9Wf5M.js";
import {
	l as E,
	B as F,
	C as G,
	H as I,
	b as J,
	f as Q,
	c as U,
	bK as V,
	bL as W,
	e as X,
	bM as Y,
	j as e,
	r as j,
	bC as z,
} from "./index-kb-Ylywn.js";
import { u as oe } from "./index-mnH6Jux_.js";
import { I as ce } from "./info-hEQo0LXU.js";
import { I as N } from "./input-CdkcPZS3.js";
import { L as de } from "./loader-circle-Bxgg9gFD.js";
import { S as R } from "./separator-DDNy3jpa.js";
import { T as ne } from "./textarea-CTVCAbGX.js";
import { T as ie } from "./timer-l0uyiV2G.js";
import {
	c as C,
	u as K,
	f as M,
	s as ee,
	d as f,
	a as se,
	b as u,
	F as x,
	e as y,
} from "./zod-B5AhSGj5.js";
var P = "Switch",
	[pe, Re] = te(P),
	[me, he] = pe(P),
	B = j.forwardRef((s, i) => {
		const {
				__scopeSwitch: r,
				name: n,
				checked: o,
				defaultChecked: d,
				required: p,
				disabled: c,
				value: b = "on",
				onCheckedChange: h,
				form: t,
				...v
			} = s,
			[w, a] = j.useState(null),
			l = I(i, (k) => a(k)),
			g = j.useRef(!1),
			m = w ? t || !!w.closest("form") : !0,
			[S, q] = re({ prop: o, defaultProp: d ?? !1, onChange: h, caller: P });
		return e.jsxs(me, {
			scope: r,
			checked: S,
			disabled: c,
			children: [
				e.jsx(T.button, {
					type: "button",
					role: "switch",
					"aria-checked": S,
					"aria-required": p,
					"data-state": L(S),
					"data-disabled": c ? "" : void 0,
					disabled: c,
					value: b,
					...v,
					ref: l,
					onClick: ae(s.onClick, (k) => {
						q((O) => !O),
							m &&
								((g.current = k.isPropagationStopped()),
								g.current || k.stopPropagation());
					}),
				}),
				m &&
					e.jsx(H, {
						control: w,
						bubbles: !g.current,
						name: n,
						value: b,
						checked: S,
						required: p,
						disabled: c,
						form: t,
						style: { transform: "translateX(-100%)" },
					}),
			],
		});
	});
B.displayName = P;
var D = "SwitchThumb",
	A = j.forwardRef((s, i) => {
		const { __scopeSwitch: r, ...n } = s,
			o = he(D, r);
		return e.jsx(T.span, {
			"data-state": L(o.checked),
			"data-disabled": o.disabled ? "" : void 0,
			...n,
			ref: i,
		});
	});
A.displayName = D;
var xe = "SwitchBubbleInput",
	H = j.forwardRef(
		(
			{ __scopeSwitch: s, control: i, checked: r, bubbles: n = !0, ...o },
			d,
		) => {
			const p = j.useRef(null),
				c = I(p, d),
				b = oe(r),
				h = le(i);
			return (
				j.useEffect(() => {
					const t = p.current;
					if (!t) return;
					const v = window.HTMLInputElement.prototype,
						a = Object.getOwnPropertyDescriptor(v, "checked").set;
					if (b !== r && a) {
						const l = new Event("click", { bubbles: n });
						a.call(t, r), t.dispatchEvent(l);
					}
				}, [b, r, n]),
				e.jsx("input", {
					type: "checkbox",
					"aria-hidden": !0,
					defaultChecked: r,
					...o,
					tabIndex: -1,
					ref: c,
					style: {
						...o.style,
						...h,
						position: "absolute",
						pointerEvents: "none",
						opacity: 0,
						margin: 0,
					},
				})
			);
		},
	);
H.displayName = xe;
function L(s) {
	return s ? "checked" : "unchecked";
}
var _ = B,
	ue = A;
const $ = j.forwardRef((s, i) => {
	const r = U.c(10);
	let n, o;
	r[0] !== s
		? (({ className: n, ...o } = s), (r[0] = s), (r[1] = n), (r[2] = o))
		: ((n = r[1]), (o = r[2]));
	let d;
	r[3] !== n
		? ((d = E(
				"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
				n,
			)),
			(r[3] = n),
			(r[4] = d))
		: (d = r[4]);
	let p;
	r[5] === Symbol.for("react.memo_cache_sentinel")
		? ((p = e.jsx(ue, {
				className: E(
					"pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
				),
			})),
			(r[5] = p))
		: (p = r[5]);
	let c;
	return (
		r[6] !== o || r[7] !== i || r[8] !== d
			? ((c = e.jsx(_, { className: d, ...o, ref: i, children: p })),
				(r[6] = o),
				(r[7] = i),
				(r[8] = d),
				(r[9] = c))
			: (c = r[9]),
		c
	);
});
$.displayName = _.displayName;
const fe = {
	monday: { open: null, close: null, available: !1 },
	tuesday: { open: null, close: null, available: !1 },
	wednesday: { open: "06:00", close: "20:00", available: !0 },
	thursday: { open: null, close: null, available: !1 },
	friday: { open: null, close: null, available: !1 },
	saturday: { open: "06:00", close: "20:00", available: !0 },
	sunday: { open: "06:00", close: "20:00", available: !0 },
};
function Ie({
	minibus: s,
	onSuccess: i,
	onCancelLink: r,
	searchParams: n,
	navigate: o,
}) {
	const { createMinibus: d, updateMinibus: p } = z({
			searchParams: n,
			navigate: o,
		}),
		[c, b] = j.useState(!1),
		h = !!s,
		t = K({
			resolver: ee(h ? V : W),
			defaultValues: {
				name: (s == null ? void 0 : s.name) || "",
				description: (s == null ? void 0 : s.description) || "",
				licensePlate: (s == null ? void 0 : s.licensePlate) || "",
				capacity: (s == null ? void 0 : s.capacity) || 8,
				disabledPersonCapacity:
					(s == null ? void 0 : s.disabledPersonCapacity) || 0,
				disponibility: (s == null ? void 0 : s.disponibility) || fe,
				isAvailable: (s == null ? void 0 : s.isAvailable) ?? !0,
			},
		}),
		v = t.watch("disponibility"),
		w = async (a) => {
			b(!0);
			try {
				let l = null;
				h && s ? (l = await p(s.id, a)) : (l = await d(a)),
					l && (i == null || i(l), h || t.reset());
			} catch (l) {
				console.error("Form submission error:", l);
			} finally {
				b(!1);
			}
		};
	return e.jsxs(X, {
		className: "w-full max-w-2xl mx-auto",
		children: [
			e.jsx(G, {
				children: e.jsx(J, {
					className: "flex items-center gap-2",
					children: h ? "Formulaire d'édition" : "Formulaire de création",
				}),
			}),
			e.jsx(Q, {
				children: e.jsx(se, {
					...t,
					children: e.jsxs("form", {
						onSubmit: t.handleSubmit(w),
						className: "space-y-6",
						children: [
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											e.jsx(ce, { className: "w-4 h-4 text-muted-foreground" }),
											e.jsx("h3", {
												className: "text-lg font-medium",
												children: "Informations générales",
											}),
										],
									}),
									e.jsxs("div", {
										className: "grid gap-4 md:grid-cols-2",
										children: [
											e.jsx(x, {
												control: t.control,
												name: "name",
												render: ({ field: a }) =>
													e.jsxs(u, {
														children: [
															e.jsx(C, { children: "Nom du minibus *" }),
															e.jsx(f, {
																children: e.jsx(N, {
																	placeholder: "Ex: Minibus ASP 01",
																	...a,
																}),
															}),
															e.jsx(y, {}),
														],
													}),
											}),
											e.jsx(x, {
												control: t.control,
												name: "licensePlate",
												render: ({ field: a }) =>
													e.jsxs(u, {
														children: [
															e.jsx(C, {
																children: "Plaque d'immatriculation *",
															}),
															e.jsx(f, {
																children: e.jsx(N, {
																	placeholder: "Ex: AB-123-CD",
																	...a,
																}),
															}),
															e.jsx(y, {}),
														],
													}),
											}),
										],
									}),
									e.jsx(x, {
										control: t.control,
										name: "description",
										render: ({ field: a }) =>
											e.jsxs(u, {
												children: [
													e.jsx(C, { children: "Description" }),
													e.jsx(f, {
														children: e.jsx(ne, {
															placeholder: "Description du minibus...",
															rows: 3,
															...a,
														}),
													}),
													e.jsx(M, {
														children:
															"Description optionnelle du minibus (500 caractères maximum)",
													}),
													e.jsx(y, {}),
												],
											}),
									}),
									e.jsxs("div", {
										className: "grid gap-4 md:grid-cols-3",
										children: [
											e.jsx(x, {
												control: t.control,
												name: "capacity",
												render: ({ field: a }) =>
													e.jsxs(u, {
														children: [
															e.jsx(C, { children: "Capacité totale *" }),
															e.jsx(f, {
																children: e.jsx(N, {
																	type: "number",
																	min: "1",
																	...a,
																	onChange: (l) =>
																		a.onChange(Number(l.target.value)),
																}),
															}),
															e.jsx(y, {}),
														],
													}),
											}),
											e.jsx(x, {
												control: t.control,
												name: "disabledPersonCapacity",
												render: ({ field: a }) =>
													e.jsxs(u, {
														children: [
															e.jsx(C, { children: "Places PMR" }),
															e.jsx(f, {
																children: e.jsx(N, {
																	type: "number",
																	min: "0",
																	...a,
																	onChange: (l) =>
																		a.onChange(Number(l.target.value)),
																}),
															}),
															e.jsx(M, {
																children:
																	"Nombre de places pour personnes à mobilité réduite",
															}),
															e.jsx(y, {}),
														],
													}),
											}),
											e.jsx(x, {
												control: t.control,
												name: "isAvailable",
												render: ({ field: a }) =>
													e.jsxs(u, {
														className:
															"flex flex-row items-center justify-between rounded-lg border p-3",
														children: [
															e.jsxs("div", {
																className: "space-y-0.5",
																children: [
																	e.jsx(C, { children: "Disponible" }),
																	e.jsx(M, {
																		children:
																			"Le minibus est-il disponible pour les réservations ?",
																	}),
																],
															}),
															e.jsx(f, {
																children: e.jsx($, {
																	checked: a.value,
																	onCheckedChange: a.onChange,
																}),
															}),
														],
													}),
											}),
										],
									}),
								],
							}),
							e.jsx(R, {}),
							e.jsxs("div", {
								className: "space-y-4",
								children: [
									e.jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											e.jsx(ie, { className: "w-4 h-4 text-muted-foreground" }),
											e.jsx("h3", {
												className: "text-lg font-medium",
												children: "Disponibilités",
											}),
										],
									}),
									e.jsx("div", {
										className: "grid gap-4",
										children: Object.entries(Y).map(([a, l]) => {
											const g = v == null ? void 0 : v[a];
											return e.jsxs(
												"div",
												{
													className:
														"flex items-center gap-4 p-3 border rounded-lg",
													children: [
														e.jsx("div", {
															className: "w-20 text-sm font-medium",
															children: l,
														}),
														e.jsx(x, {
															control: t.control,
															name: `disponibility.${a}.available`,
															render: ({ field: m }) =>
																e.jsxs(u, {
																	className:
																		"flex flex-row items-center space-x-2 space-y-0",
																	children: [
																		e.jsx(f, {
																			children: e.jsx(Z, {
																				checked: !!m.value,
																				onCheckedChange: m.onChange,
																			}),
																		}),
																		e.jsx(C, {
																			className: "text-sm",
																			children: "Disponible",
																		}),
																	],
																}),
														}),
														(g == null ? void 0 : g.available) &&
															e.jsxs(e.Fragment, {
																children: [
																	e.jsx(x, {
																		control: t.control,
																		name: `disponibility.${a}.open`,
																		render: ({ field: m }) =>
																			e.jsx(u, {
																				children: e.jsx(f, {
																					children: e.jsx(N, {
																						type: "time",
																						...m,
																						value: String(m.value || ""),
																						className: "w-32",
																					}),
																				}),
																			}),
																	}),
																	e.jsx("span", {
																		className: "text-sm text-muted-foreground",
																		children: "à",
																	}),
																	e.jsx(x, {
																		control: t.control,
																		name: `disponibility.${a}.close`,
																		render: ({ field: m }) =>
																			e.jsx(u, {
																				children: e.jsx(f, {
																					children: e.jsx(N, {
																						type: "time",
																						...m,
																						value: String(m.value || ""),
																						className: "w-32",
																					}),
																				}),
																			}),
																	}),
																],
															}),
													],
												},
												a,
											);
										}),
									}),
								],
							}),
							e.jsx(R, {}),
							e.jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									r &&
										e.jsx(F, {
											type: "button",
											variant: "outline",
											asChild: !0,
											children: e.jsx("a", { href: r, children: "Annuler" }),
										}),
									e.jsxs(F, {
										type: "submit",
										disabled: c,
										className: "flex-1",
										children: [
											c &&
												e.jsx(de, { className: "w-4 h-4 mr-2 animate-spin" }),
											h ? "Modifier" : "Créer",
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
export { Ie as M };
