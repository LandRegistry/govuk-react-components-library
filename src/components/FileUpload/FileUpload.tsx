import React, { JSX } from "react";
import Hint from "../Hint/Hint";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Label from "../Label/Label";
import { FileUploadProps } from "./FileUpload.types";

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    className,
    errorMessage,
    formGroup,
    hint,
    label,
    "aria-describedby": describedBy,
    id,
    name,
    ...attributes
  } = props;

  // Mirrors govuk-frontend's Nunjucks macro, which defaults id to name when
  // id isn't given - without this the input has no id, so its <label for>
  // (and hint/error aria-describedby) can never associate with it.
  const resolvedId: string | undefined = id || name;

  let hintComponent: JSX.Element | undefined;
  let errorMessageComponent: JSX.Element | undefined;
  let describedByValue: string = describedBy || "";

  if (hint) {
    const hintId: string = `${resolvedId}-hint`;
    describedByValue += ` ${hintId}`;
    hintComponent = <Hint {...hint} id={hintId} />;
  }

  if (errorMessage) {
    const errorId: string = `${resolvedId}-error`;
    describedByValue += ` ${errorId}`;
    errorMessageComponent = <ErrorMessage {...errorMessage} id={errorId} />;
  }

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      <Label {...label} htmlFor={resolvedId} />
      {hintComponent}
      {errorMessageComponent}
      <input
        name={name}
        {...attributes}
        id={resolvedId}
        className={`govuk-file-upload ${className || ""}${
          errorMessage ? " govuk-file-upload--error" : ""
        }`}
        type="file"
        aria-describedby={describedByValue || undefined}
      />
    </div>
  );
};

FileUpload.displayName = "FileUpload";

export default FileUpload;
