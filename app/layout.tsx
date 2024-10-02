import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MIA SWE Challenge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav
          style={{ zIndex: "9999" }}
          className="fixed flex flex-row items-center px-6 h-16 border border-border inset-x-3 top-3 rounded-xl text-xl font-semibold bg-background shadow"
        >
          Miami Marlins Baseball
        </nav>
        <main
          style={{
            background: "#0078C8",
            height: "100vh",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
          className="pt-24 px-8"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
