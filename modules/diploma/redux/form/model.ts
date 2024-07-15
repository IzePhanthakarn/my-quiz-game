import { IsActive } from "@/constants/constants";
import { DiplomaForm } from "../model";

export interface DiplomaDetail extends DiplomaForm {
	createdBy: string;
	createdDate: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
}

export const modelDiaplomaDetail: DiplomaDetail = {
	diplomaType: "",
	diplomaName: "",
	createdBy: "",
	createdDate: "",
	isActive: IsActive.Y,
	updatedBy: "",
	updatedDate: "",
	uuid: "",
};
