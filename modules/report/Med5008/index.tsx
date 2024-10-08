"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5008Form, setMed5008Grid } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5008Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import {
	handlePreviewDisplay,
} from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";


export default function Med5008() {
	const dispatch: AppDispatch = useDispatch();
	const { med5008, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5008: state.medReport.med5008.form,
			list: state.medReport.med5008.grid.list,
			totalData: state.medReport.med5008.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5008Form>();

	const onFinish: FormProps<Med5008Form>["onFinish"] = async (
		value: Med5008Form
	) => {
		if  ( _.isEmpty(value.sp7expiredFrom) ) {
			alert("กรุณาใส่ข้อมูล วันที่สิ้นสุดใบอนุญาต(สพ.7)" );
			return;
		}
		if  ( _.isEmpty(value.sp7expiredTo) ) {
			alert("กรุณาใส่ข้อมูล วันที่สิ้นสุดใบอนุญาต(สพ.7) ถึงวันที่" );
			return;
		}
		if  ( _.isEmpty(value.sp19expiredFrom) ) {
			alert("กรุณาใส่ข้อมูล วันที่สิ้นสุดใบอนุญาต(สพ.19)");
			return;
		}
		if  ( _.isEmpty(value.sp19expiredTo) ) {
			alert("กรุณาใส่ข้อมูล วันที่สิ้นสุดใบอนุญาต(สพ.19) ถึงวันที่" );
			return;
		}
		let sp7fromDateParam: string = dayjs(value.sp7expiredFrom).format(
			DateFormat.YYYYMMDD
		);
		let sp7toDateParam: string = dayjs(value.sp7expiredTo).format(
			DateFormat.YYYYMMDD
		);
		let sp19fromDateParam: string = dayjs(value.sp19expiredFrom).format(
			DateFormat.YYYYMMDD
		);
		let sp19toDateParam: string = dayjs(value.sp19expiredTo).format(
			DateFormat.YYYYMMDD
		);
		value.sp7expiredFrom = sp7fromDateParam;
		value.sp7expiredTo = sp7toDateParam;
		value.sp19expiredFrom = sp19fromDateParam;
		value.sp19expiredTo = sp19toDateParam;

		dispatch(
			setMed5008Form({
				...med5008,
				sp7expiredFrom: sp7fromDateParam,
				sp7expiredTo: sp7toDateParam,
				sp19expiredFrom: sp19fromDateParam,
				sp19expiredTo: sp19toDateParam,
				showDownload:'Y'
			})
		);
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5008)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			//dispatch(setMed5008TotalData(totalData));
			//dispatch(setMed5008List(list));
		}
	};
	return (
		<FormReportLayout
			handleSubmitButton={() => form.submit()}
			TotalItems={totalData}
			reportData={{
				systemName: `${MED_REPORT_SYSTEM}`,
				reportCode: "MED5008",
				reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
				reportDescription:
					"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
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
