import { auth } from "@/lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import clubsRouter from "./features/clubs/clubs.controller.js";
import complexesRouter from "./features/room-booking/complexes.controller.js";
import reservationsRouter from "./features/room-booking/reservations.controller.js";
import roomsRouter from "./features/room-booking/rooms.controller.js";
import usersRouter from "./features/users/users.controller.js";

const server = express();

server.use(helmet());
server.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
);

server.all("/api/auth/*splat", toNodeHandler(auth));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/users", usersRouter);
server.use("/api/complexes", complexesRouter);
server.use("/api/rooms", roomsRouter);
server.use("/api/reservations", reservationsRouter);
server.use("/api/clubs", clubsRouter);

server.get("/api/health", (_req, res) => {
	res.sendStatus(200);
	return;
});

export default server;
