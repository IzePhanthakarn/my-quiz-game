import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
import type { UploadFile } from "wcf-component-lib/node_modules/antd/es/upload/interface";
import {
	HospitalSp7,
	modelHospitalSp7,
} from "@/modules/hospital/redux/models/sp7Model";
import {
	HospitalSp19,
	modelHospitalSp19,
} from "@/modules/hospital/redux/models/sp19Model";
import { HospitalEtcFiles, modelHospitalEtcFiles } from "./etcFilesModel";
import { HospitalAttachment, modelHospitalAttachment } from "./attachmentModel";
import {
	HospitalAnnouncedPriceFiles,
	modelHospitalAnnouncedPriceFiles,
} from "./announcedPriceFilesModel";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import {
	HospitalStaffContact,
	HospitalStaffContactForm,
	HospitalStaffContactGridData,
	modelHospitalStaffContact,
} from "@/modules/hospital/redux/models/hospitalStaffContactModel";

import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { HospitalHistory, modelHospitalHistory } from "./historyModel";
import {
	HospitalAnnouncedPriceDetailCategoryMaster,
	modelHospitalAnnouncedPriceDetailCategoryMaster,
} from "../../announced-price-detail-category-master/redux/model";
import {
	HospitalAnnouncedPriceDetailMaster,
	modelHospitalAnnouncedPriceDetailMaster,
} from "../../announced-price-detail-master/redux/model";
import {
	HospitalAnnouncedPriceFileUploadStatus,
	modelHospitalAnnouncedPriceFileUploadStatus,
} from "../../announced-price-file-upload-status/redux/model";
import { getCurrentYearString } from "wcf-component-lib/src/utils";

dayjs.extend(localeData);
export interface Hospital {
	grid: HospitalGrid;
	filter: HospitalFilter;
	form: HospitalForm;
	exportPages: ExportPages;
	hospitalSp7: HospitalSp7;
	hospitalSp19: HospitalSp19;
	hospitalEtcFiles: HospitalEtcFiles;
	hospitalCertificateOfIncorporationAttachment: HospitalAttachment;
	hospitalAttachmentFile1: HospitalAttachment;
	hospitalAnnouncedPriceFiles: HospitalAnnouncedPriceFiles;
	hospitalStaffContact: HospitalStaffContact;

	outsideHospitalForm: OutsideHospitalForm;
	history: HospitalHistory;

	estimateAdd: EstimateAdd;

	hospitalAnnouncedPriceDetailCategoryMaster: HospitalAnnouncedPriceDetailCategoryMaster;
	hospitalAnnouncedPriceDetailMaster: HospitalAnnouncedPriceDetailMaster;
	hospitalAnnouncedPriceFileUploadStatus: HospitalAnnouncedPriceFileUploadStatus;
}

export interface EstimateAdd {
	grid: EstimateAddGrid;
	filter: EstimateAddFilter;
	form: EstimateAddForm;
}

export interface EstimateAddGrid extends PaginationModel {
	data: EstimateAddGridData[];
}

export interface HospitalAssessmentFilesGrid {
	pagination: PaginationOptions;
	hospitalAssessmentUuid: string | null;
}

export interface BaseEstimateAddData {
	hospitalName: string;
	assessId: number;
	hospitalWcfCode: string;
	userFirstName: string;
	userLastName: string;
	email: string;
	notifyDate: string;
	visitDate: string;
	resultStatus: string;
	resultDesc: string;
	docStatus: string;
	cancelDate: string;
	status: string;
	createBy: string;
	createDate: string;
	updateBy: string;
	updateDate: string;
	refDocNo: string;
	refDocDate: string;
}

export interface EstimateAddGridData extends BaseEstimateAddData {
	noSeq: number;
}

export interface HospitalGrid extends PaginationModel {
	data: HospitalGridData[];
}

export interface HospitalGridData extends BaseMasterDataInterface {
	hospitalWcfCode: string;
	hospitalDbmsCode: string | null;
	hospitalMinistryCode: string | null;
	hospitalName: string | null;
	oldHospitalName: string | null;
	belongTo: string | null;
	numberOfBed: number;
	bps: number;
	hospitalType: string | null;
	hospitalCategory: string | null;
	companyName: string | null;
	revenueRegistrationCode: string | null;
	contractStartDate: null | string | undefined;
	contractEndDate: null | string | undefined;
	sp7StartDated: null | string | undefined;
	sp7EndDate: null | string | undefined;
	sp19StartDate: null | string | undefined;
	sp19EndDate: null | string | undefined;
	levelChangeDate: null | string | undefined;
	address: string | null;
	amphurCode: string;
	provinceCode: string;
	postalCode: string | null;
	telephoneNumber: string | null;
	faxNumber: string | null;
	ssoPartner: string | null;
	tempColumn2: string | null;
	tempColumn3: string | null;
	tempColumn4: string | null;
	tempColumn5: string | null;
	hospitalChangeNameDate: null | string | undefined;
	hospitalListBoi: string | null;
	hospitalListBoiStartDate: null | string | undefined;
	hospitalListBoiExpireDate: null | string | undefined;
	tambolCode: string | null;
	remarkChangeName: string | null;
	ssoProject: string | null;
	latitude: string;
	longitude: string;
}

export interface HospitalFilter {
	hospitalWcfCodeLike: string | null;
	hospitalDbmsCodeLike: string | null;
	hospitalMinistryCodeLike: string | null;
	hospitalNameLike: string | null;
	sp7EndDateBetween: string[] | null;
	sp19EndDateBetween: string[] | null;

	CheckHospitalWcfCode: boolean;
	CheckHospitalDbmsCode: boolean;
	CheckHospitalMinistryCode: boolean;
	CheckHospitalName: boolean;
	CheckSp7EndDate: boolean;
	CheckSp19EndDate: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetHospitalList extends HospitalFilter {
	pagination: PaginationOptions;
}

export interface ExportPages {
	med5008: {
		sp7StartDated: null | string | undefined;
		sp7EndDate: null | string | undefined;
		sp19StartDate: null | string | undefined;
		sp19EndDate: null | string | undefined;
	};
	med5009: {
		propertyCode: string;
	};
	med5007: {
		hospitalCategory: string;
		hospitalType: string;
	};
	med5012: {
		fromDate: string;
		toDate: string;
	};
}

export interface UuidDeleteList extends Array<string> {}

export interface OutsideHospitalForm {
	announcedPriceYear: string;
	sp7DeleteFileList: HospitalSp7["filter"]["uuidExclusionList"];
	sp19DeleteFileList: HospitalSp19["filter"]["uuidExclusionList"];
	etcFilesDeleteFileList: HospitalEtcFiles["filter"]["uuidExclusionList"];
	announcedPriceFilesDeleteFileList: HospitalAnnouncedPriceFiles["filter"]["uuidExclusionList"];
	hospitalStaffContactDeleteList: HospitalStaffContact["uuidDeleteList"];
	hospitalStaffContact: {
		hospitalStaffContactDeleteList: HospitalStaffContact["uuidDeleteList"];
		hospitalStaffContactAddList: HospitalStaffContactForm[];
	};
	hospitalAttachmentFile1: {
		toPreview: HospitalAttachment["toPreview"];
	};
	certificateOfIncorporation: {
		toPreview: HospitalAttachment["toPreview"];
	};
}

export interface BaseHospitalForm {
	hospitalWcfCode: string;
	hospitalDbmsCode: string;
	hospitalMinistryCode: string;
	hospitalName: string;
	oldHospitalName: string;
	belongTo: string;
	numberOfBed: number;
	bps: number;
	hospitalType: string | null;
	hospitalCategory: string | null;
	companyName: string;
	revenueRegistrationCode: string;
	contractStartDate: null | string | undefined;
	contractEndDate: null | string | undefined;
	sp7StartDated: null | string | undefined;
	sp7EndDate: null | string | undefined;
	sp19StartDate: null | string | undefined;
	sp19EndDate: null | string | undefined;
	levelChangeDate: null | string | undefined;
	address: string;
	amphurCode: string | null;
	provinceCode: string | null;
	postalCode: string | null;
	telephoneNumber: string;
	faxNumber: string;
	email: string;
	ssoPartner: string;
	tempColumn2: string;
	tempColumn3: string;
	tempColumn4: string;
	tempColumn5: string;
	hospitalChangeNameDate: null | string | undefined;
	hospitalListBoi: string;
	hospitalListBoiStartDate: null | string | undefined;
	hospitalListBoiExpireDate: null | string | undefined;
	tambolCode: string | null;
	remarkChangeName: string;
	ssoProject: string | null;
	latitude: string;
	longitude: string;
	isParticipateSso: string;
	checkIsParticipateSso: boolean;
	withholdingDateFrom: null | string | undefined;
	withholdingDateTo: null | string | undefined;
}

export interface HospitalForm
	extends BaseMasterDataInterface,
		BaseHospitalForm {
	files: {
		sp7: UploadFile<any>[];
		sp19: UploadFile<any>[];
		etcFiles: UploadFile<any>[];
		announcedPriceFiles: UploadFile<any>[];
		certificateOfIncorporation: UploadFile<any>[];
		attachmentFile1: UploadFile<any>[];
	};
}

export interface EstimateAddForm {
	cancelDate: string;
	updateDate: string;
	docStatus: string;
	is_deleted: string;
	updateBy: string;
	userLastName: string;
	visitDate: null | string | undefined;
	refDocNo: string;
	email: string;
	notifyDate: null | string | undefined;
	hospital_name: string;
	refDocDate: null | string | undefined;
	userFirstName: string;
	resultDesc: string;
	resultStatus: string;
	assessType: string;
	hospitalWcfCode: string;
	hospitalAssessmentFiles: HospitalAssessmentFiles[];
	addNewHospitalAssessmentFiles: HospitalAssessmentFiles[];
	hospitalAssessmentFilesUuidDeleteList: UuidDeleteList;
}

export interface EstimateAddFilter {
	hospitalWcfCodeLike: string | null;
	notiDateStartLike: string | null;
	notiDateEndLike: string | null;
	userFirstNameLike: string | null;
	userLastNameLike: string | null;
}

export interface GetEstimateAddList extends EstimateAddFilter {
	pagination: PaginationOptions;
}

export const modelHospitalFilter: HospitalFilter = {
	hospitalWcfCodeLike: "",
	hospitalDbmsCodeLike: "",
	hospitalMinistryCodeLike: "",
	hospitalNameLike: "",
	sp7EndDateBetween: null,
	sp19EndDateBetween: null,

	CheckHospitalWcfCode: false,
	CheckHospitalDbmsCode: false,
	CheckHospitalMinistryCode: false,
	CheckHospitalName: false,

	isActive: undefined,
	checkIsActive: false,
	CheckSp7EndDate: false,
	CheckSp19EndDate: false,
};

export interface HospitalAssessmentFiles {
	originalFileName: string;
	fileName: string;
	mimeType: string;
	docPath: string;
	docName: string;
	createBy: string;
	fileSize: number;
	attachId: number;
	assessId: number;
	fileBase64: string;
	status: string;
	sha256Hex: string;
	createDate: string;
}

export const modelEstimateAdd: EstimateAdd = {
	grid: {
		data: [],
		page: {
			orders: [],
			totalData: 10,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		hospitalWcfCodeLike: "",
		notiDateStartLike: "",
		notiDateEndLike: "",
		userFirstNameLike: "",
		userLastNameLike: "",
	},
	form: {
		// cancelDate: "",
		// updateDate: "",
		// docStatus: "",
		// is_deleted: "",
		// updateBy: "",
		// userLastName: "",
		// visitDate: "",
		// refDocNo: "",
		// email: "",
		// notifyDate: "",
		// hospital_name: "",
		// refDocDate: "",
		// userFirstName: "",
		// resultDesc: "",
		// resultStatus: "",
		cancelDate: "abcde",
		updateDate: "abcde",
		docStatus: "abcde",
		is_deleted: "abcde",
		updateBy: "abcde",
		userLastName: "abcde",
		visitDate: undefined,
		refDocNo: "abcde",
		email: "abcde",
		notifyDate: undefined,
		hospital_name: "abcde",
		refDocDate: undefined,
		userFirstName: "abcde",
		resultDesc: "abcde",
		resultStatus: "P",
		assessType: "1",
		hospitalWcfCode: "",
		hospitalAssessmentFiles: [],
		addNewHospitalAssessmentFiles: [],
		hospitalAssessmentFilesUuidDeleteList: [],
	},
};

export const modelHospital: Hospital = {
	hospitalAnnouncedPriceFileUploadStatus: {
		...modelHospitalAnnouncedPriceFileUploadStatus,
	},
	hospitalAnnouncedPriceDetailMaster: {
		...modelHospitalAnnouncedPriceDetailMaster,
	},
	hospitalAnnouncedPriceDetailCategoryMaster: {
		...modelHospitalAnnouncedPriceDetailCategoryMaster,
	},
	estimateAdd: { ...modelEstimateAdd },
	history: { ...modelHospitalHistory },
	hospitalSp7: { ...modelHospitalSp7 },
	hospitalSp19: { ...modelHospitalSp19 },
	hospitalEtcFiles: { ...modelHospitalEtcFiles },
	hospitalCertificateOfIncorporationAttachment: { ...modelHospitalAttachment },
	hospitalAttachmentFile1: { ...modelHospitalAttachment },
	hospitalAnnouncedPriceFiles: { ...modelHospitalAnnouncedPriceFiles },
	hospitalStaffContact: { ...modelHospitalStaffContact },
	outsideHospitalForm: {
		announcedPriceYear: (parseInt(getCurrentYearString()) + 543).toString(),
		sp7DeleteFileList: [],
		sp19DeleteFileList: [],
		etcFilesDeleteFileList: [],
		announcedPriceFilesDeleteFileList: [],
		hospitalStaffContactDeleteList: [],
		hospitalStaffContact: {
			hospitalStaffContactDeleteList: [],
			hospitalStaffContactAddList: [],
		},
		hospitalAttachmentFile1: {
			toPreview: [],
		},
		certificateOfIncorporation: {
			toPreview: [],
		},
	},
	grid: {
		data: [],
		page: {
			orders: [{ direction: "DESC", property: "updatedDate" }],
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: modelHospitalFilter,
	exportPages: {
		med5008: {
			sp7StartDated: "",
			sp7EndDate: "",
			sp19StartDate: "",
			sp19EndDate: "",
		},
		med5009: {
			propertyCode: "",
		},
		med5007: {
			hospitalCategory: "",
			hospitalType: "",
		},
		med5012: {
			fromDate: "",
			toDate: "",
		},
	},
	form: {
		...baseMasterDataModel,
		files: {
			sp7: [],
			sp19: [],
			etcFiles: [],
			certificateOfIncorporation: [],
			attachmentFile1: [],
			announcedPriceFiles: [],
		},
		hospitalWcfCode: "",
		hospitalDbmsCode: "",
		hospitalMinistryCode: "",
		hospitalName: "",
		oldHospitalName: "",
		belongTo: "",
		numberOfBed: 0,
		bps: 0,
		latitude: "",
		longitude: "",
		hospitalType: null,
		hospitalCategory: null,
		companyName: "",
		revenueRegistrationCode: "",
		contractStartDate: undefined,
		contractEndDate: undefined,
		sp7StartDated: undefined,
		sp7EndDate: undefined,
		sp19StartDate: undefined,
		sp19EndDate: undefined,
		levelChangeDate: undefined,
		address: "",
		amphurCode: null,
		provinceCode: null,
		postalCode: null,
		telephoneNumber: "",
		faxNumber: "",
		email: "",
		ssoPartner: "",
		tempColumn2: "",
		tempColumn3: "",
		tempColumn4: "",
		tempColumn5: "",
		hospitalChangeNameDate: undefined,
		hospitalListBoi: "",
		hospitalListBoiStartDate: undefined,
		hospitalListBoiExpireDate: undefined,
		tambolCode: null,
		remarkChangeName: "",
		ssoProject: null,
		isParticipateSso: "N",
		checkIsParticipateSso: false,
		withholdingDateFrom: undefined,
		withholdingDateTo: undefined,
	},
};
