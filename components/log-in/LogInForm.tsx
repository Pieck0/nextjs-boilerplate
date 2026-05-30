"use client";

import Input from "@/components/ui/input";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { trpc } from "@/trpc/client";
import { loginSchema } from "@/lib/trpcInputs/log-in-schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { MessageType } from "@/lib/enums/MessageType.enum";

export default function LogInForm() {
  const t = useTranslations("LogInPage");
  const router = useRouter();
  const utils = trpc.useUtils();

  const setMessage = useSetAtom(messageAtom);

  const { mutate: log_in, isPending } = trpc.auth.logIn.useMutation({
    onSuccess: () => {
      utils.cart.getCart.invalidate();
      setMessage({ type: MessageType.SUCCESS, message: "log_in_success" });
      router.push("/");
    },
    onError: (error) => {
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
  );
}
