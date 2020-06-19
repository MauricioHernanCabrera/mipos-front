import React, { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  /**
   * no-interaction
   * open
   * close
   */
  const [status, setStatus] = useState("no-interaction");

  const value = {
    status,
    setStatus,
    // tags,
    // setTags,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
