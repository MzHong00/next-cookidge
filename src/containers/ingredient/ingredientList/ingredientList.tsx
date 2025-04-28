"use client";

import { useEffect, useMemo, useState } from "react";

import { CgAddR } from "@react-icons/all-files/cg/CgAddR";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";

import type { IFridge } from "@/types/fridge/type";
import type { IIngredient } from "@/types/ingredient/ingredient";
import { IconBox } from "@/components/common/iconBox";
import { SearchBox } from "@/components/common/search";
import { IngredientCard } from "../ingredientCard/ingredientCard";

import styles from "./ingredientList.module.scss";

const INGREDIENT_SORT_TYPES = ["카테고리", "유통기한"];

export const IngredientList = ({
  stored_ingredients,
}: {
  stored_ingredients: IFridge["stored_ingredients"];
}) => {
  const [isReadMode, setIsReadMode] = useState<boolean>(true);

  const { filterValue, filterResult, onChangeFilterValue } =
    useFilterIngredients(stored_ingredients);
  const { sortTypeValue, sortResult, onChangesortTypeValue } =
    useSortIngredients(stored_ingredients);

  return (
    <div className={styles.ingredientContainer}>
      <div className={styles.ingredientControls}>
        <IconBox Icon={CgAddR} className="main-button">
          재료 추가
        </IconBox>
        <button onClick={() => setIsReadMode((prev) => !prev)}>
          <IconBox Icon={isReadMode ? RiEditBoxLine : RiCloseLine}>
            {isReadMode ? "재료 수정" : "수정 취소"}
          </IconBox>
        </button>
      </div>
      <div className={styles.ingredientActions}>
        <SearchBox value={filterValue} onChange={onChangeFilterValue} />
        <select value={sortTypeValue} onChange={onChangesortTypeValue}>
          {INGREDIENT_SORT_TYPES.map((value) => (
            <option key={value} value={value}>
              {value} 순
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.ingredientList}>
        {stored_ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientCard {...ingredient} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const useFilterIngredients = (ingredients: IIngredient[]) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterResult, setFilterResult] = useState<IIngredient[]>(
    ingredients || []
  );

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) return;

    const timer = setTimeout(() => {
      const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.includes(filterValue)
      );
      setFilterResult(filteredIngredients);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterValue, ingredients]);

  const onChangeFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return {
    filterValue,
    filterResult,
    onChangeFilterValue,
  };
};

export const useSortIngredients = (ingredients: IIngredient[]) => {
  const [sortTypeValue, setSortTypeValue] = useState<
    (typeof INGREDIENT_SORT_TYPES)[number]
  >(INGREDIENT_SORT_TYPES[0]);

  const sortResult = useMemo(() => {
    if (sortTypeValue === INGREDIENT_SORT_TYPES[0]) {
      return ingredients.sort((a, b) => b.category.localeCompare(a.category));
    }

    return ingredients.sort((a, b) => b.expired_at.localeCompare(a.expired_at));
  }, [ingredients, sortTypeValue]);

  const onChangesortTypeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortTypeValue(e.target.value as (typeof INGREDIENT_SORT_TYPES)[number]);
  };

  return {
    sortTypeValue,
    sortResult,
    onChangesortTypeValue,
  };
};
