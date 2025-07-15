import { P as ci } from "./PasswordStrengthIndicator-GvqmZ7qZ.js";
import { z as O, a as vi } from "./api-DLXzidRJ.js";
import { A as ji } from "./arrow-left-DMyOJown.js";
import { C as hi } from "./calendar-De7tcxsN.js";
import { C as mi } from "./checkbox-DT5FljqG.js";
import { E as qe } from "./eye-D8N8bRfa.js";
import { E as Re } from "./eye-off-zA7XEEL7.js";
import { f as gi } from "./format-V-_nIj5y.js";
import { T as di, f as ha, C as si } from "./fr-CxjLSI5r.js";
import { _ as te } from "./index-CnLXGm6V.js";
import {
	v as Be,
	o as Ia,
	l as Ke,
	w as La,
	bN as Ma,
	h as Qe,
	g as Ua,
	B as Z,
	C as da,
	e as fa,
	t as ie,
	s as je,
	u as ke,
	L as li,
	b as ma,
	Z as ni,
	R as oi,
	bO as pi,
	bP as ri,
	q as sa,
	j as t,
	a as ti,
	d as ua,
	c as ue,
	r as x,
	f as xa,
} from "./index-kb-Ylywn.js";
import { I as Y } from "./input-CdkcPZS3.js";
import { P as fi, b as ui, a as xi } from "./popover-DyNr3sDf.js";
import {
	S as ba,
	d as ee,
	c as ja,
	a as wa,
	b as ya,
} from "./select-D8GIfri3.js";
import { S as bi, M as wi, L as yi } from "./sun-BHPvtmae.js";
import { u as va } from "./useQuery-DObI4S3_.js";
import {
	d as $,
	e as B,
	c as I,
	s as Je,
	F as R,
	a as Xe,
	u as Ze,
	f as ga,
	b as q,
} from "./zod-B5AhSGj5.js";
import "./label-B9JbzJbC.js";
import "./index-Bv1xjdPd.js";
import "./index-Dqr9Wf5M.js";
import "./index-DauBq6FI.js";
import "./index-Dl_6cIao.js";
import "./chevron-left-BhVEjMY-.js";
import "./chevron-right-QFzs-bqo.js";
import "./chevron-down-CMzABl4R.js";
import "./buildMatchPatternFn-DF4FdbSS.js";
import "./index-mnH6Jux_.js";
import "./index-8ZKmGdXm.js";
import "./index-BRam3N1Z.js";
import "./index-CvBT1pZ2.js";
import "./index-CDAriSY_.js";
import "./index-3Axhna2x.js";
import "./index-C6LbJ2-_.js";
import "./chevron-up-DyH28r2x.js"; /**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ki = [
		["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
		["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
		["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
	],
	Di = ti("upload", ki),
	zi = Ia({ email: je().email("Adresse email invalide") });
function Ei() {
	const e = ue.c(24);
	let a;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((a = { resolver: Je(zi), defaultValues: { email: "" } }), (e[0] = a))
		: (a = e[0]);
	const i = Ze(a);
	let n;
	e[1] !== i
		? ((n = {
				mutationFn: async (y) => {
					const { error: g } = await Qe.forgetPassword({
						email: y.email,
						redirectTo: "/auth/reset-password",
					});
					if (g != null && g.code) throw new Error(La(g.code));
					ie.success(
						"Un email de réinitialisation a été envoyé si cette adresse existe dans notre système",
					),
						i.reset();
				},
				onError: Pi,
			}),
			(e[1] = i),
			(e[2] = n))
		: (n = e[2]);
	const { mutate: o, isPending: r } = ke(n);
	let c;
	e[3] !== o
		? ((c = (y) => {
				o(y);
			}),
			(e[3] = o),
			(e[4] = c))
		: (c = e[4]);
	const s = c;
	let d;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((d = t.jsxs("div", {
				className: "text-center space-y-2",
				children: [
					t.jsx("h3", {
						className: "text-lg font-medium",
						children: "Définir un mot de passe",
					}),
					t.jsx("p", {
						className: "text-sm text-muted-foreground",
						children:
							"Vous n'avez pas encore défini de mot de passe. Entrez votre adresse email pour recevoir un lien de création de mot de passe.",
					}),
				],
			})),
			(e[5] = d))
		: (d = e[5]);
	let b;
	e[6] !== i || e[7] !== s
		? ((b = i.handleSubmit(s)), (e[6] = i), (e[7] = s), (e[8] = b))
		: (b = e[8]);
	let w;
	e[9] !== r
		? ((w = (y) => {
				const { field: g } = y;
				return t.jsxs(q, {
					children: [
						t.jsx(I, { children: "Adresse email" }),
						t.jsx($, {
							children: t.jsx(Y, {
								type: "email",
								placeholder: "votre@email.com",
								disabled: r,
								...g,
							}),
						}),
						t.jsx(B, {}),
					],
				});
			}),
			(e[9] = r),
			(e[10] = w))
		: (w = e[10]);
	let p;
	e[11] !== i.control || e[12] !== w
		? ((p = t.jsx(R, { control: i.control, name: "email", render: w })),
			(e[11] = i.control),
			(e[12] = w),
			(e[13] = p))
		: (p = e[13]);
	const u = r ? "Envoi en cours..." : "Envoyer le lien";
	let f;
	e[14] !== r || e[15] !== u
		? ((f = t.jsx(Z, {
				type: "submit",
				disabled: r,
				className: "w-full",
				children: u,
			})),
			(e[14] = r),
			(e[15] = u),
			(e[16] = f))
		: (f = e[16]);
	let v;
	e[17] !== b || e[18] !== p || e[19] !== f
		? ((v = t.jsxs("form", {
				onSubmit: b,
				className: "space-y-4",
				children: [p, f],
			})),
			(e[17] = b),
			(e[18] = p),
			(e[19] = f),
			(e[20] = v))
		: (v = e[20]);
	let j;
	return (
		e[21] !== i || e[22] !== v
			? ((j = t.jsxs("div", {
					className: "space-y-4",
					children: [d, t.jsx(Xe, { ...i, children: v })],
				})),
				(e[21] = i),
				(e[22] = v),
				(e[23] = j))
			: (j = e[23]),
		j
	);
}
function Pi(e) {
	ie.error(e.message || "Une erreur s'est produite");
}
const Si = Ia({
	currentPassword: je().min(1, "Le mot de passe actuel est requis"),
	newPassword: je().min(Be.passwordMinLength, {
		message: `Le nouveau mot de passe doit faire au moins ${Be.passwordMinLength} caractères`,
	}),
	confirmNewPassword: je().min(1, "Veuillez confirmer le mot de passe"),
}).refine((e) => e.newPassword === e.confirmNewPassword, {
	message: "Les mots de passe ne correspondent pas",
	path: ["confirmNewPassword"],
});
function Ci() {
	const e = ue.c(40),
		[a, i] = x.useState(!1),
		[n, o] = x.useState(!1),
		[r, c] = x.useState(!1);
	let s;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((s = {
				resolver: Je(Si),
				defaultValues: {
					currentPassword: "",
					newPassword: "",
					confirmNewPassword: "",
				},
			}),
			(e[0] = s))
		: (s = e[0]);
	const d = Ze(s);
	let b;
	e[1] !== d
		? ((b = {
				mutationFn: async (E) => {
					const { error: D } = await Qe.changePassword({
						currentPassword: E.currentPassword,
						newPassword: E.newPassword,
						revokeOtherSessions: !0,
					});
					D != null && D.code
						? ie.error(La(D.code))
						: ie.success("Mot de passe mis à jour avec succès"),
						d.reset();
				},
			}),
			(e[1] = d),
			(e[2] = b))
		: (b = e[2]);
	const { mutate: w, isPending: p } = ke(b);
	let u;
	e[3] !== w
		? ((u = (E) => {
				w(E);
			}),
			(e[3] = w),
			(e[4] = u))
		: (u = e[4]);
	const f = u;
	let v;
	e[5] !== d
		? ((v = d.watch("newPassword")), (e[5] = d), (e[6] = v))
		: (v = e[6]);
	const j = v;
	let y;
	e[7] !== d || e[8] !== f
		? ((y = d.handleSubmit(f)), (e[7] = d), (e[8] = f), (e[9] = y))
		: (y = e[9]);
	let g;
	e[10] !== a
		? ((g = (E) => {
				const { field: D } = E;
				return t.jsxs(q, {
					children: [
						t.jsx(I, { children: "Mot de passe actuel" }),
						t.jsx($, {
							children: t.jsxs("div", {
								className: "relative",
								children: [
									t.jsx(Y, {
										type: a ? "text" : "password",
										placeholder: "Mot de passe actuel",
										...D,
									}),
									t.jsx(Z, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className:
											"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
										onClick: () => i(!a),
										"aria-label": a
											? "Masquer le mot de passe"
											: "Afficher le mot de passe",
										children: a
											? t.jsx(Re, { className: "h-4 w-4" })
											: t.jsx(qe, { className: "h-4 w-4" }),
									}),
								],
							}),
						}),
						t.jsx(B, {}),
					],
				});
			}),
			(e[10] = a),
			(e[11] = g))
		: (g = e[11]);
	let _;
	e[12] !== d.control || e[13] !== g
		? ((_ = t.jsx(R, {
				control: d.control,
				name: "currentPassword",
				render: g,
			})),
			(e[12] = d.control),
			(e[13] = g),
			(e[14] = _))
		: (_ = e[14]);
	let T;
	e[15] !== j || e[16] !== n
		? ((T = (E) => {
				const { field: D } = E;
				return t.jsxs(q, {
					children: [
						t.jsx(I, { children: "Nouveau mot de passe" }),
						t.jsx($, {
							children: t.jsxs("div", {
								className: "relative",
								children: [
									t.jsx(Y, {
										type: n ? "text" : "password",
										placeholder: `Nouveau mot de passe (min. ${Be.passwordMinLength} caractères)`,
										...D,
									}),
									t.jsx(Z, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className:
											"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
										onClick: () => o(!n),
										"aria-label": n
											? "Masquer le mot de passe"
											: "Afficher le mot de passe",
										children: n
											? t.jsx(Re, { className: "h-4 w-4" })
											: t.jsx(qe, { className: "h-4 w-4" }),
									}),
								],
							}),
						}),
						t.jsx(ci, { password: j }),
						t.jsx(B, {}),
					],
				});
			}),
			(e[15] = j),
			(e[16] = n),
			(e[17] = T))
		: (T = e[17]);
	let L;
	e[18] !== d.control || e[19] !== T
		? ((L = t.jsx(R, { control: d.control, name: "newPassword", render: T })),
			(e[18] = d.control),
			(e[19] = T),
			(e[20] = L))
		: (L = e[20]);
	let M;
	e[21] !== r
		? ((M = (E) => {
				const { field: D } = E;
				return t.jsxs(q, {
					children: [
						t.jsx(I, { children: "Confirmer le nouveau mot de passe" }),
						t.jsx($, {
							children: t.jsxs("div", {
								className: "relative",
								children: [
									t.jsx(Y, {
										type: r ? "text" : "password",
										placeholder: "Confirmer le nouveau mot de passe",
										...D,
									}),
									t.jsx(Z, {
										type: "button",
										variant: "ghost",
										size: "sm",
										className:
											"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
										onClick: () => c(!r),
										"aria-label": r
											? "Masquer le mot de passe"
											: "Afficher le mot de passe",
										children: r
											? t.jsx(Re, { className: "h-4 w-4" })
											: t.jsx(qe, { className: "h-4 w-4" }),
									}),
								],
							}),
						}),
						t.jsx(B, {}),
					],
				});
			}),
			(e[21] = r),
			(e[22] = M))
		: (M = e[22]);
	let K;
	e[23] !== d.control || e[24] !== M
		? ((K = t.jsx(R, {
				control: d.control,
				name: "confirmNewPassword",
				render: M,
			})),
			(e[23] = d.control),
			(e[24] = M),
			(e[25] = K))
		: (K = e[25]);
	let C;
	e[26] !== K || e[27] !== _ || e[28] !== L
		? ((C = t.jsxs("div", { className: "space-y-4", children: [_, L, K] })),
			(e[26] = K),
			(e[27] = _),
			(e[28] = L),
			(e[29] = C))
		: (C = e[29]);
	const Q = p ? "Mise à jour..." : "Mettre à jour le mot de passe";
	let U;
	e[30] !== p || e[31] !== Q
		? ((U = t.jsx(Z, {
				type: "submit",
				disabled: p,
				className: "w-full",
				children: Q,
			})),
			(e[30] = p),
			(e[31] = Q),
			(e[32] = U))
		: (U = e[32]);
	let N;
	e[33] !== C || e[34] !== U || e[35] !== y
		? ((N = t.jsxs("form", {
				onSubmit: y,
				className: "space-y-6",
				children: [C, U],
			})),
			(e[33] = C),
			(e[34] = U),
			(e[35] = y),
			(e[36] = N))
		: (N = e[36]);
	let H;
	return (
		e[37] !== d || e[38] !== N
			? ((H = t.jsx(Xe, { ...d, children: N })),
				(e[37] = d),
				(e[38] = N),
				(e[39] = H))
			: (H = e[39]),
		H
	);
}
var Ie = { exports: {} },
	Le,
	ka;
function Ai() {
	if (ka) return Le;
	ka = 1;
	var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
	return (Le = e), Le;
}
var Me, Da;
function Fi() {
	if (Da) return Me;
	Da = 1;
	var e = Ai();
	function a() {}
	function i() {}
	return (
		(i.resetWarningCache = a),
		(Me = () => {
			function n(c, s, d, b, w, p) {
				if (p !== e) {
					var u = new Error(
						"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
					);
					throw ((u.name = "Invariant Violation"), u);
				}
			}
			n.isRequired = n;
			function o() {
				return n;
			}
			var r = {
				array: n,
				bigint: n,
				bool: n,
				func: n,
				number: n,
				object: n,
				string: n,
				symbol: n,
				any: n,
				arrayOf: o,
				element: n,
				elementType: n,
				instanceOf: o,
				node: n,
				objectOf: o,
				oneOf: o,
				oneOfType: o,
				shape: o,
				exact: o,
				checkPropTypes: i,
				resetWarningCache: a,
			};
			return (r.PropTypes = r), r;
		}),
		Me
	);
}
var za;
function Oi() {
	return za || ((za = 1), (Ie.exports = Fi()())), Ie.exports;
}
var _i = Oi();
const h = Ma(_i),
	Ni = new Map([
		["1km", "application/vnd.1000minds.decision-model+xml"],
		["3dml", "text/vnd.in3d.3dml"],
		["3ds", "image/x-3ds"],
		["3g2", "video/3gpp2"],
		["3gp", "video/3gp"],
		["3gpp", "video/3gpp"],
		["3mf", "model/3mf"],
		["7z", "application/x-7z-compressed"],
		["7zip", "application/x-7z-compressed"],
		["123", "application/vnd.lotus-1-2-3"],
		["aab", "application/x-authorware-bin"],
		["aac", "audio/x-acc"],
		["aam", "application/x-authorware-map"],
		["aas", "application/x-authorware-seg"],
		["abw", "application/x-abiword"],
		["ac", "application/vnd.nokia.n-gage.ac+xml"],
		["ac3", "audio/ac3"],
		["acc", "application/vnd.americandynamics.acc"],
		["ace", "application/x-ace-compressed"],
		["acu", "application/vnd.acucobol"],
		["acutc", "application/vnd.acucorp"],
		["adp", "audio/adpcm"],
		["aep", "application/vnd.audiograph"],
		["afm", "application/x-font-type1"],
		["afp", "application/vnd.ibm.modcap"],
		["ahead", "application/vnd.ahead.space"],
		["ai", "application/pdf"],
		["aif", "audio/x-aiff"],
		["aifc", "audio/x-aiff"],
		["aiff", "audio/x-aiff"],
		["air", "application/vnd.adobe.air-application-installer-package+zip"],
		["ait", "application/vnd.dvb.ait"],
		["ami", "application/vnd.amiga.ami"],
		["amr", "audio/amr"],
		["apk", "application/vnd.android.package-archive"],
		["apng", "image/apng"],
		["appcache", "text/cache-manifest"],
		["application", "application/x-ms-application"],
		["apr", "application/vnd.lotus-approach"],
		["arc", "application/x-freearc"],
		["arj", "application/x-arj"],
		["asc", "application/pgp-signature"],
		["asf", "video/x-ms-asf"],
		["asm", "text/x-asm"],
		["aso", "application/vnd.accpac.simply.aso"],
		["asx", "video/x-ms-asf"],
		["atc", "application/vnd.acucorp"],
		["atom", "application/atom+xml"],
		["atomcat", "application/atomcat+xml"],
		["atomdeleted", "application/atomdeleted+xml"],
		["atomsvc", "application/atomsvc+xml"],
		["atx", "application/vnd.antix.game-component"],
		["au", "audio/x-au"],
		["avi", "video/x-msvideo"],
		["avif", "image/avif"],
		["aw", "application/applixware"],
		["azf", "application/vnd.airzip.filesecure.azf"],
		["azs", "application/vnd.airzip.filesecure.azs"],
		["azv", "image/vnd.airzip.accelerator.azv"],
		["azw", "application/vnd.amazon.ebook"],
		["b16", "image/vnd.pco.b16"],
		["bat", "application/x-msdownload"],
		["bcpio", "application/x-bcpio"],
		["bdf", "application/x-font-bdf"],
		["bdm", "application/vnd.syncml.dm+wbxml"],
		["bdoc", "application/x-bdoc"],
		["bed", "application/vnd.realvnc.bed"],
		["bh2", "application/vnd.fujitsu.oasysprs"],
		["bin", "application/octet-stream"],
		["blb", "application/x-blorb"],
		["blorb", "application/x-blorb"],
		["bmi", "application/vnd.bmi"],
		["bmml", "application/vnd.balsamiq.bmml+xml"],
		["bmp", "image/bmp"],
		["book", "application/vnd.framemaker"],
		["box", "application/vnd.previewsystems.box"],
		["boz", "application/x-bzip2"],
		["bpk", "application/octet-stream"],
		["bpmn", "application/octet-stream"],
		["bsp", "model/vnd.valve.source.compiled-map"],
		["btif", "image/prs.btif"],
		["buffer", "application/octet-stream"],
		["bz", "application/x-bzip"],
		["bz2", "application/x-bzip2"],
		["c", "text/x-c"],
		["c4d", "application/vnd.clonk.c4group"],
		["c4f", "application/vnd.clonk.c4group"],
		["c4g", "application/vnd.clonk.c4group"],
		["c4p", "application/vnd.clonk.c4group"],
		["c4u", "application/vnd.clonk.c4group"],
		["c11amc", "application/vnd.cluetrust.cartomobile-config"],
		["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
		["cab", "application/vnd.ms-cab-compressed"],
		["caf", "audio/x-caf"],
		["cap", "application/vnd.tcpdump.pcap"],
		["car", "application/vnd.curl.car"],
		["cat", "application/vnd.ms-pki.seccat"],
		["cb7", "application/x-cbr"],
		["cba", "application/x-cbr"],
		["cbr", "application/x-cbr"],
		["cbt", "application/x-cbr"],
		["cbz", "application/x-cbr"],
		["cc", "text/x-c"],
		["cco", "application/x-cocoa"],
		["cct", "application/x-director"],
		["ccxml", "application/ccxml+xml"],
		["cdbcmsg", "application/vnd.contact.cmsg"],
		["cda", "application/x-cdf"],
		["cdf", "application/x-netcdf"],
		["cdfx", "application/cdfx+xml"],
		["cdkey", "application/vnd.mediastation.cdkey"],
		["cdmia", "application/cdmi-capability"],
		["cdmic", "application/cdmi-container"],
		["cdmid", "application/cdmi-domain"],
		["cdmio", "application/cdmi-object"],
		["cdmiq", "application/cdmi-queue"],
		["cdr", "application/cdr"],
		["cdx", "chemical/x-cdx"],
		["cdxml", "application/vnd.chemdraw+xml"],
		["cdy", "application/vnd.cinderella"],
		["cer", "application/pkix-cert"],
		["cfs", "application/x-cfs-compressed"],
		["cgm", "image/cgm"],
		["chat", "application/x-chat"],
		["chm", "application/vnd.ms-htmlhelp"],
		["chrt", "application/vnd.kde.kchart"],
		["cif", "chemical/x-cif"],
		["cii", "application/vnd.anser-web-certificate-issue-initiation"],
		["cil", "application/vnd.ms-artgalry"],
		["cjs", "application/node"],
		["cla", "application/vnd.claymore"],
		["class", "application/octet-stream"],
		["clkk", "application/vnd.crick.clicker.keyboard"],
		["clkp", "application/vnd.crick.clicker.palette"],
		["clkt", "application/vnd.crick.clicker.template"],
		["clkw", "application/vnd.crick.clicker.wordbank"],
		["clkx", "application/vnd.crick.clicker"],
		["clp", "application/x-msclip"],
		["cmc", "application/vnd.cosmocaller"],
		["cmdf", "chemical/x-cmdf"],
		["cml", "chemical/x-cml"],
		["cmp", "application/vnd.yellowriver-custom-menu"],
		["cmx", "image/x-cmx"],
		["cod", "application/vnd.rim.cod"],
		["coffee", "text/coffeescript"],
		["com", "application/x-msdownload"],
		["conf", "text/plain"],
		["cpio", "application/x-cpio"],
		["cpp", "text/x-c"],
		["cpt", "application/mac-compactpro"],
		["crd", "application/x-mscardfile"],
		["crl", "application/pkix-crl"],
		["crt", "application/x-x509-ca-cert"],
		["crx", "application/x-chrome-extension"],
		["cryptonote", "application/vnd.rig.cryptonote"],
		["csh", "application/x-csh"],
		["csl", "application/vnd.citationstyles.style+xml"],
		["csml", "chemical/x-csml"],
		["csp", "application/vnd.commonspace"],
		["csr", "application/octet-stream"],
		["css", "text/css"],
		["cst", "application/x-director"],
		["csv", "text/csv"],
		["cu", "application/cu-seeme"],
		["curl", "text/vnd.curl"],
		["cww", "application/prs.cww"],
		["cxt", "application/x-director"],
		["cxx", "text/x-c"],
		["dae", "model/vnd.collada+xml"],
		["daf", "application/vnd.mobius.daf"],
		["dart", "application/vnd.dart"],
		["dataless", "application/vnd.fdsn.seed"],
		["davmount", "application/davmount+xml"],
		["dbf", "application/vnd.dbf"],
		["dbk", "application/docbook+xml"],
		["dcr", "application/x-director"],
		["dcurl", "text/vnd.curl.dcurl"],
		["dd2", "application/vnd.oma.dd2+xml"],
		["ddd", "application/vnd.fujixerox.ddd"],
		["ddf", "application/vnd.syncml.dmddf+xml"],
		["dds", "image/vnd.ms-dds"],
		["deb", "application/x-debian-package"],
		["def", "text/plain"],
		["deploy", "application/octet-stream"],
		["der", "application/x-x509-ca-cert"],
		["dfac", "application/vnd.dreamfactory"],
		["dgc", "application/x-dgc-compressed"],
		["dic", "text/x-c"],
		["dir", "application/x-director"],
		["dis", "application/vnd.mobius.dis"],
		["disposition-notification", "message/disposition-notification"],
		["dist", "application/octet-stream"],
		["distz", "application/octet-stream"],
		["djv", "image/vnd.djvu"],
		["djvu", "image/vnd.djvu"],
		["dll", "application/octet-stream"],
		["dmg", "application/x-apple-diskimage"],
		["dmn", "application/octet-stream"],
		["dmp", "application/vnd.tcpdump.pcap"],
		["dms", "application/octet-stream"],
		["dna", "application/vnd.dna"],
		["doc", "application/msword"],
		["docm", "application/vnd.ms-word.template.macroEnabled.12"],
		[
			"docx",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		],
		["dot", "application/msword"],
		["dotm", "application/vnd.ms-word.template.macroEnabled.12"],
		[
			"dotx",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		],
		["dp", "application/vnd.osgi.dp"],
		["dpg", "application/vnd.dpgraph"],
		["dra", "audio/vnd.dra"],
		["drle", "image/dicom-rle"],
		["dsc", "text/prs.lines.tag"],
		["dssc", "application/dssc+der"],
		["dtb", "application/x-dtbook+xml"],
		["dtd", "application/xml-dtd"],
		["dts", "audio/vnd.dts"],
		["dtshd", "audio/vnd.dts.hd"],
		["dump", "application/octet-stream"],
		["dvb", "video/vnd.dvb.file"],
		["dvi", "application/x-dvi"],
		["dwd", "application/atsc-dwd+xml"],
		["dwf", "model/vnd.dwf"],
		["dwg", "image/vnd.dwg"],
		["dxf", "image/vnd.dxf"],
		["dxp", "application/vnd.spotfire.dxp"],
		["dxr", "application/x-director"],
		["ear", "application/java-archive"],
		["ecelp4800", "audio/vnd.nuera.ecelp4800"],
		["ecelp7470", "audio/vnd.nuera.ecelp7470"],
		["ecelp9600", "audio/vnd.nuera.ecelp9600"],
		["ecma", "application/ecmascript"],
		["edm", "application/vnd.novadigm.edm"],
		["edx", "application/vnd.novadigm.edx"],
		["efif", "application/vnd.picsel"],
		["ei6", "application/vnd.pg.osasli"],
		["elc", "application/octet-stream"],
		["emf", "image/emf"],
		["eml", "message/rfc822"],
		["emma", "application/emma+xml"],
		["emotionml", "application/emotionml+xml"],
		["emz", "application/x-msmetafile"],
		["eol", "audio/vnd.digital-winds"],
		["eot", "application/vnd.ms-fontobject"],
		["eps", "application/postscript"],
		["epub", "application/epub+zip"],
		["es", "application/ecmascript"],
		["es3", "application/vnd.eszigno3+xml"],
		["esa", "application/vnd.osgi.subsystem"],
		["esf", "application/vnd.epson.esf"],
		["et3", "application/vnd.eszigno3+xml"],
		["etx", "text/x-setext"],
		["eva", "application/x-eva"],
		["evy", "application/x-envoy"],
		["exe", "application/octet-stream"],
		["exi", "application/exi"],
		["exp", "application/express"],
		["exr", "image/aces"],
		["ext", "application/vnd.novadigm.ext"],
		["ez", "application/andrew-inset"],
		["ez2", "application/vnd.ezpix-album"],
		["ez3", "application/vnd.ezpix-package"],
		["f", "text/x-fortran"],
		["f4v", "video/mp4"],
		["f77", "text/x-fortran"],
		["f90", "text/x-fortran"],
		["fbs", "image/vnd.fastbidsheet"],
		["fcdt", "application/vnd.adobe.formscentral.fcdt"],
		["fcs", "application/vnd.isac.fcs"],
		["fdf", "application/vnd.fdf"],
		["fdt", "application/fdt+xml"],
		["fe_launch", "application/vnd.denovo.fcselayout-link"],
		["fg5", "application/vnd.fujitsu.oasysgp"],
		["fgd", "application/x-director"],
		["fh", "image/x-freehand"],
		["fh4", "image/x-freehand"],
		["fh5", "image/x-freehand"],
		["fh7", "image/x-freehand"],
		["fhc", "image/x-freehand"],
		["fig", "application/x-xfig"],
		["fits", "image/fits"],
		["flac", "audio/x-flac"],
		["fli", "video/x-fli"],
		["flo", "application/vnd.micrografx.flo"],
		["flv", "video/x-flv"],
		["flw", "application/vnd.kde.kivio"],
		["flx", "text/vnd.fmi.flexstor"],
		["fly", "text/vnd.fly"],
		["fm", "application/vnd.framemaker"],
		["fnc", "application/vnd.frogans.fnc"],
		["fo", "application/vnd.software602.filler.form+xml"],
		["for", "text/x-fortran"],
		["fpx", "image/vnd.fpx"],
		["frame", "application/vnd.framemaker"],
		["fsc", "application/vnd.fsc.weblaunch"],
		["fst", "image/vnd.fst"],
		["ftc", "application/vnd.fluxtime.clip"],
		["fti", "application/vnd.anser-web-funds-transfer-initiation"],
		["fvt", "video/vnd.fvt"],
		["fxp", "application/vnd.adobe.fxp"],
		["fxpl", "application/vnd.adobe.fxp"],
		["fzs", "application/vnd.fuzzysheet"],
		["g2w", "application/vnd.geoplan"],
		["g3", "image/g3fax"],
		["g3w", "application/vnd.geospace"],
		["gac", "application/vnd.groove-account"],
		["gam", "application/x-tads"],
		["gbr", "application/rpki-ghostbusters"],
		["gca", "application/x-gca-compressed"],
		["gdl", "model/vnd.gdl"],
		["gdoc", "application/vnd.google-apps.document"],
		["geo", "application/vnd.dynageo"],
		["geojson", "application/geo+json"],
		["gex", "application/vnd.geometry-explorer"],
		["ggb", "application/vnd.geogebra.file"],
		["ggt", "application/vnd.geogebra.tool"],
		["ghf", "application/vnd.groove-help"],
		["gif", "image/gif"],
		["gim", "application/vnd.groove-identity-message"],
		["glb", "model/gltf-binary"],
		["gltf", "model/gltf+json"],
		["gml", "application/gml+xml"],
		["gmx", "application/vnd.gmx"],
		["gnumeric", "application/x-gnumeric"],
		["gpg", "application/gpg-keys"],
		["gph", "application/vnd.flographit"],
		["gpx", "application/gpx+xml"],
		["gqf", "application/vnd.grafeq"],
		["gqs", "application/vnd.grafeq"],
		["gram", "application/srgs"],
		["gramps", "application/x-gramps-xml"],
		["gre", "application/vnd.geometry-explorer"],
		["grv", "application/vnd.groove-injector"],
		["grxml", "application/srgs+xml"],
		["gsf", "application/x-font-ghostscript"],
		["gsheet", "application/vnd.google-apps.spreadsheet"],
		["gslides", "application/vnd.google-apps.presentation"],
		["gtar", "application/x-gtar"],
		["gtm", "application/vnd.groove-tool-message"],
		["gtw", "model/vnd.gtw"],
		["gv", "text/vnd.graphviz"],
		["gxf", "application/gxf"],
		["gxt", "application/vnd.geonext"],
		["gz", "application/gzip"],
		["gzip", "application/gzip"],
		["h", "text/x-c"],
		["h261", "video/h261"],
		["h263", "video/h263"],
		["h264", "video/h264"],
		["hal", "application/vnd.hal+xml"],
		["hbci", "application/vnd.hbci"],
		["hbs", "text/x-handlebars-template"],
		["hdd", "application/x-virtualbox-hdd"],
		["hdf", "application/x-hdf"],
		["heic", "image/heic"],
		["heics", "image/heic-sequence"],
		["heif", "image/heif"],
		["heifs", "image/heif-sequence"],
		["hej2", "image/hej2k"],
		["held", "application/atsc-held+xml"],
		["hh", "text/x-c"],
		["hjson", "application/hjson"],
		["hlp", "application/winhlp"],
		["hpgl", "application/vnd.hp-hpgl"],
		["hpid", "application/vnd.hp-hpid"],
		["hps", "application/vnd.hp-hps"],
		["hqx", "application/mac-binhex40"],
		["hsj2", "image/hsj2"],
		["htc", "text/x-component"],
		["htke", "application/vnd.kenameaapp"],
		["htm", "text/html"],
		["html", "text/html"],
		["hvd", "application/vnd.yamaha.hv-dic"],
		["hvp", "application/vnd.yamaha.hv-voice"],
		["hvs", "application/vnd.yamaha.hv-script"],
		["i2g", "application/vnd.intergeo"],
		["icc", "application/vnd.iccprofile"],
		["ice", "x-conference/x-cooltalk"],
		["icm", "application/vnd.iccprofile"],
		["ico", "image/x-icon"],
		["ics", "text/calendar"],
		["ief", "image/ief"],
		["ifb", "text/calendar"],
		["ifm", "application/vnd.shana.informed.formdata"],
		["iges", "model/iges"],
		["igl", "application/vnd.igloader"],
		["igm", "application/vnd.insors.igm"],
		["igs", "model/iges"],
		["igx", "application/vnd.micrografx.igx"],
		["iif", "application/vnd.shana.informed.interchange"],
		["img", "application/octet-stream"],
		["imp", "application/vnd.accpac.simply.imp"],
		["ims", "application/vnd.ms-ims"],
		["in", "text/plain"],
		["ini", "text/plain"],
		["ink", "application/inkml+xml"],
		["inkml", "application/inkml+xml"],
		["install", "application/x-install-instructions"],
		["iota", "application/vnd.astraea-software.iota"],
		["ipfix", "application/ipfix"],
		["ipk", "application/vnd.shana.informed.package"],
		["irm", "application/vnd.ibm.rights-management"],
		["irp", "application/vnd.irepository.package+xml"],
		["iso", "application/x-iso9660-image"],
		["itp", "application/vnd.shana.informed.formtemplate"],
		["its", "application/its+xml"],
		["ivp", "application/vnd.immervision-ivp"],
		["ivu", "application/vnd.immervision-ivu"],
		["jad", "text/vnd.sun.j2me.app-descriptor"],
		["jade", "text/jade"],
		["jam", "application/vnd.jam"],
		["jar", "application/java-archive"],
		["jardiff", "application/x-java-archive-diff"],
		["java", "text/x-java-source"],
		["jhc", "image/jphc"],
		["jisp", "application/vnd.jisp"],
		["jls", "image/jls"],
		["jlt", "application/vnd.hp-jlyt"],
		["jng", "image/x-jng"],
		["jnlp", "application/x-java-jnlp-file"],
		["joda", "application/vnd.joost.joda-archive"],
		["jp2", "image/jp2"],
		["jpe", "image/jpeg"],
		["jpeg", "image/jpeg"],
		["jpf", "image/jpx"],
		["jpg", "image/jpeg"],
		["jpg2", "image/jp2"],
		["jpgm", "video/jpm"],
		["jpgv", "video/jpeg"],
		["jph", "image/jph"],
		["jpm", "video/jpm"],
		["jpx", "image/jpx"],
		["js", "application/javascript"],
		["json", "application/json"],
		["json5", "application/json5"],
		["jsonld", "application/ld+json"],
		["jsonl", "application/jsonl"],
		["jsonml", "application/jsonml+json"],
		["jsx", "text/jsx"],
		["jxr", "image/jxr"],
		["jxra", "image/jxra"],
		["jxrs", "image/jxrs"],
		["jxs", "image/jxs"],
		["jxsc", "image/jxsc"],
		["jxsi", "image/jxsi"],
		["jxss", "image/jxss"],
		["kar", "audio/midi"],
		["karbon", "application/vnd.kde.karbon"],
		["kdb", "application/octet-stream"],
		["kdbx", "application/x-keepass2"],
		["key", "application/x-iwork-keynote-sffkey"],
		["kfo", "application/vnd.kde.kformula"],
		["kia", "application/vnd.kidspiration"],
		["kml", "application/vnd.google-earth.kml+xml"],
		["kmz", "application/vnd.google-earth.kmz"],
		["kne", "application/vnd.kinar"],
		["knp", "application/vnd.kinar"],
		["kon", "application/vnd.kde.kontour"],
		["kpr", "application/vnd.kde.kpresenter"],
		["kpt", "application/vnd.kde.kpresenter"],
		["kpxx", "application/vnd.ds-keypoint"],
		["ksp", "application/vnd.kde.kspread"],
		["ktr", "application/vnd.kahootz"],
		["ktx", "image/ktx"],
		["ktx2", "image/ktx2"],
		["ktz", "application/vnd.kahootz"],
		["kwd", "application/vnd.kde.kword"],
		["kwt", "application/vnd.kde.kword"],
		["lasxml", "application/vnd.las.las+xml"],
		["latex", "application/x-latex"],
		["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
		["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
		["les", "application/vnd.hhe.lesson-player"],
		["less", "text/less"],
		["lgr", "application/lgr+xml"],
		["lha", "application/octet-stream"],
		["link66", "application/vnd.route66.link66+xml"],
		["list", "text/plain"],
		["list3820", "application/vnd.ibm.modcap"],
		["listafp", "application/vnd.ibm.modcap"],
		["litcoffee", "text/coffeescript"],
		["lnk", "application/x-ms-shortcut"],
		["log", "text/plain"],
		["lostxml", "application/lost+xml"],
		["lrf", "application/octet-stream"],
		["lrm", "application/vnd.ms-lrm"],
		["ltf", "application/vnd.frogans.ltf"],
		["lua", "text/x-lua"],
		["luac", "application/x-lua-bytecode"],
		["lvp", "audio/vnd.lucent.voice"],
		["lwp", "application/vnd.lotus-wordpro"],
		["lzh", "application/octet-stream"],
		["m1v", "video/mpeg"],
		["m2a", "audio/mpeg"],
		["m2v", "video/mpeg"],
		["m3a", "audio/mpeg"],
		["m3u", "text/plain"],
		["m3u8", "application/vnd.apple.mpegurl"],
		["m4a", "audio/x-m4a"],
		["m4p", "application/mp4"],
		["m4s", "video/iso.segment"],
		["m4u", "application/vnd.mpegurl"],
		["m4v", "video/x-m4v"],
		["m13", "application/x-msmediaview"],
		["m14", "application/x-msmediaview"],
		["m21", "application/mp21"],
		["ma", "application/mathematica"],
		["mads", "application/mads+xml"],
		["maei", "application/mmt-aei+xml"],
		["mag", "application/vnd.ecowin.chart"],
		["maker", "application/vnd.framemaker"],
		["man", "text/troff"],
		["manifest", "text/cache-manifest"],
		["map", "application/json"],
		["mar", "application/octet-stream"],
		["markdown", "text/markdown"],
		["mathml", "application/mathml+xml"],
		["mb", "application/mathematica"],
		["mbk", "application/vnd.mobius.mbk"],
		["mbox", "application/mbox"],
		["mc1", "application/vnd.medcalcdata"],
		["mcd", "application/vnd.mcd"],
		["mcurl", "text/vnd.curl.mcurl"],
		["md", "text/markdown"],
		["mdb", "application/x-msaccess"],
		["mdi", "image/vnd.ms-modi"],
		["mdx", "text/mdx"],
		["me", "text/troff"],
		["mesh", "model/mesh"],
		["meta4", "application/metalink4+xml"],
		["metalink", "application/metalink+xml"],
		["mets", "application/mets+xml"],
		["mfm", "application/vnd.mfmp"],
		["mft", "application/rpki-manifest"],
		["mgp", "application/vnd.osgeo.mapguide.package"],
		["mgz", "application/vnd.proteus.magazine"],
		["mid", "audio/midi"],
		["midi", "audio/midi"],
		["mie", "application/x-mie"],
		["mif", "application/vnd.mif"],
		["mime", "message/rfc822"],
		["mj2", "video/mj2"],
		["mjp2", "video/mj2"],
		["mjs", "application/javascript"],
		["mk3d", "video/x-matroska"],
		["mka", "audio/x-matroska"],
		["mkd", "text/x-markdown"],
		["mks", "video/x-matroska"],
		["mkv", "video/x-matroska"],
		["mlp", "application/vnd.dolby.mlp"],
		["mmd", "application/vnd.chipnuts.karaoke-mmd"],
		["mmf", "application/vnd.smaf"],
		["mml", "text/mathml"],
		["mmr", "image/vnd.fujixerox.edmics-mmr"],
		["mng", "video/x-mng"],
		["mny", "application/x-msmoney"],
		["mobi", "application/x-mobipocket-ebook"],
		["mods", "application/mods+xml"],
		["mov", "video/quicktime"],
		["movie", "video/x-sgi-movie"],
		["mp2", "audio/mpeg"],
		["mp2a", "audio/mpeg"],
		["mp3", "audio/mpeg"],
		["mp4", "video/mp4"],
		["mp4a", "audio/mp4"],
		["mp4s", "application/mp4"],
		["mp4v", "video/mp4"],
		["mp21", "application/mp21"],
		["mpc", "application/vnd.mophun.certificate"],
		["mpd", "application/dash+xml"],
		["mpe", "video/mpeg"],
		["mpeg", "video/mpeg"],
		["mpg", "video/mpeg"],
		["mpg4", "video/mp4"],
		["mpga", "audio/mpeg"],
		["mpkg", "application/vnd.apple.installer+xml"],
		["mpm", "application/vnd.blueice.multipass"],
		["mpn", "application/vnd.mophun.application"],
		["mpp", "application/vnd.ms-project"],
		["mpt", "application/vnd.ms-project"],
		["mpy", "application/vnd.ibm.minipay"],
		["mqy", "application/vnd.mobius.mqy"],
		["mrc", "application/marc"],
		["mrcx", "application/marcxml+xml"],
		["ms", "text/troff"],
		["mscml", "application/mediaservercontrol+xml"],
		["mseed", "application/vnd.fdsn.mseed"],
		["mseq", "application/vnd.mseq"],
		["msf", "application/vnd.epson.msf"],
		["msg", "application/vnd.ms-outlook"],
		["msh", "model/mesh"],
		["msi", "application/x-msdownload"],
		["msl", "application/vnd.mobius.msl"],
		["msm", "application/octet-stream"],
		["msp", "application/octet-stream"],
		["msty", "application/vnd.muvee.style"],
		["mtl", "model/mtl"],
		["mts", "model/vnd.mts"],
		["mus", "application/vnd.musician"],
		["musd", "application/mmt-usd+xml"],
		["musicxml", "application/vnd.recordare.musicxml+xml"],
		["mvb", "application/x-msmediaview"],
		["mvt", "application/vnd.mapbox-vector-tile"],
		["mwf", "application/vnd.mfer"],
		["mxf", "application/mxf"],
		["mxl", "application/vnd.recordare.musicxml"],
		["mxmf", "audio/mobile-xmf"],
		["mxml", "application/xv+xml"],
		["mxs", "application/vnd.triscape.mxs"],
		["mxu", "video/vnd.mpegurl"],
		["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
		["n3", "text/n3"],
		["nb", "application/mathematica"],
		["nbp", "application/vnd.wolfram.player"],
		["nc", "application/x-netcdf"],
		["ncx", "application/x-dtbncx+xml"],
		["nfo", "text/x-nfo"],
		["ngdat", "application/vnd.nokia.n-gage.data"],
		["nitf", "application/vnd.nitf"],
		["nlu", "application/vnd.neurolanguage.nlu"],
		["nml", "application/vnd.enliven"],
		["nnd", "application/vnd.noblenet-directory"],
		["nns", "application/vnd.noblenet-sealer"],
		["nnw", "application/vnd.noblenet-web"],
		["npx", "image/vnd.net-fpx"],
		["nq", "application/n-quads"],
		["nsc", "application/x-conference"],
		["nsf", "application/vnd.lotus-notes"],
		["nt", "application/n-triples"],
		["ntf", "application/vnd.nitf"],
		["numbers", "application/x-iwork-numbers-sffnumbers"],
		["nzb", "application/x-nzb"],
		["oa2", "application/vnd.fujitsu.oasys2"],
		["oa3", "application/vnd.fujitsu.oasys3"],
		["oas", "application/vnd.fujitsu.oasys"],
		["obd", "application/x-msbinder"],
		["obgx", "application/vnd.openblox.game+xml"],
		["obj", "model/obj"],
		["oda", "application/oda"],
		["odb", "application/vnd.oasis.opendocument.database"],
		["odc", "application/vnd.oasis.opendocument.chart"],
		["odf", "application/vnd.oasis.opendocument.formula"],
		["odft", "application/vnd.oasis.opendocument.formula-template"],
		["odg", "application/vnd.oasis.opendocument.graphics"],
		["odi", "application/vnd.oasis.opendocument.image"],
		["odm", "application/vnd.oasis.opendocument.text-master"],
		["odp", "application/vnd.oasis.opendocument.presentation"],
		["ods", "application/vnd.oasis.opendocument.spreadsheet"],
		["odt", "application/vnd.oasis.opendocument.text"],
		["oga", "audio/ogg"],
		["ogex", "model/vnd.opengex"],
		["ogg", "audio/ogg"],
		["ogv", "video/ogg"],
		["ogx", "application/ogg"],
		["omdoc", "application/omdoc+xml"],
		["onepkg", "application/onenote"],
		["onetmp", "application/onenote"],
		["onetoc", "application/onenote"],
		["onetoc2", "application/onenote"],
		["opf", "application/oebps-package+xml"],
		["opml", "text/x-opml"],
		["oprc", "application/vnd.palm"],
		["opus", "audio/ogg"],
		["org", "text/x-org"],
		["osf", "application/vnd.yamaha.openscoreformat"],
		["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
		["osm", "application/vnd.openstreetmap.data+xml"],
		["otc", "application/vnd.oasis.opendocument.chart-template"],
		["otf", "font/otf"],
		["otg", "application/vnd.oasis.opendocument.graphics-template"],
		["oth", "application/vnd.oasis.opendocument.text-web"],
		["oti", "application/vnd.oasis.opendocument.image-template"],
		["otp", "application/vnd.oasis.opendocument.presentation-template"],
		["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
		["ott", "application/vnd.oasis.opendocument.text-template"],
		["ova", "application/x-virtualbox-ova"],
		["ovf", "application/x-virtualbox-ovf"],
		["owl", "application/rdf+xml"],
		["oxps", "application/oxps"],
		["oxt", "application/vnd.openofficeorg.extension"],
		["p", "text/x-pascal"],
		["p7a", "application/x-pkcs7-signature"],
		["p7b", "application/x-pkcs7-certificates"],
		["p7c", "application/pkcs7-mime"],
		["p7m", "application/pkcs7-mime"],
		["p7r", "application/x-pkcs7-certreqresp"],
		["p7s", "application/pkcs7-signature"],
		["p8", "application/pkcs8"],
		["p10", "application/x-pkcs10"],
		["p12", "application/x-pkcs12"],
		["pac", "application/x-ns-proxy-autoconfig"],
		["pages", "application/x-iwork-pages-sffpages"],
		["pas", "text/x-pascal"],
		["paw", "application/vnd.pawaafile"],
		["pbd", "application/vnd.powerbuilder6"],
		["pbm", "image/x-portable-bitmap"],
		["pcap", "application/vnd.tcpdump.pcap"],
		["pcf", "application/x-font-pcf"],
		["pcl", "application/vnd.hp-pcl"],
		["pclxl", "application/vnd.hp-pclxl"],
		["pct", "image/x-pict"],
		["pcurl", "application/vnd.curl.pcurl"],
		["pcx", "image/x-pcx"],
		["pdb", "application/x-pilot"],
		["pde", "text/x-processing"],
		["pdf", "application/pdf"],
		["pem", "application/x-x509-user-cert"],
		["pfa", "application/x-font-type1"],
		["pfb", "application/x-font-type1"],
		["pfm", "application/x-font-type1"],
		["pfr", "application/font-tdpfr"],
		["pfx", "application/x-pkcs12"],
		["pgm", "image/x-portable-graymap"],
		["pgn", "application/x-chess-pgn"],
		["pgp", "application/pgp"],
		["php", "application/x-httpd-php"],
		["php3", "application/x-httpd-php"],
		["php4", "application/x-httpd-php"],
		["phps", "application/x-httpd-php-source"],
		["phtml", "application/x-httpd-php"],
		["pic", "image/x-pict"],
		["pkg", "application/octet-stream"],
		["pki", "application/pkixcmp"],
		["pkipath", "application/pkix-pkipath"],
		["pkpass", "application/vnd.apple.pkpass"],
		["pl", "application/x-perl"],
		["plb", "application/vnd.3gpp.pic-bw-large"],
		["plc", "application/vnd.mobius.plc"],
		["plf", "application/vnd.pocketlearn"],
		["pls", "application/pls+xml"],
		["pm", "application/x-perl"],
		["pml", "application/vnd.ctc-posml"],
		["png", "image/png"],
		["pnm", "image/x-portable-anymap"],
		["portpkg", "application/vnd.macports.portpkg"],
		["pot", "application/vnd.ms-powerpoint"],
		["potm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"],
		[
			"potx",
			"application/vnd.openxmlformats-officedocument.presentationml.template",
		],
		["ppa", "application/vnd.ms-powerpoint"],
		["ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"],
		["ppd", "application/vnd.cups-ppd"],
		["ppm", "image/x-portable-pixmap"],
		["pps", "application/vnd.ms-powerpoint"],
		["ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],
		[
			"ppsx",
			"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
		],
		["ppt", "application/powerpoint"],
		["pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"],
		[
			"pptx",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		],
		["pqa", "application/vnd.palm"],
		["prc", "application/x-pilot"],
		["pre", "application/vnd.lotus-freelance"],
		["prf", "application/pics-rules"],
		["provx", "application/provenance+xml"],
		["ps", "application/postscript"],
		["psb", "application/vnd.3gpp.pic-bw-small"],
		["psd", "application/x-photoshop"],
		["psf", "application/x-font-linux-psf"],
		["pskcxml", "application/pskc+xml"],
		["pti", "image/prs.pti"],
		["ptid", "application/vnd.pvi.ptid1"],
		["pub", "application/x-mspublisher"],
		["pvb", "application/vnd.3gpp.pic-bw-var"],
		["pwn", "application/vnd.3m.post-it-notes"],
		["pya", "audio/vnd.ms-playready.media.pya"],
		["pyv", "video/vnd.ms-playready.media.pyv"],
		["qam", "application/vnd.epson.quickanime"],
		["qbo", "application/vnd.intu.qbo"],
		["qfx", "application/vnd.intu.qfx"],
		["qps", "application/vnd.publishare-delta-tree"],
		["qt", "video/quicktime"],
		["qwd", "application/vnd.quark.quarkxpress"],
		["qwt", "application/vnd.quark.quarkxpress"],
		["qxb", "application/vnd.quark.quarkxpress"],
		["qxd", "application/vnd.quark.quarkxpress"],
		["qxl", "application/vnd.quark.quarkxpress"],
		["qxt", "application/vnd.quark.quarkxpress"],
		["ra", "audio/x-realaudio"],
		["ram", "audio/x-pn-realaudio"],
		["raml", "application/raml+yaml"],
		["rapd", "application/route-apd+xml"],
		["rar", "application/x-rar"],
		["ras", "image/x-cmu-raster"],
		["rcprofile", "application/vnd.ipunplugged.rcprofile"],
		["rdf", "application/rdf+xml"],
		["rdz", "application/vnd.data-vision.rdz"],
		["relo", "application/p2p-overlay+xml"],
		["rep", "application/vnd.businessobjects"],
		["res", "application/x-dtbresource+xml"],
		["rgb", "image/x-rgb"],
		["rif", "application/reginfo+xml"],
		["rip", "audio/vnd.rip"],
		["ris", "application/x-research-info-systems"],
		["rl", "application/resource-lists+xml"],
		["rlc", "image/vnd.fujixerox.edmics-rlc"],
		["rld", "application/resource-lists-diff+xml"],
		["rm", "audio/x-pn-realaudio"],
		["rmi", "audio/midi"],
		["rmp", "audio/x-pn-realaudio-plugin"],
		["rms", "application/vnd.jcp.javame.midlet-rms"],
		["rmvb", "application/vnd.rn-realmedia-vbr"],
		["rnc", "application/relax-ng-compact-syntax"],
		["rng", "application/xml"],
		["roa", "application/rpki-roa"],
		["roff", "text/troff"],
		["rp9", "application/vnd.cloanto.rp9"],
		["rpm", "audio/x-pn-realaudio-plugin"],
		["rpss", "application/vnd.nokia.radio-presets"],
		["rpst", "application/vnd.nokia.radio-preset"],
		["rq", "application/sparql-query"],
		["rs", "application/rls-services+xml"],
		["rsa", "application/x-pkcs7"],
		["rsat", "application/atsc-rsat+xml"],
		["rsd", "application/rsd+xml"],
		["rsheet", "application/urc-ressheet+xml"],
		["rss", "application/rss+xml"],
		["rtf", "text/rtf"],
		["rtx", "text/richtext"],
		["run", "application/x-makeself"],
		["rusd", "application/route-usd+xml"],
		["rv", "video/vnd.rn-realvideo"],
		["s", "text/x-asm"],
		["s3m", "audio/s3m"],
		["saf", "application/vnd.yamaha.smaf-audio"],
		["sass", "text/x-sass"],
		["sbml", "application/sbml+xml"],
		["sc", "application/vnd.ibm.secure-container"],
		["scd", "application/x-msschedule"],
		["scm", "application/vnd.lotus-screencam"],
		["scq", "application/scvp-cv-request"],
		["scs", "application/scvp-cv-response"],
		["scss", "text/x-scss"],
		["scurl", "text/vnd.curl.scurl"],
		["sda", "application/vnd.stardivision.draw"],
		["sdc", "application/vnd.stardivision.calc"],
		["sdd", "application/vnd.stardivision.impress"],
		["sdkd", "application/vnd.solent.sdkm+xml"],
		["sdkm", "application/vnd.solent.sdkm+xml"],
		["sdp", "application/sdp"],
		["sdw", "application/vnd.stardivision.writer"],
		["sea", "application/octet-stream"],
		["see", "application/vnd.seemail"],
		["seed", "application/vnd.fdsn.seed"],
		["sema", "application/vnd.sema"],
		["semd", "application/vnd.semd"],
		["semf", "application/vnd.semf"],
		["senmlx", "application/senml+xml"],
		["sensmlx", "application/sensml+xml"],
		["ser", "application/java-serialized-object"],
		["setpay", "application/set-payment-initiation"],
		["setreg", "application/set-registration-initiation"],
		["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
		["sfs", "application/vnd.spotfire.sfs"],
		["sfv", "text/x-sfv"],
		["sgi", "image/sgi"],
		["sgl", "application/vnd.stardivision.writer-global"],
		["sgm", "text/sgml"],
		["sgml", "text/sgml"],
		["sh", "application/x-sh"],
		["shar", "application/x-shar"],
		["shex", "text/shex"],
		["shf", "application/shf+xml"],
		["shtml", "text/html"],
		["sid", "image/x-mrsid-image"],
		["sieve", "application/sieve"],
		["sig", "application/pgp-signature"],
		["sil", "audio/silk"],
		["silo", "model/mesh"],
		["sis", "application/vnd.symbian.install"],
		["sisx", "application/vnd.symbian.install"],
		["sit", "application/x-stuffit"],
		["sitx", "application/x-stuffitx"],
		["siv", "application/sieve"],
		["skd", "application/vnd.koan"],
		["skm", "application/vnd.koan"],
		["skp", "application/vnd.koan"],
		["skt", "application/vnd.koan"],
		["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
		[
			"sldx",
			"application/vnd.openxmlformats-officedocument.presentationml.slide",
		],
		["slim", "text/slim"],
		["slm", "text/slim"],
		["sls", "application/route-s-tsid+xml"],
		["slt", "application/vnd.epson.salt"],
		["sm", "application/vnd.stepmania.stepchart"],
		["smf", "application/vnd.stardivision.math"],
		["smi", "application/smil"],
		["smil", "application/smil"],
		["smv", "video/x-smv"],
		["smzip", "application/vnd.stepmania.package"],
		["snd", "audio/basic"],
		["snf", "application/x-font-snf"],
		["so", "application/octet-stream"],
		["spc", "application/x-pkcs7-certificates"],
		["spdx", "text/spdx"],
		["spf", "application/vnd.yamaha.smaf-phrase"],
		["spl", "application/x-futuresplash"],
		["spot", "text/vnd.in3d.spot"],
		["spp", "application/scvp-vp-response"],
		["spq", "application/scvp-vp-request"],
		["spx", "audio/ogg"],
		["sql", "application/x-sql"],
		["src", "application/x-wais-source"],
		["srt", "application/x-subrip"],
		["sru", "application/sru+xml"],
		["srx", "application/sparql-results+xml"],
		["ssdl", "application/ssdl+xml"],
		["sse", "application/vnd.kodak-descriptor"],
		["ssf", "application/vnd.epson.ssf"],
		["ssml", "application/ssml+xml"],
		["sst", "application/octet-stream"],
		["st", "application/vnd.sailingtracker.track"],
		["stc", "application/vnd.sun.xml.calc.template"],
		["std", "application/vnd.sun.xml.draw.template"],
		["stf", "application/vnd.wt.stf"],
		["sti", "application/vnd.sun.xml.impress.template"],
		["stk", "application/hyperstudio"],
		["stl", "model/stl"],
		["stpx", "model/step+xml"],
		["stpxz", "model/step-xml+zip"],
		["stpz", "model/step+zip"],
		["str", "application/vnd.pg.format"],
		["stw", "application/vnd.sun.xml.writer.template"],
		["styl", "text/stylus"],
		["stylus", "text/stylus"],
		["sub", "text/vnd.dvb.subtitle"],
		["sus", "application/vnd.sus-calendar"],
		["susp", "application/vnd.sus-calendar"],
		["sv4cpio", "application/x-sv4cpio"],
		["sv4crc", "application/x-sv4crc"],
		["svc", "application/vnd.dvb.service"],
		["svd", "application/vnd.svd"],
		["svg", "image/svg+xml"],
		["svgz", "image/svg+xml"],
		["swa", "application/x-director"],
		["swf", "application/x-shockwave-flash"],
		["swi", "application/vnd.aristanetworks.swi"],
		["swidtag", "application/swid+xml"],
		["sxc", "application/vnd.sun.xml.calc"],
		["sxd", "application/vnd.sun.xml.draw"],
		["sxg", "application/vnd.sun.xml.writer.global"],
		["sxi", "application/vnd.sun.xml.impress"],
		["sxm", "application/vnd.sun.xml.math"],
		["sxw", "application/vnd.sun.xml.writer"],
		["t", "text/troff"],
		["t3", "application/x-t3vm-image"],
		["t38", "image/t38"],
		["taglet", "application/vnd.mynfc"],
		["tao", "application/vnd.tao.intent-module-archive"],
		["tap", "image/vnd.tencent.tap"],
		["tar", "application/x-tar"],
		["tcap", "application/vnd.3gpp2.tcap"],
		["tcl", "application/x-tcl"],
		["td", "application/urc-targetdesc+xml"],
		["teacher", "application/vnd.smart.teacher"],
		["tei", "application/tei+xml"],
		["teicorpus", "application/tei+xml"],
		["tex", "application/x-tex"],
		["texi", "application/x-texinfo"],
		["texinfo", "application/x-texinfo"],
		["text", "text/plain"],
		["tfi", "application/thraud+xml"],
		["tfm", "application/x-tex-tfm"],
		["tfx", "image/tiff-fx"],
		["tga", "image/x-tga"],
		["tgz", "application/x-tar"],
		["thmx", "application/vnd.ms-officetheme"],
		["tif", "image/tiff"],
		["tiff", "image/tiff"],
		["tk", "application/x-tcl"],
		["tmo", "application/vnd.tmobile-livetv"],
		["toml", "application/toml"],
		["torrent", "application/x-bittorrent"],
		["tpl", "application/vnd.groove-tool-template"],
		["tpt", "application/vnd.trid.tpt"],
		["tr", "text/troff"],
		["tra", "application/vnd.trueapp"],
		["trig", "application/trig"],
		["trm", "application/x-msterminal"],
		["ts", "video/mp2t"],
		["tsd", "application/timestamped-data"],
		["tsv", "text/tab-separated-values"],
		["ttc", "font/collection"],
		["ttf", "font/ttf"],
		["ttl", "text/turtle"],
		["ttml", "application/ttml+xml"],
		["twd", "application/vnd.simtech-mindmapper"],
		["twds", "application/vnd.simtech-mindmapper"],
		["txd", "application/vnd.genomatix.tuxedo"],
		["txf", "application/vnd.mobius.txf"],
		["txt", "text/plain"],
		["u8dsn", "message/global-delivery-status"],
		["u8hdr", "message/global-headers"],
		["u8mdn", "message/global-disposition-notification"],
		["u8msg", "message/global"],
		["u32", "application/x-authorware-bin"],
		["ubj", "application/ubjson"],
		["udeb", "application/x-debian-package"],
		["ufd", "application/vnd.ufdl"],
		["ufdl", "application/vnd.ufdl"],
		["ulx", "application/x-glulx"],
		["umj", "application/vnd.umajin"],
		["unityweb", "application/vnd.unity"],
		["uoml", "application/vnd.uoml+xml"],
		["uri", "text/uri-list"],
		["uris", "text/uri-list"],
		["urls", "text/uri-list"],
		["usdz", "model/vnd.usdz+zip"],
		["ustar", "application/x-ustar"],
		["utz", "application/vnd.uiq.theme"],
		["uu", "text/x-uuencode"],
		["uva", "audio/vnd.dece.audio"],
		["uvd", "application/vnd.dece.data"],
		["uvf", "application/vnd.dece.data"],
		["uvg", "image/vnd.dece.graphic"],
		["uvh", "video/vnd.dece.hd"],
		["uvi", "image/vnd.dece.graphic"],
		["uvm", "video/vnd.dece.mobile"],
		["uvp", "video/vnd.dece.pd"],
		["uvs", "video/vnd.dece.sd"],
		["uvt", "application/vnd.dece.ttml+xml"],
		["uvu", "video/vnd.uvvu.mp4"],
		["uvv", "video/vnd.dece.video"],
		["uvva", "audio/vnd.dece.audio"],
		["uvvd", "application/vnd.dece.data"],
		["uvvf", "application/vnd.dece.data"],
		["uvvg", "image/vnd.dece.graphic"],
		["uvvh", "video/vnd.dece.hd"],
		["uvvi", "image/vnd.dece.graphic"],
		["uvvm", "video/vnd.dece.mobile"],
		["uvvp", "video/vnd.dece.pd"],
		["uvvs", "video/vnd.dece.sd"],
		["uvvt", "application/vnd.dece.ttml+xml"],
		["uvvu", "video/vnd.uvvu.mp4"],
		["uvvv", "video/vnd.dece.video"],
		["uvvx", "application/vnd.dece.unspecified"],
		["uvvz", "application/vnd.dece.zip"],
		["uvx", "application/vnd.dece.unspecified"],
		["uvz", "application/vnd.dece.zip"],
		["vbox", "application/x-virtualbox-vbox"],
		["vbox-extpack", "application/x-virtualbox-vbox-extpack"],
		["vcard", "text/vcard"],
		["vcd", "application/x-cdlink"],
		["vcf", "text/x-vcard"],
		["vcg", "application/vnd.groove-vcard"],
		["vcs", "text/x-vcalendar"],
		["vcx", "application/vnd.vcx"],
		["vdi", "application/x-virtualbox-vdi"],
		["vds", "model/vnd.sap.vds"],
		["vhd", "application/x-virtualbox-vhd"],
		["vis", "application/vnd.visionary"],
		["viv", "video/vnd.vivo"],
		["vlc", "application/videolan"],
		["vmdk", "application/x-virtualbox-vmdk"],
		["vob", "video/x-ms-vob"],
		["vor", "application/vnd.stardivision.writer"],
		["vox", "application/x-authorware-bin"],
		["vrml", "model/vrml"],
		["vsd", "application/vnd.visio"],
		["vsf", "application/vnd.vsf"],
		["vss", "application/vnd.visio"],
		["vst", "application/vnd.visio"],
		["vsw", "application/vnd.visio"],
		["vtf", "image/vnd.valve.source.texture"],
		["vtt", "text/vtt"],
		["vtu", "model/vnd.vtu"],
		["vxml", "application/voicexml+xml"],
		["w3d", "application/x-director"],
		["wad", "application/x-doom"],
		["wadl", "application/vnd.sun.wadl+xml"],
		["war", "application/java-archive"],
		["wasm", "application/wasm"],
		["wav", "audio/x-wav"],
		["wax", "audio/x-ms-wax"],
		["wbmp", "image/vnd.wap.wbmp"],
		["wbs", "application/vnd.criticaltools.wbs+xml"],
		["wbxml", "application/wbxml"],
		["wcm", "application/vnd.ms-works"],
		["wdb", "application/vnd.ms-works"],
		["wdp", "image/vnd.ms-photo"],
		["weba", "audio/webm"],
		["webapp", "application/x-web-app-manifest+json"],
		["webm", "video/webm"],
		["webmanifest", "application/manifest+json"],
		["webp", "image/webp"],
		["wg", "application/vnd.pmi.widget"],
		["wgt", "application/widget"],
		["wks", "application/vnd.ms-works"],
		["wm", "video/x-ms-wm"],
		["wma", "audio/x-ms-wma"],
		["wmd", "application/x-ms-wmd"],
		["wmf", "image/wmf"],
		["wml", "text/vnd.wap.wml"],
		["wmlc", "application/wmlc"],
		["wmls", "text/vnd.wap.wmlscript"],
		["wmlsc", "application/vnd.wap.wmlscriptc"],
		["wmv", "video/x-ms-wmv"],
		["wmx", "video/x-ms-wmx"],
		["wmz", "application/x-msmetafile"],
		["woff", "font/woff"],
		["woff2", "font/woff2"],
		["word", "application/msword"],
		["wpd", "application/vnd.wordperfect"],
		["wpl", "application/vnd.ms-wpl"],
		["wps", "application/vnd.ms-works"],
		["wqd", "application/vnd.wqd"],
		["wri", "application/x-mswrite"],
		["wrl", "model/vrml"],
		["wsc", "message/vnd.wfa.wsc"],
		["wsdl", "application/wsdl+xml"],
		["wspolicy", "application/wspolicy+xml"],
		["wtb", "application/vnd.webturbo"],
		["wvx", "video/x-ms-wvx"],
		["x3d", "model/x3d+xml"],
		["x3db", "model/x3d+fastinfoset"],
		["x3dbz", "model/x3d+binary"],
		["x3dv", "model/x3d-vrml"],
		["x3dvz", "model/x3d+vrml"],
		["x3dz", "model/x3d+xml"],
		["x32", "application/x-authorware-bin"],
		["x_b", "model/vnd.parasolid.transmit.binary"],
		["x_t", "model/vnd.parasolid.transmit.text"],
		["xaml", "application/xaml+xml"],
		["xap", "application/x-silverlight-app"],
		["xar", "application/vnd.xara"],
		["xav", "application/xcap-att+xml"],
		["xbap", "application/x-ms-xbap"],
		["xbd", "application/vnd.fujixerox.docuworks.binder"],
		["xbm", "image/x-xbitmap"],
		["xca", "application/xcap-caps+xml"],
		["xcs", "application/calendar+xml"],
		["xdf", "application/xcap-diff+xml"],
		["xdm", "application/vnd.syncml.dm+xml"],
		["xdp", "application/vnd.adobe.xdp+xml"],
		["xdssc", "application/dssc+xml"],
		["xdw", "application/vnd.fujixerox.docuworks"],
		["xel", "application/xcap-el+xml"],
		["xenc", "application/xenc+xml"],
		["xer", "application/patch-ops-error+xml"],
		["xfdf", "application/vnd.adobe.xfdf"],
		["xfdl", "application/vnd.xfdl"],
		["xht", "application/xhtml+xml"],
		["xhtml", "application/xhtml+xml"],
		["xhvml", "application/xv+xml"],
		["xif", "image/vnd.xiff"],
		["xl", "application/excel"],
		["xla", "application/vnd.ms-excel"],
		["xlam", "application/vnd.ms-excel.addin.macroEnabled.12"],
		["xlc", "application/vnd.ms-excel"],
		["xlf", "application/xliff+xml"],
		["xlm", "application/vnd.ms-excel"],
		["xls", "application/vnd.ms-excel"],
		["xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"],
		["xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"],
		[
			"xlsx",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		],
		["xlt", "application/vnd.ms-excel"],
		["xltm", "application/vnd.ms-excel.template.macroEnabled.12"],
		[
			"xltx",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		],
		["xlw", "application/vnd.ms-excel"],
		["xm", "audio/xm"],
		["xml", "application/xml"],
		["xns", "application/xcap-ns+xml"],
		["xo", "application/vnd.olpc-sugar"],
		["xop", "application/xop+xml"],
		["xpi", "application/x-xpinstall"],
		["xpl", "application/xproc+xml"],
		["xpm", "image/x-xpixmap"],
		["xpr", "application/vnd.is-xpr"],
		["xps", "application/vnd.ms-xpsdocument"],
		["xpw", "application/vnd.intercon.formnet"],
		["xpx", "application/vnd.intercon.formnet"],
		["xsd", "application/xml"],
		["xsl", "application/xml"],
		["xslt", "application/xslt+xml"],
		["xsm", "application/vnd.syncml+xml"],
		["xspf", "application/xspf+xml"],
		["xul", "application/vnd.mozilla.xul+xml"],
		["xvm", "application/xv+xml"],
		["xvml", "application/xv+xml"],
		["xwd", "image/x-xwindowdump"],
		["xyz", "chemical/x-xyz"],
		["xz", "application/x-xz"],
		["yaml", "text/yaml"],
		["yang", "application/yang"],
		["yin", "application/yin+xml"],
		["yml", "text/yaml"],
		["ymp", "text/x-suse-ymp"],
		["z", "application/x-compress"],
		["z1", "application/x-zmachine"],
		["z2", "application/x-zmachine"],
		["z3", "application/x-zmachine"],
		["z4", "application/x-zmachine"],
		["z5", "application/x-zmachine"],
		["z6", "application/x-zmachine"],
		["z7", "application/x-zmachine"],
		["z8", "application/x-zmachine"],
		["zaz", "application/vnd.zzazz.deck+xml"],
		["zip", "application/zip"],
		["zir", "application/vnd.zul"],
		["zirz", "application/vnd.zul"],
		["zmm", "application/vnd.handheld-entertainment+xml"],
		["zsh", "text/x-scriptzsh"],
	]);
function ce(e, a, i) {
	const n = Ti(e),
		{ webkitRelativePath: o } = e,
		r =
			typeof a == "string"
				? a
				: typeof o == "string" && o.length > 0
					? o
					: `./${e.name}`;
	return (
		typeof n.path != "string" && Ea(n, "path", r), Ea(n, "relativePath", r), n
	);
}
function Ti(e) {
	const { name: a } = e;
	if (a && a.lastIndexOf(".") !== -1 && !e.type) {
		const n = a.split(".").pop().toLowerCase(),
			o = Ni.get(n);
		o &&
			Object.defineProperty(e, "type", {
				value: o,
				writable: !1,
				configurable: !1,
				enumerable: !0,
			});
	}
	return e;
}
function Ea(e, a, i) {
	Object.defineProperty(e, a, {
		value: i,
		writable: !1,
		configurable: !1,
		enumerable: !0,
	});
}
const Ri = [".DS_Store", "Thumbs.db"];
function qi(e) {
	return te(this, void 0, void 0, function* () {
		return De(e) && Ii(e.dataTransfer)
			? $i(e.dataTransfer, e.type)
			: Li(e)
				? Mi(e)
				: Array.isArray(e) &&
						e.every((a) => "getFile" in a && typeof a.getFile == "function")
					? Ui(e)
					: [];
	});
}
function Ii(e) {
	return De(e);
}
function Li(e) {
	return De(e) && De(e.target);
}
function De(e) {
	return typeof e == "object" && e !== null;
}
function Mi(e) {
	return We(e.target.files).map((a) => ce(a));
}
function Ui(e) {
	return te(this, void 0, void 0, function* () {
		return (yield Promise.all(e.map((i) => i.getFile()))).map((i) => ce(i));
	});
}
function $i(e, a) {
	return te(this, void 0, void 0, function* () {
		if (e.items) {
			const i = We(e.items).filter((o) => o.kind === "file");
			if (a !== "drop") return i;
			const n = yield Promise.all(i.map(Bi));
			return Pa($a(n));
		}
		return Pa(We(e.files).map((i) => ce(i)));
	});
}
function Pa(e) {
	return e.filter((a) => Ri.indexOf(a.name) === -1);
}
function We(e) {
	if (e === null) return [];
	const a = [];
	for (let i = 0; i < e.length; i++) {
		const n = e[i];
		a.push(n);
	}
	return a;
}
function Bi(e) {
	if (typeof e.webkitGetAsEntry != "function") return Sa(e);
	const a = e.webkitGetAsEntry();
	return a && a.isDirectory ? Ba(a) : Sa(e, a);
}
function $a(e) {
	return e.reduce((a, i) => [...a, ...(Array.isArray(i) ? $a(i) : [i])], []);
}
function Sa(e, a) {
	return te(this, void 0, void 0, function* () {
		var i;
		if (
			globalThis.isSecureContext &&
			typeof e.getAsFileSystemHandle == "function"
		) {
			const r = yield e.getAsFileSystemHandle();
			if (r === null) throw new Error(`${e} is not a File`);
			if (r !== void 0) {
				const c = yield r.getFile();
				return (c.handle = r), ce(c);
			}
		}
		const n = e.getAsFile();
		if (!n) throw new Error(`${e} is not a File`);
		return ce(
			n,
			(i = a == null ? void 0 : a.fullPath) !== null && i !== void 0
				? i
				: void 0,
		);
	});
}
function Ki(e) {
	return te(this, void 0, void 0, function* () {
		return e.isDirectory ? Ba(e) : Wi(e);
	});
}
function Ba(e) {
	const a = e.createReader();
	return new Promise((i, n) => {
		const o = [];
		function r() {
			a.readEntries(
				(c) =>
					te(this, void 0, void 0, function* () {
						if (c.length) {
							const s = Promise.all(c.map(Ki));
							o.push(s), r();
						} else
							try {
								const s = yield Promise.all(o);
								i(s);
							} catch (s) {
								n(s);
							}
					}),
				(c) => {
					n(c);
				},
			);
		}
		r();
	});
}
function Wi(e) {
	return te(this, void 0, void 0, function* () {
		return new Promise((a, i) => {
			e.file(
				(n) => {
					const o = ce(n, e.fullPath);
					a(o);
				},
				(n) => {
					i(n);
				},
			);
		});
	});
}
var we = {},
	Ca;
function Hi() {
	return (
		Ca ||
			((Ca = 1),
			(we.__esModule = !0),
			(we.default = (e, a) => {
				if (e && a) {
					var i = Array.isArray(a) ? a : a.split(",");
					if (i.length === 0) return !0;
					var n = e.name || "",
						o = (e.type || "").toLowerCase(),
						r = o.replace(/\/.*$/, "");
					return i.some((c) => {
						var s = c.trim().toLowerCase();
						return s.charAt(0) === "."
							? n.toLowerCase().endsWith(s)
							: s.endsWith("/*")
								? r === s.replace(/\/.*$/, "")
								: o === s;
					});
				}
				return !0;
			})),
		we
	);
}
var Vi = Hi();
const Ue = Ma(Vi);
function Aa(e) {
	return Qi(e) || Yi(e) || Wa(e) || Gi();
}
function Gi() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yi(e) {
	if (
		(typeof Symbol < "u" && e[Symbol.iterator] != null) ||
		e["@@iterator"] != null
	)
		return Array.from(e);
}
function Qi(e) {
	if (Array.isArray(e)) return He(e);
}
function Fa(e, a) {
	var i = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		a &&
			(n = n.filter((o) => Object.getOwnPropertyDescriptor(e, o).enumerable)),
			i.push.apply(i, n);
	}
	return i;
}
function Oa(e) {
	for (var a = 1; a < arguments.length; a++) {
		var i = arguments[a] != null ? arguments[a] : {};
		a % 2
			? Fa(Object(i), !0).forEach((n) => {
					Ka(e, n, i[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
				: Fa(Object(i)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
					});
	}
	return e;
}
function Ka(e, a, i) {
	return (
		a in e
			? Object.defineProperty(e, a, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[a] = i),
		e
	);
}
function me(e, a) {
	return Xi(e) || Zi(e, a) || Wa(e, a) || Ji();
}
function Ji() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wa(e, a) {
	if (e) {
		if (typeof e == "string") return He(e, a);
		var i = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(i === "Object" && e.constructor && (i = e.constructor.name),
			i === "Map" || i === "Set")
		)
			return Array.from(e);
		if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
			return He(e, a);
	}
}
function He(e, a) {
	(a == null || a > e.length) && (a = e.length);
	for (var i = 0, n = new Array(a); i < a; i++) n[i] = e[i];
	return n;
}
function Zi(e, a) {
	var i =
		e == null
			? null
			: (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (i != null) {
		var n = [],
			o = !0,
			r = !1,
			c,
			s;
		try {
			for (
				i = i.call(e);
				!(o = (c = i.next()).done) && (n.push(c.value), !(a && n.length === a));
				o = !0
			);
		} catch (d) {
			(r = !0), (s = d);
		} finally {
			try {
				!o && i.return != null && i.return();
			} finally {
				if (r) throw s;
			}
		}
		return n;
	}
}
function Xi(e) {
	if (Array.isArray(e)) return e;
}
var et = typeof Ue == "function" ? Ue : Ue.default,
	at = "file-invalid-type",
	it = "file-too-large",
	tt = "file-too-small",
	nt = "too-many-files",
	ot = () => {
		var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
			i = a.split(","),
			n = i.length > 1 ? "one of ".concat(i.join(", ")) : i[0];
		return { code: at, message: "File type must be ".concat(n) };
	},
	_a = (a) => ({
		code: it,
		message: "File is larger than "
			.concat(a, " ")
			.concat(a === 1 ? "byte" : "bytes"),
	}),
	Na = (a) => ({
		code: tt,
		message: "File is smaller than "
			.concat(a, " ")
			.concat(a === 1 ? "byte" : "bytes"),
	}),
	pt = { code: nt, message: "Too many files" };
function Ha(e, a) {
	var i = e.type === "application/x-moz-file" || et(e, a);
	return [i, i ? null : ot(a)];
}
function Va(e, a, i) {
	if (ae(e.size))
		if (ae(a) && ae(i)) {
			if (e.size > i) return [!1, _a(i)];
			if (e.size < a) return [!1, Na(a)];
		} else {
			if (ae(a) && e.size < a) return [!1, Na(a)];
			if (ae(i) && e.size > i) return [!1, _a(i)];
		}
	return [!0, null];
}
function ae(e) {
	return e != null;
}
function rt(e) {
	var a = e.files,
		i = e.accept,
		n = e.minSize,
		o = e.maxSize,
		r = e.multiple,
		c = e.maxFiles,
		s = e.validator;
	return (!r && a.length > 1) || (r && c >= 1 && a.length > c)
		? !1
		: a.every((d) => {
				var b = Ha(d, i),
					w = me(b, 1),
					p = w[0],
					u = Va(d, n, o),
					f = me(u, 1),
					v = f[0],
					j = s ? s(d) : null;
				return p && v && !j;
			});
}
function ze(e) {
	return typeof e.isPropagationStopped == "function"
		? e.isPropagationStopped()
		: typeof e.cancelBubble < "u"
			? e.cancelBubble
			: !1;
}
function ye(e) {
	return e.dataTransfer
		? Array.prototype.some.call(
				e.dataTransfer.types,
				(a) => a === "Files" || a === "application/x-moz-file",
			)
		: !!e.target && !!e.target.files;
}
function Ta(e) {
	e.preventDefault();
}
function lt(e) {
	return e.indexOf("MSIE") !== -1 || e.indexOf("Trident/") !== -1;
}
function ct(e) {
	return e.indexOf("Edge/") !== -1;
}
function st() {
	var e =
		arguments.length > 0 && arguments[0] !== void 0
			? arguments[0]
			: window.navigator.userAgent;
	return lt(e) || ct(e);
}
function G() {
	for (var e = arguments.length, a = new Array(e), i = 0; i < e; i++)
		a[i] = arguments[i];
	return (n) => {
		for (
			var o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), c = 1;
			c < o;
			c++
		)
			r[c - 1] = arguments[c];
		return a.some(
			(s) => (!ze(n) && s && s.apply(void 0, [n].concat(r)), ze(n)),
		);
	};
}
function dt() {
	return "showOpenFilePicker" in window;
}
function mt(e) {
	if (ae(e)) {
		var a = Object.entries(e)
			.filter((i) => {
				var n = me(i, 2),
					o = n[0],
					r = n[1],
					c = !0;
				return (
					Ga(o) ||
						(console.warn(
							'Skipped "'.concat(
								o,
								'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.',
							),
						),
						(c = !1)),
					(!Array.isArray(r) || !r.every(Ya)) &&
						(console.warn(
							'Skipped "'.concat(
								o,
								'" because an invalid file extension was provided.',
							),
						),
						(c = !1)),
					c
				);
			})
			.reduce((i, n) => {
				var o = me(n, 2),
					r = o[0],
					c = o[1];
				return Oa(Oa({}, i), {}, Ka({}, r, c));
			}, {});
		return [{ description: "Files", accept: a }];
	}
	return e;
}
function ut(e) {
	if (ae(e))
		return Object.entries(e)
			.reduce((a, i) => {
				var n = me(i, 2),
					o = n[0],
					r = n[1];
				return [].concat(Aa(a), [o], Aa(r));
			}, [])
			.filter((a) => Ga(a) || Ya(a))
			.join(",");
}
function ft(e) {
	return (
		e instanceof DOMException &&
		(e.name === "AbortError" || e.code === e.ABORT_ERR)
	);
}
function xt(e) {
	return (
		e instanceof DOMException &&
		(e.name === "SecurityError" || e.code === e.SECURITY_ERR)
	);
}
function Ga(e) {
	return (
		e === "audio/*" ||
		e === "video/*" ||
		e === "image/*" ||
		e === "text/*" ||
		e === "application/*" ||
		/\w+\/[-+.\w]+/g.test(e)
	);
}
function Ya(e) {
	return /^.*\.[\w]+$/.test(e);
}
var vt = ["children"],
	gt = ["open"],
	ht = [
		"refKey",
		"role",
		"onKeyDown",
		"onFocus",
		"onBlur",
		"onClick",
		"onDragEnter",
		"onDragOver",
		"onDragLeave",
		"onDrop",
	],
	bt = ["refKey", "onChange", "onClick"];
function wt(e) {
	return kt(e) || jt(e) || Qa(e) || yt();
}
function yt() {
	throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jt(e) {
	if (
		(typeof Symbol < "u" && e[Symbol.iterator] != null) ||
		e["@@iterator"] != null
	)
		return Array.from(e);
}
function kt(e) {
	if (Array.isArray(e)) return Ve(e);
}
function $e(e, a) {
	return Et(e) || zt(e, a) || Qa(e, a) || Dt();
}
function Dt() {
	throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qa(e, a) {
	if (e) {
		if (typeof e == "string") return Ve(e, a);
		var i = Object.prototype.toString.call(e).slice(8, -1);
		if (
			(i === "Object" && e.constructor && (i = e.constructor.name),
			i === "Map" || i === "Set")
		)
			return Array.from(e);
		if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
			return Ve(e, a);
	}
}
function Ve(e, a) {
	(a == null || a > e.length) && (a = e.length);
	for (var i = 0, n = new Array(a); i < a; i++) n[i] = e[i];
	return n;
}
function zt(e, a) {
	var i =
		e == null
			? null
			: (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
	if (i != null) {
		var n = [],
			o = !0,
			r = !1,
			c,
			s;
		try {
			for (
				i = i.call(e);
				!(o = (c = i.next()).done) && (n.push(c.value), !(a && n.length === a));
				o = !0
			);
		} catch (d) {
			(r = !0), (s = d);
		} finally {
			try {
				!o && i.return != null && i.return();
			} finally {
				if (r) throw s;
			}
		}
		return n;
	}
}
function Et(e) {
	if (Array.isArray(e)) return e;
}
function Ra(e, a) {
	var i = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		a &&
			(n = n.filter((o) => Object.getOwnPropertyDescriptor(e, o).enumerable)),
			i.push.apply(i, n);
	}
	return i;
}
function k(e) {
	for (var a = 1; a < arguments.length; a++) {
		var i = arguments[a] != null ? arguments[a] : {};
		a % 2
			? Ra(Object(i), !0).forEach((n) => {
					Ge(e, n, i[n]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
				: Ra(Object(i)).forEach((n) => {
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
					});
	}
	return e;
}
function Ge(e, a, i) {
	return (
		a in e
			? Object.defineProperty(e, a, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				})
			: (e[a] = i),
		e
	);
}
function Ee(e, a) {
	if (e == null) return {};
	var i = Pt(e, a),
		n,
		o;
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		for (o = 0; o < r.length; o++)
			(n = r[o]),
				!(a.indexOf(n) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, n) &&
					(i[n] = e[n]);
	}
	return i;
}
function Pt(e, a) {
	if (e == null) return {};
	var i = {},
		n = Object.keys(e),
		o,
		r;
	for (r = 0; r < n.length; r++)
		(o = n[r]), !(a.indexOf(o) >= 0) && (i[o] = e[o]);
	return i;
}
var ea = x.forwardRef((e, a) => {
	var i = e.children,
		n = Ee(e, vt),
		o = Za(n),
		r = o.open,
		c = Ee(o, gt);
	return (
		x.useImperativeHandle(a, () => ({ open: r }), [r]),
		ni.createElement(x.Fragment, null, i(k(k({}, c), {}, { open: r })))
	);
});
ea.displayName = "Dropzone";
var Ja = {
	disabled: !1,
	getFilesFromEvent: qi,
	maxSize: 1 / 0,
	minSize: 0,
	multiple: !0,
	maxFiles: 0,
	preventDropOnDocument: !0,
	noClick: !1,
	noKeyboard: !1,
	noDrag: !1,
	noDragEventsBubbling: !1,
	validator: null,
	useFsAccessApi: !1,
	autoFocus: !1,
};
ea.defaultProps = Ja;
ea.propTypes = {
	children: h.func,
	accept: h.objectOf(h.arrayOf(h.string)),
	multiple: h.bool,
	preventDropOnDocument: h.bool,
	noClick: h.bool,
	noKeyboard: h.bool,
	noDrag: h.bool,
	noDragEventsBubbling: h.bool,
	minSize: h.number,
	maxSize: h.number,
	maxFiles: h.number,
	disabled: h.bool,
	getFilesFromEvent: h.func,
	onFileDialogCancel: h.func,
	onFileDialogOpen: h.func,
	useFsAccessApi: h.bool,
	autoFocus: h.bool,
	onDragEnter: h.func,
	onDragLeave: h.func,
	onDragOver: h.func,
	onDrop: h.func,
	onDropAccepted: h.func,
	onDropRejected: h.func,
	onError: h.func,
	validator: h.func,
};
var Ye = {
	isFocused: !1,
	isFileDialogActive: !1,
	isDragActive: !1,
	isDragAccept: !1,
	isDragReject: !1,
	acceptedFiles: [],
	fileRejections: [],
};
function Za() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
		a = k(k({}, Ja), e),
		i = a.accept,
		n = a.disabled,
		o = a.getFilesFromEvent,
		r = a.maxSize,
		c = a.minSize,
		s = a.multiple,
		d = a.maxFiles,
		b = a.onDragEnter,
		w = a.onDragLeave,
		p = a.onDragOver,
		u = a.onDrop,
		f = a.onDropAccepted,
		v = a.onDropRejected,
		j = a.onFileDialogCancel,
		y = a.onFileDialogOpen,
		g = a.useFsAccessApi,
		_ = a.autoFocus,
		T = a.preventDropOnDocument,
		L = a.noClick,
		M = a.noKeyboard,
		K = a.noDrag,
		C = a.noDragEventsBubbling,
		Q = a.onError,
		U = a.validator,
		N = x.useMemo(() => ut(i), [i]),
		H = x.useMemo(() => mt(i), [i]),
		E = x.useMemo(() => (typeof y == "function" ? y : qa), [y]),
		D = x.useMemo(() => (typeof j == "function" ? j : qa), [j]),
		z = x.useRef(null),
		S = x.useRef(null),
		se = x.useReducer(St, Ye),
		J = $e(se, 2),
		V = J[0],
		A = J[1],
		Pe = V.isFocused,
		ne = V.isFileDialogActive,
		fe = x.useRef(typeof window < "u" && window.isSecureContext && g && dt()),
		aa = () => {
			!fe.current &&
				ne &&
				setTimeout(() => {
					if (S.current) {
						var m = S.current.files;
						m.length || (A({ type: "closeDialog" }), D());
					}
				}, 300);
		};
	x.useEffect(
		() => (
			window.addEventListener("focus", aa, !1),
			() => {
				window.removeEventListener("focus", aa, !1);
			}
		),
		[S, ne, D, fe],
	);
	var oe = x.useRef([]),
		ia = (m) => {
			(z.current && z.current.contains(m.target)) ||
				(m.preventDefault(), (oe.current = []));
		};
	x.useEffect(
		() => (
			T &&
				(document.addEventListener("dragover", Ta, !1),
				document.addEventListener("drop", ia, !1)),
			() => {
				T &&
					(document.removeEventListener("dragover", Ta),
					document.removeEventListener("drop", ia));
			}
		),
		[z, T],
	),
		x.useEffect(
			() => (!n && _ && z.current && z.current.focus(), () => {}),
			[z, _, n],
		);
	var X = x.useCallback(
			(l) => {
				Q ? Q(l) : console.error(l);
			},
			[Q],
		),
		ta = x.useCallback(
			(l) => {
				l.preventDefault(),
					l.persist(),
					he(l),
					(oe.current = [].concat(wt(oe.current), [l.target])),
					ye(l) &&
						Promise.resolve(o(l))
							.then((m) => {
								if (!(ze(l) && !C)) {
									var P = m.length,
										F =
											P > 0 &&
											rt({
												files: m,
												accept: N,
												minSize: c,
												maxSize: r,
												multiple: s,
												maxFiles: d,
												validator: U,
											}),
										W = P > 0 && !F;
									A({
										isDragAccept: F,
										isDragReject: W,
										isDragActive: !0,
										type: "setDraggedFiles",
									}),
										b && b(l);
								}
							})
							.catch((m) => X(m));
			},
			[o, b, X, C, N, c, r, s, d, U],
		),
		na = x.useCallback(
			(l) => {
				l.preventDefault(), l.persist(), he(l);
				var m = ye(l);
				if (m && l.dataTransfer)
					try {
						l.dataTransfer.dropEffect = "copy";
					} catch {}
				return m && p && p(l), !1;
			},
			[p, C],
		),
		oa = x.useCallback(
			(l) => {
				l.preventDefault(), l.persist(), he(l);
				var m = oe.current.filter((F) => z.current && z.current.contains(F)),
					P = m.indexOf(l.target);
				P !== -1 && m.splice(P, 1),
					(oe.current = m),
					!(m.length > 0) &&
						(A({
							type: "setDraggedFiles",
							isDragActive: !1,
							isDragAccept: !1,
							isDragReject: !1,
						}),
						ye(l) && w && w(l));
			},
			[z, w, C],
		),
		xe = x.useCallback(
			(l, m) => {
				var P = [],
					F = [];
				l.forEach((W) => {
					var de = Ha(W, N),
						le = $e(de, 2),
						Ce = le[0],
						Ae = le[1],
						Fe = Va(W, c, r),
						be = $e(Fe, 2),
						Oe = be[0],
						_e = be[1],
						Ne = U ? U(W) : null;
					if (Ce && Oe && !Ne) P.push(W);
					else {
						var Te = [Ae, _e];
						Ne && (Te = Te.concat(Ne)),
							F.push({ file: W, errors: Te.filter((ii) => ii) });
					}
				}),
					((!s && P.length > 1) || (s && d >= 1 && P.length > d)) &&
						(P.forEach((W) => {
							F.push({ file: W, errors: [pt] });
						}),
						P.splice(0)),
					A({
						acceptedFiles: P,
						fileRejections: F,
						isDragReject: F.length > 0,
						type: "setFiles",
					}),
					u && u(P, F, m),
					F.length > 0 && v && v(F, m),
					P.length > 0 && f && f(P, m);
			},
			[A, s, N, c, r, d, u, f, v, U],
		),
		ve = x.useCallback(
			(l) => {
				l.preventDefault(),
					l.persist(),
					he(l),
					(oe.current = []),
					ye(l) &&
						Promise.resolve(o(l))
							.then((m) => {
								(ze(l) && !C) || xe(m, l);
							})
							.catch((m) => X(m)),
					A({ type: "reset" });
			},
			[o, xe, X, C],
		),
		pe = x.useCallback(() => {
			if (fe.current) {
				A({ type: "openDialog" }), E();
				var l = { multiple: s, types: H };
				window
					.showOpenFilePicker(l)
					.then((m) => o(m))
					.then((m) => {
						xe(m, null), A({ type: "closeDialog" });
					})
					.catch((m) => {
						ft(m)
							? (D(m), A({ type: "closeDialog" }))
							: xt(m)
								? ((fe.current = !1),
									S.current
										? ((S.current.value = null), S.current.click())
										: X(
												new Error(
													"Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided.",
												),
											))
								: X(m);
					});
				return;
			}
			S.current &&
				(A({ type: "openDialog" }),
				E(),
				(S.current.value = null),
				S.current.click());
		}, [A, E, D, g, xe, X, H, s]),
		pa = x.useCallback(
			(l) => {
				!z.current ||
					!z.current.isEqualNode(l.target) ||
					((l.key === " " ||
						l.key === "Enter" ||
						l.keyCode === 32 ||
						l.keyCode === 13) &&
						(l.preventDefault(), pe()));
			},
			[z, pe],
		),
		ra = x.useCallback(() => {
			A({ type: "focus" });
		}, []),
		la = x.useCallback(() => {
			A({ type: "blur" });
		}, []),
		ca = x.useCallback(() => {
			L || (st() ? setTimeout(pe, 0) : pe());
		}, [L, pe]),
		re = (m) => (n ? null : m),
		Se = (m) => (M ? null : re(m)),
		ge = (m) => (K ? null : re(m)),
		he = (m) => {
			C && m.stopPropagation();
		},
		Xa = x.useMemo(
			() => () => {
				var l =
						arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
					m = l.refKey,
					P = m === void 0 ? "ref" : m,
					F = l.role,
					W = l.onKeyDown,
					de = l.onFocus,
					le = l.onBlur,
					Ce = l.onClick,
					Ae = l.onDragEnter,
					Fe = l.onDragOver,
					be = l.onDragLeave,
					Oe = l.onDrop,
					_e = Ee(l, ht);
				return k(
					k(
						Ge(
							{
								onKeyDown: Se(G(W, pa)),
								onFocus: Se(G(de, ra)),
								onBlur: Se(G(le, la)),
								onClick: re(G(Ce, ca)),
								onDragEnter: ge(G(Ae, ta)),
								onDragOver: ge(G(Fe, na)),
								onDragLeave: ge(G(be, oa)),
								onDrop: ge(G(Oe, ve)),
								role: typeof F == "string" && F !== "" ? F : "presentation",
							},
							P,
							z,
						),
						!n && !M ? { tabIndex: 0 } : {},
					),
					_e,
				);
			},
			[z, pa, ra, la, ca, ta, na, oa, ve, M, K, n],
		),
		ei = x.useCallback((l) => {
			l.stopPropagation();
		}, []),
		ai = x.useMemo(
			() => () => {
				var l =
						arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
					m = l.refKey,
					P = m === void 0 ? "ref" : m,
					F = l.onChange,
					W = l.onClick,
					de = Ee(l, bt),
					le = Ge(
						{
							accept: N,
							multiple: s,
							type: "file",
							style: {
								border: 0,
								clip: "rect(0, 0, 0, 0)",
								clipPath: "inset(50%)",
								height: "1px",
								margin: "0 -1px -1px 0",
								overflow: "hidden",
								padding: 0,
								position: "absolute",
								width: "1px",
								whiteSpace: "nowrap",
							},
							onChange: re(G(F, ve)),
							onClick: re(G(W, ei)),
							tabIndex: -1,
						},
						P,
						S,
					);
				return k(k({}, le), de);
			},
			[S, i, s, ve, n],
		);
	return k(
		k({}, V),
		{},
		{
			isFocused: Pe && !n,
			getRootProps: Xa,
			getInputProps: ai,
			rootRef: z,
			inputRef: S,
			open: re(pe),
		},
	);
}
function St(e, a) {
	switch (a.type) {
		case "focus":
			return k(k({}, e), {}, { isFocused: !0 });
		case "blur":
			return k(k({}, e), {}, { isFocused: !1 });
		case "openDialog":
			return k(k({}, Ye), {}, { isFileDialogActive: !0 });
		case "closeDialog":
			return k(k({}, e), {}, { isFileDialogActive: !1 });
		case "setDraggedFiles":
			return k(
				k({}, e),
				{},
				{
					isDragActive: a.isDragActive,
					isDragAccept: a.isDragAccept,
					isDragReject: a.isDragReject,
				},
			);
		case "setFiles":
			return k(
				k({}, e),
				{},
				{
					acceptedFiles: a.acceptedFiles,
					fileRejections: a.fileRejections,
					isDragReject: a.isDragReject,
				},
			);
		case "reset":
			return k({}, Ye);
		default:
			return e;
	}
}
function qa() {}
const Ct =
		"relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
	At = "w-16 h-16 rounded-full object-cover";
function Ft(e) {
	const a = ue.c(31),
		{
			currentImage: i,
			className: n,
			onUploadSuccess: o,
			onUploadError: r,
			disabled: c,
			isUploading: s,
			isErrorUpload: d,
			imgPreviewClassName: b,
		} = e,
		w = c === void 0 ? !1 : c,
		p = s === void 0 ? !1 : s,
		u = d === void 0 ? !1 : d,
		[f, v] = x.useState(),
		j = x.useRef(null),
		y = w || p;
	let g;
	a[0] !== o
		? ((g = (Pe) => {
				const ne = Pe.at(0);
				ne && (v(URL.createObjectURL(ne)), o(ne));
			}),
			(a[0] = o),
			(a[1] = g))
		: (g = a[1]);
	let _;
	a[2] !== r
		? ((_ = () => {
				r == null ||
					r(
						new Error(
							"Veuillez sélectionner une image valide (png, jpg, jpeg, gif, webp)",
						),
					);
			}),
			(a[2] = r),
			(a[3] = _))
		: (_ = a[3]);
	let T;
	a[4] === Symbol.for("react.memo_cache_sentinel")
		? ((T = {
				"image/png": [".png"],
				"image/jpeg": [".jpg", ".jpeg"],
				"image/gif": [".gif"],
				"image/webp": [".webp"],
			}),
			(a[4] = T))
		: (T = a[4]);
	let L;
	a[5] !== y || a[6] !== g || a[7] !== _
		? ((L = {
				onDropAccepted: g,
				onDropRejected: _,
				accept: T,
				maxFiles: 1,
				disabled: y,
			}),
			(a[5] = y),
			(a[6] = g),
			(a[7] = _),
			(a[8] = L))
		: (L = a[8]);
	const {
			getRootProps: M,
			getInputProps: K,
			isDragActive: C,
			isFileDialogActive: Q,
		} = Za(L),
		U = p || Q || C,
		N = C
			? "border-primary bg-primary/5"
			: "border-muted-foreground/25 hover:border-primary/50",
		H = u && "border-destructive hover:border-destructive/50";
	let E;
	a[9] !== n || a[10] !== M || a[11] !== N || a[12] !== H
		? ((E = M({ className: Ke(Ct, N, H, n) })),
			(a[9] = n),
			(a[10] = M),
			(a[11] = N),
			(a[12] = H),
			(a[13] = E))
		: (E = a[13]);
	let D;
	a[14] !== K ? ((D = K()), (a[14] = K), (a[15] = D)) : (D = a[15]);
	let z;
	a[16] !== D
		? ((z = t.jsx("input", { ...D })), (a[16] = D), (a[17] = z))
		: (z = a[17]);
	let S;
	a[18] !== i || a[19] !== f || a[20] !== b
		? ((S =
				f || i
					? t.jsx("img", {
							src: f ?? i,
							alt: "Profile preview",
							className: Ke(At, b),
						})
					: t.jsx(Di, { className: "w-8 h-8 mb-2 text-muted-foreground" })),
			(a[18] = i),
			(a[19] = f),
			(a[20] = b),
			(a[21] = S))
		: (S = a[21]);
	const se = U
		? "Téléchargement..."
		: C
			? "Déposez l'image ici..."
			: "Glissez-déposez une image ou cliquez pour sélectionner";
	let J;
	a[22] !== se
		? ((J = t.jsx("p", {
				className: "text-sm text-muted-foreground",
				children: se,
			})),
			(a[22] = se),
			(a[23] = J))
		: (J = a[23]);
	let V;
	a[24] !== S || a[25] !== J
		? ((V = t.jsxs("div", {
				className: "flex flex-col items-center justify-center text-center",
				children: [S, J],
			})),
			(a[24] = S),
			(a[25] = J),
			(a[26] = V))
		: (V = a[26]);
	let A;
	return (
		a[27] !== E || a[28] !== z || a[29] !== V
			? ((A = t.jsxs("div", { ref: j, ...E, children: [z, V] })),
				(a[27] = E),
				(a[28] = z),
				(a[29] = V),
				(a[30] = A))
			: (A = a[30]),
		A
	);
}
const Ot = {
		uploadUserAvatar: async (e, a) => {
			const i = new FormData();
			return (
				i.append("image", a),
				(await vi.post(`users/${e}/avatar`, { body: i }).json()).image
			);
		},
	},
	_t = O.object({
		firstName: O.string()
			.min(2, "Le prénom doit contenir au moins 2 caractères")
			.optional(),
		lastName: O.string()
			.min(2, "Le nom doit contenir au moins 2 caractères")
			.optional(),
		dateOfBirth: O.coerce.date().optional(),
		civility: O.enum([
			"monsieur",
			"madame",
			"mademoiselle",
			"autre",
		]).optional(),
		phone: O.string()
			.regex(
				/^(\d{10}|)$/,
				"Le numéro de téléphone doit contenir exactement 10 chiffres",
			)
			.optional()
			.or(O.literal("")),
		height: O.coerce
			.number()
			.min(50, "La taille doit être supérieure à 50 cm")
			.max(250, "La taille doit être inférieure à 250 cm")
			.optional()
			.or(O.literal("")),
		weight: O.coerce
			.number()
			.min(20, "Le poids doit être supérieur à 20 kg")
			.max(300, "Le poids doit être inférieur à 300 kg")
			.optional()
			.or(O.literal("")),
		licenseNumber: O.string().optional(),
		newsletterSubscription: O.boolean().optional(),
		theme: O.enum(["light", "dark", "auto"]).optional(),
		image: O.union([O.string(), O.instanceof(File)]).optional(),
	});
function Nt({ user: e }) {
	var s, d, b, w;
	const a = {
			firstName: e.firstName ?? void 0,
			lastName: e.lastName ?? void 0,
			dateOfBirth: e.dateOfBirth ?? void 0,
			civility: e.civility,
			phone: e.phone ?? void 0,
			height: e.height ?? void 0,
			weight: e.weight ?? void 0,
			licenseNumber: e.licenseNumber ?? void 0,
			newsletterSubscription:
				((d = (s = e.preferences) == null ? void 0 : s.newsletter) == null
					? void 0
					: d.enabled) ?? !1,
			theme:
				((w = (b = e.preferences) == null ? void 0 : b.accessibility) == null
					? void 0
					: w.theme) ?? "auto",
			image: e.image ?? void 0,
		},
		i = Ze({ resolver: Je(_t), defaultValues: a }),
		n = ke({ mutationFn: (p) => Ot.uploadUserAvatar(e.id, p) }),
		o = ke({
			mutationFn: async (p) => {
				let u;
				try {
					p.image &&
						typeof p.image != "string" &&
						(u = await n.mutateAsync(p.image));
				} catch {
					throw new Error(
						"Une erreur est survenue lors de l'upload de l'image",
					);
				}
				const { data: f } = await Qe.updateUser({
					firstName: p.firstName ?? void 0,
					lastName: p.lastName ?? void 0,
					dateOfBirth: p.dateOfBirth ? new Date(p.dateOfBirth) : void 0,
					civility: p.civility ?? void 0,
					phone: p.phone ?? void 0,
					height: p.height ? Number(p.height) : void 0,
					weight: p.weight ? Number(p.weight) : void 0,
					licenseNumber: p.licenseNumber ?? void 0,
					preferences: JSON.stringify(
						(() => {
							const v = e.preferences
								? typeof e.preferences == "string"
									? JSON.parse(e.preferences)
									: e.preferences
								: {};
							return {
								...v,
								newsletter: { enabled: p.newsletterSubscription ?? !1 },
								accessibility: {
									...(v.accessibility || {}),
									theme: p.theme ?? "auto",
								},
							};
						})(),
					),
					image: u,
				});
				if (!(f != null && f.status))
					throw new Error(
						"Une erreur est survenue lors de la mise à jour de l'utilisateur",
					);
			},
			onSuccess: async () => {
				await Promise.all([
					sa.invalidateQueries(Ua()),
					sa.invalidateQueries({ queryKey: ["user", e.id, "accounts"] }),
				]),
					ie.success("Profil mis à jour avec succès !");
			},
			onError: (p) => {
				ie.error(p.message);
			},
		}),
		r = (p) => {
			o.mutate(p);
		},
		c = (p) => {
			console.error(p);
			const u = Object.values(p)[0];
			ie.error(
				(u == null ? void 0 : u.message) ??
					"Une erreur est survenue, veuillez réessayer.",
			);
		};
	return t.jsx(Xe, {
		...i,
		children: t.jsxs("form", {
			onSubmit: i.handleSubmit(r, c),
			className: "space-y-4",
			children: [
				t.jsx(R, {
					control: i.control,
					name: "firstName",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Prénom" }),
								t.jsx($, {
									children: t.jsx(Y, { placeholder: "Prénom", ...p }),
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "lastName",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Nom" }),
								t.jsx($, { children: t.jsx(Y, { placeholder: "Nom", ...p }) }),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "dateOfBirth",
					render: ({ field: p }) =>
						t.jsxs(q, {
							className: "flex flex-col",
							children: [
								t.jsx(I, {
									htmlFor: "dateOfBirth",
									children: "Date de naissance",
								}),
								t.jsxs(ui, {
									children: [
										t.jsx(fi, {
											asChild: !0,
											children: t.jsxs(Z, {
												variant: "outline",
												className: Ke(
													"w-[240px]",
													!p.value && "text-muted-foreground",
												),
												children: [
													t.jsx(hi, {}),
													p.value
														? gi(p.value, "P", { locale: ha })
														: t.jsx("span", { children: "Choisir une date" }),
												],
											}),
										}),
										t.jsx(xi, {
											className: "w-auto overflow-hidden p-0",
											align: "start",
											children: t.jsx(si, {
												mode: "single",
												captionLayout: "dropdown",
												selected: p.value ?? void 0,
												onSelect: (u) => {
													if (u) {
														const f = new di(u, "Europe/Paris");
														console.log(f.toUTCString()), p.onChange(f);
														return;
													}
													p.onChange(void 0);
												},
												defaultMonth: a.dateOfBirth,
												hideNavigation: !1,
												locale: ha,
												timeZone: "UTC",
											}),
										}),
									],
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "civility",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Civilité" }),
								t.jsxs(ba, {
									onValueChange: p.onChange,
									value: p.value,
									children: [
										t.jsx($, {
											children: t.jsx(wa, {
												children: t.jsx(ya, {
													placeholder: "Sélectionner une civilité",
												}),
											}),
										}),
										t.jsxs(ja, {
											children: [
												t.jsx(ee, { value: "monsieur", children: "Monsieur" }),
												t.jsx(ee, { value: "madame", children: "Madame" }),
												t.jsx(ee, {
													value: "mademoiselle",
													children: "Mademoiselle",
												}),
												t.jsx(ee, { value: "autre", children: "Autre" }),
											],
										}),
									],
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "phone",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Téléphone" }),
								t.jsx($, {
									children: t.jsx(Y, {
										placeholder: "Ex: 0123456789",
										...p,
										maxLength: 10,
										onChange: (u) => {
											const f = u.target.value.replace(/\D/g, "");
											p.onChange(f);
										},
										onKeyDown: (u) => {
											!/\d/.test(u.key) &&
												![
													"Backspace",
													"Delete",
													"Tab",
													"Enter",
													"ArrowLeft",
													"ArrowRight",
												].includes(u.key) &&
												u.preventDefault();
										},
									}),
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [
						t.jsx(R, {
							control: i.control,
							name: "height",
							render: ({ field: p }) =>
								t.jsxs(q, {
									children: [
										t.jsx(I, { children: "Taille (cm)" }),
										t.jsx($, {
											children: t.jsx(Y, {
												type: "number",
												placeholder: "Ex: 175",
												...p,
												onChange: (u) =>
													p.onChange(
														u.target.value ? Number(u.target.value) : "",
													),
											}),
										}),
										t.jsx(B, {}),
									],
								}),
						}),
						t.jsx(R, {
							control: i.control,
							name: "weight",
							render: ({ field: p }) =>
								t.jsxs(q, {
									children: [
										t.jsx(I, { children: "Poids (kg)" }),
										t.jsx($, {
											children: t.jsx(Y, {
												type: "number",
												placeholder: "Ex: 70",
												...p,
												onChange: (u) =>
													p.onChange(
														u.target.value ? Number(u.target.value) : "",
													),
											}),
										}),
										t.jsx(B, {}),
									],
								}),
						}),
					],
				}),
				t.jsx(R, {
					control: i.control,
					name: "licenseNumber",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Numéro de licence" }),
								t.jsx($, {
									children: t.jsx(Y, { placeholder: "Ex: ABC123456", ...p }),
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "newsletterSubscription",
					render: ({ field: p }) =>
						t.jsxs(q, {
							className:
								"flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
							children: [
								t.jsx($, {
									children: t.jsx(mi, {
										checked: p.value,
										onCheckedChange: p.onChange,
									}),
								}),
								t.jsxs("div", {
									className: "space-y-1 leading-none",
									children: [
										t.jsx(I, { children: "S'abonner à la newsletter" }),
										t.jsx(ga, {
											children:
												"Recevoir les actualités et informations de l'association par email",
										}),
									],
								}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "theme",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Thème d'affichage" }),
								t.jsxs(ba, {
									onValueChange: p.onChange,
									value: p.value,
									children: [
										t.jsx($, {
											children: t.jsx(wa, {
												children: t.jsx(ya, {
													placeholder: "Sélectionner un thème",
												}),
											}),
										}),
										t.jsxs(ja, {
											children: [
												t.jsx(ee, {
													value: "light",
													children: t.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															t.jsx(bi, { className: "h-4 w-4" }),
															t.jsx("span", { children: "Clair" }),
														],
													}),
												}),
												t.jsx(ee, {
													value: "dark",
													children: t.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															t.jsx(wi, { className: "h-4 w-4" }),
															t.jsx("span", { children: "Sombre" }),
														],
													}),
												}),
												t.jsx(ee, {
													value: "auto",
													children: t.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															t.jsx(yi, { className: "h-4 w-4" }),
															t.jsx("span", { children: "Automatique" }),
														],
													}),
												}),
											],
										}),
									],
								}),
								t.jsx(ga, {
									children:
										"Choisissez votre thème préféré. Le thème automatique s'adapte aux paramètres de votre système.",
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				t.jsx(R, {
					control: i.control,
					name: "image",
					render: ({ field: p }) =>
						t.jsxs(q, {
							children: [
								t.jsx(I, { children: "Photo de profil" }),
								t.jsx($, {
									children: t.jsx(Ft, {
										currentImage: e.image ?? void 0,
										onUploadSuccess: p.onChange,
										onUploadError: () => {
											i.setError("image", {
												message:
													"Une erreur est survenue lors de l'upload de l'image",
											});
										},
										isUploading: n.isPending,
										isErrorUpload: n.isError,
										userId: e.id,
									}),
								}),
								t.jsx(B, {}),
							],
						}),
				}),
				i.formState.errors.root &&
					t.jsx("div", {
						className: "text-sm font-medium text-destructive",
						children: i.formState.errors.root.message,
					}),
				t.jsx(Z, {
					type: "submit",
					disabled: i.formState.isSubmitting,
					children: i.formState.isSubmitting
						? "Enregistrement..."
						: "Enregistrer les modifications",
				}),
			],
		}),
	});
}
function Tt() {
	const e = ue.c(19),
		a = oi.useLoaderData().user,
		i = pi.useLoaderData().accounts;
	let n;
	e[0] === Symbol.for("react.memo_cache_sentinel")
		? ((n = Ua()), (e[0] = n))
		: (n = e[0]);
	let o;
	e[1] !== a
		? ((o = { ...n, initialData: a }), (e[1] = a), (e[2] = o))
		: (o = e[2]);
	const { data: r } = va(o);
	let c;
	e[3] !== a.id ? ((c = ri(a.id)), (e[3] = a.id), (e[4] = c)) : (c = e[4]);
	let s;
	e[5] !== i || e[6] !== c
		? ((s = { ...c, initialData: i }), (e[5] = i), (e[6] = c), (e[7] = s))
		: (s = e[7]);
	const { data: d } = va(s);
	if (!r || !d) {
		let g;
		return (
			e[8] === Symbol.for("react.memo_cache_sentinel")
				? ((g = t.jsx("div", { children: "Chargement..." })), (e[8] = g))
				: (g = e[8]),
			g
		);
	}
	const w = d.some(Rt) ? Ci : Ei;
	let p;
	e[9] === Symbol.for("react.memo_cache_sentinel")
		? ((p = t.jsx("div", {
				className: "flex items-center gap-2",
				children: t.jsx(Z, {
					variant: "link",
					size: "sm",
					className: "gap-2",
					asChild: !0,
					children: t.jsxs(li, {
						to: "/user/profile",
						children: [t.jsx(ji, { className: "h-4 w-4" }), "Retour au profil"],
					}),
				}),
			})),
			(e[9] = p))
		: (p = e[9]);
	let u;
	e[10] === Symbol.for("react.memo_cache_sentinel")
		? ((u = t.jsxs(da, {
				children: [
					t.jsx(ma, { children: "Informations personnelles" }),
					t.jsx(ua, {
						children:
							"Gérez vos informations personnelles et votre photo de profil.",
					}),
				],
			})),
			(e[10] = u))
		: (u = e[10]);
	let f;
	e[11] !== r
		? ((f = t.jsxs(fa, {
				children: [u, t.jsx(xa, { children: t.jsx(Nt, { user: r }) })],
			})),
			(e[11] = r),
			(e[12] = f))
		: (f = e[12]);
	let v;
	e[13] === Symbol.for("react.memo_cache_sentinel")
		? ((v = t.jsxs(da, {
				children: [
					t.jsx(ma, { children: "Sécurité" }),
					t.jsx(ua, {
						children: "Gérez votre mot de passe pour sécuriser votre compte.",
					}),
				],
			})),
			(e[13] = v))
		: (v = e[13]);
	let j;
	e[14] !== w
		? ((j = t.jsxs(fa, {
				children: [v, t.jsx(xa, { children: t.jsx(w, {}) })],
			})),
			(e[14] = w),
			(e[15] = j))
		: (j = e[15]);
	let y;
	return (
		e[16] !== f || e[17] !== j
			? ((y = t.jsxs("div", {
					className: "container max-w-2xl py-6 space-y-6",
					children: [p, f, j],
				})),
				(e[16] = f),
				(e[17] = j),
				(e[18] = y))
			: (y = e[18]),
		y
	);
}
function Rt(e) {
	return e.provider === "credential";
}
const hn = () => {
	const a = ue.c(1);
	let i;
	return (
		a[0] === Symbol.for("react.memo_cache_sentinel")
			? ((i = t.jsx(Tt, {})), (a[0] = i))
			: (i = a[0]),
		i
	);
};
export { hn as component };
