import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bot, ClipboardCheck, Mic2 } from "lucide-react";

const steps = [
  {
    value: "item-1",
    icon: Bot,
    title: "Create a role-specific interview",
    text: "Enter the target role, short job description, and years of experience. Gemini generates the question set and suggested answers.",
  },
  {
    value: "item-2",
    icon: Mic2,
    title: "Practice out loud",
    text: "Move through questions one by one, replay prompts, enable the webcam, and record your spoken answers.",
  },
  {
    value: "item-3",
    icon: ClipboardCheck,
    title: "Review your feedback",
    text: "Mockify transcribes your answers, scores each response, and stores improvement notes for review.",
  },
];

const HowItWorks = () => {
  return (
    <div className="space-y-6">
      <section className="panel-muted p-6 md:p-8">
        <p className="section-eyebrow">Guide</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          How Mockify works
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The app is designed around a short practice loop: generate, answer,
          review, then repeat with a sharper response.
        </p>
      </section>

      <section className="panel p-6">
        <Accordion type="single" collapsible className="w-full">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <AccordionItem key={step.value} value={step.value}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    {step.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-[3.25rem] text-muted-foreground">
                  {step.text}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </div>
  );
};

export default HowItWorks;
