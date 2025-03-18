import React from "react";
import { PhaseBannerProps } from "./PhaseBanner.types";
import { Tag } from "../Tag";

const PhaseBanner: React.FC<PhaseBannerProps> = (props) => {
  const { className, tag, children, ...attributes } = props;
  return (
    <div className={`govuk-phase-banner ${className || ""}`} {...attributes}>
      <p className="govuk-phase-banner__content">
        <Tag
          className={`govuk-phase-banner__content__tag ${tag?.className || ""}`}
        >
          {tag && tag.children}
        </Tag>

        <span className="govuk-phase-banner__text">{children}</span>
      </p>
    </div>
  );
};

export default PhaseBanner;
