import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useShareMemberMutation } from "@/services/fridge/mutations/shareMemberMutation";
import { IFridge } from "@/types/fridge/type";
import { IUser } from "@/types/user/user";


interface Props {
  fridge_id: IFridge["_id"];
  allowed_users?: Pick<IUser, "_id" | "picture" | "name"> []
}

export const ShareMemberBox = ({ fridge_id }: Props) => {
  const {openDialogMessage} = useConfirmDialogActions();
  const { mutateAsync, isPending } = useShareMemberMutation(fridge_id);

  const onClickAddSharedMember = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const {user_id, user_name} = e.currentTarget.dataset;

    if (!user_id || isPending) return;
    
    openDialogMessage({
      message: `${user_name}를 초대하시겠습니까?`,
      requestFn: async() => {
        mutateAsync(user_id);
      },
      option: { backspace: false }
    })
  };

  return (
    <UserSearchBox
      actionButtonText="초대"
      onClickUserAction={onClickAddSharedMember}
    />
  );
};
