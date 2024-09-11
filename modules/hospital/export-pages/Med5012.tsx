"use client";

import React from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import dynamic from "next/dynamic";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setExportPages } from "../redux";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportExcel, handleOnExportPdf } from "@/utils/report/common";

const HospitalReportMed5012 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5012 } = useSelector(
		(state: SliceModel) => ({
			med5012: state.hospital.exportPages.med5012,
		}),
		shallowEqual
	);
	return (
		<BaseForm
			name={""}
			initialValues={med5012}
			onValuesChange={(e) =>
				dispatch(
					setExportPages({ key: "med5012", value: { ...med5012, ...e } })
				)
			}
		>
			<div className="grid grid-cols-4 gap-x-4 gap-y-4">
				<p className="col-span-4 text-2xl">
					MED5012 รายงานการตรวจสถานพยาบาลในความตกลงของกองทุนเงินทดแทน
				</p>
				<div></div>
				<BaseDatePicker label="วันที่ตรวจสถานพยาบาล" itemName={"fromDate"} />
				<BaseDatePicker label="ถึงวันที่" itemName={"toDate"} />
				<div></div>
				<div className="col-span-4">
					<div className="flex justify-center space-x-2">
						<BaseButton
							className="w-1/6"
							label="Excel"
							onClick={() => {
								dispatch(handleOnExportExcel(med5012, REPORT_TYPES.MED5012));
							}}
						/>
						<BaseButton
							className="w-1/6"
							label="Pdf"
							onClick={() => {
								dispatch(handleOnExportPdf(med5012, REPORT_TYPES.MED5012));
							}}
						/>
						<BaseButton
							className="w-1/6"
							label="Preview"
							onClick={() => {
								dispatch(
									handleOnExportPdf(med5012, REPORT_TYPES.MED5012, true)
								);
							}}
						/>
					</div>
				</div>
			</div>
		</BaseForm>
	);
};
export default dynamic(() => Promise.resolve(HospitalReportMed5012), {
	ssr: false,
});
