import {
	requiredRule,
	// equalLengthRule,
	// minRule,
	maxRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const courseOrganSystemGroupRules = {
	// courseCategory
	// ssoCourseCode
	// courseDescription
	// courseYear
	// organizeCode
	// genNo
	// organSystemGroup
	// organSystemNo
	// orderNo
	// receiverPhoneNumber
	// receiverAddress

	courseCategorySchema: [
		requiredRule("Course Category"),
		maxRule("Course Category", 2),
	],
	ssoCourseCodeSchema: [
		requiredRule("Sso Course Code"),
		maxRule("Sso Course Code", 10),
	],
	courseDescriptionSchema: [
		requiredRule("Course Description"),
		maxRule("Course Description", 200),
	],
	courseYearSchema: [requiredRule("Course Year"), maxRule("Course Year", 2)],
	organizeCodeSchema: [
		requiredRule("Organize Code"),
		maxRule("Organize Code", 5),
	],
	genNoSchema: [requiredRule("Gen No"), maxRule("Gen No", 2)],
	organSystemGroupSchema: [maxRule("Organ System Group", 2)],
	organSystemNoSchema: [maxRule("Organ System No", 2)],
	orderNoSchema: [maxRule("Order No", 3)],
	receiverPhoneNumberSchema: [maxRule("Receiver Phone Number", 20)],
	receiverAddressSchema: [maxRule("Receiver Address", 300)],
};
