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
import { Med5008Form } from "./redux/model";

export default function Med5008() {
	const dispatch: AppDispatch = useDispatch();
	const { med5008, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5008: state.medReport.med5008,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5008Form>();
	const onFinish: FormProps<Med5008Form>["onFinish"] = async (
		value: Med5008Form
	) => {
		const data = await dispatch(handleOnPreview(med5008));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5008.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5008",
				reportName: "รายงานวันสิ้นสุดใบอนุญาตสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานวันสิ้นสุดใบอนุญาตสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5008={med5008.form}
					form={form}
					onFinish={onFinish}
				/>
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
}
