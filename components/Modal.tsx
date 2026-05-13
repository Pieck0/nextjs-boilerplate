"use client";

import { showModalAtom } from "@/lib/atoms/show-modal";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { useTranslations } from "next-intl";
import { ModalType } from "@/lib/enums/ModalType.enum";

export default function Modal() {
  const t = useTranslations();

  const [showModal, setShowModal] = useAtom(showModalAtom);

  function closeModal() {
    setShowModal(null);
  }

  return (
    <div
      className={`${showModal ? "fixed" : "hidden"} fixed bg-black/30 w-full h-full flex z-100 items-center justify-center`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="min-w-32 min-h-16 max-w-3/4 bg-white rounded-xl flex flex-col p-4 gap-8">
        {showModal?.type === ModalType.REMOVE_FROM_CART && (
          <RemoveFromCartContent />
        )}
        {showModal?.type === ModalType.SHOP_IN_PROGRESS && (
          <ShopInProgressContent />
        )}
        <div className="flex justify-evenly">
          <Button
            className={`w-1/4 ${!showModal?.onSuccess ? "hidden" : ""}`}
            onClick={() => {
              showModal?.onSuccess?.();
              closeModal();
            }}
          >
            {t("confirm")}
          </Button>
          <Button className="w-1/4" onClick={closeModal}>
            {t("close")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function RemoveFromCartContent() {
  const t = useTranslations("CheckoutPage");

  return <p className="text-lg">{t("modal_content_remove_cart_item")}</p>;
}

function ShopInProgressContent() {
  const t = useTranslations("CheckoutPage");

  return (
    <div>
      <p className="text-lg">{t("shop_in_progress")}</p>
      <p className="flex text-lg">
        {t("shop_in_progress_text")}
        &nbsp;
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          className="text-lg text-amber-600 hover:text-amber-700"
        >
          {process.env.NEXT_PUBLIC_EMAIL}
        </a>
        &nbsp;
        {t("or_phone")}
        &nbsp;
        <a
          href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
          className="text-lg text-amber-600 hover:text-amber-700"
        >
          {process.env.NEXT_PUBLIC_PHONE}
        </a>
        .
      </p>
    </div>
  );
}
