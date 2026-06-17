"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
    setLoading(false);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="section-eyebrow">History</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Previous mock interviews
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {interviewList.length} saved session{interviewList.length === 1 ? "" : "s"}
        </p>
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-48 rounded-lg" />
          ))}
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {interviewList.map((interview) => (
            <InterviewItemCard key={interview.mockId} interview={interview} />
          ))}
        </div>
      ) : (
        <div className="panel-muted flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-md bg-secondary text-muted-foreground">
            <ClipboardList className="size-5" />
          </div>
          <h3 className="text-lg font-semibold">No sessions yet</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Create your first mock interview from the setup panel above. Your
            completed sessions and feedback will appear here.
          </p>
        </div>
      )}
    </section>
  );
};

export default InterviewList;
