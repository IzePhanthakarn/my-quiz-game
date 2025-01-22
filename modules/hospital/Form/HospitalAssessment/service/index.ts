import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import {
	EstimateAdd,
	EstimateAddFilter,
	EstimateAddForm,
} from "../../../redux/models/hospitalModel";
import {
	getHospitalEstimateDetail,
	getHospitalEstimateList,
	insertHospitalAssessmentApi,
	updateHospitalAssessmentApi,
} from "./api";
import {
	setHospitalEstimateAddForm,
	setHospitalEstimateAddGrid,
} from "@/modules/hospital/redux";
import { convertDateFormatBuddhist } from "wcf-component-lib/src/utils/dayjsThai";
import { DateFormatBuddhist } from "wcf-component-lib/src/constants/date-format.constant";

export const fetchHospitalEstimateList =
	(filter: EstimateAddFilter) => async (dispatch: AppDispatch) => {
		console.log("🚀 ~ filter:", filter);
		dispatch(setIsLoading(true));
		const body: EstimateAddFilter = {
			...filter,
			hospitalWCFCodeLike: _.isEmpty(filter.hospitalWCFCodeLike)
				? null
				: filter.hospitalWCFCodeLike,
			notiDateStartLike: _.isEmpty(filter.notiDateStartLike)
				? null
				: filter.notiDateStartLike,
			notiDateEndLike: _.isEmpty(filter.notiDateEndLike)
				? null
				: filter.notiDateEndLike,
			userFirstNameLike: _.isEmpty(filter.userFirstNameLike)
				? null
				: filter.userFirstNameLike,
			userLastNameLike: _.isEmpty(filter.userLastNameLike)
				? null
				: filter.userLastNameLike,
		};
		const result = await dispatch(getHospitalEstimateList(filter));
		dispatch(setIsLoading(false));
		if (_.get(result, "error.message") === "Rejected") return;
		// console.log("🚀 ~ result:", result);
		// console.log("🚀 ~ result.payload.content:", result.payload.content);

		dispatch(
			setHospitalEstimateAddGrid({
				data: result.payload.content,
				page: {
					totalData: result.payload.totalRecords,
					pageNumber: result.payload.currentPageNumber - 1,
					pageSize: result.payload.pageSize,
				},
			})
		);
	};

export const fetchHospitalEstimateDetail =
	(params: HospitalAssessmentPageProps) => async (dispatch: AppDispatch) => {
		console.log("🚀 ~ params:", params);

		const { uuid } = params?.params;
		if (!_.isEmpty(uuid)) {
			dispatch(setIsLoading(true));
			const result = await dispatch(getHospitalEstimateDetail(`${uuid}`));
			dispatch(setIsLoading(false));
			if (_.get(result, "error.message") === "Rejected") return;

			dispatch(
				setHospitalEstimateAddForm({
					...result.payload,
					// refDocDate: convertDateFormatBuddhist(
					// 	result.payload.refDocDate,
					// 	DateFormatBuddhist.DDMMBBBB
					// ),
					// notifyDate: convertDateFormatBuddhist(
					// 	result.payload.notifyDate,
					// 	DateFormatBuddhist.DDMMBBBB
					// ),
					// visitDate: convertDateFormatBuddhist(
					// 	result.payload.visitDate,
					// 	DateFormatBuddhist.DDMMBBBB
					// ),
				})
			);
		}
	};

export const handleDownloadBase64File = (content: string) => {
	// Replace this with your base64 string
	const base64Image = content;

	// Convert the base64 string to a Blob
	const blob = new Blob([atob(base64Image.split(",")[1])], {
		type: "image/png",
	});

	// Create a URL for the Blob
	const url = URL.createObjectURL(blob);

	// Create an <a> element and trigger the download
	const a = document.createElement("a");
	a.href = url;
	a.download = "image.png"; // Specify the file name
	document.body.appendChild(a); // Append the element to the DOM
	a.click(); // Trigger the click event
	document.body.removeChild(a); // Clean up after the download

	// Revoke the Blob URL to free up resources
	URL.revokeObjectURL(url);
};

export const insertHospitalAssessment =
	(form: EstimateAddForm) => async (dispatch: AppDispatch) => {
		console.log("🚀 ~ form:", form);
		const data = await dispatch(insertHospitalAssessmentApi(form));
		console.log("🚀 ~ data:", data);
	};

export const updateHospitalAssessment =
	(uuid: string, form: EstimateAddForm) => async (dispatch: AppDispatch) => {
		console.log("🚀 ~ form:", form);
		const data = await dispatch(
			updateHospitalAssessmentApi({
				form: form,
				uuid: uuid,
			})
		);
		console.log("🚀 ~ data:", data);
	};
