import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminNavigation } from "./_components/AdminNavigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <AdminNavigation />
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
