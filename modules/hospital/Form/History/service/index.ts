import _ from "lodash";
import { setIsLoading } from "@/redux/slices/container";
import { AppDispatch } from "@/redux/config/configStore";
import { fetchHospitalHistory } from "./api";
import { setHospitalHistory } from "../../../redux";

export const initGetHistoryHospital =
	(uuid: string) => async (dispatch: AppDispatch) => {
		if (!_.isEmpty(uuid)) {
			const response = await dispatch(
				fetchHospitalHistory({
					uuid: uuid,
					body: { olderVersion: 0, newerVersion: 3 },
				})
			);
			if (_.get(response, "error.message") === "Rejected") {
				return;
			}

			dispatch(
				setHospitalHistory({
					compareList: {
						hospital: response.payload.hospitalHistory,
					},
				})
			);
		}
	};
