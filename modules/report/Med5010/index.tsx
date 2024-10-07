"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5010Form, setMed5010List, setMed5010TotalData } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5010Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import { handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";

import DownloadContent from "./DownloadContent";

export default function Med5010() {
	const dispatch: AppDispatch = useDispatch();
	const { med5010, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5010: state.medReport.med5010.form,
			list: state.medReport.med5010.grid.list,
			totalData: state.medReport.med5010.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5010Form>();

	const onFinish: FormProps<Med5010Form>["onFinish"] = async (
		value: Med5010Form
	) => {

		if  ( _.isEmpty(value.hospitalType) ) {
			alert("กรุณาใส่ข้อมูล ระดับของสถานพยาบาล" );
			return;
		}
		if  ( _.isEmpty(value.hospitalCategory) ) {
			alert("กรุณาใส่ข้อมูล ประเภทของสถานพยาบาล" );
			return;
		}
		if  ( _.isEmpty(value.ssoProject) ) {
			alert("กรุณาใส่ข้อมูล โครงการประกันสังคม" );
			return;
		}
		 
		dispatch(
			setMed5010Form({
				...med5010,
				hospitalType: value.hospitalType,
				hospitalCategory: value.hospitalCategory,
				ssoProject: value.ssoProject,
				showDownload:'Y'
			})
		);
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5010)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			dispatch(setMed5010TotalData(totalData));
			dispatch(setMed5010List(list));
		}
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5010",
				reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportType: "5",
			}}
			downloadContent={
				<DownloadContent med5010={med5010} form={form} onFinish={onFinish} />
			}
		>
			{!_.isEmpty(list) ? <BaseGrid rows={list} columns={columns} /> : null}
		</FormReportLayout>
	);
}
