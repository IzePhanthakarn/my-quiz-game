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
import dynamic from "next/dynamic";
import { handleOnPreview, handlePdfButton } from "./service";
import MedDropDown from "@/components/MedDropDown";
import { BaseDatePicker } from "wcf-component-lib/src/components/BaseDatePicker";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportExcel } from "@/utils/report/common";
import { setMed5005Form } from "../redux";

const Med5005 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5005, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5005: state.medReport.med5005,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5005, REPORT_TYPES.MED5005));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5005.form));
		}
		return e;
	}
	return (
		<FormReportLayout
			handleSubmitButton={() => {
				dispatch(handleOnPreview(med5005));
			}}
			TotalItems={med5005.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5005",
				reportName:
					"รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
				reportDescription:
					"รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
				reportType: "5",
			}}
			downloadContent={
				<div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						{/* <MedDropDown
							type={SESSION_NAME.SSO_BRANCH_PROVINCE}
							label="รหัสหน่วยงาน"

							value={med5005.form.provinceCode}
							onChangeFunction={(e) => {
								console.log(e.target.value);
								dispatch(
									setMed5005Form({
										...med5005.form,
										provinceCode: e.target.value,
									})
								);
							}}
						/> */}
						<MedDropDown
							itemName="provinceCode"
							label="ระดับของสถานพยาบาล"
							type={SESSION_NAME.SSO_BRANCH_PROVINCE}
						/>
					</div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<BaseDatePicker
							notForm={true}
							label="ตั้งวันที่ฝึกอบรม"
							value={med5005.form.fromDate}
							onChangeDateFunction={(date) => {
								dispatch(
									setMed5005Form({
										...med5005.form,
										fromDate: date,
									})
								);
							}}
						/>
					</div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<BaseDatePicker
							notForm={true}
							label="ถึงวันที่"
							value={med5005.form.toDate}
							onChangeDateFunction={(date) => {
								dispatch(
									setMed5005Form({
										...med5005.form,
										toDate: date,
									})
								);
							}}
						/>
						{!_.isEmpty(med5005.form.showDownload) ? (
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
			{!_.isEmpty(med5005.grid.list) ? (
				<BaseGrid
					rows={med5005.grid.list}
					columns={columns}
					page={med5005.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5005, grid: { ...med5005.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5005), {
	ssr: false,
});
