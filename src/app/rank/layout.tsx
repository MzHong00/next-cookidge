"use client";

import { Suspense } from "react";
import { RiTrophyLine } from "@react-icons/all-files/ri/RiTrophyLine";

import { IconBox } from "@/components/common/iconBox";
import { UsercardSkeleton } from "@/containers/user/userCard/userCardSkeleton";

import styles from "./layout.module.scss";

const USER_SKELETON_COUNT = 10;

export default function RankLayout({
  follow,
  maker,
}: {
  follow: React.ReactNode;
  maker: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <h2>랭킹</h2>

      <div className={styles.contents}>
        <section>
          <h3>
            <IconBox Icon={RiTrophyLine}>인기킹</IconBox>
          </h3>
          <p>팔로워가 가장 많은 사용자</p>
          <Suspense
            fallback={
              <div className={styles.rankList}>
                <UsercardSkeleton
                  count={USER_SKELETON_COUNT}
                  introduce={false}
                />
              </div>
            }
          >
            {follow}
          </Suspense>
        </section>
        <section>
          <h3>
            <IconBox Icon={RiTrophyLine}>적극 참여킹</IconBox>
          </h3>
          <p>레시피를 가장 많이 작성한 사용자</p>
          <Suspense
            fallback={
              <div className={styles.rankList}>
                <UsercardSkeleton
                  count={USER_SKELETON_COUNT}
                  introduce={false}
                />
              </div>
            }
          >
            {maker}
          </Suspense>
        </section>
      </div>
    </div>
  );
}
