"use client";

import React, { useEffect } from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import FormReportLayout from "wcf-component-lib/src/layout/FormReportLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";
import { MED_REPORT_SYSTEM } from "./model";
import MedDropDown from "@/components/MedDropDown";
import { SESSION_NAME } from "@/components/MedDropDown/model";

export default function Med5007() {
	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FormReportLayout
					reportData={{
						systemName: `${MED_REPORT_SYSTEM}`,
						reportCode: "MED5007",
						reportName:
							"รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportDescription:
							"รายงานชื่อที่อยู่สถานพยาบาลในความตกลงของกองทุนเงินทดแทน",
						reportType: "5",
					}}
				>
					<BaseColumn className="space-y-4">
						<MedDropDown
							label="ระดับของสถานพยาบาล"
							type={SESSION_NAME.HOSPITAL_TYPE}
						/>
						<MedDropDown
							label="ประเภทของสถานพยาบาล"
							type={SESSION_NAME.HOSPITAL_TYPE}
						/>
					</BaseColumn>
				</FormReportLayout>
			),
		});
	}, [dispatchLayout]);
	return <div></div>;
}
