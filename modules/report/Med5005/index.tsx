"use client";

import React, { useEffect, useState } from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5005Form, setMed5005List } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { Med5005Form } from "./redux/model";
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
import { BaseItemInput } from "wcf-component-lib/src/components";


export default function Med5005() {
	const dispatch: AppDispatch = useDispatch();
	const { med5005, list } = useSelector(
		(state: SliceModel) => ({
			med5005: state.medReport.med5005.form,
			list: state.medReport.med5005.grid.list,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	const onFinish: FormProps<Med5005Form>["onFinish"] = async (
		value: Med5005Form
	) => {
		
		let fromDateParam: string =dayjs(value.fromDate).format(DateFormat.YYYYMMDD);
		let toDateParam: string   =dayjs(value.toDate).format(DateFormat.YYYYMMDD);
        dispatch(setMed5005Form({ ...med5005, fromDate: fromDateParam,toDate: toDateParam ,provinceCode: value.provinceCode}));
        value.fromDate= fromDateParam;
        value.toDate= toDateParam;
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5005)
		);
		const list = data?.payload.content;
		if (!_.isEmpty(list)) {
			dispatch(setMed5005List(list));
		}

	};

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FormReportLayout
					reportData={{
						systemName: `${MED_REPORT_SYSTEM}`,
						reportCode: "MED5005",
						reportName: "รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
						reportDescription:
							"รายงานทะเบียนรายชื่อแพทย์ผู้ประเมินการสูญเสียสมรรถภาพทางกายและจิตใจของสำนักงานประกันสังคม",
						reportType: "5",
					}}
				>
					<BaseColumn className="space-y-4  h-full">
						<BaseForm initialValues={med5005} onFinish={onFinish}>
                        <BaseItemInput label="รหัสหน่วยงาน"  itemName={"ssoCode"}></BaseItemInput> <BaseItemInput label="จังหวัดปลายทาง"  itemName={"provinceCode"}></BaseItemInput>
						<BaseDatePicker label="ตั้งวันที่ฝึกอบรม" itemName={"fromDate"}/>
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
						dispatch(handleOnExportExcel(med5005, REPORT_TYPES.MED5005));
					}}
				/>
				<BaseButton
					className="w-1/6"
					label="Pdf"
					onClick={() => {
						dispatch(handlePdfButton(med5005));
					}}
				/>
			  </div>
			     <BaseGrid rows={list} columns={columns} />
				</>
			)}
		</>
	);
}
