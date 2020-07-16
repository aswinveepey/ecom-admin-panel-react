import { useContext } from 'react';
import { APIFeedbackContext } from "../providers/apifeedbackprovider";

export default function useAPIFeedback() {
  const { error, setError, success, setSuccess } = useContext(APIFeedbackContext);
  return { error, setError, success, setSuccess };
}