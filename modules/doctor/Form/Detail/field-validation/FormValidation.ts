import {
	equalLengthRule,
	maxRule,
	minRule,
	onlyNumberRule,
	requiredRule,
} from "wcf-component-lib/src/rules/FormRulesFunction";
import { doctorDataName } from "../interfaces/names";

export const rules = {
	professionalCodeSchema: [
		requiredRule(doctorDataName.professionalCode),
		maxRule(doctorDataName.professionalCode, 5), // CHAR(5) ตาม DDL
		onlyNumberRule(doctorDataName.professionalCode),
	],
	courseCategorySchema: [requiredRule(doctorDataName.courseCategory)], // ไม่พบใน DDL (สามารถลบออกได้ถ้าไม่จำเป็น)
	doctorCodeSchema: [
		requiredRule(doctorDataName.doctorCode),
		maxRule(doctorDataName.doctorCode, 10), // VARCHAR2(10)
	],
	citizenIdSchema: [
		requiredRule(doctorDataName.citizenId),
		onlyNumberRule(doctorDataName.citizenId),
		equalLengthRule(doctorDataName.citizenId, 13), // CHAR(13)
	],
	titleSchema: [requiredRule(doctorDataName.title)], // TITLE (VARCHAR2(50))
	firstNameSchema: [
		requiredRule(doctorDataName.firstname),
		maxRule(doctorDataName.firstname, 100), // VARCHAR2(100)
	],
	lastNameSchema: [
		requiredRule(doctorDataName.lastname),
		maxRule(doctorDataName.lastname, 100), // VARCHAR2(100)
	],
	doctorTypeSchema: [requiredRule(doctorDataName.doctorType)], // VARCHAR2(5)
	revenueNoSchema: [
		maxRule(doctorDataName.revenueNo, 13), // CHAR(13)
	],
	phoneNumberSchema: [
		maxRule(doctorDataName.phoneNumber, 50), // VARCHAR2(50) ตาม DDL
		onlyNumberRule(doctorDataName.phoneNumber),
	],
	houseNumSchema: [maxRule(doctorDataName.houseNum, 10)], // VARCHAR2(10)
	mooSchema: [maxRule(doctorDataName.moo, 10)], // VARCHAR2(10)
	roadSchema: [maxRule(doctorDataName.road, 50)], // VARCHAR2(50)
	soiSchema: [maxRule(doctorDataName.soi, 50)], // VARCHAR2(50)
	tambolSchema: [maxRule(doctorDataName.tambol, 8)], // CHAR(8)
	amphurSchema: [maxRule(doctorDataName.amphur, 4)], // CHAR(4)
	provinceSchema: [maxRule(doctorDataName.province, 2)], // CHAR(2)
	postcodeSchema: [maxRule(doctorDataName.postcode, 5)], // CHAR(5)
	emailSchema: [maxRule(doctorDataName.email, 100)], // VARCHAR2(100)
	eDiplomaSchema: [maxRule(doctorDataName.eDiploma, 200)], // VARCHAR2(200)
	eHospitalSchema: [maxRule(doctorDataName.eHospital, 200)], // VARCHAR2(200)
	certificateIdSchema: [maxRule(doctorDataName.certificateId, 20)], // VARCHAR2(20)
};
