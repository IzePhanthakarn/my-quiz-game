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
import { handleOnPreview } from "./service";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import DownloadContent from "./DownloadContent";
import { Med5002Form } from "./redux/model";

export default function Med5002() {
	const dispatch: AppDispatch = useDispatch();
	const { med5002, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5002: state.medReport.med5002,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5002Form>();
	const onFinish: FormProps<Med5002Form>["onFinish"] = async (
		value: Med5002Form
	) => {
		const data = await dispatch(handleOnPreview(med5002));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5002.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5002",
				reportName: "ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ(รายบุคคน)",
				reportDescription:
					"ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ(รายบุคคน)",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5002={med5002.form}
					form={form}
					onFinish={onFinish}
				/>
			}
		>
			{!_.isEmpty(med5002.grid.list) ? (
				<BaseGrid
					rows={med5002.grid.list}
					columns={columns}
					page={med5002.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5002, grid: { ...med5002.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
}
