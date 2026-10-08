import { redirect } from 'next/navigation';
import { getAdminConfig } from '@/lib/auth/config';
import { getAdminSession } from '@/lib/auth/admin';
import { getAdminLang, translator } from '../i18n';
import { LoginForm } from './LoginForm';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getAdminSession()) redirect('/admin');
  const lang = await getAdminLang();
  const t = translator(lang);
  const { next } = await searchParams;
  const configured = getAdminConfig() !== null;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className={`flex min-h-screen items-center justify-center bg-slate-950 px-4 ${lang === 'ar' ? 'font-arabic' : 'font-latin'}`}>
      <main id="main-content" className="w-full max-w-sm">
        <div className="glass-card rounded-2xl border border-white/[0.08] p-6 sm:p-8">
          <div className="mb-6 space-y-1">
            <div className="font-display text-xs font-bold tracking-widest text-blue-400" translate="no">NOVIXA</div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">{t('دخول لوحة الإدارة', 'Admin sign-in')}</h1>
            <p className="text-sm text-slate-400">{t('للمسؤول فقط.', 'Authorised staff only.')}</p>
          </div>
          {configured ? (
            <LoginForm
              next={next?.startsWith('/admin') ? next : '/admin'}
              labels={{
                email: t('البريد الإلكتروني', 'Email'),
                password: t('كلمة المرور', 'Password'),
                submit: t('دخول', 'Sign in'),
                invalid: t('البريد أو كلمة المرور غير صحيحة.', 'Incorrect email or password.'),
                locked: t('محاولات كثيرة. انتظر ربع ساعة ثم حاول مجدداً.', 'Too many attempts. Wait fifteen minutes and try again.'),
                unconfigured: t('لوحة الإدارة غير مضبوطة على هذا الخادم.', 'The admin is not configured on this server.'),
              }}
            />
          ) : (
            <p role="alert" className="rounded-lg border border-amber-500/30 bg-amber-950/30 px-3 py-2 text-sm text-amber-100">
              {t(
                'لوحة الإدارة غير مضبوطة على هذا الخادم: يلزم ADMIN_EMAIL و ADMIN_PASSWORD_HASH و ADMIN_SESSION_SECRET.',
                'The admin is not configured on this server: ADMIN_EMAIL, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET are required.'
              )}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
