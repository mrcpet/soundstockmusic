import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/auth";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sound Stock Music",
  description: "Project for the course Backend with JavaScript",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
