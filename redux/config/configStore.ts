import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../slices/crud";
import clinicSlice from "../../modules/clinic/redux";
import doctorSlice from "@/modules/doctor/redux";
import dialogSlice from "@/redux/slices/dialog";
import loadingSlice from "@/components/Loading/redux";
import diplomaSlice from "@/modules/diploma/redux";
import organSystemWpiSlice from "@/modules/organ-system-wpi/redux";
import courseCategorySlice from "@/modules/course-category/redux";
import courseOrganSystemGroupSlice from "@/modules/course-organ-system-group/redux";
import courseCertificateSlice from "@/modules/course-certificate/redux";
import loginSlice from "@/modules/login/redux";
import drawerSlice from "../slices/drawer";

export const store = configureStore({
	reducer: {
		crud: crudSlice,
		clinic: clinicSlice,
		doctor: doctorSlice,
		drawer: drawerSlice,
		dialog: dialogSlice,
		loading: loadingSlice,
		login: loginSlice,
		diploma: diplomaSlice,
		organSystemWpi: organSystemWpiSlice,
		courseCategory: courseCategorySlice,
		courseCertificate: courseCertificateSlice,
		courseOrganSystemGroup: courseOrganSystemGroupSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
