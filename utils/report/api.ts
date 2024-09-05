import { createAsyncThunk } from "@reduxjs/toolkit";
import API_PATH from "@/constants/api";
import axiosReport from "./axiosReport";

export interface ExportReportsParams {
	body: any;
	reportName: string;
}

export const exportExcelMed = createAsyncThunk(
	"Medical/exportExcel",
	async (params: any, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.REPORT_EXCEL}/${params.reportName}`;
			const response = await axiosReport.post(apiPath, params.body, {
				responseType: "arraybuffer",
			});
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const exportPdfMed = createAsyncThunk(
	"Medical/exportPdf",
	async (params: any, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.REPORT_PDF}/${params.reportName}`;
			const response = await axiosReport.post(apiPath, params.body, {
				responseType: "arraybuffer",
			});
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
