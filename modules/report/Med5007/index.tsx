"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5007Form, setMed5007List, setMed5007TotalData } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5007Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportExcel, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import DownloadContent from "./DownloadContent";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handlePdfButton } from "./service";

export default function Med5007() {
	const dispatch: AppDispatch = useDispatch();
	const { med5007, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5007: state.medReport.med5007.form,
			list: state.medReport.med5007.grid.list,
			totalData: state.medReport.med5007.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5007Form>();

	const onFinish: FormProps<Med5007Form>["onFinish"] = async (
		value: Med5007Form
	) => {
		dispatch(setMed5007Form({ ...med5007, hospitalCategory: value.hospitalCategory }));
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5007)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			dispatch(setMed5007TotalData(totalData));
			dispatch(setMed5007List(list));
		}
	};

	return (
		<>
			<FormReportLayout
				handleSubmitButton={() => form.submit()}
				TotalItems={totalData}
				reportData={{
					systemName: `${MED_REPORT_SYSTEM}`,
					reportCode: "MED5007",
					reportName: "รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportDescription:
						"รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportType: "5",
				}}
				downloadContent={
					<DownloadContent med5007={med5007} form={form} onFinish={onFinish} />
				}
			>
				{!_.isEmpty(list) ? (
						<><div className="col-span-4 flex justify-end">
					<BaseButton
						className="w-full;"
						label="Excel"
						onClick={() => {
							dispatch(handleOnExportExcel(med5007, REPORT_TYPES.MED5007));
						} } />
					<BaseButton
						className="w-1/6"
						label="Pdf"
						onClick={() => {
							dispatch(handlePdfButton(med5007));
						} } /> 
				</div><BaseGrid rows={list} columns={columns} /></>
				) : null}
			</FormReportLayout>
		</>
	);
}
