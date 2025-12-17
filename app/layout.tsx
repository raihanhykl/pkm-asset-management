// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/providers/querty-provider";
import { AuthProvider } from "@/lib/hooks/use-auth";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PKM Asset Management",
  description: "Sistem Manajemen Aset untuk PKM Kampus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            {children}
            <Toaster
            // toastOptions={{ classNames: { description: "text-red-900" } }}
            />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
