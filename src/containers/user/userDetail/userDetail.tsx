"use client";

import Link from "next/link";
import { useSuspenseQueries } from "@tanstack/react-query";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";

import { UserCard } from "../userCard/userCard";
import { IconBox } from "@/components/common/iconBox";
import { ClientRender } from "@/components/common/clientRender";
import { UserQueries } from "@/services/user/queries/userQueries";
import { FollowButton } from "@/components/features/user/follow/followButton";

import styles from "./userDetail.module.scss";

export const UserDetail = ({ name }: { name: string }) => {
  const [userQuery, meQuery] = useSuspenseQueries({
    queries: [UserQueries.userQuery(name), UserQueries.meQuery()],
  });

  const me = meQuery.data;
  const user = userQuery.data;

  return (
    <div className={styles.container}>
      <section>
        <UserCard {...user} disabled />
      </section>

      <section className={styles.actionSection}>
        <ClientRender>
          <FollowButton meId={me?._id} user={user} />
          {me?._id === user._id && <ProfileUpdateLink />}
        </ClientRender>
      </section>

      <section className={styles.followSection}>
        <div>
          <h4>
            <Link href={`/user/${user.name}/following`}>팔로잉</Link>
          </h4>
          <p>{user.following.length}</p>
        </div>
        <div>
          <h4>
            <Link href={`/user/${user.name}/follower`}>팔로워</Link>
          </h4>
          <p>{user.follower.length}</p>
        </div>
      </section>
    </div>
  );
};

const ProfileUpdateLink = () => {
  return (
    <Link href={`/me/update`} className="main-button">
      <IconBox Icon={RiUserSettingsLine}>프로필 편집</IconBox>
    </Link>
  );
};
