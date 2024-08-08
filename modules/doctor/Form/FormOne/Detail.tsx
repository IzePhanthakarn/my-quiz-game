import React from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import BaseThaiAddress from "wcf-component-lib/src/components/BaseThaiAddress";
import {
	Address,
	modelAddress,
} from "wcf-component-lib/src/components/BaseThaiAddress/model";
// import { useForm } from "react-hook-form";

export default function Detail() {
	const onFinish: FormProps<any>["onFinish"] = () => {};

	const onFinishFailed: FormProps<any>["onFinishFailed"] = (_) => {};

	// Mock wait redux
	const [value, setValue] = React.useState<Address>(modelAddress);

	return (
		<BaseForm
			child={
				<div className="grid grid-cols-4 gap-y-9 gap-x-8">
					<BaseItemInput
						label="เลขทะเบียนวิชาชีพ"
						itemName="professionalCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="เลขทะเบียน สปส"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="รุ่นที่อบรม"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="วันที่อบรม"
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
						label="ชื่อ"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="นามสกุล"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="ประเภทแพทย์"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="เลขที่ภาษี"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="ที่อยู่"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="หมู่ที่"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="ถนน"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseItemInput
						label="ซอย"
						itemName="clinicCode"
						rules={[]}
						value={""}
						onChangeFunction={() => {}}
					/>
					<BaseThaiAddress
						label="ตำบล"
						address={value}
						setAddress={setValue}
						type="tambons_name"
						itemName={""}
						value={null}
					/>
					<BaseThaiAddress
						label="อำเภอ"
						address={value}
						setAddress={setValue}
						type="amphure_name"
						itemName={""}
						value={null}
					/>
					<BaseThaiAddress
						label="จังหวัด"
						address={value}
						setAddress={setValue}
						type="province_name"
						itemName={""}
						value={null}
					/>
					<BaseThaiAddress
						label="รหัสไปรษณีย์"
						address={value}
						setAddress={setValue}
						type="zipcode"
						itemName={""}
						value={null}
					/>
				</div>
			}
			name={"doctorForm"}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		/>
	);
}
