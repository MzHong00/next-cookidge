"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { ResponsiveMasonryCSR } from "@/components/common/responsiveMasonry";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";

const REIPCE_WIDTH = 400;

export const UserRecipeList = ({ name }: { name: string }) => {
  const { data: recipe } = useSuspenseQuery(
    RecipeQueries.listQueryByUserName(name)
  );

  return (
    <ResponsiveMasonryCSR item_width={REIPCE_WIDTH}>
      {recipe.map((recipe) => (
        <article key={recipe._id}>
          <RecipeThumbnail
            recipe={recipe}
            width={REIPCE_WIDTH}
            height={REIPCE_WIDTH}
          />
        </article>
      ))}
    </ResponsiveMasonryCSR>
  );
};
