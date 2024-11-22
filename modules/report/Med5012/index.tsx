"use client";

import React from "react";
import { AppDispatch } from "@/redux/config/configStore";
import { SliceModel } from "@/redux/slices/model";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import dynamic from "next/dynamic";
import { MED_REPORT_SYSTEM } from "../model";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { columns } from "./constants/columns";
import { handleOnExportExcel, handleOnExportPdf } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import { setMed5012Form } from "../redux";
import { handleOnPreview, handlePdfButton } from "./service";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT } from "@/components/MedDropDown/model";
import { BaseItemDateRangePicker } from "wcf-component-lib/src/components";
import { reportRules } from "./field-validation/form";

const Med5012 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5012, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5012: state.medReport.med5012,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	function DownloadChange( downloadType: string) { 
		if ("EXCEL" == downloadType) {
			dispatch(handleOnExportExcel(med5012, REPORT_TYPES.MED5012));
		} else if ("PDF" ==downloadType) {
			dispatch(handlePdfButton(med5012.form));
		}
	}
	return (
		<FormReportLayout
			handleSubmitButton={() => {
				dispatch(handleOnPreview(med5012));
			}}
			handleDownloadButton={() => {
				dispatch(handleOnExportPdf(med5012.form, REPORT_TYPES.MED5012));
			}}
			TotalItems={med5012.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5012",
				reportName: "รายงานการตรวจสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription: "รายงานการตรวจสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<div className="grid grid-cols-4 gap-x-4 gap-y-4"> 
					<BaseItemDateRangePicker
					    notForm={true}
						itemName="investigrationDate"
						label="วันที่ตรวจสถานพยาบาล"
						rules={reportRules.investigrationDateSchema}
						onChangeRangePicker={(dates: any) => {
							if (dates == null) {
								return;
							}
							return dispatch(
								setMed5012Form({
									...med5012.form,
									fromDate: dates[0],
									toDate: dates[1],
								})
							);
						}}
					/>		
					{!_.isEmpty(med5012.form.showDownload) ? (
				 		<div>
				 			<MedDropDown
				 				label="ดาวน์โหลด"
				 				option={DROPDOWN_REPOT}
				 				value={med5012.form.downloadType}
								getValue={(value: string) => {
				 					dispatch(
				 						setMed5012Form({
				 							...med5012.form,
				 							downloadType: value,
										})
				 					 );
				 					DownloadChange(value);
									
				 				}}
				 			/>
						</div>
				 	) : null}
					<div></div>
				</div>
			}
		>
			{!_.isEmpty(med5012.grid.list) ? (
				<BaseGrid
					rows={med5012.grid.list}
					columns={columns}
					page={med5012.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5012, grid: { ...med5012.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5012), {
	ssr: false,
});
