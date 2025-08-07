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
        <div className="pointer-events-none fixed top-4 left-4 z-50">
  <Link
    href="https://smiledust.com"
    className="smiledust-font pointer-events-auto text-pink-500 text-2xl font-bold"
  >
    smiledust
  </Link>
</div>


        {children}
      </body>
    </html>
  );
}
