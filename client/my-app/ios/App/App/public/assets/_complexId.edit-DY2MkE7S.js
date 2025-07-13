import { C as ee } from "./ComplexForm-bxJ8A0xo.js";
import { A as F, a as T } from "./alert-DcqybFAu.js";
import { A as te } from "./arrow-left-DMyOJown.js";
import { B as re } from "./building-Dpa0VlEa.js";
import { C as ie } from "./circle-alert-CvO-74L-.js";
import { C as se } from "./circle-check-big-DWIiKDvL.js";
import {
	i as G,
	c as H,
	c1 as J,
	r as K,
	B as P,
	C as Q,
	b as U,
	d as W,
	e as X,
	f as Y,
	K as Z,
	j as t,
	L as z,
} from "./index-kb-Ylywn.js";
import "./checkbox-DT5FljqG.js";
import "./index-DauBq6FI.js";
import "./index-Dqr9Wf5M.js";
import "./index-mnH6Jux_.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
import "./index-Bv1xjdPd.js";
import "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./input-CdkcPZS3.js";
import "./info-hEQo0LXU.js";
import "./map-pin-DywQhs4x.js";
import "./timer-l0uyiV2G.js";
import "./users-BMY-28E4.js";
import "./car-DIHhrsj8.js";
import "./loader-circle-Bxgg9gFD.js";
function ae(j) {
	var M, O;
	const e = H.c(54),
		{ initialComplex: s } = j,
		[r, i] = K.useState(!1),
		D = G(),
		B =
			((O =
				(M = J().__store.prevState) == null ? void 0 : M.resolvedLocation) ==
			null
				? void 0
				: O.href) || void 0;
	let N;
	e[0] !== D
		? ((N = (q) => {
				i(!0),
					setTimeout(() => {
						i(!1);
					}, 3e3),
					setTimeout(() => {
						D({ to: `/admin/facilities/complexes/${q.id}` });
					}, 1500);
			}),
			(e[0] = D),
			(e[1] = N))
		: (N = e[1]);
	const I = N,
		V = le;
	let _;
	e[2] === Symbol.for("react.memo_cache_sentinel")
		? ((_ = t.jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Modifier le complexe",
			})),
			(e[2] = _))
		: (_ = e[2]);
	let a;
	e[3] !== s.name
		? ((a = t.jsxs("div", {
				children: [
					_,
					t.jsxs("p", {
						className: "text-muted-foreground",
						children: ['Modifiez les informations du complexe "', s.name, '"'],
					}),
				],
			})),
			(e[3] = s.name),
			(e[4] = a))
		: (a = e[4]);
	let v;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((v = t.jsx(P, {
				variant: "outline",
				size: "sm",
				asChild: !0,
				children: t.jsxs(z, {
					to: "/admin/facilities/complexes",
					search: { view: "complexes" },
					children: [
						t.jsx(te, { className: "w-4 h-4 mr-2" }),
						"Retour à la liste",
					],
				}),
			})),
			(e[5] = v))
		: (v = e[5]);
	let l;
	e[6] !== s.id
		? ((l = t.jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					v,
					t.jsx(P, {
						asChild: !0,
						children: t.jsx(z, {
							to: "/admin/facilities/complexes/$complexId",
							params: { complexId: s.id },
							children: "Voir les détails",
						}),
					}),
				],
			})),
			(e[6] = s.id),
			(e[7] = l))
		: (l = e[7]);
	let n;
	e[8] !== a || e[9] !== l
		? ((n = t.jsxs("div", {
				className:
					"flex flex-col justify-between gap-4 md:flex-row md:items-center",
				children: [a, l],
			})),
			(e[8] = a),
			(e[9] = l),
			(e[10] = n))
		: (n = e[10]);
	let c;
	e[11] !== r
		? ((c =
				r &&
				t.jsxs(F, {
					className: "border-green-200 bg-green-50",
					children: [
						t.jsx(se, { className: "h-4 w-4 text-green-600" }),
						t.jsx(T, {
							className: "text-green-800",
							children:
								"Le complexe a été modifié avec succès ! Redirection en cours...",
						}),
					],
				})),
			(e[11] = r),
			(e[12] = c))
		: (c = e[12]);
	let C;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((C = t.jsxs(Q, {
				children: [
					t.jsxs(U, {
						className:
							"flex items-center gap-2 text-green-900 dark:text-green-100",
						children: [
							t.jsx(re, { className: "w-5 h-5" }),
							"Informations actuelles",
						],
					}),
					t.jsx(W, {
						className: "text-green-700 dark:text-green-300",
						children:
							"Voici les informations actuellement enregistrées pour ce complexe",
					}),
				],
			})),
			(e[13] = C))
		: (C = e[13]);
	let b;
	e[14] === Symbol.for("react.memo_cache_sentinel")
		? ((b = t.jsx("span", {
				className: "font-medium text-green-900 dark:text-green-100",
				children: "Nom :",
			})),
			(e[14] = b))
		: (b = e[14]);
	let o;
	e[15] !== s.name
		? ((o = t.jsxs("div", {
				children: [
					b,
					t.jsx("span", {
						className: "ml-2 text-green-800 dark:text-green-200",
						children: s.name,
					}),
				],
			})),
			(e[15] = s.name),
			(e[16] = o))
		: (o = e[16]);
	let y;
	e[17] === Symbol.for("react.memo_cache_sentinel")
		? ((y = t.jsx("span", {
				className: "font-medium text-green-900 dark:text-green-100",
				children: "Adresse complète :",
			})),
			(e[17] = y))
		: (y = e[17]);
	let m;
	e[18] !== s.city || e[19] !== s.postalCode || e[20] !== s.street
		? ((m = t.jsxs("div", {
				children: [
					y,
					t.jsxs("span", {
						className: "ml-2 text-green-800 dark:text-green-200",
						children: [s.street, ", ", s.postalCode, ",", " ", s.city],
					}),
				],
			})),
			(e[18] = s.city),
			(e[19] = s.postalCode),
			(e[20] = s.street),
			(e[21] = m))
		: (m = e[21]);
	let k;
	e[22] === Symbol.for("react.memo_cache_sentinel")
		? ((k = t.jsx("span", {
				className: "font-medium text-green-900 dark:text-green-100",
				children: "Places de parking :",
			})),
			(e[22] = k))
		: (k = e[22]);
	let d;
	e[23] !== s.parkingCapacity
		? ((d = t.jsxs("div", {
				children: [
					k,
					t.jsx("span", {
						className: "ml-2 text-green-800 dark:text-green-200",
						children: s.parkingCapacity,
					}),
				],
			})),
			(e[23] = s.parkingCapacity),
			(e[24] = d))
		: (d = e[24]);
	let S;
	e[25] === Symbol.for("react.memo_cache_sentinel")
		? ((S = t.jsx("span", {
				className: "font-medium text-green-900 dark:text-green-100",
				children: "Ascenseurs :",
			})),
			(e[25] = S))
		: (S = e[25]);
	let x;
	e[26] !== s.numberOfElevators
		? ((x = t.jsxs("div", {
				children: [
					S,
					t.jsx("span", {
						className: "ml-2 text-green-800 dark:text-green-200",
						children: s.numberOfElevators,
					}),
				],
			})),
			(e[26] = s.numberOfElevators),
			(e[27] = x))
		: (x = e[27]);
	let A;
	e[28] === Symbol.for("react.memo_cache_sentinel")
		? ((A = t.jsx("span", {
				className: "font-medium text-green-900 dark:text-green-100",
				children: "Accessibilité PMR :",
			})),
			(e[28] = A))
		: (A = e[28]);
	const $ = s.accessibleForReducedMobility ? "Oui" : "Non";
	let p;
	e[29] !== $
		? ((p = t.jsxs("div", {
				children: [
					A,
					t.jsx("span", {
						className: "ml-2 text-green-800 dark:text-green-200",
						children: $,
					}),
				],
			})),
			(e[29] = $),
			(e[30] = p))
		: (p = e[30]);
	let w;
	e[31] === Symbol.for("react.memo_cache_sentinel")
		? ((w = t.jsx("span", {
				className: "font-medium text-green-900 dark:text-green-100",
				children: "Dernière modification :",
			})),
			(e[31] = w))
		: (w = e[31]);
	let f;
	e[32] !== s.updatedAt
		? ((f = V(s.updatedAt)), (e[32] = s.updatedAt), (e[33] = f))
		: (f = e[33]);
	let h;
	e[34] !== f
		? ((h = t.jsxs("div", {
				children: [
					w,
					t.jsx("span", {
						className: "ml-2 text-green-800 dark:text-green-200",
						children: f,
					}),
				],
			})),
			(e[34] = f),
			(e[35] = h))
		: (h = e[35]);
	let g;
	e[36] !== o ||
	e[37] !== m ||
	e[38] !== d ||
	e[39] !== x ||
	e[40] !== p ||
	e[41] !== h
		? ((g = t.jsxs(X, {
				className:
					"bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
				children: [
					C,
					t.jsx(Y, {
						className: "space-y-3",
						children: t.jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
							children: [o, m, d, x, p, h],
						}),
					}),
				],
			})),
			(e[36] = o),
			(e[37] = m),
			(e[38] = d),
			(e[39] = x),
			(e[40] = p),
			(e[41] = h),
			(e[42] = g))
		: (g = e[42]);
	let L;
	e[43] === Symbol.for("react.memo_cache_sentinel")
		? ((L = t.jsx(ie, { className: "h-4 w-4" })), (e[43] = L))
		: (L = e[43]);
	let R;
	e[44] === Symbol.for("react.memo_cache_sentinel")
		? ((R = t.jsxs(F, {
				children: [
					L,
					t.jsxs(T, {
						children: [
							t.jsx("strong", { children: "Important :" }),
							" Les modifications apportées à ce complexe affecteront toutes les salles et réservations associées. Assurez-vous que les informations sont correctes avant de sauvegarder.",
						],
					}),
				],
			})),
			(e[44] = R))
		: (R = e[44]);
	let u;
	e[45] !== I || e[46] !== s || e[47] !== B
		? ((u = t.jsx("div", {
				className: "space-y-4",
				children: t.jsx(ee, { complex: s, onSuccess: I, onCancelLink: B }),
			})),
			(e[45] = I),
			(e[46] = s),
			(e[47] = B),
			(e[48] = u))
		: (u = e[48]);
	let E;
	return (
		e[49] !== g || e[50] !== u || e[51] !== n || e[52] !== c
			? ((E = t.jsxs("div", {
					className: "space-y-6",
					children: [n, c, g, R, u],
				})),
				(e[49] = g),
				(e[50] = u),
				(e[51] = n),
				(e[52] = c),
				(e[53] = E))
			: (E = e[53]),
		E
	);
}
function le(j) {
	return new Date(j).toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
const Ee = () => {
	const e = H.c(3);
	let s;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((s = {
				from: "/_authenticated/admin/_admin/facilities/complexes/$complexId/edit",
			}),
			(e[0] = s))
		: (s = e[0]);
	const { complex: r } = Z(s);
	let i;
	return (
		e[1] !== r
			? ((i = t.jsx(ae, { initialComplex: r })), (e[1] = r), (e[2] = i))
			: (i = e[2]),
		i
	);
};
export { Ee as component };
