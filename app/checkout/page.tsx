import CartPanel from "@/components/checkout/CartPanel";
import { getTranslations } from "next-intl/server";

export default async function Checkout() {
  const t = await getTranslations("CheckoutPage");

  return (
    <div className="grow px-8 py-4 bg-linear-to-br from-amber-50 to-orange-50">
      <p className=" text-2xl font-semibold text-amber-700">{t("cart")}</p>
      <CartPanel />
    </div>
  );
}
