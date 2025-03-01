import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const routing = useCallback(
    (params: URLSearchParams) => {
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const setSearchParams = useMemo(
    () => ({
      set: (name: string, value: string) => {
        params.set(name, value);
        routing(params);
      },
      append: (name: string, value: string) => {
        params.append(name, value);
        routing(params);
      },
      delete: (name: string, value?: string) => {
        params.delete(name, value);
        routing(params);
      },
    }),
    [params, routing]
  );

  return [searchParams, setSearchParams] as const;
};
