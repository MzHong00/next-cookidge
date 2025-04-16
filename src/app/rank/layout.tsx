import { RiTrophyLine } from "@react-icons/all-files/ri/RiTrophyLine";

import { IconBox } from "@/components/common/iconBox";

import styles from "./layout.module.scss";

export default function RankLayout({
  search,
  follow,
  maker,
}: {
  search: React.ReactNode;
  follow: React.ReactNode;
  maker: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <h2>사용자 탐색</h2>

      <div className={styles.contents}>
        <section>{search}</section>

        <section>
          <div className={styles.rankTitle}>
            <h3>
              <IconBox Icon={RiTrophyLine}>인기킹</IconBox>
            </h3>
            <p>팔로워가 가장 많은 사용자</p>
          </div>
          {follow}
        </section>

        <section>
          <div className={styles.rankTitle}>
            <h3>
              <IconBox Icon={RiTrophyLine}>적극 참여킹</IconBox>
            </h3>
            <p>레시피를 가장 많이 작성한 사용자</p>
          </div>
          {maker}
        </section>
      </div>
    </div>
  );
}
