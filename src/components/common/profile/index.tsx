import Link from "next/link";
import Image from "next/image";

import type { IUser } from "@/types/user";

import styles from "./index.module.scss";

const PROFILE_WIDTH = 40;

export const Profile = ({
  name,
  picture,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  Partial<Pick<IUser, "name" | "picture">>) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <Link href={`/user/${name}`} style={{ display: "flex" }}>
        {picture && (
          <Image
            src={picture}
            alt={name || "프로필"}
            width={PROFILE_WIDTH}
            height={PROFILE_WIDTH}
            className={styles.profileImage}
          />
        )}
      </Link>
      {name && <h4 title={name} className={styles.name}>{name}</h4>}
    </div>
  );
};
