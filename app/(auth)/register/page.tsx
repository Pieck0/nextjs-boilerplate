"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Input from "@/components/ui/input";
import { registerSchema } from "@/lib/trpcInputs/register-schema";
import { trpc } from "@/trpc/client";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { MessageType } from "@/components/MessageContainer";
import { useRouter } from "next/navigation";

export default function Register() {
  const t = useTranslations("RegisterPage");
  const router = useRouter();

  const setMessage = useSetAtom(messageAtom);

  const { mutate: register, isPending } = trpc.auth.register.useMutation({
    onSuccess: () => {
      setMessage({ type: MessageType.SUCCESS, message: "register_success" });
      router.push("/log-in");
    },
    onError: (error) => {
      console.log("ERROR: ", error);
      setMessage({ type: MessageType.ERROR, message: "register_error" });
    },
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    register(data);
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

          <div>
            <Input
              inputProps={{
                ...form.register("repeatPassword"),
                type: "password",
              }}
              label={t("repeat_password")}
              errorMessage={
                form.formState.errors.repeatPassword &&
                t(
                  `repeat_password_${form.formState.errors.repeatPassword.type}`,
                )
              }
            />
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-amber-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("register")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t("already_have_account")}{" "}
            <Link
              href="/log-in"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              {t("log_in")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
