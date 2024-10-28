import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import MedDropDown from "@/components/MedDropDown";
import { AppDispatch } from "@/redux/config/configStore";
import {
	getDropdownOptions,
	getFilterUpdatedByEditTimes,
	getFilterUpdatedDateEditTimes,
	handleFilterCompare,
	initDoctorCompareAllHistory,
	initDoctorCompareHistory,
} from "./service";
import { SliceModel } from "@/redux/slices/model";
import { getItems, getItemsCompareAll } from "./model";
import { setCompareParams } from "../../redux";
import _ from "lodash";
import { BaseCollapse } from "wcf-component-lib/src/components";

export default function CompareAllDialog() {
	const dispatch: AppDispatch = useDispatch();

	const { doctorCode, compareListAll, filterList, compareParams } = useSelector(
		(state: SliceModel) => ({
			doctorCode: state.doctor.doctorForm.doctorData.doctorCode,
			compareListAll: state.doctor.doctorCompareHistory.compareListAll,
			filterList: state.doctor.doctorCompareHistory.filterList,
			compareParams: state.doctor.doctorCompareHistory.compareParams,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(initDoctorCompareAllHistory(doctorCode));
	}, []);

	return (
		<div className="w-full space-y-4 flex flex-col  h-full overflow-y-scroll">
			<div className="flex flex-col">
				{getItemsCompareAll(compareListAll).map((item) => (
					<BaseCollapse
						// noPadding
						key={item.key}
						defaultActiveKey={["1"]}
						items={[item]}
					/>
				))}
			</div>
		</div>
	);
}
