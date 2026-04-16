"use client";

import { messageAtom } from "@/lib/atoms/message.atom";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
}

export default function MessageContainer() {
  const t = useTranslations();

  const showTimeout = useRef<NodeJS.Timeout | null>(null);

  const [show, setShow] = useState(false);

  const message = useAtomValue(messageAtom);

  useEffect(() => {
    if (message) {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      setShow(true);
      showTimeout.current = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [message]);

  return (
    <div className="fixed py-4 pl-4 mt-16 h-full">
      {message && (
        <div
          className={`p-2 min-w-64 transition-all duration-300 ${show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} rounded-lg bg-linear-to-br ${message?.type === MessageType.SUCCESS ? "from-green-500 to-green-600" : "from-red-500 to-rose-400"}`}
        >
          <p className="text-white font-semibold text-lg">
            {t(message?.message)}
          </p>
        </div>
      )}
    </div>
  );
}
