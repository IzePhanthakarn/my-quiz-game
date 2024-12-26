"use client";

import React, { useEffect } from "react";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";

import {
	columns,
	columnsFiles,
	getAnnouncedPriceFilesHistoryItems,
	getItems,
} from "./model";
import {
	BaseCollapse,
	BaseSubmitButton,
} from "wcf-component-lib/src/components";
import {
	fetchAnnouncedPriceFilesHistory,
	fetchHistoryHospital,
	getEditTimesListOption,
	getVersionHelperTextLeft,
	getVersionHelperTextRight,
	initGetAnnouncedPriceFilesHistory,
} from "./service";
import MedDropDown from "@/components/MedDropDown";
import { setHospitalHistory } from "../../redux";
import { modelHospitalHistory } from "../../redux/models/historyModel";
import BaseUniqueContentModalHeaderWithIcon from "wcf-component-lib/src/components/BaseUniqueContentModalHeaderWithIcon";
import { setDialog } from "../../../../redux/slices/dialog";
import { modelDialog } from "../../../../redux/slices/dialog/model";

export default function AnnouncedPriceFilesHistory() {
	const dispatch: AppDispatch = useDispatch();
	const { history, compareList, form, dialog } = useSelector(
		(state: SliceModel) => ({
			history: state.hospital.history,
			form: state.hospital.form,
			compareList: state.hospital.history.compareList,
			dialog: state.dialog,
		}),
		shallowEqual
	);

	useEffect(() => {
		if (dialog.isOpen === true && dialog.key === "AnnouncedPriceFilesHistory") {
			dispatch(setHospitalHistory(modelHospitalHistory));
			dispatch(initGetAnnouncedPriceFilesHistory(form.uuid));
		}
		if (
			dialog.isOpen === false &&
			dialog.key === "AnnouncedPriceFilesHistory"
		) {
			dispatch(setHospitalHistory(modelHospitalHistory));
		}
	}, [dialog.isOpen]);

	useEffect(() => {
		if (
			!_.isUndefined(history.compareParams.olderVersion) &&
			!_.isUndefined(history.compareParams.newerVersion)
		) {
			dispatch(
				fetchAnnouncedPriceFilesHistory(history, form.uuid, {
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
					headerText="ประวัติการแก้ไข ข้อมูลบันทึกปรับปรุงราคาประกาศ"
					subHeaderText="กรุณาเลือกเวอร์ชั่นเพื่อเปรียบเทียบประวัติ"
				/>

				<div className="flex w-full justify-end px-4 space-x-4">
					<div className="">
						<MedDropDown
							// disabled={
							// 	_.isUndefined(history.compareParams.olderVersion) ? true : false
							// }
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
								console.log("🚀 ~ เวอร์ชั่นหลักที่ใช้เทียบ ~ getValue:", e);
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
					<div className="">
						<MedDropDown
							// disabled={
							// 	_.isUndefined(history.compareParams.newerVersion) ? true : false
							// }
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
								console.log("🚀 ~ เวอร์ชั่นที่ต้องการเทียบ ~ getValue:", e);
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
					{getAnnouncedPriceFilesHistoryItems(compareList).map((item) => (
						<BaseCollapse
							noPaddingAll
							key={item.key}
							defaultActiveKey={["9"]}
							items={[item]}
						/>
					))}
				</div>
				<div className="text-center">
					<BaseSubmitButton
						type="cancel"
						className="w-[220px] h-[65px] rounded-[99px] text-base font-semibold mr-3"
						label="ปิด"
						onClickFunction={() => {
							dispatch(
								setDialog({
									...modelDialog,
									isOverFlow: true,
									isOpenBaseConfirmDialog: false,
									isOpen: false,
									key: "AnnouncedPriceFilesHistory",
									uniqueContent: <></>,
								})
							);
						}}
					/>
				</div>
			</div>
		</>
	);
}
