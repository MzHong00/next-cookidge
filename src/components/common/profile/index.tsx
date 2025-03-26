import Image from "next/image";

import type { IUser } from "@/types/user";

import styles from './index.module.scss'

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
      {picture && (
        <Image
          src={picture}
          alt="프로필"
          width={PROFILE_WIDTH}
          height={PROFILE_WIDTH}
        />
      )}
      {name && <h4>{name}</h4>}
    </div>
  );
};
