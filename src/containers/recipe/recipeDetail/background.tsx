"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { PIdToURL } from "@/utils/pidToUrl";

import styles from "./background.module.scss";

const ANIMATE_DURATION = 2;

interface Props {
  id: string;
  pidSrc?: string;
}

export function Background({ id, pidSrc }: Props) {
  return (
    <motion.div
      layoutId={`thumbnail${id}`}
      className={styles.background}
      animate={{
        filter: "blur(10px)",
        transition: { duration: ANIMATE_DURATION },
      }}
    >
      <Image
        src={PIdToURL(pidSrc || "")}
        alt="background"
        fill
        priority
      />
    </motion.div>
  );
}
