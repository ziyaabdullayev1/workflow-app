import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workflow Editor",
  description: "A workflow automation interface similar to n8n",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
