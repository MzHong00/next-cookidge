"use client";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiCompass3Line } from "@react-icons/all-files/ri/RiCompass3Line";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";
import { IconBox } from "@/components/common/iconBox";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";

import styles from "./recipeRecommend.module.scss";

const REIPCE_WIDTH = 400;

export const RecipeRecommend = ({
  fridge_id,
  my_ingredients,
}: {
  fridge_id: IFridge["_id"];
  my_ingredients: IIngredient[];
}) => {
  const { alertEnqueue } = useAlertActions();
  const {
    data: recipes,
    isFetching,
    isRefetching,
    refetch,
  } = useQuery(
    RecipeQueries.recommendQuery({
      fridge_id: fridge_id,
      my_ingredients: my_ingredients?.map((ingredient) => ingredient.name),
    })
  );

  const onClickRecommendRecipe = () => {
    if (my_ingredients?.length === 0) {
      alertEnqueue({
        message: "재료 등록 후 사용해 주세요.",
        type: "error",
      });
    }
    refetch();
  };

  return (
    <div className="dark-section">
      <button onClick={onClickRecommendRecipe} disabled={isFetching}>
        <IconBox Icon={RiCompass3Line} className={styles.recommendButton}>
          레시피 추천
        </IconBox>
      </button>
      <p className={styles.recommendDescription}>
        재료를 추가하고 새로운 레시피를 추천 받으세요.
      </p>

      {isRefetching ? (
        <LoadingSpinner msg="추천 레시피 찾는 중..." />
      ) : (
        <div className={styles.recipeList}>
          {recipes?.map(({ matched_ingredients, ...recipe }) => (
            <Fragment key={recipe._id}>
              <RecipeThumbnail
                recipe={recipe}
                width={REIPCE_WIDTH}
                height={REIPCE_WIDTH}
              />
              <div>
                포함된 재료({matched_ingredients.length}):{" "}
                {matched_ingredients.join(", ")}
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
