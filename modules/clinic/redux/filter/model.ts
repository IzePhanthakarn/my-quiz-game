import { IsActive, IsDelete } from "@/constants/constants";
import { BaseClinic } from "../master/model";

export interface ClinicFilter extends BaseClinic {
	checkClinicCode: boolean;
	checkClinicName: boolean;
	checkStatus: boolean;
	isActive: IsActive;
	isDelete: IsDelete;
}

export const modelClinicFilter: ClinicFilter = {
	clinicCode: "",
	clinicName: "",
	checkStatus: false,
	checkClinicCode: false,
	checkClinicName: false,
	isActive: IsActive.N,
	isDelete: IsDelete.Y,
	uuid: "",
};
