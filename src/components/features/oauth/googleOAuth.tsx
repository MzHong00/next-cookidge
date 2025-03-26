"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { GoogleOAuthService } from "@/services/oauth";
import { UserQueries } from "@/services/user/queries/userQueries";
import { LoadingDots } from "@/components/common/loadingDots";

export default function GoogleOAuthRedirecrt({ code }: { code?: string }) {
  const router = useRouter();
  const client = useQueryClient();

  useEffect(() => {
    const login = async () => {
      if (!code) return;
      
      await GoogleOAuthService.loginSuccessRedirect(code);
      client.invalidateQueries({ queryKey: UserQueries.keys.me });

      router.replace("/");
    };

    login();
  }, [code, client, router]);

  return <LoadingDots msg="로그인 정보를 불러오는 중..." className="abs-center" />;
}
