import { B as Ze } from "./badge-BAidKpPB.js";
import { C as et } from "./checkbox-DT5FljqG.js";
import {
	B as Ce,
	t as De,
	i as Ge,
	b as Je,
	d as Ke,
	g as Me,
	e as We,
	C as Xe,
	f as Ye,
	r as h,
	c as qe,
	j as t,
} from "./index-kb-Ylywn.js";
import { C as jt } from "./index-mnH6Jux_.js";
import { I as ke } from "./input-CdkcPZS3.js";
import { L as G } from "./label-B9JbzJbC.js";
import { P as Fe } from "./plus-czqh0ZLb.js";
import { b as ct, P as nt, a as ot } from "./popover-DyNr3sDf.js";
import {
	d as Ie,
	b as dt,
	S as ft,
	c as ht,
	a as mt,
} from "./select-D8GIfri3.js";
import {
	c as Ee,
	d as at,
	S as it,
	b as lt,
	e as rt,
	a as st,
	C as tt,
} from "./simple-editor-pChGEfM4.js";
import { b as pt, c as xt } from "./useBlogQueries-VhutstJQ.js";
import { u as ut } from "./useQuery-DObI4S3_.js";
import { X as gt } from "./x-BwQkFnmd.js";
import "./index-DauBq6FI.js";
import "./index-Dqr9Wf5M.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
import "./index-Bv1xjdPd.js";
import "./index-PyBbJ2cN.js";
import "./index-CvBT1pZ2.js";
import "./index-CnLXGm6V.js";
import "./index-Dl_6cIao.js";
import "./dialog-CMg-ysIO.js";
import "./search-CT8NOJQT.js";
import "./index-CDAriSY_.js";
import "./use-mobile-yLXS96or.js";
import "./index-3Axhna2x.js";
import "./index-C6LbJ2-_.js";
import "./chevron-down-CMzABl4R.js";
import "./chevron-up-DyH28r2x.js";
function bt() {
	const e = qe.c(128),
		[n, Oe] = h.useState("");
	let M;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((M = []), (e[0] = M))
		: (M = e[0]);
	const [l, Be] = h.useState(M),
		[m, Re] = h.useState("draft"),
		[o, Ue] = h.useState(""),
		[f, Ve] = h.useState(!0),
		[u, $e] = h.useState(""),
		[Se, Ne] = h.useState(!1),
		[a, ze] = h.useState(""),
		p = Ge(),
		i = pt(),
		{ data: X, isLoading: ye } = xt();
	let J;
	e[1] !== X
		? ((J = X === void 0 ? [] : X), (e[1] = X), (e[2] = J))
		: (J = e[2]);
	const d = J;
	let K;
	e[3] === Symbol.for("react.memo_cache_sentinel")
		? ((K = Me()), (e[3] = K))
		: (K = e[3]);
	const { data: r } = ut(K);
	let W;
	e[4] !== l
		? ((W = (s) => {
				l.find((c) => c.id === s.id) || Be([...l, s]), Ne(!1);
			}),
			(e[4] = l),
			(e[5] = W))
		: (W = e[5]);
	const x = W;
	let Y;
	e[6] !== l
		? ((Y = (s) => {
				Be(l.filter((c) => c.id !== s));
			}),
			(e[6] = l),
			(e[7] = Y))
		: (Y = e[7]);
	const _e = Y;
	let Z;
	e[8] !== x || e[9] !== d || e[10] !== a
		? ((Z = () => {
				if (
					a.trim() &&
					!d.find((s) => s.name.toLowerCase() === a.trim().toLowerCase())
				) {
					const s = {
						id: -Date.now(),
						name: a.trim(),
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						deletedAt: null,
					};
					x(s), ze(""), Ne(!1);
				}
			}),
			(e[8] = x),
			(e[9] = d),
			(e[10] = a),
			(e[11] = Z))
		: (Z = e[11]);
	const we = Z;
	let ee;
	e[12] !== f ||
	e[13] !== o ||
	e[14] !== i ||
	e[15] !== r ||
	e[16] !== u ||
	e[17] !== p ||
	e[18] !== l ||
	e[19] !== m ||
	e[20] !== n
		? ((ee = async (s) => {
				if ((s.preventDefault(), !n.trim() || !o.trim())) {
					De.error("Le titre et le contenu sont obligatoires");
					return;
				}
				if (!r) {
					De.error("Vous devez être connecté pour créer un article");
					return;
				}
				const c = l.map(Ct),
					He = {
						title: n.trim(),
						content: o,
						headerImage: u.trim() || void 0,
						state: m,
						authorId: r.id,
						tags: c,
						commentsEnabled: f,
					};
				try {
					await i.mutateAsync(He), p({ to: "/admin/blog" });
				} catch (Qe) {
					console.error(Qe);
				}
			}),
			(e[12] = f),
			(e[13] = o),
			(e[14] = i),
			(e[15] = r),
			(e[16] = u),
			(e[17] = p),
			(e[18] = l),
			(e[19] = m),
			(e[20] = n),
			(e[21] = ee))
		: (ee = e[21]);
	const Te = ee;
	let te;
	e[22] === Symbol.for("react.memo_cache_sentinel")
		? ((te = t.jsxs(Xe, {
				children: [
					t.jsx(Je, { children: "Créer un article" }),
					t.jsx(Ke, {
						children:
							"Remplissez les champs pour ajouter un nouvel article de blog",
					}),
				],
			})),
			(e[22] = te))
		: (te = e[22]);
	let se;
	e[23] === Symbol.for("react.memo_cache_sentinel")
		? ((se = t.jsx(G, { htmlFor: "title", children: "Titre *" })), (e[23] = se))
		: (se = e[23]);
	let le;
	e[24] === Symbol.for("react.memo_cache_sentinel")
		? ((le = (s) => Oe(s.target.value)), (e[24] = le))
		: (le = e[24]);
	let g;
	e[25] !== n
		? ((g = t.jsxs("div", {
				children: [
					se,
					t.jsx(ke, {
						id: "title",
						value: n,
						onChange: le,
						required: !0,
						placeholder: "Titre de l'article",
						className: "mt-1",
					}),
				],
			})),
			(e[25] = n),
			(e[26] = g))
		: (g = e[26]);
	let ae;
	e[27] === Symbol.for("react.memo_cache_sentinel")
		? ((ae = t.jsx(G, {
				htmlFor: "headerImage",
				children: "Image d'en-tête (URL)",
			})),
			(e[27] = ae))
		: (ae = e[27]);
	let re;
	e[28] === Symbol.for("react.memo_cache_sentinel")
		? ((re = (s) => $e(s.target.value)), (e[28] = re))
		: (re = e[28]);
	let j;
	e[29] !== u
		? ((j = t.jsxs("div", {
				children: [
					ae,
					t.jsx(ke, {
						id: "headerImage",
						value: u,
						onChange: re,
						placeholder: "https://example.com/image.jpg",
						className: "mt-1",
					}),
				],
			})),
			(e[29] = u),
			(e[30] = j))
		: (j = e[30]);
	let ie;
	e[31] === Symbol.for("react.memo_cache_sentinel")
		? ((ie = t.jsx(G, { htmlFor: "tags", children: "Tags" })), (e[31] = ie))
		: (ie = e[31]);
	let b;
	e[32] !== _e || e[33] !== l
		? ((b =
				l.length > 0 &&
				t.jsx("div", {
					className: "flex flex-wrap gap-1",
					children: l.map((s) =>
						t.jsxs(
							Ze,
							{
								variant: "secondary",
								className: "text-xs",
								children: [
									"#",
									s.name,
									t.jsx(Ce, {
										type: "button",
										size: "sm",
										variant: "ghost",
										className: "h-4 w-4 p-0 ml-1 hover:bg-transparent",
										onClick: () => _e(s.id),
										children: t.jsx(gt, { className: "h-3 w-3" }),
									}),
								],
							},
							s.id,
						),
					),
				})),
			(e[32] = _e),
			(e[33] = l),
			(e[34] = b))
		: (b = e[34]);
	let ne;
	e[35] === Symbol.for("react.memo_cache_sentinel")
		? ((ne = t.jsx(Fe, { className: "h-4 w-4 mr-2" })), (e[35] = ne))
		: (ne = e[35]);
	let v;
	e[36] !== ye
		? ((v = t.jsx(nt, {
				asChild: !0,
				children: t.jsxs(Ce, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-8 justify-start",
					disabled: ye,
					children: [ne, "Ajouter un tag"],
				}),
			})),
			(e[36] = ye),
			(e[37] = v))
		: (v = e[37]);
	let C;
	e[38] !== a
		? ((C = t.jsx(at, {
				placeholder: "Rechercher ou créer un tag...",
				value: a,
				onValueChange: ze,
			})),
			(e[38] = a),
			(e[39] = C))
		: (C = e[39]);
	let S;
	e[40] !== x || e[41] !== d || e[42] !== we || e[43] !== a || e[44] !== l
		? ((S = t.jsx(tt, {
				children:
					d.filter(
						(s) =>
							!l.find((c) => c.id === s.id) &&
							s.name.toLowerCase().includes(a.toLowerCase()),
					).length === 0 && a.trim() === ""
						? t.jsx(st, { children: "Aucun tag trouvé." })
						: t.jsxs(lt, {
								children: [
									d
										.filter(
											(s) =>
												!l.find((c) => c.id === s.id) &&
												s.name.toLowerCase().includes(a.toLowerCase()),
										)
										.map((s) =>
											t.jsxs(
												Ee,
												{
													onSelect: () => x(s),
													children: [
														t.jsx(jt, { className: "mr-2 h-4 w-4 opacity-0" }),
														"#",
														s.name,
													],
												},
												s.id,
											),
										),
									a.trim() &&
										!d.find(
											(s) => s.name.toLowerCase() === a.trim().toLowerCase(),
										) &&
										t.jsxs(Ee, {
											onSelect: we,
											children: [
												t.jsx(Fe, { className: "mr-2 h-4 w-4" }),
												'Créer "',
												a.trim(),
												'"',
											],
										}),
								],
							}),
			})),
			(e[40] = x),
			(e[41] = d),
			(e[42] = we),
			(e[43] = a),
			(e[44] = l),
			(e[45] = S))
		: (S = e[45]);
	let N;
	e[46] !== C || e[47] !== S
		? ((N = t.jsx(ot, {
				className: "w-80 p-0",
				align: "start",
				children: t.jsxs(rt, { children: [C, S] }),
			})),
			(e[46] = C),
			(e[47] = S),
			(e[48] = N))
		: (N = e[48]);
	let y;
	e[49] !== v || e[50] !== N || e[51] !== Se
		? ((y = t.jsxs(ct, { open: Se, onOpenChange: Ne, children: [v, N] })),
			(e[49] = v),
			(e[50] = N),
			(e[51] = Se),
			(e[52] = y))
		: (y = e[52]);
	let _;
	e[53] !== b || e[54] !== y
		? ((_ = t.jsxs("div", { className: "mt-1 space-y-2", children: [b, y] })),
			(e[53] = b),
			(e[54] = y),
			(e[55] = _))
		: (_ = e[55]);
	let oe;
	e[56] === Symbol.for("react.memo_cache_sentinel")
		? ((oe = t.jsx("p", {
				className: "text-xs text-muted-foreground mt-1",
				children: "Sélectionnez des tags existants ou créez-en de nouveaux",
			})),
			(e[56] = oe))
		: (oe = e[56]);
	let w;
	e[57] !== _
		? ((w = t.jsxs("div", { children: [ie, _, oe] })), (e[57] = _), (e[58] = w))
		: (w = e[58]);
	let T;
	e[59] !== g || e[60] !== j || e[61] !== w
		? ((T = t.jsxs("div", { className: "space-y-4", children: [g, j, w] })),
			(e[59] = g),
			(e[60] = j),
			(e[61] = w),
			(e[62] = T))
		: (T = e[62]);
	let ce;
	e[63] === Symbol.for("react.memo_cache_sentinel")
		? ((ce = t.jsx(G, { htmlFor: "state", children: "État de publication" })),
			(e[63] = ce))
		: (ce = e[63]);
	let me;
	e[64] === Symbol.for("react.memo_cache_sentinel")
		? ((me = (s) => Re(s)), (e[64] = me))
		: (me = e[64]);
	let de;
	e[65] === Symbol.for("react.memo_cache_sentinel")
		? ((de = t.jsx(mt, {
				id: "state",
				className: "mt-1",
				children: t.jsx(dt, { placeholder: "Choisir l'état" }),
			})),
			(e[65] = de))
		: (de = e[65]);
	let he;
	e[66] === Symbol.for("react.memo_cache_sentinel")
		? ((he = t.jsx(Ie, {
				value: "draft",
				children: t.jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						t.jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }),
						"Brouillon",
					],
				}),
			})),
			(e[66] = he))
		: (he = e[66]);
	let fe;
	e[67] === Symbol.for("react.memo_cache_sentinel")
		? ((fe = t.jsx(Ie, {
				value: "published",
				children: t.jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						t.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
						"Publié",
					],
				}),
			})),
			(e[67] = fe))
		: (fe = e[67]);
	let ue;
	e[68] === Symbol.for("react.memo_cache_sentinel")
		? ((ue = t.jsxs(ht, {
				children: [
					he,
					fe,
					t.jsx(Ie, {
						value: "archived",
						children: t.jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								t.jsx("div", {
									className: "w-2 h-2 rounded-full bg-yellow-500",
								}),
								"Archivé",
							],
						}),
					}),
				],
			})),
			(e[68] = ue))
		: (ue = e[68]);
	let P;
	e[69] !== m
		? ((P = t.jsxs("div", {
				children: [
					ce,
					t.jsxs(ft, { value: m, onValueChange: me, children: [de, ue] }),
				],
			})),
			(e[69] = m),
			(e[70] = P))
		: (P = e[70]);
	let pe;
	e[71] === Symbol.for("react.memo_cache_sentinel")
		? ((pe = (s) => Ve(s)), (e[71] = pe))
		: (pe = e[71]);
	let L;
	e[72] !== f
		? ((L = t.jsx(et, { id: "comments", checked: f, onCheckedChange: pe })),
			(e[72] = f),
			(e[73] = L))
		: (L = e[73]);
	let xe;
	e[74] === Symbol.for("react.memo_cache_sentinel")
		? ((xe = t.jsx(G, {
				htmlFor: "comments",
				className: "text-sm",
				children: "Autoriser les commentaires sur cet article",
			})),
			(e[74] = xe))
		: (xe = e[74]);
	let A;
	e[75] !== L
		? ((A = t.jsxs("div", {
				className: "flex items-center space-x-2",
				children: [L, xe],
			})),
			(e[75] = L),
			(e[76] = A))
		: (A = e[76]);
	let ge;
	e[77] === Symbol.for("react.memo_cache_sentinel")
		? ((ge = t.jsx("h4", {
				className: "text-sm font-medium mb-2",
				children: "Aperçu des paramètres",
			})),
			(e[77] = ge))
		: (ge = e[77]);
	const Pe = r ? `${r.firstName} ${r.lastName}` : "Non connecté";
	let I;
	e[78] !== Pe
		? ((I = t.jsxs("p", {
				children: [
					"Auteur:",
					" ",
					t.jsx("span", { className: "font-medium", children: Pe }),
				],
			})),
			(e[78] = Pe),
			(e[79] = I))
		: (I = e[79]);
	const Le =
		m === "draft" ? "Brouillon" : m === "published" ? "Publié" : "Archivé";
	let B;
	e[80] !== Le
		? ((B = t.jsxs("p", {
				children: [
					"État:",
					" ",
					t.jsx("span", { className: "font-medium", children: Le }),
				],
			})),
			(e[80] = Le),
			(e[81] = B))
		: (B = e[81]);
	const Ae = f ? "Activés" : "Désactivés";
	let z;
	e[82] !== Ae
		? ((z = t.jsxs("p", {
				children: [
					"Commentaires:",
					" ",
					t.jsx("span", { className: "font-medium", children: Ae }),
				],
			})),
			(e[82] = Ae),
			(e[83] = z))
		: (z = e[83]);
	let D;
	e[84] !== l
		? ((D = l.length > 0 ? l.map(vt).join(", ") : "Aucun"),
			(e[84] = l),
			(e[85] = D))
		: (D = e[85]);
	let E;
	e[86] !== D
		? ((E = t.jsxs("p", {
				children: [
					"Tags:",
					" ",
					t.jsx("span", { className: "font-medium", children: D }),
				],
			})),
			(e[86] = D),
			(e[87] = E))
		: (E = e[87]);
	let k;
	e[88] !== I || e[89] !== B || e[90] !== z || e[91] !== E
		? ((k = t.jsxs("div", {
				className: "p-4 bg-muted/50 rounded-lg",
				children: [
					ge,
					t.jsxs("div", {
						className: "text-xs space-y-1 text-muted-foreground",
						children: [I, B, z, E],
					}),
				],
			})),
			(e[88] = I),
			(e[89] = B),
			(e[90] = z),
			(e[91] = E),
			(e[92] = k))
		: (k = e[92]);
	let F;
	e[93] !== P || e[94] !== A || e[95] !== k
		? ((F = t.jsxs("div", { className: "space-y-4", children: [P, A, k] })),
			(e[93] = P),
			(e[94] = A),
			(e[95] = k),
			(e[96] = F))
		: (F = e[96]);
	let O;
	e[97] !== T || e[98] !== F
		? ((O = t.jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [T, F],
			})),
			(e[97] = T),
			(e[98] = F),
			(e[99] = O))
		: (O = e[99]);
	let je, be;
	e[100] === Symbol.for("react.memo_cache_sentinel")
		? ((je = t.jsx(G, {
				className: "text-base font-medium",
				children: "Contenu de l'article *",
			})),
			(be = t.jsx("p", {
				className: "text-sm text-muted-foreground mb-3",
				children:
					"Utilisez l'éditeur pour formatter votre contenu avec du texte enrichi",
			})),
			(e[100] = je),
			(e[101] = be))
		: ((je = e[100]), (be = e[101]));
	let R;
	e[102] !== o
		? ((R = t.jsxs("div", {
				children: [
					je,
					be,
					t.jsx("div", {
						className: "border rounded-lg overflow-hidden",
						children: t.jsx(it, { value: o, onChange: Ue }),
					}),
				],
			})),
			(e[102] = o),
			(e[103] = R))
		: (R = e[103]);
	let U;
	e[104] !== p
		? ((U = () => p({ to: "/admin/blog" })), (e[104] = p), (e[105] = U))
		: (U = e[105]);
	let V;
	e[106] !== i.isPending || e[107] !== U
		? ((V = t.jsx(Ce, {
				type: "button",
				variant: "outline",
				onClick: U,
				className: "flex-1 sm:flex-none",
				disabled: i.isPending,
				children: "Annuler",
			})),
			(e[106] = i.isPending),
			(e[107] = U),
			(e[108] = V))
		: (V = e[108]);
	let $;
	e[109] !== o || e[110] !== i.isPending || e[111] !== r || e[112] !== n
		? (($ = i.isPending || !n.trim() || !o.trim() || !r),
			(e[109] = o),
			(e[110] = i.isPending),
			(e[111] = r),
			(e[112] = n),
			(e[113] = $))
		: ($ = e[113]);
	let H;
	e[114] !== i.isPending || e[115] !== r
		? ((H = i.isPending
				? t.jsxs(t.Fragment, {
						children: [
							t.jsx("div", {
								className:
									"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
							}),
							"Création en cours...",
						],
					})
				: r
					? "Créer l'article"
					: "Connectez-vous pour créer un article"),
			(e[114] = i.isPending),
			(e[115] = r),
			(e[116] = H))
		: (H = e[116]);
	let Q;
	e[117] !== $ || e[118] !== H
		? ((Q = t.jsx(Ce, {
				type: "submit",
				disabled: $,
				className: "flex-1",
				children: H,
			})),
			(e[117] = $),
			(e[118] = H),
			(e[119] = Q))
		: (Q = e[119]);
	let q;
	e[120] !== V || e[121] !== Q
		? ((q = t.jsxs("div", {
				className: "flex flex-col sm:flex-row gap-4 pt-6 border-t",
				children: [V, Q],
			})),
			(e[120] = V),
			(e[121] = Q),
			(e[122] = q))
		: (q = e[122]);
	let ve;
	return (
		e[123] !== Te || e[124] !== O || e[125] !== R || e[126] !== q
			? ((ve = t.jsx("div", {
					className: "container mx-auto p-4 sm:p-6 max-w-4xl",
					children: t.jsxs(We, {
						children: [
							te,
							t.jsx(Ye, {
								children: t.jsxs("form", {
									className: "space-y-6",
									onSubmit: Te,
									children: [O, R, q],
								}),
							}),
						],
					}),
				})),
				(e[123] = Te),
				(e[124] = O),
				(e[125] = R),
				(e[126] = q),
				(e[127] = ve))
			: (ve = e[127]),
		ve
	);
}
function vt(e) {
	return e.name;
}
function Ct(e) {
	return e.name;
}
const Zt = bt;
export { Zt as component };
