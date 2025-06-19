import { createFileRoute } from "@tanstack/react-router";
import BlogCreatePage from "@/features/blog/BlogCreatePage";

export const Route = createFileRoute("/_authenticated/admin/_admin/blog/create")({
  component: BlogCreatePage,
  errorComponent: ({ error }) => {
    console.error("Error in blog create page:", error);
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Erreur de la page
          </h2>
          <p className="text-gray-600 mb-4">
            Une erreur s'est produite lors du chargement de la page de création d'article.
          </p>
          <a 
            href="/admin/blog"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retour à la liste
          </a>
        </div>
      </div>
    );
  },
});