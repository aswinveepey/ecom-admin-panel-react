import { useContext } from 'react';
import { APIErrorContext } from "../providers/apierrorprovider";

export default function useAPIError() {
  const { error, setError } = useContext(APIErrorContext);
  return { error, setError };
}