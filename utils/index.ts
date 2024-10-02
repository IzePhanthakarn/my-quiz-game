import { IsActive } from "wcf-component-lib/src/constants/constants";
import dayjs from "dayjs";
import _ from "lodash";
import { ScopesPermissions } from "./model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { DiplomaForm } from "@/modules/diploma/redux/model";
import { DoctorHospital } from "wcf-component-lib/src/components/BaseDropDown/model";
import { Title } from "@/components/MedDropDown/service/model";

export const mapIdByIndex = (items: any[]) =>
	items.map((item, index) => ({ ...item, id: index + 1 }));

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

export function handleMultiForm(values: any) {
	const groupedValues: any[] = [];
	Object.keys(values).forEach((key) => {
		const match = key.match(/(\d+)$/);
		if (match) {
			const index = parseInt(match[1], 10);
			if (!groupedValues[index]) {
				groupedValues[index] = {};
			}
			const fieldName = key.replace(/\d+$/, "");
			groupedValues[index][fieldName] = values[key];
		}
	});
}

export const getValue = (obj: any, key: string, def = null): any => {
	let value = _.get(obj, key, def);
	if (_.isArray(obj)) {
		value = _.get(obj, `[0].${key}`, def);
	}
	if (typeof value === "number") return value;
	if (_.isArray(value) || _.isObject(value)) return value;

	return _.isNull(value) ? null : _.trim(value);
};

export const findHospitalDisplay = (value: string) => {
	const hospital = JSON.parse(
		sessionStorage.getItem(SESSION_NAME.HOSPITAL) ?? "[]"
	);
	const hospitalResult = hospital.find(
		(e: DoctorHospital) => e.hospitalWcfCode === value
	);
	return hospitalResult ?? "";
};

export const findDiplomaDisplay = (value: string) => {
	const diploma = JSON.parse(
		sessionStorage.getItem(SESSION_NAME.DIPLOMA) ?? "[]"
	);
	const diplomaResult = diploma.find(
		(e: DiplomaForm) => e.diplomaType === value
	);
	return diplomaResult?.diplomaName ?? "";
};
