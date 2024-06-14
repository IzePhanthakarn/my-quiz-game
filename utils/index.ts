import { DateFormat } from "@/constants/date-format.constant";
import dayjs from "dayjs";
import _ from "lodash";

export function getCurrentDateString() {
	return dayjs().format(DateFormat.DDMMYYYY).toString();
}

export function handleEmptyStringToNull(text: string | null) {
	return _.isEmpty(text) ? null : text;
}
