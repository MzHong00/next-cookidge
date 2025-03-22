"use client"

import { useEffect, useState } from "react";

export const ClientRender = ({ children }: { children: React.ReactNode }) => {
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, [setMount]);

  return mount && children;
};
