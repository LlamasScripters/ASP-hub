import ky from "ky";
import { API_BASE_URL } from "./config";

export const api = ky.create({
	prefixUrl: API_BASE_URL,
});
