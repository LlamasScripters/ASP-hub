import { createFileRoute } from "@tanstack/react-router";
import { blogApi, type BlogDetailLoaderData } from "../../../../../../../src/features/clubs/pages/blog/lib/blog.ts";
import BlogEditPage from "@/features/clubs/pages/blog/BlogEditPage";

export const Route = createFileRoute("/_authenticated/admin/_admin/blog/$blogId/edit")({
  component: BlogEditPageWrapper,
  loader: async ({ params }): Promise<BlogDetailLoaderData> => {
    try {
      const response = await blogApi.getBlog(params.blogId);
      return { blog: response.data };
    } catch (error) {
      console.error("Error loading blog:", error);
      throw error;
    }
  },
  errorComponent: ({ error }) => {
    console.error("Error loading blog:", error);
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Article non trouvé
          </h2>
          <p className="text-gray-600 mb-4">
            L'article que vous souhaitez modifier n'existe pas ou a été supprimé.
          </p>
          <div className="space-x-4">
            <a 
              href="/admin/blog"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retour à la liste
            </a>
            <a 
              href="/admin/blog/create"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Créer un nouvel article
            </a>
          </div>
        </div>
      </div>
    );
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Chargement de l'article...</p>
      </div>
    </div>
  ),
});

function BlogEditPageWrapper() {
  const { blog } = Route.useLoaderData();
  return <BlogEditPage blog={blog} />;
}