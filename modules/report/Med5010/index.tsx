"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportExcel } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import MedDropDown from "@/components/MedDropDown";
import { DROPDOWN_REPOT, SESSION_NAME } from "@/components/MedDropDown/model";
import { handleOnPreview, handlePdfButton } from "./service";
import dynamic from "next/dynamic";

const Med5010 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5010, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5010: state.medReport.med5010,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	function DownloadChange(e: string): any {
		if ("EXCEL" == e) {
			dispatch(handleOnExportExcel(med5010, REPORT_TYPES.MED5010));
		} else if ("PDF" == e) {
			dispatch(handlePdfButton(med5010.form));
		}
		return e;
	}
	return (
		<FormReportLayout
			handleSubmitButton={() => {
				dispatch(handleOnPreview(med5010));
			}}
			TotalItems={med5010.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5010",
				reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<MedDropDown
							itemName="hospitalType"
							label="ระดับของสถานพยาบาล"
							type={SESSION_NAME.HOSPITAL_TYPE}
						/>
					</div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<MedDropDown
							itemName="hospitalCategory"
							label="ประเภทของสถานพยาบาล"
							type={SESSION_NAME.HOSPITAL_CATEGORY}
						/>
					</div>
					<div className="grid grid-cols-4 gap-x-6 gap-y-5">
						<MedDropDown
							itemName="ssoProject"
							label="โครงการประกันสังคม"
							type={SESSION_NAME.SSO_PROJECT}
						/>
						{!_.isEmpty(med5010.form.showDownload) ? (
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
			{!_.isEmpty(med5010.grid.list) ? (
				<BaseGrid
					rows={med5010.grid.list}
					columns={columns}
					page={med5010.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5010, grid: { ...med5010.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5010), {
	ssr: false,
});
