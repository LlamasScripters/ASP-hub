import { init } from "./init.js";
import { s3Client } from "./lib/s3.js";
import server from "./server.js";

async function main() {
	await init({ s3Client });

	server.listen(3000, "0.0.0.0", () => {
		console.log("Server running on port 3000");
	});

	return;
}

main();
