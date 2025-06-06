"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

import type { IRecipe } from "@/types/recipe/recipe";
import { PIdToURL } from "@/utils/pidToUrl";
import { CurrentDateGap } from "@/utils/currentDateGap";
import { fadeSlide } from "@/lib/framer-motion";
import { IconBox } from "@/components/common/iconBox";
import { LikeButton } from "../like/likeButtton";

import styles from "./recipeThumbnail.module.scss";

interface Props extends Partial<ImageProps> {
  recipe: IRecipe;
}

export const RecipeThumbnail = ({ recipe, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const InfoToggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      layoutId={`thumbnail${recipe._id}`}
      className={styles.thumbnail}
      onClick={InfoToggleHandler}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      {isOpen && <Info {...recipe} />}
      <Image src={PIdToURL(recipe.pictures[0])} alt={recipe.name} {...props} />
    </motion.div>
  );
};

const Info = (props: IRecipe) => {
  const { _id, name, introduction, pictures, created_at, like_members } = props;

  return (
    <motion.div
      className={styles.info}
      variants={fadeSlide}
      initial="hidden"
      animate="visible"
    >
      <header className={styles.infoHeader}>
        <h4>{name}</h4>
        <span>{CurrentDateGap(created_at)}전</span>
      </header>
      <p className={styles.infoDescription}>{introduction}</p>
      <footer
        className={styles.infoActionBar}
        onClick={(e) => e.stopPropagation()}
      >
        <LikeButton recipe_id={_id} likeMembers={like_members} />
        <Link
          href={{
            pathname: `/recipe/${_id}`,
            query: {
              p: pictures[0],
            },
          }}
        >
          <IconBox className="main-button">자세히</IconBox>
        </Link>
      </footer>
    </motion.div>
  );
};
