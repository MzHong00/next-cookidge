"use client";

import { useState } from "react";

import type { IFridge } from "@/types/fridge/type";
import type { IUser } from "@/types/user/user";
import { Profile } from "@/components/common/profile";
import { useConfirmDialogActions } from "@/lib/zustand/confirmDialogStore";
import { useUnshareMemberMutation } from "@/services/fridge/mutations/unshareMemberMutation";

import styles from "./unshareMemberBox.module.scss";

interface Props {
  fridge_id: IFridge["_id"];
  allowed_users: IFridge["allowed_users"];
}

export const UnshareMemberBox = ({ fridge_id, allowed_users }: Props) => {
  const [selectedUser, setSelectedUser] = useState<Pick<IUser, "_id" | "name">>(
    { _id: "", name: "" }
  );

  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useUnshareMemberMutation(
    fridge_id,
    selectedUser._id
  );

  const onClickUnshareMember = () => {
    if (!selectedUser.name || isPending) return;

    openDialogMessage({
      message: `${selectedUser.name}와의 냉장고 공유를 그만 하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync();
      },
      option: { backspace: false },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sharedMemberList}>
        {allowed_users.map((user) => (
          <button
            key={user._id}
            title={user.name}
            onClick={(e) => {
              setSelectedUser({ _id: user._id, name: e.currentTarget.title });
            }}
          >
            <Profile
              picture={user.picture}
              className={`${styles.profilePicture} ${
                selectedUser._id === user._id && styles.activeButton
              }`}
              disabled
            />
          </button>
        ))}
      </div>

      <button
        onClick={onClickUnshareMember}
        className={styles.removeButton}
      >
        추방
      </button>
    </div>
  );
};
