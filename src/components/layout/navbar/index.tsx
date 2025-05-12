"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";

import { NAV_TYPES } from "@/constants/nav";
import { Menu } from "@/containers/home/menu/menu";
import { Profile } from "@/components/common/profile";
import { DialogCSR } from "@/components/common/dialog/dialogCSR";
import { UserQueries } from "@/services/user/queries/userQueries";

import styles from "./index.module.scss";

export function Navbar() {
  const path = usePathname();
  const { data: me } = useQuery(UserQueries.meQuery());

  return (
    <nav className={styles.container}>
      <div className={styles.profile}>
        {me ? (
          <DialogCSR
            title="메뉴"
            style={{ maxWidth: "300px" }}
            buttonComponent={<Profile picture={me.picture} disabled />}
          >
            <Menu me={me} />
          </DialogCSR>
        ) : (
          <Link href="/login" scroll={false}>
            <RiUserLine />
          </Link>
        )}
      </div>

      <nav className={styles.nav}>
        {NAV_TYPES.map(({ Icon, href, text }) => {
          const isActiveTab = path.startsWith(href);

          return (
            <Link key={href} href={href} title={text} scroll={false}>
              <Icon
                style={{
                  ...(isActiveTab && {
                    color: "white",
                    transitionDelay: "0.2s",
                  }),
                }}
              />
              {isActiveTab && (
                <motion.div layoutId="nav" className={styles.tab} />
              )}
            </Link>
          );
        })}
      </nav>
    </nav>
  );
}
