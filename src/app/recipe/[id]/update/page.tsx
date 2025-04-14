import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";

import { LoadingDots } from "@/components/common/loadingDots";
import { RecipeUpdate } from "@/containers/recipe/recipeUpdate/recipeUpdate";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {};
}

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
