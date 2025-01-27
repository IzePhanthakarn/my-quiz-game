import { createSlice } from "@reduxjs/toolkit";
import { modelHospital } from "./models/hospitalModel";
import { hospitalReducers } from "./reducer";

export const hospitalSlice = createSlice({
	name: "Hospital",
	initialState: modelHospital,
	reducers: {
		...hospitalReducers,
	},
});

export const {
	setHospital,
	setHospitalForm,
	setHospitalGrid,
	setHospitalFilter,
	setHospitalPagination,
	setExportPages,
	setHospitalSp7Grid,
	setHospitalSp19Grid,
	setHospitalEtcFilesGrid,
	setHospitalCertificateOfIncorporationAttachmentGrid,
	setHospitalAttachmentFile1Grid,
	setHospitalAttachmentFile1ToPreview,
	setHospitalCertificateOfIncorporationAttachmentToPreview,
	setHospitalAnnouncedPriceFilesGrid,
	setOutsideHospitalForm,
	setHospitalSp7,
	setHospitalSp19,
	setHospitalEtcFiles,
	setHospitalAnnouncedPriceFiles,
	setHospitalCertificateOfIncorporationAttachment,
	setHospitalAttachmentFile1,
	setHospitalStaffContact,
	setHospitalHistory,
	setHospitalAnnouncedPriceDetailCategoryMasterForm,
	setHospitalAnnouncedPriceDetailCategoryMasterGrid,
	setHospitalAnnouncedPriceDetailCategoryMasterFilter,
	setHospitalAnnouncedPriceDetailCategoryMasterPagination,
	setHospitalAnnouncedPriceDetailMasterForm,
	setHospitalAnnouncedPriceDetailMasterGrid,
	setHospitalAnnouncedPriceDetailMasterFilter,
	setHospitalAnnouncedPriceDetailMasterPagination,
	setHospitalAnnouncedPriceFileUploadStatusGrid,
	setHospitalAnnouncedPriceFileUploadStatusFilter,
	setHospitalEstimateAddGrid,
	setHospitalEstimateAddForm,
	setHospitalEstimateAdd,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;
