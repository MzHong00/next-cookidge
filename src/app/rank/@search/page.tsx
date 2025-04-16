import { Suspense } from "react";

import { UserSearch } from "@/components/features/user/search/userSearch";

export default function SearchParallelPage() {
  return (
    <section className="flex-column-center">
      <h3>사용자 검색</h3>
      <Suspense>
        <UserSearch />
      </Suspense>
    </section>
  );
}
