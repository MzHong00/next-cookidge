"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

import { IRecipe } from "@/types/recipe";
import { PIdToURL } from "@/utils/pidToUrl";

import styles from "./index.module.scss";

interface Props
  extends Pick<IRecipe, "_id" | "pictures">,
    Partial<ImageProps> {}

export const RecipeThumbnail = ({ _id, pictures, ...props }: Props) => {
  return (
    <Link
      href={{
        pathname: `/recipe/${_id}`,
        query: {
          p: pictures[0],
        },
      }}
      style={{ width: "100%" }}
    >
      <motion.div
        layoutId={`thumbnail${_id}`}
        className={styles.thumbnail}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Image src={PIdToURL(pictures[0])} alt="Thumbnail" {...props} />
      </motion.div>
    </Link>
  );
};
