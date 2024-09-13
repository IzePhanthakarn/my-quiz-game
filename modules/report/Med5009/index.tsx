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
import { setMed5009Form } from "../redux";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { Med5009Form } from "./redux/model";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";

export default function Med5009() {
	const dispatch: AppDispatch = useDispatch();
	const { form } = useSelector(
		(state: SliceModel) => ({
			form: state.medReport.med5009.form,
		}),
		shallowEqual
	);

	const { dispatchLayout } = useLayout();

	const onFinish: FormProps<Med5009Form>["onFinish"] = (value: Med5009Form) => {
		console.log("value", value);
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
					<BaseColumn className="space-y-4 h-full">
						<BaseForm initialValues={form} onFinish={onFinish}>
							<MedDropDown
								itemName="propertyCode"
								label="ระดับของสถานพยาบาล"
								getValue={(e) => {
									dispatch(setMed5009Form({ ...form, propertyCode: e }));
								}}
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
			{/* <MedDropDown
				notForm
				value={form.propertyCode}
				label="ระดับของสถานพยาบาล"
				getValue={(e) => {
					console.log("eee", e);
					dispatch(setMed5009Form({ ...form, propertyCode: e }));
				}}
				type={SESSION_NAME.HOSPITAL_TYPE}
			/>
			<BaseButton
				label="เรียกรายงาน"
				className="w-[176px] py-2 px-8"
				onClick={() => {
					console.log("form", form);
				}}
			/> */}
			<BaseGrid rows={[]} columns={[]} />
		</>
	);
}
