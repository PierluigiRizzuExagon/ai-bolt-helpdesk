import type { ApiResponse, FAQ, Message, Tutorial } from "../types/api";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const tutorialsApi = {
  getTutorials: async (): Promise<ApiResponse<Tutorial[]>> => {
    await delay(800);
    return {
      status: "success",
      data: [
        {
          id: "1",
          title: "Life Ring Button",
          description: "Learn how the Life Ring Button helps you",
          duration: "2:30",
          thumbnail: "/background-border-shadow.svg",
        },
        {
          id: "2",
          title: "Getting Started Guide",
          description: "Complete overview of all features",
          duration: "5:45",
          thumbnail: "/background-border-shadow.svg",
        },
        {
          id: "3",
          title: "Advanced Features",
          description: "Discover advanced functionality",
          duration: "3:20",
          thumbnail: "/background-border-shadow.svg",
        },
      ],
      message: "Tutorials loaded successfully",
    };
  },

  getTutorialById: async (id: string): Promise<ApiResponse<Tutorial>> => {
    await delay(500);
    return {
      status: "success",
      data: {
        id,
        title: "Life Ring Button",
        description:
          "In this comprehensive tutorial, you'll discover how the Life Ring Button serves as your primary help interface. We'll walk you through its key features, placement strategies, and how to use it effectively to get instant assistance. You'll learn about the different modes available, customization options, and best practices for maximizing its utility in your daily workflow.",
        duration: "2:30",
        thumbnail: "/background-border-shadow.svg",
      },
    };
  },
};

export const chatApi = {
  sendMessage: async (message: string): Promise<ApiResponse<Message>> => {
    await delay(1000);
    return {
      status: "success",
      data: {
        id: Date.now().toString(),
        content:
          "Thanks for your message! I'm here to help you with any questions about our platform. How can I assist you today?",
        sender: "ai",
        timestamp: new Date(),
      },
      message: "Message sent successfully",
    };
  },

  getInitialMessages: async (): Promise<ApiResponse<Message[]>> => {
    await delay(600);
    return {
      status: "success",
      data: [
        {
          id: "1",
          content: "Hey, I'm AI powered assistant! What can I help you with?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
    };
  },
};

export const faqApi = {
  getFAQs: async (): Promise<ApiResponse<FAQ[]>> => {
    await delay(700);
    return {
      status: "success",
      data: [
        {
          id: "1",
          question: "How do I get started with the platform?",
          answer:
            "Getting started is easy! First, complete your profile setup, then explore the tutorial videos in the Help guide section. We recommend starting with the 'Getting Started Guide' video for a comprehensive overview of all features.",
        },
        {
          id: "2",
          question: "How can I reset my password?",
          answer:
            "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and we'll send you a secure link to create a new password. The link will expire in 24 hours for security reasons.",
        },
        {
          id: "3",
          question: "What are the system requirements?",
          answer:
            "Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For optimal performance, we recommend using the latest version of your browser. Mobile apps are available for iOS 13+ and Android 8.0+.",
        },
        {
          id: "4",
          question: "How do I contact customer support?",
          answer:
            "You can reach our support team 24/7 through the Chat feature in this Help Center, send us an email at support@example.com, or call our hotline at +1-800-HELP-NOW. Average response time is under 2 hours.",
        },
        {
          id: "5",
          question: "Is my data secure?",
          answer:
            "Absolutely! We use industry-standard encryption (AES-256) to protect your data both in transit and at rest. Our servers are hosted in secure data centers with 24/7 monitoring, and we're fully compliant with GDPR and SOC 2 Type II standards.",
        },
      ],
      message: "FAQs loaded successfully",
    };
  },
};

export const feedbackApi = {
  submitFeedback: async (
    rating?: number,
    comment?: string,
  ): Promise<ApiResponse<null>> => {
    await delay(1200);
    return {
      status: "success",
      data: null,
      message: "Thank you for your feedback!",
    };
  },
};
