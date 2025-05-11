import { Suspense } from "react";
import { RiTrophyLine } from "@react-icons/all-files/ri/RiTrophyLine";

import { IconBox } from "@/components/common/iconBox";
import { MakerRank } from "@/components/features/rank/maker/makerRank";
import { FollowRank } from "@/components/features/rank/follow/followRank";
import { UserCardSkeleton } from "@/containers/user/userCard/userCardSkeleton";

import styles from "./page.module.scss";
import { ClientRender } from "@/components/common/clientRender";

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
        <FollowRank />
      </section>

      <section>
        <div className={styles.rankTitle}>
          <h3>
            <IconBox Icon={RiTrophyLine}>적극 참여킹</IconBox>
          </h3>
          <p>레시피를 가장 많이 작성한 사용자</p>
        </div>
        <MakerRank />
      </section>
    </div>
  );
}
