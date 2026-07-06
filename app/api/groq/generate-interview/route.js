import { NextResponse } from "next/server";
import { callGroqChat, parseJsonFromAiText } from "@/utils/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { jobPosition, jobDesc, jobExperience } = await request.json();

    if (!jobPosition || !jobDesc || !jobExperience) {
      return NextResponse.json(
        { error: "Job position, description, and experience are required" },
        { status: 400 },
      );
    }

    const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTOIN_COUNT || 5;
    const content = await callGroqChat(
      [
        {
          role: "system",
          content:
            'You create mock interview questions. Return only a JSON array. Each item must have "Question" and "Answer" fields.',
        },
        {
          role: "user",
          content: `Job Position: ${jobPosition}
Job Description: ${jobDesc}
Years of Experience: ${jobExperience}

Create ${questionCount} interview questions with answers.`,
        },
      ],
      { temperature: 0.6, maxTokens: 2500 },
    );

    const questions = parseJsonFromAiText(content);

    return NextResponse.json(
      { questions },
      {
        headers: {
          "x-ai-provider": "groq",
        },
      },
    );
  } catch (error) {
    console.error("Groq interview generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate interview questions",
        detail: error.message,
      },
      { status: 500 },
    );
  }
}
