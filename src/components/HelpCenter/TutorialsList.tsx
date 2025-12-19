import { useQuery } from "@tanstack/react-query";
import { PlayIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { tutorialsApi } from "../../services/api";

interface TutorialsListProps {
  onTutorialSelect: (id: string) => void;
}

export const TutorialsList = ({ onTutorialSelect }: TutorialsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["tutorials"],
    queryFn: tutorialsApi.getTutorials,
  });

  const tutorials = data?.data || [];
  const filteredTutorials = tutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50">
      <div className="px-4 pt-6 pb-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search TUTORIAL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2848e6] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2848e6]"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTutorials.map((tutorial, index) => (
              <button
                key={tutorial.id}
                onClick={() => onTutorialSelect(tutorial.id)}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-3 flex items-start gap-3 group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative flex-shrink-0 w-[88px] h-[64px] bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="bg-[#2848e6] rounded-full p-2">
                      <PlayIcon className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {tutorial.duration}
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-800 text-sm leading-5 mb-1 group-hover:text-[#2848e6] transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="font-normal text-gray-600 text-xs leading-4 line-clamp-2">
                    {tutorial.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
