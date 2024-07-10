import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../slices/crud";
import clinicSlice from "../../modules/clinic/redux";
import doctorSlice from "@/modules/doctor/redux";
import drawerSlice from "@/components/BaseDrawer/redux";
import dialogSlice from "@/components/BaseDialog/redux";
import loadingSlice from "@/components/Loading/redux";
import diplomaSlice from "@/modules/diploma/redux";
import organSlice from "@/modules/organ/redux";
import courseSlice from "@/modules/course/redux";
import loginSlice from "@/modules/login/redux";

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
		course: courseSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
