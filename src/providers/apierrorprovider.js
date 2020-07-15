import React, {useState} from "react"

export const APIErrorContext = React.createContext({error: null,});

export default function APIErrorProvider({ children }) {
  const [error, setError] = useState();
  const contextValue = { error, setError };
  return (
    <APIErrorContext.Provider value={contextValue}>
      {children}
    </APIErrorContext.Provider>
  );
}