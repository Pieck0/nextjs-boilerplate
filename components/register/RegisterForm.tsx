"use client";

import Input from "@/components/ui/input";
import { registerSchema } from "@/lib/trpcInputs/register-schema";
import { trpc } from "@/trpc/client";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { MessageType } from "@/lib/enums/MessageType.enum";

export default function c() {
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
            t(`repeat_password_${form.formState.errors.repeatPassword.type}`)
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
  );
}
