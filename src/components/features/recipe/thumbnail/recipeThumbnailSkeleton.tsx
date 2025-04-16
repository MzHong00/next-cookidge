import styles from "./recipeThumbnailSkeleton.module.scss";

const SKELETON_MIN_HEIGHT = 200;
const SKELETON_MAX_HEIGHT = 350;

export const RecipeThumbnailSkeleton = () => {
  const random =
    Math.floor(Math.random() * (SKELETON_MAX_HEIGHT - SKELETON_MIN_HEIGHT)) +
    SKELETON_MIN_HEIGHT;

  return <div className={styles.container} style={{ height: `${random}px` }} />;
};
