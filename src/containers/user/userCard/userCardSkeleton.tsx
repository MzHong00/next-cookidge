import { ProfileSkeleton } from "@/components/common/profile/profileSkeleton";

import styles from "./userCardSkeleton.module.scss";

interface Props {
  count: number;
  name: boolean;
  introduce: boolean;
}

export const UsercardSkeleton = ({
  count = 1,
  name = true,
  introduce = true,
}: Partial<Props>) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.container}>
          <ProfileSkeleton name={name} />
          {introduce && <p className={styles.introduce} />}
        </div>
      ))}
    </>
  );
};
