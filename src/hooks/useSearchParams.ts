import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useCustomSearchParams () {
  const router = useRouter();
  const searchParams = useSearchParams();

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
      const isDulicated = targetParamValues.find((param) => value === param);

      // 중복 값일때, 해당 값 제거
      if (isDulicated) {
        params.delete(name);

        const nonDulicatedParam = targetParamValues.filter((v) => v !== value);
        nonDulicatedParam.forEach((v) => params.append(name, v));
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

  return [
    searchParams,
    { set: setParam, append: appendParam, delete: deleteParam },
  ] as const;
};
