import React from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseRadio, {
	RadioItems,
} from "wcf-component-lib/src/components/BaseRadio";

export default function Detail() {
	const genderItems: RadioItems[] = [
		{ value: 1, label: "test1" },
		{ value: 2, label: "test2" },
		{ value: 3, label: "test3" },
		{ value: 4, label: "test4" },
	];
	return (
		<div className="grid grid-cols-4 gap-y-9 gap-x-8">
			<div className="col-span-4">Detail</div>
			<div className="col-span-4">
				<BaseItemInput
					label="เลขที่บัตรประจำตัวประชาชน"
					itemName="clinicCode"
					rules={[]}
					value={""}
					onChangeFunction={() => {}}
				/>
			</div>
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName="clinicCode"
				rules={[]}
				value={""}
				onChangeFunction={() => {}}
			/>
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName="clinicCode"
				rules={[]}
				value={""}
				onChangeFunction={() => {}}
			/>
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName="clinicCode"
				rules={[]}
				value={""}
				onChangeFunction={() => {}}
			/>
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName="clinicCode"
				rules={[]}
				value={""}
				onChangeFunction={() => {}}
			/>
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName="clinicCode"
				rules={[]}
				value={""}
				onChangeFunction={() => {}}
			/>
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName="clinicCode"
				rules={[]}
				value={""}
				onChangeFunction={() => {}}
			/>
			<div className="col-span-2">
				<BaseRadio
					value={null}
					setValue={() => {}}
					items={genderItems}
					itemName={"gender"}
				/>
			</div>
		</div>
	);
}
