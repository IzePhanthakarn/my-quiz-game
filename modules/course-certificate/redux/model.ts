import { IsActive } from "../../../constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";

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
	courseCategoryLike: string;
	ssoCourseCodeLike: string;
	courseDescriptionLike: string;
	courseYearLike: string;

	checkCourseCategory: boolean;
	checkSsoCourseCode: boolean;
	checkCourseDescription: boolean;
	checkCourseYear: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}
export interface GetCourseCertificateList extends CourseCertificateFilter {
	pagination: PaginationOptions;
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
	isActive: IsActive;
	// updatedBy: string;
	// updatedDate: string;
	uuid: string;
}

export const modelCourseCertificate: CourseCertificate = {
	grid: {
		data: [],
		page: { ...modelPaginationOptions },
	},
	filter: {
		courseCategoryLike: "",
		ssoCourseCodeLike: "",
		courseDescriptionLike: "",
		courseYearLike: "",
		checkCourseCategory: false,
		checkSsoCourseCode: false,
		checkCourseDescription: false,
		checkCourseYear: false,
		isActive: undefined,
		checkIsActive: false,
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
