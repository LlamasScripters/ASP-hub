import { createFileRoute } from "@tanstack/react-router";
import { PublicBlogPage } from "@/features/blog/PublicBlogPage.tsx";
import { blogApi, type BlogLoaderData } from "../../../../../../features/blog/lib/blog.ts";

export const Route = createFileRoute(
  "/_authenticated/(nonadmin)/_nonadmin/dashboard/blog/"
)({
  component: RouteComponent,
  loader: async (): Promise<BlogLoaderData> => {
    try {
      const response = await blogApi.getBlogs();
      // Filtrer seulement les articles publiés pour la partie publique
      const publishedBlogs = response.data.filter(blog => blog.state === 'published');
      return { blogs: publishedBlogs };
    } catch (error) {
      console.error("Error loading public blogs:", error);
      throw error;
    }
  },
  errorComponent: ({ error }) => {
    console.error("Error loading blogs:", error);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Erreur de chargement
            </h2>
            <p className="text-gray-600 mb-4">
              Impossible de charger les articles du blog.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  },
  pendingComponent: () => (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Chargement des articles...</p>
        </div>
      </div>
    </div>
  ),
});

function RouteComponent() {
  const { blogs } = Route.useLoaderData();
  return <PublicBlogPage blogs={blogs} />;
}