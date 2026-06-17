"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const StartInterview = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  const isLastQuestion =
    activeQuestionIndex === mockInterviewQuestion?.length - 1;

  return (
    <div className="space-y-6">
      <section className="panel-muted p-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="section-eyebrow">Live practice</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              {interviewData?.jobPosition || "Mock interview"}
            </h1>
          </div>
          <div className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
            Question {activeQuestionIndex + 1} of{" "}
            {mockInterviewQuestion?.length || 0}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_440px]">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {activeQuestionIndex > 0 && (
          <Button
            variant="outline"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            <ArrowLeft />
            Previous
          </Button>
        )}
        {!isLastQuestion && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        )}
        {isLastQuestion && (
          <Button asChild variant="success">
            <Link
              href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
            >
              End Interview
              <CheckCircle2 />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
