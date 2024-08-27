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
import { handleOnExportExcel5012, handleOnExportPdf5012 } from "../service";

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
			children={
				<div className="grid grid-cols-2 gap-x-4 gap-y-4">
					<p className="col-span-2 text-2xl">
						MED5012 รายงานการตรวจสถานพยาบาลในความตกลงของกองทุนเงินทดแทน
					</p>
					<BaseDatePicker label="วันที่ตรวจสถานพยาบาล" itemName={"fromDate"} />
					<BaseDatePicker label="ถึงวันที่" itemName={"toDate"} />
					<div className="col-span-2 space-x-2">
						<BaseButton
							className="w-1/4"
							label="Excel"
							onClick={() => {
								dispatch(handleOnExportExcel5012(med5012));
							}}
						/>
						<BaseButton
							className="w-1/4"
							label="Pdf"
							onClick={() => {
								dispatch(handleOnExportPdf5012(med5012, false));
							}}
						/>
						<BaseButton
							className="w-1/4"
							label="Preview"
							onClick={() => {
								dispatch(handleOnExportPdf5012(med5012, true));
							}}
						/>
					</div>
				</div>
			}
			onValuesChange={(e) =>
				dispatch(
					setExportPages({ key: "med5012", value: { ...med5012, ...e } })
				)
			}
		/>
	);
};
export default dynamic(() => Promise.resolve(HospitalReportMed5012), {
	ssr: false,
});
