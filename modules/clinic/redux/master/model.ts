export interface ClinicForm {
	clinicCodeName: string;
	clinicCode: string;
	clinicName: string;
	uuid: string;
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
	uuid: "",
};
