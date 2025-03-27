import type { CSSProperties } from "react";

import type { IUser } from "@/types/user";
import { PIdToURL } from "@/utils/pidToUrl";
import { Profile } from "@/components/common/profile";

import styles from "./userCard.module.scss";

interface Props extends Partial<IUser> {
  style?: CSSProperties;
  className?: string;
}

export const Usercard = ({
  name = "",
  picture = "",
  introduce,
  style,
  className,
}: Props) => {
  return (
    <div style={style} className={`${className} ${styles.container}`}>
      <section>
        <Profile name={name} picture={PIdToURL(picture)} />
      </section>
      {introduce && (
        <section>
          <p className={styles.introduce}>{introduce}</p>
        </section>
      )}
    </div>
  );
};
