"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="));
    if (cookie) {
      setCurrentLocale(cookie.split("=")[1]);
    }
  }, []);

  const changeLanguage = (value: string) => {
    const locale = value;
    setCurrentLocale(locale);
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  };

  return (
    <Select value={currentLocale} onValueChange={changeLanguage}>
      <SelectTrigger className="text-gray-700 border-0 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors w-45 min-[1100px]:border min-[1100px]:border-black min-[1100px]:text-black">
        <SelectValue
          className="text-gray-700 min-[1100px]:text-black"
          placeholder="Język"
        />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectItem
            className="text-gray-700 min-[1100px]:text-black"
            value="pl"
          >
            Polski
          </SelectItem>
          <SelectItem
            className="text-gray-700 min-[1100px]:text-black"
            value="en"
          >
            English
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
