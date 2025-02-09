"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IRecipe } from "@/types/recipe";
import { PIdToURL } from "@/utils/pidToUrl";

import styles from "./index.module.scss";

export const RecipeThumbnail = ({
  _id,
  pictures,
}: Pick<IRecipe, "_id" | "pictures">) => {
  return (
    <Link
      href={{
        pathname: `/recipe/${_id}`,
        query: {
          p: pictures[0],
        },
      }}
    >
      <motion.div
        layoutId={`thumbnail${_id}`}
        className={styles.thubmnail}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Image
          src={PIdToURL(pictures[0])}
          alt="Thumbnail"
          width={400}
          height={400}
          // fill
          // sizes="(max-width: 830px) 100vw, (max-width: 1240px) 50vw, (max-width: 1650px) 33vw, 25vw"
        />
      </motion.div>
    </Link>
  );
};
