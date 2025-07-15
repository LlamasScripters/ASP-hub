import { c as d, r } from "./index-kb-Ylywn.js";
const i = 768;
function m() {
	const e = d.c(2),
		[a, o] = r.useState(void 0);
	let t, n;
	return (
		e[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = () => {
					const s = window.matchMedia(`(max-width: ${i - 1}px)`),
						c = () => {
							o(window.innerWidth < i);
						};
					return (
						s.addEventListener("change", c),
						o(window.innerWidth < i),
						() => s.removeEventListener("change", c)
					);
				}),
				(n = []),
				(e[0] = t),
				(e[1] = n))
			: ((t = e[0]), (n = e[1])),
		r.useEffect(t, n),
		!!a
	);
}
function h() {
	const e = d.c(2),
		[a, o] = r.useState(void 0);
	let t, n;
	return (
		e[0] === Symbol.for("react.memo_cache_sentinel")
			? ((t = () => {
					const s = window.matchMedia(`(max-width: ${i - 1}px)`),
						c = () => {
							o(window.innerWidth < i);
						};
					return (
						s.addEventListener("change", c),
						o(window.innerWidth < i),
						() => s.removeEventListener("change", c)
					);
				}),
				(n = []),
				(e[0] = t),
				(e[1] = n))
			: ((t = e[0]), (n = e[1])),
		r.useEffect(t, n),
		!!a
	);
}
export { h as a, m as u };
