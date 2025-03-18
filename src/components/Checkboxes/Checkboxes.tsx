import React from "react";
import { Boolean } from "../Boolean";
import { CheckboxesProps } from "./Checkboxes.types";

const Checkboxes: React.FC<CheckboxesProps> = (props) => {
  return <Boolean {...props} controlType="checkboxes" />;
};

export default Checkboxes;
