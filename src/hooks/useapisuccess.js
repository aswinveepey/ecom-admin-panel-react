import { useContext } from "react";
import { APISuccessContext } from "../providers/apisuccessprovider";

export default function useAPISuccess() {
  const { success, setSuccess } = useContext(APISuccessContext);
  return { success, setSuccess };
}
