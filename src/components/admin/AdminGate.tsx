import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Lock, LogIn, ShieldCheck } from 'lucide-react';
import { errorMessage, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { inputCls, labelCls } from '@/components/admin/ui';

export default function AdminGate({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSignedIn(Boolean(data.session));
      setChecking(false);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setSignedIn(Boolean(session));
      setChecking(false);
    });
    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    setSigningIn(true);
    setSignInError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setSignInError(errorMessage(err));
    } finally {
      setSigningIn(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="font-body-md text-body-md text-on-surface-variant">Checking access…</p>
      </div>
    );
  }

  if (signedIn) return <>{children}</>;

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center">
          <span className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
            <Lock size={22} />
          </span>
          <h1 className="mt-4 font-headline-sm text-headline-sm text-on-background">Admin access unavailable</h1>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
            Supabase is not configured. Add your project URL and anon key to the environment before signing in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
        <span className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
          <ShieldCheck size={22} />
        </span>
        <h1 className="mt-4 font-headline-sm text-headline-sm text-on-background">Admin sign in</h1>
        <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          Access is restricted to authorised HLA administrators.
        </p>
        <form onSubmit={handleSignIn} className="mt-6 space-y-3">
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              placeholder="admin@hlaafrica.org"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Password</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputCls}
            />
          </div>
          {signInError && <p className="font-body-sm text-body-sm text-red-700">{signInError}</p>}
          <button
            type="submit"
            disabled={signingIn}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <LogIn size={16} />
            {signingIn ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
