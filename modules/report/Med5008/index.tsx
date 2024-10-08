"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import _ from "lodash";
import { columns } from "./model";
import { handleOnPreview, handlePdfButton } from "./service";
import { BaseDatePicker } from "wcf-component-lib/src/components/BaseDatePicker";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT } from "@/components/MedDropDown/model";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";
import dynamic from "next/dynamic";
import { setMed5008Form } from "../redux";

const Med5008 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5008, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5008: state.medReport.med5008,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5008, REPORT_TYPES.MED5008));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5008.form));
		}
		return e;
	}
	return (
		<FormReportLayout
			handleSubmitButton={() => {
				dispatch(handleOnPreview(med5008));
			}}
			TotalItems={med5008.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5008",
				reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<div>
							<BaseDatePicker
								notForm={true}
								label="วันที่สิ้นสุดใบอนุญาต(สพ.7)"
								value={med5008.form.sp7expiredFrom}
								onChangeDateFunction={(date) => {
									dispatch(
										setMed5008Form({
											...med5008.form,
											sp7expiredFrom: date,
										})
									);
								}}
							/>
						</div>
						<div>
							<BaseDatePicker
								notForm={true}
								label="ถึงวันที่"
								value={med5008.form.sp7expiredTo}
								onChangeDateFunction={(date) => {
									dispatch(
										setMed5008Form({
											...med5008.form,
											sp7expiredTo: date,
										})
									);
								}}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<div>
							<BaseDatePicker
								notForm={true}
								label="วันที่สิ้นสุดใบอนุญาต(สพ.19)"
								value={med5008.form.sp19expiredFrom}
								onChangeDateFunction={(date) => {
									dispatch(
										setMed5008Form({
											...med5008.form,
											sp19expiredFrom: date,
										})
									);
								}}
							/>
						</div>
						<div>
							<BaseDatePicker
								notForm={true}
								label="ถึงวันที่"
								value={med5008.form.sp19expiredTo}
								onChangeDateFunction={(date) => {
									dispatch(
										setMed5008Form({
											...med5008.form,
											sp19expiredTo: date,
										})
									);
								}}
							/>
						</div>
						{!_.isEmpty(med5008.form.showDownload) ? (
							<div>
								<MedDropDown
									label="ดาวน์โหลด"
									option={DROPDOWN_REPOT}
									getValue={(e: string) => {
										DownloadChange(e);
									}}
								/>
							</div>
						) : null}
					</div>
				</div>
			}
		>
			{!_.isEmpty(med5008.grid.list) ? (
				<BaseGrid
					rows={med5008.grid.list}
					columns={columns}
					page={med5008.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5008, grid: { ...med5008.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5008), {
	ssr: false,
});
