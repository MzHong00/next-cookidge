import { Metadata } from "next";

export const metadata: Metadata = {
  title: "레시피",
  description: "Cookidge의 레시피를 둘러보세요.",
};

export default function RecipeLayout({
  createModal,
  children,
}: {
  createModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {createModal}
      {children}
    </>
  );
}
