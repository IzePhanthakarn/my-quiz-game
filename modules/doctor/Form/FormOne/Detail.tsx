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
import { initGetDoctorForm } from "../../service";
import { DoctorForm, modelDoctorForm } from "../../redux/form/model";
import Form from "wcf-component-lib/node_modules/antd/es/form";
import BaseDropDown from "wcf-component-lib/src/components/BaseDropDown";

export default function Detail() {
	const dispatch: AppDispatch = useDispatch();
	const { uuid, doctorForm } = useSelector(
		(state: SliceModel) => ({
			uuid: state.container.uuid,
			doctorForm: state.doctor.doctorForm,
		}),
		shallowEqual
	);

	const [form] = Form.useForm();

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

	const onFinishFailed: FormProps<DoctorForm>["onFinishFailed"] = (_) => {};

	// Mock wait redux
	const [value, setValue] = React.useState<Address>(modelAddress);
	const [init, setInit] = React.useState<boolean>(false);

	useEffect(() => {
		if (_.isEmpty(uuid)) {
			setInit(!init);
		} else {
			dispatch(initGetDoctorForm(uuid));
		}
	}, [init]);

	return (
		<>
			{!_.isEmpty(doctorForm.doctorCode) && (
				<BaseForm
					initialValues={doctorForm}
					child={
						<div className="grid grid-cols-4 gap-y-2 gap-x-8">
							<BaseDropDown
								label="diploma"
								option={[]}
								itemName="diploma"
								type="diploma"
							/>
							<BaseItemInput label="doctorId" itemName="doctorId" rules={[]} />
							<BaseItemInput label="amphur" itemName="amphur" rules={[]} />
							<BaseItemInput label="houseNum" itemName="houseNum" rules={[]} />
							<BaseItemInput label="moo" itemName="moo" rules={[]} />
							<BaseItemInput label="province" itemName="province" rules={[]} />
							<BaseItemInput label="road" itemName="road" rules={[]} />
							<BaseItemInput label="soi" itemName="soi" rules={[]} />
							<BaseItemInput label="tambol" itemName="tambol" rules={[]} />
							<BaseItemInput
								label="citizenId"
								itemName="citizenId"
								rules={[]}
							/>
							<BaseItemInput
								label="doctorCode"
								itemName="doctorCode"
								rules={[]}
							/>
							<BaseItemInput
								label="doctorType"
								itemName="doctorType"
								rules={[]}
							/>
							<BaseItemInput
								label="firstName"
								itemName="firstName"
								rules={[]}
							/>
							<BaseItemInput label="lastName" itemName="lastName" rules={[]} />
							<BaseItemInput label="position" itemName="position" rules={[]} />
							<BaseItemInput
								label="postalName"
								itemName="postalName"
								rules={[]}
							/>
							<BaseItemInput label="postcode" itemName="postcode" rules={[]} />
							<BaseItemInput
								label="professionalCode"
								itemName="professionalCode"
								rules={[]}
							/>
							<BaseItemInput
								label="revenueNo"
								itemName="revenueNo"
								rules={[]}
							/>
							<BaseItemInput label="title" itemName="title" rules={[]} />

							<BaseButton label="บันทึก" htmlType="submit" />
						</div>
					}
					name={"doctorForm"}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					form={form}
				/>
			)}
		</>
	);
}
