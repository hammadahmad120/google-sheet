export function getErrorMessage(res) {
  if (!res) return "Something went wrong";
  if (res.Errors.length && res.Errors[0].Message) return res.Errors[0].Message;
  return "Error while performing that operation";
}
