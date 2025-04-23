"use client";

import { useRouter } from "next/navigation";
import Link, { type LinkProps } from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { UserQueries } from "@/services/user/queries/userQueries";

interface AuthGuardLinkProps extends LinkProps {
  className: string;
  children: React.ReactNode;
}

export const AuthGuardLink = ({
  children,
  className,
  ...props
}: AuthGuardLinkProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData(UserQueries.keys.me);

  const authGuard = () => {
    if (!me) return router.push("/login");
  };

  return me ? (
    <Link {...props} className={className}>
      {children}
    </Link>
  ) : (
    <button onClick={authGuard} className={className}>
      {children}
    </button>
  );
};
