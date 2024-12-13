import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { getHospitalAnnouncedPriceFileUploadStatusList } from "./api";

import {
	HospitalAnnouncedPriceFileUploadStatus,
	GetHospitalAnnouncedPriceFileUploadStatusList,
} from "@/modules/hospital/announced-price-file-upload-status/redux/model";

import { setHospitalAnnouncedPriceFileUploadStatusGrid } from "../../redux";

export const fetchCourseList =
	(course: HospitalAnnouncedPriceFileUploadStatus) =>
	async (dispatch: AppDispatch) => {
		const body: GetHospitalAnnouncedPriceFileUploadStatusList = {
			pagination: { ...course.grid.page },
			...course.filter,
		};
		dispatch(setIsLoading(true));
		const result = await dispatch(
			getHospitalAnnouncedPriceFileUploadStatusList(body)
		);
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		dispatch(
			setHospitalAnnouncedPriceFileUploadStatusGrid({
				data: result.payload.content,
				page: {
					...course.grid.page,
					totalData: result.payload.totalElements,
				},
			})
		);
	};

export const handleDownloadTextFile = (content: string) => {
	const blob = new Blob([content], { type: "text/plain" }); // Create a Blob object
	const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob

	// Create an anchor element to trigger the download
	const link = document.createElement("a");
	link.href = url;
	link.download = "error_reason.txt"; // Name of the downloaded file
	link.click(); // Trigger the download

	// Clean up the temporary URL
	URL.revokeObjectURL(url);
};
