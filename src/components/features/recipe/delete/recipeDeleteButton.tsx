import type { IRecipe } from "@/types/recipe/recipe";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useDeleteRecipeMutation } from "@/services/recipe/mutations/deleteRecipeMutation";

export const RecipeDeleteButton = ({
  recipe_id,
}: {
  recipe_id: IRecipe["_id"];
}) => {
  const { mutateAsync } = useDeleteRecipeMutation(recipe_id);
  const { openDialogMessage, setProcessMessage } = useConfirmDialogActions();

  const onClickDeleteRecipe = () => {
    openDialogMessage({
      message: "레시피를 삭제하시겠습니까?",
      requestFn: async () => {
        setProcessMessage("레시피 제거중...");
        await mutateAsync();
      },
    });
  };

  return <button onClick={onClickDeleteRecipe}>삭제</button>;
};
