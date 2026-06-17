"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { ArrowRight, LoaderCircle, Plus, Sparkles } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `
  Job Positions: ${jobPosition}, 
  Job Description: ${jobDesc}, 
  Years of Experience: ${jobExperience}. 
  Based on this information, please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTOIN_COUNT} interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();

    if (MockJsonResp && jobPosition && jobDesc && jobExperience) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenDialog(true)}
        className="panel group flex min-h-[320px] flex-col justify-between p-6 text-left transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
      >
        <div>
          <div className="mb-6 flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Plus className="size-5" />
          </div>
          <p className="section-eyebrow">New interview</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Generate a custom session
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Add the target role, stack, and experience level. Mockify will
            prepare a question set for practice.
          </p>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Start setup
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </div>
      </button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <DialogTitle className="text-2xl">
              Create a mock interview
            </DialogTitle>
            <DialogDescription>
              Tell Mockify what role you are preparing for. Clear inputs produce
              better interview questions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="jobPosition">
                Job role
              </label>
              <Input
                id="jobPosition"
                placeholder="Full stack developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="jobDesc">
                Job description or tech stack
              </label>
              <Textarea
                id="jobDesc"
                placeholder="React, Node.js, PostgreSQL, REST APIs, system design"
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="jobExperience">
                Years of experience
              </label>
              <Input
                id="jobExperience"
                placeholder="5"
                max="50"
                min="0"
                type="number"
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    Generate Interview
                    <ArrowRight />
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
