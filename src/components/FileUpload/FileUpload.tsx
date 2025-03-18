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
    ...attributes
  } = props;
  let hintComponent: JSX.Element | undefined;
  let errorMessageComponent: JSX.Element | undefined;
  let describedByValue: string = describedBy || "";

  if (hint) {
    const hintId: string = `${props.id}-hint`;
    describedByValue += ` ${hintId}`;
    hintComponent = <Hint {...props.hint} id={hintId} />;
  }

  if (errorMessage) {
    const errorId: string = `${id}-error`;
    describedByValue += ` ${errorId}`;
    errorMessageComponent = <ErrorMessage {...errorMessage} id={errorId} />;
  }

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      <Label {...label} htmlFor={id} />
      {hintComponent}
      {errorMessageComponent}
      <input
        {...attributes}
        id={id}
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
