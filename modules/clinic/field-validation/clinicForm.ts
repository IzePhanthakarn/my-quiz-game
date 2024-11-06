import {
	requiredRule,
	equalLengthRule,
	minRule,
	maxRule,
	onlyNumberRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { clinicName } from "../interface/name";

export const clinicCodeSchema = [
	requiredRule(clinicName.clinicCode),
	equalLengthRule(clinicName.clinicCode, 4),
	onlyNumberRule(clinicName.clinicCode),
];

export const clinicNameSchema = [
	requiredRule(clinicName.clinicName),
	minRule(clinicName.clinicName, 1),
	maxRule(clinicName.clinicName, 200),
];
