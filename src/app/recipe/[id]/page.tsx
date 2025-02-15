import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { RecipeQueries } from "@/services/recipe/queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function RecipeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | undefined>;
}) {
  const { id } = await params;
  const { p } = await searchParams;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(RecipeQueries.detailQuery(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeDetail id={id} backgroundWithPublicID={p} />
    </HydrationBoundary>
  );
}
