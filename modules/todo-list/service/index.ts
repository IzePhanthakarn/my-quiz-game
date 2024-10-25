import { AppDispatch } from "@/redux/config/configStore";
import { setIsLoading } from "@/redux/slices/container";
import { getSP19TodoList, getSP7TodoList } from "./api";
import _ from "lodash";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import { setHospitalFilter } from "@/modules/hospital/redux";
import { HospitalFilter } from "@/modules/hospital/redux/models/hospitalModel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LINKS } from "@/constants/links";

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

export const handleClick =
	(
		daysToAdd: number,
		filter: HospitalFilter,
		router: AppRouterInstance,
		isSp7: boolean
	) =>
	(dispatch: AppDispatch) => {
		const today = dayjs().format(DateFormat.YYYYMMDD);
		const futureDate = dayjs()
			.add(daysToAdd, "day")
			.format(DateFormat.YYYYMMDD);
		if (isSp7) {
			dispatch(
				setHospitalFilter({
					...filter,
					CheckSp7EndDate: true,
					sp7EndDateBetween: [today, futureDate],
				})
			);
		} else {
			dispatch(
				setHospitalFilter({
					...filter,
					CheckSp19EndDate: true,
					sp19EndDateBetween: [today, futureDate],
				})
			);
		}
		router.push(LINKS.HOSPITAL.link);
	};
