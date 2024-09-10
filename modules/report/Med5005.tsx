"use client";

import React, { useEffect } from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import FormReportLayout from "wcf-component-lib/src/layout/FormRequestLayout";
import { useLayout } from "wcf-component-lib/src/provider/LayoutProvider";

export default function Med5005() {
	const { dispatchLayout } = useLayout();

	useEffect(() => {
		dispatchLayout({
			type: "setChildrenHeader",
			payload: (
				<FormReportLayout
					reportData={{
						systemName: "Med5005",
						reportCode: "trewqwe",
						reportName: "qwewqeqwe",
						reportDescription: "qwewqeqwewqeqweqweqqweqwewqewq",
						reportType: "qweqw",
					}}
				>
					<BaseColumn className="space-y-4">
						<BaseItemInput label="รหัสหน่วยงาน" />
						<BaseItemInput label="โรงพยาบาลประจำจังหวัด" />
						<BaseDatePicker label="ตั้งแต่วันที่ฝึกอบรม" />
						<BaseDatePicker label="ถึงวันที่" />
					</BaseColumn>
				</FormReportLayout>
			),
		});
	}, [dispatchLayout]);
	return <></>;
}
