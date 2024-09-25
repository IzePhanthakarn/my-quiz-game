import { AppDispatch } from "@/redux/config/configStore";
import { setIsLoading } from "@/redux/slices/container";
import { doctorCompareParams, getDoctorCompareHistory } from "./api";
import _ from "lodash";
import { setDoctorCompareList, setDoctorFilterList } from "../../redux";

export const initDoctorCompareHistory =
	(params: doctorCompareParams) => async (dispatch: AppDispatch) => {
		// if (_.isEmpty(params.edit1) || _.isEmpty(params.edit2)) return;
		dispatch(setIsLoading(true));
		const data = await dispatch(getDoctorCompareHistory(params));
		dispatch(setIsLoading(false));
		if (!_.isEmpty(data.payload)) {
			dispatch(setDoctorCompareList(data.payload.compareList));
			dispatch(setDoctorFilterList(data.payload.filterList));
		}
	};
