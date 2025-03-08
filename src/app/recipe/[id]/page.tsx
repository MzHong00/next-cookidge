import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { LoadingSpinner } from "@/components/common/loadingSpinner";

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
      <Suspense fallback={<LoadingSpinner msg="레시피 가져오는 중..." />}>
        <RecipeDetail id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
