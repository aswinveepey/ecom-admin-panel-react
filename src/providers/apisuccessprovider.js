import React, { useState } from "react";

export const APISuccessContext = React.createContext({ success: null });

export default function APISuccessProvider({ children }) {
  const [success, setSuccess] = useState();
  const contextValue = { success, setSuccess };
  return (
    <APISuccessContext.Provider value={contextValue}>
      {children}
    </APISuccessContext.Provider>
  );
}
