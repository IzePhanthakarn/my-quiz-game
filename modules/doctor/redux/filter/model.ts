import { IsActive } from "wcf-component-lib/src/constants/constants";
import { NameFilter } from "@/utils/model";

export interface DoctorFilter extends NameFilter {
	checkProfessionalCode: boolean;
	checkIsActive: boolean;
	checkDiplomaType: boolean;
	checkProviceHospital: boolean;
	checkHospitalName: boolean;
	doctorTypeLike: string;
	diplomaTypeLike: string | null;
	professionalCodeLike: string;
	doctorCodeLike: string;
	proviceHospitalLike: string | null;
	hospitalNameLike: string | null;
	isActive: IsActive | undefined;
}

export const modelDoctorFilter: DoctorFilter = {
	checkProfessionalCode: false,
	checkIsActive: false,
	checkDiplomaType: false,
	checkFirstName: false,
	checkLastName: false,
	doctorTypeLike: "",
	doctorCodeLike: "",
	firstnameLike: "",
	lastnameLike: "",
	isActive: undefined,
	diplomaTypeLike: null,
	professionalCodeLike: "",
	checkProviceHospital: false,
	checkHospitalName: false,
	proviceHospitalLike: null,
	hospitalNameLike: null,
};
