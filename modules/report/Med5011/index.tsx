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
import { Med5011Form } from "./redux/model";
import DownloadContent from "./DownloadContent";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

export default function Med5011() {
	const dispatch: AppDispatch = useDispatch();
	const { med5011, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5011: state.medReport.med5011,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5011Form>();
	const onFinish: FormProps<Med5011Form>["onFinish"] = async (
		value: Med5011Form
	) => {
		const data = await dispatch(handleOnPreview(med5011));
	};

	return (
		<>
			<FormReportLayout
				handleSubmitButton={() => form.submit()}
				TotalItems={med5011.grid.page.totalData}
				reportData={{
					systemName: `${MED_REPORT_SYSTEM}`,
					reportCode: "MED5011",
					reportName:
						"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportDescription:
						"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportType: "5",
				}}
				downloadContent={
					<DownloadContent
						med5011={med5011.form}
						form={form}
						onFinish={onFinish}
					/>
				}
			>
				{!_.isEmpty(med5011.grid.list) ? (
					<BaseGrid
						rows={med5011.grid.list}
						columns={columns}
						page={med5011.grid.page}
						loading={isLoading}
						twoToneColor={true}
						setPagination={(page) => {
							dispatch(
								handleOnPreview({ ...med5011, grid: { ...med5011.grid, page } })
							);
						}}
					/>
				) : null}
			</FormReportLayout>
		</>
	);
}
