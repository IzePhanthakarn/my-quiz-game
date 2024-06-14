import { BaseClinic } from "../master/model";

export interface ClinicFilter extends BaseClinic {
	checkClinicCode: boolean;
	checkClinicName: boolean;
	checkStatus: boolean;
	deteled: boolean;
	active: boolean;
}

export const modelClinicFilter: ClinicFilter = {
	clinicCode: "",
	clinicName: "",
	checkStatus: false,
	checkClinicCode: false,
	checkClinicName: false,
	deteled: false,
	active: false,
	uuid: ""
};
