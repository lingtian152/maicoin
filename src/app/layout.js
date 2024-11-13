import localFont from "next/font/local";
import Navbar from './components/navbar';
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar></Navbar>

        {children}
      </body>
    </html>
  );
}
