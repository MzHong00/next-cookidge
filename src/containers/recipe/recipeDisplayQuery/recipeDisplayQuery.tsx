"use client";

import { motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import { fadeSlide } from "@/lib/framer-motion";
import { RECIPE_SORT } from "@/constants/recipe";
import useSearchParams from "@/hooks/useSearchParams";

import styles from "./recipeDisplayQuery.module.scss";

export const RecipeDisplayQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={styles.container}>
      <ul>
        {RECIPE_SORT.map(
          ({ query, text }) =>
            searchParams.get("sort") === query && (
              <li key={query} className={styles.sortItem}>
                {text}
              </li>
            )
        )}
      </ul>

      <ul className="flex-row">
        {searchParams.getAll("categories").map((category) => (
          <motion.li
            key={category}
            variants={fadeSlide}
            initial="upSlide"
            animate="visible"
            className={styles.filterItem}
          >
            <button
              onClick={() => {
                setSearchParams.delete("categories", category);
              }}
            >
              {category} <RiCloseLine />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
