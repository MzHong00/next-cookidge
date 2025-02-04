"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RecipePage() {
  return (
    <ul>
      {Array.from({ length: 9 }).map((_, i) => (
        <li key={i} >
          <RecipeThumbnail index={i} />
        </li>
      ))}
    </ul>
  );
}

const RecipeThumbnail = ({ index }: { index: number }) => {
  return (
    <Link href={`/recipe/${index}`}>
      <motion.div
        layoutId={`thumbnail${index}`}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        style={{
          width: 150, // 썸네일 크기
        }}
      >
        <Image
          src="/noon.jpg"
          alt="Thumbnail"
          width={300}
          height={300}
          priority
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </Link>
  );
};
