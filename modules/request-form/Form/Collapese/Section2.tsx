import React from "react";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";

export default function Section2(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<div className="grid grid-cols-4 gap-y-2 gap-x-8">
			<BaseItemInput label={uuid ? "รหัสแพทย์" : "รหัสแพทย์ "} itemName={"doctorCode"} />
			<BaseItemInput label="ประเภท" itemName={""} />
			<BaseItemInput label="วุฒิบัตร" itemName={"diplomaType"} />
			<BaseItemInput label="เลขที่ภาษี" itemName={""} />
		</div>
	);
}
