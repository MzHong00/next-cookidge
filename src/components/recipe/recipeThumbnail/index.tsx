"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IRecipe } from "@/types/recipe";
import { PIdToURL } from "@/utils/pidToUrl";

interface Props extends Pick<IRecipe, "_id" | "pictures"> {}

export const RecipeThumbnail = ({ _id, pictures }: Props) => {
  return (
    <Link href={{
      pathname: `/recipe/${_id}`,
      query: {
        p: pictures[0]
      }
    }} >
      <motion.div
        layoutId={`thumbnail${_id}`}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Image
          src={PIdToURL(pictures[0])}
          alt="Thumbnail"
          width={300}
          height={300}
          style={{ width: "100%", objectFit: "cover" }}
        />
      </motion.div>
    </Link>
  );
};
