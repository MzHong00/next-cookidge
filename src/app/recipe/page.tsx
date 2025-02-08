import { RecipeList } from "@/containers/recipe/recipeList";
import { Suspense } from "react";

export default async function RecipePage() {

  return (
    <Suspense fallback="기달">
      <RecipeList />
    </Suspense>
  );
}
