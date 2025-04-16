import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useCustomSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // params의 변화를 감지하지 않도록 useRef 사용
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const routing = useCallback(
    (updatedParams: URLSearchParams) => {
      router.replace(`?${updatedParams.toString()}`, { scroll: false });
    },
    [router]
  );

  const setParam = useCallback(
    (name: string, value: string) => {
      params.set(name, value);
      routing(params);
    },
    [params, routing]
  );

  const appendParam = useCallback(
    (name: string, value: string) => {
      const targetParamValues = params.getAll(name);
      const isDuplicated = targetParamValues.includes(value);

      if (isDuplicated) {
        params.delete(name);
        targetParamValues
          .filter((v) => v !== value)
          .forEach((v) => params.append(name, v));
      } else {
        params.append(name, value);
      }

      routing(params);
    },
    [params, routing]
  );

  const deleteParam = useCallback(
    (name: string, value?: string) => {
      params.delete(name, value);
      routing(params);
    },
    [params, routing]
  );

  // setSearchParams 객체의 레퍼런스를 변경하지 않도록 useMemo 사용
  const setSearchParams = useMemo(
    () => ({
      set: setParam,
      append: appendParam,
      delete: deleteParam,
    }),
    [setParam, appendParam, deleteParam]
  );

  return [searchParams, setSearchParams] as const;
}
