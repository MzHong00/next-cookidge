import Link from "next/link";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IRecipeQuery } from "@/types/recipe/recipe";
import QueryHydrate from "@/components/common/queryHydrate";
import { IconBox } from "@/components/common/iconBox";
import { RecipeList } from "@/components/features/recipe/read/recipeList";
import { RecipeQueryBox } from "@/containers/recipe/recipeQueryBox/RecipeQueryBox";
import { RecipeQueries } from "@/services/recipe/queries/recipeQueries";

import styles from "./page.module.scss";

export default async function RecipePage({
  searchParams,
}: {
  searchParams: Promise<IRecipeQuery>;
}) {
  const recipeQuery = await searchParams;

  return (
    <>
      <Link
        href="/recipe/create"
        scroll={false}
        prefetch={false}
        className="float-right-side"
      >
        <IconBox Icon={RiAddLine} className={styles.openFormButton}>
          레시피 생성
        </IconBox>
      </Link>

      <RecipeQueryBox />

      <QueryHydrate queryOptions={[RecipeQueries.listQuery(recipeQuery)]}>
        <RecipeList recipeQuery={recipeQuery} />
      </QueryHydrate>
    </>
  );
}
