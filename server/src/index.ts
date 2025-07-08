import server from "./server.js";

async function main() {
	server.listen(3000, "0.0.0.0", () => {
		console.log("Server running on port 3000");
	});

	return;
}

main();
