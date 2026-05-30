"use client";

import { menuOpenAtom } from "@/lib/atoms/menu-open.atom";
import { messageAtom } from "@/lib/atoms/message.atom";
import { MessageType } from "@/lib/enums/MessageType.enum";
import { trpc } from "@/trpc/client";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ManuFields() {
  const t = useTranslations("HomePage");

  const setOpen = useSetAtom(menuOpenAtom);
  const setMessage = useSetAtom(messageAtom);

  const utils = trpc.useUtils();

  const { data } = trpc.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
  const { mutate } = trpc.auth.logOut.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      utils.cart.getCart.invalidate();
      setMessage({ type: MessageType.SUCCESS, message: "log_out_success" });
    },
    onError: () => {
      setMessage({ type: MessageType.ERROR, message: "log_out_error" });
    },
  });

  function closeMenu() {
    setOpen(false);
  }

  async function logOut() {
    mutate();
    closeMenu();
  }

  return (
    <>
      <a
        onClick={closeMenu}
        href="/"
        className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
      >
        {t("main_page")}
      </a>
      <a
        onClick={closeMenu}
        href="/products"
        className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
      >
        {t("products")}
      </a>
      <a
        onClick={closeMenu}
        href="/about-us"
        className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
      >
        {t("about_us")}
      </a>
      <a
        onClick={closeMenu}
        href="/contact"
        className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
      >
        {t("contact")}
      </a>
      {data ? (
        <button
          onClick={logOut}
          className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
        >
          {t("log_out")}
        </button>
      ) : (
        <a
          href="/log-in"
          className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
        >
          {t("log_in")}
        </a>
      )}
    </>
  );
}
