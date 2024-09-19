"use client";

import React, { useEffect, useState } from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import FormReportLayout from "wcf-component-lib/src/layout/FormRequestLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";
import { MED_REPORT_SYSTEM } from "../model";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import { setMed5009Form, setMed5009List } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { Med5009Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import { REPORT_TYPES } from "@/constants/reports";
import {
	handleOnExportExcel,
	handleOnExportPdf,
	handlePreviewDisplay,
} from "@/utils/report/common";
import _ from "lodash";
import { columns } from "./model";
import { LtPropertiesList } from "wcf-component-lib/src/components/BaseDropDown/service/api";
import { handlePdfButton } from "./service";

export default function Med5009() {
	const dispatch: AppDispatch = useDispatch();
	const { med5009, list } = useSelector(
		(state: SliceModel) => ({
			med5009: state.medReport.med5009.form,
			list: state.medReport.med5009.list,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	const onFinish: FormProps<Med5009Form>["onFinish"] = async (
		value: Med5009Form
	) => {
		dispatch(setMed5009Form({ ...med5009, propertyCode: value.propertyCode }));
		const data = await dispatch(
			handlePreviewDisplay(value, REPORT_TYPES.MED5009)
		);
		const list = data?.payload.content;
		if (!_.isEmpty(list)) {
			dispatch(setMed5009List(list));
		}
	};

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FormReportLayout
					reportData={{
						systemName: `${MED_REPORT_SYSTEM}`,
						reportCode: "MED5009",
						reportName: "รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportDescription:
							"รายงานจำนวนสถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportType: "5",
					}}
				>
					<BaseColumn className="space-y-4  h-full">
						<BaseForm initialValues={med5009} onFinish={onFinish}>
							<MedDropDown
								itemName="propertyCode"
								label="ระดับของสถานพยาบาล"
								type={SESSION_NAME.HOSPITAL_TYPE}
							/>
							<div className="flex justify-end items-end h-full">
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
					</div>
					<BaseGrid rows={list} columns={columns} />
				</>
			)}
		</>
	);
}
