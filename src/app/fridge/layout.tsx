export const metadata = {
  title: "냉장고 목록",
};

export default async function RootLayout({
  children,
  createModal,
}: {
  children: React.ReactNode;
  createModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {createModal}
    </>
  );
}
