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
import { Med5007Form } from "./redux/model";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import DownloadContent from "./DownloadContent";

export default function Med5007() {
	const dispatch: AppDispatch = useDispatch();
	const { med5007, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5007: state.medReport.med5007,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5007Form>();
	const onFinish: FormProps<Med5007Form>["onFinish"] = async (
		value: Med5007Form
	) => {
		const data = await dispatch(handleOnPreview(med5007));
	};

	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5007.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5007",
				reportName: "รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5007={med5007.form}
					form={form}
					onFinish={onFinish}
				/>
			}
		>
			{!_.isEmpty(med5007.grid.list) ? (
				<BaseGrid
					rows={med5007.grid.list}
					columns={columns}
					page={med5007.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5007, grid: { ...med5007.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
}
