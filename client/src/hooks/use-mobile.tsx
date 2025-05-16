import { useEffect, useState } from "react";

const MOBILE_WIDTH_THRESHOLD = 768;

export function useMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_WIDTH_THRESHOLD);
		};

		checkIfMobile();

		window.addEventListener("resize", checkIfMobile);

		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);

	return isMobile;
}
