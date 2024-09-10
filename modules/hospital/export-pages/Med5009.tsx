"use client";

import React from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import dynamic from "next/dynamic";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { setExportPages } from "../redux";
import { REPORT_TYPES } from "@/constants/reports";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_TYPE } from "@/components/MedDropDown/model";
import { handleOnExportExcel, handleOnExportPdf } from "@/utils/report/common";

const HospitalReportMed5009 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5009 } = useSelector(
		(state: SliceModel) => ({
			med5009: state.hospital.exportPages.med5009,
		}),
		shallowEqual
	);

	return (
		<BaseForm
			name={""}
			initialValues={med5009}
			onValuesChange={(e) =>
				dispatch(
					setExportPages({ key: "med5009", value: { ...med5009, ...e } })
				)
			}
		>
			<div className="grid grid-cols-3 gap-x-4 gap-y-4">
				<p className="col-span-3 text-2xl">
					MED5009 รายงานการตรวจสถานพยาบาลในความตกลงของกองทุนเงินทดแทน
				</p>
				<div></div>
				<MedDropDown
					itemName="propertyCode"
					label="ระดับของสถานพยาบาล"
					type={DROPDOWN_TYPE.HOSPITAL_TYPE}
				/>
				<div></div>
				<div className="col-span-3">
					<div className="flex justify-center space-x-2">
						<BaseButton
							className="w-1/6"
							label="Excel"
							onClick={() => {
								dispatch(handleOnExportExcel(med5009, REPORT_TYPES.MED5009));
							}}
						/>
						<BaseButton
							className="w-1/6"
							label="Pdf"
							onClick={() => {
								dispatch(handleOnExportPdf(med5009, REPORT_TYPES.MED5009));
							}}
						/>
						<BaseButton
							className="w-1/6"
							label="Preview"
							onClick={() => {
								dispatch(
									handleOnExportPdf(med5009, REPORT_TYPES.MED5009, true)
								);
							}}
						/>
					</div>
				</div>
			</div>
		</BaseForm>
	);
};
export default dynamic(() => Promise.resolve(HospitalReportMed5009), {
	ssr: false,
});
