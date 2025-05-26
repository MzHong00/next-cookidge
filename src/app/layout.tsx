import type { Metadata } from "next";

import Provider from "./provider";
import { Navbar } from "@/components/layout/navbar";
import { Header } from "@/components/layout/header/header";
import { AlertList } from "@/components/common/alert/alertList";
import { ConfirmDialog } from "@/components/common/confirmDialog/confirmDialog";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT}`),
  title: {
    default: "쿠키지 - 레시피 & 냉장고 관리 서비스",
    template: "%s | Cookidge",
  },
  description:
    "AI 기능을 사용하여 식재료 관리를 한번에! 냉장고 관리 앱, 쿠키지에서 스마트한 식생활을 시작하세요.",
  keywords: [
    "쿠키지",
    "Cookidge",
    "레시피 사이트",
    "냉장고 관리 앱",
    "식재료 관리 앱",
  ],
  verification: {
    google: "2-CPSScGx8YCokUPTZT-8xEzjDni6uKjhM0ZdCiD3iI",
    other: {
      "naver-site-verification": "1e6a3603cf1001bdde5eb0bf0b4a0dd871e42eea",
    },
  },
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Script src="https://unpkg.com/react-scan/dist/auto.global.js"></Script> */}
      <body>
        <ConfirmDialog />
        <AlertList />
        <Provider>
          {auth}
          <Header />
          <main style={{ padding: "0.5rem", marginBottom: "5rem" }}>
            {children}
          </main>
          <Navbar />
        </Provider>
      </body>
    </html>
  );
}
