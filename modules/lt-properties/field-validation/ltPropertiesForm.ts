import {
	maxRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const propertyCodeName = "Propterty Code";
export const groupNameName = "Group Name";
export const propertyTextName = "Propterty Text";
export const sortingOrderName = "Sorting Order";
export const descriptionName = "Description";

export const ltPropertiesRules = {
	propertyCodeSchema: [
		requiredRule(propertyCodeName),
		maxRule(propertyCodeName, 5),
	],
	groupNameSchema: [requiredRule(groupNameName), maxRule(groupNameName, 20)],
	propertyTextSchema: [maxRule(propertyTextName, 100)],
	sortingOrderSchema: [
		requiredRule(sortingOrderName),
		onlyNumberRule(sortingOrderName),
	],
	descriptionSchema: [maxRule(descriptionName, 200)],
};
