import {
	maxRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";

export const names = {
	hospitalWcfCode: "รหัสสถานพยาบาล",
	hospitalDbmsCode: "รหัสสถานพยาบาล(ประกันสังคม)",
	hospitalMinistryCode: "รหัสสถานพยาบาล(ตามกระทรวง)",

	hospitalName: "ชื่อสถานพยาบาล",
	companyName: "ชื่อนิติบุคคล",
	revenueRegistrationCode: "เลขที่ภาษีของสถานพยาบาล",
	address: "ที่อยู่",
	provinceCode: "จังหวัด",
	amphurCode: "เขต/อำเภอ",
	tambolCode: "แขวง/ตำบล",
	postalCode: "รหัสไปรษณีย์",
	telephoneNumber: "โทรศัพท์",
	faxNumber: "แฟกซ์",

	contractStartDate: "วัน/เดือน/ปี ที่เริ่มข้อตกลง",
	hospitalType: "ระดับของสถานพยาบาล",
	hospitalCategory: "ประเภทของสถานพยาบาล",
	sp7StartDated: "วันที่ออกใบอนุญาต(สพ.7)",
	sp7EndDate: "วันที่สิ้นสุดใบอนุญาต(สพ.7)",
	sp19StartDate: "วันที่ออกใบอนุญาต(สพ.19)",
	sp19EndDate: "วันที่สิ้นสุดใบอนุญาต(สพ.19)",
	ssoProject: "โครงการประกันสังคม",

	belongTo: "Belong To",
	numberOfBed: "Number Of Bed",
	bps: "Bps",

	levelChangeDate: "Level Change Date",

	ssoPartner: "Sso Partner",
	tempColumn2: "Temp Column 2",
	tempColumn3: "Temp Column 3",
	tempColumn4: "Temp Column 4",
	tempColumn5: "Temp Column 5",

	hospitalListBoi: "Hospital List Boi",
	hospitalListBoiStartDate: "Hospital List Boi Start Date",
	hospitalListBoiExpireDate: "Hospital List Boi Expire Date",

	hospitalChangeNameDate: "วันที่เปลี่ยนชื่อสถานพยาบาล",
	contractEndDate: "วันที่ยกเลิกสถานพยาบาล",
	remarkChangeName: "สาเหตุการยกเลิก",
	oldHospitalName: "ชื่อเดิมของสถานพยาบาล",
};

export const rules = {
	hospitalWcfCodeSchema: [
		requiredRule(names.hospitalWcfCode),
		maxRule(names.hospitalWcfCode, 10),
		onlyNumberRule(names.hospitalWcfCode),
	],
	hospitalDbmsCodeSchema: [
		maxRule(names.hospitalDbmsCode, 7),
		onlyNumberRule(names.hospitalWcfCode),
	],
	hospitalMinistryCodeSchema: [
		maxRule(names.hospitalMinistryCode, 9),
		onlyNumberRule(names.hospitalWcfCode),
	],
	hospitalNameSchema: [
		requiredRule(names.hospitalName),
		maxRule(names.hospitalName, 200),
	],
	oldHospitalNameSchema: [maxRule(names.oldHospitalName, 200)],
	belongToSchema: [maxRule(names.belongTo, 5)],
	numberOfBedSchema: [onlyNumberRule(names.numberOfBed)],
	bpsSchema: [onlyNumberRule(names.bps)],
	hospitalTypeSchema: [
		maxRule(names.hospitalType, 1),
		requiredRule(names.hospitalName),
	],
	hospitalCategorySchema: [
		maxRule(names.hospitalCategory, 1),
		requiredRule(names.hospitalName),
	],
	companyNameSchema: [maxRule(names.companyName, 200)],
	revenueRegistrationCodeSchema: [maxRule(names.revenueRegistrationCode, 13)],
	contractStartDateSchema: [],
	contractEndDateSchema: [],
	sp7StartDatedSchema: [],
	sp7EndDateSchema: [],
	sp19StartDateSchema: [],
	sp19EndDateSchema: [],
	levelChangeDateSchema: [],
	addressSchema: [maxRule(names.address, 300)],
	amphurCodeSchema: [
		requiredRule(names.amphurCode),
		maxRule(names.amphurCode, 4),
	],
	provinceCodeSchema: [
		requiredRule(names.provinceCode),
		maxRule(names.provinceCode, 2),
	],
	postalCodeSchema: [maxRule(names.postalCode, 5)],
	telephoneNumberSchema: [maxRule(names.telephoneNumber, 50)],
	faxNumberSchema: [maxRule(names.faxNumber, 50)],
	ssoPartnerSchema: [maxRule(names.ssoPartner, 1)],
	tempColumn2Schema: [maxRule(names.tempColumn2, 1)],
	tempColumn3Schema: [maxRule(names.tempColumn3, 1)],
	tempColumn4Schema: [maxRule(names.tempColumn4, 1)],
	tempColumn5Schema: [maxRule(names.tempColumn5, 1)],
	hospitalChangeNameDateSchema: [],
	hospitalListBoiSchema: [maxRule(names.hospitalListBoi, 1)],
	hospitalListBoiStartDateSchema: [],
	hospitalListBoiExpireDateSchema: [],
	tambolCodeSchema: [maxRule(names.tambolCode, 10)],
	remarkChangeNameSchema: [maxRule(names.remarkChangeName, 500)],
	ssoProjectSchema: [
		maxRule(names.ssoProject, 1),
		requiredRule(names.ssoProject),
	],
};
