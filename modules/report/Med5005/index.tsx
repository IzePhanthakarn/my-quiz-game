"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5005Form, setMed5001Grid } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5005Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import { handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";

export default function Med5005() {
	const dispatch: AppDispatch = useDispatch();
	const { med5005, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5005: state.medReport.med5005.form,
			list: state.medReport.med5005.grid.list,
			totalData: state.medReport.med5005.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5005Form>();

	const onFinish: FormProps<Med5005Form>["onFinish"] = async (
		value: Med5005Form
	) => {

		// if  ( _.isEmpty(value.fromDate) ) {
		// 	alert("กรุณาใส่ข้อมูล วันที่ยกเลิกสถานพยาบาล" );
		// 	return;
		// }
		// if  ( _.isEmpty(value.toDate) ) {
		// 	alert("กรุณาใส่ข้อมูล ถึงวันที่" );
		// 	return;
		// }
		// let fromDateParam: string = dayjs(value.fromDate).format(
		// 	DateFormat.YYYYMMDD
		// );
		// let toDateParam: string = dayjs(value.toDate).format(DateFormat.YYYYMMDD);
		// dispatch(
		// 	setMed5005Form({
		// 		...med5005,
		// 		fromDate: fromDateParam,
		// 		toDate: toDateParam,
		// 		provinceCode: value.provinceCode,
		// 		showDownload: "Y"
		// 	})
		// );
		//value.fromDate = fromDateParam;
		//value.toDate = toDateParam;
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5005)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			//dispatch(setMed5005TotalData(totalData));
			//dispatch(setMed5005List(list));
		}
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5005",
				reportName:
					"รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
				reportDescription:
					"รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
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
