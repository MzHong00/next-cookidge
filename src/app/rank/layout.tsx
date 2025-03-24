export default function RankLayout({
  follow,
  like,
  maker,
}: {
  follow: React.ReactNode;
  like: React.ReactNode;
  maker: React.ReactNode;
}) {
  return (
    <>
      {like}
      {follow}
      {maker}
    </>
  );
}
