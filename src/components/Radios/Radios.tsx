import React from "react";
import { RadiosProps } from "./Radios.types";
import Boolean from "../Boolean/Boolean";
import { BooleanItem } from "../Boolean/Boolean.types";

const Radios: React.FC<RadiosProps> = (props) => {
  const { value, defaultValue, items, ...restProps } = props;

  const processedItems: BooleanItem[] | undefined = items
    ? items.map((item) => {
        if (item) {
          // Only set checked/defaultChecked - not both
          if (value != null) {
            return {
              ...item,
              checked: item.value === value,
              defaultChecked: undefined, // Remove defaultChecked if value is provided
            };
          } else if (defaultValue != null) {
            return {
              ...item,
              defaultChecked: item.value === defaultValue,
              checked: undefined, // Remove checked if defaultValue is provided
            };
          }
          return item;
        }
        return item;
      })
    : undefined;

  return <Boolean items={processedItems} {...restProps} controlType="radios" />;
};

export default Radios;
