"use client";

import React, { useEffect } from "react";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";

import { getItems } from "./model";
import { BaseCollapse } from "wcf-component-lib/src/components";
import {
	fetchHistoryHospital,
	getEditTimesListOption,
	initGetHistoryHospital,
} from "./service";
import MedDropDown from "../../../../components/MedDropDown";
import { setHospitalHistory } from "../../redux";
import { modelHospitalHistory } from "../../redux/models/historyModel";

export default function HospitalHistory() {
	const dispatch: AppDispatch = useDispatch();
	const { history, compareList, form } = useSelector(
		(state: SliceModel) => ({
			history: state.hospital.history,
			form: state.hospital.form,
			compareList: state.hospital.history.compareList,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(setHospitalHistory(modelHospitalHistory));
		dispatch(initGetHistoryHospital(history, form.uuid));
	}, []);

	useEffect(() => {
		if (
			!_.isNil(history.compareParams.olderVersion) &&
			!_.isNil(history.compareParams.newerVersion)
		) {
			dispatch(
				fetchHistoryHospital(history, form.uuid, {
					olderVersion: history.compareParams.olderVersion,
					newerVersion: history.compareParams.newerVersion,
				})
			);
		}
	}, [history.compareParams]);

	return (
		<>
			<div className="w-full space-y-4 flex flex-col  h-full overflow-y-scroll">
				<div className="flex w-full justify-end px-4 space-x-4">
					<div className="w-48">
						<MedDropDown
							notForm
							label="เวอร์ชั่นหลักที่ใช้เทียบ"
							value={history.compareParams.olderVersion}
							option={getEditTimesListOption(
								history.editTimesList,
								{
									olderVersion: history.compareParams.olderVersion,
									newerVersion: history.compareParams.newerVersion,
								},
								"olderVersion"
							)}
							getValue={(e) => {
								// if (_.isUndefined(e)) {
								// 	dispatch(
								// 		setHospitalHistory({
								// 			...history,
								// 			compareParams: {
								// 				newerVersion: undefined,
								// 				olderVersion: undefined,
								// 			},
								// 		})
								// 	);
								// } else {
								// 	dispatch(
								// 		setHospitalHistory({
								// 			...history,
								// 			compareParams: {
								// 				...history.compareParams,
								// 				olderVersion: e,
								// 			},
								// 		})
								// 	);
								// }
								dispatch(
									setHospitalHistory({
										...history,
										compareParams: {
											...history.compareParams,
											olderVersion: e,
										},
									})
								);
							}}
							helperTextLeft={"test1"}
							helperTextRight={"test2"}
						/>
					</div>
					<div className="w-48">
						<MedDropDown
							notForm
							label="เวอร์ชั่นที่ต้องการเทียบ"
							value={history.compareParams.newerVersion}
							option={getEditTimesListOption(
								history.editTimesList,
								{
									olderVersion: history.compareParams.olderVersion,
									newerVersion: history.compareParams.newerVersion,
								},
								"newerVersion"
							)}
							getValue={(e) => {
								// if (_.isUndefined(e)) {
								// 	dispatch(
								// 		setHospitalHistory({
								// 			...history,
								// 			compareParams: {
								// 				newerVersion: undefined,
								// 				olderVersion: undefined,
								// 			},
								// 		})
								// 	);
								// } else {
								// 	dispatch(
								// 		setHospitalHistory({
								// 			...history,
								// 			compareParams: {
								// 				...history.compareParams,
								// 				newerVersion: e,
								// 			},
								// 		})
								// 	);
								// }
								dispatch(
									setHospitalHistory({
										...history,
										compareParams: {
											...history.compareParams,
											newerVersion: e,
										},
									})
								);
							}}
							helperTextLeft={"test1"}
							helperTextRight={"test2"}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					{getItems(compareList).map((item) => (
						<BaseCollapse
							noPadding
							key={item.key}
							defaultActiveKey={["1"]}
							items={[item]}
						/>
					))}
				</div>
			</div>
		</>
	);
}
