import { DateFormat } from "@/constants/date-format.constant";
import dayjs from "dayjs";

export function getCurrentDateString() {
  return dayjs().format(DateFormat.DDMMYYYY).toString();
}
