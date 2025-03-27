"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { Usercard } from "@/containers/user/userCard/userCard";
import { RankQueries } from "@/services/rank/queries/rankQueries";

import styles from "../layout.module.scss";

export default function MakerRankParallelPage() {
  const { data: makerInfinite } = useSuspenseInfiniteQuery(
    RankQueries.InfiniteRecipeMakerRankQuery()
  );

  return (
    <ul className={styles.rankList}>
      {makerInfinite?.pages.map((page) =>
        page.map(({ _id, recipe_count, author }) => (
          <li key={_id}>
            <Usercard {...author} />
          </li>
        ))
      )}
    </ul>
  );
}
