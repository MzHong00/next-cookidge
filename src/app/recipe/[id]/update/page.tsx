import { Suspense } from "react";

import { LoadingDots } from "@/components/common/loadingDots";
import { RecipeUpdate } from "@/containers/recipe/recipeUpdate/recipeUpdate";

export default async function RecipeUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingDots msg="레시피 데이터 가져오는 중..." />}>
      <RecipeUpdate recipe_id={id} />
    </Suspense>
  );
}
