"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ArrowRight, BriefcaseBusiness, Camera, Info, Layers3, Timer } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";

const Interview = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    }
  }, [params]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="space-y-8">
      <section className="panel-muted p-6 md:p-8">
        <p className="section-eyebrow">Interview setup</p>
        <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Check your setup before you begin.
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Review the role details, enable your camera if you want a more
              realistic practice environment, then start the interview.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              Start Interview
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="space-y-5">
          <div className="panel p-6">
            <h2 className="mb-5 text-xl font-bold">Role details</h2>
            <div className="grid gap-4">
              <div className="flex gap-3 rounded-md bg-secondary p-4">
                <BriefcaseBusiness className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Job role</p>
                  <p className="font-semibold">{interviewData?.jobPosition}</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-md bg-secondary p-4">
                <Layers3 className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Description / stack
                  </p>
                  <p className="font-semibold">{interviewData?.jobDesc}</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-md bg-secondary p-4">
                <Timer className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold">
                    {interviewData?.jobExperience} years
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-warning/40 bg-warning/15 p-5 text-warning-foreground">
            <h2 className="flex items-center gap-2 font-semibold">
              <Info className="size-5" />
              Before you start
            </h2>
            <p className="mt-3 text-sm leading-6">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </p>
          </div>
        </div>

        <div className="panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Camera preview</p>
              <h2 className="text-xl font-bold">Webcam check</h2>
            </div>
            <Camera className="size-5 text-primary" />
          </div>
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-slate-950">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <Camera className="size-12" />
                <p className="text-sm">Camera disabled</p>
              </div>
            )}
          </div>
          <Button
            className="mt-4 w-full"
            variant={webCamEnabled ? "outline" : "default"}
            onClick={() => setWebCamEnabled((prev) => !prev)}
          >
            {webCamEnabled ? "Close Webcam" : "Enable Webcam"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Interview;
