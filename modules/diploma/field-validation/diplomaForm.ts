import {
	requiredRule,
	equalLengthRule,
	minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { diplomaName } from "../interface/name";

export const diplomaTypeSchema = [
	requiredRule(diplomaName.diplomaType),
	equalLengthRule(diplomaName.diplomaType, 4),
];

export const diplomaNameSchema = [
	requiredRule(diplomaName.diplomaName),
	minRule(diplomaName.diplomaName, 1),
	maxRule(diplomaName.diplomaName, 200),
];
