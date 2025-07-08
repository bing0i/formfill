import React from "react";

const Spinner: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50 bg-opacity-80">
    <div
      className="w-16 h-16 border-4 border-indigo-500 border-t-cyan-400 rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
