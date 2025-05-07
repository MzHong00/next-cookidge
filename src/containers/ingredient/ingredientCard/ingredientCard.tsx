"use client";

import type { IIngredient } from "@/types/ingredient/ingredient";

import styles from "./ingredientCard.module.scss";

export const IngredientCard = ({
  name,
  category,
  quantity,
  expired_at,
}: IIngredient) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.categoryIcon}>{[...category][0]}</div>
        <h4>{name}</h4>
      </div>
      <span className={styles.quantity}>{quantity}</span>
      <p className={styles.expired_at}>{expired_at}</p>
    </div>
  );
};
