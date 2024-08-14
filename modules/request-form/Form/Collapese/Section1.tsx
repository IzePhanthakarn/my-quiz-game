import React from "react";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import BaseDatePicker from "wcf-component-lib/src/components/BaseDatePicker/BaseDatePicker";
import BaseItemInput from "wcf-component-lib/src/components/BaseItemInput/BaseItemInput";
export default function Section1(props: { uuid: boolean }) {
	const { uuid } = props;
	return (
		<div className="grid grid-cols-4 gap-y-2 gap-x-8">
			{uuid ? (
				<div className="col-span-4 items-center grid grid-cols-4 gap-y-2 gap-x-8">
					<BaseItemInput label="เลขที่ประสบอันตราย" itemName={"requestFormCode"}/>
					<BaseButton label="ตรวจสอบข้อมูล" />
				</div>
			) : (
				<BaseItemInput label="เลขที่ประสบอันตราย" itemName={"requestFormCode"}
				/>
			)}
			<BaseDatePicker label="วันที่รับแจ้ง" itemName={"approveDate"} />
			<BaseDatePicker label="วันที่ประสบอันตราย" itemName={"assessDate"} />
			<BaseItemInput
				label="เลขที่บัตรประจำตัวประชาชน"
				itemName={"employeeCitizenId"}
			/>
			<BaseItemInput label="ชื่อ-นามสกุล" itemName={"userName"} />
			<BaseItemInput label="ที่อยู่เลขที่" itemName={"houseNum"} />
			<BaseItemInput label="หมู่ที่" itemName={"moo"} />
			<BaseItemInput label="ถนน" itemName={"road"} />
			<BaseItemInput label="ซอย" itemName={"soi"} />
			<BaseItemInput label="ตำบล" itemName={"tambol"} />
			<BaseItemInput label="อำเภอ" itemName={"amphur"} />
			<BaseItemInput label="จังหวัด" itemName={"province"} />
			<BaseItemInput label="รหัสไปรษณีย์" itemName={"postCode"} />
			<BaseItemInput label="เลขที่บัญชีนายจ้าง" itemName={""} />
			<BaseItemInput label="ชื่อสถานประกอบการ" itemName={""} />
			<BaseItemInput label="สาเหตุที่ประสบอันตราย" itemName={""} />
			<BaseItemInput label="ผลของการประสบอันตราย" itemName={""} />
			<BaseItemInput label="ระดับความรุนแรง" itemName={""} />
		</div>
	);
}
