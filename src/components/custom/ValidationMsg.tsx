import { FieldError } from "react-hook-form";

type ValidationMsgType = {
  error?: FieldError;
};
export default function ValidationMsg({ error }: ValidationMsgType) {
  if (!error) return null;

  return <>{<p className="text-sm text-red-600 mt-1">{error.message}</p>}</>;
}
