import LogInForm from "@/components/log-in/LogInForm";
import { trpc } from "@/trpc/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LogIn() {
  const me = await trpc.auth.me();

  if (me) redirect("/");

  const t = await getTranslations("LogInPage");

  return (
    <div className="grow flex items-center justify-center bg-linear-to-br from-amber-50 to-orange-50 py-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-700 mb-2">
            Loop by Family
          </h1>
        </div>

        <LogInForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t("no_account")}{" "}
            <Link
              href="/register"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              {t("sign_up")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
