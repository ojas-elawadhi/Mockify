"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, MessageSquareText, Star } from "lucide-react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  return (
    <article className="panel flex min-h-52 flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <MessageSquareText className="size-5" />
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {interview.createdAt}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-6 text-foreground">
          {interview?.jobPosition}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {interview?.jobExperience} years of experience
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {interview?.jobDesc}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button onClick={onFeedback} variant="outline">
          <Star />
          Feedback
        </Button>
        <Button onClick={onStart}>
          Start
          <ArrowRight />
        </Button>
      </div>
    </article>
  );
};

export default InterviewItemCard;
