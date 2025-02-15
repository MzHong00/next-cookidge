import type { Metadata } from "next";

import Provider from "./provider";
import { Header } from "@/containers/header/header";
import { Navbar } from "@/components/navbar";

import "@/styles/globals.css";
import styles from './layout.module.scss';

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
          <Header className={styles.header}/>
          <main>{children}</main>
          <Navbar className={styles.navbar}/>
        </Provider>
      </body>
    </html>
  );
}
