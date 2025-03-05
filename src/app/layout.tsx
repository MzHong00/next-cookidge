import type { Metadata } from "next";

import Provider from "./provider";
import { Header } from "@/components/layout/header/header";
import { Navbar } from "@/components/layout/navbar";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Cookidge",
  description:
    "Cookidge 서비스는 요리 관련 SNS와 냉장고를 관리하는 앱을 동시에 제공하는 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <main>{children}</main>
          <Navbar />
        </Provider>
      </body>
    </html>
  );
}
