import { auth } from "@/lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import complexesRouter from "./features/room-booking/complexes.controller.js";
import reservationsRouter from "./features/room-booking/reservations.controller.js";
import roomsRouter from "./features/room-booking/rooms.controller.js";
import usersRouter from "./features/users/users.controller.js";
import clubsRouter from "./features/clubs/clubs.controller.js";

const server = express();

server.use(helmet());
server.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
);

server.all("/api/auth/*splat", toNodeHandler(auth));
//@ts-ignore
server.get("/api/me", async (req, res) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	return res.json(session);
});

server.use(express.json());
server.use("/api/users", usersRouter);
server.use("/api/complexes", complexesRouter);
server.use("/api/rooms", roomsRouter);
server.use("/api/reservations", reservationsRouter);
server.use("/api/clubs", clubsRouter);

server.get("/api", (req, res) => {
	res.json({ message: "ASP API is running!" });
});

export default server;
