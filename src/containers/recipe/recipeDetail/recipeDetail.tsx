"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { RecipeQueries } from "@/services/recipe/queries";
import { PIdToURL } from "@/utils/pidToUrl";

interface Props {
  id: string;
  backgroundWithPublicID?: string;
}

export function RecipeDetail({ id, backgroundWithPublicID }: Props) {
  const { data } = useQuery(RecipeQueries.detailQuery(id));

  return (
    <motion.div
      layoutId={`thumbnail${id}`}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
    >
      <Image
        src={PIdToURL(data?.pictures[0] || backgroundWithPublicID || "")}
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
