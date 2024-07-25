import { IsActive } from "@/constants/constants";
import { DateFormat } from "@/constants/date-format.constant";
import dayjs from "dayjs";
import _ from "lodash";
import { ScopesPermissions } from "./model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

export function handleRouterPush(path: string, router: AppRouterInstance) {
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
	if (path) {
		// Remove the basePath if it exists in the path
		const cleanedPath = path.startsWith(basePath ?? "")
			? path.substring(basePath?.length ?? 0)
			: path;

		// Ensure the path starts with a slash
		const finalPath = cleanedPath.startsWith("/")
			? cleanedPath
			: `/${cleanedPath}`;

		// Navigate to the cleaned path
		router.push(finalPath);
	}
}
