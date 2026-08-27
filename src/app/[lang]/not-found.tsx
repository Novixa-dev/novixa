import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/common/NotFoundContent';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function LocaleNotFound() {
  return <NotFoundContent />;
}
