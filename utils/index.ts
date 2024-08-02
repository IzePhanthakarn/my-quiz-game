import { IsActive } from "@/constants/constants";
import { DateFormat } from "@/constants/date-format.constant";
import dayjs from "dayjs";
import _ from "lodash";
import { ScopesPermissions } from "./model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { NotificationArgsProps } from "wcf-component-lib/node_modules/antd";
import { AppDispatch } from "@/redux/config/configStore";
import { setToast } from "@/redux/slices/toast";
import { modelToastNotification } from "@/redux/slices/toast/model";

type NotificationPlacement = NotificationArgsProps["placement"];

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

export function handleOrderBy(orderBy: string): "ASC" | "DESC" | undefined {
	switch (orderBy) {
		case "descend":
			return "DESC";
		case "ascend":
			return "ASC";
		default:
			return undefined;
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

export const openNotification =
	(params: {
		content: any;
		placement?: NotificationPlacement;
		message: string;
		description: string;
		type: "success" | "info" | "warning" | "error";
		onClick?: () => void;
		onClose?: () => void;
	}) =>
	(dispatch: AppDispatch) => {
		const { content } = params;
		console.log("placementplacementplacement", params.placement);
		const setContent = {
			...params,
			onClick: () => {
				if (params.onClick) params.onClick();
			},
			onClose: () => {
				if (params.onClose) params.onClose();
			},
		};
		switch (params.type) {
			case "success":
				content.success(setContent);
				break;
			case "info":
				content.info(setContent);
				break;
			case "warning":
				content.warning(setContent);
				break;
			case "error":
				content.error(setContent);
				break;
		}
		dispatch(setToast(modelToastNotification));
	};
