"use client";

import { UserQueries } from "@/services/user/queries/userQueries";
import { useQuery } from "@tanstack/react-query";

export const UserDetail = ({ name }: { name: string }) => {
  const { data } = useQuery(UserQueries.userQuery(name));
  console.log(data);

  return <div>이름: {data?.name}</div>;
};
