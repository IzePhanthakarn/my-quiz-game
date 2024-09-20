import { PayloadAction } from "@reduxjs/toolkit";
import {
	HospitalForm,
	HospitalGrid,
	HospitalFilter,
	Hospital,
	ExportPages,
} from "./models/hospitalModel";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import {
	HospitalSp7,
	HospitalSp7Grid,
	HospitalSp7GridFilter,
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
	setOutsideHospitalForm: (
		state: Hospital,
		action: PayloadAction<Hospital["outsideHospitalForm"]>
	) => {
		state.outsideHospitalForm = action.payload;
	},
};
