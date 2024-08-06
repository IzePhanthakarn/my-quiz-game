import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
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

export interface CourseCertificateForm extends BaseMasterDataInterface {
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
		...baseMasterDataModel,
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
	},
};
