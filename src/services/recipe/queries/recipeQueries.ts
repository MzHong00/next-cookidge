import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IRecipe } from "@/types/recipe/recipe";
import { RecipeService } from "..";

const LIMIT = 10;

export class RecipeQueries {
  static readonly keys = {
    root: ["recipe"],
    list: ["recipe-infinite"],
  };

  static detailQuery(recipeId: IRecipe["_id"]) {
    return queryOptions({
      queryKey: [...this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      enabled: !!recipeId,
    });
  }

  static listQuery(slug: string = "") {
    return infiniteQueryOptions({
      queryKey: [...this.keys.list, slug],
      queryFn: ({ pageParam, signal }) =>
        RecipeService.readRecipeList({
          slug: slug,
          params: {
            limit: LIMIT,
            offset: pageParam * LIMIT,
          },
          signal,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0 || lastPage?.length < LIMIT) return;

        return lastPageParam + 1;
      },
    });
  }
}
