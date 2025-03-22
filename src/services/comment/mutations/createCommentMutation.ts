import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IComment } from "@/types/comment";
import type { IRecipe } from "@/types/recipe/recipe";
import { CommentService } from "..";
import { CommentQueries } from "../queries/commentQueries";

export const useCreateCommentMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: IComment["comment"]) =>
      CommentService.createComment(recipeId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...CommentQueries.keys.root, recipeId],
      });
    },
  });
};
