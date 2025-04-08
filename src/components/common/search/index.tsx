"use client";

import {
  type ForwardedRef,
  type InputHTMLAttributes,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "../iconBox";
import useSearchParams from "@/hooks/useSearchParams";

import styles from "./index.module.scss";

const DEBOUNCE_MS_TIME = 500;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  queryStringKey?: string;
}

const SearchBoxComponent = (
  { queryStringKey, style, children, className, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { query, setQueryParamsHandler } = useSearchQuery(queryStringKey);

  return (
    <div style={style} className={`${styles.container} ${className}`}>
      <IconBox Icon={RiSearchLine} className={styles.icon} />
      <input
        ref={ref}
        type="search"
        value={query}
        onChange={setQueryParamsHandler}
        {...props}
      />
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export const SearchBox = forwardRef<HTMLInputElement, Partial<Props>>(
  SearchBoxComponent
);

// onChange를 통해 URL 쿼리 문자열을 설정하는 훅스
const useSearchQuery = (queryString: string = "title") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(
    searchParams.get(queryString) || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams.set(queryString, query);
    }, DEBOUNCE_MS_TIME);

    return () => clearTimeout(timer);
  }, [query, queryString, setSearchParams]);

  const setQueryParamsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setQuery(text);
  };

  return { query, setQueryParamsHandler };
};
