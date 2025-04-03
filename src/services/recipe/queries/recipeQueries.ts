import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IRecipe } from "@/types/recipe/recipe";
import { RecipeService } from "..";

const LIMIT = 10;

export class RecipeQueries {
  static readonly keys = {
    root: ["recipe"],
    mine: ["recipe", "users"],
    like: ["recipe", "users", "like"],
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

  static listQueryByUserName(name: string) {
    return queryOptions({
      queryKey: [...this.keys.mine, name],
      queryFn: ({ signal }) =>
        RecipeService.readRecipeListByUserName({ signal, userName: name }),
    });
  }

  static listQueryByUserLike() {
    return queryOptions({
      queryKey: [...this.keys.like],
      queryFn: ({ signal }) => RecipeService.readMyLikeRecieps({ signal }),
    });
  }
}
