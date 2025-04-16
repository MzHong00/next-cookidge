import { UserCardSkeleton } from "@/containers/user/userCard/userCardSkeleton";

import styles from "../layout.module.scss";

const USER_SKELETON_COUNT = 10;

export default function FollowParallerLoading() {
  return (
    <div className={styles.skeletonRankList}>
      <UserCardSkeleton count={USER_SKELETON_COUNT} introduce={false} />
    </div>
  );
}
