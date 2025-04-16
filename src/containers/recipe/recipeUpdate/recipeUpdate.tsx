"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import type { IRecipe } from "@/types/recipe/recipe";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { UpdateRecipeForm } from "@/components/features/recipe/update/updateRecipeForm";

export const RecipeUpdate = ({ recipe_id }: { recipe_id: IRecipe["_id"] }) => {
  const { data: recipe } = useSuspenseQuery(
    RecipeQueries.detailQuery(recipe_id)
  );

  return <UpdateRecipeForm recipe={recipe} />;
};
