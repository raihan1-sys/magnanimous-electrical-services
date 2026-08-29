import Link from "next/link";
import { loginAction } from "../actions";
import { Zap } from "lucide-react";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="admin-shell relative grid min-h-screen place-items-center overflow-hidden p-5">
      <div className="admin-backdrop" aria-hidden />

      <form
        action={loginAction}
        className="admin-card relative z-10 w-full max-w-md p-8"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center border border-blue/40 bg-blue/10 text-blue-bright">
            <Zap size={17} strokeWidth={2.2} />
          </span>
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-off-white transition-colors hover:text-blue-bright"
          >
            Magnanimous <span className="text-blue-bright">Control</span>
          </Link>
        </div>

        <p className="admin-kicker mt-8">ADMIN SIGN IN</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-off-white">
          Restricted area
        </h1>
        <p className="admin-description mt-3">
          Use the admin account created by the database seed.
        </p>

        {error && (
          <p className="mt-4 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <label className="mt-8 block text-sm font-medium text-white/70">
          Email
          <input
            required
            name="email"
            type="email"
            className="admin-input mt-2"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-white/70">
          Password
          <input
            required
            name="password"
            type="password"
            className="admin-input mt-2"
          />
        </label>

        <button type="submit" className="admin-btn admin-btn-lime mt-7 w-full py-3.5">
          Sign in
        </button>
      </form>
    </main>
  );
}
