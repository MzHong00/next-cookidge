import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IComment } from "@/types/comment/comment";
import type { IRecipe } from "@/types/recipe/recipe";
import { CommentService } from "..";
import { CommentQueries } from "../queries/commentQueries";
import { useAlertActions } from "@/lib/zustand/alertStore";

export const useDeleteCommentMutation = (
  recipe_id: IRecipe["_id"],
  author_id: IRecipe["author_id"]
) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (id: IComment["_id"]) =>
      CommentService.deleteComment(id, author_id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [...CommentQueries.keys.root, recipe_id],
      });

      alertEnqueue({
        message: data.message,
        type: "success",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
  });
};
