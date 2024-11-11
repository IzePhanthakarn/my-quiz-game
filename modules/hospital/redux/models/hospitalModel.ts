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
}

export interface EstimateAdd {
	grid: EstimateAddGrid;
	filter: EstimateAddFilter;
	form: EstimateAddForm;
}

export interface EstimateAddGrid extends PaginationModel {
	data: EstimateAddGridData[];
}

export interface BaseEstimateAddData {
	name: string;
	lastName: string;
	email: string;
	hospitalName: string;
	reportDate: string;
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

export interface EstimateAddForm extends BaseEstimateAddData {
	type: string;
	referenceNumber: string;
	atDate: string;
	checkDate: string;
	result: string;
	detail: string;
	files: {
		noSeq: number;
		name: string;
		link: string;
		detail: string;
	}[];
}

export interface EstimateAddFilter {
	name: string;
	lastName: string;
	hospitalName: string;
	reportDateFrom: string;
	reportDateTo: string;
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

export const modelEstimateAdd: EstimateAdd = {
	grid: {
		data: [
			{
				noSeq: 1,
				name: "อนุชา",
				lastName: "คีรีวัล",
				email: "anu12345@gmail.com",
				hospitalName: "คลินิกเวชกรรมจุฬารัตน์โรงเกลือ",
				reportDate: "21/07/2567",
			},

			{
				noSeq: 2,
				name: "อนุชา",
				lastName: "คีรีวัล",
				email: "anu12345@gmail.com",
				hospitalName: "คลินิกเวชกรรมจุฬารัตน์โรงเกลือ",
				reportDate: "21/07/2567",
			},
			{
				noSeq: 3,
				name: "อนุชา",
				lastName: "คีรีวัล",
				email: "anu12345@gmail.com",
				hospitalName: "คลินิกเวชกรรมจุฬารัตน์โรงเกลือ",
				reportDate: "21/07/2567",
			},
			{
				noSeq: 4,
				name: "อนุชา",
				lastName: "คีรีวัล",
				email: "anu12345@gmail.com",
				hospitalName: "คลินิกเวชกรรมจุฬารัตน์โรงเกลือ",
				reportDate: "21/07/2567",
			},
		],
		page: {
			orders: [],
			totalData: 10,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		name: "",
		lastName: "",
		hospitalName: "",
		reportDateFrom: "",
		reportDateTo: "",
	},
	form: {
		hospitalName: "คลินิกเวชกรรมจุฬารัตน์โรงเกลือ",
		type: "ตรวจแนะนำ",
		name: "อนุชา",
		lastName: "คีรีวัล",
		email: "anu12345@gmail.com",
		referenceNumber: "rv/254",
		atDate: "10/10/2564",
		reportDate: "10/10/2564",
		checkDate: "10/10/2564",
		result: "ผ่านเกณฑ์",
		detail: "test",
		files: [
			{
				noSeq: 1,
				name: "Clinic_Evaluate_Jularut.pdf",
				link: "##",
				detail: "รายละเอียดการประเมิณและข้อมูลต่างๆ",
			},
			{
				noSeq: 2,
				name: "Clinic_Evaluate_Jularut2.pdf",
				link: "##",
				detail: "รายละเอียดการประเมิณและข้อมูลต่างๆ 2",
			},
		],
	},
};

export const modelHospital: Hospital = {
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
		announcedPriceYear: dayjs().format(DateFormat.YYYY).toString(),
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
