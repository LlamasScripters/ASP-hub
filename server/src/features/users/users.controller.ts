import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

usersRouter.post("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

usersRouter.put("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

export default usersRouter;
