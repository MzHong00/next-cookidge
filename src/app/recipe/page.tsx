import { Suspense } from "react";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IRecipeQuery } from "@/types/recipe/recipe";
import { IconBox } from "@/components/common/iconBox";
import { LoadingDots } from "@/components/common/loadingDots";
import { AuthGuardLink } from "@/components/common/authGuardLink";
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
      <AuthGuardLink
        href="/recipe/create"
        className={styles.openFormButton}
        scroll={false}
      >
        <IconBox Icon={RiAddLine}>레시피 생성</IconBox>
      </AuthGuardLink>

      <RecipeQueryBox />
      
      <Suspense
        fallback={
          <LoadingDots
            msg="레시피 목록 가져오는 중..."
            className="abs-center"
          />
        }
      >
        <RecipeList recipeQuery={recipeQuery} />
      </Suspense>
    </>
  );
}
