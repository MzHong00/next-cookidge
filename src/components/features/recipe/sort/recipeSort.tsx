import { BiSort } from "@react-icons/all-files/bi/BiSort";

import { IconBox } from "@/components/common/iconBox";
import { Dropdown } from "@/components/common/dropdown";

import styles from "./recipeSort.module.scss";

export const RecipeSort = () => {
  return (
    <Dropdown
      className={styles.optionButton}
      buttonChildren={<IconBox Icon={BiSort}>정렬</IconBox>}
    >
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </Dropdown>
  );
};
