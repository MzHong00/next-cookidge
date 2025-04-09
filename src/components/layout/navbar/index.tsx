"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";

import { NAV_TYPES } from "@/constants/nav";
import { Menu } from "@/containers/home/menu/menu";
import { Profile } from "@/components/common/profile";
import { DialogButton } from "@/components/common/dialog/dialogButton";
import { UserQueries } from "@/services/user/queries/userQueries";

import styles from "./index.module.scss";

export function Navbar({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  const path = usePathname();
  const { data: me } = useQuery(UserQueries.meQuery());

  return (
    <nav style={style} className={`${styles.container} ${className}`}>
      <div className={styles.profile}>
        {me ? (
          <DialogButton
          DialogTitle="메뉴"
            buttonComponent={<Profile picture={me.picture} disabled />}
          >
            <Menu me={me}/>
          </DialogButton>
        ) : (
          <Link href="/login" scroll={false}>
            <RiUserLine />
          </Link>
        )}
      </div>

      <nav className={styles.nav}>
        {NAV_TYPES.map(({ Icon, href }) => {
          const isActiveTab = path.startsWith(href);
          return (
            <Link key={href} href={href} scroll={false}>
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
