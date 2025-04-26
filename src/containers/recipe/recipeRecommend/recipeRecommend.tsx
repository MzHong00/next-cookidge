import { useQuery } from "@tanstack/react-query";
import { RiCompass3Line } from "@react-icons/all-files/ri/RiCompass3Line";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";
import { IconBox } from "@/components/common/iconBox";
import { RecipeThumbnail } from "@/components/features/recipe/thumbnail/recipeThumbnail";
import { RecipeThumbnailSkeleton } from "@/components/features/recipe/thumbnail/recipeThumbnailSkeleton";
import { useAlertActions } from "@/lib/zustand/alertStore";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";

import styles from "./recipeRecommend.module.scss";

const SKELETON_COUNT = 4;

export const RecipeRecommend = ({
  fridge_id,
  my_ingredients,
  ...props
}: {
  fridge_id: IFridge["_id"];
  my_ingredients: IIngredient[];
}) => {
  const { alertEnqueue } = useAlertActions();
  const {
    data: recipes,
    isFetching,
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
    <div>
      <button onClick={onClickRecommendRecipe} disabled={isFetching}>
        <IconBox Icon={RiCompass3Line} className={styles.recommendButton}>
          레시피 추천
        </IconBox>
      </button>
      <div className={styles.recipeList}>
        {isFetching
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <RecipeThumbnailSkeleton key={i} />
            ))
          : recipes?.map(({ matched_ingredients, ...recipe }) => (
              <div key={recipe._id}>
                <div>
                  포함된 재료({matched_ingredients.length}):{" "}
                  {matched_ingredients.join(", ")}
                </div>
                <RecipeThumbnail recipe={recipe} />
              </div>
            ))}
      </div>
    </div>
  );
};
