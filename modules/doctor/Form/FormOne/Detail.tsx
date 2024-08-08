import React, { useEffect } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import BaseThaiAddress from "wcf-component-lib/src/components/BaseThaiAddress";
import {
	Address,
	modelAddress,
} from "wcf-component-lib/src/components/BaseThaiAddress/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";

export default function Detail() {
	const onFinish: FormProps<any>["onFinish"] = async (values: any) => {
		console.log("value", values);
	};

	const onFinishFailed: FormProps<any>["onFinishFailed"] = (_) => {};

	// Mock wait redux
	const [value, setValue] = React.useState<Address>(modelAddress);

	return (
		<BaseForm
			child={
				<div className="grid grid-cols-4 gap-y-9 gap-x-8">
					<BaseItemInput
						label="doctorCode"
						itemName="username"
						rules={[{ required: true }]}
					/>
					<BaseItemInput label="เลขทะเบียนวิชาชีพ" itemName="email" />
					<BaseItemInput
						label="เลขทะเบียน สปส"
						itemName="country"
						rules={[{ required: true }]}
					/>
					<BaseItemInput
						label="เลขทะเบียน สปส2"
						itemName="country2"
						rules={[{ required: true }]}
					/>
					<BaseItemInput label="position" itemName="position" rules={[]} />
					<BaseItemInput label="doctorType" itemName="doctorType" rules={[]} />
					<BaseItemInput label="รุ่นที่อบรม" itemName="clinicCode" rules={[]} />
					<BaseItemInput label="วันที่อบรม" itemName="clinicCode" rules={[]} />
					<BaseItemInput
						label="เลขที่บัตรประจำตัวประชาชน"
						itemName="citizenId"
						rules={[]}
					/>
					<BaseItemInput label="คำนำหน้า" itemName="title" rules={[]} />
					<BaseItemInput label="ชื่อ" itemName="firstname" rules={[]} />
					<BaseItemInput label="นามสกุล" itemName="lastname" rules={[]} />
					<BaseItemInput label="ประเภทแพทย์" itemName="clinicCode" rules={[]} />
					<BaseItemInput label="เลขที่ภาษี" itemName="revenueNo" rules={[]} />
					<BaseItemInput label="ที่อยู่" itemName="houseNum" rules={[]} />
					<BaseItemInput label="หมู่ที่" itemName="moo" rules={[]} />
					<BaseItemInput label="ถนน" itemName="road" rules={[]} />
					<BaseItemInput label="ซอย" itemName="soi" rules={[]} />
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
					<BaseButton label="บันทึก" htmlType="submit" />
				</div>
			}
			name={"doctorForm"}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		/>
	);
}
