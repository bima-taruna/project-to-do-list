import { formatDistanceToNow, parse } from "date-fns";

export function distanceDateToNow(params) {
  const parsedDate = parse(params, "yyyy-mm-dd", new Date());
  const isNow =
    new Date().toISOString().split("T")[0] === params ? true : false;
  return {
    resultString: formatDistanceToNow(parsedDate, { addSuffix: true }),
    isNow: isNow,
  };
}
