"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { GoogleOAuthService } from "@/services/oauth";
import { UserQueries } from "@/services/user/queries/userQueries";
import { LoadingDots } from "@/components/common/loadingDots";

export default function OAuthRedirectPage() {
  const router = useRouter();
  const client =  useQueryClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = async () => {
      const oauthCode = searchParams.get("code") || "";
      await GoogleOAuthService.loginSuccessRedirect(oauthCode);
      client.invalidateQueries({queryKey: UserQueries.keys.me})

      router.replace('/')
    };

    login();
  }, [client, router, searchParams]);

  return (
    <LoadingDots msg="로그인 정보를 불러오는 중..." className="abs-center"/>
  );
}
