import { Suspense } from "react";

import { UserSearchForm } from "@/components/features/user/search/userSearchForm";

export default function SearchParallelPage() {
  return (
    <section className="flex-column-center">
      <h3>사용자 검색</h3>
      <Suspense>
        <UserSearchForm />
      </Suspense>
    </section>
  );
}
