"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ClientRender } from "@/components/common/clientRender";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { ResponsiveMasonry } from "@/components/common/responsiveMasonry";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";

const REIPCE_WIDTH = 400;

export const UserRecipeList = ({ name }: { name: string }) => {
  const { data: recipe } = useSuspenseQuery(
    RecipeQueries.listQueryByUserName(name)
  );

  return (
    <ClientRender>
      <ResponsiveMasonry item_width={REIPCE_WIDTH}>
        {recipe.map((recipe) => (
          <article key={recipe._id}>
            <RecipeThumbnail
              recipe={recipe}
              width={REIPCE_WIDTH}
              height={REIPCE_WIDTH}
            />
          </article>
        ))}
      </ResponsiveMasonry>
    </ClientRender>
  );
};
