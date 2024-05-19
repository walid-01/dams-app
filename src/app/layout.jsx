import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Sayigh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo-sm-bg-white.png" sizes="any" />
      <body className="h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
