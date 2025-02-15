import { memo } from "react";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";
import { RiFilter2Fill } from "@react-icons/all-files/ri/RiFilter2Fill";

import { IconBox } from "@/components/common/iconBox";
import { FOOD_CATEGORIES } from "@/constants/recipe";
import { DialogButton } from "@/components/common/dialog";

import styles from "./recipeFilter.module.scss";

export const RecipeFilter = () => {
  return (
    <>
      <DialogButton
        className={styles.optionButton}
        buttonChildren={<IconBox Icon={RiFilter2Fill}>필터</IconBox>}
      >
        안녕하세요
      </DialogButton>
    </>
  );
};

export const RecipeFilterModal = memo(() => {
  //   const { filterParams, onClickSetFilterParams, onClickRemoveFilterParams } =
  //     useFilterRecipeParams();
  //   const {
  //     ref,
  //     isLeftActive,
  //     isRightActive,
  //     onClickMoveRight,
  //     onClickMoveLeft,
  //   } = useSlideAndShowSideButton();

  return (
    <nav className={styles.container}>
      <button
      //    onClick={onClickMoveLeft}
      >
        <IconBox
          Icon={RiArrowLeftSLine}
          className={`${styles.inActiveButton}`}
        />
      </button>

      <ul className={styles.category}>
        <li>
          <IconBox
            // onClick={onClickRemoveFilterParams}
            className={`${"main-button"}`}
          >
            전체
          </IconBox>
        </li>

        {FOOD_CATEGORIES.map((category) => (
          <li key={category.text}>
            <button>
              <IconBox
                // onClick={onClickSetFilterParams}
                data-category={category.text}
                // className={`${
                //   filterParams.includes(category.text) && "main-button"
                // }`}
              >
                {category.emoji} {category.text}
              </IconBox>
            </button>
          </li>
        ))}
      </ul>

      <button>
        <IconBox
          Icon={RiArrowRightSLine}
          className={`${styles.inActiveButton}`}
        />
      </button>
    </nav>
  );
});
