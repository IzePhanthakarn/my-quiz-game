import _ from "lodash";
import React from "react";
import BaseColumn from "wcf-component-lib/src/components/BaseColumn";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
import BaseRadio from "wcf-component-lib/src/components/BaseRadio";
import BaseRow from "wcf-component-lib/src/components/BaseRow";
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
			{!uuid ? (
				<BaseColumn className="space-y-2">
					<div className="grid grid-cols-4 gap-y-2 gap-x-8">
						<BaseDatePicker
							label="วันที่ทำการตรวจสอบ"
							itemName={"assessDate"}
						/>
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
								onClickFunction={() => {}}
							/>
						</div>
					</div>

					<BaseItemInput label="ค่าตรวจประเมิน" itemName={"fareAmount"} />
					<BaseItemInput label="ผู้บันทึก" itemName={"userName"} />
				</BaseColumn>
			) : (
				<></>
			)}
		</div>
	);
}

// {!_.isEmpty(uuid) ? (
// 	<div className="flex space-x-2">
// 		<BaseItemInput label="ทำการตรวจ ณ" itemName={"inAnotherPlace"} />
// 		<BaseItemInput label="ทำการตรวจ ณ" itemName={"inAnotherPlace"} />
// 	</div>
// ) : (
// 	<div className="flex flex-col space-x-2">
// 		<BaseItemInput label="ทำการตรวจ ณ" itemName={"inAnotherPlace"} />
// 		<BaseRadio itemName={"inAnotherPlace"} items={atPlace} />
// 	</div>
// )}
// <BaseItemInput label="ค่าตรวจประเมิน" itemName={"fareAmount"} />
// {!_.isEmpty(uuid) && (
// 	<BaseItemInput label="ผู้บันทึก" itemName={"userName"} />
// )}
