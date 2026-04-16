"use client";

import { menuOpenAtom } from "@/lib/atoms/menu-open.atom";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { MouseEventHandler } from "react";
import { MdOutlineMenu } from "react-icons/md";

export const MenuDrawer = ({ className }: { className?: string }) => {
  const t = useTranslations("HomePage");

  const [open, setOpen] = useAtom(menuOpenAtom);

  function onMenuClick() {
    setOpen(!open);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className={` ${className}`}>
      <MdOutlineMenu
        onClick={onMenuClick}
        size={24}
        className=" hover:text-amber-600"
      />
      {open && (
        <div className="fixed top-0 left-0 w-full h-full" onClick={closeMenu}>
          <div
            className="shadow-sm z-50 rounded-bl-lg  fixed right-0 mt-16 bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
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
          </div>
        </div>
      )}
    </div>
  );
};
