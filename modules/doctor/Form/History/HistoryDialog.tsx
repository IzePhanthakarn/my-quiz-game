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
	initDoctorCompareHistory,
} from "./service";
import { SliceModel } from "@/redux/slices/model";
import { columns, getItems } from "./model";
import { setcompareParams } from "../../redux";
import _ from "lodash";
import { BaseCollapse } from "wcf-component-lib/src/components";

export default function HistoryDialog() {
	const dispatch: AppDispatch = useDispatch();

	const { doctorCode, compareList, filterList, compareParams } = useSelector(
		(state: SliceModel) => ({
			doctorCode: state.doctor.doctorForm.doctorData.doctorCode,
			compareList: state.doctor.doctorCompareHistory.compareList,
			filterList: state.doctor.doctorCompareHistory.filterList,
			compareParams: state.doctor.doctorCompareHistory.compareParams,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(handleFilterCompare(doctorCode));
	}, []);

	useEffect(() => {
		if (!_.isNull(compareParams.edit1) && !_.isNull(compareParams.edit2)) {
			dispatch(
				initDoctorCompareHistory({
					edit1: compareParams.edit1,
					edit2: compareParams.edit2,
					doctorCode: doctorCode,
				})
			);
		}
	}, [compareParams]);

	// Function to map filterList for dropdown options

	return (
		<div className="w-full space-y-4 flex flex-col  h-full overflow-y-scroll">
			<div className="flex w-full justify-end px-4 space-x-4">
				<div className="w-48">
					<MedDropDown
						notForm
						label="เวอร์ชั่นหลักที่ใช้เทียบ"
						value={compareParams.edit1}
						option={getDropdownOptions(filterList)}
						getValue={(e) =>
							dispatch(setcompareParams({ ...compareParams, edit1: e }))
						}
						helperTextLeft={getFilterUpdatedByEditTimes(
							compareParams.edit1,
							filterList
						)}
						helperTextRight={getFilterUpdatedDateEditTimes(
							compareParams.edit1,
							filterList
						)}
					/>
				</div>
				<div className="w-48">
					<MedDropDown
						notForm
						label="เวอร์ชั่นที่ต้องการเทียบ"
						value={compareParams.edit2}
						option={getDropdownOptions(filterList)}
						getValue={(e) =>
							dispatch(setcompareParams({ ...compareParams, edit2: e }))
						}
						helperTextLeft={getFilterUpdatedByEditTimes(
							compareParams.edit2,
							filterList
						)}
						helperTextRight={getFilterUpdatedDateEditTimes(
							compareParams.edit2,
							filterList
						)}
					/>
				</div>
			</div>
			<>
				{getItems(compareList).map((item) => (
					<BaseCollapse
						noPadding
						key={item.key}
						defaultActiveKey={["1", "2"]}
						items={[item]}
					/>
				))}
			</>
		</div>
	);
}
