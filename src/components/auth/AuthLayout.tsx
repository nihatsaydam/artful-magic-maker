import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

interface Props {
  mode: "login" | "signup";
}

export default function AuthLayout({ mode }: Props) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to API. For now, just simulate.
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast({
      title: isSignup ? "Account placeholder created" : "Logged in (demo)",
      description: "Hook this form up to your auth API to make it real.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground grid lg:grid-cols-2">
      {/* Left visual panel */}
      <aside className="relative hidden lg:block overflow-hidden border-r border-border">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/70 to-background" />
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative h-full flex flex-col p-12">
          <Link to="/" className="flex items-baseline gap-1 w-fit">
            <span className="text-primary font-bold text-xl tracking-tight">CRUDE</span>
            <span className="text-foreground font-bold text-xl tracking-tight">3D</span>
          </Link>

          <div className="mt-auto max-w-md">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight leading-tight"
            >
              {isSignup
                ? "Start sculpting in seconds."
                : "Welcome back to the studio."}
            </motion.h2>
            <p className="mt-3 text-muted-foreground">
              {isSignup
                ? "Create an account to save your projects, claim free credits and publish to the gallery."
                : "Pick up where you left off — your scenes, layers and credits are right where you left them."}
            </p>

            <figure className="mt-10 rounded-xl border border-border bg-surface-1/70 backdrop-blur p-5">
              <blockquote className="text-sm text-foreground/90 leading-relaxed">
                "We replaced our entire concept-art pipeline with CRUDE 3D. What took two weeks
                now takes an afternoon."
              </blockquote>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                — Mira O., Art Director · Studio Fenrir
              </figcaption>
            </figure>
          </div>
        </div>
      </aside>

      {/* Right form */}
      <section className="relative flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <Link to="/" className="lg:hidden flex items-baseline gap-1">
            <span className="text-primary font-bold tracking-tight">CRUDE</span>
            <span className="font-bold tracking-tight">3D</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignup ? "Create your account" : "Log in to CRUDE 3D"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignup ? (
                <>Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link></>
              ) : (
                <>New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link></>
              )}
            </p>

            {/* Social */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <SocialButton label="Google" />
              <SocialButton label="Apple" />
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {isSignup && (
                <Field label="Full name">
                  <Input
                    required
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11 bg-surface-1 border-border"
                  />
                </Field>
              )}
              <Field label="Email">
                <Input
                  required
                  type="email"
                  placeholder="you@studio.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-11 bg-surface-1 border-border"
                />
              </Field>
              <Field
                label="Password"
                trailing={
                  !isSignup ? (
                    <Link to="#" className="text-xs text-muted-foreground hover:text-primary">
                      Forgot?
                    </Link>
                  ) : null
                }
              >
                <div className="relative">
                  <Input
                    required
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-11 bg-surface-1 border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_22px_hsl(var(--primary)/0.4)]"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSignup ? "Create account" : "Log in"}
              </Button>

              {isSignup && (
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  By creating an account you agree to our{" "}
                  <Link to="#" className="underline hover:text-foreground">Terms</Link> and{" "}
                  <Link to="#" className="underline hover:text-foreground">Privacy Policy</Link>.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children, trailing }: { label: string; children: ReactNode; trailing?: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{label}</Label>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="h-11 rounded-md border border-border bg-surface-1 hover:bg-surface-2 text-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
    >
      <span className="h-4 w-4 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
      Continue with {label}
    </button>
  );
}
