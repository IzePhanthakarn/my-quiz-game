import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { HospitalForm } from "../../../redux/models/hospitalModel";
import { FetchHospitalHistory } from "../../../redux/models/historyModel";

export const fetchHospitalHistory = createAsyncThunk(
	"Hospital/History/fetchHospitalHistory",
	async (
		body: {
			body: FetchHospitalHistory;
			uuid: HospitalForm["uuid"];
		},
		thunkAPI
	) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.HISTORY.COMPARE_VERSION}/${body.uuid}`;
			const response = await axios.post(apiPath, body.body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
