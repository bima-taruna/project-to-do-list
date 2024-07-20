import { formatDistanceToNow, parse } from "date-fns";

export function distanceDateToNow(params) {
  const parsedDate = parse(params, "yyyy-MM-dd", new Date());
  const resultString = formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });
  const isNow =
    new Date().toISOString().split("T")[0] === params ? true : false;
  return {
    resultString: resultString,
    isNow: isNow,
  };
}
