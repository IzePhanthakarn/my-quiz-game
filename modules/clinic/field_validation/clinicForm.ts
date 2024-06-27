// import * as Yup from "yup";
// export const clinicCodeSchema = Yup.string()
// 	.length(4, "Clinic Code is too short!")
// 	// .max(4, "Clinic Code is too long!")
// 	.required("Clinic Code is required");

// export const clinicNameSchema = Yup.string()
// 	.email("Invalid email format")
// 	.required("Clinic Name is required");

// export interface FormData {
// 	clinicCode: string;
// 	clinicName: string;
// }

// export const validationSchema = Yup.object().shape({
// 	clinicCode: Yup.string()
// 		.length(4, "Clinic Code is too short!")
// 		.required("Clinic Code is required"),
// 	clinicName: Yup.string()
// 		.min(1, "Clinic Name is too short!")
// 		.max(200, "Clinic Name is too long!")
// 		.required("Clinic Name is required"),
// });

import {
	requiredRule,
	equalLengthRule,
	minRule,
	maxRule,
} from "wcf-component-lib/src/service/FormRulesFucntion";

export const clinicCodeSchema = [
	requiredRule("Clinic Code"),
	...equalLengthRule("Clinic Code", 4),
];

export const clinicNameSchema = [
	requiredRule("Clinic Name"),
	minRule("Clinic Name", 1),
	maxRule("Clinic Name", 200),
];
