"use client";

import React from "react";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { MED_REPORT_SYSTEM } from "../model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5009Form, setMed5009List, setMed5009TotalData } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { Med5009Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import { REPORT_TYPES } from "@/constants/reports";
import { handlePreviewDisplay } from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import DownloadContent from "./DownloadContent";

export default function Med5009() {
	const dispatch: AppDispatch = useDispatch();
	const { med5009, list, totalData } = useSelector(
		(state: SliceModel) => ({
			med5009: state.medReport.med5009.form,
			list: state.medReport.med5009.grid.list,
			totalData: state.medReport.med5009.grid.page.totalData,
		}),
		shallowEqual
	);

	const [form] = Form.useForm<Med5009Form>();

	const onFinish: FormProps<Med5009Form>["onFinish"] = async (
		value: Med5009Form
	) => {
		dispatch(setMed5009Form({ ...med5009, propertyCode: value.propertyCode }));
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5009)
		);
		const list = data?.payload.content;
		const totalData = data?.payload.totalElements;
		if (!_.isEmpty(list)) {
			dispatch(setMed5009TotalData(totalData));
			dispatch(setMed5009List(list));
		}
	};

	return (
		<>
			<FormReportLayout
				handleSubmitButton={() => form.submit()}
				TotalItems={totalData}
				reportData={{
					systemName: `${MED_REPORT_SYSTEM}`,
					reportCode: "MED5009",
					reportName: "รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportDescription:
						"รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
					reportType: "5",
				}}
				downloadContent={
					<DownloadContent med5009={med5009} form={form} onFinish={onFinish} />
				}
			>
				{!_.isEmpty(list) ? (
					<>
						{/* <div className="flex justify-end py-2 space-x-2">
							<BaseButton
								className="w-1/6"
								label="Excel"
								onClick={() => {
									dispatch(handleOnExportExcel(med5009, REPORT_TYPES.MED5009));
								}}
							/>
							<BaseButton
								className="w-1/6"
								label="Pdf"
								onClick={() => {
									dispatch(handlePdfButton(med5009));
								}}
							/>
						</div> */}
						<BaseGrid rows={list} columns={columns} />
					</>
				) : null}
			</FormReportLayout>
		</>
	);
}
