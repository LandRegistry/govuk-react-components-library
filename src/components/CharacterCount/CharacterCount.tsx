import React, { TextareaHTMLAttributes } from "react";
import { Hint } from "../Hint";
import { Textarea } from "../Textarea";
import { CharacterCountProps } from "./CharacterCount.types";

const CharacterCount: React.FC<
  CharacterCountProps & TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
  const {
    id,
    className,
    maxlength,
    threshold,
    maxwords,
    errorMessage,
    countMessage,
    ...attributes
  } = props;

  const characterCountInfoId: string = `${id}-info`;

  return (
    <div
      className="govuk-character-count"
      data-module="govuk-character-count"
      data-maxlength={maxlength}
      data-threshold={threshold}
      data-maxwords={maxwords}
    >
      <Textarea
        id={id}
        {...attributes}
        errorMessage={errorMessage}
        className={`govuk-js-character-count ${className || ""}${errorMessage ? " govuk-textarea--error" : ""}`}
        aria-describedby={characterCountInfoId}
      />
      <Hint
        id={characterCountInfoId}
        className={`govuk-hint govuk-character-count__message ${countMessage?.className || ""}`}
        aria-live="polite"
      >
        You have {maxlength || maxwords} {maxwords ? "words" : "characters"}{" "}
        remaining
      </Hint>
    </div>
  );
};

CharacterCount.displayName = "CharacterCount";

export default CharacterCount;
