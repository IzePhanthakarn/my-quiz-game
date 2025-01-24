import {
	maxRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { estimateAddNames } from "../interfaces/estimateAddNames";

export const estimateAddRules = {
	hospital_nameSchema: [requiredRule(estimateAddNames.hospital_name)],
	hospitalWCFCodeSchema: [requiredRule(estimateAddNames.hospital_name)],
	assessTypeSchema: [
		requiredRule(estimateAddNames.assessType),
		maxRule(estimateAddNames.assessType, 1),
	],
	userFirstNameSchema: [requiredRule(estimateAddNames.userFirstName)],
	userLastNameSchema: [requiredRule(estimateAddNames.userLastName)],
	emailSchema: [requiredRule(estimateAddNames.email)],
	refDocNoSchema: [],
	refDocDateSchema: [],
	notifyDateSchema: [requiredRule(estimateAddNames.notifyDate)],
	visitDateSchema: [requiredRule(estimateAddNames.visitDate)],
	resultStatusSchema: [
		requiredRule(estimateAddNames.resultStatus),
		maxRule(estimateAddNames.resultStatus, 1),
	],
	resultDescSchema: [requiredRule(estimateAddNames.resultDesc)],
};
