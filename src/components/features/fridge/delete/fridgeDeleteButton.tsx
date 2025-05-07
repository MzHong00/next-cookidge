import type { IFridge } from "@/types/fridge/type";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useDeleteFridgeMutation } from "@/services/fridge/mutations/deleteFridgeMutation";

export const DeleteFridgeButton = ({ id }: { id: IFridge["_id"] }) => {
  const { mutateAsync, isPending } = useDeleteFridgeMutation(id);
  const { openDialogMessage } = useConfirmDialogActions();

  const onClickDeleteFridge = () => {
    if (isPending) return;

    openDialogMessage({
      message: "냉장고를 삭제하시겠습니까?",
      requestFn: async () => {
        await mutateAsync();
      },
    });
  };

  return <button onClick={onClickDeleteFridge}>삭제</button>;
};
