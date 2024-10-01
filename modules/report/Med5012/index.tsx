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
import { BaseDatePicker } from "wcf-component-lib/src/components/BaseDatePicker";
import { handleOnExportPdf, handlePreviewDisplay } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import { setMed5012Form } from "../redux";
import { handleOnPreview } from "./service";

const Med5012 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5012, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5012: state.medReport.med5012,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
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
				reportName: "รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription: "รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<div className="grid grid-cols-4 gap-x-4 gap-y-4">
					<div></div>
					<BaseDatePicker
						notForm={true}
						label="วันที่ตรวจสถานพยาบาล"
						value={med5012.form.fromDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5012Form({
									...med5012.form,
									fromDate: date,
									toDate: date,
								})
							);
						}}
					/>
					<BaseDatePicker
						notForm={true}
						label="ถึงวันที่"
						value={med5012.form.toDate}
						onChangeDateFunction={(date) => {
							dispatch(
								setMed5012Form({
									...med5012.form,
									toDate: date,
								})
							);
						}}
					/>
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
