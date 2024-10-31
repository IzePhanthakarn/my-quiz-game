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
import { Med5010Form } from "./redux/model";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import DownloadContent from "./DownloadContent";

export default function Med5010() {
	const dispatch: AppDispatch = useDispatch();
	const { med5010, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5010: state.medReport.med5010,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5010Form>();
	const onFinish: FormProps<Med5010Form>["onFinish"] = async (
		value: Med5010Form
	) => {
		const data = await dispatch(handleOnPreview(med5010));
	};

	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5010.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5010",
				reportName: "รายงานชื่อสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานชื่อสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5010={med5010.form}
					form={form}
					onFinish={onFinish}
				/>
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
}
