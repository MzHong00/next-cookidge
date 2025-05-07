"use client";

import type { IFridge } from "@/types/fridge/type";
import { UserSearch } from "../../user/search/userSearch";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
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
    const searchName = form.get("search") as string;
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
    <form onSubmit={onSubmitInviteShareMember} className={styles.form}>
      <UserSearch className={styles.searchBox} />
      <input type="submit" value="초대" className={styles.inviteSubmit} />
    </form>
  );
};
