import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { faqApi } from "../../services/api";

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: faqApi.getFAQs,
  });

  const faqs = data?.data || [];
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50 animate-fade-in">
      <div className="px-4 pt-6 pb-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQ..."
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
          <div className="space-y-2">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-4 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2848e6]/10 flex items-center justify-center mt-0.5">
                      <span className="text-[#2848e6] text-sm font-medium">
                        ?
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-800 text-sm leading-5">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDownIcon
                      className={`flex-shrink-0 h-5 w-5 text-gray-400 transition-transform duration-200 mt-0.5 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 pb-4 pl-[52px]">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
