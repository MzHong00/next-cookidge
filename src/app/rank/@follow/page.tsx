"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { RankQueries } from "@/services/rank/queries/rankQueries";
import { Usercard } from "@/containers/user/userCard/userCard";

import styles from "../layout.module.scss";

export default function FollowRankPage() {
  const { data: userInfinite } = useSuspenseInfiniteQuery(
    RankQueries.InfiniteFollowerRankQuery()
  );

  return (
    <ul className={styles.rankList}>
      {userInfinite?.pages.map((page) =>
        page.map((user) => (
          <li key={user._id}>
            <Usercard {...user} />
          </li>
        ))
      )}
    </ul>
  );
}
