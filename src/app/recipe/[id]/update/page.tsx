import QueryHydrate from "@/components/common/queryHydrate";
import { RecipeUpdate } from "@/containers/recipe/recipeUpdate/recipeUpdate";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";

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
    <QueryHydrate queryOptions={[RecipeQueries.detailQuery(id)]}>
      <RecipeUpdate recipe_id={id} />
    </QueryHydrate>
  );
}
