import { useState } from "react";
import { Errors, FormData, Touched } from "./types";

const initialFormData: FormData = {
  firstName: "",
  email: "",
};

export function useFormFill() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"error" | "success">();
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validate = (values: FormData) => {
    const errs: Errors = {};
    if (!values.firstName.trim()) {
      errs.firstName = "First name is required.";
    }

    if (!values.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      errs.email = "Invalid email address.";
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSave = async () => {
    setTouched({ firstName: true, email: true });

    const validationErrors = validate(form);

    setErrors(validationErrors);
    setMessage("");
    setMessageType(undefined);

    if (Object.keys(validationErrors).length > 0) {
      setMessage("Please fix the errors above.");
      setMessageType("error");

      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/apis/forms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      setMessage("Form data saved successfully.");
      setMessageType("success");
      setForm(initialFormData);
      setTouched({});
      setErrors({});

      console.info("Save success");
    } catch (err) {
      setMessage((err as Error).message);
      setMessageType("error");

      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    setLoading(true);
    setMessage("");
    setMessageType(undefined);
    setErrors({});

    try {
      const res = await fetch("/apis/forms/load");
      const text = await res.text();
      const data = JSON.parse(text);

      if (res.status === 404) {
        throw new Error("No valid form data found.");
      }

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      if (
        typeof data.data.firstName !== "string" ||
        typeof data.data.email !== "string"
      ) {
        throw new Error("Invalid data format from server.");
      }

      setForm({ firstName: data.data.firstName, email: data.data.email });
      setMessage("Form data loaded.");
      setMessageType("success");

      console.info("Load success");
    } catch (err) {
      setMessage((err as Error).message);
      setMessageType("error");

      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage("");
    setMessageType(undefined);
  };

  return {
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
  };
}
