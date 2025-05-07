"use client";

import { useEffect, useState } from "react";

import styles from "./recipeThumbnailSkeleton.module.scss";

const SKELETON_MIN_HEIGHT = 200;
const SKELETON_MAX_HEIGHT = 300;

export const RecipeThumbnailSkeleton = () => {
  const [randomHeight, setRandomHeight] = useState<number | null>(null);

  useEffect(() => {
    const random =
      Math.floor(Math.random() * (SKELETON_MAX_HEIGHT - SKELETON_MIN_HEIGHT)) +
      SKELETON_MIN_HEIGHT;
    setRandomHeight(random);
  }, []);

  if (!randomHeight) return null;

  return <div className={styles.container} style={{ height: `${randomHeight}px` }} />;
};
