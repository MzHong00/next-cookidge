import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";

import styles from "./fridgeSummary.module.scss";

const THRESHOLD = 5;

export const FridgeSummary = ({
  className,
  last_updated,
  stored_ingredients,
}: {
  className?: string;
  last_updated: IFridge["last_updated"];
  stored_ingredients: IIngredient[];
}) => {
  return (
    <div className={`flex-column ${className}`}>
      <div className={styles.summaryGroup}>
        <IngredientTotalCount count={stored_ingredients.length} />
        <IngredientNearExpiry
          threshHold={THRESHOLD}
          ingredients={stored_ingredients}
        />
      </div>

      <FridgdeLastUpdateDate last_updated={last_updated} />
    </div>
  );
};

const FridgdeLastUpdateDate = ({
  last_updated,
}: {
  last_updated: IFridge["last_updated"];
}) => {
  return (
    <p className={styles.lastUpdateDate}>
      최근 수정: {new Date(last_updated).toLocaleString()}
    </p>
  );
};

const IngredientTotalCount = ({ count }: { count: number }) => {
  return (
    <div>
      <h1>{count}</h1>
      <p>총 재료 수</p>
    </div>
  );
};

const IngredientNearExpiry = ({
  ingredients,
  threshHold,
}: {
  threshHold: number;
  ingredients: IIngredient[];
}) => {
  const nearExpiredIngredients = ingredients.filter((ingredient) => {
    const dayMillis = 1000 * 60 * 60 * 24;
    const diffDay =
      (new Date(ingredient.expired_at).getTime() - Date.now()) / dayMillis;

    return diffDay <= threshHold;
  });

  return (
    <div>
      <h1>{nearExpiredIngredients.length}</h1>
      <p>{threshHold}일 이내 유통기한 만료 재료 수</p>
    </div>
  );
};
