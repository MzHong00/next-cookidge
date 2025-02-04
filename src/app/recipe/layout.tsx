import { Metadata } from "next";

export const metadata: Metadata = {
  title: "레시피 탐색",
};

const RecipeLayout = ({ children }: { children: React.ReactNode }) => children;

export default RecipeLayout;
