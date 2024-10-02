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
	getVersionHelperTextLeft,
	getVersionHelperTextRight,
	initGetHistoryHospital,
} from "./service";
import MedDropDown from "../../../../components/MedDropDown";
import { setHospitalHistory } from "../../redux";
import { modelHospitalHistory } from "../../redux/models/historyModel";
import BaseUniqueContentModalHeaderWithIcon from "wcf-component-lib/src/components/BaseUniqueContentModalHeaderWithIcon";

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
				<BaseUniqueContentModalHeaderWithIcon
					headerText="ประวัติการแก้ไข ข้อมูลบันทึกปรับปรุงสถานพยาบาล"
					subHeaderText="กรุณาเลือกเวอร์ชั่นเพื่อเปรียบเทียบประวัติ"
				/>

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
							helperTextLeft={getVersionHelperTextLeft(
								history.editTimesList,
								history.compareParams.olderVersion
							)}
							helperTextRight={getVersionHelperTextRight(
								history.editTimesList,
								history.compareParams.olderVersion
							)}
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
							helperTextLeft={getVersionHelperTextLeft(
								history.editTimesList,
								history.compareParams.newerVersion
							)}
							helperTextRight={getVersionHelperTextRight(
								history.editTimesList,
								history.compareParams.newerVersion
							)}
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
