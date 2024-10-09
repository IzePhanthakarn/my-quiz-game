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
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import DownloadContent from "./DownloadContent";
import { handleOnPreview } from "./service";

import { Med5005Form } from "./redux/model";

export default function Med5005() {
	const dispatch: AppDispatch = useDispatch();
	const { med5005, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5005: state.medReport.med5005,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5005Form>();
	const onFinish: FormProps<Med5005Form>["onFinish"] = async (
		value: Med5005Form
	) => {
		const data = await dispatch(handleOnPreview(med5005));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
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
				<DownloadContent
					med5005={med5005.form}
					form={form}
					onFinish={onFinish}
				/>
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
}
