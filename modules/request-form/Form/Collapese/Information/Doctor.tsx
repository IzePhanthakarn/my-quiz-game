import React from "react";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import { HomeHospital } from "wcf-component-lib/node_modules/iconoir-react/";

export default function Doctor(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<div>
			<BaseHorizontalHeader title={"แพทย์ผู้ตรวจประเมิน"} icons={<HomeHospital />}/>
			<div className="grid grid-cols-4 gap-y-2 gap-x-8 p-2">
				<BaseItemInput label="รหัสแพทย์" itemName={"doctorCode"} />
				<BaseItemInput label="ชื่อแพทย์" itemName={"doctorCode"} />
				<div></div>
				<div></div>
				<BaseItemInput label="ประเภท" itemName={""} />
				<BaseItemInput label="เลขที่ภาษี" itemName={""} />
				<BaseItemInput label="วุฒิบัตร" itemName={"diplomaType"} />
			</div>
		</div>
	);
}
