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
import { Med5004Form } from "./redux/model";

export default function Med5004() {
	const dispatch: AppDispatch = useDispatch();
	const { med5004, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5004: state.medReport.med5004,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5004Form>();
	const onFinish: FormProps<Med5004Form>["onFinish"] = async (
		value: Med5004Form
	) => {
		const data = await dispatch(handleOnPreview(med5004));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5004.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5004",
				reportName: "รายงานใบเรียกเงินคืนที่ยังไม่ได้รับคืน",
				reportDescription:
					"รายงานใบเรียกเงินคืนที่ยังไม่ได้รับคืน",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5004={med5004.form}
					form={form}
					onFinish={onFinish}
				/>
			}
		>
			{!_.isEmpty(med5004.grid.list) ? (
				<BaseGrid
					rows={med5004.grid.list}
					columns={columns}
					page={med5004.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5004, grid: { ...med5004.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
}
