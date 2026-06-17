"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useMemo, useState } from "react";
import { ChevronDown, Home, MessageSquareText, Star, Target } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  const hasFeedback = feedbackList?.length > 0;

  return (
    <div className="space-y-6">
      {!hasFeedback ? (
        <div className="panel-muted flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-md bg-secondary text-muted-foreground">
            <MessageSquareText className="size-6" />
          </div>
          <h1 className="text-2xl font-bold">No feedback found</h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Record at least one answer during the interview to generate ratings
            and improvement notes.
          </p>
          <Button className="mt-6" onClick={() => router.replace("/dashboard")}>
            <Home />
            Go Home
          </Button>
        </div>
      ) : (
        <>
          <section className="panel-muted p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-center">
              <div>
                <p className="section-eyebrow">Interview report</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight">
                  Here is your feedback.
                </h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Review each answer against the expected response and use the
                  feedback notes to sharpen your next attempt.
                </p>
              </div>
              <div className="panel bg-card p-5 text-center">
                <Star className="mx-auto mb-3 size-6 text-warning" />
                <p className="text-sm text-muted-foreground">Overall rating</p>
                <p className="mt-1 text-4xl font-bold">
                  {overallRating}
                  <span className="text-lg text-muted-foreground">/10</span>
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            {feedbackList.map((item, index) => (
              <Collapsible key={`${item.question}-${index}`} className="panel">
                <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 font-semibold">
                        {item.question}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <Target className="size-4" />
                        Rating {item.rating}/10
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-3 border-t border-border p-5">
                    <div className="rounded-md border border-border bg-secondary p-4">
                      <p className="text-sm font-semibold text-muted-foreground">
                        Your answer
                      </p>
                      <p className="mt-2 text-sm leading-6">{item.userAns}</p>
                    </div>
                    <div className="rounded-md border border-success/30 bg-success/10 p-4">
                      <p className="text-sm font-semibold text-success">
                        Suggested answer
                      </p>
                      <p className="mt-2 text-sm leading-6">
                        {item.correctAns}
                      </p>
                    </div>
                    <div className="rounded-md border border-info/30 bg-info/10 p-4">
                      <p className="text-sm font-semibold text-info">
                        Improvement feedback
                      </p>
                      <p className="mt-2 text-sm leading-6">{item.feedback}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </section>

          <Button onClick={() => router.replace("/dashboard")}>
            <Home />
            Go Home
          </Button>
        </>
      )}
    </div>
  );
};

export default Feedback;
