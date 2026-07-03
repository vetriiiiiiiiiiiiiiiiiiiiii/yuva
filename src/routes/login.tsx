import { FormEvent, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, UserPlus } from "lucide-react";
import { login, registerUser } from "@/components/yuva/auth-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login - YUVA 2026" },
      { name: "description", content: "Login or register for the YUVA 2026 portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    const result = mode === "login" ? login(email, password) : registerUser(name, email, password);

    if (!result.ok || !result.user) {
      setMessage(result.message ?? "Something went wrong.");
      return;
    }

    // Redirect to home; role-based views are handled by components via auth state
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen px-4 pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience for Login */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">YUVA</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Login to your account or register to participate.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(249,115,22,0.15)] relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          <div className="flex rounded-xl border border-white/10 bg-white/[0.04] p-1">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setMessage("");
                }}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-all ${
                  mode === item
                    ? "animated-gradient text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-[color:var(--neon-blue)]"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-[color:var(--neon-blue)]"
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-[color:var(--neon-blue)]"
                placeholder="Password"
                type="password"
              />
            </div>
            {message && (
              <div className="rounded-xl border border-[color:var(--flare-rose)]/30 bg-[color:var(--flare-rose)]/10 px-4 py-3 text-sm text-[color:var(--flare-rose)]">
                {message}
              </div>
            )}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl animated-gradient py-3 text-sm font-semibold text-primary-foreground">
              {mode === "login" ? <LockKeyhole size={16} /> : <UserPlus size={16} />}
              {mode === "login" ? "Login" : "Create Participant Account"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
