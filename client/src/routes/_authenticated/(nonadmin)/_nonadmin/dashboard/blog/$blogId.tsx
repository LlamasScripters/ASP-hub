import { createFileRoute } from "@tanstack/react-router";
import { PublicBlogDetailPage } from "@/features/blog/PublicBlogDetailPage.tsx";
import { blogApi, type BlogDetailLoaderData } from "../../../../../../features/blog/lib/blog.ts";

export const Route = createFileRoute(
  "/_authenticated/(nonadmin)/_nonadmin/dashboard/blog/$blogId"
)({
  component: PublicBlogDetailPageWrapper,
  loader: async ({ params }): Promise<BlogDetailLoaderData> => {
    try {
      const response = await blogApi.getBlog(params.blogId);
      
      // Vérifier que l'article est publié (sécurité côté client)
      if (response.data.state !== 'published') {
        throw new Error("Article not published");
      }
      
      return { blog: response.data };
    } catch (error) {
      console.error("Error loading blog article:", error);
      throw error;
    }
  },
  errorComponent: ({ error }) => {
    console.error("Error loading blog article:", error);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Article introuvable
            </h2>
            <p className="text-gray-600 mb-4">
              L'article que vous cherchez n'existe pas ou n'est plus disponible.
            </p>
            <div className="space-x-4">
              <a 
                href="/dashboard/blog"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retour au blog
              </a>
            </div>
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
          <p className="text-gray-600 text-lg">Chargement de l'article...</p>
        </div>
      </div>
    </div>
  ),
});

function PublicBlogDetailPageWrapper() {
  const { blog } = Route.useLoaderData();
  return <PublicBlogDetailPage blog={blog} />;
}