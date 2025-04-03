import type { CSSProperties } from "react";

import type { IUser } from "@/types/user";
import { Profile } from "@/components/common/profile";

import styles from "./userCard.module.scss";

interface Props extends Partial<IUser> {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UserCard = ({
  name = "",
  picture = "",
  introduce,
  style,
  className,
  children,
  disabled = false,
}: Props) => {
  return (
    <div style={style} className={`${className} ${styles.container}`}>
      <Profile name={name} picture={picture} disabled={disabled} />
      {introduce && <p className={styles.introduce}>{introduce}</p>}
      {children}
    </div>
  );
};
