import styles from "./profileSkeleton.module.scss";

export const ProfileSkeleton = ({
  name,
  className,
}: {
  name?: boolean;
  className?: string;
}) => {
  return (
    <div className={`${styles.container} ${className}`} >
      <div className={`${styles.picture} ${className}`} />
      {name && <div className={styles.name} />}
    </div>
  );
};
