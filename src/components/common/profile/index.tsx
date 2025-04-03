import Link from "next/link";
import Image from "next/image";

import type { IUser } from "@/types/user";
import { PIdToURL } from "@/utils/pidToUrl";

import styles from "./index.module.scss";

const PROFILE_WIDTH = 40;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name?: IUser["name"];
  picture: IUser["picture"];
  disabled?: boolean;
}

export const Profile = ({
  name,
  picture,
  className,
  disabled = false,
  ...props
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {disabled ? (
        <Image
          src={PIdToURL(picture)}
          alt={name || "프로필"}
          width={PROFILE_WIDTH}
          height={PROFILE_WIDTH}
          className={styles.profileImage}
        />
      ) : (
        <Link href={`/user/${name}`} style={{ display: "flex" }}>
          <Image
            src={PIdToURL(picture)}
            alt={name || "프로필"}
            width={PROFILE_WIDTH}
            height={PROFILE_WIDTH}
            className={styles.profileImage}
          />
        </Link>
      )}
      {name && (
        <h4 title={name} className={styles.name}>
          {name}
        </h4>
      )}
    </div>
  );
};
