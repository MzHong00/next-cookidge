import type { CSSProperties } from "react";

import type { IUser } from "@/types/user";
import { Profile } from "@/components/common/profile";

import styles from "./userCard.module.scss";

interface Props extends Partial<IUser> {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const Usercard = ({
  name = "",
  picture = "",
  introduce,
  style,
  className,
  children,
}: Props) => {
  return (
    <div style={style} className={`${className} ${styles.container}`}>
      <Profile name={name} picture={picture} />
      {introduce && <p className={styles.introduce}>{introduce}</p>}
      {children}
    </div>
  );
};
