import _ from "lodash";
import { AppDispatch } from "@/redux/config/configStore";
import { fetchHospitalHistoryApi, getEditTimesListApi } from "./api";
import { setHospitalHistory } from "../../../redux";
import {
	EditTimesList,
	FetchHospitalHistory,
	HospitalHistory,
} from "../../../redux/models/historyModel";
import { Option } from "wcf-component-lib/src/components/BaseDropDown/model";
import { handleFormatDate } from "wcf-component-lib/src/utils";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
export const initGetHistoryHospital =
	(history: HospitalHistory, uuid: string) => async (dispatch: AppDispatch) => {
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getEditTimesListApi(uuid));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			const payload: EditTimesList[] = response.payload;
			const newHistory: HospitalHistory = {
				...history,
				editTimesList: payload,
				compareParams: {
					olderVersion: !_.isEmpty(payload)
						? _.first(payload)?.editTimes ?? 0
						: 0,
					newerVersion: !_.isEmpty(payload)
						? _.last(payload)?.editTimes ?? 0
						: 0,
				},
			};
			dispatch(setHospitalHistory(newHistory));
		}
	};

export const fetchHistoryHospital =
	(
		history: HospitalHistory,
		uuid: string,
		fetchHospitalHistory: FetchHospitalHistory
	) =>
	async (dispatch: AppDispatch) => {
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(
				fetchHospitalHistoryApi({
					uuid: uuid,
					body: {
						olderVersion: fetchHospitalHistory.olderVersion,
						newerVersion: fetchHospitalHistory.newerVersion,
					},
				})
			);
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			dispatch(
				setHospitalHistory({
					...history,
					compareList: {
						baseData: response.payload.baseData,
						codeData: response.payload.codeData,
						compensationFundInformationData:
							response.payload.compensationFundInformationData,
						hospitalChangedNameData: response.payload.hospitalChangedNameData,
						hospitalSp7: response.payload.hospitalSp7,
						hospitalSp19: response.payload.hospitalSp19,
						hospitalEtcFiles: response.payload.hospitalEtcFiles,
						hospitalStaffContact: response.payload.hospitalStaffContact,
					},
				})
			);
		}
	};

export const getEditTimesListOption = (
	editTimesList: HospitalHistory["editTimesList"],
	fetchHospitalHistory: FetchHospitalHistory,
	track: keyof FetchHospitalHistory
) => {
	const newerVersion = fetchHospitalHistory.newerVersion;
	const olderVersion = fetchHospitalHistory.olderVersion;

	const indexOfNewerVersion =
		editTimesList.find((item) => item.editTimes === parseInt(`${newerVersion}`))
			?.editTimes ?? -1;
	const indexOfOlderVersion =
		editTimesList.find((item) => item.editTimes === parseInt(`${olderVersion}`))
			?.editTimes ?? -1;

	const firstIndexValue = _.first(editTimesList);
	const lastIndexValue = _.last(editTimesList);
	const editTimesListOption: Option[] = [];
	for (let index = 0; index < editTimesList.length; index++) {
		editTimesListOption.push({
			label:
				editTimesList[index].editTimes === firstIndexValue?.editTimes
					? `บันทึกครั้งแรก`
					: editTimesList[index].editTimes === lastIndexValue?.editTimes
					? `เวอร์ชั่นปัจจุบัน`
					: `การแก้ไขครั้งที่ ${editTimesList[index].editTimes}`,
			value: editTimesList[index].editTimes,
			disabled:
				track === "olderVersion" && indexOfNewerVersion !== -1
					? editTimesList[index].editTimes < indexOfNewerVersion
						? false
						: true
					: track === "newerVersion" && indexOfOlderVersion !== -1
					? editTimesList[index].editTimes > indexOfOlderVersion
						? false
						: true
					: false,
		});
	}
	return editTimesListOption;
};

export const getVersionHelperTextLeft = (
	editTimesList: HospitalHistory["editTimesList"],
	version:
		| FetchHospitalHistory["olderVersion"]
		| FetchHospitalHistory["newerVersion"]
) => {
	const findObject = editTimesList.find((item) => item.editTimes === version);
	return !_.isEmpty(findObject) ? `แก้ไขโดย : ${findObject?.createdBy}` : ``;
};

export const getVersionHelperTextRight = (
	editTimesList: HospitalHistory["editTimesList"],
	version:
		| FetchHospitalHistory["olderVersion"]
		| FetchHospitalHistory["newerVersion"]
) => {
	const findObject = editTimesList.find((item) => item.editTimes === version);
	return !_.isEmpty(findObject)
		? `${handleFormatDate(
				`${findObject?.createdDate}`,
				DateFormat.DDMMYYYYHHmmss
		  )}`
		: "";
};
