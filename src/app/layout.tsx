import type { Metadata } from "next";
import {anu} from '@/utils/fonts';
import "./globals.css";


export const metadata: Metadata = {
  title: "พืชญา | ผู้ช่วยรุกขกร",
  description: "An embedded sys lab project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anu.variable}`}>{children}</body>
    </html>
  );
}
