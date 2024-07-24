import { AppDispatch } from "@/redux/config/configStore";
import { minioDownload, minioUpload, minioUploadMultiple } from "./api";
import _ from "lodash";

export const handleUploadMultipleMinIO =
	(selectedFiles: File[]) => async (dispatch: AppDispatch) => {
		const formData = new FormData();
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append("files", selectedFiles[i]);
		}
		formData.append("subfolder", "/test1/test2/test3/test4/");
		await dispatch(minioUploadMultiple(formData));
	};

export const handleUploadMinIO =
	(file: File | null) => async (dispatch: AppDispatch) => {
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("subfolder", "/test1/test2/test3/test4/");
			await dispatch(minioUpload(formData));
		} else {
			console.error("No file selected");
		}
	};

export const handleDownloadMinIO =
	(fileNameToDownload: string) => async (dispatch: AppDispatch) => {
		const actionResult = await dispatch(minioDownload(fileNameToDownload));
		if (_.get(actionResult, "error.message") === "Rejected") {
			throw new Error("File download failed");
		}

		const link = document.createElement("a");
		link.href = `${_.get(actionResult.payload, "url")}`;
		link.download = `${_.get(actionResult.payload, "fileName")}`;
		link.click();

		window.URL.revokeObjectURL(`${_.get(actionResult.payload, "url")}`);
	};
