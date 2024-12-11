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
