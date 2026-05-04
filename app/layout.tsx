import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCProvider } from "@/trpc/client";
import { NextIntlClientProvider } from "next-intl";
import Modal from "@/components/Modal";
import MessageContainer from "@/components/MessageContainer";
import "@/app/globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCProvider>
          <NextIntlClientProvider>
            <div className="min-h-screen flex flex-col relative">
              <Modal />
              <MessageContainer />
              {children}
            </div>
          </NextIntlClientProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
