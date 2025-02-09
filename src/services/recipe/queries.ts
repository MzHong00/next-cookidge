import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { RecipeService } from ".";
import type { IRecipe } from "@/types/recipe";

export class RecipeQueries {
  static readonly keys = {
    root: ["recipe"],
    list: ["recipe-infinite"],
  };

  static detailQuery(recipeId: IRecipe["_id"]) {
    return queryOptions({
      queryKey: [this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      enabled: !!recipeId,
      retry: false,
    });
  }
  
  static listQuery(slug: string) {
    const limit = 6;
    return infiniteQueryOptions({
      queryKey: [...this.keys.list, slug],
      queryFn:({ pageParam, signal }) =>
        RecipeService.readRecipeList({
          params: {
            limit,
            offset: pageParam * limit,
          },
          signal,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0 || lastPage?.length < limit) return;

        return lastPageParam + 1;
      },
      retry: false,
    });
  }
}