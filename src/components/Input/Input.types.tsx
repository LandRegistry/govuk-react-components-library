export interface InputProps {
  className?: string;
  "aria-describedby"?: string;
  errorMessage?: object;
  formGroup?: { className?: string; [key: string]: unknown };
  hint?: object;
  label?: object;
  name?: string;
  id?: string;
  type: string;
  prefix?: { className?: string; [key: string]: unknown };
  suffix?: { className?: string; [key: string]: unknown };
}
