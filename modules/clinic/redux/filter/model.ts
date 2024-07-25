import { IsActive } from "@/constants/constants";
export interface ClinicFilter {
	checkClinicCode: boolean;
	checkClinicName: boolean;
	checkIsActive: boolean;
	clinicCodeLike: string;
	clinicNameLike: string;
	isActive: IsActive | undefined;
}

export const modelClinicFilter: ClinicFilter = {
	checkClinicCode: false,
	checkClinicName: false,
	checkIsActive: false,
	clinicCodeLike: "",
	clinicNameLike: "",
	isActive: undefined,
};
