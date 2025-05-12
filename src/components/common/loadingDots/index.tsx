"use client";

import { motion } from "motion/react";

import styles from "./index.module.scss";

const transition = { duration: 0.7, repeat: Infinity };

export const LoadingDots = ({
  msg,
  className,
}: {
  msg?: string;
  className?: string;
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.loadingDots}>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={transition}
        />
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: 24 }}
          transition={transition}
        />
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: 24 }}
          transition={transition}
        />
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={transition}
        />
      </div>
      {msg && <p className={styles.message}>{msg}</p>}
    </div>
  );
};
