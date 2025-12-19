import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { tutorialsApi } from "../../services/api";
import { Button } from "../ui/button";

interface TutorialDetailProps {
  tutorialId: string;
  onBack: () => void;
}

export const TutorialDetail = ({ tutorialId, onBack }: TutorialDetailProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["tutorial", tutorialId],
    queryFn: () => tutorialsApi.getTutorialById(tutorialId),
  });

  const tutorial = data?.data;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2848e6]"></div>
      </div>
    );
  }

  if (!tutorial) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50 animate-fade-in">
      <nav className="w-full h-[53px] flex items-center bg-white border-b border-slate-200 px-4">
        <Button
          variant="ghost"
          className="h-auto p-0 gap-2 hover:bg-transparent"
          onClick={onBack}
        >
          <ArrowLeftIcon className="w-4 h-4 text-[#2848e6]" />
          <span className="font-medium text-[#2848e6] text-sm tracking-[0] leading-5 whitespace-nowrap">
            Back to tutorials
          </span>
        </Button>
      </nav>

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="w-full px-3.5 pt-[15px]">
          <div className="w-full aspect-video relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover"
              alt="Video thumbnail"
              src={tutorial.thumbnail}
            />
          </div>
        </div>

        <section className="flex flex-col px-4 pt-[13px] pb-4">
          <h2 className="font-normal text-gray-800 text-lg tracking-[0] leading-7">
            {tutorial.title}
          </h2>

          <p className="mt-[9.5px] font-normal text-gray-600 text-sm tracking-[0] leading-5">
            Duration: {tutorial.duration}
          </p>

          <h3 className="mt-[13.5px] font-medium text-gray-800 text-base tracking-[0] leading-6">
            Description
          </h3>

          <p className="mt-[10.5px] font-normal text-gray-600 text-sm tracking-[0] leading-[22.8px]">
            {tutorial.description}
          </p>
        </section>
      </div>
    </div>
  );
};
