import type { IFridge } from "@/types/fridge/type";
import { IngredientCard } from "../ingredientCard/ingredientCard";

import styles from "./ingredientList.module.scss";

export const IngredientList = ({
  stored_ingredients,
}: {
  stored_ingredients: IFridge["stored_ingredients"];
}) => {
  return (
    <ul className={styles.ingredientList}>
      {stored_ingredients.map((ingredient) => (
        <li key={ingredient._id}>
          <IngredientCard {...ingredient} />
        </li>
      ))}
    </ul>
  );
};
