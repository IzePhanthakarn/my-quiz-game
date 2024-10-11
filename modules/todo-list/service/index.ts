import { AppDispatch } from "@/redux/config/configStore";
import { setIsLoading } from "@/redux/slices/container";
import { getSP19TodoList, getSP7TodoList } from "./api";
import _ from "lodash";

export interface Count {
	sp7end30: number;
	sp7end90: number;
	sp19end30: number;
	sp19end90: number;
}

export const initHospitalTodoList =
	(setCount: (value: Count) => void) => async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const sp7_30 = await dispatch(getSP7TodoList("30"));

		const sp7_90 = await dispatch(getSP7TodoList("90"));

		const sp19_30 = await dispatch(getSP19TodoList("30"));

		const sp19_90 = await dispatch(getSP19TodoList("90"));

		dispatch(setIsLoading(false));

		const data = {
			sp7end30: sp7_30.payload.length,
			sp7end90: sp7_90.payload.length,
			sp19end30: sp19_30.payload.length,
			sp19end90: sp19_90.payload.length,
		};
		setCount(data);

		return data;
	};
