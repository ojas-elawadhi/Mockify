import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div className="border border-gray-500 shadow-sm rounded-lg p-3 ">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview.createdAt}
      </h2>

      <div className="flex justify-between mt-2 gap-5 flex-1">
        <Button onClick={onFeedback} size="sm" className="flex-1">
          Feedback
        </Button>
        <Button onClick={onStart} size="sm" className="flex-1">
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
