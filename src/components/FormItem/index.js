import React from "react";
import { FormItemWrapper } from "./styles";

const FormItem = ({ children, ...props }) => {
  return <FormItemWrapper {...props}>{children}</FormItemWrapper>;
};

export default FormItem;
