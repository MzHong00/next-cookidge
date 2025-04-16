export default async function UserFollowerLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return (
    <>
      <h2>{decodeURIComponent(name)} 팔로워 목록</h2>
      {children}
    </>
  );
}
