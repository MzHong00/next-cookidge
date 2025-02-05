"use client";

import Link from "next/link";

import { IconBox } from "@/components/common/iconBox";

import styles from "./recipeIntroduce.module.scss";

export const RecipeIntroduce = () => {
  return (
    <section className={styles.container}>
      <Link href={`/recipe`}>
        <IconBox>레시피이동</IconBox>
      </Link>
    </section>
  );
};
