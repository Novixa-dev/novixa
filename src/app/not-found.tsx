import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/common/NotFoundContent';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center font-arabic" dir="rtl">
      <NotFoundContent />
    </div>
  );
}
