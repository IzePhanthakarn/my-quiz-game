import _ from "lodash";
import React from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseRadio from "wcf-component-lib/src/components/BaseRadio";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";
import BaseItemCheckbox from "wcf-component-lib/src/components/BaseItemCheckbox/BaseItemCheckbox";
export default function Section3(props: { uuid: boolean }) {
	const { uuid } = props;
	const option = [{ label: "โรงพยาบาลหมี", value: "โรงพยาบาลหมี" }];
	const items = [
		{ label: "ในสถานที่ ณ", value: "ในสถานที่ ณ" },
		{ label: "นอกสถานที่ ณ", value: "นอกสถานที่ ณ" },
	];
	return (
		<div>
			{uuid ? (
				<div className="grid grid-cols-4 gap-y-2 gap-x-8">
					<BaseDatePicker label="วันที่ทำการตรวจสอบ" itemName={"assessDate"} />
					<BaseDatePicker label="วันที่ออกใบคำขอ" itemName={"approveDate"} />
					<div className="col-span-2 items-end grid grid-cols-3 gap-x-8">
						<BaseRadio
							label="ทำการตรวจ ณ"
							itemName={"inAnotherPlace"}
							items={items}
						/>
						<BaseDropDown itemName={"inAnotherPlace"} option={option} />
						<BaseItemCheckbox
							label="อื่นๆ"
							itemName={""}
							onClickFunction={() => {
								console.log("");
							}}
						/>
					</div>
					<BaseItemInput label="ค่าตรวจประเมิน" itemName={"fareAmount"} />
				</div>
			) : (
				<div className="grid grid-cols-4 gap-y-2 gap-x-8">
					<BaseDatePicker label="วันที่ทำการตรวจสอบ" itemName={"assessDate"} />
					<BaseDatePicker label="วันที่ออกใบคำขอ" itemName={"approveDate"} />
					<BaseDatePicker label="ทำการตรวจ ณ" itemName={"inAnotherPlace"} />
					<BaseItemInput label="ค่าตรวจประเมิน" itemName={"fareAmount"} />
					<BaseItemInput label="ผู้บันทึก" itemName={"userName"} />
				</div>
			)}
		</div>
	);
}
