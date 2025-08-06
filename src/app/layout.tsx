import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Album Quiz',
  description: 'Can you guess the album?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#1f1f1f] text-white font-sans">
        {/* Fixed Logo */}
        <Link
          href="https://smiledust.com"
          className="smiledust-font fixed top-4 left-4 z-50 text-pink-500 text-2xl font-bold"
        >
          smiledust
        </Link>

        {children}
      </body>
    </html>
  );
}
