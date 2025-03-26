import GoogleOAuthRedirecrt from "@/components/features/oauth/googleOAuth";

export default async function OAuthRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const code = (await searchParams).code;

  return <GoogleOAuthRedirecrt code={code} />;
}
