"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, LoaderCircle, Mic, MicOff, Video } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(",")[1];

        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      let MockJsonResp = result.response.text();
      MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        throw new Error("Invalid JSON response: " + MockJsonResp);
      }

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
