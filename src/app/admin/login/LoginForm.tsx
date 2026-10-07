'use client';

import { useActionState } from 'react';
import { login, type LoginState } from '../actions';

export function LoginForm({
  next,
  labels,
}: {
  next: string;
  labels: {
    email: string;
    password: string;
    submit: string;
    invalid: string;
    locked: string;
    unconfigured: string;
  };
}) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, { error: null });

  return (
    <form action={action} className="space-y-4" noValidate>
      <input type="hidden" name="next" value={next} />
      <div className="space-y-1.5">
        <label htmlFor="admin-email" className="block text-sm text-slate-300">{labels.email}</label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          dir="ltr"
          className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-blue-500"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="admin-password" className="block text-sm text-slate-300">{labels.password}</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          dir="ltr"
          className="w-full rounded-lg border border-white/[0.1] bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-blue-500"
        />
      </div>
      {state.error && (
        <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-100">
          {labels[state.error]}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
      >
        {labels.submit}
      </button>
    </form>
  );
}
