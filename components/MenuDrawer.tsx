"use client";

import { menuOpenAtom } from "@/lib/atoms/menu-open.atom";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { MdOutlineMenu } from "react-icons/md";
import MenuFields from "@/components/MenuFields";

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
            <MenuFields />
          </div>
        </div>
      )}
    </div>
  );
};
