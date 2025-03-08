import { IRecipe } from "@/types/recipe";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { CommentService } from "..";

const LIMIT = 10;

export class CommentQueries {
  static keys = {
    root: ["comments"],
  };

  static infiniteQuery(recipeId: IRecipe["_id"]) {
    return infiniteQueryOptions({
      queryKey: [...this.keys.root, recipeId],
      queryFn: ({ pageParam, signal }) =>
        CommentService.readCommentsQuery({
          params: {
            recipe_id: recipeId,
            last_comment_id: pageParam,
            limit: LIMIT,
          },
          signal,
        }),
      initialPageParam: "",
      getNextPageParam: (lastPage) => {
        if (lastPage.length === 0) return;

        const lastComment = lastPage.at(-1);
        return lastComment?._id;
      },
    });
  }
}
