import Link from "next/link";
import { Suspense } from "react";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IconBox } from "@/components/common/iconBox";
import { LoadingDots } from "@/components/common/loadingDots";
import { RecipeList } from "@/components/features/recipe/read/recipeList";
import { RecipeSearchOption } from "@/containers/recipe/recipeSearchOption/recipeSearchOption";

import styles from "./page.module.scss";

export default function RecipePage() {
  return (
    <>
      <Link href="/recipe/create" className={styles.openFormButton}>
        <IconBox Icon={RiAddLine}>레시피 생성</IconBox>
      </Link>
      <RecipeSearchOption />
      <Suspense fallback={<LoadingDots msg="레시피 목록 가져오는 중..." />}>
        <RecipeList />
      </Suspense>
    </>
  );
}
