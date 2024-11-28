export interface Title {
	titleCode: string;
	titleName: string;
}

export interface CourseCategory {
	courseCategoryId: number;
	categoryDescription: string;
	courseCategory: string;
}

export interface SsoBranch {
	ssoBranchCode: string;
	provinceName: string;
	provinceCode: string;
}

export interface HospitalAnnouncedPriceDetailCategoryMaster {
	categoryName: string;
	uuid: string;
}

export interface Bank {
	bankId: number;
	bankName: string;
	bankCode: string;
}

export interface BankBranch {
	bankId: number;
	bankBranchId: number;
	bankBranchCode: string;
	bankBranchName: string;
}
