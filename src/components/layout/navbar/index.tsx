"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";

import { PIdToURL } from "@/utils/pidToUrl";
import { NAV_TYPES } from "@/constants/nav";
import { Profile } from "@/components/common/profile";
import { DialogButton } from "@/components/common/dialog/dialogButton";
import { UserQueries } from "@/services/user/queries/userQueries";

import styles from "./index.module.scss";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { fadeSlide } from "@/lib/framer-motion";

interface Props {
  style: CSSProperties;
  className: string;
}

export function Navbar({ style, className }: Partial<Props>) {
  const path = usePathname();
  const { data: user } = useQuery(UserQueries.meQuery());

  return (
    <nav style={style} className={`${styles.container} ${className}`}>
      <div className={styles.profile}>
        {user ? (
          <DialogButton
            buttonComponent={<Profile picture={PIdToURL(user.picture)} />}
          >
            <Link href="/user">내 정보</Link>
          </DialogButton>
        ) : (
          <Link href="/login" scroll={false}>
            <RiUserLine />
          </Link>
        )}
      </div>

      <nav className={styles.nav}>
        {NAV_TYPES.map(({ Icon, href }) => (
          <Link key={href} href={href} scroll={false}>
            <Icon />
            {path.startsWith(href) && (
              <motion.div layoutId="nav" className={styles.tab} />
            )}
          </Link>
        ))}
      </nav>
    </nav>
  );
}
