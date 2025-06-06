"use client";

import type { IFridge } from "@/types/fridge/type";
import { UserSearchForm } from "../../user/search/userSearchForm";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { USER_QUERY_STRING_KEY } from "@/constants/common";
import { useShareMemberMutation } from "@/services/fridge/mutations/shareMemberMutation";

import styles from "./inviteShareMemberForm.module.scss";

export const InviteShareMemberForm = ({
  fridge_id,
  allowed_users,
}: {
  fridge_id: IFridge["_id"];
  allowed_users: IFridge["allowed_users"];
}) => {
  const { alertEnqueue } = useAlertActions();
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useShareMemberMutation(fridge_id);

  const onSubmitInviteShareMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 폼 값 검증
    const form = new FormData(e.currentTarget);
    const searchName = form.get(USER_QUERY_STRING_KEY) as string;
    if (isPending || !searchName) return;

    // 이미 공유자인지 확인
    const isAlreadyMember = allowed_users.find(
      ({ name }) => name === searchName
    );
    if (isAlreadyMember)
      return alertEnqueue({
        message: "이미 공유중인 사용자입니다.",
        type: "error",
      });

    // 초대 쿼리 실행
    openDialogMessage({
      message: `${searchName}를 초대하시겠습니까?`,
      requestFn: async () => {
        mutateAsync(searchName);
      },
      option: { backspace: false },
    });
  };

  return (
    <UserSearchForm
      className={styles.form}
      onSubmit={onSubmitInviteShareMember}
    />
  );
};
