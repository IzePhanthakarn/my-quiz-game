import { IsActive } from "@/constants/constants";
import { BaseClinic } from "../master/model";

export interface ClinicFilter extends BaseClinic {
	checkClinicCode: boolean;
	checkClinicName: boolean;
	checkStatus: boolean;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
	isDelete: IsActive;
}

export const modelClinicFilter: ClinicFilter = {
	clinicCode: "",
	clinicName: "",
	checkStatus: false,
	checkClinicCode: false,
	checkClinicName: false,
	isActive: undefined,
	checkIsActive: false,
	isDelete: IsActive.Y,
	uuid: "",
};
