"use client";

import type { IFridge } from "@/types/fridge/type";
import { UserSearch } from "../../user/search/userSearch";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useShareMemberMutation } from "@/services/fridge/mutations/shareMemberMutation";

import styles from "./shareMemberSettingBox.module.scss";

export const ShareMemberSettingBox = ({
  fridge_id,
  allowed_users,
}: {
  fridge_id: IFridge["_id"];
  allowed_users: IFridge["allowed_users"];
}) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useShareMemberMutation(fridge_id);

  const onClickAddSharedMember = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { user_id, user_name } = e.currentTarget.dataset;

    if (!user_id || isPending) return;

    openDialogMessage({
      message: `${user_name}를 초대하시겠습니까?`,
      requestFn: async () => {
        mutateAsync(user_id);
      },
      option: { backspace: false },
    });
  };

  return <UserSearch className={styles.searchBox} />;
};
