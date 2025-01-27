import _ from "lodash";
import React from "react";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseRadio from "wcf-component-lib/src/components/BaseRadio";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";

export default function Creating() {
	const option = [{ label: "โรงพยาบาลหมี", value: "โรงพยาบาลหมี" }];
	const items = [
		{ label: "ในสถานที่", value: "ในสถานที่" },
		{ label: "นอกสถานที่", value: "นอกสถานที่" },
	];
	return (
		<div className="grid grid-cols-4 gap-y-2 gap-x-8">
			<BaseDatePicker label="วันที่ทำการตรวจสอบ" itemName={"assessDate"} />
			<BaseDatePicker label="วันที่ออกใบคำขอ" itemName={"approveDate"} />
			<div className="col-span-2 grid grid-cols-7">
				<BaseRadio
					isVertical
					items={items}
					label="สถานที่ทำการตรวจ"
					itemName={"inAnotherPlace"}
				/>
				<div className="col-span-3">
					<BaseDropDown
						className="mt-8"
						itemName={"inAnotherPlace"}
						option={option}
					/>
				</div>
			</div>
			<BaseItemInput label="ค่าตรวจประเมิน" itemName={"fareAmount"} />
			<BaseItemInput label="ผู้บันทึก" itemName={"userName"} />
		</div>
	);
}
