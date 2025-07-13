import ky from "ky";
import { API_CONFIG } from "./config";

export const api = ky.create({
	prefixUrl: API_CONFIG.FULL_URL,
});
