"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IUser } from "@/types/user";
import { Profile } from "@/components/common/profile";
import { UserQueries } from "@/services/user/queries/userQueries";

export const FollowerList = ({ name }: { name: IUser["name"] }) => {
  const { data } = useSuspenseInfiniteQuery(
    UserQueries.followerInfiniteQuery({ name: name })
  );

  return (
    <ul className="flex-column">
      {data.pages.map((page) =>
        page.map((user) => (
          <li key={user._id}>
            <Profile {...user} />
          </li>
        ))
      )}
    </ul>
  );
};
