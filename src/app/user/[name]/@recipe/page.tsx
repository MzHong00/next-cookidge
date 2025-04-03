import { QueryClient } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { UserRecipeList } from "@/components/features/recipe/read/userRecipeList";

export default async function UserRecipePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(RecipeQueries.listQueryByUserName(decodedName));

  return <UserRecipeList name={decodedName} />;
}
