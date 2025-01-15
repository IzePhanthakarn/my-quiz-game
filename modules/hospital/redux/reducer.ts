import { PayloadAction } from "@reduxjs/toolkit";
import {
	HospitalForm,
	HospitalGrid,
	HospitalFilter,
	Hospital,
	ExportPages,
	EstimateAddGrid,
	EstimateAdd,
	EstimateAddForm,
} from "./models/hospitalModel";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import {
	HospitalSp7,
	HospitalSp7Grid,
} from "@/modules/hospital/redux/models/sp7Model";
import {
	HospitalSp19,
	HospitalSp19Grid,
} from "@/modules/hospital/redux/models/sp19Model";
import { HospitalEtcFiles, HospitalEtcFilesGrid } from "./models/etcFilesModel";
import {
	HospitalAttachment,
	HospitalAttachmentGrid,
} from "./models/attachmentModel";
import {
	HospitalAnnouncedPriceFiles,
	HospitalAnnouncedPriceFilesGrid,
} from "./models/announcedPriceFilesModel";
import { HospitalStaffContact } from "./models/hospitalStaffContactModel";
import {
	HospitalAnnouncedPriceDetailCategoryMaster,
	HospitalAnnouncedPriceDetailCategoryMasterFilter,
	HospitalAnnouncedPriceDetailCategoryMasterForm,
	HospitalAnnouncedPriceDetailCategoryMasterGrid,
} from "../announced-price-detail-category-master/redux/model";
export const hospitalReducers = {
	setHospital: (state: Hospital, action: PayloadAction<Hospital>) => {
		state = action.payload;
	},
	setHospitalGrid: (state: Hospital, action: PayloadAction<HospitalGrid>) => {
		state.grid = action.payload;
	},
	setHospitalFilter: (
		state: Hospital,
		action: PayloadAction<HospitalFilter>
	) => {
		state.filter = action.payload;
	},
	setHospitalForm: (state: Hospital, action: PayloadAction<HospitalForm>) => {
		state.form = action.payload;
	},
	setHospitalPagination: (
		state: Hospital,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
	setExportPages: (
		state: Hospital,
		action: PayloadAction<{
			key: keyof ExportPages;
			value: ExportPages[keyof ExportPages];
		}>
	) => {
		state.exportPages = {
			...state.exportPages,
			[action.payload.key]: action.payload.value,
		};
	},
	setHospitalSp7Grid: (
		state: Hospital,
		action: PayloadAction<HospitalSp7Grid>
	) => {
		state.hospitalSp7.grid = action.payload;
	},
	setHospitalSp7: (state: Hospital, action: PayloadAction<HospitalSp7>) => {
		state.hospitalSp7 = action.payload;
	},
	setHospitalSp19Grid: (
		state: Hospital,
		action: PayloadAction<HospitalSp19Grid>
	) => {
		state.hospitalSp19.grid = action.payload;
	},
	setHospitalSp19: (state: Hospital, action: PayloadAction<HospitalSp19>) => {
		state.hospitalSp19 = action.payload;
	},
	setHospitalEtcFilesGrid: (
		state: Hospital,
		action: PayloadAction<HospitalEtcFilesGrid>
	) => {
		state.hospitalEtcFiles.grid = action.payload;
	},
	setHospitalEtcFiles: (
		state: Hospital,
		action: PayloadAction<HospitalEtcFiles>
	) => {
		state.hospitalEtcFiles = action.payload;
	},
	setHospitalCertificateOfIncorporationAttachment: (
		state: Hospital,
		action: PayloadAction<HospitalAttachment>
	) => {
		state.hospitalCertificateOfIncorporationAttachment = action.payload;
	},
	setHospitalCertificateOfIncorporationAttachmentGrid: (
		state: Hospital,
		action: PayloadAction<HospitalAttachmentGrid>
	) => {
		state.hospitalCertificateOfIncorporationAttachment.grid = action.payload;
	},
	setHospitalCertificateOfIncorporationAttachmentToPreview: (
		state: Hospital,
		action: PayloadAction<HospitalAttachment["toPreview"]>
	) => {
		state.hospitalCertificateOfIncorporationAttachment.toPreview =
			action.payload;
	},
	setHospitalAttachmentFile1: (
		state: Hospital,
		action: PayloadAction<HospitalAttachment>
	) => {
		state.hospitalAttachmentFile1 = action.payload;
	},
	setHospitalAttachmentFile1Grid: (
		state: Hospital,
		action: PayloadAction<HospitalAttachmentGrid>
	) => {
		state.hospitalAttachmentFile1.grid = action.payload;
	},
	setHospitalAttachmentFile1ToPreview: (
		state: Hospital,
		action: PayloadAction<HospitalAttachment["toPreview"]>
	) => {
		state.hospitalAttachmentFile1.toPreview = action.payload;
	},
	setHospitalAnnouncedPriceFilesGrid: (
		state: Hospital,
		action: PayloadAction<HospitalAnnouncedPriceFilesGrid>
	) => {
		state.hospitalAnnouncedPriceFiles.grid = action.payload;
	},
	setHospitalAnnouncedPriceFiles: (
		state: Hospital,
		action: PayloadAction<HospitalAnnouncedPriceFiles>
	) => {
		state.hospitalAnnouncedPriceFiles = action.payload;
	},
	setHospitalStaffContact: (
		state: Hospital,
		action: PayloadAction<HospitalStaffContact>
	) => {
		state.hospitalStaffContact = action.payload;
	},
	setOutsideHospitalForm: (
		state: Hospital,
		action: PayloadAction<Hospital["outsideHospitalForm"]>
	) => {
		state.outsideHospitalForm = action.payload;
	},

	setHospitalHistory: (
		state: Hospital,
		action: PayloadAction<Hospital["history"]>
	) => {
		state.history = action.payload;
	},

	setHospitalAnnouncedPriceDetailCategoryMasterGrid: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceDetailCategoryMaster"]["grid"]
		>
	) => {
		state.hospitalAnnouncedPriceDetailCategoryMaster.grid = action.payload;
	},
	setHospitalAnnouncedPriceDetailCategoryMasterFilter: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceDetailCategoryMaster"]["filter"]
		>
	) => {
		state.hospitalAnnouncedPriceDetailCategoryMaster.filter = action.payload;
	},
	setHospitalAnnouncedPriceDetailCategoryMasterForm: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceDetailCategoryMaster"]["form"]
		>
	) => {
		state.hospitalAnnouncedPriceDetailCategoryMaster.form = action.payload;
	},
	setHospitalAnnouncedPriceDetailCategoryMasterPagination: (
		state: Hospital,
		action: PayloadAction<PaginationOptions>
	) => {
		state.hospitalAnnouncedPriceDetailCategoryMaster.grid.page = {
			...action.payload,
		};
	},

	setHospitalAnnouncedPriceDetailMasterGrid: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceDetailMaster"]["grid"]
		>
	) => {
		state.hospitalAnnouncedPriceDetailMaster.grid = action.payload;
	},
	setHospitalAnnouncedPriceDetailMasterFilter: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceDetailMaster"]["filter"]
		>
	) => {
		state.hospitalAnnouncedPriceDetailMaster.filter = action.payload;
	},
	setHospitalAnnouncedPriceDetailMasterForm: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceDetailMaster"]["form"]
		>
	) => {
		state.hospitalAnnouncedPriceDetailMaster.form = action.payload;
	},
	setHospitalAnnouncedPriceDetailMasterPagination: (
		state: Hospital,
		action: PayloadAction<PaginationOptions>
	) => {
		state.hospitalAnnouncedPriceDetailMaster.grid.page = {
			...action.payload,
		};
	},

	setHospitalAnnouncedPriceFileUploadStatusGrid: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceFileUploadStatus"]["grid"]
		>
	) => {
		state.hospitalAnnouncedPriceFileUploadStatus.grid = action.payload;
	},
	setHospitalAnnouncedPriceFileUploadStatusFilter: (
		state: Hospital,
		action: PayloadAction<
			Hospital["hospitalAnnouncedPriceFileUploadStatus"]["filter"]
		>
	) => {
		state.hospitalAnnouncedPriceFileUploadStatus.filter = action.payload;
	},
	setHospitalEstimateAddGrid: (
		state: Hospital,
		action: PayloadAction<EstimateAddGrid>
	) => {
		state.estimateAdd.grid = action.payload;
	},
	setHospitalEstimateAddForm: (
		state: Hospital,
		action: PayloadAction<EstimateAddForm>
	) => {
		state.estimateAdd.form = action.payload;
	},
};
