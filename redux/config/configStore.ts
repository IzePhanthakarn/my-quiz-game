import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../slices/crud";
import clinicSlice from "../../modules/clinic/redux";
import doctorSlice from "@/modules/doctor/redux";
import dialogSlice from "@/redux/slices/dialog";
import loadingSlice from "@/components/Loading/redux";
import diplomaSlice from "@/modules/diploma/redux";
import organSlice from "@/modules/organ/redux";
import courseCategorySlice from "@/modules/course-category/redux";
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
		organ: organSlice,
		courseCategory: courseCategorySlice,
		courseCertificate: courseCertificateSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
