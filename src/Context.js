import React, { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * no-interaction
   * open
   * close
   */
  const [status, setStatus] = useState("no-interaction");

  const value = {
    isOpen,
    setIsOpen: (value) => {
      console.log("setIsOpen", value);
      setIsOpen(value);
    },
    status,
    setStatus: (value) => {
      console.log("setStatus", value);
      setStatus(value);
    },
    // tags,
    // setTags,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
