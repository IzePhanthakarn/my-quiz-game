import { IsActive, IsDelete } from "@/constants/constants";
import { DateFormat } from "@/constants/date-format.constant";
import dayjs from "dayjs";
import _ from "lodash";

export function getCurrentDateString() {
	return dayjs().format(DateFormat.DDMMYYYY).toString();
}

export function handleEmptyStringToNull(text: string | null) {
	return _.isEmpty(text) ? null : text;
}

export function toggleIsActive(status: IsActive) {
	const toggle = status === IsActive.Y ? IsActive.N : IsActive.Y;
	return toggle;
}

export function toggleIsDelete(status: IsDelete) {
	const toggle = status === IsDelete.Y ? IsDelete.N : IsDelete.Y;
	return toggle;
}
