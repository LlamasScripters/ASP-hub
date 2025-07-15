import { auth } from "@/lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import articlesRouter from "./features/blog/article.controller.js";
import commentsRouter from "./features/blog/comments.controller.js";
import reactionsRouter from "./features/blog/reactions.controller.js";
import tagsRouter from "./features/blog/tags.controller.js";
import {
	categoriesRouter,
	clubsRouter,
	responsibilitiesRouter,
	sectionsRouter,
	sessionsRouter,
} from "./features/clubs/index.js";
import firstLoginRouter from "./features/first-login/first-login.controller.js";
import minibusReservationsRouter from "./features/minibus-booking/minibusReservations.controller.js";
import minibusesRouter from "./features/minibus-booking/minibuses.controller.js";
import onboardingRouter from "./features/onboarding/onboarding.controller.js";
import complexesRouter from "./features/room-booking/complexes.controller.js";
import roomReservationsRouter from "./features/room-booking/roomReservations.controller.js";
import roomsRouter from "./features/room-booking/rooms.controller.js";
import usersRouter from "./features/users/users.controller.js";

const server = express();

server.use(helmet());
server.use(
	cors({
		origin: process.env.HOST || "*",
		credentials: true,
	}),
);

server.all("/api/auth/*splat", toNodeHandler(auth));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/users", usersRouter);
server.use("/api/onboarding", onboardingRouter);
server.use("/api/first-login", firstLoginRouter);
server.use("/api/complexes", complexesRouter);
server.use("/api/rooms", roomsRouter);
server.use("/api/roomReservations", roomReservationsRouter);
server.use("/api/minibuses", minibusesRouter);
server.use("/api/minibusReservations", minibusReservationsRouter);
server.use("/api/clubs", clubsRouter);
server.use("/api/categories", categoriesRouter);
server.use("/api/sessionsSport", sessionsRouter);
server.use("/api/responsibilities", responsibilitiesRouter);
server.use("/api/sections", sectionsRouter);
server.use("/api/articles", articlesRouter);
server.use("/api/tags", tagsRouter);
server.use("/api/comments", commentsRouter);
server.use("/api/reactions", reactionsRouter);

server.get("/api/health", (_req, res) => {
	res.sendStatus(200);
	return;
});

export default server;
