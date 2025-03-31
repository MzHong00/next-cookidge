"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useInputFocus } from "@/hooks/useInputFocus";
import { Profile } from "@/components/common/profile";
import { SearchBox } from "@/components/common/search";
import { UserQueries } from "@/services/user/queries/userQueries";
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
    UserQueries.InfiniteSearchQuery({ query: searchParams.get("name") || "" })
  );
  const observerRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  // 검색 결과 UI 출력 여부
  const { ref, isFocus } = useInputFocus();
  const hasSearchResult = users?.pages[0] && users?.pages[0].length !== 0;
  
  return (
    <SearchBox ref={ref} className={styles.container} queryStringKey="name">
      {hasSearchResult && isFocus && (
        <ul className="flex-column">
          {users?.pages.map((page) =>
            page.map(({ _id, name, picture }) => (
              <li key={_id}>
                <Profile name={name} picture={picture} />
              </li>
            ))
          )}
          <div ref={observerRef} />
        </ul>
      )}
    </SearchBox>
  );
};
