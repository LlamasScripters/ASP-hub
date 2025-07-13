import { B as Ve } from "./badge-BAidKpPB.js";
import { C as ct } from "./checkbox-DT5FljqG.js";
import {
	B as Be,
	c as Je,
	d as at,
	r as d,
	C as it,
	b as lt,
	e as nt,
	bJ as ot,
	f as rt,
	t as st,
	j as t,
	i as tt,
} from "./index-kb-Ylywn.js";
import { C as _t } from "./index-mnH6Jux_.js";
import { I as qe } from "./input-CdkcPZS3.js";
import { L as se } from "./label-B9JbzJbC.js";
import { P as Ge } from "./plus-czqh0ZLb.js";
import { a as gt, b as jt, P as pt } from "./popover-DyNr3sDf.js";
import {
	d as He,
	S as Nt,
	c as St,
	a as bt,
	b as vt,
} from "./select-D8GIfri3.js";
import {
	c as $e,
	a as dt,
	b as ft,
	d as ht,
	C as mt,
	e as ut,
	S as xt,
} from "./simple-editor-pChGEfM4.js";
import { d as Ct, c as yt } from "./useBlogQueries-VhutstJQ.js";
import { X as wt } from "./x-BwQkFnmd.js";
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
import "./useQuery-DObI4S3_.js";
function At(o) {
	const e = Je.c(148),
		{ blog: s } = o,
		[r, We] = d.useState(s.title);
	let le;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((le = []), (e[0] = le))
		: (le = e[0]);
	const [a, ae] = d.useState(le),
		[u, Xe] = d.useState(s.state),
		[c, Ke] = d.useState(s.content),
		[x, Qe] = d.useState(s.commentsEnabled),
		[f, Ye] = d.useState(s.headerImage || ""),
		[Fe, Me] = d.useState(!1),
		[i, Ue] = d.useState(""),
		p = tt(),
		n = Ct(),
		{ data: ie, isLoading: Oe } = yt();
	let re;
	e[1] !== ie
		? ((re = ie === void 0 ? [] : ie), (e[1] = ie), (e[2] = re))
		: (re = e[2]);
	const h = re;
	let ne, oe;
	e[3] !== s.tags
		? ((ne = () => {
				if (s.tags && s.tags.length > 0) {
					const l = s.tags.map(Lt);
					ae(l);
				} else ae([]);
			}),
			(oe = [s.tags]),
			(e[3] = s.tags),
			(e[4] = ne),
			(e[5] = oe))
		: ((ne = e[4]), (oe = e[5])),
		d.useEffect(ne, oe);
	let ce;
	e[6] !== a
		? ((ce = (l) => {
				a.find((m) => m.id === l.id) || ae([...a, l]), Me(!1);
			}),
			(e[6] = a),
			(e[7] = ce))
		: (ce = e[7]);
	const g = ce;
	let me;
	e[8] !== a
		? ((me = (l) => {
				ae(a.filter((m) => m.id !== l));
			}),
			(e[8] = a),
			(e[9] = me))
		: (me = e[9]);
	const ke = me;
	let de;
	e[10] !== g || e[11] !== h || e[12] !== i
		? ((de = () => {
				if (
					i.trim() &&
					!h.find((l) => l.name.toLowerCase() === i.trim().toLowerCase())
				) {
					const l = {
						id: -Date.now(),
						name: i.trim(),
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						deletedAt: null,
					};
					g(l), Ue(""), Me(!1);
				}
			}),
			(e[10] = g),
			(e[11] = h),
			(e[12] = i),
			(e[13] = de))
		: (de = e[13]);
	const ze = de;
	let fe;
	e[14] !== s.id ||
	e[15] !== x ||
	e[16] !== c ||
	e[17] !== f ||
	e[18] !== p ||
	e[19] !== a ||
	e[20] !== u ||
	e[21] !== r ||
	e[22] !== n
		? ((fe = async (l) => {
				if ((l.preventDefault(), !r.trim() || !c.trim())) {
					st.error("Le titre et le contenu sont obligatoires");
					return;
				}
				const m = a.map(Pt),
					Ze = {
						title: r.trim(),
						content: c,
						headerImage: f.trim() || void 0,
						state: u,
						tags: m,
						commentsEnabled: x,
					};
				try {
					await n.mutateAsync({ id: s.id, data: Ze }), p({ to: "/admin/blog" });
				} catch (et) {
					console.error(et);
				}
			}),
			(e[14] = s.id),
			(e[15] = x),
			(e[16] = c),
			(e[17] = f),
			(e[18] = p),
			(e[19] = a),
			(e[20] = u),
			(e[21] = r),
			(e[22] = n),
			(e[23] = fe))
		: (fe = e[23]);
	const Re = fe,
		he = Tt;
	let ue;
	e[24] === Symbol.for("react.memo_cache_sentinel")
		? ((ue = t.jsxs("div", {
				children: [
					t.jsx(lt, { children: "Modifier l'article" }),
					t.jsx(at, { children: "Modifiez les informations de cet article" }),
				],
			})),
			(e[24] = ue))
		: (ue = e[24]);
	let j;
	e[25] !== s.id
		? ((j = s.id.slice(0, 8)), (e[25] = s.id), (e[26] = j))
		: (j = e[26]);
	let b;
	e[27] !== j
		? ((b = t.jsxs(Ve, {
				variant: "outline",
				className: "text-xs",
				children: ["ID: ", j, "..."],
			})),
			(e[27] = j),
			(e[28] = b))
		: (b = e[28]);
	let v;
	e[29] !== s.createdAt
		? ((v = he(s.createdAt)), (e[29] = s.createdAt), (e[30] = v))
		: (v = e[30]);
	let S;
	e[31] !== v
		? ((S = t.jsxs(Ve, {
				variant: "secondary",
				className: "text-xs",
				children: ["Créé le ", v],
			})),
			(e[31] = v),
			(e[32] = S))
		: (S = e[32]);
	let N;
	e[33] !== b || e[34] !== S
		? ((N = t.jsx(it, {
				children: t.jsxs("div", {
					className:
						"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
					children: [
						ue,
						t.jsxs("div", {
							className: "flex items-center gap-2",
							children: [b, S],
						}),
					],
				}),
			})),
			(e[33] = b),
			(e[34] = S),
			(e[35] = N))
		: (N = e[35]);
	let xe;
	e[36] === Symbol.for("react.memo_cache_sentinel")
		? ((xe = t.jsx(se, { htmlFor: "title", children: "Titre *" })),
			(e[36] = xe))
		: (xe = e[36]);
	let pe;
	e[37] === Symbol.for("react.memo_cache_sentinel")
		? ((pe = (l) => We(l.target.value)), (e[37] = pe))
		: (pe = e[37]);
	let C;
	e[38] !== r
		? ((C = t.jsxs("div", {
				children: [
					xe,
					t.jsx(qe, {
						id: "title",
						value: r,
						onChange: pe,
						required: !0,
						placeholder: "Titre de l'article",
						className: "mt-1",
					}),
				],
			})),
			(e[38] = r),
			(e[39] = C))
		: (C = e[39]);
	let ge;
	e[40] === Symbol.for("react.memo_cache_sentinel")
		? ((ge = t.jsx(se, {
				htmlFor: "headerImage",
				children: "Image d'en-tête (URL)",
			})),
			(e[40] = ge))
		: (ge = e[40]);
	let je;
	e[41] === Symbol.for("react.memo_cache_sentinel")
		? ((je = (l) => Ye(l.target.value)), (e[41] = je))
		: (je = e[41]);
	let y, w;
	e[42] !== f
		? ((y = t.jsx(qe, {
				id: "headerImage",
				value: f,
				onChange: je,
				placeholder: "https://example.com/image.jpg",
				className: "mt-1",
			})),
			(w =
				f &&
				t.jsx("div", {
					className: "mt-2",
					children: t.jsx("img", {
						src: f,
						alt: "Aperçu",
						className: "w-full h-32 object-cover rounded border",
						onError: It,
					}),
				})),
			(e[42] = f),
			(e[43] = y),
			(e[44] = w))
		: ((y = e[43]), (w = e[44]));
	let _;
	e[45] !== y || e[46] !== w
		? ((_ = t.jsxs("div", { children: [ge, y, w] })),
			(e[45] = y),
			(e[46] = w),
			(e[47] = _))
		: (_ = e[47]);
	let be;
	e[48] === Symbol.for("react.memo_cache_sentinel")
		? ((be = t.jsx(se, { htmlFor: "tags", children: "Tags" })), (e[48] = be))
		: (be = e[48]);
	let A;
	e[49] !== ke || e[50] !== a
		? ((A =
				a.length > 0 &&
				t.jsx("div", {
					className: "flex flex-wrap gap-1",
					children: a.map((l) =>
						t.jsxs(
							Ve,
							{
								variant: "secondary",
								className: "text-xs",
								children: [
									"#",
									l.name,
									t.jsx(Be, {
										type: "button",
										size: "sm",
										variant: "ghost",
										className: "h-4 w-4 p-0 ml-1 hover:bg-transparent",
										onClick: () => ke(l.id),
										children: t.jsx(wt, { className: "h-3 w-3" }),
									}),
								],
							},
							l.id,
						),
					),
				})),
			(e[49] = ke),
			(e[50] = a),
			(e[51] = A))
		: (A = e[51]);
	let ve;
	e[52] === Symbol.for("react.memo_cache_sentinel")
		? ((ve = t.jsx(Ge, { className: "h-4 w-4 mr-2" })), (e[52] = ve))
		: (ve = e[52]);
	let I;
	e[53] !== Oe
		? ((I = t.jsx(pt, {
				asChild: !0,
				children: t.jsxs(Be, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-8 justify-start",
					disabled: Oe,
					children: [ve, "Ajouter un tag"],
				}),
			})),
			(e[53] = Oe),
			(e[54] = I))
		: (I = e[54]);
	let T;
	e[55] !== i
		? ((T = t.jsx(ht, {
				placeholder: "Rechercher ou créer un tag...",
				value: i,
				onValueChange: Ue,
			})),
			(e[55] = i),
			(e[56] = T))
		: (T = e[56]);
	let P;
	e[57] !== g || e[58] !== h || e[59] !== ze || e[60] !== i || e[61] !== a
		? ((P = t.jsx(mt, {
				children:
					h.filter(
						(l) =>
							!a.find((m) => m.id === l.id) &&
							l.name.toLowerCase().includes(i.toLowerCase()),
					).length === 0 && i.trim() === ""
						? t.jsx(dt, { children: "Aucun tag trouvé." })
						: t.jsxs(ft, {
								children: [
									h
										.filter(
											(l) =>
												!a.find((m) => m.id === l.id) &&
												l.name.toLowerCase().includes(i.toLowerCase()),
										)
										.map((l) =>
											t.jsxs(
												$e,
												{
													onSelect: () => g(l),
													children: [
														t.jsx(_t, { className: "mr-2 h-4 w-4 opacity-0" }),
														"#",
														l.name,
													],
												},
												l.id,
											),
										),
									i.trim() &&
										!h.find(
											(l) => l.name.toLowerCase() === i.trim().toLowerCase(),
										) &&
										t.jsxs($e, {
											onSelect: ze,
											children: [
												t.jsx(Ge, { className: "mr-2 h-4 w-4" }),
												'Créer "',
												i.trim(),
												'"',
											],
										}),
								],
							}),
			})),
			(e[57] = g),
			(e[58] = h),
			(e[59] = ze),
			(e[60] = i),
			(e[61] = a),
			(e[62] = P))
		: (P = e[62]);
	let L;
	e[63] !== T || e[64] !== P
		? ((L = t.jsx(gt, {
				className: "w-80 p-0",
				align: "start",
				children: t.jsxs(ut, { children: [T, P] }),
			})),
			(e[63] = T),
			(e[64] = P),
			(e[65] = L))
		: (L = e[65]);
	let D;
	e[66] !== I || e[67] !== L || e[68] !== Fe
		? ((D = t.jsxs(jt, { open: Fe, onOpenChange: Me, children: [I, L] })),
			(e[66] = I),
			(e[67] = L),
			(e[68] = Fe),
			(e[69] = D))
		: (D = e[69]);
	let E;
	e[70] !== A || e[71] !== D
		? ((E = t.jsxs("div", { className: "mt-1 space-y-2", children: [A, D] })),
			(e[70] = A),
			(e[71] = D),
			(e[72] = E))
		: (E = e[72]);
	let Se;
	e[73] === Symbol.for("react.memo_cache_sentinel")
		? ((Se = t.jsx("p", {
				className: "text-xs text-muted-foreground mt-1",
				children: "Sélectionnez des tags existants ou créez-en de nouveaux",
			})),
			(e[73] = Se))
		: (Se = e[73]);
	let B;
	e[74] !== E
		? ((B = t.jsxs("div", { children: [be, E, Se] })), (e[74] = E), (e[75] = B))
		: (B = e[75]);
	let F;
	e[76] !== C || e[77] !== _ || e[78] !== B
		? ((F = t.jsxs("div", { className: "space-y-4", children: [C, _, B] })),
			(e[76] = C),
			(e[77] = _),
			(e[78] = B),
			(e[79] = F))
		: (F = e[79]);
	let Ne;
	e[80] === Symbol.for("react.memo_cache_sentinel")
		? ((Ne = t.jsx(se, { htmlFor: "state", children: "État de publication" })),
			(e[80] = Ne))
		: (Ne = e[80]);
	let Ce;
	e[81] === Symbol.for("react.memo_cache_sentinel")
		? ((Ce = (l) => Xe(l)), (e[81] = Ce))
		: (Ce = e[81]);
	let ye;
	e[82] === Symbol.for("react.memo_cache_sentinel")
		? ((ye = t.jsx(bt, {
				id: "state",
				className: "mt-1",
				children: t.jsx(vt, { placeholder: "Choisir l'état" }),
			})),
			(e[82] = ye))
		: (ye = e[82]);
	let we;
	e[83] === Symbol.for("react.memo_cache_sentinel")
		? ((we = t.jsx(He, {
				value: "draft",
				children: t.jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						t.jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }),
						"Brouillon",
					],
				}),
			})),
			(e[83] = we))
		: (we = e[83]);
	let _e;
	e[84] === Symbol.for("react.memo_cache_sentinel")
		? ((_e = t.jsx(He, {
				value: "published",
				children: t.jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						t.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
						"Publié",
					],
				}),
			})),
			(e[84] = _e))
		: (_e = e[84]);
	let Ae;
	e[85] === Symbol.for("react.memo_cache_sentinel")
		? ((Ae = t.jsxs(St, {
				children: [
					we,
					_e,
					t.jsx(He, {
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
			(e[85] = Ae))
		: (Ae = e[85]);
	let M;
	e[86] !== u
		? ((M = t.jsxs("div", {
				children: [
					Ne,
					t.jsxs(Nt, { value: u, onValueChange: Ce, children: [ye, Ae] }),
				],
			})),
			(e[86] = u),
			(e[87] = M))
		: (M = e[87]);
	let Ie;
	e[88] === Symbol.for("react.memo_cache_sentinel")
		? ((Ie = (l) => Qe(l)), (e[88] = Ie))
		: (Ie = e[88]);
	let O;
	e[89] !== x
		? ((O = t.jsx(ct, { id: "comments", checked: x, onCheckedChange: Ie })),
			(e[89] = x),
			(e[90] = O))
		: (O = e[90]);
	let Te;
	e[91] === Symbol.for("react.memo_cache_sentinel")
		? ((Te = t.jsx(se, {
				htmlFor: "comments",
				className: "text-sm",
				children: "Autoriser les commentaires sur cet article",
			})),
			(e[91] = Te))
		: (Te = e[91]);
	let k;
	e[92] !== O
		? ((k = t.jsxs("div", {
				className: "flex items-center space-x-2",
				children: [O, Te],
			})),
			(e[92] = O),
			(e[93] = k))
		: (k = e[93]);
	let Pe;
	e[94] === Symbol.for("react.memo_cache_sentinel")
		? ((Pe = t.jsx("h4", {
				className: "text-sm font-medium mb-2",
				children: "Informations article",
			})),
			(e[94] = Pe))
		: (Pe = e[94]);
	let z;
	e[95] !== s.createdAt
		? ((z = he(s.createdAt)), (e[95] = s.createdAt), (e[96] = z))
		: (z = e[96]);
	let R;
	e[97] !== z
		? ((R = t.jsxs("p", {
				children: [
					"Créé:",
					" ",
					t.jsx("span", { className: "font-medium", children: z }),
				],
			})),
			(e[97] = z),
			(e[98] = R))
		: (R = e[98]);
	let V;
	e[99] !== s.updatedAt
		? ((V = he(s.updatedAt)), (e[99] = s.updatedAt), (e[100] = V))
		: (V = e[100]);
	let H;
	e[101] !== V
		? ((H = t.jsxs("p", {
				children: [
					"Modifié:",
					" ",
					t.jsx("span", { className: "font-medium", children: V }),
				],
			})),
			(e[101] = V),
			(e[102] = H))
		: (H = e[102]);
	let U;
	e[103] !== s.publishedAt
		? ((U =
				s.publishedAt &&
				t.jsxs("p", {
					children: [
						"Publié:",
						" ",
						t.jsx("span", {
							className: "font-medium",
							children: he(s.publishedAt),
						}),
					],
				})),
			(e[103] = s.publishedAt),
			(e[104] = U))
		: (U = e[104]);
	let $;
	e[105] !== s.authorId
		? (($ = t.jsxs("p", {
				children: [
					"Auteur ID:",
					" ",
					t.jsx("span", { className: "font-medium", children: s.authorId }),
				],
			})),
			(e[105] = s.authorId),
			(e[106] = $))
		: ($ = e[106]);
	let q;
	e[107] !== R || e[108] !== H || e[109] !== U || e[110] !== $
		? ((q = t.jsxs("div", {
				className: "p-4 bg-muted/50 rounded-lg",
				children: [
					Pe,
					t.jsxs("div", {
						className: "text-xs space-y-1 text-muted-foreground",
						children: [R, H, U, $],
					}),
				],
			})),
			(e[107] = R),
			(e[108] = H),
			(e[109] = U),
			(e[110] = $),
			(e[111] = q))
		: (q = e[111]);
	let G;
	e[112] !== M || e[113] !== k || e[114] !== q
		? ((G = t.jsxs("div", { className: "space-y-4", children: [M, k, q] })),
			(e[112] = M),
			(e[113] = k),
			(e[114] = q),
			(e[115] = G))
		: (G = e[115]);
	let J;
	e[116] !== F || e[117] !== G
		? ((J = t.jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [F, G],
			})),
			(e[116] = F),
			(e[117] = G),
			(e[118] = J))
		: (J = e[118]);
	let Le, De;
	e[119] === Symbol.for("react.memo_cache_sentinel")
		? ((Le = t.jsx(se, {
				className: "text-base font-medium",
				children: "Contenu de l'article *",
			})),
			(De = t.jsx("p", {
				className: "text-sm text-muted-foreground mb-3",
				children: "Modifiez le contenu avec l'éditeur de texte enrichi",
			})),
			(e[119] = Le),
			(e[120] = De))
		: ((Le = e[119]), (De = e[120]));
	let W;
	e[121] !== c
		? ((W = t.jsxs("div", {
				children: [
					Le,
					De,
					t.jsx("div", {
						className: "border rounded-lg overflow-hidden",
						children: t.jsx(xt, { value: c, onChange: Ke }),
					}),
				],
			})),
			(e[121] = c),
			(e[122] = W))
		: (W = e[122]);
	let X;
	e[123] !== p
		? ((X = () => p({ to: "/admin/blog" })), (e[123] = p), (e[124] = X))
		: (X = e[124]);
	let K;
	e[125] !== X || e[126] !== n.isPending
		? ((K = t.jsx(Be, {
				type: "button",
				variant: "outline",
				onClick: X,
				className: "flex-1 sm:flex-none",
				disabled: n.isPending,
				children: "Annuler",
			})),
			(e[125] = X),
			(e[126] = n.isPending),
			(e[127] = K))
		: (K = e[127]);
	let Q;
	e[128] !== c || e[129] !== r || e[130] !== n.isPending
		? ((Q = n.isPending || !r.trim() || !c.trim()),
			(e[128] = c),
			(e[129] = r),
			(e[130] = n.isPending),
			(e[131] = Q))
		: (Q = e[131]);
	let Y;
	e[132] !== n.isPending
		? ((Y = n.isPending
				? t.jsxs(t.Fragment, {
						children: [
							t.jsx("div", {
								className:
									"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
							}),
							"Mise à jour...",
						],
					})
				: "Mettre à jour l'article"),
			(e[132] = n.isPending),
			(e[133] = Y))
		: (Y = e[133]);
	let Z;
	e[134] !== Q || e[135] !== Y
		? ((Z = t.jsx(Be, {
				type: "submit",
				disabled: Q,
				className: "flex-1",
				children: Y,
			})),
			(e[134] = Q),
			(e[135] = Y),
			(e[136] = Z))
		: (Z = e[136]);
	let ee;
	e[137] !== K || e[138] !== Z
		? ((ee = t.jsxs("div", {
				className: "flex flex-col sm:flex-row gap-4 pt-6 border-t",
				children: [K, Z],
			})),
			(e[137] = K),
			(e[138] = Z),
			(e[139] = ee))
		: (ee = e[139]);
	let te;
	e[140] !== Re || e[141] !== J || e[142] !== W || e[143] !== ee
		? ((te = t.jsx(rt, {
				children: t.jsxs("form", {
					className: "space-y-6",
					onSubmit: Re,
					children: [J, W, ee],
				}),
			})),
			(e[140] = Re),
			(e[141] = J),
			(e[142] = W),
			(e[143] = ee),
			(e[144] = te))
		: (te = e[144]);
	let Ee;
	return (
		e[145] !== N || e[146] !== te
			? ((Ee = t.jsx("div", {
					className: "container mx-auto p-4 sm:p-6 max-w-4xl",
					children: t.jsxs(nt, { children: [N, te] }),
				})),
				(e[145] = N),
				(e[146] = te),
				(e[147] = Ee))
			: (Ee = e[147]),
		Ee
	);
}
function It(o) {
	o.currentTarget.style.display = "none";
}
function Tt(o) {
	return new Date(o).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
function Pt(o) {
	return o.name;
}
function Lt(o) {
	return {
		id: o.id,
		name: o.name,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		deletedAt: null,
	};
}
const cs = () => {
	const e = Je.c(2),
		{ blog: s } = ot.useLoaderData();
	let r;
	return (
		e[0] !== s
			? ((r = t.jsx(At, { blog: s })), (e[0] = s), (e[1] = r))
			: (r = e[1]),
		r
	);
};
export { cs as component };
