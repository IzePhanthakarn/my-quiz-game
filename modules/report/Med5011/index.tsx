"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { REPORT_TYPES } from "@/constants/reports";
import _ from "lodash";
import { columns } from "./model";
import { handleOnExportExcel } from "@/utils/report/common";
import { handleOnPreview, handlePdfButton } from "./service";
import dynamic from "next/dynamic";
import { BaseDatePicker } from "wcf-component-lib/src/components/BaseDatePicker";
import { DROPDOWN_REPOT } from "@/components/MedDropDown/model";
import { setMed5011Form } from "../redux";
import MedDropDown from "@/components/MedDropDown";

const Med5011 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5011, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5011: state.medReport.med5011,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	function DownloadChange( downloadType: string) { 
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5011.form, REPORT_TYPES.MED5011));
		} else if ("PDF" ==downloadType) {
			dispatch(handlePdfButton(med5011.form));
		}
	}
	 
	return (
		<FormReportLayout
			handleSubmitButton={() => {
				dispatch(handleOnPreview(med5011));
			}}
			TotalItems={med5011.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5011",
				reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<div className="grid grid-cols-4 gap-x-6 gap-y-5">
					<div>
						<BaseDatePicker
							notForm={true}
							label="วันที่ยกเลิกสถานพยาบาล"
							value={med5011.form.fromDate}
							onChangeDateFunction={(date) => {
								dispatch(
									setMed5011Form({
										...med5011.form,
										fromDate: date,
									})
								);
							}}
						/>
					</div>
					<div>
						<BaseDatePicker
							notForm={true}
							label="ถึงวันที่"
							value={med5011.form.toDate}
							onChangeDateFunction={(date) => {
								dispatch(
									setMed5011Form({
										...med5011.form,
										toDate: date,
									})
								);
							}}
						/>
					</div>
					{!_.isEmpty(med5011.form.showDownload) ? (
						<div>
							<MedDropDown
								label="ดาวน์โหลด"
								option={DROPDOWN_REPOT}
								value={med5011.form.downloadType}
								getValue={(value: string) => {
									DownloadChange(value);
									dispatch(
										setMed5011Form({
											...med5011.form,
											downloadType:value,
										})
									)
								}}
							/>
						</div>
					) : null}
				</div>
			}
		>
			{!_.isEmpty(med5011.grid.list) ? (
				<BaseGrid
					rows={med5011.grid.list}
					columns={columns}
					page={med5011.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5011, grid: { ...med5011.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5011), {
	ssr: false,
});
