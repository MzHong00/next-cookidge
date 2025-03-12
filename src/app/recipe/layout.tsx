import { Metadata } from "next";

export const metadata: Metadata = {
  title: "레시피 탐색",
  description: "Cookidge 레시피 둘러보기",
};

export default function RecipeLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
