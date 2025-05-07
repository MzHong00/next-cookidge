"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { USER_QUERY_STRING_KEY } from "@/constants/common";
import { SearchInput } from "@/components/common/search";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { UserCard } from "@/containers/user/userCard/userCard";
import { UserQueries } from "@/services/user/queries/userQueries";
import { useSearchInputFocus } from "@/hooks/useSearchInputFocus";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSearchWithArrowNavigation } from "@/hooks/useSearchWithArrowNavigation";

import styles from "./userSearchForm.module.scss";

export const UserSearchForm = ({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) => {
  const router = useRouter();
  const searchName = useSearchParams().get(USER_QUERY_STRING_KEY) || "";

  // 무한 스크롤
  const {
    isFetching,
    data: users,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(UserQueries.infiniteSearchQuery({ query: searchName }));
  const observerRef = useIntersectionObserver({ hasNextPage, fetchNextPage });

  // 쿼리 문자열 설정 (연관 검색 키보드 컨트롤 가능)
  const itemTotalCount = users?.pages.reduce(
    (prev, page) => prev + page.length,
    0
  );
  const {
    targetRef,
    targetIndex,
    inputValue,
    setInputValue,
    setTargetIndex,
    onArrowKeyDown,
    onChangeSetValue,
  } = useSearchWithArrowNavigation(itemTotalCount, USER_QUERY_STRING_KEY);

  // 검색 결과 UI를 출력할지 결정하는 변수들
  const { ref, isFocus } = useSearchInputFocus();
  const isEmptySearch = !!searchName?.length;
  const hasSearchResult = users?.pages[0] && users?.pages[0].length !== 0;

  // 검색어로 이동하는 핸들러
 const onSubmitNavigateToSearchResult = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  router.push(`/user/${inputValue}`)
 }

  return (
    <form className={`${styles.form} ${className}`} onSubmit={onSubmit || onSubmitNavigateToSearchResult}>
      <SearchInput
        ref={ref}
        value={inputValue}
        name={USER_QUERY_STRING_KEY}
        autoComplete="off"
        placeholder="사용자 이름을 입력하세요."
        onKeyDown={onArrowKeyDown}
        onChange={onChangeSetValue}
      />
      <input type="submit" value="검색" className={styles.submit} />

      <div className={styles.result}>
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
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }),
                      }}
                      className={styles.userItem}
                      onClick={() => {
                        setTargetIndex(i);
                        setInputValue(name);
                      }}
                    >
                      <UserCard name={name} picture={picture} disabled />
                    </li>
                  );
                })
              )}
              <div ref={observerRef} />
            </ul>
          ) : isFetching ? (
            <LoadingSpinner msg="사용자 검색중..." />
          ) : (
            <p className={styles.notHasResult}>
              일치하는 사용자가 존재하지 않습니다.
            </p>
          ))}
      </div>
    </form>
  );
};
