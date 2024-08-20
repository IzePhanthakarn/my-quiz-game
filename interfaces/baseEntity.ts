import { IsActive } from "wcf-component-lib/src/constants/constants";

export interface BaseEntity {
	uuid: string;
	isActive: IsActive;
	createdDate: string;
	createdBy: string;
	updatedDate: string;
	updatedBy: string;
}
