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

		// console.log("🚀 ~ actionResult.payload:", actionResult.payload);
		console.log("🚀 ~ 11", _.get(actionResult.payload, "url"));

		const { url, fileName } = actionResult.payload;
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName;
		link.click();

		// Clean up URL object
		window.URL.revokeObjectURL(url);
	};
