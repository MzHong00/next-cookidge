import Image from "next/image";

import type { IUser } from "@/types/user";
import { PIdToURL } from "@/utils/pidToUrl";

import styles from './index.module.scss'

const PROFILE_WIDTH = 40;

export const Profile = ({
  _id,
  name,
  picture,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  Partial<Pick<IUser, "_id" | "name" | "picture">>) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {picture && (
        <Image
          src={PIdToURL(picture)}
          alt="프로필"
          width={PROFILE_WIDTH}
          height={PROFILE_WIDTH}
        />
      )}
      {name && <h4>{name}</h4>}
    </div>
  );
};
