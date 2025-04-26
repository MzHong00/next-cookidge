"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { SearchBox } from "@/components/common/search";
import { UserCard } from "@/containers/user/userCard/userCard";
import { UserQueries } from "@/services/user/queries/userQueries";
import { useSearchInputFocus } from "@/hooks/useSearchInputFocus";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import styles from "./userSearch.module.scss";

export const UserSearch = () => {
  // 무한 스크롤
  const searchParams = useSearchParams();
  const {
    data: users,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    UserQueries.infiniteSearchQuery({ query: searchParams.get("name") || "" })
  );
  const observerRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  // 검색 결과 UI 출력 여부
  const { ref, isFocus } = useSearchInputFocus();
  const hasSearchResult = users?.pages[0] && users?.pages[0].length !== 0;

  return (
    <SearchBox
      ref={ref}
      queryStringKey="name"
      placeholder="사용자 이름을 입력하세요."
      className={styles.container}
    >
      {hasSearchResult && isFocus && (
        <ul className="flex-column">
          {users?.pages.map((page) =>
            page.map(({ _id, name, picture }) => (
              <li key={_id}>
                <UserCard name={name} picture={picture} />
              </li>
            ))
          )}
          <div ref={observerRef} />
        </ul>
      )}
    </SearchBox>
  );
};
