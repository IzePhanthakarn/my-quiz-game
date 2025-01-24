import {
	equalLengthRule,
	maxRule,
	minRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const rules = {
	hospitalWcfCode: [requiredRule("รหัสโรงพยาบาล")],
	diplomaType: [requiredRule("วุฒิบัตรเฉพาะทาง")],
	bankDigitCode: [requiredRule("ธนาคาร")],
	bankSortingCode: [requiredRule("สาขาธนาคาร")],
	bankAccount: [requiredRule("เลขที่บัญชีธนาคาร")],
	trainingNo: [requiredRule("รุ่นที่อบรม")],
	trainingDate: [requiredRule("วันที่อบรม")],
};
