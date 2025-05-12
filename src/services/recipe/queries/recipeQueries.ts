import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";
import type { IRecipe, IRecipeQuery } from "@/types/recipe/recipe";
import { RecipeService } from "..";
import { PAGENATION_LIMIT } from "@/constants/common";

export class RecipeQueries {
  static readonly keys = {
    root: ["recipe"],
    list: ["recipe", "infinite"],
    like: ["recipe", "by-users-like"],
    users: ["recipe", "by-users-name"],
    recommend: ["recipe", "recommend"],
  };

  static detailQuery(recipeId: IRecipe["_id"]) {
    return queryOptions({
      queryKey: [...this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
    });
  }

  static listQuery(queryParams: Partial<IRecipeQuery> = {}) {
    return infiniteQueryOptions({
      queryKey: [...this.keys.list, JSON.stringify(queryParams)],
      queryFn: ({ pageParam, signal }) =>
        RecipeService.readRecipeList({
          params: {
            ...queryParams,
            limit: PAGENATION_LIMIT,
            offset: pageParam * PAGENATION_LIMIT,
          },
          signal,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0 || lastPage?.length < PAGENATION_LIMIT)
          return;

        return lastPageParam + 1;
      },
    });
  }

  // 레시피 추천
  static recommendQuery(params: {
    fridge_id: IFridge["_id"];
    categories?: IRecipe["category"][];
    my_ingredients?: IIngredient["name"][];
  }) {
    const { fridge_id, categories, my_ingredients } = params;

    return queryOptions({
      queryKey: [...this.keys.recommend, fridge_id],
      queryFn: ({ signal }) =>
        RecipeService.recommnedRecipe({
          signal,
          params: {
            categories,
            my_ingredients,
          },
        }),
      select: (data) =>
        data?.filter((recipe) => recipe.matched_ingredients.length !== 0),
    });
  }

  static listQueryByUserName(name: string) {
    return queryOptions({
      queryKey: [...this.keys.users, name],
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
