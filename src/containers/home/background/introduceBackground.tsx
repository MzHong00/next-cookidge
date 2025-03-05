"use client";

import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PIdToURL } from "@/utils/pidToUrl";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";

import styles from "./introduceBackground.module.scss";

const MAX_BOTTOM = 500;
const MIN_ANIMATION_DURATION = 10;
const ANIAMTION_DURATION_RANDOM = 100;
const ANIAMTION_DELAY_RANDOM = 10;
const ANIMATION_DELAY_DEFAULT = 20;

export const IntroduceBackground = () => {
  const { data: recipes } = useInfiniteQuery(RecipeQueries.listQuery());

  return (
    <section className={styles.container}>
      {recipes?.pages[0].map(({ _id, pictures }) => (
        <Image
          key={_id}
          src={PIdToURL(pictures[0])}
          alt="bg"
          width={200}
          height={200}
          style={{
            bottom: `${Math.random() * MAX_BOTTOM}px`,
            animationDuration: `${
              MIN_ANIMATION_DURATION + Math.random() * ANIAMTION_DURATION_RANDOM
            }s`,
            animationDelay: `${
              Math.random() * ANIAMTION_DELAY_RANDOM - ANIMATION_DELAY_DEFAULT
            }s`,
          }}
        />
      ))}
    </section>
  );
};
