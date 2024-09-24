"use client";

import React, { useEffect, useState } from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5011Form, setMed5011List } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { Med5011Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { REPORT_TYPES } from "@/constants/reports";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import {
	handleOnExportExcel,
	handleOnExportPdf,
	handlePreviewDisplay,
} from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import { handlePdfButton } from "./service";


export default function Med5011() {
	const dispatch: AppDispatch = useDispatch();
	const { med5011, list } = useSelector(
		(state: SliceModel) => ({
			med5011: state.medReport.med5011.form,
			list: state.medReport.med5011.list,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	const onFinish: FormProps<Med5011Form>["onFinish"] = async (
		value: Med5011Form
	) => {
		let fromDateParam: string =dayjs(value.fromDate).format(DateFormat.YYYYMMDD);
		let toDateParam: string   =dayjs(value.toDate).format(DateFormat.YYYYMMDD);
        dispatch(setMed5011Form({ ...med5011, fromDate: fromDateParam,toDate: toDateParam }));
        value.fromDate= fromDateParam;
        value.toDate= toDateParam;
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5011)
		);
		const list = data?.payload.content;
		if (!_.isEmpty(list)) {
			dispatch(setMed5011List(list));
		}

	};

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FormReportLayout
					reportData={{
						systemName: `${MED_REPORT_SYSTEM}`,
						reportCode: "MED5011",
						reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportDescription:
							"รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportType: "5",
					}}
				>
					<BaseColumn className="space-y-4  h-full">
						<BaseForm initialValues={med5011} onFinish={onFinish}>
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
						dispatch(handleOnExportExcel(med5011, REPORT_TYPES.MED5011));
					}}
				/>
				<BaseButton
					className="w-1/6"
					label="Pdf"
					onClick={() => {
						dispatch(handlePdfButton(med5011));
					}}
				/>
			  </div>
			     <BaseGrid rows={list} columns={columns} />
				</>
			)}
		</>
	);
}
