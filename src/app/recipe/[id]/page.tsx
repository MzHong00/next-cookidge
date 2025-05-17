import { APP_NAME } from "@/constants/common";
import QueryHydrate from "@/components/common/queryHydrate";
import { RecipeService } from "@/services/recipe";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { CommentQueries } from "@/services/comment/queries/commentQueries";
import { RecipeDetail } from "@/containers/recipe/recipeDetail/recipeDetail";
import { PIdToURL } from "@/utils/pidToUrl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = await RecipeService.readRecipe(id);

  return {
    title: `${recipe.name} | ${APP_NAME}`,
    description: recipe.introduction,
    openGraph: {
      title: recipe.name,
      images: PIdToURL(recipe.pictures[0]),
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <QueryHydrate
      queryOptions={[
        RecipeQueries.detailQuery(id),
        CommentQueries.infiniteQuery(id),
      ]}
    >
      <RecipeDetail id={id} />
    </QueryHydrate>
  );
}
