import { IsActive } from "@/constants/constants";
import { NameFilter } from "@/utils/model";

export interface DoctorFilter extends NameFilter {
	checkDoctorType: boolean;
	checkDoctorCode: boolean;
	checkIsActive: boolean;
	doctorTypeLike: string;
	doctorCodeLike: string;
	isActive: IsActive | undefined;
}

export const modelDoctorFilter: DoctorFilter = {
	checkDoctorType: false,
	checkDoctorCode: false,
	checkIsActive: false,
	checkFirstName: false,
	checkLastName: false,
	doctorTypeLike: "",
	doctorCodeLike: "",
	firstnameLike: "",
	lastnameLike: "",
	isActive: undefined,
};
