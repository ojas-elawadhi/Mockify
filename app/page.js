import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Mic2,
  MessageSquareText,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BrainCircuit,
    title: "Role-specific questions",
    text: "Generate a realistic interview set from the role, stack, and experience level you enter.",
  },
  {
    icon: Mic2,
    title: "Recorded answers",
    text: "Practice out loud with microphone capture, webcam preview, and question playback.",
  },
  {
    icon: BarChart3,
    title: "Actionable feedback",
    text: "Review ratings, model answers, your transcript, and focused improvement notes.",
  },
];

const steps = ["Create an interview", "Record your answers", "Review feedback"];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="page-shell flex h-20 items-center justify-between">
          <Link href="/" className="rounded-md bg-white/95 p-1 shadow-sm">
            <Image src="/mockify.png" width={56} height={56} alt="Mockify" priority />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#workflow" className="transition hover:text-white">
              Workflow
            </a>
          </nav>
          <Button asChild className="bg-white text-slate-950 hover:bg-white/90">
            <Link href="/dashboard">
              Get Started
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden bg-slate-950">
        <div className="page-shell relative z-10 grid min-h-screen items-center gap-12 pb-16 pt-32 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
              AI interview practice
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Mockify
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Build realistic mock interviews for your target role, answer out
              loud, and get structured feedback before the real conversation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Start Practicing
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <a href="#features">Explore Features</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-white/12 bg-white/[0.03] p-3 shadow-2xl">
              <div className="rounded-md border border-white/12 bg-slate-900 p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      Current session
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-white">
                      Full Stack Developer
                    </h2>
                  </div>
                  <span className="rounded-md bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
                    Live prep
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md bg-white/[0.06] p-4">
                    <BrainCircuit className="mb-6 size-5 text-sky-300" />
                    <p className="text-2xl font-bold text-white">05</p>
                    <p className="text-sm text-slate-400">Questions</p>
                  </div>
                  <div className="rounded-md bg-white/[0.06] p-4">
                    <Mic2 className="mb-6 size-5 text-teal-300" />
                    <p className="text-2xl font-bold text-white">Voice</p>
                    <p className="text-sm text-slate-400">Recording</p>
                  </div>
                  <div className="rounded-md bg-white/[0.06] p-4">
                    <Star className="mb-6 size-5 text-amber-300" />
                    <p className="text-2xl font-bold text-white">8.4</p>
                    <p className="text-sm text-slate-400">Avg rating</p>
                  </div>
                </div>

                <div className="mt-5 rounded-md border border-white/10 bg-slate-950 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <MessageSquareText className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Tell me about a project where you improved performance.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Practice answering clearly, then review the transcript,
                        model answer, and improvement notes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-teal-300/20 bg-teal-300/10 p-4">
                    <p className="text-sm font-semibold text-teal-200">
                      Feedback focus
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Specificity, structure, and technical clarity.
                    </p>
                  </div>
                  <div className="rounded-md border border-sky-300/20 bg-sky-300/10 p-4">
                    <p className="text-sm font-semibold text-sky-200">
                      Next action
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Record, score, and repeat with a sharper answer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-b border-border bg-background py-20">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="section-eyebrow">What it does</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Practice the way interviews actually happen.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Mockify combines interview generation, spoken answer capture, and
              review tools in one focused workspace.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="panel p-6">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-surface py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-eyebrow">Workflow</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              A simple loop for better answers.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Keep the session short, review every response, and return to the
              dashboard when you are ready to practice another role.
            </p>
          </div>
          <div className="panel p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-md bg-secondary p-4">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">
                      0{index + 1}
                    </span>
                    <CheckCircle2 className="size-5 text-success" />
                  </div>
                  <p className="font-semibold">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-md border border-border bg-background p-4">
              <ShieldCheck className="mt-0.5 size-5 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">
                Dashboard routes are protected with Clerk authentication, so
                each user sees their own interview history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
