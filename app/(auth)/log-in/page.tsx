"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Input from "@/components/ui/input";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { trpc } from "@/trpc/client";
import { MessageType } from "@/components/MessageContainer";
import { loginSchema } from "@/lib/trpcInputs/log-in-schema";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const t = useTranslations("LoginPage");
  const router = useRouter();

  const setMessage = useSetAtom(messageAtom);

  const { mutate: log_in, isPending } = trpc.auth.logIn.useMutation({
    onSuccess: () => {
      setMessage({ type: MessageType.SUCCESS, message: "log_in_success" });
      router.push("/");
    },
    onError: (error) => {
      console.log("ERROR: ", error.data, error.message);
      if (error.message === "invalid_credentials")
        setMessage({ type: MessageType.ERROR, message: "invalid_credentials" });
      else setMessage({ type: MessageType.ERROR, message: "log_in_error" });
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    log_in(data);
  };

  return (
    <div className="grow flex items-center justify-center bg-linear-to-br from-amber-50 to-orange-50 py-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-700 mb-2">
            Loop by Family
          </h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              inputProps={{
                ...form.register("email"),
                type: "email",
              }}
              label={t("email")}
              errorMessage={
                form.formState.errors.email &&
                t(`email_${form.formState.errors.email.type}`)
              }
            />
          </div>

          <div>
            <Input
              inputProps={{
                ...form.register("password"),
                type: "password",
              }}
              label={t("password")}
              errorMessage={
                form.formState.errors.password &&
                t(`password_${form.formState.errors.password.type}`)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4  rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                {t("remember_me")}
              </label>
            </div>

            {/* <Link
              href="/forgot-password"
              className="text-sm font-semibold text-amber-600 hover:text-amber-700"
            >
              {t("forgot_password")}
            </Link> */}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-amber-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("log_in")}
          </button>
        </form>

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
