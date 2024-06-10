export interface BaseClinic {
	clinicCode: string;
	clinicName: string;
}
export interface ClinicForm extends BaseClinic {
	clinicCodeName: string;
}

interface Grid extends ClinicForm {
	id: string;
}
export interface ClinicGrid {
	grid: Grid[];
}

export const modelClinicForm: ClinicForm = {
	clinicCodeName: "",
	clinicCode: "",
	clinicName: "",
};
