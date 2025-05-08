"use client";

import type { IFridge } from "@/types/fridge/type";
import { IconBox } from "@/components/common/iconBox";
import { Profile } from "@/components/common/profile";
import { RiVipCrownFill } from "@react-icons/all-files/ri/RiVipCrownFill";

import styles from "./fridgeSharedMembers.module.scss";

export const FridgeSharedMembers = ({
  owner_id,
  allowed_users,
}: Pick<IFridge, "owner_id" | "allowed_users">) => {
  return (
    <div className={styles.container}>
      <h2>냉장고 공유</h2>
      <ul className={styles.sharedMemberList}>
        {allowed_users?.map(({ _id, name, picture }) => (
          <li key={_id}>
            <Profile name={name} title={name} picture={picture} />
            {owner_id === _id && (
              <IconBox Icon={RiVipCrownFill} className={styles.profileIcon} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
