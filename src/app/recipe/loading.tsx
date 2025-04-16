import { LoadingDots } from "@/components/common/loadingDots";

export default function RecipePageLoading() {
  return (
    <LoadingDots msg="레시피 페이지 가져오는 중..." className="abs-center" />
  );
}
