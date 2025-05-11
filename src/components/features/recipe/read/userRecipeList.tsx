"use client";

import {
  InfiniteQueryObserverResult,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";
import { IntersectionObserverMasonry } from "@/components/common/intersectionObserverMasonry";

const REIPCE_WIDTH = 400;

export const UserRecipeList = ({ name }: { name: string }) => {
  const { data: recipe } = useSuspenseQuery(
    RecipeQueries.listQueryByUserName(name)
  );

  return (
    <IntersectionObserverMasonry
      item_width={REIPCE_WIDTH}
      hasNextPage={false}
      fetchNextPage={function (): Promise<InfiniteQueryObserverResult> {
        throw new Error("Function not implemented.");
      }}
    >
      {recipe.map((recipe) => (
        <article key={recipe._id}>
          <RecipeThumbnail
            recipe={recipe}
            width={REIPCE_WIDTH}
            height={REIPCE_WIDTH}
          />
        </article>
      ))}
    </IntersectionObserverMasonry>
  );
};
