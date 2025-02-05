"use client";

import Link from "next/link";

import { IconBox } from "@/components/common/iconBox";

import styles from "./fridgeIntroduce.module.scss";

export const FridgeIntroduce = () => {
  return (
    <section className={styles.container}>
      <Link href={`/recipe`}>
        <IconBox>냉장고 이동</IconBox>
      </Link>
    </section>
  );
};
