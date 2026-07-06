import { NextResponse } from "next/server";
import { callGroqChat, parseJsonFromAiText } from "@/utils/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { question, answer } = await request.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 },
      );
    }

    const content = await callGroqChat(
      [
        {
          role: "system",
          content:
            'You grade mock interview answers. Return only JSON with "rating" and "feedback" fields.',
        },
        {
          role: "user",
          content: `Question: ${question}
User Answer: ${answer}

Give a concise rating and 3 to 5 lines of feedback with areas to improve.`,
        },
      ],
      { temperature: 0.2, maxTokens: 700 },
    );

    const feedback = parseJsonFromAiText(content);

    return NextResponse.json(
      {
        rating: feedback.rating,
        feedback: feedback.feedback,
      },
      {
        headers: {
          "x-ai-provider": "groq",
        },
      },
    );
  } catch (error) {
    console.error("Groq feedback error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate feedback",
        detail: error.message,
      },
      { status: 500 },
    );
  }
}
