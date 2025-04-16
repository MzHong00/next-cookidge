import { Suspense } from "react";

import { LoadingDots } from "@/components/common/loadingDots";
import { ClientRender } from "@/components/common/clientRender";
import { UserUpdate } from "@/containers/user/userUpdate/userUpdate";

export const metadata = {
  title: "프로필 편집",
};

export default async function MeUpdatePage() {
  return (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>프로필 편집</h3>
      <Suspense
        fallback={
          <LoadingDots
            msg="프로필 정보 가져오는 중..."
            className="abs-center"
          />
        }
      >
        <ClientRender>
          <UserUpdate />
        </ClientRender>
      </Suspense>
    </div>
  );
}
