"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";

// 로그인 해야 사용할 수 있는 버튼

export const AuthGuardButton = ({
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData(UserQueries.keys.me);

  const authGuardHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!me) {
      router.push("/login", { scroll: false });
      return;
    }

    onClick?.(e);
  };

  return (
    <button onClick={authGuardHandler} {...props}>
      {children}
    </button>
  );
};
