"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5001Form, setMed5001Grid } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5001Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import { handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";


export default function Med5001() {
	const dispatch: AppDispatch = useDispatch();
	const { med5001, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5001: state.medReport.med5001.form,
			list: state.medReport.med5001.grid.list,
			totalData: state.medReport.med5001.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5001Form>();

	const onFinish: FormProps<Med5001Form>["onFinish"] = async (
		value: Med5001Form
	) => {
		let fromDateParam: string = dayjs(value.fromDate).format(
			DateFormat.YYYYMMDD
		);
		let toDateParam: string = dayjs(value.toDate).format(DateFormat.YYYYMMDD);
		value.fromDate=fromDateParam;
		value.toDate=toDateParam;
		dispatch(
			setMed5001Form({
				...med5001,
				fromDate: fromDateParam,
				toDate: toDateParam,
				ssoCode: value.ssoCode,
				showDownload: "Y"
			})
		);
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5001)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			//dispatch(setMed5001TotalData(totalData));
			//dispatch(setMed5001List(list));
		}
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5001",
				reportName: "ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
				reportDescription:
					"ทะเบียนคุมการจ่ายค่าตอบแทนให้แก่แพทย์ผู้ประเมินการสูญเสียสมรรถภาพ",
				reportType: "5",
			}}
			downloadContent={
				<div className="grid grid-cols-4 gap-x-6 gap-y-5"></div>
			}
		>
			{!_.isEmpty(list) ? <BaseGrid rows={list} columns={columns} /> : null}
		</FormReportLayout>
	);
}
