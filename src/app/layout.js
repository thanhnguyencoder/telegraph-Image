import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/ReactToastify.min.css';
import 'react-photo-view/dist/react-photo-view.css';
// import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Upload ảnh - Ông Sói",
  description: "Website upload ảnh miễn phí của Ông Sói",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      // <GoogleAnalytics gaId="G-JVKEXR5XSG" />
    </html>
  );
}
