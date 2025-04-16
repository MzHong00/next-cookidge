"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";
import { UserUpdateForm } from "@/components/features/user/update/userUpdateForm";

export const UserUpdate = () => {
  const { data: me } = useSuspenseQuery(UserQueries.meQuery());

  return <>{me && <UserUpdateForm user={me} />}</>;
};
