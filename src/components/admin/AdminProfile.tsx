import { useEffect, useState, type FormEvent } from 'react';
import { ChevronUp, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { errorMessage, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { inputCls, labelCls } from '@/components/admin/ui';

type SupabaseUser = {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
};

function parseProfile(user: SupabaseUser | null): { firstName: string; lastName: string; email: string } {
  if (!user) return { firstName: '', lastName: '', email: '' };
  const meta = user.user_metadata ?? {};
  const full =
    typeof meta.full_name === 'string' && meta.full_name
      ? meta.full_name
      : typeof meta.name === 'string' && meta.name
        ? meta.name
        : user.email ?? '';
  const parts = full.trim().split(/\s+/).filter(Boolean);
  const firstName =
    typeof meta.first_name === 'string' && meta.first_name ? meta.first_name : (parts[0] ?? '');
  const lastName =
    typeof meta.last_name === 'string' && meta.last_name
      ? meta.last_name
      : parts.length > 1
        ? parts.slice(1).join(' ')
        : '';
  return { firstName, lastName, email: user.email ?? '' };
}

export default function AdminProfile() {
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' });
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setProfile(parseProfile(data.user));
      setSignedIn(Boolean(data.user));
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setProfile(parseProfile(session?.user ?? null));
      setSignedIn(Boolean(session?.user));
    });
    return () => {
      active = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const displayName = signedIn
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : 'Not signed in';

  const displayEmail = signedIn ? profile.email : 'Sign in to manage content';

  const initials = (() => {
    const a = (profile.firstName.trim().charAt(0) || '').toUpperCase();
    const b = (profile.lastName.trim().charAt(0) || '').toUpperCase();
    if (a && b) return a + b;
    const fromEmail = profile.email.slice(0, 2).toUpperCase();
    return signedIn && fromEmail ? fromEmail : 'AD';
  })();

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
      setOpen(false);
      setSignInError(null);
    } catch (err) {
      setSignInError(errorMessage(err));
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-surface-container-low transition-colors"
      >
        <span className="w-9 h-9 shrink-0 rounded-full bg-secondary text-on-primary flex items-center justify-center font-label-bold text-label-bold uppercase">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-body-sm text-body-sm font-semibold text-on-background truncate">
            {displayName}
          </span>
          <span className="block font-body-sm text-body-sm text-on-surface-variant truncate">
            {displayEmail}
          </span>
        </span>
        <ChevronUp size={16} className={`shrink-0 text-outline transition-transform ${open ? '' : 'rotate-180'}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-40 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_20px_60px_rgba(25,28,30,0.25)] p-4">
            {signedIn ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 shrink-0 rounded-full bg-secondary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm uppercase">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="font-body-md text-body-sm font-bold text-on-background truncate">
                      {displayName}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-label-bold text-label-bold uppercase tracking-wider text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 shrink-0 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-body-md text-body-sm font-bold text-on-background">
                      Signed in as admin
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      You are not logged in yet.
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSignIn} className="mt-4 space-y-3">
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
                  {!isSupabaseConfigured && (
                    <p className="font-body-sm text-body-sm text-outline">
                      Supabase is not configured, so sign-in is unavailable.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={signingIn || !isSupabaseConfigured}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-label-bold text-label-bold uppercase tracking-wider text-on-primary bg-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <LogIn size={16} />
                    {signingIn ? 'Signing in…' : 'Sign in'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}