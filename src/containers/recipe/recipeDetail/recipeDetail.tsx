"use client"

import Image from "next/image";
import { motion } from "framer-motion";

import type { IRecipe } from "@/types/recipe";
import { PIdToURL } from "@/utils/pidToUrl";

interface Props {
  recipe: IRecipe;
  backgroundWithPublicID?: string;
}

export function RecipeDetail({ recipe, backgroundWithPublicID }: Props) {
  const { _id, pictures } = recipe;

  return (
    <motion.div
      layoutId={`thumbnail${_id}`}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
    >
      <Image
        src={PIdToURL(pictures[0] || backgroundWithPublicID || "")}
        alt="Expanded Image"
        width={300}
        height={300}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
}
