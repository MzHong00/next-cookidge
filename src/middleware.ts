import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { axiosBeApi } from "./services";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}/login`);

  try {
    // access_token이 없거나 만료된 경우 토큰 재발급 절차
    if (!accessToken || isExpired(accessToken)) {
      console.log("만료");

      const res = await axiosBeApi("/auth/issue-token", {
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      // set-cookie 헤더에서 엑세스 토큰 값을 추출
      const newAccessToken = res.headers["set-cookie"]
        ?.toString()
        .match(/access_token=([^;]+)/)?.[1];
        
      if (!newAccessToken)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}/login`);

      if (200 <= res.status && res.status < 300) {
        const resNext = NextResponse.next();
        resNext.cookies.set("access_token", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        return resNext;
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}/login`);
  }
}

// 토큰 만료 여부 확인 함수 (예시)
function isExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() / 1000 > payload.exp;
  } catch {
    return true;
  }
}

export const config = {
  matcher: [
    "/recipe/create",
    "/recipe/:id/update",
    "/me/update",
    "/fridge/:path*",
  ],
};
