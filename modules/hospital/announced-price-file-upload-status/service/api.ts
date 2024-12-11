import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import API_PATH from "@/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { GetHospitalAnnouncedPriceFileUploadStatusList } from "../redux/model";

export const getHospitalAnnouncedPriceFileUploadStatusList = createAsyncThunk(
	"Medical/getHospitalAnnouncedPriceFileUploadStatusList",
	async (body: GetHospitalAnnouncedPriceFileUploadStatusList, thunkAPI) => {
		try {
			const apiPath = `${API_PATH.HOSPITAL.ANNOUNCED_PRICE.ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.GET_LIST}`;
			const response = await axios.post(apiPath, body);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
