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

import dynamic from "next/dynamic";
import { handleOnPreview } from "./service";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { Med5001Form } from "./redux/model";
import DownloadContent from "./DownloadContent";

const Med5001 = () => {
	const dispatch: AppDispatch = useDispatch();
	const { med5001, isLoading } = useSelector(
		(state: SliceModel) => ({
			med5001: state.medReport.med5001,
			isLoading: state.container.isLoading,
		}),
		shallowEqual
	);
	const [form] = Form.useForm<Med5001Form>();
	const onFinish: FormProps<Med5001Form>["onFinish"] = async (
		value: Med5001Form
	) => {
		const data = await dispatch(handleOnPreview(med5001));
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={med5001.grid.page.totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5001",
				reportName:
					"ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
				reportDescription:
					"ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent
					med5001={med5001.form}
					form={form}
					onFinish={onFinish}
				/>
			}
		>
			{!_.isEmpty(med5001.grid.list) ? (
				<BaseGrid
					rows={med5001.grid.list}
					columns={columns}
					page={med5001.grid.page}
					loading={isLoading}
					twoToneColor={true}
					setPagination={(page) => {
						dispatch(
							handleOnPreview({ ...med5001, grid: { ...med5001.grid, page } })
						);
					}}
				/>
			) : null}
		</FormReportLayout>
	);
};
export default dynamic(() => Promise.resolve(Med5001), {
	ssr: false,
});
