import { Suspense } from "react";

import { LoadingDots } from "@/components/common/loadingDots";
import { RecipeUpdate } from "@/containers/recipe/recipeUpdate/recipeUpdate";
import { ClientRender } from "@/components/common/clientRender";

export const metadata = {
  title: "레시피 수정",
};

export default async function RecipeUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingDots msg="레시피 데이터 가져오는 중..." />}>
      <ClientRender>
        <RecipeUpdate recipe_id={id} />
      </ClientRender>
    </Suspense>
  );
}
