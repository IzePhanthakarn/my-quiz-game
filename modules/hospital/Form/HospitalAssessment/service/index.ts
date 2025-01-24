import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import {
	EstimateAdd,
	EstimateAddFilter,
	EstimateAddForm,
	HospitalAssessmentFiles,
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
import { setDialog, setIsOpenBaseConfirmDialog } from "@/redux/slices/dialog";

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

export const setHospitalAssessmentFileDelete =
	(estimateAddForm: EstimateAddForm, fileNameToDelete: string, uuid: string) =>
	async (dispatch: AppDispatch) => {
		console.log("🚀 ~ estimateAdd:", estimateAddForm, fileNameToDelete);

		const updatedHospitalAssessmentFiles = _.filter(
			estimateAddForm.hospitalAssessmentFiles,
			(item) => item.originalFileName !== fileNameToDelete
		);
		const updatedAddNewHospitalAssessmentFiles = _.filter(
			estimateAddForm.addNewHospitalAssessmentFiles,
			(item) => item.originalFileName !== fileNameToDelete
		);
		const findObject = estimateAddForm.hospitalAssessmentFiles.find(
			(item) => item.originalFileName === fileNameToDelete
		);
		// console.log("🚀 ~ findObject:", findObject);
		const uuidDeleteList = estimateAddForm.hospitalAssessmentFilesUuidDeleteList
			? _.cloneDeep(estimateAddForm.hospitalAssessmentFilesUuidDeleteList)
			: [];

		if (findObject && findObject?.createDate !== "") {
			uuidDeleteList.push(uuid);
		}
		// console.log("🚀 ~ updatedArray:", updatedHospitalAssessmentFiles);
		// console.log("🚀 ~ updatedArray:", updatedAddNewHospitalAssessmentFiles);

		dispatch(
			setHospitalEstimateAddForm({
				...estimateAddForm,
				hospitalAssessmentFiles: updatedHospitalAssessmentFiles,
				addNewHospitalAssessmentFiles: updatedAddNewHospitalAssessmentFiles,
				hospitalAssessmentFilesUuidDeleteList: uuidDeleteList,
			})
		);

		dispatch(setIsOpenBaseConfirmDialog(false));
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

			let updatedHospitalAssessmentFiles: HospitalAssessmentFiles[] = [];
			if (
				result.payload.hospitalAssessmentFiles &&
				!_.isEmpty(result.payload.hospitalAssessmentFiles)
			) {
				updatedHospitalAssessmentFiles = _.filter(
					result.payload.hospitalAssessmentFiles,
					(item) => item.isActive !== "N"
				);
			}

			dispatch(
				setHospitalEstimateAddForm({
					...result.payload,
					hospitalAssessmentFiles: updatedHospitalAssessmentFiles,
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

export const handleDownloadBase64File = (content: string, fileName: string) => {
	try {
		// Extract the base64 data and MIME type
		const [metadata, base64Data] = content.split(",");
		if (!base64Data) {
			throw new Error("Invalid base64 data");
		}
		const mimeType =
			metadata.match(/:(.*?);/)?.[1] || "application/octet-stream";

		// Decode base64 safely to a binary format
		const binaryString = atob(base64Data);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}

		// Create a Blob from the binary data
		const blob = new Blob([bytes], { type: mimeType });

		// Create a URL for the Blob
		const url = URL.createObjectURL(blob);

		// Trigger download
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Clean up the Blob URL
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Failed to download file:", error);
	}
};

// export const handleDownloadBase64File = (content: string, fileName: string) => {
// 	// Replace this with your base64 string
// 	const base64Image = content;

// 	// Convert the base64 string to a Blob
// 	const blob = new Blob([atob(base64Image.split(",")[1])], {
// 		type: "image/png",
// 	});

// 	// Create a URL for the Blob
// 	const url = URL.createObjectURL(blob);

// 	// Create an <a> element and trigger the download
// 	const a = document.createElement("a");
// 	a.href = url;
// 	a.download = fileName + ".png"; // Specify the file name
// 	document.body.appendChild(a); // Append the element to the DOM
// 	a.click(); // Trigger the click event
// 	document.body.removeChild(a); // Clean up after the download

// 	// Revoke the Blob URL to free up resources
// 	URL.revokeObjectURL(url);
// };

// export const handleDownloadBase64File2 = (
// 	content: string,
// 	fileName: string
// ) => {
// 	// Extract the base64 string and file type from the input
// 	const [metadata, base64Data] = content.split(",");
// 	const mimeType = metadata.match(/:(.*?);/)?.[1] || "application/octet-stream";

// 	// Convert the base64 string to a Blob
// 	const blob = new Blob([atob(base64Data)], { type: mimeType });

// 	// Create a URL for the Blob
// 	const url = URL.createObjectURL(blob);

// 	// Create an <a> element and trigger the download
// 	const a = document.createElement("a");
// 	a.href = url;
// 	a.download = fileName; // Use the provided file name
// 	document.body.appendChild(a); // Append the element to the DOM
// 	a.click(); // Trigger the click event
// 	document.body.removeChild(a); // Clean up after the download

// 	// Revoke the Blob URL to free up resources
// 	URL.revokeObjectURL(url);
// };

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
