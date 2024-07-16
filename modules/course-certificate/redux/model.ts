import { IsActive } from "../../../constants/constants";
import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";

export interface CourseCertificate {
	grid: CourseCertificateGrid;
	filter: CourseCertificateFilter;
	form: CourseCertificateForm;
}

export interface CourseCertificateGrid extends PaginationModel {
	data: CourseCertificateGridData[];
}

export interface CourseCertificateGridData {
	courseCategory: string;
	ssoCourseCode: string;
	courseDescription: string;
	courseYear: string;
	organizeCode: string;
	genNo: string;
	organSystemGroup: string;
	organSystemNo: string;
	orderNo: string;
	receiverPhoneNumber: string;
	receiverAddress: string;
	uuid: string;
}

export interface CourseCertificateFilter {
	courseCategoryId: number;
	categoryDescription: string;
}

export interface CourseCertificateForm {
	courseCategory: string;
	ssoCourseCode: string;
	courseDescription: string;
	courseYear: string;
	organizeCode: string;
	genNo: string;
	organSystemGroup: string;
	organSystemNo: string;
	orderNo: string;
	receiverPhoneNumber: string;
	receiverAddress: string;

	// createdBy: string;
	// createdDate: string;
	isActive: string;
	// updatedBy: string;
	// updatedDate: string;
	uuid: string;
}

export const modelCourseCertificate: CourseCertificate = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		courseCategoryId: 0,
		categoryDescription: "",
	},
	form: {
		courseCategory: "",
		ssoCourseCode: "",
		courseDescription: "",
		courseYear: "",
		organizeCode: "",
		genNo: "",
		organSystemGroup: "",
		organSystemNo: "",
		orderNo: "",
		receiverPhoneNumber: "",
		receiverAddress: "",
		// createdBy: "",
		// createdDate: "",
		isActive: IsActive.Y,
		// updatedBy: "",
		// updatedDate: "",
		uuid: "",
	},
};
