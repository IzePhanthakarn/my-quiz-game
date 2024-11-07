import {
	maxRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { ltPropertiesName } from "../interfaces/name";

export const ltPropertiesRules = {
	propertyCodeSchema: [
		requiredRule(ltPropertiesName.propertyCode),
		maxRule(ltPropertiesName.propertyCode, 5),
	],
	groupNameSchema: [
		requiredRule(ltPropertiesName.groupName),
		maxRule(ltPropertiesName.groupName, 20),
	],
	propertyTextSchema: [maxRule(ltPropertiesName.propertyText, 100)],
	sortingOrderSchema: [
		requiredRule(ltPropertiesName.sortingOrder),
		onlyNumberRule(ltPropertiesName.sortingOrder),
	],
	descriptionSchema: [maxRule(ltPropertiesName.description, 200)],
};
