import { formatDistanceToNow, parse } from "date-fns";
import { isPast } from "date-fns/isPast";

export function distanceDateToNow(params) {
  const parsedDate = parse(params, "yyyy-MM-dd", new Date());
  const resultString = formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });
  const dateToString = new Date().toISOString().split("T")[0];
  const isNow = dateToString === params ? true : false;
  const isDatePast = isPast(parsedDate);
  return {
    resultString: resultString,
    isNow: isNow,
    isPast: isDatePast,
  };
}
