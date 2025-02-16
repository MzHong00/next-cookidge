"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { IUser } from "@/types/user";
import type { IRecipe } from "@/types/recipe";
import { PIdToURL } from "@/utils/pidToUrl";
import { PictureSlider } from "@/components/common/pictureSlider";

import styles from "./recipeDetail.module.scss";

interface Props {
  recipe: IRecipe & { user: IUser };
  backgroundWithPublicID?: string;
}

export function RecipeDetail({ recipe, backgroundWithPublicID }: Props) {
  const { _id, name, introduction, pictures, user } = recipe;
  const {} = user;
  
  return (
    <motion.div
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
    >
      <motion.div className={styles.overview}>
        <motion.div layoutId={`thumbnail${_id}`}>
          <PictureSlider pictures={pictures} className={styles.pictureSlider} />
        </motion.div>
        <motion.div>
          <h2>{name}</h2>
          <p>{introduction}</p>
        </motion.div>
      </motion.div>

      <div>
        <Image
          src={PIdToURL(pictures[0] || backgroundWithPublicID || "")}
          alt="background"
          fill
          quality={1}
          priority
          className={styles.background}
        />
      </div>
    </motion.div>
  );
}
