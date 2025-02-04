"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function RecipeDetail() {
  const { id } = useParams();

  return (
    <motion.div
      layoutId={`thumbnail${id}`}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
      style={{
        overflow: "hidden",
        borderRadius: "0px",
      }}
    >
      <Image
        src="/noon.jpg"
        alt="Expanded Image"
        width={300}
        height={300}
        priority
        style={{
          width:"100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
}
