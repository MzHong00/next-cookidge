"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import type { IUser } from "@/types/user/user";
import { UserCard } from "@/containers/user/userCard/userCard";
import { UserQueries } from "@/services/user/queries/userQueries";

export const FollowingList = ({ name }: { name: IUser["name"] }) => {
  const { data } = useInfiniteQuery(
    UserQueries.followingInfiniteQuery({ name: name })
  );

  return (
    <ul className="flex-column">
      {data?.pages.map((page) =>
        page.map((user) => (
          <li key={user._id}>
            <UserCard {...user} />
          </li>
        ))
      )}
    </ul>
  );
};
