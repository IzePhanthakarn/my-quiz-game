import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../slices/crud";
import clinicSlice from "../../modules/clinic/redux";
import doctorSlice from "@/modules/doctor/redux";
import dialogSlice from "@/redux/slices/dialog";
import containerSlice from "@/redux/slices/container";
import diplomaSlice from "@/modules/diploma/redux";
import organSystemWpiSlice from "@/modules/organ-system-wpi/redux";
import courseCategorySlice from "@/modules/course-category/redux";
import courseOrganSystemGroupSlice from "@/modules/course-organ-system-group/redux";
import minIOSlice from "@/modules/minio/redux";
import courseCertificateSlice from "@/modules/course-certificate/redux";
import loginSlice from "@/modules/login/redux";
import drawerSlice from "../slices/drawer";
import medicalAmountSlice from "@/modules/medical-amount/redux";
import ltPropertiesSlice from "@/modules/lt-properties/redux";
import hospitalSlice from "@/modules/hospital/redux";
import documentSlice from "@/modules/document/redux";
import requestFormSlice from "@/modules/request-form/redux";
import medReportSlice from "@/modules/report/redux";

export const store = configureStore({
	reducer: {
		crud: crudSlice,
		clinic: clinicSlice,
		drawer: drawerSlice,
		dialog: dialogSlice,
		container: containerSlice,
		login: loginSlice,
		diploma: diplomaSlice,
		organSystemWpi: organSystemWpiSlice,
		courseCategory: courseCategorySlice,
		courseCertificate: courseCertificateSlice,
		courseOrganSystemGroup: courseOrganSystemGroupSlice,
		minIO: minIOSlice,
		medicalAmount: medicalAmountSlice,
		ltProperties: ltPropertiesSlice,
		hospital: hospitalSlice,
		doctor: doctorSlice,
		document: documentSlice,
		requestForm: requestFormSlice,
		medReport: medReportSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
