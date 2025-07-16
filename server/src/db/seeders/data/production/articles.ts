import type { db } from "@/db/index.js";
import { type User, articles } from "@/db/schema.js";

export async function seedArticles(
	database: typeof db,
	users: { adminUser: User; regularUser: User },
) {
	console.log("Creating blog articles...");

	try {
		// Check if articles already exist
		const existingArticles = await database.query.articles.findMany();

		if (existingArticles.length > 0) {
			console.log("ℹ️  Articles already exist, skipping seed");
			return existingArticles;
		}

		// TipTap compatible HTML content
		const articleData = [
			{
				title: "Bienvenue sur le nouveau blog ASP Hub",
				headerImage:
					"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
				content: `
					<h2>Un nouveau chapitre commence</h2>
					<p>Nous sommes ravis de vous présenter le nouveau blog de l'ASP Hub, votre plateforme dédiée au sport et à la communauté.</p>
					
					<h3>Ce que vous découvrirez ici</h3>
					<ul>
						<li>Des actualités sur vos sports favoris</li>
						<li>Des conseils d'entraînement et de nutrition</li>
						<li>Des portraits d'athlètes inspirants</li>
						<li>Des événements et compétitions à venir</li>
					</ul>
					
					<blockquote>
						<p>"Le sport va chercher la peur pour la dominer, la fatigue pour en triompher, la difficulté pour la vaincre."</p>
						<cite>Pierre de Coubertin</cite>
					</blockquote>
					
					<p>Rejoignez-nous dans cette aventure sportive et partagez avec nous vos expériences, vos victoires et vos défis.</p>
					
					<p><strong>L'équipe ASP Hub</strong></p>
				`,
				state: "published" as const,
				authorId: users.adminUser.id,
				publishedAt: new Date(),
				commentsEnabled: true,
			},
			{
				title: "5 conseils pour améliorer vos performances sportives",
				headerImage:
					"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
				content: `
					<h2>Optimisez votre entraînement</h2>
					<p>Que vous soyez débutant ou athlète confirmé, ces conseils vous aideront à atteindre vos objectifs sportifs.</p>
					
					<h3>1. Établissez un programme d'entraînement régulier</h3>
					<p>La régularité est la clé du succès. Planifiez vos séances d'entraînement et respectez-les autant que possible.</p>
					
					<h3>2. Variez vos exercices</h3>
					<p>Alternez entre différents types d'exercices pour solliciter tous les groupes musculaires :</p>
					<ul>
						<li>Cardio-training</li>
						<li>Renforcement musculaire</li>
						<li>Étirements et flexibilité</li>
						<li>Exercices fonctionnels</li>
					</ul>
					
					<h3>3. Hydratez-vous correctement</h3>
					<p>L'hydratation est cruciale pour maintenir vos performances. Buvez de l'eau avant, pendant et après l'effort.</p>
					
					<h3>4. Accordez-vous du repos</h3>
					<p>Le repos fait partie intégrante de l'entraînement. Vos muscles ont besoin de récupérer pour se renforcer.</p>
					
					<h3>5. Surveillez votre alimentation</h3>
					<p>Une alimentation équilibrée vous donnera l'énergie nécessaire pour vos entraînements et favorisera la récupération.</p>
					
					<p><em>Rappelez-vous : la progression demande du temps et de la patience. Soyez régulier et les résultats suivront !</em></p>
				`,
				state: "published" as const,
				authorId: users.adminUser.id,
				publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
				commentsEnabled: true,
			},
			{
				title: "L'importance de l'échauffement avant le sport",
				headerImage:
					"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
				content: `
					<h2>Préparez votre corps à l'effort</h2>
					<p>L'échauffement n'est pas une étape optionnelle, c'est une <strong>nécessité absolue</strong> pour pratiquer le sport en toute sécurité.</p>
					
					<h3>Pourquoi s'échauffer ?</h3>
					<ol>
						<li><strong>Prévention des blessures</strong> : Un muscle chaud est plus élastique et moins susceptible de se blesser</li>
						<li><strong>Amélioration des performances</strong> : Votre corps atteint plus rapidement son niveau optimal</li>
						<li><strong>Préparation mentale</strong> : L'échauffement vous permet de vous concentrer sur votre activité</li>
					</ol>
					
					<h3>Un échauffement efficace en 3 phases</h3>
					
					<h4>Phase 1 : Activation cardio-vasculaire (5-10 min)</h4>
					<p>Commencez par des mouvements légers pour augmenter votre rythme cardiaque :</p>
					<ul>
						<li>Marche rapide</li>
						<li>Jogging léger</li>
						<li>Vélo d'appartement</li>
					</ul>
					
					<h4>Phase 2 : Mobilité articulaire (5-10 min)</h4>
					<p>Mobilisez vos articulations en douceur avec des rotations et des étirements dynamiques.</p>
					
					<h4>Phase 3 : Activation spécifique (5-10 min)</h4>
					<p>Reproduisez les gestes de votre sport à intensité progressive.</p>
					
					<blockquote>
						<p>"Un bon échauffement peut faire la différence entre une séance réussie et une blessure qui vous éloigne des terrains pendant des semaines."</p>
					</blockquote>
					
					<p>Prenez le temps de bien vous échauffer, votre corps vous remerciera !</p>
				`,
				state: "published" as const,
				authorId: users.regularUser.id,
				publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
				commentsEnabled: true,
			},
		];

		// Insert articles
		const insertedArticles = await database
			.insert(articles)
			.values(articleData)
			.returning();

		console.log(`✅ Created ${insertedArticles.length} blog articles`);
		return insertedArticles;
	} catch (error) {
		console.error("❌ Error creating blog articles:", error);
		throw error;
	}
}
