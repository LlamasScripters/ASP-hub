import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "ASP API is running!" });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
