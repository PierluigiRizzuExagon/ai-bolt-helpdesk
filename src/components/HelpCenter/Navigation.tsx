import {
  BookOpenIcon,
  HelpCircleIcon,
  HomeIcon,
  MessageCircleIcon,
  MessageSquareIcon,
} from "lucide-react";

export type NavigationTab = "help-guide" | "chat" | "feedback" | "faq";

interface NavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const navigationTabs = [
  {
    id: "help-guide" as const,
    label: "Help guide",
    icon: HomeIcon,
  },
  {
    id: "chat" as const,
    label: "Chat",
    icon: MessageSquareIcon,
  },
  {
    id: "feedback" as const,
    label: "Feedback",
    icon: MessageCircleIcon,
  },
  {
    id: "faq" as const,
    label: "FAQ",
    icon: HelpCircleIcon,
  },
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <footer className="w-full h-[87px] bg-white border-t border-slate-200 shadow-lg">
      <div className="w-full h-full flex">
        {navigationTabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive ? "border-t-2 border-[#2848e6]" : ""
              } hover:bg-gray-50`}
            >
              <IconComponent
                className={`h-5 w-5 transition-colors duration-200 ${
                  isActive ? "text-[#2848e6]" : "text-gray-600"
                }`}
              />
              <span
                className={`font-normal text-xs text-center tracking-[0] leading-5 whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-[#2848e6] font-medium" : "text-gray-600"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};
