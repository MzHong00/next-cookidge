"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";
import { DEBOUNCE_MS_TIME } from "@/constants/common";
import { IconBox } from "@/components/common/iconBox";
import { SearchInput } from "@/components/common/search";
import { IngredientList } from "../ingredientList/ingredientList";
import { UpdateIngredientForm } from "@/components/features/ingredient/update/updateIngredientForm";
import { IngredientAIGenerationButton } from "@/components/features/ai/ingredientAiGenerationButton";

import styles from "./ingredientContainer.module.scss";

const INGREDIENT_SORT_TYPES = ["카테고리", "유통기한"];

export const IngredientContainer = ({
  _id,
  stored_ingredients,
}: Pick<IFridge, "_id" | "stored_ingredients">) => {
  const [isReadMode, setIsReadMode] = useState<boolean>(true);

  const {
    filterValue,
    sortTypeValue,
    processedIngredients,
    onChangeFilterValue,
    onChangeSortTypeValue,
  } = useFilterAndSortIngredients(stored_ingredients);

  return (
    <div className={styles.ingredientContainer}>
      <section className={styles.ingredientInputSection}>
        <div>
          <IngredientAIGenerationButton id={_id} />
        </div>
        <div className="flex-row">
          <Link href={`/fridge/${_id}/ingredient`} scroll={false}>
            <IconBox Icon={CgAddR} className="main-button">
              재료 추가
            </IconBox>
          </Link>
          <button onClick={() => setIsReadMode((prev) => !prev)}>
            <IconBox Icon={isReadMode ? RiEditBoxLine : RiCloseLine}>
              {isReadMode ? "재료 수정" : "수정 닫기"}
            </IconBox>
          </button>
        </div>
      </section>

      <section className={styles.ingredientFilterSection}>
        <SearchInput value={filterValue} onChange={onChangeFilterValue} />
        <select value={sortTypeValue} onChange={onChangeSortTypeValue}>
          {INGREDIENT_SORT_TYPES.map((value) => (
            <option key={value} value={value}>
              {value} 순
            </option>
          ))}
        </select>
      </section>

      {isReadMode ? (
        <IngredientList stored_ingredients={processedIngredients} />
      ) : (
        <UpdateIngredientForm
          fridge_id={_id}
          stored_ingredients={stored_ingredients}
        />
      )}
    </div>
  );
};

const useFilterAndSortIngredients = (ingredients: IIngredient[]) => {
  const [filterValue, setFilterValue] = useState("");
  const [sortTypeValue, setSortTypeValue] = useState(INGREDIENT_SORT_TYPES[0]);
  const [debouncedFilterValue, setDebouncedFilterValue] = useState("");

  // 디바운스 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterValue(filterValue);
    }, DEBOUNCE_MS_TIME);

    return () => clearTimeout(timer);
  }, [filterValue]);

  // 필터 + 정렬 처리
  const processedIngredients = useMemo(() => {
    if (!ingredients) return [];

    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.includes(debouncedFilterValue)
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortTypeValue === INGREDIENT_SORT_TYPES[0]) {
        return a.category.localeCompare(b.category);
      }
      return a.expired_at.localeCompare(b.expired_at);
    });

    return sorted;
  }, [ingredients, debouncedFilterValue, sortTypeValue]);

  return {
    filterValue,
    sortTypeValue,
    processedIngredients,
    onChangeFilterValue: (e: React.ChangeEvent<HTMLInputElement>) =>
      setFilterValue(e.target.value),
    onChangeSortTypeValue: (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSortTypeValue(e.target.value),
  };
};
