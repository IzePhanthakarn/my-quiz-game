import { IsActive, IsDelete } from "@/constants/constants";
import { DateFormat } from "@/constants/date-format.constant";
import dayjs from "dayjs";
import _ from "wcf-component-lib/node_modules/@types/lodash/index";
import { ScopesPermissions } from "./model";

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

export function handleOrderBy(orderBy: string) {
	if (orderBy === "descend") {
		return "DESC";
	} else if (orderBy === "ascend") {
		return "ASC";
	} else {
		return "undefined";
	}
}

export function findScope(scopes: string[], key: string) {
	return scopes.filter((scope) => scope.startsWith(key));
}

export function getScopesPermissions(scopes: string[]) {
	return scopes.reduce(
		(acc: ScopesPermissions, scope) => {
			const [, resource] = scope.split(":");
			if (resource === "read") acc.read = resource;
			if (resource === "write") acc.write = resource;
			return acc;
		},
		{ read: null, write: null }
	);
}
