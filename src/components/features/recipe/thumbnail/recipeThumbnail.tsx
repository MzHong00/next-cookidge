"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

import type { IRecipe } from "@/types/recipe/recipe";
import { PIdToURL } from "@/utils/pidToUrl";
import { IconBox } from "@/components/common/iconBox";

import styles from "./recipeThumbnail.module.scss";

interface Props extends Partial<ImageProps> {
  recipe: IRecipe;
}

export const RecipeThumbnail = ({ recipe, ...props }: Props) => {
  return (
    <motion.div
      layoutId={`thumbnail${recipe._id}`}
      className={styles.thumbnail}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <HoverThumbnail {...recipe} />
      <Image src={PIdToURL(recipe.pictures[0])} alt="Thumbnail" {...props} />
    </motion.div>
  );
};

const HoverThumbnail = (props: IRecipe) => {
  const { _id, name, introduction, pictures } = props;

  return (
    <motion.div className={styles.hoverRecipe} whileHover={{ opacity: 1 }}>
      <h4>{name}</h4>
      <p>{introduction}</p>
      <Link
        href={{
          pathname: `/recipe/${_id}`,
          query: {
            p: pictures[0],
          },
        }}
      >
        <IconBox className={styles.recipeLinkButton}>자세히</IconBox>
      </Link>
    </motion.div>
  );
};
