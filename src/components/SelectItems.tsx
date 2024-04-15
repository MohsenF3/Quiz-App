import {
  changeCategory,
  changeDiff,
  changeType,
} from "../lib/slices/quizSlice";
import { useAppDispatch } from "../app/hooks";
import React from "react";
import { SelectItemsProps } from "../lib/models/quizModels";
import { Option, Select } from "@material-tailwind/react";

const SelectItems: React.FC<SelectItemsProps> = ({ options, label }) => {
  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {
    switch (label) {
      case "Category":
        dispatch(changeCategory(event));
        break;
      case "Difficulty":
        dispatch(changeDiff(event));
        break;
      case "Type":
        dispatch(changeType(event));
        break;
      default:
        return;
    }
  };

  return (
    <Select
      placeholder={undefined}
      variant="static"
      label={label}
      value={label}
      onChange={handleChange}
      color="green"
    >
      {options?.map(({ id, name }) => (
        <Option value={id.toString()} key={id}>
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectItems;
