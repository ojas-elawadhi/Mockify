import { NextResponse } from "next/server";
import { transcribeWithGroq } from "@/utils/groq";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!audio) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 },
      );
    }

    const text = await transcribeWithGroq(audio);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Groq transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 },
    );
  }
}
