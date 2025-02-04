"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";

import styles from "./index.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>
    </header>
  );
};
