import { u } from "./index-DauBq6FI.js";
import { r as e, Q as s } from "./index-kb-Ylywn.js";
var c = s[" useId ".trim().toString()] || (() => {}),
	i = 0;
function f(t) {
	const [r, a] = e.useState(c());
	return (
		u(() => {
			a((o) => o ?? String(i++));
		}, [t]),
		t || (r ? `radix-${r}` : "")
	);
}
export { f as u };
