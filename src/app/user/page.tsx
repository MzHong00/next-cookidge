import { Metadata } from "next";
import { UserSearch } from "@/components/features/user/search/userSearch";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "사용자 검색",
};

export default function UserSearchPage() {
  return (
    <div className="flex-column-center">
      <h2>사용자 검색</h2>
      <p>찾고싶은 사용자를 검색해보세요.</p>
      <Suspense>
        <UserSearch />
      </Suspense>
    </div>
  );
}
