"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5001Form } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import _ from "lodash";
import { columns } from "./model";

import dynamic from "next/dynamic";
import { handleOnPreview, handlePdfButton } from "./service";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import { BaseDatePicker } from "wcf-component-lib/src/components/BaseDatePicker";
import { handleOnExportExcel } from "@/utils/report/common";
import { REPORT_TYPES } from "@/constants/reports";

const Med5001 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5001, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5001: state.medReport.med5001,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5001, REPORT_TYPES.MED5001));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5001.form));
		}
		return e;
	}
	return (
		<FormReportLayout
			handleSubmitButton={() => {
				dispatch(handleOnPreview(med5001));
			}}
			TotalItems={med5001.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5001",
				reportName:
					"ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
				reportDescription:
					"ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
				reportType: "5",
			}}
			downloadContent={
				<div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<MedDropDown
							type={SESSION_NAME.SSO_BRANCH_PROVINCE_CODENAME}
							label="รหัสหน่วยงาน"
							itemName="ssoCode"
						/>
					</div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<BaseDatePicker
							notForm={true}
							label="ตั้งแต่วันที่จ่ายเงิน"
							itemName={"fromDate"}
							value={med5001.form.fromDate}
							onChangeDateFunction={(date) => {
								dispatch(
									setMed5001Form({
										...med5001.form,
										fromDate: date,
									})
								);
							}}
						/>
						<BaseDatePicker
							notForm={true}
							label="ถึงวันที่"
							value={med5001.form.toDate}
							onChangeDateFunction={(date) => {
								dispatch(
									setMed5001Form({
										...med5001.form,
										toDate: date,
									})
								);
							}}
						/>
						{!_.isEmpty(med5001.form.showDownload) ? (
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
			{!_.isEmpty(med5001.grid.list) ? (
				<BaseGrid
					rows={med5001.grid.list}
					columns={columns}
					page={med5001.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5001, grid: { ...med5001.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5001), {
	ssr: false,
});
