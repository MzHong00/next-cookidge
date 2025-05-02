import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 이 함수는 내부에서 `await`를 사용하는 경우 `async`로 표시될 수 있습니다
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth`, {
    method: "GET",
    headers: {
      Cookie: `access_token=${token}`,
    },
    cache: "no-store",
  });

  const statusCode = res.status;
  const { message } = await res.json();
  console.log(message);

  if (statusCode !== 200)
    return NextResponse.redirect(new URL("/login", request.url));
}

// 아래 "Matching Paths"를 참조하여 자세히 알아보세요
export const config = {
  matcher: [
    "/recipe/create",
    "/recipe/:id/update",
    "/me/update",
    "/fridge/:path*",
  ],
};
