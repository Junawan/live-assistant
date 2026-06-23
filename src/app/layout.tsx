import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/providers/AuthProvider";
import CompanyProvider from "@/providers/CompanyProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Live Assistant",
  description: "AI Live Shopping Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <CompanyProvider>
            {children}
          </CompanyProvider>
        </AuthProvider>
        <Toaster
  position="top-right"
  richColors
/>
      </body>
    </html>
  );
}