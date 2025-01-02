import { AppDispatch } from "@/redux/config/configStore";
import type { UploadFile } from "wcf-component-lib/node_modules/antd/es/upload/interface";
import { importDoctorXlsx } from "../../service/api";
import _ from "lodash";
import { BaseToastNotification } from "wcf-component-lib/src/components";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { getTemplateDoctor } from "./api";
import { handleDownloadFile } from "@/utils";

export interface importFile {
	file: UploadFile<any>[];
	isPreview: boolean;
	page: PaginationOptions;
}

export interface PreviewDoctor {
	doctorCode: string;
	professionalCode: string;
	citizenId: string;
	titlename: string;
	firstname: string;
	lastname: string;
	doctorType: string;
	diplomaName: string;
	HospitalWcfCode: string;
	HospitalName: string;
	courseCategory: string;
	categoryDescription: string;
	phoneNumber: string;
}

export interface PreviewDoctorGrid {
	grid: PreviewDoctor[];
	page: PaginationOptions;
	errorList: string[];
}

export const handleGetTemplateDoctor = () => async (dispatch: AppDispatch) => {
	try {
		const response = await dispatch(getTemplateDoctor()).unwrap();
		handleDownloadFile(response, "template.xlsx");
	} catch (err) {
		console.error("Error downloading file:", err);
	}
};

export const handleXlsx =
	(
		params: importFile,
		previewGrid: PreviewDoctorGrid,
		setPreviewGrid: (value: PreviewDoctorGrid) => void
	) =>
	async (dispatch: AppDispatch) => {
		const data = await dispatch(importDoctorXlsx(params));
		if (!_.isEmpty(data.payload)) {
			if (params.isPreview)
				setPreviewGrid({
					...previewGrid,
					grid: data.payload.previewList.content,
					page: {
						...previewGrid.page,
						totalData: data.payload.previewList.totalElements,
					},
					errorList: data.payload.errorList,
				});
			else {
				BaseToastNotification({
					type: "success",
					message: "อัปโหลดข้อมูลเรียบร้อย",
					description: "อัปโหลดข้อมูลเรียบร้อย",
				});
			}
		}
	};
