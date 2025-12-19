export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FeedbackData {
  rating?: number;
  comment: string;
}
