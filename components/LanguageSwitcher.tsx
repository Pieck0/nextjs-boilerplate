"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
      <SelectTrigger className="w-45 border-black text-black">
        <SelectValue className="text-black" placeholder="Język" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectItem className="text-black" value="pl">Polski</SelectItem>
          <SelectItem className="text-black" value="en">English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
