import Link from "next/link";
import { Suspense } from "react";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IRecipeQuery } from "@/types/recipe/recipe";
import { IconBox } from "@/components/common/iconBox";
import { LoadingDots } from "@/components/common/loadingDots";
import { RecipeList } from "@/components/features/recipe/read/recipeList";
import { RecipeQueryBox } from "@/containers/recipe/recipeQueryBox/RecipeQueryBox";

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

      <RecipeQueryBox className={styles.recipeQueryBox} />

      <Suspense fallback={<LoadingDots msg="레시피 목록 가져오는 중..." />}>
        <RecipeList recipeQuery={recipeQuery} />
      </Suspense>
    </>
  );
}
