import Link from "next/link";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";

import { IUser } from "@/types/user/user";
import { IconBox } from "@/components/common/iconBox";
import { LogoutButton } from "@/components/features/user/logout/logoutButton";

import styles from "./menu.module.scss";

export const Menu = ({
  me,
  commonHandler,
}: {
  me: IUser;
  commonHandler: () => void;
}) => {
  return (
    <ul className={styles.container}>
      <li onClick={commonHandler}>
        <Link href={`/user/${me.name}`}>
          <IconBox Icon={RiUserLine} className={styles.icon}>
            내 정보
          </IconBox>
        </Link>
      </li>

      <li onClick={commonHandler}>
        <LogoutButton className={styles.icon} />
      </li>
    </ul>
  );
};
