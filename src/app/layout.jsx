import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Sayigh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
