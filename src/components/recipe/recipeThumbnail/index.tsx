"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const RecipeThumbnail = ({ index }: { index: number }) => {
  return (
    <Link href={`/recipe/${index}`}>
      <motion.div
        layoutId={`thumbnail${index}`}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Image
          src="/noon.jpg"
          alt="Thumbnail"
          width={300}
          height={300}
          priority
          style={{ width: "100%", objectFit: "cover" }}
        />
      </motion.div>
    </Link>
  );
};
