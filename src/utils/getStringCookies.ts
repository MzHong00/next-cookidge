import { cookies } from "next/headers";

export const getCookiesAsString = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};
