"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";
import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";

import styles from "./index.module.scss";

interface Props {
  style: CSSProperties;
  className: string;
}

export function Navbar({ style, className }: Partial<Props>) {
  return (
    <nav style={style} className={`${styles.container} ${className}`}>
      <div className={styles.navContainer}>
        <button className={styles.profile}>
          <RiUserLine />
        </button>

        <nav className={styles.nav}>
          <Link href="/">
            <RiHome5Line />
          </Link>
        </nav>
      </div>
    </nav>
  );
}
