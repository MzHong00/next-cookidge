"use client";

import { useQuery } from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";
import { UserUpdateForm } from "@/components/features/user/update/userUpdateForm";

export const UserUpdate = () => {
  const { data: me } = useQuery(UserQueries.meQuery());

  if (!me) return;

  return <UserUpdateForm user={me} />;
};
