"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";
import { UserUpdateForm } from "@/components/features/user/update/userUpdateForm";
import { ClientRender } from "@/components/common/clientRender";

export const UserUpdate = () => {
  const { data: me } = useSuspenseQuery(UserQueries.meQuery());

  return <ClientRender>{me && <UserUpdateForm user={me} />}</ClientRender>;
};
