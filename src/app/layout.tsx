// src/app/layout.tsx

import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import Providers from "./providers";
import LayoutWrapper from "@/components/LayoutWrapper"; // Import LayoutWrapper

const hind = Hind({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Aloha Archives",
  description: "Dataset Exploration Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classString = `${hind.className} wrapper`;
  return (
    <html lang="en">
      <body className={classString}>
        <Providers>
          <NavBar />
          <LayoutWrapper>{children}</LayoutWrapper> {/* Use LayoutWrapper here */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
