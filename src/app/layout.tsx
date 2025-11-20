import type { Metadata } from "next";
import { Poppins, Montserrat, Orbitron } from 'next/font/google';
import "./globals.css";

// Configure fonts
const poppins = Poppins({ 
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

const montserrat = Montserrat({ 
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const orbitron = Orbitron({ 
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: "30-Day Challenge",
  description: "Transform yourself in 30 days",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} ${orbitron.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}