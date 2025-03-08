"use client";

import { motion } from "motion/react";
import { RiFilter2Fill } from "@react-icons/all-files/ri/RiFilter2Fill";

import { fadeSlide } from "@/lib/framer-motion";
import { FOOD_CATEGORIES } from "@/constants/recipe";
import useSearchParams from "@/hooks/useSearchParams";
import { IconBox } from "@/components/common/iconBox";
import { DialogButton } from "@/components/common/dialog/dialogButton";

import styles from "./recipeFilter.module.scss";

export const RecipeFilter = () => {
  return (
    <DialogButton
      DialogTitle="레시피 필터"
      buttonComponent={<IconBox Icon={RiFilter2Fill}>필터</IconBox>}
    >
      <RecipeFilterContents />
    </DialogButton>
  );
};

export const RecipeFilterContents = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={styles.filterContentsBox}>
      <section>
        <h4 className={styles.sectionTitle}>카테고리</h4>
        <ul className={styles.categoryList}>
          {FOOD_CATEGORIES.map(({ emoji, text }, i) => {
            const isActive = searchParams
              .getAll("categories")
              .find((category) => category === text);

            return (
              <motion.li
                key={text}
                variants={fadeSlide}
                initial="leftSlide"
                animate="visible"
                transition={{ delay: i * 0.1 }}
              >
                <button
                  className={`${isActive && "main-button"}`}
                  onClick={() => {
                    setSearchParams.append("categories", text);
                  }}
                >
                  <IconBox>
                    {emoji} {text}
                  </IconBox>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
