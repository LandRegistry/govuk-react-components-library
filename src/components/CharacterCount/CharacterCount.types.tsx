import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";

export interface CharacterCountProps {
  id: string;
  className?: string;
  maxlength?: number;
  threshold?: number;
  maxwords?: number;
  errorMessage?: ErrorMessageProps;
  countMessage?: {
    className?: string;
  };
}
