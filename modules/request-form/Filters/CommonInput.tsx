import React from "react";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";

export default function CommonInput() {
	return (
		<div className="grid grid-cols-5 gap-y-2 gap-x-8 p-2">
			<BaseItemInput label="เลขที่ใบคำขอ" itemName={"requestFormCode"} />
			<BaseItemInput
				label="เลขที่ประสบอันตราย"
				itemName={"accidentIssueCode"}
			/>
			<BaseItemInput label="รหัสแพทย์" itemName={"doctorCode"} />
			<BaseDatePicker label="วันที่ออกใบคำขอ" itemName={""} />
			<BaseDatePicker label="ถึงวันที่" itemName={""} />
		</div>
	);
}
