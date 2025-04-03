"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";

import { UserCard } from "../userCard/userCard";
import { UserQueries } from "@/services/user/queries/userQueries";

import styles from "./userDetail.module.scss";

export const UserDetail = ({ name }: { name: string }) => {
  const { data: user } = useSuspenseQuery(UserQueries.userQuery(name));

  return (
    <div>
      <section>
        <UserCard {...user} disabled />
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
