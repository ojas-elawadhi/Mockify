"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, LoaderCircle, Mic, MicOff, Video } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("audio", audioBlob, "answer.webm");

      const response = await fetch("/api/groq/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = await response.json();

      if (!data.text) {
        toast("No speech was detected. Please try recording again.");
        setLoading(false);
        return;
      }

      setUserAnswer((prevAnswer) => prevAnswer + " " + data.text);
      setLoading(false);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/groq/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: mockInterviewQuestion[activeQuestionIndex]?.Question,
          answer: userAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate feedback");
      }

      const jsonFeedbackResp = await response.json();

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast("Answer recorded successfully");
      }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast("An error occurred while recording the user answer");
      setLoading(false);
    }
  };

  return (
    <div className="panel p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Answer</p>
          <h2 className="mt-2 text-2xl font-bold">Record your response</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Stop the recording when you finish. Mockify will transcribe and save
            feedback automatically.
          </p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Mic className="size-5" />
        </div>
      </div>

      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-slate-950">
        {webCamEnabled ? (
          <Webcam mirrored={true} className="h-full w-full object-cover" />
        ) : (
          <>
            <Image
              src="/camera.jpg"
              fill
              alt="Camera placeholder"
              className="object-cover opacity-35"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-slate-200">
              <Camera className="size-10" />
              <p className="text-sm font-medium">Camera preview disabled</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button
          variant="outline"
          onClick={() => setWebCamEnabled((prev) => !prev)}
        >
          <Video />
          {webCamEnabled ? "Close Webcam" : "Enable Webcam"}
        </Button>
        <Button
          variant={isRecording ? "destructive" : "default"}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading || !mockInterviewQuestion}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" />
              Processing
            </>
          ) : isRecording ? (
            <>
              <MicOff />
              Stop Recording
            </>
          ) : (
            <>
              <Mic />
              Record Answer
            </>
          )}
        </Button>
      </div>

      <div className="mt-5 rounded-md border border-border bg-secondary p-4">
        <p className="text-sm font-semibold">
          {isRecording
            ? "Recording in progress"
            : loading
              ? "Processing your answer"
              : "Ready for your answer"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isRecording
            ? "Speak naturally and keep your response focused."
            : "Use the question panel to replay the prompt whenever you need it."}
        </p>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
