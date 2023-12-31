import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./provider";
import ProtectedRoutes from "./components/ProtectedRoutes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM-Williams",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ProtectedRoutes>{children}</ProtectedRoutes>
        </ReduxProvider>
      </body>
    </html>
  );
}
