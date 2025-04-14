import type { Metadata } from "next";

import Provider from "./provider";
import { Navbar } from "@/components/layout/navbar";
import { Header } from "@/components/layout/header/header";
import { AlertList } from "@/components/common/alert/alertList";
import { ConfirmDialog } from "@/components/common/confirmDialog/confirmDialog";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT}`),
  title: "Cookidge",
  description:
    "Cookidge 서비스는 요리 관련 SNS와 냉장고를 관리하는 앱을 동시에 제공하는 서비스입니다.",
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
        {auth}
        <ConfirmDialog />
        <AlertList />
        <Provider>
          <Header />
          <main style={{ padding: "1rem" }}>{children}</main>
          <Navbar />
        </Provider>
      </body>
    </html>
  );
}
