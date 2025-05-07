import { useState, useEffect } from "react";

import useCustomSearchParams from "./useSearchParams";
import { DEBOUNCE_MS_TIME } from "@/constants/common";

// onChange를 통해 URL 쿼리 문자열을 설정하는 훅스
export const useSetQueryStringByInput = (queryString: string = "title") => {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [value, setValue] = useState<string>(
    searchParams.get(queryString) || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams.set(queryString, value);
    }, DEBOUNCE_MS_TIME);

    return () => clearTimeout(timer);
  }, [value, queryString, setSearchParams]);

  const onChangeSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return { value, onChangeSetValue };
};
