import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 이 함수는 내부에서 `await`를 사용하는 경우 `async`로 표시될 수 있습니다
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
    console.log(token);
    
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
}

// 아래 "Matching Paths"를 참조하여 자세히 알아보세요
export const config = {
  matcher: ["/recipe/create"],
};
