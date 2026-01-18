import BackgroundMusic from "@/components/screens/BackgroundMusic";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.className} bg-black antialiased select-none`}
      >
        {/* Background music must be inside body */}
        <BackgroundMusic />

        {children}
      </body>
    </html>
  );
}
