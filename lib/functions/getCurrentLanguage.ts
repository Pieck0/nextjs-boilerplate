import { cookies } from "next/headers";

export const getCurrentLanguage = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale");

  if (locale?.value) return locale?.value;

  return process.env.DEFAULT_LANG || "pl";
};
