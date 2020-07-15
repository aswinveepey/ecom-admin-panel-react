import React, {useState} from "react"

export const APIFeedbackContext = React.createContext({error: null, success: null});

export default function APIFeedbackProvider({ children }) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const contextValue = { error, setError, success, setSuccess };
  return (
    <APIFeedbackContext.Provider value={contextValue}>
      {children}
    </APIFeedbackContext.Provider>
  );
}