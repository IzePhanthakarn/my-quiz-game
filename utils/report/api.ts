import { createAsyncThunk } from "@reduxjs/toolkit";
import API_PATH from "@/constants/api";
import axiosReport from "./axiosReport";
import axiosCMPReport from "./axiosCMPReport";

export interface ExportReportsParams {
	body: any;
	reportName: string;
}

export interface PreviewReportsParams {
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

export const previewMed = createAsyncThunk(
	"Medical/previewMed",
	async (params: PreviewReportsParams, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.REPORT_LIST}/${params.reportName}`;
			const response = await axiosReport.post(apiPath, params.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const exportExcelCMP = createAsyncThunk(
	"Medical/exportExcelCMP",
	async (params: any, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.REPORT_EXCEL}/${params.reportName}`;
			const response = await axiosCMPReport.post(apiPath, params.body, {
				responseType: "arraybuffer",
			});
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);

export const exportPdfCMP = createAsyncThunk(
	"Medical/exportPdfCMP",
	async (params: any, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.REPORT_PDF}/${params.reportName}`;
			const response = await axiosCMPReport.post(apiPath, params.body, {
				responseType: "arraybuffer",
			});
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
export const previewCMP = createAsyncThunk(
	"Medical/previewCMP",
	async (params: PreviewReportsParams, thunkAPi) => {
		try {
			const apiPath = `${API_PATH.REPORT_LIST}/${params.reportName}`;
			const response = await axiosCMPReport.post(apiPath, params.body);
			return response.data;
		} catch (err) {
			return thunkAPi.rejectWithValue("");
		}
	}
);
