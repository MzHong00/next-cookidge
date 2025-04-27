export const metadata = {
  title: "냉장고 목록",
};

export default async function RootLayout({
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
