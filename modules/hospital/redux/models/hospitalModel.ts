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

import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
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

	outsideHospitalForm: OutsideHospitalForm;
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

	CheckHospitalWcfCode: boolean;
	CheckHospitalDbmsCode: boolean;
	CheckHospitalMinistryCode: boolean;
	CheckHospitalName: boolean;

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
	med5012: {
		fromDate: string;
		toDate: string;
	};
}

export interface OutsideHospitalForm {
	announcedPriceYear: string;
}

export interface HospitalForm extends BaseMasterDataInterface {
	files: {
		sp7: UploadFile<any>[];
		sp19: UploadFile<any>[];
		etcFiles: UploadFile<any>[];
		announcedPriceFiles: UploadFile<any>[];
		certificateOfIncorporation: UploadFile<any>[];
		attachmentFile1: UploadFile<any>[];
	};
	hospitalWcfCode: string;
	hospitalDbmsCode: string;
	hospitalMinistryCode: string;
	hospitalName: string;
	oldHospitalName: string;
	belongTo: string;
	numberOfBed: number;
	bps: number;
	hospitalType: string;
	hospitalCategory: string;
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
	amphurCode: string;
	provinceCode: string;
	postalCode: string;
	telephoneNumber: string;
	faxNumber: string;
	ssoPartner: string;
	tempColumn2: string;
	tempColumn3: string;
	tempColumn4: string;
	tempColumn5: string;
	hospitalChangeNameDate: null | string | undefined;
	hospitalListBoi: string;
	hospitalListBoiStartDate: null | string | undefined;
	hospitalListBoiExpireDate: null | string | undefined;
	tambolCode: string;
	remarkChangeName: string;
	ssoProject: string;
	latitude: string;
	longitude: string;
}

export const modelHospital: Hospital = {
	hospitalSp7: { ...modelHospitalSp7 },
	hospitalSp19: { ...modelHospitalSp19 },
	hospitalEtcFiles: { ...modelHospitalEtcFiles },
	hospitalCertificateOfIncorporationAttachment: { ...modelHospitalAttachment },
	hospitalAttachmentFile1: { ...modelHospitalAttachment },
	hospitalAnnouncedPriceFiles: { ...modelHospitalAnnouncedPriceFiles },
	outsideHospitalForm: {
		announcedPriceYear: dayjs().format(DateFormat.YYYY).toString(),
	},
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		hospitalWcfCodeLike: "",
		hospitalDbmsCodeLike: "",
		hospitalMinistryCodeLike: "",
		hospitalNameLike: "",

		CheckHospitalWcfCode: false,
		CheckHospitalDbmsCode: false,
		CheckHospitalMinistryCode: false,
		CheckHospitalName: false,

		isActive: undefined,
		checkIsActive: false,
	},
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
		hospitalType: "",
		hospitalCategory: "",
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
		amphurCode: "",
		provinceCode: "",
		postalCode: "",
		telephoneNumber: "",
		faxNumber: "",
		ssoPartner: "",
		tempColumn2: "",
		tempColumn3: "",
		tempColumn4: "",
		tempColumn5: "",
		hospitalChangeNameDate: undefined,
		hospitalListBoi: "",
		hospitalListBoiStartDate: undefined,
		hospitalListBoiExpireDate: undefined,
		tambolCode: "",
		remarkChangeName: "",
		ssoProject: "",
	},
};
