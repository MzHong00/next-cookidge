import { Suspense } from "react";
import { RiTrophyLine } from "@react-icons/all-files/ri/RiTrophyLine";

import { IconBox } from "@/components/common/iconBox";
import { MakerRank } from "@/components/features/rank/maker/makerRank";
import { FollowRank } from "@/components/features/rank/follow/followRank";
import { UserCardSkeleton } from "@/containers/user/userCard/userCardSkeleton";

import styles from "./page.module.scss";

const USER_SKELETON_COUNT = 10;

export default function RankPage() {
  return (
    <div className={styles.page}>
      <section>
        <div className={styles.rankTitle}>
          <h3>
            <IconBox Icon={RiTrophyLine}>인기킹</IconBox>
          </h3>
          <p>팔로워가 가장 많은 사용자</p>
        </div>
        <Suspense
          fallback={
            <div className={styles.skeletonRankList}>
              <UserCardSkeleton count={USER_SKELETON_COUNT} introduce={false} />
            </div>
          }
        >
          <FollowRank />
        </Suspense>
      </section>

      <section>
        <div className={styles.rankTitle}>
          <h3>
            <IconBox Icon={RiTrophyLine}>적극 참여킹</IconBox>
          </h3>
          <p>레시피를 가장 많이 작성한 사용자</p>
        </div>
        <Suspense
          fallback={
            <div className={styles.skeletonRankList}>
              <UserCardSkeleton count={USER_SKELETON_COUNT} introduce={false} />
            </div>
          }
        >
          <MakerRank />
        </Suspense>
      </section>
    </div>
  );
}
