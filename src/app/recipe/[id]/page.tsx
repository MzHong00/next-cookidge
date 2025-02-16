import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { RecipeService } from "@/services/recipe";

const fetchRecipe = async (id: string) => {
  return await RecipeService.readRecipe(id);
};

export default async function RecipeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | undefined>;
}) {
  const { id } = await params;
  const { p } = await searchParams;

  const recipe = await fetchRecipe(id);

  return <RecipeDetail recipe={recipe} backgroundWithPublicID={p} />;
}
