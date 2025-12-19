import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Chat } from "./Chat";
import { FAQ } from "./FAQ";
import { Feedback } from "./Feedback";
import { Header } from "./Header";
import { Navigation, type NavigationTab } from "./Navigation";
import { TutorialDetail } from "./TutorialDetail";
import { TutorialsList } from "./TutorialsList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>("help-guide");
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(
    null,
  );

  const handleTutorialSelect = (id: string) => {
    setSelectedTutorialId(id);
  };

  const handleBackToList = () => {
    setSelectedTutorialId(null);
  };

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    setSelectedTutorialId(null);
  };

  const renderContent = () => {
    if (activeTab === "help-guide") {
      if (selectedTutorialId) {
        return (
          <TutorialDetail
            tutorialId={selectedTutorialId}
            onBack={handleBackToList}
          />
        );
      }
      return <TutorialsList onTutorialSelect={handleTutorialSelect} />;
    }

    if (activeTab === "chat") {
      return <Chat />;
    }

    if (activeTab === "feedback") {
      return <Feedback />;
    }

    if (activeTab === "faq") {
      return <FAQ />;
    }

    return null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen flex flex-col bg-white">
        <main className="flex-1 flex flex-col overflow-hidden">
          {renderContent()}
        </main>
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </QueryClientProvider>
  );
};
