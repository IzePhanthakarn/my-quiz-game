"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5011Form, setMed5011List, setMed5011TotalData } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5011Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import { handleOnExportExcel, handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import DownloadContent from "./DownloadContent";
import dayjs from "dayjs";
import { DateFormat } from "wcf-component-lib/src/constants/date-format.constant";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { handlePdfButton } from "./service";

export default function Med5011() {
	const dispatch: AppDispatch = useDispatch();
	const { med5011, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5011: state.medReport.med5011.form,
			list: state.medReport.med5011.grid.list,
			totalData: state.medReport.med5011.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5011Form>();

	const onFinish: FormProps<Med5011Form>["onFinish"] = async (
		value: Med5011Form
	) => {
		console.info("On Fin");
		let fromDateParam: string =dayjs(value.fromDate).format(DateFormat.YYYYMMDD);
		let toDateParam: string   =dayjs(value.toDate).format(DateFormat.YYYYMMDD);
		value.fromDate=fromDateParam;
		value.toDate=toDateParam;
		dispatch(setMed5011Form({...med5011,fromDate:fromDateParam,toDate:toDateParam}));
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5011)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			dispatch(setMed5011TotalData(totalData));
			dispatch(setMed5011List(list));
		}
	};
	return (
		<FormReportLayout
				handleSubmitButton={() => form.submit()}
				TotalItems={totalData}
				reportData={{
					systemName: `${MED_REPORT_SYSTEM}`,
					reportCode: "MED5011",
					reportName: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportDescription: "รายงานการยกเลิกเป็นสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportType: "5",
				}}
				downloadContent={
					<DownloadContent med5011={med5011} form={form} onFinish={onFinish} />
				}
			>
				{!_.isEmpty(list) ? (
						<><div className="col-span-4 flex justify-end">
					<BaseButton
						className="w-full;"
						label="Excel"
						onClick={() => {
							dispatch(handleOnExportExcel(med5011, REPORT_TYPES.MED5011));
						} } />
					<BaseButton
						className="w-1/6"
						label="Pdf"
						onClick={() => {
							dispatch(handlePdfButton(med5011));
						} } /> 
				</div><BaseGrid rows={list} columns={columns} /></>
				) : null}
			</FormReportLayout>
	);
}
