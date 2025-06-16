import "dotenv/config";
import { seedDatabase, resetDatabase } from "./seeders/index.js";

async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case "reset":
        console.log("Suppression des données existantes...");
        await resetDatabase();
        console.log("Base de données réinitialisée avec succès !");
        break;
      
      case "seed":
        console.log("Début du seeding...");
        await seedDatabase();
        console.log("Seeding terminé avec succès !");
        break;
      
      case "fresh":
        console.log("Reset et seeding complet...");
        await resetDatabase();
        await seedDatabase();
        console.log("Base de données fraîche créée avec succès !");
        break;
      
      default:
        console.log("Usage: npm run db:seed [reset|seed|fresh]");
        process.exit(1);
    }
  } catch (error) {
    console.error("Erreur lors du seeding:", error);
    process.exit(1);
  }
}

main();