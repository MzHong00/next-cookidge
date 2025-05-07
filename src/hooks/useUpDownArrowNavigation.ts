import { useState, useEffect, useRef } from "react";

import useCustomSearchParams from "./useSearchParams";
import { DEBOUNCE_MS_TIME } from "@/constants/common";

const USER_QS_KEY = "name";

// 위, 아래 방향키를 통해 타겟을 변경하는 훅스
export const useUpDownArrowNavigation = (itemTotalCount: number) => {
  const targetRef = useRef<HTMLLIElement>(null);
  const [targetIndex, setTargetIndex] = useState(-1);
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get(USER_QS_KEY) || ""
  );
  const [queryValue, setQueryValue] = useState<string>(
    searchParams.get(USER_QS_KEY) || ""
  );

  // Input 입력에 따른 쿼리 스트링 설정 코어 이펙트 (디바운스)
  useEffect(() => {
    setTargetIndex(-1);
    const timer = setTimeout(() => {
      setSearchParams.set(USER_QS_KEY, queryValue);
    }, DEBOUNCE_MS_TIME);

    return () => clearTimeout(timer);
  }, [queryValue, setSearchParams]);

  // 스크롤 이동 및 값에 타겟 텍스트 문자열 할당
  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement || targetIndex < 0) return;

    targetElement.scrollIntoView({ behavior: "instant", block: "nearest" });
    setInputValue(targetElement.innerText);
  }, [targetIndex]);

  // Input 입력에 따른 Values 변경 리스너
  const onChangeSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQueryValue(value);
    setInputValue(value);
  };

  // 키보드 커서 이동 이벤트 리스너
  const onArrowKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setTargetIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowDown") {
      setTargetIndex((prev) => (prev + 1 < itemTotalCount ? prev + 1 : prev));
    }
  };

  return {
    targetRef,
    targetIndex,
    inputValue,
    setInputValue,
    setQueryValue,
    setTargetIndex,
    onArrowKeyDown,
    onChangeSetValue,
  };
};
