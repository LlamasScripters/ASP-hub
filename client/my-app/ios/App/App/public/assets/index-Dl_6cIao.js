import { r } from "./index-kb-Ylywn.js";
function n(t) {
	const e = r.useRef(t);
	return (
		r.useEffect(() => {
			e.current = t;
		}),
		r.useMemo(
			() =>
				(...s) => {
					var u;
					return (u = e.current) == null ? void 0 : u.call(e, ...s);
				},
			[],
		)
	);
}
export { n as u };
