import { useMutation, useQuery } from "@tanstack/react-query";
import { BotIcon, SendIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { chatApi } from "../../services/api";
import type { Message } from "../../types/api";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const { isLoading: isLoadingInitial } = useQuery({
    queryKey: ["chat-initial"],
    queryFn: chatApi.getInitialMessages,
    onSuccess: (data) => {
      if (data.status === "success") {
        setMessages(data.data);
      }
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: chatApi.sendMessage,
    onMutate: (message) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        setMessages((prev) => [...prev, data.data]);
      }
    },
  });

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessageMutation.mutate(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50">
      <div className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2848e6] to-[#4c6ef5] flex items-center justify-center">
            <BotIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 text-base">AI Assistant</h3>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {isLoadingInitial ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2848e6]"></div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-2 animate-fade-in ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-gray-300"
                    : "bg-gradient-to-br from-[#2848e6] to-[#4c6ef5]"
                }`}
              >
                {message.sender === "user" ? (
                  <UserIcon className="h-4 w-4 text-gray-700" />
                ) : (
                  <BotIcon className="h-4 w-4 text-white" />
                )}
              </div>

              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-[#2848e6] text-white rounded-tr-sm"
                    : "bg-white text-gray-800 rounded-tl-sm shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))
        )}
        {sendMessageMutation.isPending && (
          <div className="flex gap-2 animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2848e6] to-[#4c6ef5] flex items-center justify-center">
              <BotIcon className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-slate-200 px-4 py-4 shadow-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2848e6] focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || sendMessageMutation.isPending}
            className="flex-shrink-0 w-12 h-12 bg-[#2848e6] hover:bg-[#2040cc] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all"
          >
            <SendIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
