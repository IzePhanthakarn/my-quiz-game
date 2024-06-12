export interface BaseClinic {
	clinicCode: string;
	clinicName: string;
}
export interface ClinicForm extends BaseClinic {
	clinicCodeName: string;
}

export interface ClinicGridModel extends ClinicForm {
	id: string;
	isActive: string;
}
export interface ClinicGrid {
	grid: ClinicGridModel[];
}

export const modelClinicForm: ClinicForm = {
	clinicCodeName: "",
	clinicCode: "",
	clinicName: "",
};
