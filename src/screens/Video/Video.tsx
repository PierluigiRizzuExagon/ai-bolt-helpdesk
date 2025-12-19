import {
  ArrowLeftIcon,
  BookOpenIcon,
  HelpCircleIcon,
  MenuIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";

const navigationTabs = [
  {
    id: "help-guide",
    label: "Help guide",
    icon: BookOpenIcon,
    active: true,
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquareIcon,
    active: false,
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: MessageCircleIcon,
    active: false,
  },
  {
    id: "faq",
    label: "FAQ",
    icon: HelpCircleIcon,
    active: false,
  },
];

export const Video = (): JSX.Element => {
  return (
    <div className="bg-neutral-50 border border-solid w-full min-w-96 min-h-[600px] flex flex-col">
      <header className="w-full h-[72px] flex items-center bg-[#2848e6] px-4">
        <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
          <MenuIcon className="h-4 w-4 text-white" />
        </Button>

        <h1 className="ml-2 [font-family:'Inter',Helvetica] font-normal text-white text-xl tracking-[0] leading-7 whitespace-nowrap">
          Help Center
        </h1>

        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-0 ml-auto"
        >
          <XIcon className="h-10 w-10 text-white" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        <nav className="w-full h-[53px] flex items-center bg-white border-b border-slate-200 px-4">
          <Button variant="ghost" className="h-auto p-0 gap-2">
            <ArrowLeftIcon className="w-4 h-4 text-[#2848e6]" />
            <span className="[font-family:'Inter',Helvetica] font-medium text-[#2848e6] text-sm tracking-[0] leading-5 whitespace-nowrap">
              Back to tutorials
            </span>
          </Button>
        </nav>

        <div className="flex-1 flex flex-col overflow-auto">
          <div className="w-full px-3.5 pt-[15px]">
            <div className="w-full h-[201px] relative">
              <img
                className="w-full h-full object-cover"
                alt="Video thumbnail"
                src="/background-border-shadow.svg"
              />
            </div>
          </div>

          <section className="flex flex-col px-4 pt-[13px] pb-4">
            <h2 className="[font-family:'Inter',Helvetica] font-normal text-gray-800 text-lg tracking-[0] leading-7 whitespace-nowrap">
              Life Ring Button
            </h2>

            <p className="mt-[9.5px] [font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[0] leading-5 whitespace-nowrap">
              Duration: 2:30
            </p>

            <h3 className="mt-[13.5px] [font-family:'Inter',Helvetica] font-medium text-gray-800 text-base tracking-[0] leading-6 whitespace-nowrap">
              Description
            </h3>

            <p className="mt-[10.5px] [font-family:'Inter',Helvetica] font-normal text-gray-600 text-sm tracking-[0] leading-[22.8px]">
              In this comprehensive tutorial, you&#39;ll discover how
              <br />
              the Life Ring Button serves as your primary help
              <br />
              interface. We&#39;ll walk you through its key features,
              <br />
              placement strategies, and how to use it effectively to
              <br />
              get instant assistance. You&#39;ll learn about the
              <br />
              different modes available, customization options,
              <br />
              and best practices for maximizing its utility in your
              <br />
              daily workflow.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full h-[87px] bg-white border-t border-slate-200">
        <div className="w-full h-full flex">
          {navigationTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex-1 flex flex-col items-center justify-center gap-1 ${
                  tab.active ? "border-b-2 border-[#2848e6]" : ""
                }`}
              >
                <IconComponent
                  className={`h-5 w-5 ${
                    tab.active ? "text-[#2848e6]" : "text-gray-600"
                  }`}
                />
                <span
                  className={`[font-family:'Inter',Helvetica] font-normal text-sm text-center tracking-[0] leading-5 whitespace-nowrap ${
                    tab.active ? "text-[#2848e6]" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};
