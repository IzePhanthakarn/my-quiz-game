import { IsActive } from "wcf-component-lib/src/constants/constants";

export interface DiplomaFilter {
	checkDiplomaType: boolean;
	checkDiplomaName: boolean;
	checkIsActive: boolean;
	diplomaTypeLike: string;
	diplomaNameLike: string;
	isActive: IsActive | undefined;
}

export const modelDiplomaFilter: DiplomaFilter = {
	diplomaTypeLike: "",
	diplomaNameLike: "",
	checkDiplomaType: false,
	checkDiplomaName: false,
	isActive: undefined,
	checkIsActive: false,
};
