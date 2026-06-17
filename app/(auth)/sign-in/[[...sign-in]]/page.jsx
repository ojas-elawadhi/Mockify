import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Generate role-specific interviews",
  "Record spoken responses",
  "Review ratings and feedback",
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[1fr_560px]">
        <section className="relative hidden overflow-hidden bg-slate-950 lg:block">
          <Image
            src="/SignUpImage.png"
            alt="Interview preparation"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <Link href="/" className="w-fit rounded-md bg-white/95 p-1 shadow-sm">
              <Image src="/mockify.png" width={56} height={56} alt="Mockify" />
            </Link>
            <div className="max-w-lg">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Welcome back
              </p>
              <h1 className="text-4xl font-bold leading-tight">
                Keep your interview practice organized.
              </h1>
              <div className="mt-8 grid gap-3">
                {points.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 className="size-5 text-teal-300" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <Link href="/" className="mx-auto mb-8 flex w-fit justify-center rounded-md bg-white p-1 shadow-sm lg:hidden">
              <Image src="/mockify.png" width={56} height={56} alt="Mockify" />
            </Link>
            <div className="panel bg-card p-4 sm:p-6">
              <SignIn />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
