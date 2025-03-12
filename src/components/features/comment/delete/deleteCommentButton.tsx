import type { IRecipe } from "@/types/recipe/recipe";
import type { IComment } from "@/types/comment";

interface Props {
  recipe_id: IRecipe["_id"];
  author_id: IRecipe['author_id'];
  comment_id: IComment["_id"];
}

export const DeleteCommentButton = ({ comment_id, recipe_id, author_id }: Props) => {
  return <button >삭제</button>;
};
