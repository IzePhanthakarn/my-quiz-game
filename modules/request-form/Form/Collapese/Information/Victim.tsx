import React from "react";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";

export default function Victim(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<div className="grid grid-cols-4 gap-y-2 gap-x-8 p-2">
			<div className="col-span-4 items-center grid grid-cols-4 gap-y-2 gap-x-8">
				<BaseItemInput label="เลขที่ประสบอันตราย" itemName={"requestFormCode"} />
				<BaseButton className="w-32" label="ตรวจสอบข้อมูล" />
			</div>
			<BaseItemInput label="เลขที่บัตรประจำตัวประชาชน" itemName={"employeeCitizenId"}/>
			<BaseDatePicker label="วันที่รับแจ้ง" itemName={"approveDate"} />
			<BaseDatePicker label="วันที่ประสบอันตราย" itemName={"assessDate"} />
			<BaseItemInput label="ชื่อ-นามสกุล" itemName={"userName"} />
		</div>
	);
}
