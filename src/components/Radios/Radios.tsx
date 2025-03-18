import React from "react";
import { RadiosProps } from "./Radios.types";
import Boolean from "../Boolean/Boolean";
import { BooleanItem } from "../Boolean/Boolean.types";

const Radios: React.FC<RadiosProps> = (props) => {
  const { value, defaultValue, items, ...restProps } = props;

  const processedItems: BooleanItem[] | undefined = items
    ? items.map((item) => {
        if (item) {
          return {
            ...item,
            ...(value != null && { checked: item.value === value }),
            ...(defaultValue != null && {
              defaultChecked: item.value === defaultValue,
            }),
          };
        }
        return item;
      })
    : undefined;

  return <Boolean items={processedItems} {...restProps} controlType="radios" />;
};

export default Radios;
