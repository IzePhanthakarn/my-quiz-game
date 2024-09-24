"use client";

import React, { useEffect, useState } from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5010Form, setMed5010List } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { Med5010Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { REPORT_TYPES } from "@/constants/reports";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import {
	handleOnExportExcel,
	handlePreviewDisplay,
} from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import { handlePdfButton } from "./service";


export default function Med5010() {
	const dispatch: AppDispatch = useDispatch();
	const { med5010, list } = useSelector(
		(state: SliceModel) => ({
			med5010: state.medReport.med5010.form,
			list: state.medReport.med5010.list,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	const onFinish: FormProps<Med5010Form>["onFinish"] = async (
		value: Med5010Form
	) => {
		let fromDateParam: string =dayjs(value.fromDate).format(DateFormat.YYYYMMDD);
		let toDateParam: string   =dayjs(value.toDate).format(DateFormat.YYYYMMDD);
        dispatch(setMed5010Form({ ...med5010, fromDate: fromDateParam,toDate: toDateParam }));
        value.fromDate= fromDateParam;
        value.toDate= toDateParam;
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5010)
		);
		const list = data?.payload.content;
		if (!_.isEmpty(list)) {
			dispatch(setMed5010List(list));
		}

	};

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FormReportLayout
					reportData={{
						systemName: `${MED_REPORT_SYSTEM}`,
						reportCode: "MED5010",
						reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportDescription:
							"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportType: "5",
					}}
				>
					<BaseColumn className="space-y-4  h-full">
						<BaseForm initialValues={med5010} onFinish={onFinish}>
						<BaseDatePicker label="วันที่ยกเลิกสถานพยาบาล" itemName={"fromDate"}/>
						<BaseDatePicker label="ถึงวันที่" itemName={"toDate"}/>
						<br/>
							 <div className="flex justify-end items-end h-1\/2"> 
								<BaseButton
									label="เรียกรายงาน"
									className="w-[176px]"
									htmlType="submit"
								/>
							 </div>
						</BaseForm>
					</BaseColumn>
				</FormReportLayout>
			),
		});
	}, [dispatchLayout]);
	return (
		<>
			{!_.isEmpty(list) && (
				<>
				<div className="flex justify-end py-2 space-x-2">
				<BaseButton
					className="w-1/6"
					label="Excel"
					onClick={() => {
						dispatch(handleOnExportExcel(med5010, REPORT_TYPES.MED5010));
					}}
				/>
				<BaseButton
					className="w-1/6"
					label="Pdf"
					onClick={() => {
						dispatch(handlePdfButton(med5010));
					}}
				/>
			  </div>
			     <BaseGrid rows={list} columns={columns} />
				</>
			)}
		</>
	);
}
