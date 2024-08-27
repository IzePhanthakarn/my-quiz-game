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
import { setExportPages } from "../../redux";

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
				<div className="grid grid-cols-2 gap-x-4">
					<BaseDatePicker label="วันที่ตรวจสถานพยาบาล" itemName={"fromDate"} />
					<BaseDatePicker label="ถึงวันที่" itemName={"toDate"} />
					<div className="col-span-2 space-x-2">
						<BaseButton
							className="w-1/4"
							label="Excel"
							onClick={() => {}}
						/>
						<BaseButton
							className="w-1/4"
							label="Pdf"
							onClick={() => {}}
						/>
						<BaseButton
							className="w-1/4"
							label="Preview"
							onClick={() => {}}
						/>
					</div>
				</div>
			}
			onValuesChange={(e) =>
				dispatch(setExportPages({ key:'med5012', value : { ...med5012, ...e }}))
			}
		/>
	);
};
export default dynamic(() => Promise.resolve(HospitalReportMed5012), {
	ssr: false,
});
