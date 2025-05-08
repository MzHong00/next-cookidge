"use client";

import { BiSort } from "@react-icons/all-files/bi/BiSort";

import { RECIPE_SORT } from "@/constants/recipe";
import useSearchParams from "@/hooks/useSearchParams";
import { IconBox } from "@/components/common/iconBox";
import { Dropdown } from "@/components/common/dropdown";

import styles from "./recipeSort.module.scss";

export const RecipeSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Dropdown buttonChildren={<IconBox Icon={BiSort}>정렬</IconBox>}>
      {RECIPE_SORT.map(({ query, text }) => {
        const isActive = searchParams.get("sort") === query;

        return (
          <button
            key={query}
            className={`${isActive && styles.activeButton}`}
            onClick={() => {
              setSearchParams.set("sort", query);
            }}
          >
            {text}
          </button>
        );
      })}
    </Dropdown>
  );
};
