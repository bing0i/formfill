import React from "react";
import FormInputWithInlineError from "@src/components/FormInputWithInlineError";
import Notification from "@src/components/Notification";
import Spinner from "@src/components/Spinner";
import { useFormFill } from "@src/hooks/useFormFill";
import { FormInputType } from "../FormInputWithInlineError/types";

const FormFill: React.FC = () => {
  const {
    form,
    loading,
    message,
    messageType,
    errors,
    touched,
    clearMessage,
    handleChange,
    handleLoad,
    handleBlur,
    handleSave,
  } = useFormFill();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative px-2 sm:px-0 text-zinc-900">
      {loading && <Spinner />}

      {message && messageType && (
        <Notification
          message={message}
          type={messageType}
          onClose={clearMessage}
        />
      )}

      <main
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6 border border-zinc-100"
        aria-label="FormFill secure form"
      >
        <h1 className="text-3xl font-bold text-center text-zinc-900 mb-2 tracking-tight drop-shadow-sm">
          FormFill
        </h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          aria-describedby={message ? "notification" : undefined}
        >
          <FormInputWithInlineError
            id="firstName"
            label="First Name"
            type={FormInputType.Text}
            value={form.firstName}
            error={errors.firstName}
            touched={touched.firstName}
            disabled={loading}
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInputWithInlineError
            id="email"
            label="Email"
            type={FormInputType.Email}
            value={form.email}
            error={errors.email}
            touched={touched.email}
            disabled={loading}
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="flex gap-4 mt-2">
            <button
              className="flex-1 bg-indigo-500 hover:bg-cyan-400 text-white py-2 rounded-lg font-semibold text-base shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onClick={handleSave}
              disabled={loading}
              type="button"
              aria-label="Save form data"
            >
              Save
            </button>
            <button
              className="flex-1 bg-indigo-500 hover:bg-cyan-400 text-white py-2 rounded-lg font-semibold text-base shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onClick={handleLoad}
              disabled={loading}
              type="button"
              aria-label="Load form data"
            >
              Load
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default FormFill;
