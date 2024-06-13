import * as Yup from "yup";
export const clinicCodeSchema = Yup.string()
	.length(4, "Clinic Code is too short!")
	// .max(4, "Clinic Code is too long!")
	.required("Clinic Code is required");

export const clinicNameSchema = Yup.string()
	.email("Invalid email format")
	.required("Clinic Name is required");
