import React from "react";
import BaseHorizontalHeader from "wcf-component-lib/src/components/BaseHorizontalHeader";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import HomeFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/HomeFilled";
export default function Address(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<div>
			<BaseHorizontalHeader title={"ที่อยู่"} icons={<HomeFilled />} />
			<div className="grid grid-cols-4 gap-y-2 gap-x-8 p-2">
				<BaseItemInput label="เลขที่" itemName={"houseNum"} />
				<BaseItemInput label="หมู่ที่" itemName={"moo"} />
				<BaseItemInput label="ถนน" itemName={"road"} />
				<BaseItemInput label="ซอย" itemName={"soi"} />
				<BaseItemInput label="แขวง/ตำบล" itemName={"tambol"} />
				<BaseItemInput label="เขต/อำเภอ" itemName={"amphur"} />
				<BaseItemInput label="จังหวัด" itemName={"province"} />
				<BaseItemInput label="รหัสไปรษณีย์" itemName={"postCode"} />
			</div>
		</div>
	);
}
