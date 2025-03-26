"use client";

import { motion } from "motion/react";

import styles from "./index.module.scss";

export const Underline = () => {
  return <motion.div layoutId="underline" className={styles.underline} />;
};
