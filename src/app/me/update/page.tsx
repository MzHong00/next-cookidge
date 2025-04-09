import { Suspense } from "react";

import { LoadingDots } from "@/components/common/loadingDots";
import { UserUpdate } from "@/containers/user/userUpdate/userUpdate";

export default async function MeUpdatePage() {
  return (
    <Suspense
      fallback={
        <LoadingDots msg="프로필 정보 가져오는 중..." className="abs-center" />
      }
    >
      <h3 style={{ marginBottom: "2rem" }}>프로필 편집</h3>
      <UserUpdate />
    </Suspense>
  );
}
