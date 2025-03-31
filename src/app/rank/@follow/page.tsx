"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { Usercard } from "@/containers/user/userCard/userCard";
import { RankQueries } from "@/services/rank/queries/rankQueries";

import styles from "../layout.module.scss";
import { IconBox } from "@/components/common/iconBox";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";

export default function FollowRankPage() {
  const { data: userInfinite } = useSuspenseInfiniteQuery(
    RankQueries.InfiniteFollowerRankQuery()
  );

  return (
    <ul className={styles.rankList}>
      {userInfinite?.pages[0].map((user, i) => {
        const rank =
          (i === 0 && "🥇") || (i === 1 && "🥈") || (i === 2 && "🥉") || i + 1;
        const isRanker = typeof rank !== "number";

        return (
          <li key={user._id} className={styles.rankItem}>
            <div
              className={styles.rankTag}
              style={{
                ...(isRanker && { background: "none", fontSize: "1.25rem" }),
              }}
            >
              {rank}
            </div>
            <Usercard {...user} className={styles.rankUserCard}>
              <IconBox Icon={RiGroupLine} className={styles.rankValue}>
                {user.follower_count}
              </IconBox>
            </Usercard>
          </li>
        );
      })}
    </ul>
  );
}
