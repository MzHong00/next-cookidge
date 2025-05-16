"use client";

import type { CSSProperties } from "react";

import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useDeleteUserMutation } from "@/services/user/mutation/deleteUserMutation";

import styles from "./userDeleteButton.module.scss";

export const UserDeleteButton = ({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) => {
  const { mutateAsync, isPending } = useDeleteUserMutation();
  const { openDialogMessage } = useConfirmDialogActions();

  const onClickDeleteUser = () => {
    openDialogMessage({
      message: "정말 회원을 탈퇴하시겠습니까?",
      requestFn: async () => {
        await mutateAsync();
      },
    });
  };

  return (
    <button
      onClick={onClickDeleteUser}
      disabled={isPending}
      style={style}
      className={`${styles.removeButton} ${className}`}
    >
      회원 탈퇴
    </button>
  );
};
