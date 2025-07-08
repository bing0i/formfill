import React, { useEffect } from "react";

const AUTO_DISMISS_MS = 5000;

const Notification: React.FC<{
  message: string;
  type: "error" | "success";
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold text-center transition-all duration-300 flex items-center gap-4 min-w-[260px] max-w-[90vw] ${
        type === "error" ? "bg-rose-500" : "bg-emerald-500"
      }`}
      role="alert"
      aria-live="polite"
      tabIndex={-1}
    >
      <span className="flex-1 text-left">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 rounded hover:bg-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Close notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
