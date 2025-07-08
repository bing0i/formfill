export enum FormInputType {
  Text = "text",
  Email = "email",
}

export interface FormInputWithInlineErrorProps {
  id: string;
  label: string;
  type: FormInputType;
  value: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}
