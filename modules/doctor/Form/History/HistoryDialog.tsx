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
import { columns, columnsDoctorDetail, getItems } from "./model";
import { setCompareParams } from "../../redux";
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
		if (
			!_.isNil(compareParams.olderVersion) &&
			!_.isNil(compareParams.newerVersion)
		) {
			dispatch(
				initDoctorCompareHistory({
					olderVersion: compareParams.olderVersion,
					newerVersion: compareParams.newerVersion,
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
						value={compareParams.olderVersion}
						option={getDropdownOptions({
							list: filterList,
							newerVersion: compareParams.newerVersion || 0,
						})}
						getValue={(e) => {
							dispatch(setCompareParams({ ...compareParams, olderVersion: e }));
							if (_.isNil(e)) {
								dispatch(
									setCompareParams({
										...compareParams,
										olderVersion: null,
										newerVersion: null,
									})
								);
							}
						}}
						helperTextLeft={getFilterUpdatedByEditTimes(
							compareParams.olderVersion,
							filterList
						)}
						helperTextRight={getFilterUpdatedDateEditTimes(
							compareParams.olderVersion,
							filterList
						)}
					/>
				</div>
				<div className="w-48">
					<MedDropDown
						notForm
						label="เวอร์ชั่นที่ต้องการเทียบ"
						value={compareParams.newerVersion}
						option={getDropdownOptions({
							list: filterList,
							olderVersion: compareParams.olderVersion || 0,
						})}
						disabled={_.isNil(compareParams.olderVersion)}
						getValue={(e) =>
							dispatch(setCompareParams({ ...compareParams, newerVersion: e }))
						}
						helperTextLeft={getFilterUpdatedByEditTimes(
							compareParams.newerVersion,
							filterList
						)}
						helperTextRight={getFilterUpdatedDateEditTimes(
							compareParams.newerVersion,
							filterList
						)}
					/>
				</div>
			</div>
			<div className="flex flex-col">
				{getItems(compareList).map((item) => (
					<BaseCollapse
						noPadding
						key={item.key}
						defaultActiveKey={["1", "2"]}
						items={[item]}
					/>
				))}
			</div>
		</div>
	);
}
