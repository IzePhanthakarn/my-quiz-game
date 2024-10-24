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

import { Med5013Form } from "./redux/model";

export default function Med5013() {
	const dispatch: AppDispatch = useDispatch();
	const { med5013, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5013: state.medReport.med5013,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5013Form>();
	const onFinish: FormProps<Med5013Form>["onFinish"] = async (
		value: Med5013Form
	) => {
		const data = await dispatch(handleOnPreview(med5013));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5013.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5013",
				reportName:
					"รายงานโรงพยาบาลที่อยู่ในระบบประกันสังคม",
				reportDescription:
					"รายงานโรงพยาบาลที่อยู่ในระบบประกันสังคม",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5013={med5013.form}
					form={form}
					onFinish={onFinish}
				/>
			}
		>
			{!_.isEmpty(med5013.grid.list) ? (
				<BaseGrid
					rows={med5013.grid.list}
					columns={columns}
					page={med5013.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5013, grid: { ...med5013.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
}
