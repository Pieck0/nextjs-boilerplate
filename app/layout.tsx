import { CartDrawer } from "@/components/CartDrawer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { TRPCProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MessageContainer from "@/components/MessageContainer";
import { MdOutlineMenu } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { MenuDrawer } from "@/components/MenuDrawer";
import Modal from "@/components/Modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loop by Family",
  description: "Sklep z ręcznie robionymi ubrankami dla maluchów",
};

async function Header() {
  const t = await getTranslations("HomePage");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <a className="text-2xl font-bold text-amber-700" href="/">
              Loop by Family
            </a>
          </div>
          <div className="md:block">
            <div className="ml-10 flex space-x-8 items-center">
              <LanguageSwitcher />
              <div className="min-[1100px]:flex space-x-8 items-center hidden">
                <a
                  href="/"
                  className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
                >
                  {t("main_page")}
                </a>
                <a
                  href="/products"
                  className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
                >
                  {t("products")}
                </a>
                <a
                  href="/about-us"
                  className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
                >
                  {t("about_us")}
                </a>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-amber-600 px-4 py-2 text-base font-semibold transition-colors relative group"
                >
                  {t("contact")}
                </a>
              </div>
              <CartDrawer />
              <MenuDrawer className="min-[1100px]:hidden" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

async function Footer() {
  const t = await getTranslations("HomePage");

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">
              Loop by Family
            </h3>
            <p className="text-gray-400 text-sm">{t("footer_description")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("quick_links")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  {t("main_page")}
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  {t("products")}
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  {t("about_us")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: hello@Loop by Family.com</li>
              <li>{t("phone")}: +1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("follow_us")}</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/loopbyfamily/"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                target="_blank"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2026 Loop by Family. {t("footer_rights")}</p>
        </div>
      </div>
    </footer>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCProvider>
          <NextIntlClientProvider>
            <div className="min-h-screen flex flex-col relative">
              <Modal />
              <Header />
              <MessageContainer />
              {children}

              <Footer />
            </div>
          </NextIntlClientProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
