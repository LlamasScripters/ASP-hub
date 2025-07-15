import { u as X } from "./index-8ZKmGdXm.js";
import { P as $ } from "./index-BRam3N1Z.js";
import { P as _ } from "./index-Bv1xjdPd.js";
import { c as z } from "./index-DauBq6FI.js";
import { u as G, c as S } from "./index-Dqr9Wf5M.js";
import { l as N, c as O, j as d, r as u, H as w } from "./index-kb-Ylywn.js";
import { u as K, C as U } from "./index-mnH6Jux_.js";
var y = "Checkbox",
	[J, ce] = z(y),
	[Q, P] = J(y);
function V(r) {
	const {
			__scopeCheckbox: s,
			checked: e,
			children: n,
			defaultChecked: o,
			disabled: t,
			form: c,
			name: a,
			onCheckedChange: f,
			required: b,
			value: k = "on",
			internal_do_not_use_render: p,
		} = r,
		[h, v] = G({ prop: e, defaultProp: o ?? !1, onChange: f, caller: y }),
		[C, x] = u.useState(null),
		[g, i] = u.useState(null),
		l = u.useRef(!1),
		E = C ? !!c || !!C.closest("form") : !0,
		R = {
			checked: h,
			disabled: t,
			setChecked: v,
			control: C,
			setControl: x,
			name: a,
			form: c,
			value: k,
			hasConsumerStoppedPropagationRef: l,
			required: b,
			defaultChecked: m(o) ? !1 : o,
			isFormControl: E,
			bubbleInput: g,
			setBubbleInput: i,
		};
	return d.jsx(Q, { scope: s, ...R, children: W(p) ? p(R) : n });
}
var B = "CheckboxTrigger",
	M = u.forwardRef(
		({ __scopeCheckbox: r, onKeyDown: s, onClick: e, ...n }, o) => {
			const {
					control: t,
					value: c,
					disabled: a,
					checked: f,
					required: b,
					setControl: k,
					setChecked: p,
					hasConsumerStoppedPropagationRef: h,
					isFormControl: v,
					bubbleInput: C,
				} = P(B, r),
				x = w(o, k),
				g = u.useRef(f);
			return (
				u.useEffect(() => {
					const i = t == null ? void 0 : t.form;
					if (i) {
						const l = () => p(g.current);
						return (
							i.addEventListener("reset", l),
							() => i.removeEventListener("reset", l)
						);
					}
				}, [t, p]),
				d.jsx(_.button, {
					type: "button",
					role: "checkbox",
					"aria-checked": m(f) ? "mixed" : f,
					"aria-required": b,
					"data-state": F(f),
					"data-disabled": a ? "" : void 0,
					disabled: a,
					value: c,
					...n,
					ref: x,
					onKeyDown: S(s, (i) => {
						i.key === "Enter" && i.preventDefault();
					}),
					onClick: S(e, (i) => {
						p((l) => (m(l) ? !0 : !l)),
							C &&
								v &&
								((h.current = i.isPropagationStopped()),
								h.current || i.stopPropagation());
					}),
				})
			);
		},
	);
M.displayName = B;
var I = u.forwardRef((r, s) => {
	const {
		__scopeCheckbox: e,
		name: n,
		checked: o,
		defaultChecked: t,
		required: c,
		disabled: a,
		value: f,
		onCheckedChange: b,
		form: k,
		...p
	} = r;
	return d.jsx(V, {
		__scopeCheckbox: e,
		checked: o,
		defaultChecked: t,
		disabled: a,
		required: c,
		onCheckedChange: b,
		name: n,
		form: k,
		value: f,
		internal_do_not_use_render: ({ isFormControl: h }) =>
			d.jsxs(d.Fragment, {
				children: [
					d.jsx(M, { ...p, ref: s, __scopeCheckbox: e }),
					h && d.jsx(D, { __scopeCheckbox: e }),
				],
			}),
	});
});
I.displayName = y;
var T = "CheckboxIndicator",
	q = u.forwardRef((r, s) => {
		const { __scopeCheckbox: e, forceMount: n, ...o } = r,
			t = P(T, e);
		return d.jsx($, {
			present: n || m(t.checked) || t.checked === !0,
			children: d.jsx(_.span, {
				"data-state": F(t.checked),
				"data-disabled": t.disabled ? "" : void 0,
				...o,
				ref: s,
				style: { pointerEvents: "none", ...r.style },
			}),
		});
	});
q.displayName = T;
var A = "CheckboxBubbleInput",
	D = u.forwardRef(({ __scopeCheckbox: r, ...s }, e) => {
		const {
				control: n,
				hasConsumerStoppedPropagationRef: o,
				checked: t,
				defaultChecked: c,
				required: a,
				disabled: f,
				name: b,
				value: k,
				form: p,
				bubbleInput: h,
				setBubbleInput: v,
			} = P(A, r),
			C = w(e, v),
			x = K(t),
			g = X(n);
		u.useEffect(() => {
			const l = h;
			if (!l) return;
			const E = window.HTMLInputElement.prototype,
				j = Object.getOwnPropertyDescriptor(E, "checked").set,
				H = !o.current;
			if (x !== t && j) {
				const L = new Event("click", { bubbles: H });
				(l.indeterminate = m(t)), j.call(l, m(t) ? !1 : t), l.dispatchEvent(L);
			}
		}, [h, x, t, o]);
		const i = u.useRef(m(t) ? !1 : t);
		return d.jsx(_.input, {
			type: "checkbox",
			"aria-hidden": !0,
			defaultChecked: c ?? i.current,
			required: a,
			disabled: f,
			name: b,
			value: k,
			form: p,
			...s,
			tabIndex: -1,
			ref: C,
			style: {
				...s.style,
				...g,
				position: "absolute",
				pointerEvents: "none",
				opacity: 0,
				margin: 0,
				transform: "translateX(-100%)",
			},
		});
	});
D.displayName = A;
function W(r) {
	return typeof r == "function";
}
function m(r) {
	return r === "indeterminate";
}
function F(r) {
	return m(r) ? "indeterminate" : r ? "checked" : "unchecked";
}
const Y = u.forwardRef((r, s) => {
	const e = O.c(10);
	let n, o;
	e[0] !== r
		? (({ className: n, ...o } = r), (e[0] = r), (e[1] = n), (e[2] = o))
		: ((n = e[1]), (o = e[2]));
	let t;
	e[3] !== n
		? ((t = N(
				"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				n,
			)),
			(e[3] = n),
			(e[4] = t))
		: (t = e[4]);
	let c;
	e[5] === Symbol.for("react.memo_cache_sentinel")
		? ((c = d.jsx(q, {
				className: N("flex items-center justify-center text-current"),
				children: d.jsx(U, { className: "h-4 w-4" }),
			})),
			(e[5] = c))
		: (c = e[5]);
	let a;
	return (
		e[6] !== o || e[7] !== s || e[8] !== t
			? ((a = d.jsx(I, { ref: s, className: t, ...o, children: c })),
				(e[6] = o),
				(e[7] = s),
				(e[8] = t),
				(e[9] = a))
			: (a = e[9]),
		a
	);
});
Y.displayName = I.displayName;
export { Y as C };
