import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Desa Karangrejo",
  description: "Website resmi Desa Karangrejo, Kabupaten Blitar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}