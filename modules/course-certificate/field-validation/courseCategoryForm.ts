import {
	requiredRule,
	maxRule,
	onlyNumberRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { courseCertificateName } from "../interfaces/name";

export const courseCertificateRules = {
	courseCategorySchema: [
		requiredRule(courseCertificateName.courseCategory),
		maxRule(courseCertificateName.courseCategory, 2),
	],
	ssoCourseCodeSchema: [
		requiredRule(courseCertificateName.ssoCourseCode),
		maxRule(courseCertificateName.ssoCourseCode, 10),
	],
	courseDescriptionSchema: [
		requiredRule(courseCertificateName.courseDescription),
		maxRule(courseCertificateName.courseDescription, 200),
	],
	courseYearSchema: [
		requiredRule(courseCertificateName.courseYear),
		onlyNumberRule(courseCertificateName.courseYear),
		maxRule(courseCertificateName.courseYear, 2),
	],
	organizeCodeSchema: [
		requiredRule(courseCertificateName.organizeCode),
		maxRule(courseCertificateName.organizeCode, 5),
	],
	genNoSchema: [
		requiredRule(courseCertificateName.genNo),
		onlyNumberRule(courseCertificateName.genNo),
		maxRule(courseCertificateName.genNo, 2),
	],
	organSystemGroupSchema: [
		maxRule(courseCertificateName.organSystemGroup, 2),
		onlyNumberRule(courseCertificateName.organSystemGroup),
	],
	// organSystemNoSchema: [maxRule(courseCertificateName.organSystemNo, 2)],
	// orderNoSchema: [maxRule(courseCertificateName.orderNo, 3)],
	// receiverPhoneNumberSchema: [
	// 	maxRule(courseCertificateName.receiverPhoneNumber, 20),
	// ],
	// receiverAddressSchema: [maxRule(courseCertificateName.receiverAddress, 300)],
};
