import { AppDispatch } from "@/redux/config/configStore";
import { minioDownload, minioUpload } from "./api";
import _ from "lodash";

export const handleUploadMinIO =
	(file: File | null) => async (dispatch: AppDispatch) => {
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			await dispatch(minioUpload(formData));
		} else {
			console.error("No file selected");
		}
	};

export const handleDownloadMinIO =
	(fileNameToDownload: string) => async (dispatch: AppDispatch) => {
		const actionResult = await dispatch(minioDownload(fileNameToDownload));

		if (_.get(actionResult.payload, "error.message") === "Rejected") {
			throw new Error("File download failed");
		}

		const link = document.createElement("a");
		link.href = `${_.get(actionResult.payload, "url")}`;
		link.download = `${_.get(actionResult.payload, "fileName")}`;
		link.click();

		window.URL.revokeObjectURL(`${_.get(actionResult.payload, "url")}`);
	};
