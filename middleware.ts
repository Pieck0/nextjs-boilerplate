import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("locale");

  if (!localeCookie) {
    const acceptLanguage = request.headers.get("accept-language");
    const browserLang = acceptLanguage?.split(",")[0].split("-")[0] || "pl";

    const supportedLocales = ["pl", "en"];
    const locale = supportedLocales.includes(browserLang) ? browserLang : "pl";

    const response = NextResponse.next();
    response.cookies.set("locale", locale);

    return response;
  }

  return NextResponse.next();
}
