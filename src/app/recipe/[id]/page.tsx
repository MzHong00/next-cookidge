import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(RecipeQueries.detailQuery(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeDetail id={id} />
    </HydrationBoundary>
  );
}
