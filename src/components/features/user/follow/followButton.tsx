"use client";

import { HTMLAttributes, useMemo } from "react";
import { RiUserReceived2Line } from "@react-icons/all-files/ri/RiUserReceived2Line";
import { RiUserUnfollowLine } from "@react-icons/all-files/ri/RiUserUnfollowLine";

import type { IUser } from "@/types/user/user";
import { IconBox } from "@/components/common/iconBox";
import { AuthGuardButton } from "@/components/common/authGuardButton";
import { useFollowMutation, useUnfollowMutation } from "@/services/user/mutation/followMutation";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  meId?: IUser["_id"];
  user: IUser;
}

export const FollowButton = ({ meId, user, className, ...props }: Props) => {
  const { mutate: mutateFollow } = useFollowMutation(user._id, user.name);
  const { mutate: mutateUnfollow } = useUnfollowMutation(user._id, user.name);

  const isFollow = useMemo(
    () => user.follower.includes(meId || ""),
    [meId, user.follower]
  );

  if (meId === user._id) return null;

  if (isFollow)
    return (
      <AuthGuardButton
        onClick={() => {
          mutateUnfollow();
        }}
        className={`main-button ${className}`}
        {...props}
      >
        <IconBox Icon={RiUserUnfollowLine}>팔로우 해제</IconBox>
      </AuthGuardButton>
    );

  return (
    <AuthGuardButton
      onClick={() => {
        mutateFollow();
      }}
      className={`main-button ${className}`}
      {...props}
    >
      <IconBox Icon={RiUserReceived2Line }>팔로우 신청</IconBox>
    </AuthGuardButton>
  );
};
