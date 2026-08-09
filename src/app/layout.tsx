import React from 'react';
import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Novixa | Enterprise Software Architecture & Digital Systems',
  description: 'Novixa builds enterprise software systems, POS/KDS hospitality tech, booking engines, and real-time logistics control rooms across the Middle East and GCC.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-arabic selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
