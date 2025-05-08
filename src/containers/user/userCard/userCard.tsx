import type { CSSProperties } from "react";

import type { IUser } from "@/types/user/user";
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
      <div className={styles.title}>
        <Profile name={name} picture={picture} disabled={disabled} />
        {name && (
          <h4 title={name} className={styles.name}>
            {name}
          </h4>
        )}
      </div>
      {introduce && <p className={styles.introduce}>{introduce}</p>}
      {children}
    </div>
  );
};
