import { A as pe } from "./arrow-left-DMyOJown.js";
import { F as ue } from "./file-text-Dzq0McNO.js";
import { F as de } from "./folder-open-Bjf3vPky.js";
import {
	s as A,
	B as H,
	i as I,
	l as K,
	e as Q,
	f as W,
	c as Z,
	C as ee,
	d as re,
	j as s,
	b as se,
	o as te,
	t as v,
	r as x,
} from "./index-kb-Ylywn.js";
import { I as G } from "./input-CdkcPZS3.js";
import { L as X } from "./loader-circle-Bxgg9gFD.js";
import { P as Y } from "./palette-D-QMsnM0.js";
import { P as ce, a as ie, b as le } from "./popover-DyNr3sDf.js";
import { S as fe } from "./save-TX27fQkL.js";
import { T as me } from "./textarea-CTVCAbGX.js";
import {
	b as B,
	F as D,
	e as J,
	c as R,
	d as V,
	u as ae,
	a as ne,
	s as oe,
	f as q,
} from "./zod-B5AhSGj5.js";
const he = [
	"#ef4444",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#06b6d4",
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#6b7280",
	"#1f2937",
	"#7c3aed",
	"#059669",
];
function xe(n) {
	const e = Z.c(45),
		{ value: f, onChange: a, className: N } = n,
		p = f === void 0 ? "#3b82f6" : f,
		[S, h] = x.useState(!1),
		[c, C] = x.useState(p);
	let b, w;
	e[0] !== p
		? ((b = () => {
				C(p);
			}),
			(w = [p]),
			(e[0] = p),
			(e[1] = b),
			(e[2] = w))
		: ((b = e[1]), (w = e[2])),
		x.useEffect(b, w);
	let i;
	e[3] !== a
		? ((i = (g) => {
				C(g), a(g), h(!1);
			}),
			(e[3] = a),
			(e[4] = i))
		: (i = e[4]);
	const r = i;
	let o;
	e[5] !== a
		? ((o = (g) => {
				const U = g.target.value;
				C(U), /^#[0-9a-fA-F]{6}$/.test(U) && a(U);
			}),
			(e[5] = a),
			(e[6] = o))
		: (o = e[6]);
	const m = o,
		t = !p && "text-muted-foreground";
	let l;
	e[7] !== N || e[8] !== t
		? ((l = K("w-full justify-start text-left font-normal", t, N)),
			(e[7] = N),
			(e[8] = t),
			(e[9] = l))
		: (l = e[9]);
	let j, d;
	e[10] !== c
		? ((j = s.jsx("div", {
				className: "h-4 w-4 rounded border border-border",
				style: { backgroundColor: c },
			})),
			(d = s.jsx("span", { children: c })),
			(e[10] = c),
			(e[11] = j),
			(e[12] = d))
		: ((j = e[11]), (d = e[12]));
	let y;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((y = s.jsx(Y, { className: "ml-auto h-4 w-4" })), (e[13] = y))
		: (y = e[13]);
	let u;
	e[14] !== j || e[15] !== d
		? ((u = s.jsxs("div", {
				className: "flex items-center gap-2",
				children: [j, d, y],
			})),
			(e[14] = j),
			(e[15] = d),
			(e[16] = u))
		: (u = e[16]);
	let E;
	e[17] !== u || e[18] !== l
		? ((E = s.jsx(ce, {
				asChild: !0,
				children: s.jsx(H, { variant: "outline", className: l, children: u }),
			})),
			(e[17] = u),
			(e[18] = l),
			(e[19] = E))
		: (E = e[19]);
	let P;
	e[20] === Symbol.for("react.memo_cache_sentinel")
		? ((P = s.jsx("label", {
				className: "text-sm font-medium text-foreground mb-2 block",
				children: "Couleurs prédéfinies",
			})),
			(e[20] = P))
		: (P = e[20]);
	let F;
	e[21] !== r || e[22] !== c
		? ((F = he.map((g) =>
				s.jsx(
					"button",
					{
						type: "button",
						className: K(
							"h-8 w-8 rounded border-2 border-border hover:scale-110 transition-transform",
							c === g &&
								"ring-2 ring-primary ring-offset-2 ring-offset-background",
						),
						style: { backgroundColor: g },
						onClick: () => r(g),
					},
					g,
				),
			)),
			(e[21] = r),
			(e[22] = c),
			(e[23] = F))
		: (F = e[23]);
	let L;
	e[24] !== F
		? ((L = s.jsxs("div", {
				children: [
					P,
					s.jsx("div", { className: "grid grid-cols-6 gap-2", children: F }),
				],
			})),
			(e[24] = F),
			(e[25] = L))
		: (L = e[25]);
	let O;
	e[26] === Symbol.for("react.memo_cache_sentinel")
		? ((O = s.jsx("label", {
				className: "text-sm font-medium text-foreground",
				children: "Couleur personnalisée",
			})),
			(e[26] = O))
		: (O = e[26]);
	let k;
	e[27] !== r
		? ((k = (g) => r(g.target.value)), (e[27] = r), (e[28] = k))
		: (k = e[28]);
	let T;
	e[29] !== c || e[30] !== k
		? ((T = s.jsx(G, {
				type: "color",
				value: c,
				onChange: k,
				className: "w-12 h-10 p-0 border-0 rounded cursor-pointer",
			})),
			(e[29] = c),
			(e[30] = k),
			(e[31] = T))
		: (T = e[31]);
	let _;
	e[32] !== m || e[33] !== c
		? ((_ = s.jsx(G, {
				type: "text",
				value: c,
				onChange: m,
				placeholder: "#000000",
				className: "flex-1",
			})),
			(e[32] = m),
			(e[33] = c),
			(e[34] = _))
		: (_ = e[34]);
	let $;
	e[35] !== T || e[36] !== _
		? (($ = s.jsxs("div", {
				className: "space-y-2",
				children: [
					O,
					s.jsxs("div", { className: "flex gap-2", children: [T, _] }),
				],
			})),
			(e[35] = T),
			(e[36] = _),
			(e[37] = $))
		: ($ = e[37]);
	let z;
	e[38] !== L || e[39] !== $
		? ((z = s.jsx(ie, {
				className: "w-64 p-3",
				align: "start",
				children: s.jsxs("div", { className: "space-y-3", children: [L, $] }),
			})),
			(e[38] = L),
			(e[39] = $),
			(e[40] = z))
		: (z = e[40]);
	let M;
	return (
		e[41] !== S || e[42] !== E || e[43] !== z
			? ((M = s.jsxs(le, { open: S, onOpenChange: h, children: [E, z] })),
				(e[41] = S),
				(e[42] = E),
				(e[43] = z),
				(e[44] = M))
			: (M = e[44]),
		M
	);
}
function je({ clubId: n, initialData: e = [] }) {
	const [f, a] = x.useState(e),
		[N, p] = x.useState(!1),
		[S, h] = x.useState(null),
		c = x.useCallback(async () => {
			p(!0), h(null);
			try {
				const i = await fetch(`/api/clubs/${n}/sections`);
				if (!i.ok) throw new Error("Erreur lors du chargement des sections");
				const r = await i.json();
				a(r);
			} catch (i) {
				const r = i instanceof Error ? i.message : "Erreur inconnue";
				h(r), v.error(r);
			} finally {
				p(!1);
			}
		}, [n]),
		C = x.useCallback(
			async (i) => {
				h(null);
				try {
					const r = await fetch(`/api/clubs/${n}/sections`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ ...i, clubId: n }),
					});
					if (!r.ok)
						throw new Error("Erreur lors de la création de la section");
					const o = await r.json();
					return a((m) => [...m, o]), v.success("Section créée avec succès"), o;
				} catch (r) {
					const o =
						r instanceof Error ? r.message : "Erreur lors de la création";
					return h(o), v.error(o), null;
				}
			},
			[n],
		),
		b = x.useCallback(
			async (i, r) => {
				h(null);
				try {
					const o = await fetch(`/api/clubs/${n}/sections/${i}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(r),
					});
					if (!o.ok)
						throw new Error("Erreur lors de la modification de la section");
					const m = await o.json();
					return (
						a((t) => t.map((l) => (l.id === i ? m : l))),
						v.success("Section modifiée avec succès"),
						m
					);
				} catch (o) {
					const m =
						o instanceof Error ? o.message : "Erreur lors de la modification";
					return h(m), v.error(m), null;
				}
			},
			[n],
		),
		w = x.useCallback(
			async (i) => {
				h(null);
				try {
					if (
						!(
							await fetch(`/api/clubs/${n}/sections/${i}`, { method: "DELETE" })
						).ok
					)
						throw new Error("Erreur lors de la suppression de la section");
					return (
						a((o) => o.filter((m) => m.id !== i)),
						v.success("Section supprimée avec succès"),
						!0
					);
				} catch (r) {
					const o =
						r instanceof Error ? r.message : "Erreur lors de la suppression";
					return h(o), v.error(o), !1;
				}
			},
			[n],
		);
	return {
		sections: f,
		loading: N,
		error: S,
		createSection: C,
		updateSection: b,
		deleteSection: w,
		refresh: c,
	};
}
function ke({ mode: n, clubId: e, sectionId: f, section: a }) {
	const N = I(),
		{ sections: p, createSection: S, updateSection: h } = je({ clubId: e }),
		[c, C] = x.useState(!1),
		b = n === "edit",
		i = ((t, l) =>
			te({
				name: A()
					.min(1, "Le nom est requis")
					.max(100, "Le nom ne peut pas dépasser 100 caractères")
					.refine((j) => {
						const d = j.trim().toLowerCase();
						return !t.find(
							(u) => u.name.trim().toLowerCase() === d && u.id !== l,
						);
					}, "Une section avec ce nom existe déjà"),
				description: A().optional(),
				color: A()
					.regex(
						/^#[0-9a-fA-F]{6}$/,
						"La couleur doit être au format hexadécimal (#000000)",
					)
					.optional(),
			}))(p, f),
		r = ae({
			resolver: oe(i),
			defaultValues: {
				name: (a == null ? void 0 : a.name) || "",
				description: (a == null ? void 0 : a.description) || "",
				color: (a == null ? void 0 : a.color) || "#3b82f6",
			},
		});
	x.useEffect(() => {
		b &&
			f &&
			!a &&
			(C(!0),
			fetch(`/api/clubs/${e}/sections/${f}`)
				.then((t) => {
					if (!t.ok) throw new Error("Erreur lors du chargement de la section");
					return t.json();
				})
				.then((t) => {
					r.reset({
						name: t.name || "",
						description: t.description || "",
						color: t.color || "#3b82f6",
					});
				})
				.catch((t) => {
					console.error("Erreur:", t),
						v.error("Erreur lors du chargement de la section");
				})
				.finally(() => C(!1)));
	}, [b, f, a, e, r]),
		x.useEffect(() => {
			const t = r.watch((l, { name: j }) => {
				if (j === "name" && l.name) {
					const d = l.name.trim().toLowerCase();
					if (p.find((u) => u.name.trim().toLowerCase() === d && u.id !== f))
						r.setError("name", {
							type: "manual",
							message: "Une section avec ce nom existe déjà",
						});
					else {
						const u = r.formState.errors.name;
						u &&
							u.message === "Une section avec ce nom existe déjà" &&
							r.clearErrors("name");
					}
				}
			});
			return () => t.unsubscribe();
		}, [r, p, f]);
	const o = async (t) => {
			const l = t.name.trim().toLowerCase();
			if (p.find((d) => d.name.trim().toLowerCase() === l && d.id !== f)) {
				r.setError("name", {
					type: "manual",
					message: "Une section avec ce nom existe déjà",
				});
				return;
			}
			try {
				n === "create" ? await S({ ...t, clubId: e }) : f && (await h(f, t)),
					v.success(
						n === "create"
							? "Section créée avec succès !"
							: "Section modifiée avec succès !",
					),
					N({
						to: "/admin/dashboard/clubs/$clubId/sections",
						params: { clubId: e },
					});
			} catch (d) {
				console.error("Erreur:", d),
					v.error("Une erreur est survenue lors de la sauvegarde");
			}
		},
		m = () => {
			N({
				to: "/admin/dashboard/clubs/$clubId/sections",
				params: { clubId: e },
			});
		};
	return c && n === "edit"
		? s.jsx("div", {
				className: "container mx-auto p-6 max-w-4xl",
				children: s.jsx(Q, {
					children: s.jsx(W, {
						className: "pt-6",
						children: s.jsxs("div", {
							className: "flex items-center justify-center space-x-2",
							children: [
								s.jsx(X, { className: "h-6 w-6 animate-spin" }),
								s.jsx("span", { children: "Chargement de la section..." }),
							],
						}),
					}),
				}),
			})
		: s.jsx("div", {
				className: "container mx-auto p-4 sm:p-6 max-w-4xl",
				children: s.jsx("div", {
					className: "space-y-6",
					children: s.jsxs(Q, {
						className: "shadow-lg border",
						children: [
							s.jsxs(ee, {
								className: "space-y-1",
								children: [
									s.jsxs(se, {
										className: "text-2xl flex items-center gap-2",
										children: [
											"Formulaire d",
											"",
											n === "create" ? "e création" : "'édition",
											" d'une section",
										],
									}),
									s.jsxs(re, {
										children: [
											"Remplissez les informations ci-dessous pour",
											" ",
											n === "create" ? "créer" : "modifier",
											" votre section.",
										],
									}),
								],
							}),
							s.jsx(W, {
								className: "space-y-6",
								children: s.jsx(ne, {
									...r,
									children: s.jsxs("form", {
										onSubmit: r.handleSubmit(o),
										className: "space-y-6",
										children: [
											s.jsx(D, {
												control: r.control,
												name: "name",
												render: ({ field: t }) =>
													s.jsxs(B, {
														children: [
															s.jsxs(R, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	s.jsx(de, { className: "h-4 w-4" }),
																	"Nom de la section *",
																],
															}),
															s.jsx(V, {
																children: s.jsx(G, {
																	placeholder:
																		"Ex: Football, Basketball, Tennis...",
																	className: "h-11",
																	...t,
																}),
															}),
															s.jsx(q, {
																children:
																	"Choisissez un nom clair et descriptif pour votre section sportive.",
															}),
															s.jsx(J, {}),
														],
													}),
											}),
											s.jsx(D, {
												control: r.control,
												name: "description",
												render: ({ field: t }) =>
													s.jsxs(B, {
														children: [
															s.jsxs(R, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	s.jsx(ue, { className: "h-4 w-4" }),
																	"Description",
																],
															}),
															s.jsx(V, {
																children: s.jsx(me, {
																	placeholder:
																		"Décrivez cette section sportive, ses activités, ses spécificités...",
																	className: "min-h-[100px] resize-vertical",
																	...t,
																}),
															}),
															s.jsx(q, {
																children:
																	"Expliquez brièvement les activités et objectifs de cette section.",
															}),
															s.jsx(J, {}),
														],
													}),
											}),
											s.jsx(D, {
												control: r.control,
												name: "color",
												render: ({ field: t }) =>
													s.jsxs(B, {
														children: [
															s.jsxs(R, {
																className:
																	"text-foreground font-medium flex items-center gap-2",
																children: [
																	s.jsx(Y, { className: "h-4 w-4" }),
																	"Couleur de la section",
																],
															}),
															s.jsx(V, {
																children: s.jsx(xe, {
																	value: t.value,
																	onChange: t.onChange,
																	className: "h-11",
																}),
															}),
															s.jsx(q, {
																children:
																	"Choisissez une couleur pour identifier visuellement cette section dans l'interface.",
															}),
															s.jsx(J, {}),
														],
													}),
											}),
											s.jsxs("div", {
												className: "flex flex-col sm:flex-row gap-3 pt-6",
												children: [
													s.jsx(H, {
														type: "submit",
														disabled: c,
														className:
															"flex items-center gap-2 flex-1 sm:flex-none hover:cursor-pointer hover:opacity-90 transition-opacity",
														children: c
															? s.jsxs(s.Fragment, {
																	children: [
																		s.jsx(X, {
																			className: "h-4 w-4 animate-spin",
																		}),
																		n === "create"
																			? "Création..."
																			: "Modification...",
																	],
																})
															: s.jsxs(s.Fragment, {
																	children: [
																		s.jsx(fe, { className: "h-4 w-4" }),
																		n === "create"
																			? "Créer la section"
																			: "Sauvegarder",
																	],
																}),
													}),
													s.jsxs(H, {
														type: "button",
														variant: "outline",
														onClick: m,
														disabled: c,
														className:
															"flex items-center gap-2 hover:cursor-pointer hover:opacity-90 transition-opacity",
														children: [
															s.jsx(pe, { className: "h-4 w-4" }),
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
				}),
			});
}
export { ke as S };
