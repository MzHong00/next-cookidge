import type { IComment } from "@/types/comment/comment";
import type { IRecipe } from "@/types/recipe/recipe";

import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useDeleteCommentMutation } from "@/services/comment/mutations/deleteCommentMutation";

interface Props {
  recipe_id: IRecipe["_id"];
  author_id: IRecipe["author_id"];
  comment_id: IComment["_id"];
}

export const DeleteCommentButton = ({
  comment_id,
  recipe_id,
  author_id,
}: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useDeleteCommentMutation(recipe_id, author_id);

  const onClickDeleteComment = () => {
    openDialogMessage({
      message: "댓글을 삭제하시겠습니까?",
      requestFn: async () => {
        await mutateAsync(comment_id);
      },
      option: { backspace: false },
    });
  };

  return <button onClick={onClickDeleteComment}>삭제</button>;
};
