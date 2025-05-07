export const metadata = {
  title: "냉장고",
};

export default async function RootLayout({
  children,
  ingredientCreateModal,
}: {
  children: React.ReactNode;
  ingredientCreateModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {ingredientCreateModal}
    </>
  );
}
