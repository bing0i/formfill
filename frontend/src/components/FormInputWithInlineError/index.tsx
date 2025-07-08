import React from "react";
import { FormInputWithInlineErrorProps } from "./types";

const FormInputWithInlineError: React.FC<FormInputWithInlineErrorProps> = ({
  id,
  label,
  type,
  value,
  error,
  touched,
  disabled = false,
  autoComplete = "off",
  onChange,
  onBlur,
}) => {
  const showError = Boolean(error && touched);

  return (
    <div>
      <label htmlFor={id} className="block text-zinc-900 font-medium mb-1">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        className={`w-full rounded-lg px-4 py-2 text-base border transition focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-zinc-50 text-zinc-900 shadow-sm ${
          showError ? "border-rose-500 focus:ring-rose-500" : "border-zinc-300"
        }`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : undefined}
      />

      {showError && (
        <div
          id={`${id}-error`}
          className="text-rose-500 text-xs mt-1 font-medium animate-fade-in"
        >
          {error === "Invalid email address." && id === "email"
            ? "Please enter a valid email (e.g. user@example.com)."
            : error}
        </div>
      )}
    </div>
  );
};

export default FormInputWithInlineError;
