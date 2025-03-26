import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { CommentQueries } from "@/services/comment/queries/commentQueries";

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(RecipeQueries.detailQuery(id)),
    queryClient.prefetchInfiniteQuery(CommentQueries.infiniteQuery(id)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingSpinner msg="레시피 가져오는 중..." />}>
        <RecipeDetail id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
