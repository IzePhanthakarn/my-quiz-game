"use client";

import React, { useEffect } from "react";
import { BaseItemInput } from "wcf-component-lib/src/components/BaseItemInput";
import BaseForm from "wcf-component-lib/src/components/BaseForm";
import { FormProps } from "wcf-component-lib/node_modules/antd/es/form/Form";
import {
	Address,
	modelAddress,
} from "wcf-component-lib/src/components/BaseThaiAddress/model";
import BaseButton from "wcf-component-lib/src/components/BaseButton";
import { SliceModel } from "@/redux/slices/model";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { DoctorForm, modelDoctorForm } from "../../redux/form/model";
import BaseThaiAddress from "wcf-component-lib/src/components/BaseThaiAddress";
import { itemsTables } from "./model";
import BaseCollapse from "wcf-component-lib/src/components/BaseCollapse";

export default function DoctorDetail() {
	const dispatch: AppDispatch = useDispatch();
	const { uuid, doctorForm } = useSelector(
		(state: SliceModel) => ({
			uuid: state.container.uuid,
			doctorForm: state.doctor.doctorForm,
		}),
		shallowEqual
	);

	// const [form] = Form.useForm();

	// const handleAddress = (asd: string) => {
	// 	const raw_address = JSON.parse(
	// 		sessionStorage.getItem("raw_address") ?? "[]"
	// 	);
	// 	const data: Address = raw_address.find(
	// 		(e: Address) => e.province_id === asd
	// 	);
	// 	console.log("data.province_name", data.province_name);
	// };

	// console.log("form", form.getFieldValue("province"));
	// console.log(handleAddress(form.getFieldValue("province")));

	const onFinish: FormProps<DoctorForm>["onFinish"] = async (
		values: DoctorForm
	) => {
		console.log("value", values);
	};

	// Mock wait redux
	const [value, setValue] = React.useState<Address>(modelAddress);

	return (
		<div className="grid grid-cols-4 gap-y-2 gap-x-8 items-start">
			<BaseItemInput label="doctorId" itemName="doctorId" rules={[]} />
			<BaseItemInput label="amphur" itemName="amphur" rules={[]} />
			<BaseItemInput label="houseNum" itemName="houseNum" rules={[]} />
			<BaseItemInput label="moo" itemName="moo" rules={[]} />
			<BaseItemInput label="province" itemName="province" rules={[]} />
			<BaseItemInput label="road" itemName="road" rules={[]} />
			<BaseItemInput label="soi" itemName="soi" rules={[]} />
			<BaseItemInput label="tambol" itemName="tambol" rules={[]} />
			<BaseItemInput label="citizenId" itemName="citizenId" rules={[]} />
			<BaseItemInput label="doctorCode" itemName="doctorCode" rules={[]} />
			<BaseItemInput label="doctorType" itemName="doctorType" rules={[]} />
			<BaseItemInput label="firstName" itemName="firstname" rules={[]} />
			<BaseItemInput label="lastName" itemName="lastname" rules={[]} />
			<BaseItemInput label="position" itemName="position" rules={[]} />
			<BaseItemInput label="postalName" itemName="postalName" rules={[]} />
			<BaseItemInput label="postcode" itemName="postcode" rules={[]} />
			<BaseItemInput
				label="professionalCode"
				itemName="professionalCode"
				rules={[]}
			/>
			<BaseItemInput label="revenueNo" itemName="revenueNo" rules={[]} />
			<BaseItemInput label="title" itemName="title" rules={[]} />
			<BaseThaiAddress
				address={value}
				setAddress={(e: Address) => setValue(e)}
				type={"tambons_name"}
				label={"ตำบล"}
				itemName={"tambons"}
			/>
			<BaseThaiAddress
				address={value}
				setAddress={(e: Address) => setValue(e)}
				type={"amphure_name"}
				label={"อำเภอ"}
				itemName={"tambons"}
			/>
			<BaseThaiAddress
				address={value}
				setAddress={(e: Address) => setValue(e)}
				type={"province_name"}
				label={"จังหวัด"}
				itemName={"province"}
			/>
			<BaseThaiAddress
				address={value}
				setAddress={(e: Address) => setValue(e)}
				type={"zipcode"}
				label={"รหัสไปรษณีย์"}
				itemName={"tambons"}
			/>
			<BaseButton label="บันทึก" htmlType="submit" />
			<div className="col-span-4">
				{itemsTables?.map((_, index) => (
					<BaseCollapse
						key={index}
						defaultActiveKey={index + 1}
						items={[(itemsTables ?? [])[index]]}
					/>
				))}
			</div>
		</div>
	);
}
