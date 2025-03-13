import { BiSort } from "@react-icons/all-files/bi/BiSort";

import { RECIPE_SORT } from "@/constants/recipe";
import useSearchParams from "@/hooks/useSearchParams";
import { IconBox } from "@/components/common/iconBox";
import { Dropdown } from "@/components/common/dropdown";

import styles from "./recipeSort.module.scss";

export const RecipeSort = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <Dropdown buttonComponent={<IconBox Icon={BiSort}>정렬</IconBox>}>
      {RECIPE_SORT.map(({ query, text }) => (
        <button
          key={query}
          className={styles.contentsButton}
          onClick={() => {
            setSearchParams.set("sort", query);
          }}
        >
          {text}
        </button>
      ))}
    </Dropdown>
  );
};
