"use client";

import { useEffect, useState } from "react";

import useSearchParams from "@/hooks/useSearchParams";
import { SearchBox } from "@/components/common/search";

import styles from "./recipeSearch.module.scss";

export const RecipeSearch = () => {
  const { title, setTitleParams } = useSetTitleQuery();

  return (
    <SearchBox
      value={title}
      onChange={setTitleParams}
      className={styles.search}
    />
  );
};

const useSetTitleQuery = () => {
  const [title, setTitle] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("title")) return;

    const timer = setTimeout(() => {
      setSearchParams.set("title", title);
    }, 500);

    return () => clearTimeout(timer);
  }, [title]);

  const setTitleParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setTitle(text);
  };

  return { title, setTitleParams };
};
