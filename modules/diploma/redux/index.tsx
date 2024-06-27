import { createSlice } from "@reduxjs/toolkit";
import { modelDiploma } from "./model";
import { diplomaReducers } from "./master/reducers";

export const diplomaSlice = createSlice({
	name: "Diploma",
	initialState: modelDiploma,
	reducers: { ...diplomaReducers },
});

export const { setClinicGrid, setOrder, setPagination, setTotalData } =
	diplomaSlice.actions;

export default diplomaSlice.reducer;
