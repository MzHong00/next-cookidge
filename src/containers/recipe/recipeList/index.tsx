import { RecipeThumbnail } from "@/components/recipe/recipeThumbnail";

import styles from './index.module.scss'

export function RecipeList() {
  return (
    <ul className={styles.container}>
      {Array.from({ length: 9 }).map((_, i) => (
        <li key={i} >
          <RecipeThumbnail index={i} />
        </li>
      ))}
    </ul>
  );
}
