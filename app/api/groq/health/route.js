import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      provider: "groq",
      groqKeyConfigured: Boolean(process.env.GROQ_API_KEY),
      commit: process.env.VERCEL_GIT_COMMIT_SHA || "local",
    },
    {
      headers: {
        "x-ai-provider": "groq",
      },
    },
  );
}
