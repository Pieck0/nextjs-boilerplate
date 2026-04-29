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
      <div className="min-w-32 min-h-16 bg-white rounded-xl flex flex-col p-4 gap-8">
        {showModal?.type === ModalType.REMOVE_FROM_CART && (
          <RemoveFromCartContent />
        )}
        <div className="flex justify-evenly">
          <Button className="w-1/4" onClick={closeModal}>
            {t("close")}
          </Button>
          <Button
            className={`w-1/4 ${!showModal?.onSuccess ? "invisible" : ""}`}
            onClick={() => {
              showModal?.onSuccess?.();
              closeModal();
            }}
          >
            {t("confirm")}
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
