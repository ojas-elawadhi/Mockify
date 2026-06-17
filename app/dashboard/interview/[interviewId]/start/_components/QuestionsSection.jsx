import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  if (!mockInterviewQuestion) {
    return (
      <div className="panel flex min-h-[420px] items-center justify-center p-6 text-muted-foreground">
        Loading questions...
      </div>
    );
  }

  const activeQuestion = mockInterviewQuestion[activeQuestionIndex]?.Question;

  return (
    <div className="panel flex min-h-[520px] flex-col justify-between p-6">
      <div>
        <div className="mb-6 flex flex-wrap gap-2">
          {mockInterviewQuestion.map((question, index) => (
            <div
              key={`${question.Question}-${index}`}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold text-muted-foreground",
                activeQuestionIndex === index &&
                  "border-primary bg-primary text-primary-foreground"
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <p className="section-eyebrow">Question</p>
        <h2 className="mt-3 text-2xl font-bold leading-9">
          {activeQuestion}
        </h2>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => textToSpeech(activeQuestion)}
        >
          <Volume2 />
          Play Question
        </Button>
      </div>

      <div className="mt-8 rounded-lg border border-info/30 bg-info/10 p-5">
        <h3 className="flex items-center gap-2 font-semibold text-info">
          <Lightbulb className="size-5" />
          Practice note
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </p>
      </div>
    </div>
  );
};

export default QuestionSection;
