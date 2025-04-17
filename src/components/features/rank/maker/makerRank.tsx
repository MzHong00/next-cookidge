"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { RiBook2Line } from "@react-icons/all-files/ri/RiBook2Line";

import { IconBox } from "@/components/common/iconBox";
import { UserCard } from "@/containers/user/userCard/userCard";
import { RankQueries } from "@/services/rank/queries/rankQueries";

import styles from "../follow/followRank.module.scss";

export function MakerRank() {
  const { data: makerInfinite } = useSuspenseInfiniteQuery(
    RankQueries.InfiniteRecipeMakerRankQuery()
  );

  return (
    <ul className={styles.rankList}>
      {makerInfinite.pages[0].map(({ _id, recipe_count, author }, i) => {
        const rank =
          (i === 0 && "🥇") || (i === 1 && "🥈") || (i === 2 && "🥉") || i + 1;
        const isRanker = typeof rank !== "number";

        return (
          <li key={_id} className={styles.rankItem}>
            <div
              className={styles.rankTag}
              style={{
                ...(isRanker && { background: "none", fontSize: "1.25rem" }),
              }}
            >
              {rank}
            </div>
            <UserCard {...author} className={styles.rankUserCard}>
              <IconBox Icon={RiBook2Line} className={styles.rankValue}>
                {recipe_count}
              </IconBox>
            </UserCard>
          </li>
        );
      })}
    </ul>
  );
}
