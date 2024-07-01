import { IsActive, IsDelete } from "@/constants/constants";
import { DiplomaForm } from "../model";

export interface DiplomaFilter extends DiplomaForm {
	checkDiplomaType: boolean;
	checkDiplomaName: boolean;
	checkStatus: boolean;
	isActive: IsActive;
	isDelete: IsDelete;
}

export const modelDiplomaFilter: DiplomaFilter = {
	diplomaType: "",
	diplomaName: "",
	checkStatus: false,
	checkDiplomaType: false,
	checkDiplomaName: false,
	isActive: IsActive.N,
	isDelete: IsDelete.Y,
	uuid: "",
};
