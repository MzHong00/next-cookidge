"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { SearchBox } from "@/components/common/search";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { UserCard } from "@/containers/user/userCard/userCard";
import { UserQueries } from "@/services/user/queries/userQueries";
import { useSearchInputFocus } from "@/hooks/useSearchInputFocus";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useUpDownArrowNavigation } from "@/hooks/useUpDownArrowNavigation";

import styles from "./userSearch.module.scss";

export const UserSearch = ({ className }: { className?: string }) => {
  // 무한 스크롤
  const searchName = useSearchParams().get("name") || "";
  const {
    isFetching,
    data: users,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(UserQueries.infiniteSearchQuery({ query: searchName }));
  const observerRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  // 검색 결과 UI 출력 여부
  const { ref, isFocus } = useSearchInputFocus();
  const hasSearchResult = users?.pages[0] && users?.pages[0].length !== 0;
  const isEmptySearch = !!searchName?.length;

  const itemTotalCount =
    users?.pages.reduce((prev, page) => prev + page.length, 0) || 0;

  const {
    targetRef,
    targetIndex,
    inputValue,
    onArrowKeyDown,
    onChangeSetValue,
  } = useUpDownArrowNavigation(itemTotalCount);

  return (
    <SearchBox
      ref={ref}
      value={inputValue}
      placeholder="사용자 이름을 입력하세요."
      className={`${className} ${styles.container}`}
      onKeyDown={onArrowKeyDown}
      onChange={onChangeSetValue}
    >
      {isFocus &&
        isEmptySearch &&
        (hasSearchResult ? (
          <ul className={styles.userList}>
            {users?.pages.map((page) =>
              page.map(({ _id, name, picture }, i) => {
                const isFocus = targetIndex === i;

                return (
                  <li
                    key={_id}
                    ref={isFocus ? targetRef : undefined}
                    style={{
                      ...(isFocus && {
                        backgroundColor: "rgba(var(--color-dark), 0.5)",
                      }),
                    }}
                  >
                    <UserCard name={name} picture={picture} />
                  </li>
                );
              })
            )}
            <div ref={observerRef} />
          </ul>
        ) : isFetching ? (
          <LoadingSpinner msg="사용자 검색중..." />
        ) : (
          <p style={{ padding: "var(--base-padding)" }}>
            일치하는 사용자가 존재하지 않습니다.
          </p>
        ))}
    </SearchBox>
  );
};
