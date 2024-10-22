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
import { Med5003Form } from "./redux/model";

export default function Med5003() {
	const dispatch: AppDispatch = useDispatch();
	const { med5003, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5003: state.medReport.med5003,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5003Form>();
	const onFinish: FormProps<Med5003Form>["onFinish"] = async (
		value: Med5003Form
	) => {
		const data = await dispatch(handleOnPreview(med5003));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5003.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5003",
				reportName: "รายงานใบสั่งจ่ายค้างจ่าย",
				reportDescription:
					"รายงานใบสั่งจ่ายค้างจ่าย",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5003={med5003.form}
					form={form}
					onFinish={onFinish}
				/>
			}
		>
			{!_.isEmpty(med5003.grid.list) ? (
				<BaseGrid
					rows={med5003.grid.list}
					columns={columns}
					page={med5003.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5003, grid: { ...med5003.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
}
