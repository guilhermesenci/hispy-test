import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HiSpy Test",
  description: "hiSpy simple technical test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Header />
          {children}
        </>
      </body>
    </html>
  );
}
