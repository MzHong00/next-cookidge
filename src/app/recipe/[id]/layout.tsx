import { Suspense } from "react";

import { BackButton } from "@/components/common/backButton";
import { LoadingDots } from "@/components/common/loadingDots";

export default function Layout({
  children,
  modal,
  background,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  background: React.ReactNode;
}) {
  return (
    <div className="flex-column">
      {modal}
      {background}
      <nav>
        <BackButton />
      </nav>
      <Suspense fallback={<LoadingDots msg="레시피 가져오는 중..." />}>
        {children}
      </Suspense>
    </div>
  );
}
