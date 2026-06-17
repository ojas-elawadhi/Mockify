import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { CalendarCheck, MessageSquareText, Sparkles } from "lucide-react";

const stats = [
  {
    label: "Question sets",
    value: "AI generated",
    icon: Sparkles,
  },
  {
    label: "Practice mode",
    value: "Audio + webcam",
    icon: MessageSquareText,
  },
  {
    label: "Feedback",
    value: "Stored by session",
    icon: CalendarCheck,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
        <div className="panel-muted p-6 md:p-8">
          <p className="section-eyebrow">Interview workspace</p>
          <div className="mt-3 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Create and run focused mock interviews.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Build a question set for the role you are targeting, practice
              each response out loud, and return here to review every previous
              session.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="metric-card">
                  <Icon className="mb-4 size-5 text-primary" />
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <AddNewInterview />
      </section>

      <InterviewList />
    </div>
  );
};

export default Dashboard;
