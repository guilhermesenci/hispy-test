import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import "./globals.css";

import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "HiSpy Test",
  description: "hiSpy simple technical test",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <>
          <Header />
          {children}
        </>
      </body>
    </html>
  );
}
