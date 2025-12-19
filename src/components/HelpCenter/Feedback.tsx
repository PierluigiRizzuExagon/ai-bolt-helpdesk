import { useMutation } from "@tanstack/react-query";
import { CheckCircleIcon, SendIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import { feedbackApi } from "../../services/api";

export const Feedback = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitFeedbackMutation = useMutation({
    mutationFn: () => feedbackApi.submitFeedback(rating, comment),
    onSuccess: () => {
      setIsSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setComment("");
        setIsSubmitted(false);
      }, 3000);
    },
  });

  const handleSubmit = () => {
    if (comment.trim()) {
      submitFeedbackMutation.mutate();
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 animate-fade-in px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Thank you!
          </h3>
          <p className="text-gray-600 text-sm">
            Your feedback has been submitted successfully. We appreciate your input!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-neutral-50 animate-fade-in">
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Give feedback
        </h2>
        <p className="text-sm text-gray-600">Help us improve your experience</p>
      </div>

      <div className="flex-1 px-4 pb-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-medium text-gray-800 text-base mb-4">
            How was your experience?
          </h3>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <StarIcon
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-medium text-gray-800 text-base mb-3">
            Your feedback
          </h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience, suggestions, or report any issues..."
            className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2848e6] focus:border-transparent transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            !comment.trim() || submitFeedbackMutation.isPending
          }
          className="w-full bg-[#2848e6] hover:bg-[#2040cc] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          {submitFeedbackMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <SendIcon className="h-5 w-5" />
              <span>Send Feedback</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
