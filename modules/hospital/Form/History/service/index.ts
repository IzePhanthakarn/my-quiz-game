import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { fetchHospitalHistoryApi, getEditTimesListApi } from "./api";
import { setHospitalHistory } from "../../../redux";
import {
	FetchHospitalHistory,
	HospitalHistory,
} from "../../../redux/models/historyModel";
import { Option } from "wcf-component-lib/src/components/BaseDropDown/model";
export const initGetHistoryHospital =
	(history: HospitalHistory, uuid: string) => async (dispatch: AppDispatch) => {
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(getEditTimesListApi(uuid));
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}
			const newHistory: HospitalHistory = {
				...history,
				editTimesList: response.payload,
				compareParams: {
					olderVersion: _.first(response.payload) ?? 0,
					newerVersion: _.last(response.payload) ?? 0,
				},
			};
			dispatch(setHospitalHistory(newHistory));

			// dispatch(
			// 	fetchHistoryHospital(newHistory, uuid, {
			// 		olderVersion: newHistory.compareParams.olderVersion,
			// 		newerVersion: newHistory.compareParams.newerVersion,
			// 	})
			// );
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
						hospital: response.payload.hospitalHistory,
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
	// console.log(
	// 	"🚀 ~ fetchHospitalHistory:",
	// 	fetchHospitalHistory,
	// 	editTimesList,
	// 	track
	// );
	const newerVersion = fetchHospitalHistory.newerVersion;
	const olderVersion = fetchHospitalHistory.olderVersion;
	const indexOfNewerVersion = editTimesList.indexOf(
		parseInt(`${newerVersion}`)
	);
	const indexOfOlderVersion = editTimesList.indexOf(
		parseInt(`${olderVersion}`)
	);
	// console.log("🚀 ~ indexOfOlderVersion:", indexOfOlderVersion);
	// console.log("🚀 ~ indexOfNewerVersion:", indexOfNewerVersion);

	const firstIndexValue = _.first(editTimesList);
	const lastIndexValue = _.last(editTimesList);
	const editTimesListOption: Option[] = [];
	for (let index = 0; index < editTimesList.length; index++) {
		editTimesListOption.push({
			label:
				editTimesList[index] === firstIndexValue
					? `บันทึกครั้งแรก`
					: editTimesList[index] === lastIndexValue
					? `เวอร์ชั่นปัจจุบัน`
					: `การแก้ไขครั้งที่ ${editTimesList[index]}`,
			value: editTimesList[index],
			disabled:
				track === "olderVersion" && indexOfNewerVersion !== -1
					? index < indexOfNewerVersion
						? false
						: true
					: track === "newerVersion" && indexOfOlderVersion !== -1
					? index > indexOfOlderVersion
						? false
						: true
					: false,
			// disabled:
			// 	_.isUndefined(olderVersion) && _.isUndefined(newerVersion)
			// 		? false
			// 		: track === "olderVersion"
			// 		? index < indexOfNewerVersion
			// 			? false
			// 			: true
			// 		: track === "newerVersion"
			// 		? index <= indexOfOlderVersion
			// 			? true
			// 			: false
			// 		: false,
			// disabled: false,
		});
	}
	return editTimesListOption;
};
