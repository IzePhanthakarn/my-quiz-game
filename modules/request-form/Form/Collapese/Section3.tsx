import React from "react";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";

export default function Section3() {
	return (
		<div className="grid grid-cols-4 gap-y-2 gap-x-8">
			<BaseDatePicker label="วันที่ทำการตรวจสอบ" itemName={"assessDate"} />
			<BaseDatePicker label="วันที่ออกใบคำขอ" itemName={"approveDate"} />
			<BaseItemInput label="ทำการตรวจ ณ" itemName={"inAnotherPlace"} />
			<BaseItemInput label="ค่าตรวจประเมิน" itemName={"fareAmount"} />
			<BaseItemInput label="ผู้บันทึก" itemName={"userName"} />
		</div>
	);
}
